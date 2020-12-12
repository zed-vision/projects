/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3
        ? target
        : desc === null
        ? desc = Object.getOwnPropertyDescriptor(target, key)
        : desc,
      d;
    if (
      typeof Reflect === "object" && typeof Reflect.decorate === "function"
    ) {
      r = Reflect.decorate(decorators, target, key, desc);
    } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) {
          r = (c < 3
            ? d(r)
            : c > 3
            ? d(target, key, r)
            : d(target, key)) || r;
        }
      }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import * as nls from "../../../nls";
import { Delayer } from "../../../base/common/async";
import { Disposable } from "../../../base/common/lifecycle";
import * as strings from "../../../base/common/strings";
import {
  EditorAction,
  EditorCommand,
  MultiEditorAction,
  registerEditorAction,
  registerEditorCommand,
  registerEditorContribution,
  registerMultiEditorAction,
} from "../../browser/editorExtensions";
import { EditorContextKeys } from "../../common/editorContextKeys";
import {
  CONTEXT_FIND_INPUT_FOCUSED,
  CONTEXT_FIND_WIDGET_VISIBLE,
  CONTEXT_REPLACE_INPUT_FOCUSED,
  FIND_IDS,
  FindModelBoundToEditorModel,
  ToggleCaseSensitiveKeybinding,
  TogglePreserveCaseKeybinding,
  ToggleRegexKeybinding,
  ToggleSearchScopeKeybinding,
  ToggleWholeWordKeybinding,
} from "./findModel";
import { FindOptionsWidget } from "./findOptionsWidget";
import { FindReplaceState } from "./findState";
import { FindWidget } from "./findWidget";
import { MenuId } from "../../../platform/actions/common/actions";
import { IClipboardService } from "../../../platform/clipboard/common/clipboardService";
import {
  ContextKeyExpr,
  IContextKeyService,
} from "../../../platform/contextkey/common/contextkey";
import { IContextViewService } from "../../../platform/contextview/browser/contextView";
import { IKeybindingService } from "../../../platform/keybinding/common/keybinding";
import { IStorageService } from "../../../platform/storage/common/storage";
import { IThemeService } from "../../../platform/theme/common/themeService";
import { INotificationService } from "../../../platform/notification/common/notification";
const SEARCH_STRING_MAX_LENGTH = 524288;
export function getSelectionSearchString(
  editor,
  seedSearchStringFromSelection = "single",
) {
  if (!editor.hasModel()) {
    return null;
  }
  const selection = editor.getSelection();
  // if selection spans multiple lines, default search string to empty
  if (
    (seedSearchStringFromSelection === "single" &&
      selection.startLineNumber === selection.endLineNumber) ||
    seedSearchStringFromSelection === "multiple"
  ) {
    if (selection.isEmpty()) {
      const wordAtPosition = editor.getConfiguredWordAtPosition(
        selection.getStartPosition(),
      );
      if (wordAtPosition) {
        return wordAtPosition.word;
      }
    } else {
      if (
        editor.getModel().getValueLengthInRange(selection) <
          SEARCH_STRING_MAX_LENGTH
      ) {
        return editor.getModel().getValueInRange(selection);
      }
    }
  }
  return null;
}
let CommonFindController = class CommonFindController extends Disposable {
  constructor(editor, contextKeyService, storageService, clipboardService) {
    super();
    this._editor = editor;
    this._findWidgetVisible = CONTEXT_FIND_WIDGET_VISIBLE.bindTo(
      contextKeyService,
    );
    this._contextKeyService = contextKeyService;
    this._storageService = storageService;
    this._clipboardService = clipboardService;
    this._updateHistoryDelayer = new Delayer(500);
    this._state = this._register(new FindReplaceState());
    this.loadQueryState();
    this._register(
      this._state.onFindReplaceStateChange((e) => this._onStateChanged(e)),
    );
    this._model = null;
    this._register(this._editor.onDidChangeModel(() => {
      let shouldRestartFind =
        (this._editor.getModel() && this._state.isRevealed);
      this.disposeModel();
      this._state.change({
        searchScope: null,
        matchCase: this._storageService.getBoolean(
          "editor.matchCase",
          1, /* WORKSPACE */
          false,
        ),
        wholeWord: this._storageService.getBoolean(
          "editor.wholeWord",
          1, /* WORKSPACE */
          false,
        ),
        isRegex: this._storageService.getBoolean(
          "editor.isRegex",
          1, /* WORKSPACE */
          false,
        ),
        preserveCase: this._storageService.getBoolean(
          "editor.preserveCase",
          1, /* WORKSPACE */
          false,
        ),
      }, false);
      if (shouldRestartFind) {
        this._start({
          forceRevealReplace: false,
          seedSearchStringFromSelection: "none",
          seedSearchStringFromGlobalClipboard: false,
          shouldFocus: 0, /* NoFocusChange */
          shouldAnimate: false,
          updateSearchScope: false,
          loop: this._editor.getOption(31 /* find */).loop,
        });
      }
    }));
  }
  get editor() {
    return this._editor;
  }
  static get(editor) {
    return editor.getContribution(CommonFindController.ID);
  }
  dispose() {
    this.disposeModel();
    super.dispose();
  }
  disposeModel() {
    if (this._model) {
      this._model.dispose();
      this._model = null;
    }
  }
  _onStateChanged(e) {
    this.saveQueryState(e);
    if (e.isRevealed) {
      if (this._state.isRevealed) {
        this._findWidgetVisible.set(true);
      } else {
        this._findWidgetVisible.reset();
        this.disposeModel();
      }
    }
    if (e.searchString) {
      this.setGlobalBufferTerm(this._state.searchString);
    }
  }
  saveQueryState(e) {
    if (e.isRegex) {
      this._storageService.store(
        "editor.isRegex",
        this._state.actualIsRegex,
        1, /* WORKSPACE */
        0, /* USER */
      );
    }
    if (e.wholeWord) {
      this._storageService.store(
        "editor.wholeWord",
        this._state.actualWholeWord,
        1, /* WORKSPACE */
        0, /* USER */
      );
    }
    if (e.matchCase) {
      this._storageService.store(
        "editor.matchCase",
        this._state.actualMatchCase,
        1, /* WORKSPACE */
        0, /* USER */
      );
    }
    if (e.preserveCase) {
      this._storageService.store(
        "editor.preserveCase",
        this._state.actualPreserveCase,
        1, /* WORKSPACE */
        0, /* USER */
      );
    }
  }
  loadQueryState() {
    this._state.change({
      matchCase: this._storageService.getBoolean(
        "editor.matchCase",
        1, /* WORKSPACE */
        this._state.matchCase,
      ),
      wholeWord: this._storageService.getBoolean(
        "editor.wholeWord",
        1, /* WORKSPACE */
        this._state.wholeWord,
      ),
      isRegex: this._storageService.getBoolean(
        "editor.isRegex",
        1, /* WORKSPACE */
        this._state.isRegex,
      ),
      preserveCase: this._storageService.getBoolean(
        "editor.preserveCase",
        1, /* WORKSPACE */
        this._state.preserveCase,
      ),
    }, false);
  }
  isFindInputFocused() {
    return !!CONTEXT_FIND_INPUT_FOCUSED.getValue(this._contextKeyService);
  }
  getState() {
    return this._state;
  }
  closeFindWidget() {
    this._state.change({
      isRevealed: false,
      searchScope: null,
    }, false);
    this._editor.focus();
  }
  toggleCaseSensitive() {
    this._state.change({ matchCase: !this._state.matchCase }, false);
    if (!this._state.isRevealed) {
      this.highlightFindOptions();
    }
  }
  toggleWholeWords() {
    this._state.change({ wholeWord: !this._state.wholeWord }, false);
    if (!this._state.isRevealed) {
      this.highlightFindOptions();
    }
  }
  toggleRegex() {
    this._state.change({ isRegex: !this._state.isRegex }, false);
    if (!this._state.isRevealed) {
      this.highlightFindOptions();
    }
  }
  togglePreserveCase() {
    this._state.change({ preserveCase: !this._state.preserveCase }, false);
    if (!this._state.isRevealed) {
      this.highlightFindOptions();
    }
  }
  toggleSearchScope() {
    if (this._state.searchScope) {
      this._state.change({ searchScope: null }, true);
    } else {
      if (this._editor.hasModel()) {
        let selections = this._editor.getSelections();
        selections.map((selection) => {
          if (
            selection.endColumn === 1 &&
            selection.endLineNumber > selection.startLineNumber
          ) {
            selection = selection.setEndPosition(
              selection.endLineNumber - 1,
              this._editor.getModel().getLineMaxColumn(
                selection.endLineNumber - 1,
              ),
            );
          }
          if (!selection.isEmpty()) {
            return selection;
          }
          return null;
        }).filter((element) => !!element);
        if (selections.length) {
          this._state.change({ searchScope: selections }, true);
        }
      }
    }
  }
  setSearchString(searchString) {
    if (this._state.isRegex) {
      searchString = strings.escapeRegExpCharacters(searchString);
    }
    this._state.change({ searchString: searchString }, false);
  }
  highlightFindOptions(ignoreWhenVisible = false) {
    // overwritten in subclass
  }
  _start(opts) {
    return __awaiter(this, void 0, void 0, function* () {
      this.disposeModel();
      if (!this._editor.hasModel()) {
        // cannot do anything with an editor that doesn't have a model...
        return;
      }
      let stateChanges = {
        isRevealed: true,
      };
      if (opts.seedSearchStringFromSelection === "single") {
        let selectionSearchString = getSelectionSearchString(
          this._editor,
          opts.seedSearchStringFromSelection,
        );
        if (selectionSearchString) {
          if (this._state.isRegex) {
            stateChanges.searchString = strings.escapeRegExpCharacters(
              selectionSearchString,
            );
          } else {
            stateChanges.searchString = selectionSearchString;
          }
        }
      } else if (
        opts.seedSearchStringFromSelection === "multiple" &&
        !opts.updateSearchScope
      ) {
        let selectionSearchString = getSelectionSearchString(
          this._editor,
          opts.seedSearchStringFromSelection,
        );
        if (selectionSearchString) {
          stateChanges.searchString = selectionSearchString;
        }
      }
      if (
        !stateChanges.searchString && opts.seedSearchStringFromGlobalClipboard
      ) {
        let selectionSearchString = yield this.getGlobalBufferTerm();
        if (!this._editor.hasModel()) {
          // the editor has lost its model in the meantime
          return;
        }
        if (selectionSearchString) {
          stateChanges.searchString = selectionSearchString;
        }
      }
      // Overwrite isReplaceRevealed
      if (opts.forceRevealReplace) {
        stateChanges.isReplaceRevealed = true;
      } else if (!this._findWidgetVisible.get()) {
        stateChanges.isReplaceRevealed = false;
      }
      if (opts.updateSearchScope) {
        let currentSelections = this._editor.getSelections();
        if (currentSelections.some((selection) => !selection.isEmpty())) {
          stateChanges.searchScope = currentSelections;
        }
      }
      stateChanges.loop = opts.loop;
      this._state.change(stateChanges, false);
      if (!this._model) {
        this._model = new FindModelBoundToEditorModel(
          this._editor,
          this._state,
        );
      }
    });
  }
  start(opts) {
    return this._start(opts);
  }
  moveToNextMatch() {
    if (this._model) {
      this._model.moveToNextMatch();
      return true;
    }
    return false;
  }
  moveToPrevMatch() {
    if (this._model) {
      this._model.moveToPrevMatch();
      return true;
    }
    return false;
  }
  replace() {
    if (this._model) {
      this._model.replace();
      return true;
    }
    return false;
  }
  replaceAll() {
    if (this._model) {
      this._model.replaceAll();
      return true;
    }
    return false;
  }
  selectAllMatches() {
    if (this._model) {
      this._model.selectAllMatches();
      this._editor.focus();
      return true;
    }
    return false;
  }
  getGlobalBufferTerm() {
    return __awaiter(this, void 0, void 0, function* () {
      if (
        this._editor.getOption(31 /* find */).globalFindClipboard &&
        this._editor.hasModel() &&
        !this._editor.getModel().isTooLargeForSyncing()
      ) {
        return this._clipboardService.readFindText();
      }
      return "";
    });
  }
  setGlobalBufferTerm(text) {
    if (
      this._editor.getOption(31 /* find */).globalFindClipboard &&
      this._editor.hasModel() &&
      !this._editor.getModel().isTooLargeForSyncing()
    ) {
      // intentionally not awaited
      this._clipboardService.writeFindText(text);
    }
  }
};
CommonFindController.ID = "editor.contrib.findController";
CommonFindController = __decorate([
  __param(1, IContextKeyService),
  __param(2, IStorageService),
  __param(3, IClipboardService),
], CommonFindController);
export { CommonFindController };
let FindController = class FindController extends CommonFindController {
  constructor(
    editor,
    _contextViewService,
    _contextKeyService,
    _keybindingService,
    _themeService,
    _notificationService,
    _storageService,
    clipboardService,
  ) {
    super(editor, _contextKeyService, _storageService, clipboardService);
    this._contextViewService = _contextViewService;
    this._keybindingService = _keybindingService;
    this._themeService = _themeService;
    this._notificationService = _notificationService;
    this._widget = null;
    this._findOptionsWidget = null;
  }
  _start(opts) {
    const _super = Object.create(null, {
      _start: { get: () => super._start },
    });
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._widget) {
        this._createFindWidget();
      }
      const selection = this._editor.getSelection();
      let updateSearchScope = false;
      switch (this._editor.getOption(31 /* find */).autoFindInSelection) {
        case "always":
          updateSearchScope = true;
          break;
        case "never":
          updateSearchScope = false;
          break;
        case "multiline":
          const isSelectionMultipleLine = !!selection &&
            selection.startLineNumber !== selection.endLineNumber;
          updateSearchScope = isSelectionMultipleLine;
          break;
        default:
          break;
      }
      opts.updateSearchScope = updateSearchScope;
      yield _super._start.call(this, opts);
      if (this._widget) {
        if (opts.shouldFocus === 2 /* FocusReplaceInput */) {
          this._widget.focusReplaceInput();
        } else if (opts.shouldFocus === 1 /* FocusFindInput */) {
          this._widget.focusFindInput();
        }
      }
    });
  }
  highlightFindOptions(ignoreWhenVisible = false) {
    if (!this._widget) {
      this._createFindWidget();
    }
    if (this._state.isRevealed && !ignoreWhenVisible) {
      this._widget.highlightFindOptions();
    } else {
      this._findOptionsWidget.highlightFindOptions();
    }
  }
  _createFindWidget() {
    this._widget = this._register(
      new FindWidget(
        this._editor,
        this,
        this._state,
        this._contextViewService,
        this._keybindingService,
        this._contextKeyService,
        this._themeService,
        this._storageService,
        this._notificationService,
      ),
    );
    this._findOptionsWidget = this._register(
      new FindOptionsWidget(
        this._editor,
        this._state,
        this._keybindingService,
        this._themeService,
      ),
    );
  }
};
FindController = __decorate([
  __param(1, IContextViewService),
  __param(2, IContextKeyService),
  __param(3, IKeybindingService),
  __param(4, IThemeService),
  __param(5, INotificationService),
  __param(6, IStorageService),
  __param(7, IClipboardService),
], FindController);
export { FindController };
export class StartFindAction extends MultiEditorAction {
  constructor() {
    super({
      id: FIND_IDS.StartFindAction,
      label: nls.localize("startFindAction", "Find"),
      alias: "Find",
      precondition: ContextKeyExpr.or(
        ContextKeyExpr.has("editorFocus"),
        ContextKeyExpr.has("editorIsOpen"),
      ),
      kbOpts: {
        kbExpr: null,
        primary: 2048 /* CtrlCmd */ | 36, /* KEY_F */
        weight: 100, /* EditorContrib */
      },
      menuOpts: {
        menuId: MenuId.MenubarEditMenu,
        group: "3_find",
        title: nls.localize(
          { key: "miFind", comment: ["&& denotes a mnemonic"] },
          "&&Find",
        ),
        order: 1,
      },
    });
  }
  run(accessor, editor) {
    return __awaiter(this, void 0, void 0, function* () {
      let controller = CommonFindController.get(editor);
      if (controller) {
        yield controller.start({
          forceRevealReplace: false,
          seedSearchStringFromSelection:
            editor.getOption(31 /* find */).seedSearchStringFromSelection
              ? "single"
              : "none",
          seedSearchStringFromGlobalClipboard:
            editor.getOption(31 /* find */).globalFindClipboard,
          shouldFocus: 1, /* FocusFindInput */
          shouldAnimate: true,
          updateSearchScope: false,
          loop: editor.getOption(31 /* find */).loop,
        });
      }
    });
  }
}
export class StartFindWithSelectionAction extends EditorAction {
  constructor() {
    super({
      id: FIND_IDS.StartFindWithSelection,
      label: nls.localize(
        "startFindWithSelectionAction",
        "Find With Selection",
      ),
      alias: "Find With Selection",
      precondition: undefined,
      kbOpts: {
        kbExpr: null,
        primary: 0,
        mac: {
          primary: 2048 /* CtrlCmd */ | 35, /* KEY_E */
        },
        weight: 100, /* EditorContrib */
      },
    });
  }
  run(accessor, editor) {
    return __awaiter(this, void 0, void 0, function* () {
      let controller = CommonFindController.get(editor);
      if (controller) {
        yield controller.start({
          forceRevealReplace: false,
          seedSearchStringFromSelection: "multiple",
          seedSearchStringFromGlobalClipboard: false,
          shouldFocus: 0, /* NoFocusChange */
          shouldAnimate: true,
          updateSearchScope: false,
          loop: editor.getOption(31 /* find */).loop,
        });
        controller.setGlobalBufferTerm(controller.getState().searchString);
      }
    });
  }
}
export class MatchFindAction extends EditorAction {
  run(accessor, editor) {
    return __awaiter(this, void 0, void 0, function* () {
      let controller = CommonFindController.get(editor);
      if (controller && !this._run(controller)) {
        yield controller.start({
          forceRevealReplace: false,
          seedSearchStringFromSelection:
            (controller.getState().searchString.length === 0) &&
              editor.getOption(31 /* find */).seedSearchStringFromSelection
              ? "single"
              : "none",
          seedSearchStringFromGlobalClipboard: true,
          shouldFocus: 0, /* NoFocusChange */
          shouldAnimate: true,
          updateSearchScope: false,
          loop: editor.getOption(31 /* find */).loop,
        });
        this._run(controller);
      }
    });
  }
}
export class NextMatchFindAction extends MatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.NextMatchFindAction,
      label: nls.localize("findNextMatchAction", "Find Next"),
      alias: "Find Next",
      precondition: undefined,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 61, /* F3 */
        mac: {
          primary: 2048 /* CtrlCmd */ | 37, /* KEY_G */
          secondary: [61 /* F3 */],
        },
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    const result = controller.moveToNextMatch();
    if (result) {
      controller.editor.pushUndoStop();
      return true;
    }
    return false;
  }
}
export class NextMatchFindAction2 extends MatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.NextMatchFindAction,
      label: nls.localize("findNextMatchAction", "Find Next"),
      alias: "Find Next",
      precondition: undefined,
      kbOpts: {
        kbExpr: ContextKeyExpr.and(
          EditorContextKeys.focus,
          CONTEXT_FIND_INPUT_FOCUSED,
        ),
        primary: 3, /* Enter */
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    const result = controller.moveToNextMatch();
    if (result) {
      controller.editor.pushUndoStop();
      return true;
    }
    return false;
  }
}
export class PreviousMatchFindAction extends MatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.PreviousMatchFindAction,
      label: nls.localize("findPreviousMatchAction", "Find Previous"),
      alias: "Find Previous",
      precondition: undefined,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 1024 /* Shift */ | 61, /* F3 */
        mac: {
          primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 37, /* KEY_G */
          secondary: [1024 /* Shift */ | 61 /* F3 */],
        },
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    return controller.moveToPrevMatch();
  }
}
export class PreviousMatchFindAction2 extends MatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.PreviousMatchFindAction,
      label: nls.localize("findPreviousMatchAction", "Find Previous"),
      alias: "Find Previous",
      precondition: undefined,
      kbOpts: {
        kbExpr: ContextKeyExpr.and(
          EditorContextKeys.focus,
          CONTEXT_FIND_INPUT_FOCUSED,
        ),
        primary: 1024 /* Shift */ | 3, /* Enter */
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    return controller.moveToPrevMatch();
  }
}
export class SelectionMatchFindAction extends EditorAction {
  run(accessor, editor) {
    return __awaiter(this, void 0, void 0, function* () {
      let controller = CommonFindController.get(editor);
      if (!controller) {
        return;
      }
      let selectionSearchString = getSelectionSearchString(editor);
      if (selectionSearchString) {
        controller.setSearchString(selectionSearchString);
      }
      if (!this._run(controller)) {
        yield controller.start({
          forceRevealReplace: false,
          seedSearchStringFromSelection:
            editor.getOption(31 /* find */).seedSearchStringFromSelection
              ? "single"
              : "none",
          seedSearchStringFromGlobalClipboard: false,
          shouldFocus: 0, /* NoFocusChange */
          shouldAnimate: true,
          updateSearchScope: false,
          loop: editor.getOption(31 /* find */).loop,
        });
        this._run(controller);
      }
    });
  }
}
export class NextSelectionMatchFindAction extends SelectionMatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.NextSelectionMatchFindAction,
      label: nls.localize(
        "nextSelectionMatchFindAction",
        "Find Next Selection",
      ),
      alias: "Find Next Selection",
      precondition: undefined,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 2048 /* CtrlCmd */ | 61, /* F3 */
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    return controller.moveToNextMatch();
  }
}
export class PreviousSelectionMatchFindAction extends SelectionMatchFindAction {
  constructor() {
    super({
      id: FIND_IDS.PreviousSelectionMatchFindAction,
      label: nls.localize(
        "previousSelectionMatchFindAction",
        "Find Previous Selection",
      ),
      alias: "Find Previous Selection",
      precondition: undefined,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 61, /* F3 */
        weight: 100, /* EditorContrib */
      },
    });
  }
  _run(controller) {
    return controller.moveToPrevMatch();
  }
}
export class StartFindReplaceAction extends MultiEditorAction {
  constructor() {
    super({
      id: FIND_IDS.StartFindReplaceAction,
      label: nls.localize("startReplace", "Replace"),
      alias: "Replace",
      precondition: ContextKeyExpr.or(
        ContextKeyExpr.has("editorFocus"),
        ContextKeyExpr.has("editorIsOpen"),
      ),
      kbOpts: {
        kbExpr: null,
        primary: 2048 /* CtrlCmd */ | 38, /* KEY_H */
        mac: { primary: 2048 /* CtrlCmd */ | 512 /* Alt */ | 36 /* KEY_F */ },
        weight: 100, /* EditorContrib */
      },
      menuOpts: {
        menuId: MenuId.MenubarEditMenu,
        group: "3_find",
        title: nls.localize(
          { key: "miReplace", comment: ["&& denotes a mnemonic"] },
          "&&Replace",
        ),
        order: 2,
      },
    });
  }
  run(accessor, editor) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!editor.hasModel() || editor.getOption(75 /* readOnly */)) {
        return;
      }
      let controller = CommonFindController.get(editor);
      let currentSelection = editor.getSelection();
      let findInputFocused = controller.isFindInputFocused();
      // we only seed search string from selection when the current selection is single line and not empty,
      // + the find input is not focused
      let seedSearchStringFromSelection = !currentSelection.isEmpty() &&
        currentSelection.startLineNumber === currentSelection.endLineNumber &&
        editor.getOption(31 /* find */).seedSearchStringFromSelection &&
        !findInputFocused;
      /*
             * if the existing search string in find widget is empty and we don't seed search string from selection, it means the Find Input is still empty, so we should focus the Find Input instead of Replace Input.
    
             * findInputFocused true -> seedSearchStringFromSelection false, FocusReplaceInput
             * findInputFocused false, seedSearchStringFromSelection true FocusReplaceInput
             * findInputFocused false seedSearchStringFromSelection false FocusFindInput
             */
      let shouldFocus = (findInputFocused || seedSearchStringFromSelection)
        ? 2 /* FocusReplaceInput */
        : 1 /* FocusFindInput */;
      if (controller) {
        yield controller.start({
          forceRevealReplace: true,
          seedSearchStringFromSelection: seedSearchStringFromSelection
            ? "single"
            : "none",
          seedSearchStringFromGlobalClipboard:
            editor.getOption(31 /* find */).seedSearchStringFromSelection,
          shouldFocus: shouldFocus,
          shouldAnimate: true,
          updateSearchScope: false,
          loop: editor.getOption(31 /* find */).loop,
        });
      }
    });
  }
}
registerEditorContribution(CommonFindController.ID, FindController);
export const EditorStartFindAction = new StartFindAction();
registerMultiEditorAction(EditorStartFindAction);
registerEditorAction(StartFindWithSelectionAction);
registerEditorAction(NextMatchFindAction);
registerEditorAction(NextMatchFindAction2);
registerEditorAction(PreviousMatchFindAction);
registerEditorAction(PreviousMatchFindAction2);
registerEditorAction(NextSelectionMatchFindAction);
registerEditorAction(PreviousSelectionMatchFindAction);
export const EditorStartFindReplaceAction = new StartFindReplaceAction();
registerMultiEditorAction(EditorStartFindReplaceAction);
const FindCommand = EditorCommand.bindToContribution(CommonFindController.get);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.CloseFindWidgetCommand,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.closeFindWidget(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: ContextKeyExpr.and(
        EditorContextKeys.focus,
        ContextKeyExpr.not("isComposing"),
      ),
      primary: 9, /* Escape */
      secondary: [1024 /* Shift */ | 9 /* Escape */],
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ToggleCaseSensitiveCommand,
    precondition: undefined,
    handler: (x) => x.toggleCaseSensitive(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: ToggleCaseSensitiveKeybinding.primary,
      mac: ToggleCaseSensitiveKeybinding.mac,
      win: ToggleCaseSensitiveKeybinding.win,
      linux: ToggleCaseSensitiveKeybinding.linux,
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ToggleWholeWordCommand,
    precondition: undefined,
    handler: (x) => x.toggleWholeWords(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: ToggleWholeWordKeybinding.primary,
      mac: ToggleWholeWordKeybinding.mac,
      win: ToggleWholeWordKeybinding.win,
      linux: ToggleWholeWordKeybinding.linux,
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ToggleRegexCommand,
    precondition: undefined,
    handler: (x) => x.toggleRegex(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: ToggleRegexKeybinding.primary,
      mac: ToggleRegexKeybinding.mac,
      win: ToggleRegexKeybinding.win,
      linux: ToggleRegexKeybinding.linux,
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ToggleSearchScopeCommand,
    precondition: undefined,
    handler: (x) => x.toggleSearchScope(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: ToggleSearchScopeKeybinding.primary,
      mac: ToggleSearchScopeKeybinding.mac,
      win: ToggleSearchScopeKeybinding.win,
      linux: ToggleSearchScopeKeybinding.linux,
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.TogglePreserveCaseCommand,
    precondition: undefined,
    handler: (x) => x.togglePreserveCase(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: TogglePreserveCaseKeybinding.primary,
      mac: TogglePreserveCaseKeybinding.mac,
      win: TogglePreserveCaseKeybinding.win,
      linux: TogglePreserveCaseKeybinding.linux,
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ReplaceOneAction,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.replace(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: 2048 /* CtrlCmd */ | 1024 /* Shift */ | 22, /* KEY_1 */
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ReplaceOneAction,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.replace(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: ContextKeyExpr.and(
        EditorContextKeys.focus,
        CONTEXT_REPLACE_INPUT_FOCUSED,
      ),
      primary: 3, /* Enter */
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ReplaceAllAction,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.replaceAll(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: 2048 /* CtrlCmd */ | 512 /* Alt */ | 3, /* Enter */
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.ReplaceAllAction,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.replaceAll(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: ContextKeyExpr.and(
        EditorContextKeys.focus,
        CONTEXT_REPLACE_INPUT_FOCUSED,
      ),
      primary: undefined,
      mac: {
        primary: 2048 /* CtrlCmd */ | 3, /* Enter */
      },
    },
  }),
);
registerEditorCommand(
  new FindCommand({
    id: FIND_IDS.SelectAllMatchesAction,
    precondition: CONTEXT_FIND_WIDGET_VISIBLE,
    handler: (x) => x.selectAllMatches(),
    kbOpts: {
      weight: 100 /* EditorContrib */ + 5,
      kbExpr: EditorContextKeys.focus,
      primary: 512 /* Alt */ | 3, /* Enter */
    },
  }),
);
