(this.webpackJsonp=this.webpackJsonp||[]).push([[3],{147:function(e,n){(function(n){e.exports=n}).call(this,{})},80:function(e,n,t){"use strict";t.d(n,"a",(function(){return I}));var r=t(3),i=t.n(r),o=(t(1),t(4)),a=(t(6),t(10)),s=t(27);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){Object(a.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var f,l;var d=new WeakMap,p=new WeakMap,h=new WeakMap,v=new WeakMap,g=new WeakMap;var m=function(e){return g.get(e)},w=["get","getKey","getAll","getAllKeys","count"],b=["put","add","delete","clear"],y=new Map;function x(e,n){if(e instanceof IDBDatabase&&!(n in e)&&"string"==typeof n){if(y.get(n))return y.get(n);var t=n.replace(/FromIndex$/,""),r=n!==t,a=b.includes(t);if(t in(r?IDBIndex:IDBObjectStore).prototype&&(a||w.includes(t))){var s=function(){var e=Object(o.a)(i.a.mark((function e(n){var o,s,u,c,f,l,d,p=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(s=this.transaction(n,a?"readwrite":"readonly"),u=s.store,c=p.length,f=new Array(c>1?c-1:0),l=1;l<c;l++)f[l-1]=p[l];return r&&(u=u.index(f.shift())),e.next=6,(o=u)[t].apply(o,f);case 6:if(d=e.sent,!a){e.next=10;break}return e.next=10,s.done;case 10:return e.abrupt("return",d);case 11:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}();return y.set(n,s),s}}}!function(n,r){"object"==typeof exports&&void 0!==e?r(exports):"function"==typeof define&&t(147)?define(["exports"],r):r((n=n||self).Diff={})}(void 0,(function(e){function n(){}function t(e,n,t,r,i){for(var o=0,a=n.length,s=0,u=0;o<a;o++){var c=n[o];if(c.removed){if(c.value=e.join(r.slice(u,u+c.count)),u+=c.count,o&&n[o-1].added){var f=n[o-1];n[o-1]=n[o],n[o]=f}}else{if(!c.added&&i){var l=t.slice(s,s+c.count);l=l.map((function(e,n){var t=r[u+n];return t.length>e.length?t:e})),c.value=e.join(l)}else c.value=e.join(t.slice(s,s+c.count));s+=c.count,c.added||(u+=c.count)}}var d=n[a-1];return a>1&&"string"==typeof d.value&&(d.added||d.removed)&&e.equals("",d.value)&&(n[a-2].value+=d.value,n.pop()),n}function r(e){return{newPos:e.newPos,components:e.components.slice(0)}}n.prototype={diff:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.callback;"function"==typeof i&&(o=i,i={}),this.options=i;var a=this;function s(e){return o?(setTimeout((function(){o(void 0,e)}),0),!0):e}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e));var u=(n=this.removeEmpty(this.tokenize(n))).length,c=e.length,f=1,l=u+c,d=[{newPos:-1,components:[]}],p=this.extractCommon(d[0],n,e,0);if(d[0].newPos+1>=u&&p+1>=c)return s([{value:this.join(n),count:n.length}]);function h(){for(var i=-1*f;i<=f;i+=2){var o=void 0,l=d[i-1],p=d[i+1],h=(p?p.newPos:0)-i;l&&(d[i-1]=void 0);var v=l&&l.newPos+1<u,g=p&&0<=h&&h<c;if(v||g){if(!v||g&&l.newPos<p.newPos?(o=r(p),a.pushComponent(o.components,void 0,!0)):((o=l).newPos++,a.pushComponent(o.components,!0,void 0)),h=a.extractCommon(o,n,e,i),o.newPos+1>=u&&h+1>=c)return s(t(a,o.components,n,e,a.useLongestToken));d[i]=o}else d[i]=void 0}f++}if(o)!function e(){setTimeout((function(){if(f>l)return o();h()||e()}),0)}();else for(;f<=l;){var v=h();if(v)return v}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,a=e.newPos,s=a-r,u=0;a+1<i&&s+1<o&&this.equals(n[a+1],t[s+1]);)a++,s++,u++;return u&&e.components.push({count:u}),e.newPos=a,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var i=new n;function o(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}var a=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,s=/\S/,u=new n;u.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!s.test(e)&&!s.test(n)},u.tokenize=function(e){for(var n=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&a.test(n[t])&&a.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var c=new n;function f(e,n,t){return c.diff(e,n,t)}c.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n};var l=new n;l.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var d=new n;function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return v(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}d.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var g=Object.prototype.toString,m=new n;function w(e,n,t,r,i){var o,a;for(n=n||[],t=t||[],r&&(e=r(i,e)),o=0;o<n.length;o+=1)if(n[o]===e)return t[o];if("[object Array]"===g.call(e)){for(n.push(e),a=new Array(e.length),t.push(a),o=0;o<e.length;o+=1)a[o]=w(e[o],n,t,r,i);return n.pop(),t.pop(),a}if(e&&e.toJSON&&(e=e.toJSON()),"object"===p(e)&&null!==e){n.push(e),a={},t.push(a);var s,u=[];for(s in e)e.hasOwnProperty(s)&&u.push(s);for(u.sort(),o=0;o<u.length;o+=1)a[s=u[o]]=w(e[s],n,t,r,s);n.pop(),t.pop()}else a=e;return a}m.useLongestToken=!0,m.tokenize=c.tokenize,m.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(w(e,null,null,i),i,"  ")},m.equals=function(e,t){return n.prototype.equals.call(m,e.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var b=new n;function y(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.split(/\r\n|[\n\v\f\r\x85]/),r=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],o=0;function a(){var e={};for(i.push(e);o<t.length;){var r=t[o];if(/^(\-\-\-|\+\+\+|@@)\s/.test(r))break;var a=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(r);a&&(e.index=a[1]),o++}for(s(e),s(e),e.hunks=[];o<t.length;){var c=t[o];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(c))break;if(/^@@/.test(c))e.hunks.push(u());else{if(c&&n.strict)throw new Error("Unknown line "+(o+1)+" "+JSON.stringify(c));o++}}}function s(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(t[o]);if(n){var r="---"===n[1]?"old":"new",i=n[2].split("\t",2),a=i[0].replace(/\\\\/g,"\\");/^".*"$/.test(a)&&(a=a.substr(1,a.length-2)),e[r+"FileName"]=a,e[r+"Header"]=(i[1]||"").trim(),o++}}function u(){var e=o,i=t[o++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),a={oldStart:+i[1],oldLines:void 0===i[2]?1:+i[2],newStart:+i[3],newLines:void 0===i[4]?1:+i[4],lines:[],linedelimiters:[]};0===a.oldLines&&(a.oldStart+=1),0===a.newLines&&(a.newStart+=1);for(var s=0,u=0;o<t.length&&!(0===t[o].indexOf("--- ")&&o+2<t.length&&0===t[o+1].indexOf("+++ ")&&0===t[o+2].indexOf("@@"));o++){var c=0==t[o].length&&o!=t.length-1?" ":t[o][0];if("+"!==c&&"-"!==c&&" "!==c&&"\\"!==c)break;a.lines.push(t[o]),a.linedelimiters.push(r[o]||"\n"),"+"===c?s++:"-"===c?u++:" "===c&&(s++,u++)}if(!s&&1===a.newLines&&(a.newLines=0),!u&&1===a.oldLines&&(a.oldLines=0),n.strict){if(s!==a.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(u!==a.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return a}for(;o<t.length;)a();return i}function x(e,n,t){var r=!0,i=!1,o=!1,a=1;return function s(){if(r&&!o){if(i?a++:r=!1,e+a<=t)return a;o=!0}if(!i)return o||(r=!0),n<=e-a?-a++:(i=!0,s())}}function k(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=y(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var r,i,o=e.split(/\r\n|[\n\v\f\r\x85]/),a=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],s=n.hunks,u=t.compareLine||function(e,n,t,r){return n===r},c=0,f=t.fuzzFactor||0,l=0,d=0;function p(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=r.length>0?r[0]:" ",a=r.length>0?r.substr(1):r;if(" "===i||"-"===i){if(!u(n+1,o[n],i,a)&&++c>f)return!1;n++}}return!0}for(var h=0;h<s.length;h++){for(var v=s[h],g=o.length-v.oldLines,m=0,w=d+v.oldStart-1,b=x(w,l,g);void 0!==m;m=b())if(p(v,w+m)){v.offset=d+=m;break}if(void 0===m)return!1;l=v.offset+v.oldStart+v.oldLines}for(var k=0,S=0;S<s.length;S++){var L=s[S],j=L.oldStart+L.offset+k-1;k+=L.newLines-L.oldLines;for(var O=0;O<L.lines.length;O++){var N=L.lines[O],F=N.length>0?N[0]:" ",E=N.length>0?N.substr(1):N,D=L.linedelimiters[O];if(" "===F)j++;else if("-"===F)o.splice(j,1),a.splice(j,1);else if("+"===F)o.splice(j,0,E),a.splice(j,0,D),j++;else if("\\"===F){var P=L.lines[O-1]?L.lines[O-1][0]:null;"+"===P?r=!0:"-"===P&&(i=!0)}}}if(r)for(;!o[o.length-1];)o.pop(),a.pop();else i&&(o.push(""),a.push("\n"));for(var I=0;I<o.length-1;I++)o[I]=o[I]+a[I];return o.join("")}function S(e,n,t,r,i,o,a){a||(a={}),void 0===a.context&&(a.context=4);var s=f(t,r,a);function u(e){return e.map((function(e){return" "+e}))}s.push({value:"",lines:[]});for(var c=[],l=0,d=0,p=[],v=1,g=1,m=function(e){var n=s[e],i=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=i,n.added||n.removed){var o;if(!l){var f=s[e-1];l=v,d=g,f&&(p=a.context>0?u(f.lines.slice(-a.context)):[],l-=p.length,d-=p.length)}(o=p).push.apply(o,h(i.map((function(e){return(n.added?"+":"-")+e})))),n.added?g+=i.length:v+=i.length}else{if(l)if(i.length<=2*a.context&&e<s.length-2){var m;(m=p).push.apply(m,h(u(i)))}else{var w,b=Math.min(i.length,a.context);(w=p).push.apply(w,h(u(i.slice(0,b))));var y={oldStart:l,oldLines:v-l+b,newStart:d,newLines:g-d+b,lines:p};if(e>=s.length-2&&i.length<=a.context){var x=/\n$/.test(t),k=/\n$/.test(r),S=0==i.length&&p.length>y.oldLines;!x&&S&&t.length>0&&p.splice(y.oldLines,0,"\\ No newline at end of file"),(!x&&!S||!k)&&p.push("\\ No newline at end of file")}c.push(y),l=0,d=0,p=[]}v+=i.length,g+=i.length}},w=0;w<s.length;w++)m(w);return{oldFileName:e,newFileName:n,oldHeader:i,newHeader:o,hunks:c}}function L(e,n,t,r,i,o,a){return function(e){var n=[];e.oldFileName==e.newFileName&&n.push("Index: "+e.oldFileName),n.push("==================================================================="),n.push("--- "+e.oldFileName+(void 0===e.oldHeader?"":"\t"+e.oldHeader)),n.push("+++ "+e.newFileName+(void 0===e.newHeader?"":"\t"+e.newHeader));for(var t=0;t<e.hunks.length;t++){var r=e.hunks[t];0===r.oldLines&&(r.oldStart-=1),0===r.newLines&&(r.newStart-=1),n.push("@@ -"+r.oldStart+","+r.oldLines+" +"+r.newStart+","+r.newLines+" @@"),n.push.apply(n,r.lines)}return n.join("\n")+"\n"}(S(e,n,t,r,i,o,a))}function j(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function O(e){var n=function e(n){var t=0,r=0;return n.forEach((function(n){if("string"!=typeof n){var i=e(n.mine),o=e(n.theirs);void 0!==t&&(i.oldLines===o.oldLines?t+=i.oldLines:t=void 0),void 0!==r&&(i.newLines===o.newLines?r+=i.newLines:r=void 0)}else void 0!==r&&("+"===n[0]||" "===n[0])&&r++,void 0!==t&&("-"===n[0]||" "===n[0])&&t++})),{oldLines:t,newLines:r}}(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}function N(e,n){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return y(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return S(void 0,void 0,n,e)}return e}function F(e){return e.newFileName&&e.newFileName!==e.oldFileName}function E(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function D(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function P(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function I(e,n,t,r,i){var o={offset:n,lines:t,index:0},a={offset:r,lines:i,index:0};for(B(e,o,a),B(e,a,o);o.index<o.lines.length&&a.index<a.lines.length;){var s=o.lines[o.index],u=a.lines[a.index];if("-"!==s[0]&&"+"!==s[0]||"-"!==u[0]&&"+"!==u[0])if("+"===s[0]&&" "===u[0]){var c;(c=e.lines).push.apply(c,h(M(o)))}else if("+"===u[0]&&" "===s[0]){var f;(f=e.lines).push.apply(f,h(M(a)))}else"-"===s[0]&&" "===u[0]?C(e,o,a):"-"===u[0]&&" "===s[0]?C(e,a,o,!0):s===u?(e.lines.push(s),o.index++,a.index++):H(e,M(o),M(a));else A(e,o,a)}T(e,o),T(e,a),O(e)}function A(e,n,t){var r=M(n),i=M(t);if(z(r)&&z(i)){var o,a;if(j(r,i)&&W(t,r,r.length-i.length))return void(o=e.lines).push.apply(o,h(r));if(j(i,r)&&W(n,i,i.length-r.length))return void(a=e.lines).push.apply(a,h(i))}else if(function(e,n){return e.length===n.length&&j(e,n)}(r,i)){var s;return void(s=e.lines).push.apply(s,h(r))}H(e,r,i)}function C(e,n,t,r){var i,o=M(n),a=function(e,n){for(var t=[],r=[],i=0,o=!1,a=!1;i<n.length&&e.index<e.lines.length;){var s=e.lines[e.index],u=n[i];if("+"===u[0])break;if(o=o||" "!==s[0],r.push(u),i++,"+"===s[0])for(a=!0;"+"===s[0];)t.push(s),s=e.lines[++e.index];u.substr(1)===s.substr(1)?(t.push(s),e.index++):a=!0}if("+"===(n[i]||"")[0]&&o&&(a=!0),a)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);a.merged?(i=e.lines).push.apply(i,h(a.merged)):H(e,r?a:o,r?o:a)}function H(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function B(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function T(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function M(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function z(e){return e.reduce((function(e,n){return e&&"-"===n[0]}),!0)}function W(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}function $(e){var n=e;return n=(n=(n=(n=n.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")}b.tokenize=function(e){return e.slice()},b.join=b.removeEmpty=function(e){return e},e.Diff=n,e.applyPatch=k,e.applyPatches=function(e,n){"string"==typeof e&&(e=y(e));var t=0;!function r(){var i=e[t++];if(!i)return n.complete();n.loadFile(i,(function(e,t){if(e)return n.complete(e);var o=k(t,i,n);n.patched(i,o,(function(e){if(e)return n.complete(e);r()}))}))}()},e.canonicalize=w,e.convertChangesToDMP=function(e){for(var n,t,r=[],i=0;i<e.length;i++)t=(n=e[i]).added?1:n.removed?-1:0,r.push([t,n.value]);return r},e.convertChangesToXML=function(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];r.added?n.push("<ins>"):r.removed&&n.push("<del>"),n.push($(r.value)),r.added?n.push("</ins>"):r.removed&&n.push("</del>")}return n.join("")},e.createPatch=function(e,n,t,r,i,o){return L(e,e,n,t,r,i,o)},e.createTwoFilesPatch=L,e.diffArrays=function(e,n,t){return b.diff(e,n,t)},e.diffChars=function(e,n,t){return i.diff(e,n,t)},e.diffCss=function(e,n,t){return d.diff(e,n,t)},e.diffJson=function(e,n,t){return m.diff(e,n,t)},e.diffLines=f,e.diffSentences=function(e,n,t){return l.diff(e,n,t)},e.diffTrimmedLines=function(e,n,t){var r=o(t,{ignoreWhitespace:!0});return c.diff(e,n,r)},e.diffWords=function(e,n,t){return t=o(t,{ignoreWhitespace:!0}),u.diff(e,n,t)},e.diffWordsWithSpace=function(e,n,t){return u.diff(e,n,t)},e.merge=function(e,n,t){e=N(e,t),n=N(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index),(e.newFileName||n.newFileName)&&(F(e)?F(n)?(r.oldFileName=E(r,e.oldFileName,n.oldFileName),r.newFileName=E(r,e.newFileName,n.newFileName),r.oldHeader=E(r,e.oldHeader,n.oldHeader),r.newHeader=E(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader)),r.hunks=[];for(var i=0,o=0,a=0,s=0;i<e.hunks.length||o<n.hunks.length;){var u=e.hunks[i]||{oldStart:1/0},c=n.hunks[o]||{oldStart:1/0};if(D(u,c))r.hunks.push(P(u,a)),i++,s+=u.newLines-u.oldLines;else if(D(c,u))r.hunks.push(P(c,s)),o++,a+=c.newLines-c.oldLines;else{var f={oldStart:Math.min(u.oldStart,c.oldStart),oldLines:0,newStart:Math.min(u.newStart+a,c.oldStart+s),newLines:0,lines:[]};I(f,u.oldStart,u.lines,c.oldStart,c.lines),o++,i++,r.hunks.push(f)}}return r},e.parsePatch=y,e.structuredPatch=S,Object.defineProperty(e,"__esModule",{value:!0})}));var k=function(){var e=Object(o.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Array,e.t1=Uint8Array,e.next=4,crypto.subtle.digest("SHA-256","string"==typeof n?(new TextEncoder).encode(n):n);case 4:return e.t2=e.sent,e.t3=new e.t1(e.t2).slice(0,4),e.abrupt("return",e.t0.from.call(e.t0,e.t3).map((function(e){return("00"+e.toString(16)).slice(-2)})).join(""));case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),S=function(){var e=Object(o.a)(i.a.mark((function e(n,t){var r,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=k(n),o=Diff.diffChars(n,t),e.next=3,r;case 3:return e.t0=e.sent,e.t1=o.map((function(e){return e.added?e.value:e.removed?-e.count:e.count})),e.abrupt("return",{b:e.t0,c:e.t1});case 6:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),L=function(e){if(e.length<10)return!1;var n=0===Object(s.a)(e.slice(0,8)).filter((function(e){return e<"0"||e>"f"})).length,t=e.slice(8);if(n&&"["===t[0]&&"]"===t[t.length-1])try{return JSON.parse(t).length>1}catch(r){return!1}return!1},j=function(e,n){var t=JSON.parse(n),r=e.slice(),i="";return t.forEach((function(e){if(Number(e)===e){var n=Math.abs(e),t=r.slice(0,n);r=r.slice(n),e>0&&(i+=String(t))}else i+=String(e)})),i},O=function(){var e=Object(o.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Array,e.t1=Uint8Array,e.next=4,crypto.subtle.digest("SHA-256","string"==typeof n?(new TextEncoder).encode(n):n);case 4:return e.t2=e.sent,e.t3=new e.t1(e.t2).slice(0,4),e.abrupt("return",e.t0.from.call(e.t0,e.t3).map((function(e){return("00"+e.toString(16)).slice(-2)})).join(""));case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();var N={get:function(e,n,t){if(e instanceof IDBTransaction){if("done"===n)return p.get(e);if("objectStoreNames"===n)return e.objectStoreNames||h.get(e);if("store"===n)return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return D(e[n])},set:function(e,n,t){return e[n]=t,!0},has:function(e,n){return e instanceof IDBTransaction&&("done"===n||"store"===n)||n in e}};function F(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(l||(l=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return e.apply(m(this),t),D(d.get(this))}:function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return D(e.apply(m(this),t))}:function(n){for(var t=arguments.length,r=new Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];var o=e.call.apply(e,[m(this),n].concat(r));return h.set(o,n.sort?n.sort():[n]),D(o)}}function E(e){return"function"==typeof e?F(e):(e instanceof IDBTransaction&&function(e){if(!p.has(e)){var n=new Promise((function(n,t){var r=function(){e.removeEventListener("complete",i),e.removeEventListener("error",o),e.removeEventListener("abort",o)},i=function(){n(),r()},o=function(){t(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",o),e.addEventListener("abort",o)}));p.set(e,n)}}(e),n=e,(f||(f=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((function(e){return n instanceof e}))?new Proxy(e,N):e);var n}function D(e){if(e instanceof IDBRequest)return n=e,(t=new Promise((function(e,t){var r=function(){n.removeEventListener("success",i),n.removeEventListener("error",o)},i=function(){e(D(n.result)),r()},o=function(){t(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",o)}))).then((function(e){e instanceof IDBCursor&&d.set(e,n)})).catch((function(){})),g.set(t,n),t;var n,t;if(v.has(e))return v.get(e);var r=E(e);return r!==e&&(v.set(e,r),g.set(r,e)),r}N=function(e){return c(c({},e),{},{get:function(n,t,r){return x(n,t)||e.get(n,t,r)},has:function(n,t){return!!x(n,t)||e.has(n,t)}})}(N);var P=function(){var e,n,t,r,a,s,u,c,f,l;return function(e,n){void 0===n&&(n=!1);var t={get:function(r,a){return Object(o.a)(i.a.mark((function o(){var s,u,c,f,l,d,p;return i.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(void 0===a&&(a="string"),i.prev=1,!n){i.next=10;break}return i.next=5,e;case 5:return i.next=7,i.sent.get("codeStore",r);case 7:s=i.sent,i.next=13;break;case 10:return i.next=12,e.get(r);case 12:s=i.sent;case 13:if(s){i.next=15;break}return i.abrupt("return",null);case 15:i.next=20;break;case 17:return i.prev=17,i.t0=i.catch(1),i.abrupt("return",null);case 20:if("json"!==a){i.next=22;break}return i.abrupt("return",JSON.parse(s));case 22:if("string"!==a){i.next=39;break}return i.next=25,s;case 25:if("string"!=typeof(u=i.sent)||"string"!==a){i.next=36;break}if(u,!L(u)){i.next=35;break}return c=u.slice(0,8),f=u.slice(8),i.next=33,t.get(c);case 33:return l=i.sent,i.abrupt("return",j(l,f));case 35:return i.abrupt("return",u);case 36:return d=new TextDecoder,p=d.decode(u),i.abrupt("return",p);case 39:return i.abrupt("return",s);case 40:case"end":return i.stop()}}),o,null,[[1,17]])})))()},put:function(r,a){return Object(o.a)(i.a.mark((function o(){var s,u,c,f,l,d,p,h;return i.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,t.get(r);case 3:if("string"!=typeof(u=i.sent)||"string"!=typeof a||8!==u.length||u===a){i.next=21;break}return i.next=7,t.get(a);case 7:return c=i.sent,i.next=10,t.get(u);case 10:if("string"!=typeof(f=i.sent)){i.next=21;break}return i.next=14,O(f);case 14:if((l=i.sent)!==u){i.next=21;break}return i.next=18,S(c,f);case 18:d=i.sent,p=d.b+JSON.stringify(d.c),t.put(l,p);case 21:i.next=26;break;case 23:i.prev=23,i.t0=i.catch(0),s="";case 26:if(""===s||a!==s){i.next=28;break}return i.abrupt("return",a);case 28:if(h="string"!=typeof a?(new TextDecoder).decode(a):a,!n){i.next=35;break}return i.next=32,e;case 32:return i.abrupt("return",i.sent.put("codeStore",h,r));case 35:return i.next=37,e.put(r,h);case 37:return i.abrupt("return",i.sent);case 38:case"end":return i.stop()}}),o,null,[[0,23]])})))()},delete:function(n){return Object(o.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e;case 2:return t.abrupt("return",t.sent.delete("codeStore",n));case 3:case"end":return t.stop()}}),t)})))()},clear:function(){return Object(o.a)(i.a.mark((function n(){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e;case 2:return n.abrupt("return",n.sent.clear("codeStore"));case 3:case"end":return n.stop()}}),n)})))()},keys:function(){return Object(o.a)(i.a.mark((function n(){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e;case 2:return n.abrupt("return",n.sent.getAllKeys("codeStore"));case 3:case"end":return n.stop()}}),n)})))()}};return t}((e="localZedCodeStore",n=1,a=(r=void 0===(t={upgrade:function(e){e.createObjectStore("codeStore")},blocked:function(){},blocking:function(){},terminated:function(){}})?{}:t).blocked,s=r.upgrade,u=r.blocking,c=r.terminated,f=indexedDB.open(e,n),l=D(f),s&&f.addEventListener("upgradeneeded",(function(e){s(D(f.result),e.oldVersion,e.newVersion,D(f.transaction))})),a&&f.addEventListener("blocked",(function(){return a()})),l.then((function(e){c&&e.addEventListener("close",(function(){return c()})),u&&e.addEventListener("versionchange",(function(){return u()}))})).catch((function(){})),l),!0)};function I(){return A.apply(this,arguments)}function A(){return(A=Object(o.a)(i.a.mark((function e(){var n,t,r,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P();case 2:return n=e.sent,e.next=5,n.get("uuid");case 5:if(t=e.sent){e.next=15;break}return e.next=9,fetch("https://code.zed.vision/register");case 9:return r=e.sent,e.next=12,r.json();case 12:return o=e.sent,n.put("uuid",o.uuid),e.abrupt("return",o.uuid);case 15:return e.abrupt("return",t);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);