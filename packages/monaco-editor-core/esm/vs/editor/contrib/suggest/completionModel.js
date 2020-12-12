/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {
  anyScore,
  FuzzyScore,
  fuzzyScore,
  fuzzyScoreGracefulAggressive,
} from "../../../base/common/filters";
import { compareIgnoreCase } from "../../../base/common/strings";
import { quickSelect } from "../../../base/common/arrays";
export class LineContext {
  constructor(leadingLineContent, characterCountDelta) {
    this.leadingLineContent = leadingLineContent;
    this.characterCountDelta = characterCountDelta;
  }
}
/**
 * Sorted, filtered completion view model
 * */
export class CompletionModel {
  constructor(
    items,
    column,
    lineContext,
    wordDistance,
    options,
    snippetSuggestions,
    clipboardText,
  ) {
    this.clipboardText = clipboardText;
    this._snippetCompareFn = CompletionModel._compareCompletionItems;
    this._items = items;
    this._column = column;
    this._wordDistance = wordDistance;
    this._options = options;
    this._refilterKind = 1 /* All */;
    this._lineContext = lineContext;
    if (snippetSuggestions === "top") {
      this._snippetCompareFn =
        CompletionModel._compareCompletionItemsSnippetsUp;
    } else if (snippetSuggestions === "bottom") {
      this._snippetCompareFn =
        CompletionModel._compareCompletionItemsSnippetsDown;
    }
  }
  get lineContext() {
    return this._lineContext;
  }
  set lineContext(value) {
    if (
      this._lineContext.leadingLineContent !== value.leadingLineContent ||
      this._lineContext.characterCountDelta !== value.characterCountDelta
    ) {
      this._refilterKind =
        this._lineContext.characterCountDelta < value.characterCountDelta &&
          this._filteredItems
          ? 2 /* Incr */
          : 1 /* All */;
      this._lineContext = value;
    }
  }
  get items() {
    this._ensureCachedState();
    return this._filteredItems;
  }
  get allProvider() {
    this._ensureCachedState();
    return this._providerInfo.keys();
  }
  get incomplete() {
    this._ensureCachedState();
    const result = new Set();
    for (let [provider, incomplete] of this._providerInfo) {
      if (incomplete) {
        result.add(provider);
      }
    }
    return result;
  }
  adopt(except) {
    let res = [];
    for (let i = 0; i < this._items.length;) {
      if (!except.has(this._items[i].provider)) {
        res.push(this._items[i]);
        // unordered removed
        this._items[i] = this._items[this._items.length - 1];
        this._items.pop();
      } else {
        // continue with next item
        i++;
      }
    }
    this._refilterKind = 1 /* All */;
    return res;
  }
  get stats() {
    this._ensureCachedState();
    return this._stats;
  }
  _ensureCachedState() {
    if (this._refilterKind !== 0 /* Nothing */) {
      this._createCachedState();
    }
  }
  _createCachedState() {
    this._providerInfo = new Map();
    const labelLengths = [];
    const { leadingLineContent, characterCountDelta } = this._lineContext;
    let word = "";
    let wordLow = "";
    // incrementally filter less
    const source = this._refilterKind === 1 /* All */
      ? this._items
      : this._filteredItems;
    const target = [];
    // picks a score function based on the number of
    // items that we have to score/filter and based on the
    // user-configuration
    const scoreFn = (!this._options.filterGraceful || source.length > 2000)
      ? fuzzyScore
      : fuzzyScoreGracefulAggressive;
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      if (item.isInvalid) {
        continue; // SKIP invalid items
      }
      // collect all support, know if their result is incomplete
      this._providerInfo.set(item.provider, Boolean(item.container.incomplete));
      // 'word' is that remainder of the current line that we
      // filter and score against. In theory each suggestion uses a
      // different word, but in practice not - that's why we cache
      const overwriteBefore = item.position.column - item.editStart.column;
      const wordLen = overwriteBefore + characterCountDelta -
        (item.position.column - this._column);
      if (word.length !== wordLen) {
        word = wordLen === 0 ? "" : leadingLineContent.slice(-wordLen);
        wordLow = word.toLowerCase();
      }
      const textLabel = typeof item.completion.label === "string"
        ? item.completion.label
        : item.completion.label.name;
      // remember the word against which this item was
      // scored
      item.word = word;
      if (wordLen === 0) {
        // when there is nothing to score against, don't
        // event try to do. Use a const rank and rely on
        // the fallback-sort using the initial sort order.
        // use a score of `-100` because that is out of the
        // bound of values `fuzzyScore` will return
        item.score = FuzzyScore.Default;
      } else {
        // skip word characters that are whitespace until
        // we have hit the replace range (overwriteBefore)
        let wordPos = 0;
        while (wordPos < overwriteBefore) {
          const ch = word.charCodeAt(wordPos);
          if (ch === 32 /* Space */ || ch === 9 /* Tab */) {
            wordPos += 1;
          } else {
            break;
          }
        }
        if (wordPos >= wordLen) {
          // the wordPos at which scoring starts is the whole word
          // and therefore the same rules as not having a word apply
          item.score = FuzzyScore.Default;
        } else if (typeof item.completion.filterText === "string") {
          // when there is a `filterText` it must match the `word`.
          // if it matches we check with the label to compute highlights
          // and if that doesn't yield a result we have no highlights,
          // despite having the match
          let match = scoreFn(
            word,
            wordLow,
            wordPos,
            item.completion.filterText,
            item.filterTextLow,
            0,
            false,
          );
          if (!match) {
            continue; // NO match
          }
          if (compareIgnoreCase(item.completion.filterText, textLabel) === 0) {
            // filterText and label are actually the same -> use good highlights
            item.score = match;
          } else {
            // re-run the scorer on the label in the hope of a result BUT use the rank
            // of the filterText-match
            item.score = anyScore(
              word,
              wordLow,
              wordPos,
              textLabel,
              item.labelLow,
              0,
            );
            item.score[0] = match[0]; // use score from filterText
          }
        } else {
          // by default match `word` against the `label`
          let match = scoreFn(
            word,
            wordLow,
            wordPos,
            textLabel,
            item.labelLow,
            0,
            false,
          );
          if (!match) {
            continue; // NO match
          }
          item.score = match;
        }
      }
      item.idx = i;
      item.distance = this._wordDistance.distance(
        item.position,
        item.completion,
      );
      target.push(item);
      // update stats
      labelLengths.push(textLabel.length);
    }
    this._filteredItems = target.sort(this._snippetCompareFn);
    this._refilterKind = 0 /* Nothing */;
    this._stats = {
      pLabelLen: labelLengths.length
        ? quickSelect(labelLengths.length - .85, labelLengths, (a, b) => a - b)
        : 0,
    };
  }
  static _compareCompletionItems(a, b) {
    if (a.score[0] > b.score[0]) {
      return -1;
    } else if (a.score[0] < b.score[0]) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    } else if (a.distance > b.distance) {
      return 1;
    } else if (a.idx < b.idx) {
      return -1;
    } else if (a.idx > b.idx) {
      return 1;
    } else {
      return 0;
    }
  }
  static _compareCompletionItemsSnippetsDown(a, b) {
    if (a.completion.kind !== b.completion.kind) {
      if (a.completion.kind === 27 /* Snippet */) {
        return 1;
      } else if (b.completion.kind === 27 /* Snippet */) {
        return -1;
      }
    }
    return CompletionModel._compareCompletionItems(a, b);
  }
  static _compareCompletionItemsSnippetsUp(a, b) {
    if (a.completion.kind !== b.completion.kind) {
      if (a.completion.kind === 27 /* Snippet */) {
        return -1;
      } else if (b.completion.kind === 27 /* Snippet */) {
        return 1;
      }
    }
    return CompletionModel._compareCompletionItems(a, b);
  }
}
