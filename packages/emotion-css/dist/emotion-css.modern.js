import{StyleSheet as e}from"@emotion/sheet";import{serializeStyles as r}from"@emotion/serialize";import{getRegisteredStyles as t,insertStyles as n}from"@emotion/utils";var a="-ms-",s="-webkit-",c=Math.abs,o=String.fromCharCode;function u(e){return e.trim()}function i(e,r,t){return e.replace(r,t)}function l(e,r){return e.indexOf(r)}function f(e,r){return 0|e.charCodeAt(r)}function h(e,r,t){return e.slice(r,t)}function p(e){return e.length}function d(e){return e.length}function m(e,r){return r.push(e),e}var y=1,g=1,b=0,v=0,w=0,k="";function $(e,r,t,n,a,s,c){return{value:e,root:r,parent:t,type:n,props:a,children:s,line:y,column:g,length:c,return:""}}function x(e,r,t){return $(e,r.root,r.parent,t,r.props,r.children,0)}function E(){return w=v<b?f(k,v++):0,g++,10===w&&(g=1,y++),w}function A(){return f(k,v)}function N(){return v}function C(e,r){return h(k,e,r)}function z(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function O(e){return y=g=1,b=p(k=e),v=0,[]}function S(e){return k="",e}function j(e){return u(C(v-1,V(91===e?e+2:40===e?e+1:e)))}function D(e){for(;(w=A())&&w<33;)E();return z(e)>2||z(w)>3?"":" "}function V(e){for(;E();)switch(w){case e:return v;case 34:case 39:return V(34===e||39===e?e:w);case 40:41===e&&V(e);break;case 92:E()}return v}function _(e,r){for(;E()&&e+w!==57&&(e+w!==84||47!==A()););return"/*"+C(r,v-1)+"*"+o(47===e?e:E())}function q(e){for(;!z(A());)E();return C(e,v)}function P(e){return S(R("",null,null,null,[""],e=O(e),0,[0],e))}function R(e,r,t,n,a,s,c,u,l){for(var f=0,h=0,d=c,y=0,g=0,b=0,v=1,w=1,k=1,$=0,x="",C=a,z=s,O=n,S=x;w;)switch(b=$,$=E()){case 34:case 39:case 91:case 40:S+=j($);break;case 9:case 10:case 13:case 32:S+=D(b);break;case 47:switch(A()){case 42:case 47:m(M(_(E(),N()),r,t),l);break;default:S+="/"}break;case 123*v:u[f++]=p(S)*k;case 125*v:case 59:case 0:switch($){case 0:case 125:w=0;case 59+h:g>0&&m(g>32?T(S+";",n,t,d-1):T(i(S," ","")+";",n,t,d-2),l);break;case 59:S+=";";default:if(m(O=G(S,r,t,f,h,a,u,x,C=[],z=[],d),s),123===$)if(0===h)R(S,r,O,O,C,s,d,u,z);else switch(y){case 100:case 109:case 115:R(e,O,O,n&&m(G(e,O,O,0,0,a,u,x,a,C=[],d),z),a,z,d,u,n?C:z);break;default:R(S,O,O,O,[""],z,d,u,z)}}f=h=g=0,v=k=1,x=S="",d=c;break;case 58:d=1+p(S),g=b;default:switch(S+=o($),$*v){case 38:k=h>0?1:(S+="\f",-1);break;case 44:u[f++]=(p(S)-1)*k,k=1;break;case 64:45===A()&&(S+=j(E())),y=A(),h=p(x=S+=q(N())),$++;break;case 45:45===b&&2==p(S)&&(v=0)}}return s}function G(e,r,t,n,a,s,o,l,f,p,m){for(var y=a-1,g=0===a?s:[""],b=d(g),v=0,w=0,k=0;v<n;++v)for(var x=0,E=h(e,y+1,y=c(w=o[v])),A=e;x<b;++x)(A=u(w>0?g[x]+" "+E:i(E,/&\f/g,g[x])))&&(f[k++]=A);return $(e,r,t,0===a?"rule":l,f,p,m)}function M(e,r,t){return $(e,r,t,"comm",o(w),h(e,2,-2),0)}function T(e,r,t,n){return $(e,r,t,"decl",h(e,0,n),h(e,n+1,-1),n)}function I(e,r){switch(function(e,r){return(((r<<2^f(e,0))<<2^f(e,1))<<2^f(e,2))<<2^f(e,3)}(e,r)){case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return s+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return s+e+"-moz-"+e+a+e+e;case 6828:case 4268:return s+e+a+e+e;case 6165:return s+e+a+"flex-"+e+e;case 5187:return s+e+i(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return s+e+a+"flex-item-"+i(e,/flex-|-self/,"")+e;case 4675:return s+e+a+"flex-line-pack"+i(e,/align-content|flex-|-self/,"")+e;case 5548:return s+e+a+i(e,"shrink","negative")+e;case 5292:return s+e+a+i(e,"basis","preferred-size")+e;case 6060:return s+"box-"+i(e,"-grow","")+s+e+a+i(e,"grow","positive")+e;case 4554:return s+i(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return i(i(i(e,/(zoom-|grab)/,s+"$1"),/(image-set)/,s+"$1"),e,"")+e;case 5495:case 3959:return i(e,/(image-set\([^]*)/,s+"$1$`$1");case 4968:return i(i(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+s+e+e;case 4095:case 3583:case 4068:case 2532:return i(e,/(.+)-inline(.+)/,s+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(p(e)-1-r>6)switch(f(e,r+1)){case 102:r=f(e,r+3);case 109:return i(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1-moz-"+(108==r?"$3":"$2-$3"))+e;case 115:return~l(e,"stretch")?I(i(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(115!==f(e,r+1))break;case 6444:switch(f(e,p(e)-3-(~l(e,"!important")&&10))){case 107:case 111:return i(e,e,s+e)+e;case 101:return i(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+s+(45===f(e,14)?"inline-":"")+"box$3$1"+s+"$2$3$1"+a+"$2box$3")+e}break;case 5936:switch(f(e,r+11)){case 114:return s+e+a+i(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return s+e+a+i(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return s+e+a+i(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return s+e+a+e+e}return e}function K(e,r){for(var t="",n=d(e),a=0;a<n;a++)t+=r(e[a],a,e,r)||"";return t}function W(e,r,t,n){switch(e.type){case"@import":case"decl":return e.return=e.return||e.value;case"comm":return"";case"rule":e.value=e.props.join(",")}return p(t=K(e.children,n))?e.return=e.value+"{"+t+"}":""}var Y=new WeakMap,B=function(e){if("rule"===e.type&&e.parent&&e.length){for(var r=e.value,t=e.parent,n=e.column===t.column&&e.line===t.line;"rule"!==t.type;)if(!(t=t.parent))return;if((1!==e.props.length||58===r.charCodeAt(0)||Y.get(t))&&!n){Y.set(e,!0);for(var a=[],s=function(e,r){return S(function(e,r){var t=-1,n=44;do{switch(z(n)){case 0:38===n&&12===A()&&(r[t]=1),e[t]+=q(v-1);break;case 2:e[t]+=j(n);break;case 4:if(44===n){e[++t]=58===A()?"&\f":"",r[t]=e[t].length;break}default:e[t]+=o(n)}}while(n=E());return e}(O(e),r))}(r,a),c=t.props,u=0,i=0;u<s.length;u++)for(var l=0;l<c.length;l++,i++)e.props[i]=a[u]?s[u].replace(/&\f/g,c[l]):c[l]+" "+s[u]}}},F=function(e){if("decl"===e.type){var r=e.value;108===r.charCodeAt(0)&&98===r.charCodeAt(2)&&(e.return="",e.value="")}},H=function(e){return 105===e.type.charCodeAt(1)&&64===e.type.charCodeAt(0)},J=function(e){e.type="",e.value="",e.return="",e.children="",e.props=""},L=function(e,r,t){H(e)&&(e.parent?(console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."),J(e)):function(e,r){for(var t=e-1;t>=0;t--)if(!H(r[t]))return!0;return!1}(r,t)&&(console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."),J(e)))},Q=[function(e,r,t,n){if(!e.return)switch(e.type){case"decl":e.return=I(e.value,e.length);break;case"@keyframes":return K([x(i(e.value,"@","@"+s),e,"")],n);case"rule":if(e.length)return function(e,r){return e.map(r).join("")}(e.props,function(r){switch(function(e,r){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(r)){case":read-only":case":read-write":return K([x(i(r,/:(read-\w+)/,":-moz-$1"),e,"")],n);case"::placeholder":return K([x(i(r,/:(plac\w+)/,":-webkit-input-$1"),e,""),x(i(r,/:(plac\w+)/,":-moz-$1"),e,""),x(i(r,/:(plac\w+)/,a+"input-$1"),e,"")],n)}return""})}}];function U(e,r){if(void 0===e.inserted[r.name])return e.insert("",r,e.sheet,!0)}function X(e,r,n){const a=[],s=t(e,a,n);return a.length<2?n:s+r(a)}let Z=e=>{let r="";for(let t=0;t<e.length;t++){let n,a=e[t];if(null!=a){switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))n=Z(a);else{n="";for(const e in a)a[e]&&e&&(n&&(n+=" "),n+=e)}break;default:n=a}n&&(r&&(r+=" "),r+=n)}}return r};const{flush:ee,hydrate:re,cx:te,merge:ne,getRegisteredStyles:ae,injectGlobal:se,keyframes:ce,css:oe,sheet:ue,cache:ie}=(a=>{let s=function(r){var t=r.key;if("production"!==process.env.NODE_ENV&&!t)throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(e){document.head.appendChild(e),e.setAttribute("data-s","")})}var a=r.stylisPlugins||Q;if("production"!==process.env.NODE_ENV&&/[^a-z-]/.test(t))throw new Error('Emotion key must only contain lower case alphabetical characters and - but "'+t+'" was passed');var s,c,o={},u=[];s=r.container||document.head,Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion]"),function(e){var r=e.getAttribute("data-emotion").split(" ");if(r[0]===t){for(var n=1;n<r.length;n++)o[r[n]]=!0;u.push(e)}});var i=[B,F];"production"!==process.env.NODE_ENV&&i.push(function(e){return function(r,t,n){if("rule"===r.type){var a,s=r.value.match(/(:first|:nth|:nth-last)-child/g);if(s&&!0!==e.compat){var c=t>0?n[t-1]:null;if(c&&function(e){return!!e&&"comm"===e.type&&e.children.indexOf("emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason")>-1}((a=c.children).length?a[a.length-1]:null))return;s.forEach(function(e){console.error('The pseudo class "'+e+'" is potentially unsafe when doing server-side rendering. Try changing it to "'+e.split("-child")[0]+'-of-type".')})}}}}({get compat(){return m.compat}}),L);var l,f,h=[W,"production"!==process.env.NODE_ENV?function(e){e.root||(e.return?l.insert(e.return):e.value&&"comm"!==e.type&&l.insert(e.value+"{}"))}:(f=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&f(e)})],p=function(e){var r=d(e);return function(t,n,a,s){for(var c="",o=0;o<r;o++)c+=e[o](t,n,a,s)||"";return c}}(i.concat(a,h));c=function(e,r,t,n){l=t,"production"!==process.env.NODE_ENV&&void 0!==r.map&&(l={insert:function(e){t.insert(e+r.map)}}),K(P(e?e+"{"+r.styles+"}":r.styles),p),n&&(m.inserted[r.name]=!0)};var m={key:t,sheet:new e({key:t,container:s,nonce:r.nonce,speedy:r.speedy,prepend:r.prepend}),nonce:r.nonce,inserted:o,registered:{},insert:c};return m.sheet.hydrate(u),m}({key:"css"});s.sheet.speedy=function(e){if("production"!==process.env.NODE_ENV&&0!==this.ctr)throw new Error("speedy must be changed before any rules are inserted");this.isSpeedy=e},s.compat=!0;let c=(...e)=>{let t=r(e,s.registered,void 0);return n(s,t,!1),`${s.key}-${t.name}`};return{css:c,cx:(...e)=>X(s.registered,c,Z(e)),injectGlobal:(...e)=>{let t=r(e,s.registered);U(s,t)},keyframes:(...e)=>{let t=r(e,s.registered),n=`animation-${t.name}`;return U(s,{name:t.name,styles:`@keyframes ${n}{${t.styles}}`}),n},hydrate(e){e.forEach(e=>{s.inserted[e]=!0})},flush(){s.registered={},s.inserted={},s.sheet.flush()},sheet:s.sheet,cache:s,getRegisteredStyles:t.bind(null,s.registered),merge:X.bind(null,s.registered,c)}})();export{ie as cache,oe as css,te as cx,ee as flush,ae as getRegisteredStyles,re as hydrate,se as injectGlobal,ce as keyframes,ne as merge,ue as sheet};
//# sourceMappingURL=emotion-css.modern.js.map
