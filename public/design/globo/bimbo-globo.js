"use strict";(()=>{var Hb=Object.create;var Il=Object.defineProperty;var Vb=Object.getOwnPropertyDescriptor;var Gb=Object.getOwnPropertyNames;var kb=Object.getPrototypeOf,qb=Object.prototype.hasOwnProperty;var Xb=(e,t,n)=>t in e?Il(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var lo=(e,t)=>()=>(e&&(t=e(e=0)),t);var vi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Wb=(e,t)=>{for(var n in t)Il(e,n,{get:t[n],enumerable:!0})},Yb=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Gb(t))!qb.call(e,a)&&a!==n&&Il(e,a,{get:()=>t[a],enumerable:!(i=Vb(t,a))||i.enumerable});return e};var Vs=(e,t,n)=>(n=e!=null?Hb(kb(e)):{},Yb(t||!e||!e.__esModule?Il(n,"default",{value:e,enumerable:!0}):n,e));var Wt=(e,t,n)=>Xb(e,typeof t!="symbol"?t+"":t,n);var Ug=vi(re=>{"use strict";function xh(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,a=e[i];if(0<zl(a,t))e[i]=t,e[n]=a,n=i;else break t}}function ti(e){return e.length===0?null:e[0]}function Fl(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,a=e.length,s=a>>>1;i<s;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>zl(o,n))l<a&&0>zl(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<a&&0>zl(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function zl(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}re.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Mg=performance,re.unstable_now=function(){return Mg.now()}):(vh=Date,Sg=vh.now(),re.unstable_now=function(){return vh.now()-Sg});var Mg,vh,Sg,yi=[],da=[],Zb=1,On=null,tn=3,Hl=!1,Ka=!1,uo=!1,Tg=typeof setTimeout=="function"?setTimeout:null,wg=typeof clearTimeout=="function"?clearTimeout:null,Eg=typeof setImmediate<"u"?setImmediate:null;function Bl(e){for(var t=ti(da);t!==null;){if(t.callback===null)Fl(da);else if(t.startTime<=e)Fl(da),t.sortIndex=t.expirationTime,xh(yi,t);else break;t=ti(da)}}function bh(e){if(uo=!1,Bl(e),!Ka)if(ti(yi)!==null)Ka=!0,Mh();else{var t=ti(da);t!==null&&Sh(bh,t.startTime-e)}}var Vl=!1,ho=-1,Rg=5,Cg=-1;function Dg(){return!(re.unstable_now()-Cg<Rg)}function yh(){if(Vl){var e=re.unstable_now();Cg=e;var t=!0;try{t:{Ka=!1,uo&&(uo=!1,wg(ho),ho=-1),Hl=!0;var n=tn;try{e:{for(Bl(e),On=ti(yi);On!==null&&!(On.expirationTime>e&&Dg());){var i=On.callback;if(typeof i=="function"){On.callback=null,tn=On.priorityLevel;var a=i(On.expirationTime<=e);if(e=re.unstable_now(),typeof a=="function"){On.callback=a,Bl(e),t=!0;break e}On===ti(yi)&&Fl(yi),Bl(e)}else Fl(yi);On=ti(yi)}if(On!==null)t=!0;else{var s=ti(da);s!==null&&Sh(bh,s.startTime-e),t=!1}}break t}finally{On=null,tn=n,Hl=!1}t=void 0}}finally{t?co():Vl=!1}}}var co;typeof Eg=="function"?co=function(){Eg(yh)}:typeof MessageChannel<"u"?(_h=new MessageChannel,Ag=_h.port2,_h.port1.onmessage=yh,co=function(){Ag.postMessage(null)}):co=function(){Tg(yh,0)};var _h,Ag;function Mh(){Vl||(Vl=!0,co())}function Sh(e,t){ho=Tg(function(){e(re.unstable_now())},t)}re.unstable_IdlePriority=5;re.unstable_ImmediatePriority=1;re.unstable_LowPriority=4;re.unstable_NormalPriority=3;re.unstable_Profiling=null;re.unstable_UserBlockingPriority=2;re.unstable_cancelCallback=function(e){e.callback=null};re.unstable_continueExecution=function(){Ka||Hl||(Ka=!0,Mh())};re.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Rg=0<e?Math.floor(1e3/e):5};re.unstable_getCurrentPriorityLevel=function(){return tn};re.unstable_getFirstCallbackNode=function(){return ti(yi)};re.unstable_next=function(e){switch(tn){case 1:case 2:case 3:var t=3;break;default:t=tn}var n=tn;tn=t;try{return e()}finally{tn=n}};re.unstable_pauseExecution=function(){};re.unstable_requestPaint=function(){};re.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=tn;tn=e;try{return t()}finally{tn=n}};re.unstable_scheduleCallback=function(e,t,n){var i=re.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:Zb++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>i?(e.sortIndex=n,xh(da,e),ti(yi)===null&&e===ti(da)&&(uo?(wg(ho),ho=-1):uo=!0,Sh(bh,n-i))):(e.sortIndex=a,xh(yi,e),Ka||Hl||(Ka=!0,Mh())),e};re.unstable_shouldYield=Dg;re.unstable_wrapCallback=function(e){var t=tn;return function(){var n=tn;tn=t;try{return e.apply(this,arguments)}finally{tn=n}}}});var Ng=vi((_C,Lg)=>{"use strict";Lg.exports=Ug()});var Xg=vi(Ot=>{"use strict";var Ah=Symbol.for("react.transitional.element"),jb=Symbol.for("react.portal"),Jb=Symbol.for("react.fragment"),Qb=Symbol.for("react.strict_mode"),Kb=Symbol.for("react.profiler"),$b=Symbol.for("react.consumer"),tM=Symbol.for("react.context"),eM=Symbol.for("react.forward_ref"),nM=Symbol.for("react.suspense"),iM=Symbol.for("react.memo"),Fg=Symbol.for("react.lazy"),Pg=Symbol.iterator;function aM(e){return e===null||typeof e!="object"?null:(e=Pg&&e[Pg]||e["@@iterator"],typeof e=="function"?e:null)}var Hg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vg=Object.assign,Gg={};function ks(e,t,n){this.props=e,this.context=t,this.refs=Gg,this.updater=n||Hg}ks.prototype.isReactComponent={};ks.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ks.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function kg(){}kg.prototype=ks.prototype;function Th(e,t,n){this.props=e,this.context=t,this.refs=Gg,this.updater=n||Hg}var wh=Th.prototype=new kg;wh.constructor=Th;Vg(wh,ks.prototype);wh.isPureReactComponent=!0;var Og=Array.isArray,Me={H:null,A:null,T:null,S:null},qg=Object.prototype.hasOwnProperty;function Rh(e,t,n,i,a,s){return n=s.ref,{$$typeof:Ah,type:e,key:t,ref:n!==void 0?n:null,props:s}}function sM(e,t){return Rh(e.type,t,void 0,void 0,void 0,e.props)}function Ch(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ah}function rM(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ig=/\/+/g;function Eh(e,t){return typeof e=="object"&&e!==null&&e.key!=null?rM(""+e.key):t.toString(36)}function zg(){}function oM(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(zg,zg):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Gs(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Ah:case jb:r=!0;break;case Fg:return r=e._init,Gs(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+Eh(e,0):i,Og(a)?(n="",r!=null&&(n=r.replace(Ig,"$&/")+"/"),Gs(a,t,n,"",function(c){return c})):a!=null&&(Ch(a)&&(a=sM(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(Ig,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(Og(e))for(var l=0;l<e.length;l++)i=e[l],s=o+Eh(i,l),r+=Gs(i,t,n,s,a);else if(l=aM(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+Eh(i,l++),r+=Gs(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return Gs(oM(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Gl(e,t,n){if(e==null)return e;var i=[],a=0;return Gs(e,i,"","",function(s){return t.call(n,s,a++)}),i}function lM(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Bg=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function cM(){}Ot.Children={map:Gl,forEach:function(e,t,n){Gl(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Gl(e,function(){t++}),t},toArray:function(e){return Gl(e,function(t){return t})||[]},only:function(e){if(!Ch(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ot.Component=ks;Ot.Fragment=Jb;Ot.Profiler=Kb;Ot.PureComponent=Th;Ot.StrictMode=Qb;Ot.Suspense=nM;Ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Me;Ot.act=function(){throw Error("act(...) is not supported in production builds of React.")};Ot.cache=function(e){return function(){return e.apply(null,arguments)}};Ot.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Vg({},e.props),a=e.key,s=void 0;if(t!=null)for(r in t.ref!==void 0&&(s=void 0),t.key!==void 0&&(a=""+t.key),t)!qg.call(t,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&t.ref===void 0||(i[r]=t[r]);var r=arguments.length-2;if(r===1)i.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];i.children=o}return Rh(e.type,a,void 0,void 0,s,i)};Ot.createContext=function(e){return e={$$typeof:tM,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:$b,_context:e},e};Ot.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)qg.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Rh(e,s,void 0,void 0,null,a)};Ot.createRef=function(){return{current:null}};Ot.forwardRef=function(e){return{$$typeof:eM,render:e}};Ot.isValidElement=Ch;Ot.lazy=function(e){return{$$typeof:Fg,_payload:{_status:-1,_result:e},_init:lM}};Ot.memo=function(e,t){return{$$typeof:iM,type:e,compare:t===void 0?null:t}};Ot.startTransition=function(e){var t=Me.T,n={};Me.T=n;try{var i=e(),a=Me.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(cM,Bg)}catch(s){Bg(s)}finally{Me.T=t}};Ot.unstable_useCacheRefresh=function(){return Me.H.useCacheRefresh()};Ot.use=function(e){return Me.H.use(e)};Ot.useActionState=function(e,t,n){return Me.H.useActionState(e,t,n)};Ot.useCallback=function(e,t){return Me.H.useCallback(e,t)};Ot.useContext=function(e){return Me.H.useContext(e)};Ot.useDebugValue=function(){};Ot.useDeferredValue=function(e,t){return Me.H.useDeferredValue(e,t)};Ot.useEffect=function(e,t){return Me.H.useEffect(e,t)};Ot.useId=function(){return Me.H.useId()};Ot.useImperativeHandle=function(e,t,n){return Me.H.useImperativeHandle(e,t,n)};Ot.useInsertionEffect=function(e,t){return Me.H.useInsertionEffect(e,t)};Ot.useLayoutEffect=function(e,t){return Me.H.useLayoutEffect(e,t)};Ot.useMemo=function(e,t){return Me.H.useMemo(e,t)};Ot.useOptimistic=function(e,t){return Me.H.useOptimistic(e,t)};Ot.useReducer=function(e,t,n){return Me.H.useReducer(e,t,n)};Ot.useRef=function(e){return Me.H.useRef(e)};Ot.useState=function(e){return Me.H.useState(e)};Ot.useSyncExternalStore=function(e,t,n){return Me.H.useSyncExternalStore(e,t,n)};Ot.useTransition=function(){return Me.H.useTransition()};Ot.version="19.0.0"});var kl=vi((bC,Wg)=>{"use strict";Wg.exports=Xg()});var Zg=vi(hn=>{"use strict";var uM=kl();function Yg(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function pa(){}var un={d:{f:pa,r:function(){throw Error(Yg(522))},D:pa,C:pa,L:pa,m:pa,X:pa,S:pa,M:pa},p:0,findDOMNode:null},hM=Symbol.for("react.portal");function fM(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:hM,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var fo=uM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function ql(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=un;hn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Yg(299));return fM(e,t,null,n)};hn.flushSync=function(e){var t=fo.T,n=un.p;try{if(fo.T=null,un.p=2,e)return e()}finally{fo.T=t,un.p=n,un.d.f()}};hn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,un.d.C(e,t))};hn.prefetchDNS=function(e){typeof e=="string"&&un.d.D(e)};hn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=ql(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?un.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&un.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};hn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=ql(t.as,t.crossOrigin);un.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&un.d.M(e)};hn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=ql(n,t.crossOrigin);un.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};hn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=ql(t.as,t.crossOrigin);un.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else un.d.m(e)};hn.requestFormReset=function(e){un.d.r(e)};hn.unstable_batchedUpdates=function(e,t){return e(t)};hn.useFormState=function(e,t,n){return fo.H.useFormState(e,t,n)};hn.useFormStatus=function(){return fo.H.useHostTransitionStatus()};hn.version="19.0.0"});var Qg=vi((SC,Jg)=>{"use strict";function jg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jg)}catch(e){console.error(e)}}jg(),Jg.exports=Zg()});var W_=vi(cu=>{"use strict";var He=Ng(),gv=kl(),dM=Qg();function Z(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function vv(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}var pM=Symbol.for("react.element"),Xl=Symbol.for("react.transitional.element"),Mo=Symbol.for("react.portal"),Js=Symbol.for("react.fragment"),yv=Symbol.for("react.strict_mode"),lf=Symbol.for("react.profiler"),mM=Symbol.for("react.provider"),_v=Symbol.for("react.consumer"),Fi=Symbol.for("react.context"),ed=Symbol.for("react.forward_ref"),cf=Symbol.for("react.suspense"),uf=Symbol.for("react.suspense_list"),nd=Symbol.for("react.memo"),va=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var xv=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var gM=Symbol.for("react.memo_cache_sentinel"),Kg=Symbol.iterator;function po(e){return e===null||typeof e!="object"?null:(e=Kg&&e[Kg]||e["@@iterator"],typeof e=="function"?e:null)}var vM=Symbol.for("react.client.reference");function hf(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===vM?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Js:return"Fragment";case Mo:return"Portal";case lf:return"Profiler";case yv:return"StrictMode";case cf:return"Suspense";case uf:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Fi:return(e.displayName||"Context")+".Provider";case _v:return(e._context.displayName||"Context")+".Consumer";case ed:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case nd:return t=e.displayName||null,t!==null?t:hf(e.type)||"Memo";case va:t=e._payload,e=e._init;try{return hf(e(t))}catch{}}return null}var Dt=gv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ve=Object.assign,Dh,$g;function So(e){if(Dh===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Dh=t&&t[1]||"",$g=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dh+e+$g}var Uh=!1;function Lh(e,t){if(!e||Uh)return"";Uh=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(p){var f=p}Reflect.construct(e,[],d)}else{try{d.call()}catch(p){f=p}e.call(d.prototype)}}else{try{throw Error()}catch(p){f=p}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(p){if(p&&f&&typeof p.stack=="string")return[p.stack,f.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var u=`
`+l[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=a);break}}}finally{Uh=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?So(n):""}function yM(e){switch(e.tag){case 26:case 27:case 5:return So(e.type);case 16:return So("Lazy");case 13:return So("Suspense");case 19:return So("SuspenseList");case 0:case 15:return e=Lh(e.type,!1),e;case 11:return e=Lh(e.type.render,!1),e;case 1:return e=Lh(e.type,!0),e;default:return""}}function t0(e){try{var t="";do t+=yM(e),e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}function Er(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function bv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function e0(e){if(Er(e)!==e)throw Error(Z(188))}function _M(e){var t=e.alternate;if(!t){if(t=Er(e),t===null)throw Error(Z(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return e0(a),e;if(s===i)return e0(a),t;s=s.sibling}throw Error(Z(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(Z(189))}}if(n.alternate!==i)throw Error(Z(190))}if(n.tag!==3)throw Error(Z(188));return n.stateNode.current===n?e:t}function Mv(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Mv(e),t!==null)return t;e=e.sibling}return null}var Eo=Array.isArray,ge=dM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ss={pending:!1,data:null,method:null,action:null},ff=[],Qs=-1;function Ai(e){return{current:e}}function We(e){0>Qs||(e.current=ff[Qs],ff[Qs]=null,Qs--)}function ye(e,t){Qs++,ff[Qs]=e.current,e.current=t}var bi=Ai(null),Go=Ai(null),Aa=Ai(null),bc=Ai(null);function Mc(e,t){switch(ye(Aa,t),ye(Go,e),ye(bi,null),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)&&(t=t.namespaceURI)?iv(t):0;break;default:if(e=e===8?t.parentNode:t,t=e.tagName,e=e.namespaceURI)e=iv(e),t=P_(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}We(bi),ye(bi,t)}function mr(){We(bi),We(Go),We(Aa)}function df(e){e.memoizedState!==null&&ye(bc,e);var t=bi.current,n=P_(t,e.type);t!==n&&(ye(Go,e),ye(bi,n))}function Sc(e){Go.current===e&&(We(bi),We(Go)),bc.current===e&&(We(bc),$o._currentValue=ss)}var pf=Object.prototype.hasOwnProperty,id=He.unstable_scheduleCallback,Nh=He.unstable_cancelCallback,xM=He.unstable_shouldYield,bM=He.unstable_requestPaint,Mi=He.unstable_now,MM=He.unstable_getCurrentPriorityLevel,Sv=He.unstable_ImmediatePriority,Ev=He.unstable_UserBlockingPriority,Ec=He.unstable_NormalPriority,SM=He.unstable_LowPriority,Av=He.unstable_IdlePriority,EM=He.log,AM=He.unstable_setDisableYieldValue,il=null,wn=null;function TM(e){if(wn&&typeof wn.onCommitFiberRoot=="function")try{wn.onCommitFiberRoot(il,e,void 0,(e.current.flags&128)===128)}catch{}}function Sa(e){if(typeof EM=="function"&&AM(e),wn&&typeof wn.setStrictMode=="function")try{wn.setStrictMode(il,e)}catch{}}var Rn=Math.clz32?Math.clz32:CM,wM=Math.log,RM=Math.LN2;function CM(e){return e>>>=0,e===0?32:31-(wM(e)/RM|0)|0}var Wl=128,Yl=4194304;function ts(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function jc(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,a=e.suspendedLanes,s=e.pingedLanes,r=e.warmLanes;e=e.finishedLanes!==0;var o=n&134217727;return o!==0?(n=o&~a,n!==0?i=ts(n):(s&=o,s!==0?i=ts(s):e||(r=o&~r,r!==0&&(i=ts(r))))):(o=n&~a,o!==0?i=ts(o):s!==0?i=ts(s):e||(r=n&~r,r!==0&&(i=ts(r)))),i===0?0:t!==0&&t!==i&&!(t&a)&&(a=i&-i,r=t&-t,a>=r||a===32&&(r&4194176)!==0)?t:i}function al(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function DM(e,t){switch(e){case 1:case 2:case 4:case 8:return t+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tv(){var e=Wl;return Wl<<=1,!(Wl&4194176)&&(Wl=128),e}function wv(){var e=Yl;return Yl<<=1,!(Yl&62914560)&&(Yl=4194304),e}function Ph(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function sl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function UM(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var u=31-Rn(n),d=1<<u;o[u]=0,l[u]=-1;var f=c[u];if(f!==null)for(c[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Rv(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function Rv(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Rn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&4194218}function Cv(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Rn(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function Dv(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Uv(){var e=ge.p;return e!==0?e:(e=window.event,e===void 0?32:q_(e.type))}function LM(e,t){var n=ge.p;try{return ge.p=e,t()}finally{ge.p=n}}var za=Math.random().toString(36).slice(2),en="__reactFiber$"+za,xn="__reactProps$"+za,Ar="__reactContainer$"+za,mf="__reactEvents$"+za,NM="__reactListeners$"+za,PM="__reactHandles$"+za,n0="__reactResources$"+za,ko="__reactMarker$"+za;function ad(e){delete e[en],delete e[xn],delete e[mf],delete e[NM],delete e[PM]}function is(e){var t=e[en];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ar]||n[en]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=sv(e);e!==null;){if(n=e[en])return n;e=sv(e)}return t}e=n,n=e.parentNode}return null}function Tr(e){if(e=e[en]||e[Ar]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function Ao(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(Z(33))}function or(e){var t=e[n0];return t||(t=e[n0]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function qe(e){e[ko]=!0}var Lv=new Set,Nv={};function gs(e,t){gr(e,t),gr(e+"Capture",t)}function gr(e,t){for(Nv[e]=t,e=0;e<t.length;e++)Lv.add(t[e])}var Xi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),OM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),i0={},a0={};function IM(e){return pf.call(a0,e)?!0:pf.call(i0,e)?!1:OM.test(e)?a0[e]=!0:(i0[e]=!0,!1)}function cc(e,t,n){if(IM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Zl(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Li(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Fn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function zM(e){var t=Pv(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){i=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(r){i=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ac(e){e._valueTracker||(e._valueTracker=zM(e))}function Ov(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Pv(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Tc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var BM=/[\n"\\]/g;function Gn(e){return e.replace(BM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function gf(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Fn(t)):e.value!==""+Fn(t)&&(e.value=""+Fn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?vf(e,r,Fn(t)):n!=null?vf(e,r,Fn(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Fn(o):e.removeAttribute("name")}function Iv(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null))return;n=n!=null?""+Fn(n):"",t=t!=null?""+Fn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r)}function vf(e,t,n){t==="number"&&Tc(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function lr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Fn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function zv(e,t,n){if(t!=null&&(t=""+Fn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Fn(n):""}function Bv(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(Z(92));if(Eo(i)){if(1<i.length)throw Error(Z(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Fn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i)}function vr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var FM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function s0(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||FM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Fv(e,t,n){if(t!=null&&typeof t!="object")throw Error(Z(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&s0(e,a,i)}else for(var s in t)t.hasOwnProperty(s)&&s0(e,s,t[s])}function sd(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var HM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),VM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function uc(e){return VM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var yf=null;function rd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ks=null,cr=null;function r0(e){var t=Tr(e);if(t&&(e=t.stateNode)){var n=e[xn]||null;t:switch(e=t.stateNode,t.type){case"input":if(gf(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Gn(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[xn]||null;if(!a)throw Error(Z(90));gf(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&Ov(i)}break t;case"textarea":zv(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&lr(e,!!n.multiple,t,!1)}}}var Oh=!1;function Hv(e,t,n){if(Oh)return e(t,n);Oh=!0;try{var i=e(t);return i}finally{if(Oh=!1,(Ks!==null||cr!==null)&&(su(),Ks&&(t=Ks,e=cr,cr=Ks=null,r0(t),e)))for(t=0;t<e.length;t++)r0(e[t])}}function qo(e,t){var n=e.stateNode;if(n===null)return null;var i=n[xn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Z(231,t,typeof n));return n}var _f=!1;if(Xi)try{qs={},Object.defineProperty(qs,"passive",{get:function(){_f=!0}}),window.addEventListener("test",qs,qs),window.removeEventListener("test",qs,qs)}catch{_f=!1}var qs,Ea=null,od=null,hc=null;function Vv(){if(hc)return hc;var e,t=od,n=t.length,i,a="value"in Ea?Ea.value:Ea.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return hc=a.slice(e,1<i?1-i:void 0)}function fc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function jl(){return!0}function o0(){return!1}function bn(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?jl:o0,this.isPropagationStopped=o0,this}return ve(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jl)},persist:function(){},isPersistent:jl}),t}var vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jc=bn(vs),rl=ve({},vs,{view:0,detail:0}),GM=bn(rl),Ih,zh,mo,Qc=ve({},rl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ld,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==mo&&(mo&&e.type==="mousemove"?(Ih=e.screenX-mo.screenX,zh=e.screenY-mo.screenY):zh=Ih=0,mo=e),Ih)},movementY:function(e){return"movementY"in e?e.movementY:zh}}),l0=bn(Qc),kM=ve({},Qc,{dataTransfer:0}),qM=bn(kM),XM=ve({},rl,{relatedTarget:0}),Bh=bn(XM),WM=ve({},vs,{animationName:0,elapsedTime:0,pseudoElement:0}),YM=bn(WM),ZM=ve({},vs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jM=bn(ZM),JM=ve({},vs,{data:0}),c0=bn(JM),QM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},KM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$M={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function tS(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$M[e])?!!t[e]:!1}function ld(){return tS}var eS=ve({},rl,{key:function(e){if(e.key){var t=QM[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=fc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?KM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ld,charCode:function(e){return e.type==="keypress"?fc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?fc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),nS=bn(eS),iS=ve({},Qc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),u0=bn(iS),aS=ve({},rl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ld}),sS=bn(aS),rS=ve({},vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),oS=bn(rS),lS=ve({},Qc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),cS=bn(lS),uS=ve({},vs,{newState:0,oldState:0}),hS=bn(uS),fS=[9,13,27,32],cd=Xi&&"CompositionEvent"in window,wo=null;Xi&&"documentMode"in document&&(wo=document.documentMode);var dS=Xi&&"TextEvent"in window&&!wo,Gv=Xi&&(!cd||wo&&8<wo&&11>=wo),h0=" ",f0=!1;function kv(e,t){switch(e){case"keyup":return fS.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qv(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $s=!1;function pS(e,t){switch(e){case"compositionend":return qv(t);case"keypress":return t.which!==32?null:(f0=!0,h0);case"textInput":return e=t.data,e===h0&&f0?null:e;default:return null}}function mS(e,t){if($s)return e==="compositionend"||!cd&&kv(e,t)?(e=Vv(),hc=od=Ea=null,$s=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Gv&&t.locale!=="ko"?null:t.data;default:return null}}var gS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function d0(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gS[e.type]:t==="textarea"}function Xv(e,t,n,i){Ks?cr?cr.push(i):cr=[i]:Ks=i,t=Gc(t,"onChange"),0<t.length&&(n=new Jc("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ro=null,Xo=null;function vS(e){U_(e,0)}function Kc(e){var t=Ao(e);if(Ov(t))return e}function p0(e,t){if(e==="change")return t}var Wv=!1;Xi&&(Xi?(Ql="oninput"in document,Ql||(Fh=document.createElement("div"),Fh.setAttribute("oninput","return;"),Ql=typeof Fh.oninput=="function"),Jl=Ql):Jl=!1,Wv=Jl&&(!document.documentMode||9<document.documentMode));var Jl,Ql,Fh;function m0(){Ro&&(Ro.detachEvent("onpropertychange",Yv),Xo=Ro=null)}function Yv(e){if(e.propertyName==="value"&&Kc(Xo)){var t=[];Xv(t,Xo,e,rd(e)),Hv(vS,t)}}function yS(e,t,n){e==="focusin"?(m0(),Ro=t,Xo=n,Ro.attachEvent("onpropertychange",Yv)):e==="focusout"&&m0()}function _S(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Kc(Xo)}function xS(e,t){if(e==="click")return Kc(t)}function bS(e,t){if(e==="input"||e==="change")return Kc(t)}function MS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Dn=typeof Object.is=="function"?Object.is:MS;function Wo(e,t){if(Dn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!pf.call(t,a)||!Dn(e[a],t[a]))return!1}return!0}function g0(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function v0(e,t){var n=g0(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=g0(n)}}function Zv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function jv(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Tc(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Tc(e.document)}return t}function ud(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function SS(e,t){var n=jv(t);t=e.focusedElem;var i=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Zv(t.ownerDocument.documentElement,t)){if(i!==null&&ud(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var a=t.textContent.length,s=Math.min(i.start,a);i=i.end===void 0?s:Math.min(i.end,a),!n.extend&&s>i&&(a=i,i=s,s=a),a=v0(t,s);var r=v0(t,i);a&&r&&(n.rangeCount!==1||n.anchorNode!==a.node||n.anchorOffset!==a.offset||n.focusNode!==r.node||n.focusOffset!==r.offset)&&(e=e.createRange(),e.setStart(a.node,a.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(r.node,r.offset)):(e.setEnd(r.node,r.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var ES=Xi&&"documentMode"in document&&11>=document.documentMode,tr=null,xf=null,Co=null,bf=!1;function y0(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;bf||tr==null||tr!==Tc(i)||(i=tr,"selectionStart"in i&&ud(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Co&&Wo(Co,i)||(Co=i,i=Gc(xf,"onSelect"),0<i.length&&(t=new Jc("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=tr)))}function $a(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var er={animationend:$a("Animation","AnimationEnd"),animationiteration:$a("Animation","AnimationIteration"),animationstart:$a("Animation","AnimationStart"),transitionrun:$a("Transition","TransitionRun"),transitionstart:$a("Transition","TransitionStart"),transitioncancel:$a("Transition","TransitionCancel"),transitionend:$a("Transition","TransitionEnd")},Hh={},Jv={};Xi&&(Jv=document.createElement("div").style,"AnimationEvent"in window||(delete er.animationend.animation,delete er.animationiteration.animation,delete er.animationstart.animation),"TransitionEvent"in window||delete er.transitionend.transition);function ys(e){if(Hh[e])return Hh[e];if(!er[e])return e;var t=er[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jv)return Hh[e]=t[n];return e}var Qv=ys("animationend"),Kv=ys("animationiteration"),$v=ys("animationstart"),AS=ys("transitionrun"),TS=ys("transitionstart"),wS=ys("transitioncancel"),ty=ys("transitionend"),ey=new Map,_0="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function ai(e,t){ey.set(e,t),gs(t,[e])}var Bn=[],nr=0,hd=0;function $c(){for(var e=nr,t=hd=nr=0;t<e;){var n=Bn[t];Bn[t++]=null;var i=Bn[t];Bn[t++]=null;var a=Bn[t];Bn[t++]=null;var s=Bn[t];if(Bn[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&ny(n,a,s)}}function tu(e,t,n,i){Bn[nr++]=e,Bn[nr++]=t,Bn[nr++]=n,Bn[nr++]=i,hd|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function fd(e,t,n,i){return tu(e,t,n,i),wc(e)}function Na(e,t){return tu(e,null,null,t),wc(e)}function ny(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;a&&t!==null&&e.tag===3&&(s=e.stateNode,a=31-Rn(n),s=s.hiddenUpdates,e=s[a],e===null?s[a]=[t]:e.push(t),t.lane=n|536870912)}function wc(e){if(50<Vo)throw Vo=0,kf=null,Error(Z(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ir={},x0=new WeakMap;function kn(e,t){if(typeof e=="object"&&e!==null){var n=x0.get(e);return n!==void 0?n:(t={value:e,source:t,stack:t0(t)},x0.set(e,t),t)}return{value:e,source:t,stack:t0(t)}}var ar=[],sr=0,Rc=null,Cc=0,Hn=[],Vn=0,rs=null,Hi=1,Vi="";function es(e,t){ar[sr++]=Cc,ar[sr++]=Rc,Rc=e,Cc=t}function iy(e,t,n){Hn[Vn++]=Hi,Hn[Vn++]=Vi,Hn[Vn++]=rs,rs=e;var i=Hi;e=Vi;var a=32-Rn(i)-1;i&=~(1<<a),n+=1;var s=32-Rn(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,Hi=1<<32-Rn(t)+a|n<<a|i,Vi=s+e}else Hi=1<<s|n<<a|i,Vi=e}function dd(e){e.return!==null&&(es(e,1),iy(e,1,0))}function pd(e){for(;e===Rc;)Rc=ar[--sr],ar[sr]=null,Cc=ar[--sr],ar[sr]=null;for(;e===rs;)rs=Hn[--Vn],Hn[Vn]=null,Vi=Hn[--Vn],Hn[Vn]=null,Hi=Hn[--Vn],Hn[Vn]=null}var fn=null,je=null,Kt=!1,ni=null,_i=!1,Mf=Error(Z(519));function hs(e){var t=Error(Z(418,""));throw Yo(kn(t,e)),Mf}function b0(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[en]=e,t[xn]=i,n){case"dialog":Gt("cancel",t),Gt("close",t);break;case"iframe":case"object":case"embed":Gt("load",t);break;case"video":case"audio":for(n=0;n<Jo.length;n++)Gt(Jo[n],t);break;case"source":Gt("error",t);break;case"img":case"image":case"link":Gt("error",t),Gt("load",t);break;case"details":Gt("toggle",t);break;case"input":Gt("invalid",t),Iv(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0),Ac(t);break;case"select":Gt("invalid",t);break;case"textarea":Gt("invalid",t),Bv(t,i.value,i.defaultValue,i.children),Ac(t)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||N_(t.textContent,n)?(i.popover!=null&&(Gt("beforetoggle",t),Gt("toggle",t)),i.onScroll!=null&&Gt("scroll",t),i.onScrollEnd!=null&&Gt("scrollend",t),i.onClick!=null&&(t.onclick=ou),t=!0):t=!1,t||hs(e)}function M0(e){for(fn=e.return;fn;)switch(fn.tag){case 3:case 27:_i=!0;return;case 5:case 13:_i=!1;return;default:fn=fn.return}}function go(e){if(e!==fn)return!1;if(!Kt)return M0(e),Kt=!0,!1;var t=!1,n;if((n=e.tag!==3&&e.tag!==27)&&((n=e.tag===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Jf(e.type,e.memoizedProps)),n=!n),n&&(t=!0),t&&je&&hs(e),M0(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Z(317));t:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(n=e.data,n==="/$"){if(t===0){je=ii(e.nextSibling);break t}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++;e=e.nextSibling}je=null}}else je=fn?ii(e.stateNode.nextSibling):null;return!0}function ol(){je=fn=null,Kt=!1}function Yo(e){ni===null?ni=[e]:ni.push(e)}var Do=Error(Z(460)),ay=Error(Z(474)),Sf={then:function(){}};function S0(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Kl(){}function sy(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Kl,Kl),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,e===Do?Error(Z(483)):e;default:if(typeof t.status=="string")t.then(Kl,Kl);else{if(e=fe,e!==null&&100<e.shellSuspendCounter)throw Error(Z(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,e===Do?Error(Z(483)):e}throw Uo=t,Do}}var Uo=null;function E0(){if(Uo===null)throw Error(Z(459));var e=Uo;return Uo=null,e}var ur=null,Zo=0;function $l(e){var t=Zo;return Zo+=1,ur===null&&(ur=[]),sy(ur,e,t)}function vo(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function tc(e,t){throw t.$$typeof===pM?Error(Z(525)):(e=Object.prototype.toString.call(t),Error(Z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function A0(e){var t=e._init;return t(e._payload)}function ry(e){function t(h,v){if(e){var y=h.deletions;y===null?(h.deletions=[v],h.flags|=16):y.push(v)}}function n(h,v){if(!e)return null;for(;v!==null;)t(h,v),v=v.sibling;return null}function i(h){for(var v=new Map;h!==null;)h.key!==null?v.set(h.key,h):v.set(h.index,h),h=h.sibling;return v}function a(h,v){return h=Ra(h,v),h.index=0,h.sibling=null,h}function s(h,v,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<v?(h.flags|=33554434,v):y):(h.flags|=33554434,v)):(h.flags|=1048576,v)}function r(h){return e&&h.alternate===null&&(h.flags|=33554434),h}function o(h,v,y,_){return v===null||v.tag!==6?(v=Kh(y,h.mode,_),v.return=h,v):(v=a(v,y),v.return=h,v)}function l(h,v,y,_){var R=y.type;return R===Js?u(h,v,y.props.children,_,y.key):v!==null&&(v.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===va&&A0(R)===v.type)?(v=a(v,y.props),vo(v,y),v.return=h,v):(v=vc(y.type,y.key,y.props,null,h.mode,_),vo(v,y),v.return=h,v)}function c(h,v,y,_){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=$h(y,h.mode,_),v.return=h,v):(v=a(v,y.children||[]),v.return=h,v)}function u(h,v,y,_,R){return v===null||v.tag!==7?(v=ls(y,h.mode,_,R),v.return=h,v):(v=a(v,y),v.return=h,v)}function d(h,v,y){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Kh(""+v,h.mode,y),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Xl:return y=vc(v.type,v.key,v.props,null,h.mode,y),vo(y,v),y.return=h,y;case Mo:return v=$h(v,h.mode,y),v.return=h,v;case va:var _=v._init;return v=_(v._payload),d(h,v,y)}if(Eo(v)||po(v))return v=ls(v,h.mode,y,null),v.return=h,v;if(typeof v.then=="function")return d(h,$l(v),y);if(v.$$typeof===Fi)return d(h,ec(h,v),y);tc(h,v)}return null}function f(h,v,y,_){var R=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return R!==null?null:o(h,v,""+y,_);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Xl:return y.key===R?l(h,v,y,_):null;case Mo:return y.key===R?c(h,v,y,_):null;case va:return R=y._init,y=R(y._payload),f(h,v,y,_)}if(Eo(y)||po(y))return R!==null?null:u(h,v,y,_,null);if(typeof y.then=="function")return f(h,v,$l(y),_);if(y.$$typeof===Fi)return f(h,v,ec(h,y),_);tc(h,y)}return null}function p(h,v,y,_,R){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return h=h.get(y)||null,o(v,h,""+_,R);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Xl:return h=h.get(_.key===null?y:_.key)||null,l(v,h,_,R);case Mo:return h=h.get(_.key===null?y:_.key)||null,c(v,h,_,R);case va:var w=_._init;return _=w(_._payload),p(h,v,y,_,R)}if(Eo(_)||po(_))return h=h.get(y)||null,u(v,h,_,R,null);if(typeof _.then=="function")return p(h,v,y,$l(_),R);if(_.$$typeof===Fi)return p(h,v,y,ec(v,_),R);tc(v,_)}return null}function g(h,v,y,_){for(var R=null,w=null,T=v,C=v=0,E=null;T!==null&&C<y.length;C++){T.index>C?(E=T,T=null):E=T.sibling;var b=f(h,T,y[C],_);if(b===null){T===null&&(T=E);break}e&&T&&b.alternate===null&&t(h,T),v=s(b,v,C),w===null?R=b:w.sibling=b,w=b,T=E}if(C===y.length)return n(h,T),Kt&&es(h,C),R;if(T===null){for(;C<y.length;C++)T=d(h,y[C],_),T!==null&&(v=s(T,v,C),w===null?R=T:w.sibling=T,w=T);return Kt&&es(h,C),R}for(T=i(T);C<y.length;C++)E=p(T,h,C,y[C],_),E!==null&&(e&&E.alternate!==null&&T.delete(E.key===null?C:E.key),v=s(E,v,C),w===null?R=E:w.sibling=E,w=E);return e&&T.forEach(function(D){return t(h,D)}),Kt&&es(h,C),R}function x(h,v,y,_){if(y==null)throw Error(Z(151));for(var R=null,w=null,T=v,C=v=0,E=null,b=y.next();T!==null&&!b.done;C++,b=y.next()){T.index>C?(E=T,T=null):E=T.sibling;var D=f(h,T,b.value,_);if(D===null){T===null&&(T=E);break}e&&T&&D.alternate===null&&t(h,T),v=s(D,v,C),w===null?R=D:w.sibling=D,w=D,T=E}if(b.done)return n(h,T),Kt&&es(h,C),R;if(T===null){for(;!b.done;C++,b=y.next())b=d(h,b.value,_),b!==null&&(v=s(b,v,C),w===null?R=b:w.sibling=b,w=b);return Kt&&es(h,C),R}for(T=i(T);!b.done;C++,b=y.next())b=p(T,h,C,b.value,_),b!==null&&(e&&b.alternate!==null&&T.delete(b.key===null?C:b.key),v=s(b,v,C),w===null?R=b:w.sibling=b,w=b);return e&&T.forEach(function(q){return t(h,q)}),Kt&&es(h,C),R}function m(h,v,y,_){if(typeof y=="object"&&y!==null&&y.type===Js&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Xl:t:{for(var R=y.key;v!==null;){if(v.key===R){if(R=y.type,R===Js){if(v.tag===7){n(h,v.sibling),_=a(v,y.props.children),_.return=h,h=_;break t}}else if(v.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===va&&A0(R)===v.type){n(h,v.sibling),_=a(v,y.props),vo(_,y),_.return=h,h=_;break t}n(h,v);break}else t(h,v);v=v.sibling}y.type===Js?(_=ls(y.props.children,h.mode,_,y.key),_.return=h,h=_):(_=vc(y.type,y.key,y.props,null,h.mode,_),vo(_,y),_.return=h,h=_)}return r(h);case Mo:t:{for(R=y.key;v!==null;){if(v.key===R)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){n(h,v.sibling),_=a(v,y.children||[]),_.return=h,h=_;break t}else{n(h,v);break}else t(h,v);v=v.sibling}_=$h(y,h.mode,_),_.return=h,h=_}return r(h);case va:return R=y._init,y=R(y._payload),m(h,v,y,_)}if(Eo(y))return g(h,v,y,_);if(po(y)){if(R=po(y),typeof R!="function")throw Error(Z(150));return y=R.call(y),x(h,v,y,_)}if(typeof y.then=="function")return m(h,v,$l(y),_);if(y.$$typeof===Fi)return m(h,v,ec(h,y),_);tc(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,v!==null&&v.tag===6?(n(h,v.sibling),_=a(v,y),_.return=h,h=_):(n(h,v),_=Kh(y,h.mode,_),_.return=h,h=_),r(h)):n(h,v)}return function(h,v,y,_){try{Zo=0;var R=m(h,v,y,_);return ur=null,R}catch(T){if(T===Do)throw T;var w=qn(29,T,null,h.mode);return w.lanes=_,w.return=h,w}finally{}}}var fs=ry(!0),oy=ry(!1),yr=Ai(null),Dc=Ai(0);function T0(e,t){e=Zi,ye(Dc,e),ye(yr,t),Zi=e|t.baseLanes}function Ef(){ye(Dc,Zi),ye(yr,yr.current)}function md(){Zi=Dc.current,We(yr),We(Dc)}var Wn=Ai(null),Si=null;function _a(e){var t=e.alternate;ye(Fe,Fe.current&1),ye(Wn,e),Si===null&&(t===null||yr.current!==null||t.memoizedState!==null)&&(Si=e)}function ly(e){if(e.tag===22){if(ye(Fe,Fe.current),ye(Wn,e),Si===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Si=e)}}else xa(e)}function xa(){ye(Fe,Fe.current),ye(Wn,Wn.current)}function Gi(e){We(Wn),Si===e&&(Si=null),We(Fe)}var Fe=Ai(0);function Uc(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var RS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},CS=He.unstable_scheduleCallback,DS=He.unstable_NormalPriority,Be={$$typeof:Fi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gd(){return{controller:new RS,data:new Map,refCount:0}}function ll(e){e.refCount--,e.refCount===0&&CS(DS,function(){e.controller.abort()})}var Lo=null,Af=0,_r=0,hr=null;function US(e,t){if(Lo===null){var n=Lo=[];Af=0,_r=Fd(),hr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Af++,t.then(w0,w0),t}function w0(){if(--Af===0&&Lo!==null){hr!==null&&(hr.status="fulfilled");var e=Lo;Lo=null,_r=0,hr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function LS(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var R0=Dt.S;Dt.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&US(e,t),R0!==null&&R0(e,t)};var os=Ai(null);function vd(){var e=os.current;return e!==null?e:fe.pooledCache}function dc(e,t){t===null?ye(os,os.current):ye(os,t.pool)}function cy(){var e=vd();return e===null?null:{parent:Be._currentValue,pool:e}}var Pa=0,zt=null,ie=null,Pe=null,Lc=!1,fr=!1,ds=!1,Nc=0,jo=0,dr=null,NS=0;function De(){throw Error(Z(321))}function yd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dn(e[n],t[n]))return!1;return!0}function _d(e,t,n,i,a,s){return Pa=s,zt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Dt.H=e===null||e.memoizedState===null?_s:Ba,ds=!1,s=n(i,a),ds=!1,fr&&(s=hy(t,n,i,a)),uy(e),s}function uy(e){Dt.H=Ei;var t=ie!==null&&ie.next!==null;if(Pa=0,Pe=ie=zt=null,Lc=!1,jo=0,dr=null,t)throw Error(Z(300));e===null||Xe||(e=e.dependencies,e!==null&&Ic(e)&&(Xe=!0))}function hy(e,t,n,i){zt=e;var a=0;do{if(fr&&(dr=null),jo=0,fr=!1,25<=a)throw Error(Z(301));if(a+=1,Pe=ie=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Dt.H=xs,s=t(n,i)}while(fr);return s}function PS(){var e=Dt.H,t=e.useState()[0];return t=typeof t.then=="function"?cl(t):t,e=e.useState()[0],(ie!==null?ie.memoizedState:null)!==e&&(zt.flags|=1024),t}function xd(){var e=Nc!==0;return Nc=0,e}function bd(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Md(e){if(Lc){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Lc=!1}Pa=0,Pe=ie=zt=null,fr=!1,jo=Nc=0,dr=null}function _n(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?zt.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function Oe(){if(ie===null){var e=zt.alternate;e=e!==null?e.memoizedState:null}else e=ie.next;var t=Pe===null?zt.memoizedState:Pe.next;if(t!==null)Pe=t,ie=e;else{if(e===null)throw zt.alternate===null?Error(Z(467)):Error(Z(310));ie=e,e={memoizedState:ie.memoizedState,baseState:ie.baseState,baseQueue:ie.baseQueue,queue:ie.queue,next:null},Pe===null?zt.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}var eu;eu=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function cl(e){var t=jo;return jo+=1,dr===null&&(dr=[]),e=sy(dr,e,t),t=zt,(Pe===null?t.memoizedState:Pe.next)===null&&(t=t.alternate,Dt.H=t===null||t.memoizedState===null?_s:Ba),e}function nu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return cl(e);if(e.$$typeof===Fi)return nn(e)}throw Error(Z(438,String(e)))}function Sd(e){var t=null,n=zt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=zt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=eu(),zt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=gM;return t.index++,n}function Wi(e,t){return typeof t=="function"?t(e):t}function pc(e){var t=Oe();return Ed(t,ie,e)}function Ed(e,t,n){var i=e.queue;if(i===null)throw Error(Z(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,u=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(Yt&d)===d:(Pa&d)===d){var f=c.revertLane;if(f===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===_r&&(u=!0);else if((Pa&f)===f){c=c.next,f===_r&&(u=!0);continue}else d={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=s):l=l.next=d,zt.lanes|=f,Ia|=f;d=c.action,ds&&n(s,d),s=c.hasEagerState?c.eagerState:n(s,d)}else f={lane:d,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,r=s):l=l.next=f,zt.lanes|=d,Ia|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!Dn(s,e.memoizedState)&&(Xe=!0,u&&(n=hr,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Vh(e){var t=Oe(),n=t.queue;if(n===null)throw Error(Z(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);Dn(s,t.memoizedState)||(Xe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function fy(e,t,n){var i=zt,a=Oe(),s=Kt;if(s){if(n===void 0)throw Error(Z(407));n=n()}else n=t();var r=!Dn((ie||a).memoizedState,n);if(r&&(a.memoizedState=n,Xe=!0),a=a.queue,Ad(my.bind(null,i,a,e),[e]),a.getSnapshot!==t||r||Pe!==null&&Pe.memoizedState.tag&1){if(i.flags|=2048,xr(9,py.bind(null,i,a,n,t),{destroy:void 0},null),fe===null)throw Error(Z(349));s||Pa&60||dy(i,t,n)}return n}function dy(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=zt.updateQueue,t===null?(t=eu(),zt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function py(e,t,n,i){t.value=n,t.getSnapshot=i,gy(t)&&vy(e)}function my(e,t,n){return n(function(){gy(t)&&vy(e)})}function gy(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dn(e,n)}catch{return!0}}function vy(e){var t=Na(e,2);t!==null&&dn(t,e,2)}function Tf(e){var t=_n();if(typeof e=="function"){var n=e;if(e=n(),ds){Sa(!0);try{n()}finally{Sa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:e},t}function yy(e,t,n,i){return e.baseState=n,Ed(e,ie,typeof i=="function"?i:Wi)}function OS(e,t,n,i,a){if(au(e))throw Error(Z(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Dt.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,_y(t,s)):(s.next=n.next,t.pending=n.next=s)}}function _y(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=Dt.T,r={};Dt.T=r;try{var o=n(a,i),l=Dt.S;l!==null&&l(r,o),C0(e,t,o)}catch(c){wf(e,t,c)}finally{Dt.T=s}}else try{s=n(a,i),C0(e,t,s)}catch(c){wf(e,t,c)}}function C0(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){D0(e,t,i)},function(i){return wf(e,t,i)}):D0(e,t,n)}function D0(e,t,n){t.status="fulfilled",t.value=n,xy(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,_y(e,n)))}function wf(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,xy(t),t=t.next;while(t!==i)}e.action=null}function xy(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function by(e,t){return t}function My(e,t){if(Kt){var n=fe.formState;if(n!==null){t:{var i=zt;if(Kt){if(je){e:{for(var a=je,s=_i;a.nodeType!==8;){if(!s){a=null;break e}if(a=ii(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){je=ii(a.nextSibling),i=a.data==="F!";break t}}hs(i)}i=!1}i&&(t=n[0])}}return n=_n(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:by,lastRenderedState:t},n.queue=i,n=Fy.bind(null,zt,i),i.dispatch=n,i=Tf(!1),s=Cd.bind(null,zt,!1,i.queue),i=_n(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=OS.bind(null,zt,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function Sy(e){var t=Oe();return Ey(t,ie,e)}function Ey(e,t,n){t=Ed(e,t,by)[0],e=pc(Wi)[0],t=typeof t=="object"&&t!==null&&typeof t.then=="function"?cl(t):t;var i=Oe(),a=i.queue,s=a.dispatch;return n!==i.memoizedState&&(zt.flags|=2048,xr(9,IS.bind(null,a,n),{destroy:void 0},null)),[t,s,e]}function IS(e,t){e.action=t}function Ay(e){var t=Oe(),n=ie;if(n!==null)return Ey(t,n,e);Oe(),t=t.memoizedState,n=Oe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function xr(e,t,n,i){return e={tag:e,create:t,inst:n,deps:i,next:null},t=zt.updateQueue,t===null&&(t=eu(),zt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Ty(){return Oe().memoizedState}function mc(e,t,n,i){var a=_n();zt.flags|=e,a.memoizedState=xr(1|t,n,{destroy:void 0},i===void 0?null:i)}function iu(e,t,n,i){var a=Oe();i=i===void 0?null:i;var s=a.memoizedState.inst;ie!==null&&i!==null&&yd(i,ie.memoizedState.deps)?a.memoizedState=xr(t,n,s,i):(zt.flags|=e,a.memoizedState=xr(1|t,n,s,i))}function U0(e,t){mc(8390656,8,e,t)}function Ad(e,t){iu(2048,8,e,t)}function wy(e,t){return iu(4,2,e,t)}function Ry(e,t){return iu(4,4,e,t)}function Cy(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Dy(e,t,n){n=n!=null?n.concat([e]):null,iu(4,4,Cy.bind(null,t,e),n)}function Td(){}function Uy(e,t){var n=Oe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&yd(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ly(e,t){var n=Oe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&yd(t,i[1]))return i[0];if(i=e(),ds){Sa(!0);try{e()}finally{Sa(!1)}}return n.memoizedState=[i,t],i}function wd(e,t,n){return n===void 0||Pa&1073741824?e.memoizedState=t:(e.memoizedState=n,e=x_(),zt.lanes|=e,Ia|=e,n)}function Ny(e,t,n,i){return Dn(n,t)?n:yr.current!==null?(e=wd(e,n,i),Dn(e,t)||(Xe=!0),e):Pa&42?(e=x_(),zt.lanes|=e,Ia|=e,t):(Xe=!0,e.memoizedState=n)}function Py(e,t,n,i,a){var s=ge.p;ge.p=s!==0&&8>s?s:8;var r=Dt.T,o={};Dt.T=o,Cd(e,!1,t,n);try{var l=a(),c=Dt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=LS(l,i);No(e,t,u,Cn(e))}else No(e,t,i,Cn(e))}catch(d){No(e,t,{then:function(){},status:"rejected",reason:d},Cn())}finally{ge.p=s,Dt.T=r}}function zS(){}function Rf(e,t,n,i){if(e.tag!==5)throw Error(Z(476));var a=Oy(e).queue;Py(e,a,t,ss,n===null?zS:function(){return Iy(e),n(i)})}function Oy(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ss,baseState:ss,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:ss},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Iy(e){var t=Oy(e).next.queue;No(e,t,{},Cn())}function Rd(){return nn($o)}function zy(){return Oe().memoizedState}function By(){return Oe().memoizedState}function BS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Cn();e=Ta(n);var i=wa(t,e,n);i!==null&&(dn(i,t,n),Oo(i,t,n)),t={cache:gd()},e.payload=t;return}t=t.return}}function FS(e,t,n){var i=Cn();n={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},au(e)?Hy(t,n):(n=fd(e,t,n,i),n!==null&&(dn(n,e,i),Vy(n,t,i)))}function Fy(e,t,n){var i=Cn();No(e,t,n,i)}function No(e,t,n,i){var a={lane:i,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(au(e))Hy(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,Dn(o,r))return tu(e,t,a,0),fe===null&&$c(),!1}catch{}finally{}if(n=fd(e,t,a,i),n!==null)return dn(n,e,i),Vy(n,t,i),!0}return!1}function Cd(e,t,n,i){if(i={lane:2,revertLane:Fd(),action:i,hasEagerState:!1,eagerState:null,next:null},au(e)){if(t)throw Error(Z(479))}else t=fd(e,n,i,2),t!==null&&dn(t,e,2)}function au(e){var t=e.alternate;return e===zt||t!==null&&t===zt}function Hy(e,t){fr=Lc=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Vy(e,t,n){if(n&4194176){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Cv(e,n)}}var Ei={readContext:nn,use:nu,useCallback:De,useContext:De,useEffect:De,useImperativeHandle:De,useLayoutEffect:De,useInsertionEffect:De,useMemo:De,useReducer:De,useRef:De,useState:De,useDebugValue:De,useDeferredValue:De,useTransition:De,useSyncExternalStore:De,useId:De};Ei.useCacheRefresh=De;Ei.useMemoCache=De;Ei.useHostTransitionStatus=De;Ei.useFormState=De;Ei.useActionState=De;Ei.useOptimistic=De;var _s={readContext:nn,use:nu,useCallback:function(e,t){return _n().memoizedState=[e,t===void 0?null:t],e},useContext:nn,useEffect:U0,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,mc(4194308,4,Cy.bind(null,t,e),n)},useLayoutEffect:function(e,t){return mc(4194308,4,e,t)},useInsertionEffect:function(e,t){mc(4,2,e,t)},useMemo:function(e,t){var n=_n();t=t===void 0?null:t;var i=e();if(ds){Sa(!0);try{e()}finally{Sa(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=_n();if(n!==void 0){var a=n(t);if(ds){Sa(!0);try{n(t)}finally{Sa(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=FS.bind(null,zt,e),[i.memoizedState,e]},useRef:function(e){var t=_n();return e={current:e},t.memoizedState=e},useState:function(e){e=Tf(e);var t=e.queue,n=Fy.bind(null,zt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Td,useDeferredValue:function(e,t){var n=_n();return wd(n,e,t)},useTransition:function(){var e=Tf(!1);return e=Py.bind(null,zt,e.queue,!0,!1),_n().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=zt,a=_n();if(Kt){if(n===void 0)throw Error(Z(407));n=n()}else{if(n=t(),fe===null)throw Error(Z(349));Yt&60||dy(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,U0(my.bind(null,i,s,e),[e]),i.flags|=2048,xr(9,py.bind(null,i,s,n,t),{destroy:void 0},null),n},useId:function(){var e=_n(),t=fe.identifierPrefix;if(Kt){var n=Vi,i=Hi;n=(i&~(1<<32-Rn(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=Nc++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=NS++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},useCacheRefresh:function(){return _n().memoizedState=BS.bind(null,zt)}};_s.useMemoCache=Sd;_s.useHostTransitionStatus=Rd;_s.useFormState=My;_s.useActionState=My;_s.useOptimistic=function(e){var t=_n();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Cd.bind(null,zt,!0,n),n.dispatch=t,[e,t]};var Ba={readContext:nn,use:nu,useCallback:Uy,useContext:nn,useEffect:Ad,useImperativeHandle:Dy,useInsertionEffect:wy,useLayoutEffect:Ry,useMemo:Ly,useReducer:pc,useRef:Ty,useState:function(){return pc(Wi)},useDebugValue:Td,useDeferredValue:function(e,t){var n=Oe();return Ny(n,ie.memoizedState,e,t)},useTransition:function(){var e=pc(Wi)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:cl(e),t]},useSyncExternalStore:fy,useId:zy};Ba.useCacheRefresh=By;Ba.useMemoCache=Sd;Ba.useHostTransitionStatus=Rd;Ba.useFormState=Sy;Ba.useActionState=Sy;Ba.useOptimistic=function(e,t){var n=Oe();return yy(n,ie,e,t)};var xs={readContext:nn,use:nu,useCallback:Uy,useContext:nn,useEffect:Ad,useImperativeHandle:Dy,useInsertionEffect:wy,useLayoutEffect:Ry,useMemo:Ly,useReducer:Vh,useRef:Ty,useState:function(){return Vh(Wi)},useDebugValue:Td,useDeferredValue:function(e,t){var n=Oe();return ie===null?wd(n,e,t):Ny(n,ie.memoizedState,e,t)},useTransition:function(){var e=Vh(Wi)[0],t=Oe().memoizedState;return[typeof e=="boolean"?e:cl(e),t]},useSyncExternalStore:fy,useId:zy};xs.useCacheRefresh=By;xs.useMemoCache=Sd;xs.useHostTransitionStatus=Rd;xs.useFormState=Ay;xs.useActionState=Ay;xs.useOptimistic=function(e,t){var n=Oe();return ie!==null?yy(n,ie,e,t):(n.baseState=e,[e,n.queue.dispatch])};function Gh(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:ve({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Cf={isMounted:function(e){return(e=e._reactInternals)?Er(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Cn(),a=Ta(i);a.payload=t,n!=null&&(a.callback=n),t=wa(e,a,i),t!==null&&(dn(t,e,i),Oo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Cn(),a=Ta(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=wa(e,a,i),t!==null&&(dn(t,e,i),Oo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Cn(),i=Ta(n);i.tag=2,t!=null&&(i.callback=t),t=wa(e,i,n),t!==null&&(dn(t,e,n),Oo(t,e,n))}};function L0(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!Wo(n,i)||!Wo(a,s):!0}function N0(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Cf.enqueueReplaceState(t,t.state,null)}function ps(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=ve({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}var Pc=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Gy(e){Pc(e)}function ky(e){console.error(e)}function qy(e){Pc(e)}function Oc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function P0(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Df(e,t,n){return n=Ta(n),n.tag=3,n.payload={element:null},n.callback=function(){Oc(e,t)},n}function Xy(e){return e=Ta(e),e.tag=3,e}function Wy(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){P0(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){P0(t,n,i),typeof a!="function"&&(Ca===null?Ca=new Set([this]):Ca.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function HS(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&ul(t,n,a,!0),n=Wn.current,n!==null){switch(n.tag){case 13:return Si===null?Xf():n.alternate===null&&we===0&&(we=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Sf?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),ef(e,i,a)),!1;case 22:return n.flags|=65536,i===Sf?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),ef(e,i,a)),!1}throw Error(Z(435,n.tag))}return ef(e,i,a),Xf(),!1}if(Kt)return t=Wn.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==Mf&&(e=Error(Z(422),{cause:i}),Yo(kn(e,n)))):(i!==Mf&&(t=Error(Z(423),{cause:i}),Yo(kn(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=kn(i,n),a=Df(e.stateNode,i,a),Zh(e,a),we!==4&&(we=2)),!1;var s=Error(Z(520),{cause:i});if(s=kn(s,n),Fo===null?Fo=[s]:Fo.push(s),we!==4&&(we=2),t===null)return!0;i=kn(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Df(n.stateNode,i,e),Zh(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Ca===null||!Ca.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Xy(a),Wy(a,e,n,i),Zh(n,a),!1}n=n.return}while(n!==null);return!1}var Yy=Error(Z(461)),Xe=!1;function Ze(e,t,n,i){t.child=e===null?oy(t,null,n,i):fs(t,e.child,n,i)}function O0(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return ms(t),i=_d(e,t,n,r,s,a),o=xd(),e!==null&&!Xe?(bd(e,t,a),Yi(e,t,a)):(Kt&&o&&dd(t),t.flags|=1,Ze(e,t,i,a),t.child)}function I0(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!Pd(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,Zy(e,t,s,i,a)):(e=vc(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Dd(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Wo,n(r,i)&&e.ref===t.ref)return Yi(e,t,a)}return t.flags|=1,e=Ra(s,i),e.ref=t.ref,e.return=t,t.child=e}function Zy(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(Wo(s,i)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=i=s,Dd(e,a))e.flags&131072&&(Xe=!0);else return t.lanes=e.lanes,Yi(e,t,a)}return Uf(e,t,n,i,a)}function jy(e,t,n){var i=t.pendingProps,a=i.children,s=(t.stateNode._pendingVisibility&2)!==0,r=e!==null?e.memoizedState:null;if(Po(e,t),i.mode==="hidden"||s){if(t.flags&128){if(i=r!==null?r.baseLanes|n:n,e!==null){for(a=t.child=e.child,s=0;a!==null;)s=s|a.lanes|a.childLanes,a=a.sibling;t.childLanes=s&~i}else t.childLanes=0,t.child=null;return z0(e,t,i,n)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&dc(t,r!==null?r.cachePool:null),r!==null?T0(t,r):Ef(),ly(t);else return t.lanes=t.childLanes=536870912,z0(e,t,r!==null?r.baseLanes|n:n,n)}else r!==null?(dc(t,r.cachePool),T0(t,r),xa(t),t.memoizedState=null):(e!==null&&dc(t,null),Ef(),xa(t));return Ze(e,t,a,n),t.child}function z0(e,t,n,i){var a=vd();return a=a===null?null:{parent:Be._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&dc(t,null),Ef(),ly(t),e!==null&&ul(e,t,i,!0),null}function Po(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=2097664);else{if(typeof n!="function"&&typeof n!="object")throw Error(Z(284));(e===null||e.ref!==n)&&(t.flags|=2097664)}}function Uf(e,t,n,i,a){return ms(t),n=_d(e,t,n,i,void 0,a),i=xd(),e!==null&&!Xe?(bd(e,t,a),Yi(e,t,a)):(Kt&&i&&dd(t),t.flags|=1,Ze(e,t,n,a),t.child)}function B0(e,t,n,i,a,s){return ms(t),t.updateQueue=null,n=hy(t,i,n,a),uy(e),i=xd(),e!==null&&!Xe?(bd(e,t,s),Yi(e,t,s)):(Kt&&i&&dd(t),t.flags|=1,Ze(e,t,n,s),t.child)}function F0(e,t,n,i,a){if(ms(t),t.stateNode===null){var s=ir,r=n.contextType;typeof r=="object"&&r!==null&&(s=nn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Cf,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},Ud(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?nn(r):ir,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Gh(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Cf.enqueueReplaceState(s,s.state,null),zo(t,i,s,a),Io(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=ps(n,o);s.props=l;var c=s.context,u=n.contextType;r=ir,typeof u=="object"&&u!==null&&(r=nn(u));var d=n.getDerivedStateFromProps;u=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,u||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&N0(t,s,i,r),ya=!1;var f=t.memoizedState;s.state=f,zo(t,i,s,a),Io(),c=t.memoizedState,o||f!==c||ya?(typeof d=="function"&&(Gh(t,n,d,i),c=t.memoizedState),(l=ya||L0(t,n,l,i,f,c,r))?(u||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,zf(e,t),r=t.memoizedProps,u=ps(n,r),s.props=u,d=t.pendingProps,f=s.context,c=n.contextType,l=ir,typeof c=="object"&&c!==null&&(l=nn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==d||f!==l)&&N0(t,s,i,l),ya=!1,f=t.memoizedState,s.state=f,zo(t,i,s,a),Io();var p=t.memoizedState;r!==d||f!==p||ya||e!==null&&e.dependencies!==null&&Ic(e.dependencies)?(typeof o=="function"&&(Gh(t,n,o,i),p=t.memoizedState),(u=ya||L0(t,n,u,i,f,p,l)||e!==null&&e.dependencies!==null&&Ic(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),s.props=i,s.state=p,s.context=l,i=u):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,Po(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=fs(t,e.child,null,a),t.child=fs(t,null,n,a)):Ze(e,t,n,a),t.memoizedState=s.state,e=t.child):e=Yi(e,t,a),e}function H0(e,t,n,i){return ol(),t.flags|=256,Ze(e,t,n,i),t.child}var kh={dehydrated:null,treeContext:null,retryLane:0};function qh(e){return{baseLanes:e,cachePool:cy()}}function Xh(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Xn),e}function Jy(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(Fe.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Kt){if(a?_a(t):xa(t),Kt){var o=je,l;if(l=o){t:{for(l=o,o=_i;l.nodeType!==8;){if(!o){o=null;break t}if(l=ii(l.nextSibling),l===null){o=null;break t}}o=l}o!==null?(t.memoizedState={dehydrated:o,treeContext:rs!==null?{id:Hi,overflow:Vi}:null,retryLane:536870912},l=qn(18,null,null,0),l.stateNode=o,l.return=t,t.child=l,fn=t,je=null,l=!0):l=!1}l||hs(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return o.data==="$!"?t.lanes=16:t.lanes=536870912,null;Gi(t)}return o=i.children,i=i.fallback,a?(xa(t),a=t.mode,o=Nf({mode:"hidden",children:o},a),i=ls(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,a=t.child,a.memoizedState=qh(n),a.childLanes=Xh(e,r,n),t.memoizedState=kh,i):(_a(t),Lf(t,o))}if(l=e.memoizedState,l!==null&&(o=l.dehydrated,o!==null)){if(s)t.flags&256?(_a(t),t.flags&=-257,t=Wh(e,t,n)):t.memoizedState!==null?(xa(t),t.child=e.child,t.flags|=128,t=null):(xa(t),a=i.fallback,o=t.mode,i=Nf({mode:"visible",children:i.children},o),a=ls(a,o,n,null),a.flags|=2,i.return=t,a.return=t,i.sibling=a,t.child=i,fs(t,e.child,null,n),i=t.child,i.memoizedState=qh(n),i.childLanes=Xh(e,r,n),t.memoizedState=kh,t=a);else if(_a(t),o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(Z(419)),i.stack="",i.digest=r,Yo({value:i,source:null,stack:null}),t=Wh(e,t,n)}else if(Xe||ul(e,t,n,!1),r=(n&e.childLanes)!==0,Xe||r){if(r=fe,r!==null){if(i=n&-n,i&42)i=1;else switch(i){case 2:i=1;break;case 8:i=4;break;case 32:i=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:i=64;break;case 268435456:i=134217728;break;default:i=0}if(i=i&(r.suspendedLanes|n)?0:i,i!==0&&i!==l.retryLane)throw l.retryLane=i,Na(e,i),dn(r,e,i),Yy}o.data==="$?"||Xf(),t=Wh(e,t,n)}else o.data==="$?"?(t.flags|=128,t.child=e.child,t=e1.bind(null,e),o._reactRetry=t,t=null):(e=l.treeContext,je=ii(o.nextSibling),fn=t,Kt=!0,ni=null,_i=!1,e!==null&&(Hn[Vn++]=Hi,Hn[Vn++]=Vi,Hn[Vn++]=rs,Hi=e.id,Vi=e.overflow,rs=t),t=Lf(t,i.children),t.flags|=4096);return t}return a?(xa(t),a=i.fallback,o=t.mode,l=e.child,c=l.sibling,i=Ra(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&31457280,c!==null?a=Ra(c,a):(a=ls(a,o,n,null),a.flags|=2),a.return=t,i.return=t,i.sibling=a,t.child=i,i=a,a=t.child,o=e.child.memoizedState,o===null?o=qh(n):(l=o.cachePool,l!==null?(c=Be._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=cy(),o={baseLanes:o.baseLanes|n,cachePool:l}),a.memoizedState=o,a.childLanes=Xh(e,r,n),t.memoizedState=kh,i):(_a(t),n=e.child,e=n.sibling,n=Ra(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Lf(e,t){return t=Nf({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Nf(e,t){return y_(e,t,0,null)}function Wh(e,t,n){return fs(t,e.child,null,n),e=Lf(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function V0(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Of(e.return,t,n)}function Yh(e,t,n,i,a){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=a)}function Qy(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;if(Ze(e,t,i.children,n),i=Fe.current,i&2)i=i&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&V0(e,n,t);else if(e.tag===19)V0(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}switch(ye(Fe,i),a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&Uc(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Yh(t,!1,a,n,s);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Uc(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Yh(t,!0,n,null,s);break;case"together":Yh(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Yi(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ia|=t.lanes,!(n&t.childLanes))if(e!==null){if(ul(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(Z(153));if(t.child!==null){for(e=t.child,n=Ra(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ra(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Dd(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Ic(e)))}function VS(e,t,n){switch(t.tag){case 3:Mc(t,t.stateNode.containerInfo),ba(t,Be,e.memoizedState.cache),ol();break;case 27:case 5:df(t);break;case 4:Mc(t,t.stateNode.containerInfo);break;case 10:ba(t,t.type,t.memoizedProps.value);break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(_a(t),t.flags|=128,null):n&t.child.childLanes?Jy(e,t,n):(_a(t),e=Yi(e,t,n),e!==null?e.sibling:null);_a(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(ul(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return Qy(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ye(Fe,Fe.current),i)break;return null;case 22:case 23:return t.lanes=0,jy(e,t,n);case 24:ba(t,Be,e.memoizedState.cache)}return Yi(e,t,n)}function Ky(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!Dd(e,n)&&!(t.flags&128))return Xe=!1,VS(e,t,n);Xe=!!(e.flags&131072)}else Xe=!1,Kt&&t.flags&1048576&&iy(t,Cc,t.index);switch(t.lanes=0,t.tag){case 16:t:{e=t.pendingProps;var i=t.elementType,a=i._init;if(i=a(i._payload),t.type=i,typeof i=="function")Pd(i)?(e=ps(i,e),t.tag=1,t=F0(null,t,i,e,n)):(t.tag=0,t=Uf(null,t,i,e,n));else{if(i!=null){if(a=i.$$typeof,a===ed){t.tag=11,t=O0(null,t,i,e,n);break t}else if(a===nd){t.tag=14,t=I0(null,t,i,e,n);break t}}throw t=hf(i)||i,Error(Z(306,t,""))}}return t;case 0:return Uf(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=ps(i,t.pendingProps),F0(e,t,i,a,n);case 3:t:{if(Mc(t,t.stateNode.containerInfo),e===null)throw Error(Z(387));var s=t.pendingProps;a=t.memoizedState,i=a.element,zf(e,t),zo(t,s,null,n);var r=t.memoizedState;if(s=r.cache,ba(t,Be,s),s!==a.cache&&If(t,[Be],n,!0),Io(),s=r.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=H0(e,t,s,n);break t}else if(s!==i){i=kn(Error(Z(424)),t),Yo(i),t=H0(e,t,s,n);break t}else for(je=ii(t.stateNode.containerInfo.firstChild),fn=t,Kt=!0,ni=null,_i=!0,n=oy(t,null,s,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ol(),s===i){t=Yi(e,t,n);break t}Ze(e,t,s,n)}t=t.child}return t;case 26:return Po(e,t),e===null?(n=ov(t.type,null,t.pendingProps,null))?t.memoizedState=n:Kt||(n=t.type,e=t.pendingProps,i=kc(Aa.current).createElement(n),i[en]=t,i[xn]=e,Je(i,n,e),qe(i),t.stateNode=i):t.memoizedState=ov(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return df(t),e===null&&Kt&&(i=t.stateNode=I_(t.type,t.pendingProps,Aa.current),fn=t,_i=!0,je=ii(i.firstChild)),i=t.pendingProps.children,e!==null||Kt?Ze(e,t,i,n):t.child=fs(t,null,i,n),Po(e,t),t.child;case 5:return e===null&&Kt&&((a=i=je)&&(i=m1(i,t.type,t.pendingProps,_i),i!==null?(t.stateNode=i,fn=t,je=ii(i.firstChild),_i=!1,a=!0):a=!1),a||hs(t)),df(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Jf(a,s)?i=null:r!==null&&Jf(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=_d(e,t,PS,null,null,n),$o._currentValue=a),Po(e,t),Ze(e,t,i,n),t.child;case 6:return e===null&&Kt&&((e=n=je)&&(n=g1(n,t.pendingProps,_i),n!==null?(t.stateNode=n,fn=t,je=null,e=!0):e=!1),e||hs(t)),null;case 13:return Jy(e,t,n);case 4:return Mc(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=fs(t,null,i,n):Ze(e,t,i,n),t.child;case 11:return O0(e,t,t.type,t.pendingProps,n);case 7:return Ze(e,t,t.pendingProps,n),t.child;case 8:return Ze(e,t,t.pendingProps.children,n),t.child;case 12:return Ze(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,ba(t,t.type,i.value),Ze(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,ms(t),a=nn(a),i=i(a),t.flags|=1,Ze(e,t,i,n),t.child;case 14:return I0(e,t,t.type,t.pendingProps,n);case 15:return Zy(e,t,t.type,t.pendingProps,n);case 19:return Qy(e,t,n);case 22:return jy(e,t,n);case 24:return ms(t),i=nn(Be),e===null?(a=vd(),a===null&&(a=fe,s=gd(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},Ud(t),ba(t,Be,a)):(e.lanes&n&&(zf(e,t),zo(t,null,null,n),Io()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ba(t,Be,i)):(i=s.cache,ba(t,Be,i),i!==a.cache&&If(t,[Be],n,!0))),Ze(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(Z(156,t.tag))}var Pf=Ai(null),bs=null,ki=null;function ba(e,t,n){ye(Pf,t._currentValue),t._currentValue=n}function qi(e){e._currentValue=Pf.current,We(Pf)}function Of(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function If(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Of(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(Z(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),Of(r,n,e),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function ul(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(Z(387));if(r=r.memoizedProps,r!==null){var o=a.type;Dn(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===bc.current){if(r=a.alternate,r===null)throw Error(Z(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push($o):e=[$o])}a=a.return}e!==null&&If(t,e,n,i),t.flags|=262144}function Ic(e){for(e=e.firstContext;e!==null;){if(!Dn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ms(e){bs=e,ki=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function nn(e){return $y(bs,e)}function ec(e,t){return bs===null&&ms(e),$y(e,t)}function $y(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ki===null){if(e===null)throw Error(Z(308));ki=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ki=ki.next=t;return n}var ya=!1;function Ud(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ta(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function wa(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,Ee&2){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=wc(e),ny(e,null,n),t}return tu(e,i,t,n),wc(e)}function Oo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194176)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Cv(e,n)}}function Zh(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Bf=!1;function Io(){if(Bf){var e=hr;if(e!==null)throw e}}function zo(e,t,n,i){Bf=!1;var a=e.updateQueue;ya=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var u=e.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==r&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=a.baseState;r=0,u=c=l=null,o=s;do{var f=o.lane&-536870913,p=f!==o.lane;if(p?(Yt&f)===f:(i&f)===f){f!==0&&f===_r&&(Bf=!0),u!==null&&(u=u.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,x=o;f=t;var m=n;switch(x.tag){case 1:if(g=x.payload,typeof g=="function"){d=g.call(m,d,f);break t}d=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,f=typeof g=="function"?g.call(m,d,f):g,f==null)break t;d=ve({},d,f);break t;case 2:ya=!0}}f=o.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[f]:p.push(f))}else p={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,r|=f;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);u===null&&(l=d),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=u,s===null&&(a.shared.lanes=0),Ia|=r,e.lanes=r,e.memoizedState=d}}function t_(e,t){if(typeof e!="function")throw Error(Z(191,e));e.call(t)}function e_(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)t_(n[e],t)}function hl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){oe(t,t.return,o)}}function Oa(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n;try{o()}catch(c){oe(a,l,c)}}}i=i.next}while(i!==s)}}catch(c){oe(t,t.return,c)}}function n_(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{e_(t,n)}catch(i){oe(e,e.return,i)}}}function i_(e,t,n){n.props=ps(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){oe(e,t,i)}}function as(e,t){try{var n=e.ref;if(n!==null){var i=e.stateNode;switch(e.tag){case 26:case 27:case 5:var a=i;break;default:a=i}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(s){oe(e,t,s)}}function Tn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){oe(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){oe(e,t,a)}else n.current=null}function a_(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){oe(e,e.return,a)}}function G0(e,t,n){try{var i=e.stateNode;u1(i,e.type,n,t),i[xn]=t}catch(a){oe(e,e.return,a)}}function s_(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27||e.tag===4}function jh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||s_(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==27&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ff(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ou));else if(i!==4&&i!==27&&(e=e.child,e!==null))for(Ff(e,t,n),e=e.sibling;e!==null;)Ff(e,t,n),e=e.sibling}function zc(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&i!==27&&(e=e.child,e!==null))for(zc(e,t,n),e=e.sibling;e!==null;)zc(e,t,n),e=e.sibling}var Ii=!1,Te=!1,Jh=!1,k0=typeof WeakSet=="function"?WeakSet:Set,ke=null,q0=!1;function GS(e,t){if(e=e.containerInfo,Zf=Yc,e=jv(e),ud(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,u=0,d=e,f=null;e:for(;;){for(var p;d!==n||a!==0&&d.nodeType!==3||(o=r+a),d!==s||i!==0&&d.nodeType!==3||(l=r+i),d.nodeType===3&&(r+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===e)break e;if(f===n&&++c===a&&(o=r),f===s&&++u===i&&(l=r),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(jf={focusedElem:e,selectionRange:n},Yc=!1,ke=t;ke!==null;)if(t=ke,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ke=e;else for(;ke!==null;){switch(t=ke,s=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if(e&1024&&s!==null){e=void 0,n=t,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=ps(n.type,a,n.elementType===n.type);e=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=e}catch(x){oe(n,n.return,x)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Qf(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Qf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(Z(163))}if(e=t.sibling,e!==null){e.return=t.return,ke=e;break}ke=t.return}return g=q0,q0=!1,g}function r_(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Pi(e,n),i&4&&hl(5,n);break;case 1:if(Pi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){oe(n,n.return,o)}else{var a=ps(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){oe(n,n.return,o)}}i&64&&n_(n),i&512&&as(n,n.return);break;case 3:if(Pi(e,n),i&64&&(i=n.updateQueue,i!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{e_(i,e)}catch(o){oe(n,n.return,o)}}break;case 26:Pi(e,n),i&512&&as(n,n.return);break;case 27:case 5:Pi(e,n),t===null&&i&4&&a_(n),i&512&&as(n,n.return);break;case 12:Pi(e,n);break;case 13:Pi(e,n),i&4&&c_(e,n);break;case 22:if(a=n.memoizedState!==null||Ii,!a){t=t!==null&&t.memoizedState!==null||Te;var s=Ii,r=Te;Ii=a,(Te=t)&&!r?ga(e,n,(n.subtreeFlags&8772)!==0):Pi(e,n),Ii=s,Te=r}i&512&&(n.memoizedProps.mode==="manual"?as(n,n.return):Tn(n,n.return));break;default:Pi(e,n)}}function o_(e){var t=e.alternate;t!==null&&(e.alternate=null,o_(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ad(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ne=null,En=!1;function Ni(e,t,n){for(n=n.child;n!==null;)l_(e,t,n),n=n.sibling}function l_(e,t,n){if(wn&&typeof wn.onCommitFiberUnmount=="function")try{wn.onCommitFiberUnmount(il,n)}catch{}switch(n.tag){case 26:Te||Tn(n,t),Ni(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Te||Tn(n,t);var i=Ne,a=En;for(Ne=n.stateNode,Ni(e,t,n),n=n.stateNode,t=n.attributes;t.length;)n.removeAttributeNode(t[0]);ad(n),Ne=i,En=a;break;case 5:Te||Tn(n,t);case 6:a=Ne;var s=En;if(Ne=null,Ni(e,t,n),Ne=a,En=s,Ne!==null)if(En)try{e=Ne,i=n.stateNode,e.nodeType===8?e.parentNode.removeChild(i):e.removeChild(i)}catch(r){oe(n,t,r)}else try{Ne.removeChild(n.stateNode)}catch(r){oe(n,t,r)}break;case 18:Ne!==null&&(En?(t=Ne,n=n.stateNode,t.nodeType===8?of(t.parentNode,n):t.nodeType===1&&of(t,n),nl(t)):of(Ne,n.stateNode));break;case 4:i=Ne,a=En,Ne=n.stateNode.containerInfo,En=!0,Ni(e,t,n),Ne=i,En=a;break;case 0:case 11:case 14:case 15:Te||Oa(2,n,t),Te||Oa(4,n,t),Ni(e,t,n);break;case 1:Te||(Tn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&i_(n,t,i)),Ni(e,t,n);break;case 21:Ni(e,t,n);break;case 22:Te||Tn(n,t),Te=(i=Te)||n.memoizedState!==null,Ni(e,t,n),Te=i;break;default:Ni(e,t,n)}}function c_(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{nl(e)}catch(n){oe(t,t.return,n)}}function kS(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new k0),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new k0),t;default:throw Error(Z(435,e.tag))}}function Qh(e,t){var n=kS(e);t.forEach(function(i){var a=n1.bind(null,e,i);n.has(i)||(n.add(i),i.then(a,a))})}function In(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:case 5:Ne=o.stateNode,En=!1;break t;case 3:Ne=o.stateNode.containerInfo,En=!0;break t;case 4:Ne=o.stateNode.containerInfo,En=!0;break t}o=o.return}if(Ne===null)throw Error(Z(160));l_(s,r,a),Ne=null,En=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)u_(t,e),t=t.sibling}var ei=null;function u_(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:In(t,e),zn(e),i&4&&(Oa(3,e,e.return),hl(3,e),Oa(5,e,e.return));break;case 1:In(t,e),zn(e),i&512&&(Te||n===null||Tn(n,n.return)),i&64&&Ii&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=ei;if(In(t,e),zn(e),i&512&&(Te||n===null||Tn(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[ko]||s[en]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),Je(s,i,n),s[en]=e,qe(s),i=s;break t;case"link":var r=cv("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}s=a.createElement(i),Je(s,i,n),a.head.appendChild(s);break;case"meta":if(r=cv("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}s=a.createElement(i),Je(s,i,n),a.head.appendChild(s);break;default:throw Error(Z(468,i))}s[en]=e,qe(s),i=s}e.stateNode=i}else uv(a,e.type,e.stateNode);else e.stateNode=lv(a,i,e.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?uv(a,e.type,e.stateNode):lv(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&G0(e,e.memoizedProps,n.memoizedProps)}break;case 27:if(i&4&&e.alternate===null){a=e.stateNode,s=e.memoizedProps;try{for(var l=a.firstChild;l;){var c=l.nextSibling,u=l.nodeName;l[ko]||u==="HEAD"||u==="BODY"||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&l.rel.toLowerCase()==="stylesheet"||a.removeChild(l),l=c}for(var d=e.type,f=a.attributes;f.length;)a.removeAttributeNode(f[0]);Je(a,d,s),a[en]=e,a[xn]=s}catch(g){oe(e,e.return,g)}}case 5:if(In(t,e),zn(e),i&512&&(Te||n===null||Tn(n,n.return)),e.flags&32){a=e.stateNode;try{vr(a,"")}catch(g){oe(e,e.return,g)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,G0(e,a,n!==null?n.memoizedProps:a)),i&1024&&(Jh=!0);break;case 6:if(In(t,e),zn(e),i&4){if(e.stateNode===null)throw Error(Z(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(g){oe(e,e.return,g)}}break;case 3:if(_c=null,a=ei,ei=qc(t.containerInfo),In(t,e),ei=a,zn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{nl(t.containerInfo)}catch(g){oe(e,e.return,g)}Jh&&(Jh=!1,h_(e));break;case 4:i=ei,ei=qc(e.stateNode.containerInfo),In(t,e),zn(e),ei=i;break;case 12:In(t,e),zn(e);break;case 13:In(t,e),zn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(zd=Mi()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Qh(e,i)));break;case 22:if(i&512&&(Te||n===null||Tn(n,n.return)),l=e.memoizedState!==null,c=n!==null&&n.memoizedState!==null,u=Ii,d=Te,Ii=u||l,Te=d||c,In(t,e),Te=d,Ii=u,zn(e),t=e.stateNode,t._current=e,t._visibility&=-3,t._visibility|=t._pendingVisibility&2,i&8192&&(t._visibility=l?t._visibility&-2:t._visibility|1,l&&(t=Ii||Te,n===null||c||t||Ys(e)),e.memoizedProps===null||e.memoizedProps.mode!=="manual"))t:for(n=null,t=e;;){if(t.tag===5||t.tag===26||t.tag===27){if(n===null){c=n=t;try{if(a=c.stateNode,l)s=a.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{r=c.stateNode,o=c.memoizedProps.style;var p=o!=null&&o.hasOwnProperty("display")?o.display:null;r.style.display=p==null||typeof p=="boolean"?"":(""+p).trim()}}catch(g){oe(c,c.return,g)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(g){oe(c,c.return,g)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,Qh(e,n))));break;case 19:In(t,e),zn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Qh(e,i)));break;case 21:break;default:In(t,e),zn(e)}}function zn(e){var t=e.flags;if(t&2){try{if(e.tag!==27){t:{for(var n=e.return;n!==null;){if(s_(n)){var i=n;break t}n=n.return}throw Error(Z(160))}switch(i.tag){case 27:var a=i.stateNode,s=jh(e);zc(e,s,a);break;case 5:var r=i.stateNode;i.flags&32&&(vr(r,""),i.flags&=-33);var o=jh(e);zc(e,o,r);break;case 3:case 4:var l=i.stateNode.containerInfo,c=jh(e);Ff(e,c,l);break;default:throw Error(Z(161))}}}catch(u){oe(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function h_(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;h_(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Pi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)r_(e,t.alternate,t),t=t.sibling}function Ys(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Oa(4,t,t.return),Ys(t);break;case 1:Tn(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&i_(t,t.return,n),Ys(t);break;case 26:case 27:case 5:Tn(t,t.return),Ys(t);break;case 22:Tn(t,t.return),t.memoizedState===null&&Ys(t);break;default:Ys(t)}e=e.sibling}}function ga(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:ga(a,s,n),hl(4,s);break;case 1:if(ga(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){oe(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)t_(l[a],o)}catch(c){oe(i,i.return,c)}}n&&r&64&&n_(s),as(s,s.return);break;case 26:case 27:case 5:ga(a,s,n),n&&i===null&&r&4&&a_(s),as(s,s.return);break;case 12:ga(a,s,n);break;case 13:ga(a,s,n),n&&r&4&&c_(a,s);break;case 22:s.memoizedState===null&&ga(a,s,n),as(s,s.return);break;default:ga(a,s,n)}t=t.sibling}}function Ld(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ll(n))}function Nd(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ll(e))}function ma(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)f_(e,t,n,i),t=t.sibling}function f_(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ma(e,t,n,i),a&2048&&hl(9,t);break;case 3:ma(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ll(e)));break;case 12:if(a&2048){ma(e,t,n,i),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){oe(t,t.return,l)}}else ma(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,t.memoizedState!==null?s._visibility&4?ma(e,t,n,i):Bo(e,t):s._visibility&4?ma(e,t,n,i):(s._visibility|=4,Zs(e,t,n,i,(t.subtreeFlags&10256)!==0)),a&2048&&Ld(t.alternate,t);break;case 24:ma(e,t,n,i),a&2048&&Nd(t.alternate,t);break;default:ma(e,t,n,i)}}function Zs(e,t,n,i,a){for(a=a&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Zs(s,r,o,l,a),hl(8,r);break;case 23:break;case 22:var u=r.stateNode;r.memoizedState!==null?u._visibility&4?Zs(s,r,o,l,a):Bo(s,r):(u._visibility|=4,Zs(s,r,o,l,a)),a&&c&2048&&Ld(r.alternate,r);break;case 24:Zs(s,r,o,l,a),a&&c&2048&&Nd(r.alternate,r);break;default:Zs(s,r,o,l,a)}t=t.sibling}}function Bo(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:Bo(n,i),a&2048&&Ld(i.alternate,i);break;case 24:Bo(n,i),a&2048&&Nd(i.alternate,i);break;default:Bo(n,i)}t=t.sibling}}var To=8192;function Xs(e){if(e.subtreeFlags&To)for(e=e.child;e!==null;)d_(e),e=e.sibling}function d_(e){switch(e.tag){case 26:Xs(e),e.flags&To&&e.memoizedState!==null&&C1(ei,e.memoizedState,e.memoizedProps);break;case 5:Xs(e);break;case 3:case 4:var t=ei;ei=qc(e.stateNode.containerInfo),Xs(e),ei=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=To,To=16777216,Xs(e),To=t):Xs(e));break;default:Xs(e)}}function p_(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function yo(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];ke=i,g_(i,e)}p_(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)m_(e),e=e.sibling}function m_(e){switch(e.tag){case 0:case 11:case 15:yo(e),e.flags&2048&&Oa(9,e,e.return);break;case 3:yo(e);break;case 12:yo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&4&&(e.return===null||e.return.tag!==13)?(t._visibility&=-5,gc(e)):yo(e);break;default:yo(e)}}function gc(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];ke=i,g_(i,e)}p_(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Oa(8,t,t.return),gc(t);break;case 22:n=t.stateNode,n._visibility&4&&(n._visibility&=-5,gc(t));break;default:gc(t)}e=e.sibling}}function g_(e,t){for(;ke!==null;){var n=ke;switch(n.tag){case 0:case 11:case 15:Oa(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:ll(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,ke=i;else t:for(n=e;ke!==null;){i=ke;var a=i.sibling,s=i.return;if(o_(i),i===n){ke=null;break t}if(a!==null){a.return=s,ke=a;break t}ke=s}}}function qS(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qn(e,t,n,i){return new qS(e,t,n,i)}function Pd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ra(e,t){var n=e.alternate;return n===null?(n=qn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&31457280,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function v_(e,t){e.flags&=31457282;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function vc(e,t,n,i,a,s){var r=0;if(i=e,typeof e=="function")Pd(e)&&(r=1);else if(typeof e=="string")r=w1(e,n,bi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Js:return ls(n.children,a,s,t);case yv:r=8,a|=24;break;case lf:return e=qn(12,n,t,a|2),e.elementType=lf,e.lanes=s,e;case cf:return e=qn(13,n,t,a),e.elementType=cf,e.lanes=s,e;case uf:return e=qn(19,n,t,a),e.elementType=uf,e.lanes=s,e;case xv:return y_(n,a,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case mM:case Fi:r=10;break t;case _v:r=9;break t;case ed:r=11;break t;case nd:r=14;break t;case va:r=16,i=null;break t}r=29,n=Error(Z(130,e===null?"null":typeof e,"")),i=null}return t=qn(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function ls(e,t,n,i){return e=qn(7,e,i,t),e.lanes=n,e}function y_(e,t,n,i){e=qn(22,e,i,t),e.elementType=xv,e.lanes=n;var a={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var s=a._current;if(s===null)throw Error(Z(456));if(!(a._pendingVisibility&2)){var r=Na(s,2);r!==null&&(a._pendingVisibility|=2,dn(r,s,2))}},attach:function(){var s=a._current;if(s===null)throw Error(Z(456));if(a._pendingVisibility&2){var r=Na(s,2);r!==null&&(a._pendingVisibility&=-3,dn(r,s,2))}}};return e.stateNode=a,e}function Kh(e,t,n){return e=qn(6,e,null,t),e.lanes=n,e}function $h(e,t,n){return t=qn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Oi(e){e.flags|=4}function X0(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!F_(t)){if(t=Wn.current,t!==null&&((Yt&4194176)===Yt?Si!==null:(Yt&62914560)!==Yt&&!(Yt&536870912)||t!==Si))throw Uo=Sf,ay;e.flags|=8192}}function nc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?wv():536870912,e.lanes|=t,br|=t)}function _o(e,t){if(!Kt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&31457280,i|=a.flags&31457280,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function XS(e,t,n){var i=t.pendingProps;switch(pd(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(t),null;case 1:return Se(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),qi(Be),mr(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(go(t)?Oi(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ni!==null&&(qf(ni),ni=null))),Se(t),null;case 26:return n=t.memoizedState,e===null?(Oi(t),n!==null?(Se(t),X0(t,n)):(Se(t),t.flags&=-16777217)):n?n!==e.memoizedState?(Oi(t),Se(t),X0(t,n)):(Se(t),t.flags&=-16777217):(e.memoizedProps!==i&&Oi(t),Se(t),t.flags&=-16777217),null;case 27:Sc(t),n=Aa.current;var a=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Oi(t);else{if(!i){if(t.stateNode===null)throw Error(Z(166));return Se(t),null}e=bi.current,go(t)?b0(t,e):(e=I_(a,i,n),t.stateNode=e,Oi(t))}return Se(t),null;case 5:if(Sc(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Oi(t);else{if(!i){if(t.stateNode===null)throw Error(Z(166));return Se(t),null}if(e=bi.current,go(t))b0(t,e);else{switch(a=kc(Aa.current),e){case 1:e=a.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:e=a.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":e=a.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":e=a.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof i.is=="string"?a.createElement("select",{is:i.is}):a.createElement("select"),i.multiple?e.multiple=!0:i.size&&(e.size=i.size);break;default:e=typeof i.is=="string"?a.createElement(n,{is:i.is}):a.createElement(n)}}e[en]=t,e[xn]=i;t:for(a=t.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break t;for(;a.sibling===null;){if(a.return===null||a.return===t)break t;a=a.return}a.sibling.return=a.return,a=a.sibling}t.stateNode=e;t:switch(Je(e,n,i),n){case"button":case"input":case"select":case"textarea":e=!!i.autoFocus;break t;case"img":e=!0;break t;default:e=!1}e&&Oi(t)}}return Se(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Oi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(Z(166));if(e=Aa.current,go(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=fn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[en]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||N_(e.nodeValue,n)),e||hs(t)}else e=kc(e).createTextNode(i),e[en]=t,t.stateNode=e}return Se(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=go(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(Z(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Z(317));a[en]=t}else ol(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Se(t),a=!1}else ni!==null&&(qf(ni),ni=null),a=!0;if(!a)return t.flags&256?(Gi(t),t):(Gi(t),null)}if(Gi(t),t.flags&128)return t.lanes=n,t;if(n=i!==null,e=e!==null&&e.memoizedState!==null,n){i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool);var s=null;i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),nc(t,t.updateQueue),Se(t),null;case 4:return mr(),e===null&&Hd(t.stateNode.containerInfo),Se(t),null;case 10:return qi(t.type),Se(t),null;case 19:if(We(Fe),a=t.memoizedState,a===null)return Se(t),null;if(i=(t.flags&128)!==0,s=a.rendering,s===null)if(i)_o(a,!1);else{if(we!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Uc(e),s!==null){for(t.flags|=128,_o(a,!1),e=s.updateQueue,t.updateQueue=e,nc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)v_(n,e),n=n.sibling;return ye(Fe,Fe.current&1|2),t.child}e=e.sibling}a.tail!==null&&Mi()>Bc&&(t.flags|=128,i=!0,_o(a,!1),t.lanes=4194304)}else{if(!i)if(e=Uc(s),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,nc(t,e),_o(a,!0),a.tail===null&&a.tailMode==="hidden"&&!s.alternate&&!Kt)return Se(t),null}else 2*Mi()-a.renderingStartTime>Bc&&n!==536870912&&(t.flags|=128,i=!0,_o(a,!1),t.lanes=4194304);a.isBackwards?(s.sibling=t.child,t.child=s):(e=a.last,e!==null?e.sibling=s:t.child=s,a.last=s)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Mi(),t.sibling=null,e=Fe.current,ye(Fe,i?e&1|2:e&1),t):(Se(t),null);case 22:case 23:return Gi(t),md(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(Se(t),t.subtreeFlags&6&&(t.flags|=8192)):Se(t),n=t.updateQueue,n!==null&&nc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&We(os),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),qi(Be),Se(t),null;case 25:return null}throw Error(Z(156,t.tag))}function WS(e,t){switch(pd(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qi(Be),mr(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Sc(t),null;case 13:if(Gi(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Z(340));ol()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return We(Fe),null;case 4:return mr(),null;case 10:return qi(t.type),null;case 22:case 23:return Gi(t),md(),e!==null&&We(os),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return qi(Be),null;case 25:return null;default:return null}}function __(e,t){switch(pd(t),t.tag){case 3:qi(Be),mr();break;case 26:case 27:case 5:Sc(t);break;case 4:mr();break;case 13:Gi(t);break;case 19:We(Fe);break;case 10:qi(t.type);break;case 22:case 23:Gi(t),md(),e!==null&&We(os);break;case 24:qi(Be)}}var YS={getCacheForType:function(e){var t=nn(Be),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n}},ZS=typeof WeakMap=="function"?WeakMap:Map,Ee=0,fe=null,Vt=null,Yt=0,he=0,An=null,zi=!1,wr=!1,Od=!1,Zi=0,we=0,Ia=0,cs=0,Id=0,Xn=0,br=0,Fo=null,xi=null,Hf=!1,zd=0,Bc=1/0,Fc=null,Ca=null,ic=!1,ns=null,Ho=0,Vf=0,Gf=null,Vo=0,kf=null;function Cn(){if(Ee&2&&Yt!==0)return Yt&-Yt;if(Dt.T!==null){var e=_r;return e!==0?e:Fd()}return Uv()}function x_(){Xn===0&&(Xn=!(Yt&536870912)||Kt?Tv():536870912);var e=Wn.current;return e!==null&&(e.flags|=32),Xn}function dn(e,t,n){(e===fe&&he===2||e.cancelPendingCommit!==null)&&(Mr(e,0),Bi(e,Yt,Xn,!1)),sl(e,n),(!(Ee&2)||e!==fe)&&(e===fe&&(!(Ee&2)&&(cs|=n),we===4&&Bi(e,Yt,Xn,!1)),Ti(e))}function b_(e,t,n){if(Ee&6)throw Error(Z(327));var i=!n&&(t&60)===0&&(t&e.expiredLanes)===0||al(e,t),a=i?QS(e,t):tf(e,t,!0),s=i;do{if(a===0){wr&&!i&&Bi(e,t,0,!1);break}else if(a===6)Bi(e,t,0,!zi);else{if(n=e.current.alternate,s&&!jS(n)){a=tf(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=Fo;var l=o.current.memoizedState.isDehydrated;if(l&&(Mr(o,r).flags|=256),r=tf(o,r,!1),r!==2){if(Od&&!l){o.errorRecoveryDisabledLanes|=s,cs|=s,a=4;break t}s=xi,xi=a,s!==null&&qf(s)}a=r}if(s=!1,a!==2)continue}}if(a===1){Mr(e,0),Bi(e,t,0,!0);break}t:{switch(i=e,a){case 0:case 1:throw Error(Z(345));case 4:if((t&4194176)===t){Bi(i,t,Xn,!zi);break t}break;case 2:xi=null;break;case 3:case 5:break;default:throw Error(Z(329))}if(i.finishedWork=n,i.finishedLanes=t,(t&62914560)===t&&(s=zd+300-Mi(),10<s)){if(Bi(i,t,Xn,!zi),jc(i,0)!==0)break t;i.timeoutHandle=O_(W0.bind(null,i,n,xi,Fc,Hf,t,Xn,cs,br,zi,2,-0,0),s);break t}W0(i,n,xi,Fc,Hf,t,Xn,cs,br,zi,0,-0,0)}}break}while(!0);Ti(e)}function qf(e){xi===null?xi=e:xi.push.apply(xi,e)}function W0(e,t,n,i,a,s,r,o,l,c,u,d,f){var p=t.subtreeFlags;if((p&8192||(p&16785408)===16785408)&&(Ko={stylesheets:null,count:0,unsuspend:R1},d_(t),t=D1(),t!==null)){e.cancelPendingCommit=t(Z0.bind(null,e,n,i,a,r,o,l,1,d,f)),Bi(e,s,r,!c);return}Z0(e,n,i,a,r,o,l,u,d,f)}function jS(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!Dn(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Bi(e,t,n,i){t&=~Id,t&=~cs,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-Rn(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&Rv(e,n,t)}function su(){return Ee&6?!0:(fl(0,!1),!1)}function Bd(){if(Vt!==null){if(he===0)var e=Vt.return;else e=Vt,ki=bs=null,Md(e),ur=null,Zo=0,e=Vt;for(;e!==null;)__(e.alternate,e),e=e.return;Vt=null}}function Mr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,f1(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Bd(),fe=e,Vt=n=Ra(e.current,null),Yt=t,he=0,An=null,zi=!1,wr=al(e,t),Od=!1,br=Xn=Id=cs=Ia=we=0,xi=Fo=null,Hf=!1,t&8&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-Rn(i),s=1<<a;t|=e[a],i&=~s}return Zi=t,$c(),n}function M_(e,t){zt=null,Dt.H=Ei,t===Do?(t=E0(),he=3):t===ay?(t=E0(),he=4):he=t===Yy?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,An=t,Vt===null&&(we=1,Oc(e,kn(t,e.current)))}function S_(){var e=Dt.H;return Dt.H=Ei,e===null?Ei:e}function E_(){var e=Dt.A;return Dt.A=YS,e}function Xf(){we=4,zi||(Yt&4194176)!==Yt&&Wn.current!==null||(wr=!0),!(Ia&134217727)&&!(cs&134217727)||fe===null||Bi(fe,Yt,Xn,!1)}function tf(e,t,n){var i=Ee;Ee|=2;var a=S_(),s=E_();(fe!==e||Yt!==t)&&(Fc=null,Mr(e,t)),t=!1;var r=we;t:do try{if(he!==0&&Vt!==null){var o=Vt,l=An;switch(he){case 8:Bd(),r=6;break t;case 3:case 2:case 6:Wn.current===null&&(t=!0);var c=he;if(he=0,An=null,rr(e,o,l,c),n&&wr){r=0;break t}break;default:c=he,he=0,An=null,rr(e,o,l,c)}}JS(),r=we;break}catch(u){M_(e,u)}while(!0);return t&&e.shellSuspendCounter++,ki=bs=null,Ee=i,Dt.H=a,Dt.A=s,Vt===null&&(fe=null,Yt=0,$c()),r}function JS(){for(;Vt!==null;)A_(Vt)}function QS(e,t){var n=Ee;Ee|=2;var i=S_(),a=E_();fe!==e||Yt!==t?(Fc=null,Bc=Mi()+500,Mr(e,t)):wr=al(e,t);t:do try{if(he!==0&&Vt!==null){t=Vt;var s=An;e:switch(he){case 1:he=0,An=null,rr(e,t,s,1);break;case 2:if(S0(s)){he=0,An=null,Y0(t);break}t=function(){he===2&&fe===e&&(he=7),Ti(e)},s.then(t,t);break t;case 3:he=7;break t;case 4:he=5;break t;case 7:S0(s)?(he=0,An=null,Y0(t)):(he=0,An=null,rr(e,t,s,7));break;case 5:var r=null;switch(Vt.tag){case 26:r=Vt.memoizedState;case 5:case 27:var o=Vt;if(!r||F_(r)){he=0,An=null;var l=o.sibling;if(l!==null)Vt=l;else{var c=o.return;c!==null?(Vt=c,ru(c)):Vt=null}break e}}he=0,An=null,rr(e,t,s,5);break;case 6:he=0,An=null,rr(e,t,s,6);break;case 8:Bd(),we=6;break t;default:throw Error(Z(462))}}KS();break}catch(u){M_(e,u)}while(!0);return ki=bs=null,Dt.H=i,Dt.A=a,Ee=n,Vt!==null?0:(fe=null,Yt=0,$c(),we)}function KS(){for(;Vt!==null&&!xM();)A_(Vt)}function A_(e){var t=Ky(e.alternate,e,Zi);e.memoizedProps=e.pendingProps,t===null?ru(e):Vt=t}function Y0(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=B0(n,t,t.pendingProps,t.type,void 0,Yt);break;case 11:t=B0(n,t,t.pendingProps,t.type.render,t.ref,Yt);break;case 5:Md(t);default:__(n,t),t=Vt=v_(t,Zi),t=Ky(n,t,Zi)}e.memoizedProps=e.pendingProps,t===null?ru(e):Vt=t}function rr(e,t,n,i){ki=bs=null,Md(t),ur=null,Zo=0;var a=t.return;try{if(HS(e,a,t,n,Yt)){we=1,Oc(e,kn(n,e.current)),Vt=null;return}}catch(s){if(a!==null)throw Vt=a,s;we=1,Oc(e,kn(n,e.current)),Vt=null;return}t.flags&32768?(Kt||i===1?e=!0:wr||Yt&536870912?e=!1:(zi=e=!0,(i===2||i===3||i===6)&&(i=Wn.current,i!==null&&i.tag===13&&(i.flags|=16384))),T_(t,e)):ru(t)}function ru(e){var t=e;do{if(t.flags&32768){T_(t,zi);return}e=t.return;var n=XS(t.alternate,t,Zi);if(n!==null){Vt=n;return}if(t=t.sibling,t!==null){Vt=t;return}Vt=t=e}while(t!==null);we===0&&(we=5)}function T_(e,t){do{var n=WS(e.alternate,e);if(n!==null){n.flags&=32767,Vt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Vt=e;return}Vt=e=n}while(e!==null);we=6,Vt=null}function Z0(e,t,n,i,a,s,r,o,l,c){var u=Dt.T,d=ge.p;try{ge.p=2,Dt.T=null,$S(e,t,n,i,d,a,s,r,o,l,c)}finally{Dt.T=u,ge.p=d}}function $S(e,t,n,i,a,s,r,o){do pr();while(ns!==null);if(Ee&6)throw Error(Z(327));var l=e.finishedWork;if(i=e.finishedLanes,l===null)return null;if(e.finishedWork=null,e.finishedLanes=0,l===e.current)throw Error(Z(177));e.callbackNode=null,e.callbackPriority=0,e.cancelPendingCommit=null;var c=l.lanes|l.childLanes;if(c|=hd,UM(e,i,c,s,r,o),e===fe&&(Vt=fe=null,Yt=0),!(l.subtreeFlags&10256)&&!(l.flags&10256)||ic||(ic=!0,Vf=c,Gf=n,i1(Ec,function(){return pr(!0),null})),n=(l.flags&15990)!==0,l.subtreeFlags&15990||n?(n=Dt.T,Dt.T=null,s=ge.p,ge.p=2,r=Ee,Ee|=4,GS(e,l),u_(l,e),SS(jf,e.containerInfo),Yc=!!Zf,jf=Zf=null,e.current=l,r_(e,l.alternate,l),bM(),Ee=r,ge.p=s,Dt.T=n):e.current=l,ic?(ic=!1,ns=e,Ho=i):w_(e,c),c=e.pendingLanes,c===0&&(Ca=null),TM(l.stateNode,a),Ti(e),t!==null)for(a=e.onRecoverableError,l=0;l<t.length;l++)c=t[l],a(c.value,{componentStack:c.stack});return Ho&3&&pr(),c=e.pendingLanes,i&4194218&&c&42?e===kf?Vo++:(Vo=0,kf=e):Vo=0,fl(0,!1),null}function w_(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ll(t)))}function pr(){if(ns!==null){var e=ns,t=Vf;Vf=0;var n=Dv(Ho),i=Dt.T,a=ge.p;try{if(ge.p=32>n?32:n,Dt.T=null,ns===null)var s=!1;else{n=Gf,Gf=null;var r=ns,o=Ho;if(ns=null,Ho=0,Ee&6)throw Error(Z(331));var l=Ee;if(Ee|=4,m_(r.current),f_(r,r.current,o,n),Ee=l,fl(0,!1),wn&&typeof wn.onPostCommitFiberRoot=="function")try{wn.onPostCommitFiberRoot(il,r)}catch{}s=!0}return s}finally{ge.p=a,Dt.T=i,w_(e,t)}}return!1}function j0(e,t,n){t=kn(n,t),t=Df(e.stateNode,t,2),e=wa(e,t,2),e!==null&&(sl(e,2),Ti(e))}function oe(e,t,n){if(e.tag===3)j0(e,e,n);else for(;t!==null;){if(t.tag===3){j0(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ca===null||!Ca.has(i))){e=kn(n,e),n=Xy(2),i=wa(t,n,2),i!==null&&(Wy(n,i,t,e),sl(i,2),Ti(i));break}}t=t.return}}function ef(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new ZS;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Od=!0,a.add(n),e=t1.bind(null,e,t,n),t.then(e,e))}function t1(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,fe===e&&(Yt&n)===n&&(we===4||we===3&&(Yt&62914560)===Yt&&300>Mi()-zd?!(Ee&2)&&Mr(e,0):Id|=n,br===Yt&&(br=0)),Ti(e)}function R_(e,t){t===0&&(t=wv()),e=Na(e,t),e!==null&&(sl(e,t),Ti(e))}function e1(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),R_(e,n)}function n1(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(Z(314))}i!==null&&i.delete(t),R_(e,n)}function i1(e,t){return id(e,t)}var Hc=null,js=null,Wf=!1,Vc=!1,nf=!1,us=0;function Ti(e){e!==js&&e.next===null&&(js===null?Hc=js=e:js=js.next=e),Vc=!0,Wf||(Wf=!0,s1(a1))}function fl(e,t){if(!nf&&Vc){nf=!0;do for(var n=!1,i=Hc;i!==null;){if(!t)if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-Rn(42|e)+1)-1,s&=a&~(r&~o),s=s&201326677?s&201326677|1:s?s|2:0}s!==0&&(n=!0,J0(i,s))}else s=Yt,s=jc(i,i===fe?s:0),!(s&3)||al(i,s)||(n=!0,J0(i,s));i=i.next}while(n);nf=!1}}function a1(){Vc=Wf=!1;var e=0;us!==0&&(h1()&&(e=us),us=0);for(var t=Mi(),n=null,i=Hc;i!==null;){var a=i.next,s=C_(i,t);s===0?(i.next=null,n===null?Hc=a:n.next=a,a===null&&(js=n)):(n=i,(e!==0||s&3)&&(Vc=!0)),i=a}fl(e,!1)}function C_(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-Rn(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=DM(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=fe,n=Yt,n=jc(e,e===t?n:0),i=e.callbackNode,n===0||e===t&&he===2||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Nh(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||al(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Nh(i),Dv(n)){case 2:case 8:n=Ev;break;case 32:n=Ec;break;case 268435456:n=Av;break;default:n=Ec}return i=D_.bind(null,e),n=id(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Nh(i),e.callbackPriority=2,e.callbackNode=null,2}function D_(e,t){var n=e.callbackNode;if(pr()&&e.callbackNode!==n)return null;var i=Yt;return i=jc(e,e===fe?i:0),i===0?null:(b_(e,i,t),C_(e,Mi()),e.callbackNode!=null&&e.callbackNode===n?D_.bind(null,e):null)}function J0(e,t){if(pr())return null;b_(e,t,!0)}function s1(e){d1(function(){Ee&6?id(Sv,e):e()})}function Fd(){return us===0&&(us=Tv()),us}function Q0(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:uc(""+e)}function K0(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function r1(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=Q0((a[xn]||null).action),r=i.submitter;r&&(t=(t=r[xn]||null)?Q0(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new Jc("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(us!==0){var l=r?K0(a,r):new FormData(a);Rf(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?K0(a,r):new FormData(a),Rf(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(ac=0;ac<_0.length;ac++)sc=_0[ac],$0=sc.toLowerCase(),tv=sc[0].toUpperCase()+sc.slice(1),ai($0,"on"+tv);var sc,$0,tv,ac;ai(Qv,"onAnimationEnd");ai(Kv,"onAnimationIteration");ai($v,"onAnimationStart");ai("dblclick","onDoubleClick");ai("focusin","onFocus");ai("focusout","onBlur");ai(AS,"onTransitionRun");ai(TS,"onTransitionStart");ai(wS,"onTransitionCancel");ai(ty,"onTransitionEnd");gr("onMouseEnter",["mouseout","mouseover"]);gr("onMouseLeave",["mouseout","mouseover"]);gr("onPointerEnter",["pointerout","pointerover"]);gr("onPointerLeave",["pointerout","pointerover"]);gs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));gs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));gs("onBeforeInput",["compositionend","keypress","textInput","paste"]);gs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));gs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));gs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),o1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jo));function U_(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(u){Pc(u)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(u){Pc(u)}a.currentTarget=null,s=l}}}}function Gt(e,t){var n=t[mf];n===void 0&&(n=t[mf]=new Set);var i=e+"__bubble";n.has(i)||(L_(t,e,2,!1),n.add(i))}function af(e,t,n){var i=0;t&&(i|=4),L_(n,e,i,t)}var rc="_reactListening"+Math.random().toString(36).slice(2);function Hd(e){if(!e[rc]){e[rc]=!0,Lv.forEach(function(n){n!=="selectionchange"&&(o1.has(n)||af(n,!1,e),af(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[rc]||(t[rc]=!0,af("selectionchange",!1,t))}}function L_(e,t,n,i){switch(q_(t)){case 2:var a=N1;break;case 8:a=P1;break;default:a=qd}n=a.bind(null,t,n,e),a=void 0,!_f||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function sf(e,t,n,i,a){var s=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a||o.nodeType===8&&o.parentNode===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&(l=r.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;r=r.return}for(;o!==null;){if(r=is(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}Hv(function(){var c=s,u=rd(n),d=[];t:{var f=ey.get(e);if(f!==void 0){var p=Jc,g=e;switch(e){case"keypress":if(fc(n)===0)break t;case"keydown":case"keyup":p=nS;break;case"focusin":g="focus",p=Bh;break;case"focusout":g="blur",p=Bh;break;case"beforeblur":case"afterblur":p=Bh;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=l0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=qM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=sS;break;case Qv:case Kv:case $v:p=YM;break;case ty:p=oS;break;case"scroll":case"scrollend":p=GM;break;case"wheel":p=cS;break;case"copy":case"cut":case"paste":p=jM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=u0;break;case"toggle":case"beforetoggle":p=hS}var x=(t&4)!==0,m=!x&&(e==="scroll"||e==="scrollend"),h=x?f!==null?f+"Capture":null:f;x=[];for(var v=c,y;v!==null;){var _=v;if(y=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||y===null||h===null||(_=qo(v,h),_!=null&&x.push(Qo(v,_,y))),m)break;v=v.return}0<x.length&&(f=new p(f,g,null,n,u),d.push({event:f,listeners:x}))}}if(!(t&7)){t:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==yf&&(g=n.relatedTarget||n.fromElement)&&(is(g)||g[Ar]))break t;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?is(g):null,g!==null&&(m=Er(g),x=g.tag,g!==m||x!==5&&x!==27&&x!==6)&&(g=null)):(p=null,g=c),p!==g)){if(x=l0,_="onMouseLeave",h="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(x=u0,_="onPointerLeave",h="onPointerEnter",v="pointer"),m=p==null?f:Ao(p),y=g==null?f:Ao(g),f=new x(_,v+"leave",p,n,u),f.target=m,f.relatedTarget=y,_=null,is(u)===c&&(x=new x(h,v+"enter",g,n,u),x.target=y,x.relatedTarget=m,_=x),m=_,p&&g)e:{for(x=p,h=g,v=0,y=x;y;y=Ws(y))v++;for(y=0,_=h;_;_=Ws(_))y++;for(;0<v-y;)x=Ws(x),v--;for(;0<y-v;)h=Ws(h),y--;for(;v--;){if(x===h||h!==null&&x===h.alternate)break e;x=Ws(x),h=Ws(h)}x=null}else x=null;p!==null&&ev(d,f,p,x,!1),g!==null&&m!==null&&ev(d,m,g,x,!0)}}t:{if(f=c?Ao(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var R=p0;else if(d0(f))if(Wv)R=bS;else{R=_S;var w=yS}else p=f.nodeName,!p||p.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&sd(c.elementType)&&(R=p0):R=xS;if(R&&(R=R(e,c))){Xv(d,R,n,u);break t}w&&w(e,f,c),e==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&vf(f,"number",f.value)}switch(w=c?Ao(c):window,e){case"focusin":(d0(w)||w.contentEditable==="true")&&(tr=w,xf=c,Co=null);break;case"focusout":Co=xf=tr=null;break;case"mousedown":bf=!0;break;case"contextmenu":case"mouseup":case"dragend":bf=!1,y0(d,n,u);break;case"selectionchange":if(ES)break;case"keydown":case"keyup":y0(d,n,u)}var T;if(cd)t:{switch(e){case"compositionstart":var C="onCompositionStart";break t;case"compositionend":C="onCompositionEnd";break t;case"compositionupdate":C="onCompositionUpdate";break t}C=void 0}else $s?kv(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(Gv&&n.locale!=="ko"&&($s||C!=="onCompositionStart"?C==="onCompositionEnd"&&$s&&(T=Vv()):(Ea=u,od="value"in Ea?Ea.value:Ea.textContent,$s=!0)),w=Gc(c,C),0<w.length&&(C=new c0(C,e,null,n,u),d.push({event:C,listeners:w}),T?C.data=T:(T=qv(n),T!==null&&(C.data=T)))),(T=dS?pS(e,n):mS(e,n))&&(C=Gc(c,"onBeforeInput"),0<C.length&&(w=new c0("onBeforeInput","beforeinput",null,n,u),d.push({event:w,listeners:C}),w.data=T)),r1(d,e,c,n,u)}U_(d,t)})}function Qo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Gc(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=qo(e,n),a!=null&&i.unshift(Qo(e,a,s)),a=qo(e,t),a!=null&&i.push(Qo(e,a,s))),e=e.return}return i}function Ws(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ev(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=qo(n,s),c!=null&&r.unshift(Qo(n,c,l))):a||(c=qo(n,s),c!=null&&r.push(Qo(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var l1=/\r\n?/g,c1=/\u0000|\uFFFD/g;function nv(e){return(typeof e=="string"?e:""+e).replace(l1,`
`).replace(c1,"")}function N_(e,t){return t=nv(t),nv(e)===t}function ou(){}function ne(e,t,n,i,a,s){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||vr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&vr(e,""+i);break;case"className":Zl(e,"class",i);break;case"tabIndex":Zl(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Zl(e,n,i);break;case"style":Fv(e,i,s);break;case"data":if(t!=="object"){Zl(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=uc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&ne(e,t,"name",a.name,a,null),ne(e,t,"formEncType",a.formEncType,a,null),ne(e,t,"formMethod",a.formMethod,a,null),ne(e,t,"formTarget",a.formTarget,a,null)):(ne(e,t,"encType",a.encType,a,null),ne(e,t,"method",a.method,a,null),ne(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=uc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=ou);break;case"onScroll":i!=null&&Gt("scroll",e);break;case"onScrollEnd":i!=null&&Gt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Z(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Z(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=uc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Gt("beforetoggle",e),Gt("toggle",e),cc(e,"popover",i);break;case"xlinkActuate":Li(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Li(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Li(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Li(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Li(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Li(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Li(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Li(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Li(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":cc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=HM.get(n)||n,cc(e,n,i))}}function Yf(e,t,n,i,a,s){switch(n){case"style":Fv(e,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Z(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Z(60));e.innerHTML=n}}break;case"children":typeof i=="string"?vr(e,i):(typeof i=="number"||typeof i=="bigint")&&vr(e,""+i);break;case"onScroll":i!=null&&Gt("scroll",e);break;case"onScrollEnd":i!=null&&Gt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=ou);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Nv.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),s=e[xn]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):cc(e,n,i)}}}function Je(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Gt("error",e),Gt("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Z(137,t));default:ne(e,t,s,r,n,null)}}a&&ne(e,t,"srcSet",n.srcSet,n,null),i&&ne(e,t,"src",n.src,n,null);return;case"input":Gt("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"name":a=u;break;case"type":r=u;break;case"checked":l=u;break;case"defaultChecked":c=u;break;case"value":s=u;break;case"defaultValue":o=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(Z(137,t));break;default:ne(e,t,i,u,n,null)}}Iv(e,s,o,l,c,r,a,!1),Ac(e);return;case"select":Gt("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ne(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?lr(e,!!i,t,!1):n!=null&&lr(e,!!i,n,!0);return;case"textarea":Gt("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(Z(91));break;default:ne(e,t,r,o,n,null)}Bv(e,i,a,s),Ac(e);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:ne(e,t,l,i,n,null)}return;case"dialog":Gt("cancel",e),Gt("close",e);break;case"iframe":case"object":Gt("load",e);break;case"video":case"audio":for(i=0;i<Jo.length;i++)Gt(Jo[i],e);break;case"image":Gt("error",e),Gt("load",e);break;case"details":Gt("toggle",e);break;case"embed":case"source":case"link":Gt("error",e),Gt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(Z(137,t));default:ne(e,t,c,i,n,null)}return;default:if(sd(t)){for(u in n)n.hasOwnProperty(u)&&(i=n[u],i!==void 0&&Yf(e,t,u,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ne(e,t,o,i,n,null))}function u1(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,u=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||ne(e,t,p,null,i,d)}}for(var f in i){var p=i[f];if(d=n[f],i.hasOwnProperty(f)&&(p!=null||d!=null))switch(f){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":u=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(Z(137,t));break;default:p!==d&&ne(e,t,f,p,i,d)}}gf(e,r,o,l,c,u,s,a);return;case"select":p=r=o=f=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||ne(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":f=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&ne(e,t,a,s,i,l)}t=o,n=r,i=p,f!=null?lr(e,!!n,f,!1):!!i!=!!n&&(t!=null?lr(e,!!n,t,!0):lr(e,!!n,n?[]:"",!1));return;case"textarea":p=f=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ne(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":f=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(Z(91));break;default:a!==s&&ne(e,t,r,a,i,s)}zv(e,f,p);return;case"option":for(var g in n)if(f=n[g],n.hasOwnProperty(g)&&f!=null&&!i.hasOwnProperty(g))switch(g){case"selected":e.selected=!1;break;default:ne(e,t,g,null,i,f)}for(l in i)if(f=i[l],p=n[l],i.hasOwnProperty(l)&&f!==p&&(f!=null||p!=null))switch(l){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:ne(e,t,l,f,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)f=n[x],n.hasOwnProperty(x)&&f!=null&&!i.hasOwnProperty(x)&&ne(e,t,x,null,i,f);for(c in i)if(f=i[c],p=n[c],i.hasOwnProperty(c)&&f!==p&&(f!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(Z(137,t));break;default:ne(e,t,c,f,i,p)}return;default:if(sd(t)){for(var m in n)f=n[m],n.hasOwnProperty(m)&&f!==void 0&&!i.hasOwnProperty(m)&&Yf(e,t,m,void 0,i,f);for(u in i)f=i[u],p=n[u],!i.hasOwnProperty(u)||f===p||f===void 0&&p===void 0||Yf(e,t,u,f,i,p);return}}for(var h in n)f=n[h],n.hasOwnProperty(h)&&f!=null&&!i.hasOwnProperty(h)&&ne(e,t,h,null,i,f);for(d in i)f=i[d],p=n[d],!i.hasOwnProperty(d)||f===p||f==null&&p==null||ne(e,t,d,f,i,p)}var Zf=null,jf=null;function kc(e){return e.nodeType===9?e:e.ownerDocument}function iv(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function P_(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Jf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var rf=null;function h1(){var e=window.event;return e&&e.type==="popstate"?e===rf?!1:(rf=e,!0):(rf=null,!1)}var O_=typeof setTimeout=="function"?setTimeout:void 0,f1=typeof clearTimeout=="function"?clearTimeout:void 0,av=typeof Promise=="function"?Promise:void 0,d1=typeof queueMicrotask=="function"?queueMicrotask:typeof av<"u"?function(e){return av.resolve(null).then(e).catch(p1)}:O_;function p1(e){setTimeout(function(){throw e})}function of(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(i===0){e.removeChild(a),nl(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=a}while(n);nl(t)}function Qf(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Qf(n),ad(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function m1(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[ko])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=ii(e.nextSibling),e===null)break}return null}function g1(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ii(e.nextSibling),e===null))return null;return e}function ii(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}function sv(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}function I_(e,t,n){switch(t=kc(n),e){case"html":if(e=t.documentElement,!e)throw Error(Z(452));return e;case"head":if(e=t.head,!e)throw Error(Z(453));return e;case"body":if(e=t.body,!e)throw Error(Z(454));return e;default:throw Error(Z(451))}}var Yn=new Map,rv=new Set;function qc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.ownerDocument}var ji=ge.d;ge.d={f:v1,r:y1,D:_1,C:x1,L:b1,m:M1,X:E1,S:S1,M:A1};function v1(){var e=ji.f(),t=su();return e||t}function y1(e){var t=Tr(e);t!==null&&t.tag===5&&t.type==="form"?Iy(t):ji.r(e)}var Rr=typeof document>"u"?null:document;function z_(e,t,n){var i=Rr;if(i&&typeof t=="string"&&t){var a=Gn(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),rv.has(a)||(rv.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),Je(t,"link",e),qe(t),i.head.appendChild(t)))}}function _1(e){ji.D(e),z_("dns-prefetch",e,null)}function x1(e,t){ji.C(e,t),z_("preconnect",e,t)}function b1(e,t,n){ji.L(e,t,n);var i=Rr;if(i&&e&&t){var a='link[rel="preload"][as="'+Gn(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Gn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Gn(n.imageSizes)+'"]')):a+='[href="'+Gn(e)+'"]';var s=a;switch(t){case"style":s=Sr(e);break;case"script":s=Cr(e)}Yn.has(s)||(e=ve({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Yn.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(dl(s))||t==="script"&&i.querySelector(pl(s))||(t=i.createElement("link"),Je(t,"link",e),qe(t),i.head.appendChild(t)))}}function M1(e,t){ji.m(e,t);var n=Rr;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+Gn(i)+'"][href="'+Gn(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Cr(e)}if(!Yn.has(s)&&(e=ve({rel:"modulepreload",href:e},t),Yn.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(pl(s)))return}i=n.createElement("link"),Je(i,"link",e),qe(i),n.head.appendChild(i)}}}function S1(e,t,n){ji.S(e,t,n);var i=Rr;if(i&&e){var a=or(i).hoistableStyles,s=Sr(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(dl(s)))o.loading=5;else{e=ve({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Yn.get(s))&&Vd(e,n);var l=r=i.createElement("link");qe(l),Je(l,"link",e),l._p=new Promise(function(c,u){l.onload=c,l.onerror=u}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,yc(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function E1(e,t){ji.X(e,t);var n=Rr;if(n&&e){var i=or(n).hoistableScripts,a=Cr(e),s=i.get(a);s||(s=n.querySelector(pl(a)),s||(e=ve({src:e,async:!0},t),(t=Yn.get(a))&&Gd(e,t),s=n.createElement("script"),qe(s),Je(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function A1(e,t){ji.M(e,t);var n=Rr;if(n&&e){var i=or(n).hoistableScripts,a=Cr(e),s=i.get(a);s||(s=n.querySelector(pl(a)),s||(e=ve({src:e,async:!0,type:"module"},t),(t=Yn.get(a))&&Gd(e,t),s=n.createElement("script"),qe(s),Je(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function ov(e,t,n,i){var a=(a=Aa.current)?qc(a):null;if(!a)throw Error(Z(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Sr(n.href),n=or(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Sr(n.href);var s=or(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(dl(e)))&&!s._p&&(r.instance=s,r.state.loading=5),Yn.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Yn.set(e,n),s||T1(a,e,n,r.state))),t&&i===null)throw Error(Z(528,""));return r}if(t&&i!==null)throw Error(Z(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Cr(n),n=or(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(Z(444,e))}}function Sr(e){return'href="'+Gn(e)+'"'}function dl(e){return'link[rel="stylesheet"]['+e+"]"}function B_(e){return ve({},e,{"data-precedence":e.precedence,precedence:null})}function T1(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),Je(t,"link",n),qe(t),e.head.appendChild(t))}function Cr(e){return'[src="'+Gn(e)+'"]'}function pl(e){return"script[async]"+e}function lv(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Gn(n.href)+'"]');if(i)return t.instance=i,qe(i),i;var a=ve({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),qe(i),Je(i,"style",a),yc(i,n.precedence,e),t.instance=i;case"stylesheet":a=Sr(n.href);var s=e.querySelector(dl(a));if(s)return t.state.loading|=4,t.instance=s,qe(s),s;i=B_(n),(a=Yn.get(a))&&Vd(i,a),s=(e.ownerDocument||e).createElement("link"),qe(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Je(s,"link",i),t.state.loading|=4,yc(s,n.precedence,e),t.instance=s;case"script":return s=Cr(n.src),(a=e.querySelector(pl(s)))?(t.instance=a,qe(a),a):(i=n,(a=Yn.get(s))&&(i=ve({},n),Gd(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),qe(a),Je(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(Z(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,yc(i,n.precedence,e));return t.instance}function yc(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Vd(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Gd(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var _c=null;function cv(e,t,n){if(_c===null){var i=new Map,a=_c=new Map;a.set(n,i)}else a=_c,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[ko]||s[en]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function uv(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function w1(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function F_(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}var Ko=null;function R1(){}function C1(e,t,n){if(Ko===null)throw Error(Z(475));var i=Ko;if(t.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&!(t.state.loading&4)){if(t.instance===null){var a=Sr(n.href),s=e.querySelector(dl(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(i.count++,i=Xc.bind(i),e.then(i,i)),t.state.loading|=4,t.instance=s,qe(s);return}s=e.ownerDocument||e,n=B_(n),(a=Yn.get(a))&&Vd(n,a),s=s.createElement("link"),qe(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Je(s,"link",n),t.instance=s}i.stylesheets===null&&(i.stylesheets=new Map),i.stylesheets.set(t,e),(e=t.state.preload)&&!(t.state.loading&3)&&(i.count++,t=Xc.bind(i),e.addEventListener("load",t),e.addEventListener("error",t))}}function D1(){if(Ko===null)throw Error(Z(475));var e=Ko;return e.stylesheets&&e.count===0&&Kf(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Kf(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}function Xc(){if(this.count--,this.count===0){if(this.stylesheets)Kf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Wc=null;function Kf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Wc=new Map,t.forEach(U1,e),Wc=null,Xc.call(e))}function U1(e,t){if(!(t.state.loading&4)){var n=Wc.get(e);if(n)var i=n.get(null);else{n=new Map,Wc.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Xc.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var $o={$$typeof:Fi,Provider:null,Consumer:null,_currentValue:ss,_currentValue2:ss,_threadCount:0};function L1(e,t,n,i,a,s,r,o){this.tag=1,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ph(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ph(0),this.hiddenUpdates=Ph(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function H_(e,t,n,i,a,s,r,o,l,c,u,d){return e=new L1(e,t,n,r,o,l,c,d),t=1,s===!0&&(t|=24),s=qn(3,null,null,t),e.current=s,s.stateNode=e,t=gd(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},Ud(s),e}function V_(e){return e?(e=ir,e):ir}function G_(e,t,n,i,a,s){a=V_(a),i.context===null?i.context=a:i.pendingContext=a,i=Ta(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=wa(e,i,t),n!==null&&(dn(n,e,t),Oo(n,e,t))}function hv(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function kd(e,t){hv(e,t),(e=e.alternate)&&hv(e,t)}function k_(e){if(e.tag===13){var t=Na(e,67108864);t!==null&&dn(t,e,67108864),kd(e,67108864)}}var Yc=!0;function N1(e,t,n,i){var a=Dt.T;Dt.T=null;var s=ge.p;try{ge.p=2,qd(e,t,n,i)}finally{ge.p=s,Dt.T=a}}function P1(e,t,n,i){var a=Dt.T;Dt.T=null;var s=ge.p;try{ge.p=8,qd(e,t,n,i)}finally{ge.p=s,Dt.T=a}}function qd(e,t,n,i){if(Yc){var a=$f(i);if(a===null)sf(e,t,i,Zc,n),fv(e,i);else if(I1(a,e,t,n,i))i.stopPropagation();else if(fv(e,i),t&4&&-1<O1.indexOf(e)){for(;a!==null;){var s=Tr(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=ts(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Rn(r);o.entanglements[1]|=l,r&=~l}Ti(s),!(Ee&6)&&(Bc=Mi()+500,fl(0,!1))}}break;case 13:o=Na(s,2),o!==null&&dn(o,s,2),su(),kd(s,2)}if(s=$f(i),s===null&&sf(e,t,i,Zc,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else sf(e,t,i,null,n)}}function $f(e){return e=rd(e),Xd(e)}var Zc=null;function Xd(e){if(Zc=null,e=is(e),e!==null){var t=Er(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=bv(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Zc=e,null}function q_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(MM()){case Sv:return 2;case Ev:return 8;case Ec:case SM:return 32;case Av:return 268435456;default:return 32}default:return 32}}var td=!1,Da=null,Ua=null,La=null,tl=new Map,el=new Map,Ma=[],O1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function fv(e,t){switch(e){case"focusin":case"focusout":Da=null;break;case"dragenter":case"dragleave":Ua=null;break;case"mouseover":case"mouseout":La=null;break;case"pointerover":case"pointerout":tl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":el.delete(t.pointerId)}}function xo(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=Tr(t),t!==null&&k_(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function I1(e,t,n,i,a){switch(t){case"focusin":return Da=xo(Da,e,t,n,i,a),!0;case"dragenter":return Ua=xo(Ua,e,t,n,i,a),!0;case"mouseover":return La=xo(La,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return tl.set(s,xo(tl.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,el.set(s,xo(el.get(s)||null,e,t,n,i,a)),!0}return!1}function X_(e){var t=is(e.target);if(t!==null){var n=Er(t);if(n!==null){if(t=n.tag,t===13){if(t=bv(n),t!==null){e.blockedOn=t,LM(e.priority,function(){if(n.tag===13){var i=Cn(),a=Na(n,i);a!==null&&dn(a,n,i),kd(n,i)}});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=$f(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);yf=i,n.target.dispatchEvent(i),yf=null}else return t=Tr(n),t!==null&&k_(t),e.blockedOn=n,!1;t.shift()}return!0}function dv(e,t,n){xc(e)&&n.delete(t)}function z1(){td=!1,Da!==null&&xc(Da)&&(Da=null),Ua!==null&&xc(Ua)&&(Ua=null),La!==null&&xc(La)&&(La=null),tl.forEach(dv),el.forEach(dv)}function oc(e,t){e.blockedOn===t&&(e.blockedOn=null,td||(td=!0,He.unstable_scheduleCallback(He.unstable_NormalPriority,z1)))}var lc=null;function pv(e){lc!==e&&(lc=e,He.unstable_scheduleCallback(He.unstable_NormalPriority,function(){lc===e&&(lc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Xd(i||n)===null)continue;break}var s=Tr(n);s!==null&&(e.splice(t,3),t-=3,Rf(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function nl(e){function t(l){return oc(l,e)}Da!==null&&oc(Da,e),Ua!==null&&oc(Ua,e),La!==null&&oc(La,e),tl.forEach(t),el.forEach(t);for(var n=0;n<Ma.length;n++){var i=Ma[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Ma.length&&(n=Ma[0],n.blockedOn===null);)X_(n),n.blockedOn===null&&Ma.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[xn]||null;if(typeof s=="function")r||pv(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[xn]||null)o=r.formAction;else if(Xd(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),pv(n)}}}function Wd(e){this._internalRoot=e}lu.prototype.render=Wd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Z(409));var n=t.current,i=Cn();G_(n,i,e,t,null,null)};lu.prototype.unmount=Wd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;e.tag===0&&pr(),G_(e.current,2,null,e,null,null),su(),t[Ar]=null}};function lu(e){this._internalRoot=e}lu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uv();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ma.length&&t!==0&&t<Ma[n].priority;n++);Ma.splice(n,0,e),n===0&&X_(e)}};var mv=gv.version;if(mv!=="19.0.0")throw Error(Z(527,mv,"19.0.0"));ge.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Z(188)):(e=Object.keys(e).join(","),Error(Z(268,e)));return e=_M(t),e=e!==null?Mv(e):null,e=e===null?null:e.stateNode,e};var B1={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:Dt,findFiberByHostInstance:is,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(bo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!bo.isDisabled&&bo.supportsFiber))try{il=bo.inject(B1),wn=bo}catch{}var bo;cu.createRoot=function(e,t){if(!vv(e))throw Error(Z(299));var n=!1,i="",a=Gy,s=ky,r=qy,o=null;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=H_(e,1,!1,null,null,n,i,a,s,r,o,null),e[Ar]=t.current,Hd(e.nodeType===8?e.parentNode:e),new Wd(t)};cu.hydrateRoot=function(e,t,n){if(!vv(e))throw Error(Z(299));var i=!1,a="",s=Gy,r=ky,o=qy,l=null,c=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.unstable_transitionCallbacks!==void 0&&(l=n.unstable_transitionCallbacks),n.formState!==void 0&&(c=n.formState)),t=H_(e,1,!0,t,n??null,i,a,s,r,o,l,c),t.context=V_(null),n=t.current,i=Cn(),a=Ta(i),a.callback=null,wa(n,a,i),t.current.lanes=i,sl(t,i),Ti(t),e[Ar]=t.current,Hd(e),new lu(t)};cu.version="19.0.0"});var j_=vi((AC,Z_)=>{"use strict";function Y_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Y_)}catch(e){console.error(e)}}Y_(),Z_.exports=W_()});function Ul(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[e&255]+sn[e>>8&255]+sn[e>>16&255]+sn[e>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function on(e,t,n){return Math.max(t,Math.min(n,e))}function FE(e,t){return(e%t+t)%t}function Qd(e,t,n){return(1-n)*e+n*t}function gl(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Mn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}function fb(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Vu(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function HE(){let e=Vu("canvas");return e.style.display="block",e}function bl(e){e in rx||(rx[e]=!0,console.warn(e))}function VE(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function GE(e){let t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function kE(e){let t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}function ra(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Yr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}function $d(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?pm.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function ep(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){As.fromArray(e,s);let o=a.x*Math.abs(As.x)+a.y*Math.abs(As.y)+a.z*Math.abs(As.z),l=t.dot(As),c=n.dot(As),u=i.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}function pp(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function eA(e,t,n,i,a,s,r,o){let l;if(t.side===ln?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===ja,o),l===null)return null;Au.copy(o),Au.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Au);return c<n.near||c>n.far?null:{distance:c,point:Au.clone(),object:e}}function Tu(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,bu),e.getVertexPosition(l,Mu),e.getVertexPosition(c,Su);let u=eA(e,t,n,i,bu,Mu,Su,Sx);if(u){let d=new P;Ls.getBarycoord(Sx,bu,Mu,Su,d),a&&(u.uv=Ls.getInterpolatedAttribute(a,o,l,c,d,new wt)),s&&(u.uv1=Ls.getInterpolatedAttribute(s,o,l,c,d,new wt)),r&&(u.normal=Ls.getInterpolatedAttribute(r,o,l,c,d,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new P,materialIndex:0};Ls.getNormal(bu,Mu,Su,f.normal),u.face=f,u.barycoord=d}return u}function eo(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let a=e[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone():Array.isArray(a)?t[n][i]=a.slice():t[n][i]=a}}return t}function mn(e){let t={};for(let n=0;n<e.length;n++){let i=eo(e[n]);for(let a in i)t[a]=i[a]}return t}function nA(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function pb(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}function mb(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function lA(e){let t=new WeakMap;function n(o,l){let c=o.array,u=o.usage,d=c.byteLength,f=e.createBuffer();e.bindBuffer(l,f),e.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){let g=d[f],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){let x=d[p];e.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}function kw(e,t,n,i,a,s,r){let o=new Bt(0),l=s===!0?0:1,c,u,d=null,f=0,p=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?n:t).get(y)),y}function x(v){let y=!1,_=g(v);_===null?h(o,l):_&&_.isColor&&(h(_,1),y=!0);let R=e.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(v,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===lh)?(u===void 0&&(u=new Qe(new Rl(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:eo(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),Rs.copy(y.backgroundRotation),Rs.x*=-1,Rs.y*=-1,Rs.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Rs.y*=-1,Rs.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Gw.makeRotationFromEuler(Rs)),u.material.toneMapped=Jt.getTransfer(_.colorSpace)!==ae,(d!==_||f!==_.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Qe(new Qu(2,2),new vn({name:"BackgroundMaterial",uniforms:eo(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:ja,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(_.colorSpace)!==ae,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||f!==_.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=_,f=_.version,p=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,y){v.getRGB(Ru,pb(e)),i.buffers.color.setClear(Ru.r,Ru.g,Ru.b,y,r)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,h(o,l)},render:x,addToRenderList:m}}function qw(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null),s=a,r=!1;function o(b,D,q,V,X){let I=!1,F=d(V,q,D);s!==F&&(s=F,c(s.object)),I=p(b,V,q,X),I&&g(b,V,q,X),X!==null&&t.update(X,e.ELEMENT_ARRAY_BUFFER),(I||r)&&(r=!1,_(b,D,q,V),X!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return e.createVertexArray()}function c(b){return e.bindVertexArray(b)}function u(b){return e.deleteVertexArray(b)}function d(b,D,q){let V=q.wireframe===!0,X=i[b.id];X===void 0&&(X={},i[b.id]=X);let I=X[D.id];I===void 0&&(I={},X[D.id]=I);let F=I[V];return F===void 0&&(F=f(l()),I[V]=F),F}function f(b){let D=[],q=[],V=[];for(let X=0;X<n;X++)D[X]=0,q[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:q,attributeDivisors:V,object:b,attributes:{},index:null}}function p(b,D,q,V){let X=s.attributes,I=D.attributes,F=0,K=q.getAttributes();for(let G in K)if(K[G].location>=0){let ut=X[G],bt=I[G];if(bt===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(bt=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(bt=b.instanceColor)),ut===void 0||ut.attribute!==bt||bt&&ut.data!==bt.data)return!0;F++}return s.attributesNum!==F||s.index!==V}function g(b,D,q,V){let X={},I=D.attributes,F=0,K=q.getAttributes();for(let G in K)if(K[G].location>=0){let ut=I[G];ut===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(ut=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(ut=b.instanceColor));let bt={};bt.attribute=ut,ut&&ut.data&&(bt.data=ut.data),X[G]=bt,F++}s.attributes=X,s.attributesNum=F,s.index=V}function x(){let b=s.newAttributes;for(let D=0,q=b.length;D<q;D++)b[D]=0}function m(b){h(b,0)}function h(b,D){let q=s.newAttributes,V=s.enabledAttributes,X=s.attributeDivisors;q[b]=1,V[b]===0&&(e.enableVertexAttribArray(b),V[b]=1),X[b]!==D&&(e.vertexAttribDivisor(b,D),X[b]=D)}function v(){let b=s.newAttributes,D=s.enabledAttributes;for(let q=0,V=D.length;q<V;q++)D[q]!==b[q]&&(e.disableVertexAttribArray(q),D[q]=0)}function y(b,D,q,V,X,I,F){F===!0?e.vertexAttribIPointer(b,D,q,X,I):e.vertexAttribPointer(b,D,q,V,X,I)}function _(b,D,q,V){x();let X=V.attributes,I=q.getAttributes(),F=D.defaultAttributeValues;for(let K in I){let G=I[K];if(G.location>=0){let it=X[K];if(it===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(it=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(it=b.instanceColor)),it!==void 0){let ut=it.normalized,bt=it.itemSize,Ft=t.get(it);if(Ft===void 0)continue;let se=Ft.buffer,Y=Ft.type,et=Ft.bytesPerElement,yt=Y===e.INT||Y===e.UNSIGNED_INT||it.gpuType===Jm;if(it.isInterleavedBufferAttribute){let st=it.data,At=st.stride,Ct=it.offset;if(st.isInstancedInterleavedBuffer){for(let Ht=0;Ht<G.locationSize;Ht++)h(G.location+Ht,st.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ht=0;Ht<G.locationSize;Ht++)m(G.location+Ht);e.bindBuffer(e.ARRAY_BUFFER,se);for(let Ht=0;Ht<G.locationSize;Ht++)y(G.location+Ht,bt/G.locationSize,Y,ut,At*et,(Ct+bt/G.locationSize*Ht)*et,yt)}else{if(it.isInstancedBufferAttribute){for(let st=0;st<G.locationSize;st++)h(G.location+st,it.meshPerAttribute);b.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let st=0;st<G.locationSize;st++)m(G.location+st);e.bindBuffer(e.ARRAY_BUFFER,se);for(let st=0;st<G.locationSize;st++)y(G.location+st,bt/G.locationSize,Y,ut,bt*et,bt/G.locationSize*st*et,yt)}}else if(F!==void 0){let ut=F[K];if(ut!==void 0)switch(ut.length){case 2:e.vertexAttrib2fv(G.location,ut);break;case 3:e.vertexAttrib3fv(G.location,ut);break;case 4:e.vertexAttrib4fv(G.location,ut);break;default:e.vertexAttrib1fv(G.location,ut)}}}}v()}function R(){C();for(let b in i){let D=i[b];for(let q in D){let V=D[q];for(let X in V)u(V[X].object),delete V[X];delete D[q]}delete i[b]}}function w(b){if(i[b.id]===void 0)return;let D=i[b.id];for(let q in D){let V=D[q];for(let X in V)u(V[X].object),delete V[X];delete D[q]}delete i[b.id]}function T(b){for(let D in i){let q=i[D];if(q[b.id]===void 0)continue;let V=q[b.id];for(let X in V)u(V[X].object),delete V[X];delete q[b.id]}}function C(){E(),r=!0,s!==a&&(s=a,c(s.object))}function E(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function Xw(e,t,n){let i;function a(c){i=c}function s(c,u){e.drawArrays(i,c,u),n.update(u,i,1)}function r(c,u,d){d!==0&&(e.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*f[x];n.update(g,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ww(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==ci&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let C=T===Dl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==oa&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==aa&&!C)}function l(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:R,maxSamples:w}}function Yw(e){let t=this,n=null,i=0,a=!1,s=!1,r=new na,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||i!==0||a;return a=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,h=e.get(d);if(!a||g===null||g.length===0||s&&!m)s?u(null):c();else{let v=s?0:i,y=v*4,_=h.clippingState||null;l.value=_,_=u(g,f,y,p);for(let R=0;R!==y;++R)_[R]=n[R];h.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,f,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let h=p+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let y=0,_=p;y!==x;++y,_+=4)r.copy(d[y]).applyMatrix4(v,o),r.normal.toArray(m,_),m[_+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Zw(e){let t=new WeakMap;function n(r,o){return o===Ip?r.mapping=Jr:o===zp&&(r.mapping=Qr),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===Ip||o===zp)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new _m(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",a),n(c.texture,r.mapping)}else return null}}return r}function a(r){let o=r.target;o.removeEventListener("dispose",a);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}function jw(e){let t=[],n=[],i=[],a=e,s=e-qr+1+Tx.length;for(let r=0;r<s;r++){let o=Math.pow(2,a);n.push(o);let l=1/o;r>e-qr?l=Tx[r-e+qr-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,x=3,m=2,h=1,v=new Float32Array(x*g*p),y=new Float32Array(m*g*p),_=new Float32Array(h*g*p);for(let w=0;w<p;w++){let T=w%3*2/3-1,C=w>2?0:-1,E=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];v.set(E,x*g*w),y.set(f,m*g*w);let b=[w,w,w,w,w,w];_.set(b,h*g*w)}let R=new Qn;R.setAttribute("position",new Ke(v,x)),R.setAttribute("uv",new Ke(y,m)),R.setAttribute("faceIndex",new Ke(_,h)),t.push(R),a>qr&&a--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function Cx(e,t,n){let i=new la(e,t,n);return i.texture.mapping=lh,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cu(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function Jw(e,t,n){let i=new Float32Array(Ns),a=new P(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ng(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ya,depthTest:!1,depthWrite:!1})}function Dx(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ng(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ya,depthTest:!1,depthWrite:!1})}function Ux(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ng(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ya,depthTest:!1,depthWrite:!1})}function ng(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qw(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Ip||l===zp,u=l===Jr||l===Qr;if(c||u){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new Ku(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||u&&p&&a(p)?(n===null&&(n=new Ku(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function Kw(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let a=n(i);return a===null&&bl("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function $w(e,t,n,i){let a={},s=new WeakMap;function r(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let m=0,h=x.length;m<h;m++)t.remove(x[m])}f.removeEventListener("dispose",r),delete a[f.id];let p=s.get(f);p&&(t.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,n.memory.geometries++),f}function l(d){let f=d.attributes;for(let g in f)t.update(f[g],e.ARRAY_BUFFER);let p=d.morphAttributes;for(let g in p){let x=p[g];for(let m=0,h=x.length;m<h;m++)t.update(x[m],e.ARRAY_BUFFER)}}function c(d){let f=[],p=d.index,g=d.attributes.position,x=0;if(p!==null){let v=p.array;x=p.version;for(let y=0,_=v.length;y<_;y+=3){let R=v[y+0],w=v[y+1],T=v[y+2];f.push(R,w,w,T,T,R)}}else if(g!==void 0){let v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let R=y+0,w=y+1,T=y+2;f.push(R,w,w,T,T,R)}}else return;let m=new(fb(f)?Yu:Wu)(f,1);m.version=x;let h=s.get(d);h&&t.remove(h),s.set(d,m)}function u(d){let f=s.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function t2(e,t,n){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,p){e.drawElements(i,p,s,f*r),n.update(p,i,1)}function c(f,p,g){g!==0&&(e.drawElementsInstanced(i,p,s,f*r,g),n.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];n.update(m,i,1)}function d(f,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/r,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,g);let h=0;for(let v=0;v<g;v++)h+=p[v]*x[v];n.update(h,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function e2(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function n2(e,t,n){let i=new WeakMap,a=new Ue;function s(r,o,l){let c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(o);if(f===void 0||f.count!==d){let E=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],y=0;p===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=o.attributes.position.count*y,R=1;_>t.maxTextureSize&&(R=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let w=new Float32Array(_*R*4*d),T=new ku(w,_,R,d);T.type=aa,T.needsUpdate=!0;let C=y*4;for(let b=0;b<d;b++){let D=m[b],q=h[b],V=v[b],X=_*R*4*b;for(let I=0;I<D.count;I++){let F=I*C;p===!0&&(a.fromBufferAttribute(D,I),w[X+F+0]=a.x,w[X+F+1]=a.y,w[X+F+2]=a.z,w[X+F+3]=0),g===!0&&(a.fromBufferAttribute(q,I),w[X+F+4]=a.x,w[X+F+5]=a.y,w[X+F+6]=a.z,w[X+F+7]=0),x===!0&&(a.fromBufferAttribute(V,I),w[X+F+8]=a.x,w[X+F+9]=a.y,w[X+F+10]=a.z,w[X+F+11]=V.itemSize===4?a.w:1)}}f={count:d,texture:T,size:new wt(_,R)},i.set(o,f),o.addEventListener("dispose",E)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:s}}function i2(e,t,n,i){let a=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:r}}function ao(e,t,n){let i=e[0];if(i<=0||i>0)return e;let a=t*n,s=Nx[a];if(s===void 0&&(s=new Float32Array(a),Nx[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Ve(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ge(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function uh(e,t){let n=Px[t];n===void 0&&(n=new Int32Array(t),Px[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function a2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function s2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2fv(this.addr,t),Ge(n,t)}}function r2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ve(n,t))return;e.uniform3fv(this.addr,t),Ge(n,t)}}function o2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4fv(this.addr,t),Ge(n,t)}}function l2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;zx.set(i),e.uniformMatrix2fv(this.addr,!1,zx),Ge(n,i)}}function c2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;Ix.set(i),e.uniformMatrix3fv(this.addr,!1,Ix),Ge(n,i)}}function u2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;Ox.set(i),e.uniformMatrix4fv(this.addr,!1,Ox),Ge(n,i)}}function h2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function f2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2iv(this.addr,t),Ge(n,t)}}function d2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3iv(this.addr,t),Ge(n,t)}}function p2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4iv(this.addr,t),Ge(n,t)}}function m2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function g2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2uiv(this.addr,t),Ge(n,t)}}function v2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3uiv(this.addr,t),Ge(n,t)}}function y2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4uiv(this.addr,t),Ge(n,t)}}function _2(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(Lx.compareFunction=hb,s=Lx):s=gb,n.setTexture2D(t||s,a)}function x2(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||yb,a)}function b2(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||_b,a)}function M2(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||vb,a)}function S2(e){switch(e){case 5126:return a2;case 35664:return s2;case 35665:return r2;case 35666:return o2;case 35674:return l2;case 35675:return c2;case 35676:return u2;case 5124:case 35670:return h2;case 35667:case 35671:return f2;case 35668:case 35672:return d2;case 35669:case 35673:return p2;case 5125:return m2;case 36294:return g2;case 36295:return v2;case 36296:return y2;case 35678:case 36198:case 36298:case 36306:case 35682:return _2;case 35679:case 36299:case 36307:return x2;case 35680:case 36300:case 36308:case 36293:return b2;case 36289:case 36303:case 36311:case 36292:return M2}}function E2(e,t){e.uniform1fv(this.addr,t)}function A2(e,t){let n=ao(t,this.size,2);e.uniform2fv(this.addr,n)}function T2(e,t){let n=ao(t,this.size,3);e.uniform3fv(this.addr,n)}function w2(e,t){let n=ao(t,this.size,4);e.uniform4fv(this.addr,n)}function R2(e,t){let n=ao(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function C2(e,t){let n=ao(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function D2(e,t){let n=ao(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function U2(e,t){e.uniform1iv(this.addr,t)}function L2(e,t){e.uniform2iv(this.addr,t)}function N2(e,t){e.uniform3iv(this.addr,t)}function P2(e,t){e.uniform4iv(this.addr,t)}function O2(e,t){e.uniform1uiv(this.addr,t)}function I2(e,t){e.uniform2uiv(this.addr,t)}function z2(e,t){e.uniform3uiv(this.addr,t)}function B2(e,t){e.uniform4uiv(this.addr,t)}function F2(e,t,n){let i=this.cache,a=t.length,s=uh(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),Ge(i,s));for(let r=0;r!==a;++r)n.setTexture2D(t[r]||gb,s[r])}function H2(e,t,n){let i=this.cache,a=t.length,s=uh(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),Ge(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||yb,s[r])}function V2(e,t,n){let i=this.cache,a=t.length,s=uh(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),Ge(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||_b,s[r])}function G2(e,t,n){let i=this.cache,a=t.length,s=uh(n,a);Ve(i,s)||(e.uniform1iv(this.addr,s),Ge(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||vb,s[r])}function k2(e){switch(e){case 5126:return E2;case 35664:return A2;case 35665:return T2;case 35666:return w2;case 35674:return R2;case 35675:return C2;case 35676:return D2;case 5124:case 35670:return U2;case 35667:case 35671:return L2;case 35668:case 35672:return N2;case 35669:case 35673:return P2;case 5125:return O2;case 36294:return I2;case 36295:return z2;case 36296:return B2;case 35678:case 36198:case 36298:case 36306:case 35682:return F2;case 35679:case 36299:case 36307:return H2;case 35680:case 36300:case 36308:case 36293:return V2;case 36289:case 36303:case 36311:case 36292:return G2}}function Bx(e,t){e.seq.push(t),e.map[t.id]=t}function q2(e,t,n){let i=e.name,a=i.length;for(Sp.lastIndex=0;;){let s=Sp.exec(i),r=Sp.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Bx(n,c===void 0?new bm(o,e,t):new Mm(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new Sm(o),Bx(n,d)),n=d}}}function Fx(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}function Y2(e,t){let n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}function Z2(e){Jt._getMatrix(Hx,Jt.workingColorSpace,e);let t=`mat3( ${Hx.elements.map(n=>n.toFixed(4))} )`;switch(Jt.getTransfer(e)){case ch:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Vx(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=e.getShaderInfoLog(t).trim();if(i&&a==="")return"";let s=/ERROR: 0:(\d+)/.exec(a);if(s){let r=parseInt(s[1]);return n.toUpperCase()+`

`+a+`

`+Y2(e.getShaderSource(t),r)}else return a}function j2(e,t){let n=Z2(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function J2(e,t){let n;switch(t){case xE:n="Linear";break;case bE:n="Reinhard";break;case ME:n="Cineon";break;case SE:n="ACESFilmic";break;case AE:n="AgX";break;case TE:n="Neutral";break;case EE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Q2(){Jt.getLuminanceCoefficients(Du);let e=Du.x.toFixed(4),t=Du.y.toFixed(4),n=Du.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function K2(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ml).join(`
`)}function $2(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function tR(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){let s=e.getActiveAttrib(t,a),r=s.name,o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function Ml(e){return e!==""}function Gx(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kx(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Em(e){return e.replace(eR,iR)}function iR(e,t){let n=It[t];if(n===void 0){let i=nR.get(t);if(i!==void 0)n=It[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Em(n)}function qx(e){return e.replace(aR,sR)}function sR(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Xx(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rR(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Kx?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===$1?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===ea&&(t="SHADOWMAP_TYPE_VSM"),t}function oR(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case Jr:case Qr:t="ENVMAP_TYPE_CUBE";break;case lh:t="ENVMAP_TYPE_CUBE_UV";break}return t}function lR(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Qr:t="ENVMAP_MODE_REFRACTION";break}return t}function cR(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case $x:t="ENVMAP_BLENDING_MULTIPLY";break;case yE:t="ENVMAP_BLENDING_MIX";break;case _E:t="ENVMAP_BLENDING_ADD";break}return t}function uR(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function hR(e,t,n,i){let a=e.getContext(),s=n.defines,r=n.vertexShader,o=n.fragmentShader,l=rR(n),c=oR(n),u=lR(n),d=cR(n),f=uR(n),p=K2(n),g=$2(s),x=a.createProgram(),m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ml).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ml).join(`
`),h.length>0&&(h+=`
`)):(m=[Xx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ml).join(`
`),h=[Xx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Za?"#define TONE_MAPPING":"",n.toneMapping!==Za?It.tonemapping_pars_fragment:"",n.toneMapping!==Za?J2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,j2("linearToOutputTexel",n.outputColorSpace),Q2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ml).join(`
`)),r=Em(r),r=Gx(r,n),r=kx(r,n),o=Em(o),o=Gx(o,n),o=kx(o,n),r=qx(r),o=qx(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===sx?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===sx?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let y=v+m+r,_=v+h+o,R=Fx(a,a.VERTEX_SHADER,y),w=Fx(a,a.FRAGMENT_SHADER,_);a.attachShader(x,R),a.attachShader(x,w),n.index0AttributeName!==void 0?a.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function T(D){if(e.debug.checkShaderErrors){let q=a.getProgramInfoLog(x).trim(),V=a.getShaderInfoLog(R).trim(),X=a.getShaderInfoLog(w).trim(),I=!0,F=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(I=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,x,R,w);else{let K=Vx(a,R,"vertex"),G=Vx(a,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+q+`
`+K+`
`+G)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(V===""||X==="")&&(F=!1);F&&(D.diagnostics={runnable:I,programLog:q,vertexShader:{log:V,prefix:m},fragmentShader:{log:X,prefix:h}})}a.deleteShader(R),a.deleteShader(w),C=new Zr(a,x),E=tR(a,x)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=a.getProgramParameter(x,X2)),b},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=W2++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=w,this}function dR(e,t,n,i,a,s,r){let o=new qu,l=new Am,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures,p=a.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,b,D,q,V){let X=q.fog,I=V.geometry,F=E.isMeshStandardMaterial?q.environment:null,K=(E.isMeshStandardMaterial?n:t).get(E.envMap||F),G=K&&K.mapping===lh?K.image.height:null,it=g[E.type];E.precision!==null&&(p=a.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let ut=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,bt=ut!==void 0?ut.length:0,Ft=0;I.morphAttributes.position!==void 0&&(Ft=1),I.morphAttributes.normal!==void 0&&(Ft=2),I.morphAttributes.color!==void 0&&(Ft=3);let se,Y,et,yt;if(it){let ee=wi[it];se=ee.vertexShader,Y=ee.fragmentShader}else se=E.vertexShader,Y=E.fragmentShader,l.update(E),et=l.getVertexShaderID(E),yt=l.getFragmentShaderID(E);let st=e.getRenderTarget(),At=e.state.buffers.depth.getReversed(),Ct=V.isInstancedMesh===!0,Ht=V.isBatchedMesh===!0,be=!!E.map,Zt=!!E.matcap,Ce=!!K,O=!!E.aoMap,Nn=!!E.lightMap,kt=!!E.bumpMap,qt=!!E.normalMap,St=!!E.displacementMap,de=!!E.emissiveMap,Mt=!!E.metalnessMap,A=!!E.roughnessMap,M=E.anisotropy>0,z=E.clearcoat>0,j=E.dispersion>0,Q=E.iridescence>0,W=E.sheen>0,_t=E.transmission>0,rt=M&&!!E.anisotropyMap,ht=z&&!!E.clearcoatMap,jt=z&&!!E.clearcoatNormalMap,$=z&&!!E.clearcoatRoughnessMap,ft=Q&&!!E.iridescenceMap,Et=Q&&!!E.iridescenceThicknessMap,Tt=W&&!!E.sheenColorMap,dt=W&&!!E.sheenRoughnessMap,Xt=!!E.specularMap,Pt=!!E.specularColorMap,ce=!!E.specularIntensityMap,U=_t&&!!E.transmissionMap,at=_t&&!!E.thicknessMap,k=!!E.gradientMap,J=!!E.alphaMap,ct=E.alphaTest>0,ot=!!E.alphaHash,Ut=!!E.extensions,Ae=Za;E.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Ae=e.toneMapping);let $e={shaderID:it,shaderType:E.type,shaderName:E.name,vertexShader:se,fragmentShader:Y,defines:E.defines,customVertexShaderID:et,customFragmentShaderID:yt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ht,batchingColor:Ht&&V._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&V.instanceColor!==null,instancingMorph:Ct&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?e.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:io,alphaToCoverage:!!E.alphaToCoverage,map:be,matcap:Zt,envMap:Ce,envMapMode:Ce&&K.mapping,envMapCubeUVHeight:G,aoMap:O,lightMap:Nn,bumpMap:kt,normalMap:qt,displacementMap:f&&St,emissiveMap:de,normalMapObjectSpace:qt&&E.normalMapType===UE,normalMapTangentSpace:qt&&E.normalMapType===DE,metalnessMap:Mt,roughnessMap:A,anisotropy:M,anisotropyMap:rt,clearcoat:z,clearcoatMap:ht,clearcoatNormalMap:jt,clearcoatRoughnessMap:$,dispersion:j,iridescence:Q,iridescenceMap:ft,iridescenceThicknessMap:Et,sheen:W,sheenColorMap:Tt,sheenRoughnessMap:dt,specularMap:Xt,specularColorMap:Pt,specularIntensityMap:ce,transmission:_t,transmissionMap:U,thicknessMap:at,gradientMap:k,opaque:E.transparent===!1&&E.blending===Xr&&E.alphaToCoverage===!1,alphaMap:J,alphaTest:ct,alphaHash:ot,combine:E.combine,mapUv:be&&x(E.map.channel),aoMapUv:O&&x(E.aoMap.channel),lightMapUv:Nn&&x(E.lightMap.channel),bumpMapUv:kt&&x(E.bumpMap.channel),normalMapUv:qt&&x(E.normalMap.channel),displacementMapUv:St&&x(E.displacementMap.channel),emissiveMapUv:de&&x(E.emissiveMap.channel),metalnessMapUv:Mt&&x(E.metalnessMap.channel),roughnessMapUv:A&&x(E.roughnessMap.channel),anisotropyMapUv:rt&&x(E.anisotropyMap.channel),clearcoatMapUv:ht&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:jt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:dt&&x(E.sheenRoughnessMap.channel),specularMapUv:Xt&&x(E.specularMap.channel),specularColorMapUv:Pt&&x(E.specularColorMap.channel),specularIntensityMapUv:ce&&x(E.specularIntensityMap.channel),transmissionMapUv:U&&x(E.transmissionMap.channel),thicknessMapUv:at&&x(E.thicknessMap.channel),alphaMapUv:J&&x(E.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(qt||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!I.attributes.uv&&(be||J),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:At,skinning:V.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ft,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ae,decodeVideoTexture:be&&E.map.isVideoTexture===!0&&Jt.getTransfer(E.map.colorSpace)===ae,decodeVideoTextureEmissive:de&&E.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(E.emissiveMap.colorSpace)===ae,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ia,flipSided:E.side===ln,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ut&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&E.extensions.multiDraw===!0||Ht)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function h(E){let b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(let D in E.defines)b.push(D),b.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(v(b,E),y(b,E),b.push(e.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function v(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function y(E,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),E.push(o.mask)}function _(E){let b=g[E.type],D;if(b){let q=wi[b];D=iA.clone(q.uniforms)}else D=E.uniforms;return D}function R(E,b){let D;for(let q=0,V=u.length;q<V;q++){let X=u[q];if(X.cacheKey===b){D=X,++D.usedTimes;break}}return D===void 0&&(D=new hR(e,b,E,s),u.push(D)),D}function w(E){if(--E.usedTimes===0){let b=u.indexOf(E);u[b]=u[u.length-1],u.pop(),E.destroy()}}function T(E){l.remove(E)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:_,acquireProgram:R,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:C}}function pR(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function mR(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Wx(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Yx(){let e=[],t=0,n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(d,f,p,g,x,m){let h=e[t];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},e[t]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=x,h.group=m),t++,h}function o(d,f,p,g,x,m){let h=r(d,f,p,g,x,m);p.transmission>0?i.push(h):p.transparent===!0?a.push(h):n.push(h)}function l(d,f,p,g,x,m){let h=r(d,f,p,g,x,m);p.transmission>0?i.unshift(h):p.transparent===!0?a.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||mR),i.length>1&&i.sort(f||Wx),a.length>1&&a.sort(f||Wx)}function u(){for(let d=t,f=e.length;d<f;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function gR(){let e=new WeakMap;function t(i,a){let s=e.get(i),r;return s===void 0?(r=new Yx,e.set(i,[r])):a>=s.length?(r=new Yx,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function vR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new P,color:new Bt};break;case"SpotLight":n={position:new P,direction:new P,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":n={color:new Bt,position:new P,halfWidth:new P,halfHeight:new P};break}return e[t.id]=n,n}}}function yR(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}function xR(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function bR(e){let t=new vR,n=yR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let a=new P,s=new ze,r=new ze;function o(c){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,h=0,v=0,y=0,_=0,R=0,w=0,T=0;c.sort(xR);for(let E=0,b=c.length;E<b;E++){let D=c[E],q=D.color,V=D.intensity,X=D.distance,I=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=q.r*V,d+=q.g*V,f+=q.b*V;else if(D.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(D.sh.coefficients[F],V);T++}else if(D.isDirectionalLight){let F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let K=D.shadow,G=n.get(D);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=I,i.directionalShadowMatrix[p]=D.shadow.matrix,v++}i.directional[p]=F,p++}else if(D.isSpotLight){let F=t.get(D);F.position.setFromMatrixPosition(D.matrixWorld),F.color.copy(q).multiplyScalar(V),F.distance=X,F.coneCos=Math.cos(D.angle),F.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),F.decay=D.decay,i.spot[x]=F;let K=D.shadow;if(D.map&&(i.spotLightMap[R]=D.map,R++,K.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[x]=K.matrix,D.castShadow){let G=n.get(D);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,i.spotShadow[x]=G,i.spotShadowMap[x]=I,_++}x++}else if(D.isRectAreaLight){let F=t.get(D);F.color.copy(q).multiplyScalar(V),F.halfWidth.set(D.width*.5,0,0),F.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=F,m++}else if(D.isPointLight){let F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),F.distance=D.distance,F.decay=D.decay,D.castShadow){let K=D.shadow,G=n.get(D);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=I,i.pointShadowMatrix[g]=D.shadow.matrix,y++}i.point[g]=F,g++}else if(D.isHemisphereLight){let F=t.get(D);F.skyColor.copy(D.color).multiplyScalar(V),F.groundColor.copy(D.groundColor).multiplyScalar(V),i.hemi[h]=F,h++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let C=i.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==h||C.numDirectionalShadows!==v||C.numPointShadows!==y||C.numSpotShadows!==_||C.numSpotMaps!==R||C.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=_+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=T,C.directionalLength=p,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=h,C.numDirectionalShadows=v,C.numPointShadows=y,C.numSpotShadows=_,C.numSpotMaps=R,C.numLightProbes=T,i.version=_R++)}function l(c,u){let d=0,f=0,p=0,g=0,x=0,m=u.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){let y=c[h];if(y.isDirectionalLight){let _=i.directional[d];_.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(m),d++}else if(y.isSpotLight){let _=i.spot[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),r.identity(),s.copy(y.matrixWorld),s.premultiply(m),r.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),g++}else if(y.isPointLight){let _=i.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let _=i.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function Zx(e){let t=new bR(e),n=[],i=[];function a(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function r(u){i.push(u)}function o(){t.setup(n)}function l(u){t.setupView(n,u)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function MR(e){let t=new WeakMap;function n(a,s=0){let r=t.get(a),o;return r===void 0?(o=new Zx(e),t.set(a,[o])):s>=r.length?(o=new Zx(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}function AR(e,t,n){let i=new Ju,a=new wt,s=new wt,r=new Ue,o=new wm({depthPacking:CE}),l=new Rm,c={},u=n.maxTextureSize,d={[ja]:ln,[ln]:ja,[ia]:ia},f=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:SR,fragmentShader:ER}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Qn;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kx;let h=this.type;this.render=function(w,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let E=e.getRenderTarget(),b=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),q=e.state;q.setBlending(Ya),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let V=h!==ea&&this.type===ea,X=h===ea&&this.type!==ea;for(let I=0,F=w.length;I<F;I++){let K=w[I],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);let it=G.getFrameExtents();if(a.multiply(it),s.copy(G.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/it.x),a.x=s.x*it.x,G.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/it.y),a.y=s.y*it.y,G.mapSize.y=s.y)),G.map===null||V===!0||X===!0){let bt=this.type!==ea?{minFilter:ui,magFilter:ui}:{};G.map!==null&&G.map.dispose(),G.map=new la(a.x,a.y,bt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();let ut=G.getViewportCount();for(let bt=0;bt<ut;bt++){let Ft=G.getViewport(bt);r.set(s.x*Ft.x,s.y*Ft.y,s.x*Ft.z,s.y*Ft.w),q.viewport(r),G.updateMatrices(K,bt),i=G.getFrustum(),_(T,C,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===ea&&v(G,C),G.needsUpdate=!1}h=this.type,m.needsUpdate=!1,e.setRenderTarget(E,b,D)};function v(w,T){let C=t.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new la(a.x,a.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,e.setRenderTarget(w.mapPass),e.clear(),e.renderBufferDirect(T,null,C,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,e.setRenderTarget(w.map),e.clear(),e.renderBufferDirect(T,null,C,p,x,null)}function y(w,T,C,E){let b=null,D=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)b=D;else if(b=C.isPointLight===!0?l:o,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let q=b.uuid,V=T.uuid,X=c[q];X===void 0&&(X={},c[q]=X);let I=X[V];I===void 0&&(I=b.clone(),X[V]=I,T.addEventListener("dispose",R)),b=I}if(b.visible=T.visible,b.wireframe=T.wireframe,E===ea?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:d[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,C.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let q=e.properties.get(b);q.light=C}return b}function _(w,T,C,E,b){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===ea)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);let V=t.update(w),X=w.material;if(Array.isArray(X)){let I=V.groups;for(let F=0,K=I.length;F<K;F++){let G=I[F],it=X[G.materialIndex];if(it&&it.visible){let ut=y(w,it,E,b);w.onBeforeShadow(e,w,T,C,V,ut,G),e.renderBufferDirect(C,null,V,ut,w,G),w.onAfterShadow(e,w,T,C,V,ut,G)}}}else if(X.visible){let I=y(w,X,E,b);w.onBeforeShadow(e,w,T,C,V,I,null),e.renderBufferDirect(C,null,V,I,w,null),w.onAfterShadow(e,w,T,C,V,I,null)}}let q=w.children;for(let V=0,X=q.length;V<X;V++)_(q[V],T,C,E,b)}function R(w){w.target.removeEventListener("dispose",R);for(let C in c){let E=c[C],b=w.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}function wR(e,t){function n(){let U=!1,at=new Ue,k=null,J=new Ue(0,0,0,0);return{setMask:function(ct){k!==ct&&!U&&(e.colorMask(ct,ct,ct,ct),k=ct)},setLocked:function(ct){U=ct},setClear:function(ct,ot,Ut,Ae,$e){$e===!0&&(ct*=Ae,ot*=Ae,Ut*=Ae),at.set(ct,ot,Ut,Ae),J.equals(at)===!1&&(e.clearColor(ct,ot,Ut,Ae),J.copy(at))},reset:function(){U=!1,k=null,J.set(-1,0,0,0)}}}function i(){let U=!1,at=!1,k=null,J=null,ct=null;return{setReversed:function(ot){if(at!==ot){let Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);let Ae=ct;ct=null,this.setClear(Ae)}at=ot},getReversed:function(){return at},setTest:function(ot){ot?st(e.DEPTH_TEST):At(e.DEPTH_TEST)},setMask:function(ot){k!==ot&&!U&&(e.depthMask(ot),k=ot)},setFunc:function(ot){if(at&&(ot=TR[ot]),J!==ot){switch(ot){case Cp:e.depthFunc(e.NEVER);break;case Dp:e.depthFunc(e.ALWAYS);break;case Up:e.depthFunc(e.LESS);break;case jr:e.depthFunc(e.LEQUAL);break;case Lp:e.depthFunc(e.EQUAL);break;case Np:e.depthFunc(e.GEQUAL);break;case Pp:e.depthFunc(e.GREATER);break;case Op:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}J=ot}},setLocked:function(ot){U=ot},setClear:function(ot){ct!==ot&&(at&&(ot=1-ot),e.clearDepth(ot),ct=ot)},reset:function(){U=!1,k=null,J=null,ct=null,at=!1}}}function a(){let U=!1,at=null,k=null,J=null,ct=null,ot=null,Ut=null,Ae=null,$e=null;return{setTest:function(ee){U||(ee?st(e.STENCIL_TEST):At(e.STENCIL_TEST))},setMask:function(ee){at!==ee&&!U&&(e.stencilMask(ee),at=ee)},setFunc:function(ee,Kn,Di){(k!==ee||J!==Kn||ct!==Di)&&(e.stencilFunc(ee,Kn,Di),k=ee,J=Kn,ct=Di)},setOp:function(ee,Kn,Di){(ot!==ee||Ut!==Kn||Ae!==Di)&&(e.stencilOp(ee,Kn,Di),ot=ee,Ut=Kn,Ae=Di)},setLocked:function(ee){U=ee},setClear:function(ee){$e!==ee&&(e.clearStencil(ee),$e=ee)},reset:function(){U=!1,at=null,k=null,J=null,ct=null,ot=null,Ut=null,Ae=null,$e=null}}}let s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,v=null,y=null,_=null,R=null,w=null,T=new Bt(0,0,0),C=0,E=!1,b=null,D=null,q=null,V=null,X=null,I=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,K=0,G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=K>=2);let it=null,ut={},bt=e.getParameter(e.SCISSOR_BOX),Ft=e.getParameter(e.VIEWPORT),se=new Ue().fromArray(bt),Y=new Ue().fromArray(Ft);function et(U,at,k,J){let ct=new Uint8Array(4),ot=e.createTexture();e.bindTexture(U,ot),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ut=0;Ut<k;Ut++)U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY?e.texImage3D(at,0,e.RGBA,1,1,J,0,e.RGBA,e.UNSIGNED_BYTE,ct):e.texImage2D(at+Ut,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ct);return ot}let yt={};yt[e.TEXTURE_2D]=et(e.TEXTURE_2D,e.TEXTURE_2D,1),yt[e.TEXTURE_CUBE_MAP]=et(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[e.TEXTURE_2D_ARRAY]=et(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),yt[e.TEXTURE_3D]=et(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),st(e.DEPTH_TEST),r.setFunc(jr),kt(!1),qt(Q_),st(e.CULL_FACE),O(Ya);function st(U){u[U]!==!0&&(e.enable(U),u[U]=!0)}function At(U){u[U]!==!1&&(e.disable(U),u[U]=!1)}function Ct(U,at){return d[U]!==at?(e.bindFramebuffer(U,at),d[U]=at,U===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=at),U===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=at),!0):!1}function Ht(U,at){let k=p,J=!1;if(U){k=f.get(at),k===void 0&&(k=[],f.set(at,k));let ct=U.textures;if(k.length!==ct.length||k[0]!==e.COLOR_ATTACHMENT0){for(let ot=0,Ut=ct.length;ot<Ut;ot++)k[ot]=e.COLOR_ATTACHMENT0+ot;k.length=ct.length,J=!0}}else k[0]!==e.BACK&&(k[0]=e.BACK,J=!0);J&&e.drawBuffers(k)}function be(U){return g!==U?(e.useProgram(U),g=U,!0):!1}let Zt={[Us]:e.FUNC_ADD,[eE]:e.FUNC_SUBTRACT,[nE]:e.FUNC_REVERSE_SUBTRACT};Zt[iE]=e.MIN,Zt[aE]=e.MAX;let Ce={[sE]:e.ZERO,[rE]:e.ONE,[oE]:e.SRC_COLOR,[wp]:e.SRC_ALPHA,[dE]:e.SRC_ALPHA_SATURATE,[hE]:e.DST_COLOR,[cE]:e.DST_ALPHA,[lE]:e.ONE_MINUS_SRC_COLOR,[Rp]:e.ONE_MINUS_SRC_ALPHA,[fE]:e.ONE_MINUS_DST_COLOR,[uE]:e.ONE_MINUS_DST_ALPHA,[pE]:e.CONSTANT_COLOR,[mE]:e.ONE_MINUS_CONSTANT_COLOR,[gE]:e.CONSTANT_ALPHA,[vE]:e.ONE_MINUS_CONSTANT_ALPHA};function O(U,at,k,J,ct,ot,Ut,Ae,$e,ee){if(U===Ya){x===!0&&(At(e.BLEND),x=!1);return}if(x===!1&&(st(e.BLEND),x=!0),U!==tE){if(U!==m||ee!==E){if((h!==Us||_!==Us)&&(e.blendEquation(e.FUNC_ADD),h=Us,_=Us),ee)switch(U){case Xr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Bu:e.blendFunc(e.ONE,e.ONE);break;case K_:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case $_:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Xr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Bu:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case K_:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case $_:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,y=null,R=null,w=null,T.set(0,0,0),C=0,m=U,E=ee}return}ct=ct||at,ot=ot||k,Ut=Ut||J,(at!==h||ct!==_)&&(e.blendEquationSeparate(Zt[at],Zt[ct]),h=at,_=ct),(k!==v||J!==y||ot!==R||Ut!==w)&&(e.blendFuncSeparate(Ce[k],Ce[J],Ce[ot],Ce[Ut]),v=k,y=J,R=ot,w=Ut),(Ae.equals(T)===!1||$e!==C)&&(e.blendColor(Ae.r,Ae.g,Ae.b,$e),T.copy(Ae),C=$e),m=U,E=!1}function Nn(U,at){U.side===ia?At(e.CULL_FACE):st(e.CULL_FACE);let k=U.side===ln;at&&(k=!k),kt(k),U.blending===Xr&&U.transparent===!1?O(Ya):O(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),s.setMask(U.colorWrite);let J=U.stencilWrite;o.setTest(J),J&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),de(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?st(e.SAMPLE_ALPHA_TO_COVERAGE):At(e.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){b!==U&&(U?e.frontFace(e.CW):e.frontFace(e.CCW),b=U)}function qt(U){U!==Q1?(st(e.CULL_FACE),U!==D&&(U===Q_?e.cullFace(e.BACK):U===K1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):At(e.CULL_FACE),D=U}function St(U){U!==q&&(F&&e.lineWidth(U),q=U)}function de(U,at,k){U?(st(e.POLYGON_OFFSET_FILL),(V!==at||X!==k)&&(e.polygonOffset(at,k),V=at,X=k)):At(e.POLYGON_OFFSET_FILL)}function Mt(U){U?st(e.SCISSOR_TEST):At(e.SCISSOR_TEST)}function A(U){U===void 0&&(U=e.TEXTURE0+I-1),it!==U&&(e.activeTexture(U),it=U)}function M(U,at,k){k===void 0&&(it===null?k=e.TEXTURE0+I-1:k=it);let J=ut[k];J===void 0&&(J={type:void 0,texture:void 0},ut[k]=J),(J.type!==U||J.texture!==at)&&(it!==k&&(e.activeTexture(k),it=k),e.bindTexture(U,at||yt[U]),J.type=U,J.texture=at)}function z(){let U=ut[it];U!==void 0&&U.type!==void 0&&(e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{e.compressedTexImage2D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{e.compressedTexImage3D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{e.texSubImage2D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{e.texSubImage3D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function rt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function jt(){try{e.texStorage2D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{e.texStorage3D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{e.texImage2D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{e.texImage3D.apply(e,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(U){se.equals(U)===!1&&(e.scissor(U.x,U.y,U.z,U.w),se.copy(U))}function dt(U){Y.equals(U)===!1&&(e.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function Xt(U,at){let k=c.get(at);k===void 0&&(k=new WeakMap,c.set(at,k));let J=k.get(U);J===void 0&&(J=e.getUniformBlockIndex(at,U.name),k.set(U,J))}function Pt(U,at){let J=c.get(at).get(U);l.get(at)!==J&&(e.uniformBlockBinding(at,J,U.__bindingPointIndex),l.set(at,J))}function ce(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},it=null,ut={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,v=null,y=null,_=null,R=null,w=null,T=new Bt(0,0,0),C=0,E=!1,b=null,D=null,q=null,V=null,X=null,se.set(0,0,e.canvas.width,e.canvas.height),Y.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:st,disable:At,bindFramebuffer:Ct,drawBuffers:Ht,useProgram:be,setBlending:O,setMaterial:Nn,setFlipSided:kt,setCullFace:qt,setLineWidth:St,setPolygonOffset:de,setScissorTest:Mt,activeTexture:A,bindTexture:M,unbindTexture:z,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:ft,texImage3D:Et,updateUBOMapping:Xt,uniformBlockBinding:Pt,texStorage2D:jt,texStorage3D:$,texSubImage2D:W,texSubImage3D:_t,compressedTexSubImage2D:rt,compressedTexSubImage3D:ht,scissor:Tt,viewport:dt,reset:ce}}function jx(e,t,n,i){let a=RR(i);switch(n){case ab:return e*t;case rb:return e*t;case ob:return e*t*2;case lb:return e*t/a.components*a.byteLength;case $m:return e*t/a.components*a.byteLength;case cb:return e*t*2/a.components*a.byteLength;case tg:return e*t*2/a.components*a.byteLength;case sb:return e*t*3/a.components*a.byteLength;case ci:return e*t*4/a.components*a.byteLength;case eg:return e*t*4/a.components*a.byteLength;case Nu:case Pu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ou:case Iu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Vp:case kp:return Math.max(e,16)*Math.max(t,8)/4;case Hp:case Gp:return Math.max(e,8)*Math.max(t,8)/2;case qp:case Xp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Wp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Yp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Zp:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case jp:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Jp:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Qp:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Kp:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case $p:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case tm:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case em:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case nm:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case im:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case am:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case sm:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case rm:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case zu:case om:case lm:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ub:case cm:return Math.ceil(e/4)*Math.ceil(t/4)*8;case um:case hm:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function RR(e){switch(e){case oa:case eb:return{byteLength:1,components:1};case Tl:case nb:case Dl:return{byteLength:2,components:1};case Qm:case Km:return{byteLength:2,components:4};case Is:case Jm:case aa:return{byteLength:4,components:1};case ib:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function CR(e,t,n,i,a,s,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return p?new OffscreenCanvas(A,M):Vu("canvas")}function x(A,M,z){let j=1,Q=Mt(A);if((Q.width>z||Q.height>z)&&(j=z/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let W=Math.floor(j*Q.width),_t=Math.floor(j*Q.height);d===void 0&&(d=g(W,_t));let rt=M?g(W,_t):d;return rt.width=W,rt.height=_t,rt.getContext("2d").drawImage(A,0,0,W,_t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+W+"x"+_t+")."),rt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function h(A){e.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(A,M,z,j,Q=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let W=M;if(M===e.RED&&(z===e.FLOAT&&(W=e.R32F),z===e.HALF_FLOAT&&(W=e.R16F),z===e.UNSIGNED_BYTE&&(W=e.R8)),M===e.RED_INTEGER&&(z===e.UNSIGNED_BYTE&&(W=e.R8UI),z===e.UNSIGNED_SHORT&&(W=e.R16UI),z===e.UNSIGNED_INT&&(W=e.R32UI),z===e.BYTE&&(W=e.R8I),z===e.SHORT&&(W=e.R16I),z===e.INT&&(W=e.R32I)),M===e.RG&&(z===e.FLOAT&&(W=e.RG32F),z===e.HALF_FLOAT&&(W=e.RG16F),z===e.UNSIGNED_BYTE&&(W=e.RG8)),M===e.RG_INTEGER&&(z===e.UNSIGNED_BYTE&&(W=e.RG8UI),z===e.UNSIGNED_SHORT&&(W=e.RG16UI),z===e.UNSIGNED_INT&&(W=e.RG32UI),z===e.BYTE&&(W=e.RG8I),z===e.SHORT&&(W=e.RG16I),z===e.INT&&(W=e.RG32I)),M===e.RGB_INTEGER&&(z===e.UNSIGNED_BYTE&&(W=e.RGB8UI),z===e.UNSIGNED_SHORT&&(W=e.RGB16UI),z===e.UNSIGNED_INT&&(W=e.RGB32UI),z===e.BYTE&&(W=e.RGB8I),z===e.SHORT&&(W=e.RGB16I),z===e.INT&&(W=e.RGB32I)),M===e.RGBA_INTEGER&&(z===e.UNSIGNED_BYTE&&(W=e.RGBA8UI),z===e.UNSIGNED_SHORT&&(W=e.RGBA16UI),z===e.UNSIGNED_INT&&(W=e.RGBA32UI),z===e.BYTE&&(W=e.RGBA8I),z===e.SHORT&&(W=e.RGBA16I),z===e.INT&&(W=e.RGBA32I)),M===e.RGB&&z===e.UNSIGNED_INT_5_9_9_9_REV&&(W=e.RGB9_E5),M===e.RGBA){let _t=Q?ch:Jt.getTransfer(j);z===e.FLOAT&&(W=e.RGBA32F),z===e.HALF_FLOAT&&(W=e.RGBA16F),z===e.UNSIGNED_BYTE&&(W=_t===ae?e.SRGB8_ALPHA8:e.RGBA8),z===e.UNSIGNED_SHORT_4_4_4_4&&(W=e.RGBA4),z===e.UNSIGNED_SHORT_5_5_5_1&&(W=e.RGB5_A1)}return(W===e.R16F||W===e.R32F||W===e.RG16F||W===e.RG32F||W===e.RGBA16F||W===e.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function _(A,M){let z;return A?M===null||M===Is||M===Kr?z=e.DEPTH24_STENCIL8:M===aa?z=e.DEPTH32F_STENCIL8:M===Tl&&(z=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Is||M===Kr?z=e.DEPTH_COMPONENT24:M===aa?z=e.DEPTH_COMPONENT32F:M===Tl&&(z=e.DEPTH_COMPONENT16),z}function R(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==ui&&A.minFilter!==Ri?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){let M=A.target;M.removeEventListener("dispose",w),C(M),M.isVideoTexture&&u.delete(M)}function T(A){let M=A.target;M.removeEventListener("dispose",T),b(M)}function C(A){let M=i.get(A);if(M.__webglInit===void 0)return;let z=A.source,j=f.get(z);if(j){let Q=j[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(A),Object.keys(j).length===0&&f.delete(z)}i.remove(A)}function E(A){let M=i.get(A);e.deleteTexture(M.__webglTexture);let z=A.source,j=f.get(z);delete j[M.__cacheKey],r.memory.textures--}function b(A){let M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Q=0;Q<M.__webglFramebuffer[j].length;Q++)e.deleteFramebuffer(M.__webglFramebuffer[j][Q]);else e.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)e.deleteFramebuffer(M.__webglFramebuffer[j]);else e.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&e.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&e.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&e.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let z=A.textures;for(let j=0,Q=z.length;j<Q;j++){let W=i.get(z[j]);W.__webglTexture&&(e.deleteTexture(W.__webglTexture),r.memory.textures--),i.remove(z[j])}i.remove(A)}let D=0;function q(){D=0}function V(){let A=D;return A>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),D+=1,A}function X(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function I(A,M){let z=i.get(A);if(A.isVideoTexture&&St(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){let j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,A,M);return}}n.bindTexture(e.TEXTURE_2D,z.__webglTexture,e.TEXTURE0+M)}function F(A,M){let z=i.get(A);if(A.version>0&&z.__version!==A.version){Y(z,A,M);return}n.bindTexture(e.TEXTURE_2D_ARRAY,z.__webglTexture,e.TEXTURE0+M)}function K(A,M){let z=i.get(A);if(A.version>0&&z.__version!==A.version){Y(z,A,M);return}n.bindTexture(e.TEXTURE_3D,z.__webglTexture,e.TEXTURE0+M)}function G(A,M){let z=i.get(A);if(A.version>0&&z.__version!==A.version){et(z,A,M);return}n.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture,e.TEXTURE0+M)}let it={[Bp]:e.REPEAT,[Ps]:e.CLAMP_TO_EDGE,[Fp]:e.MIRRORED_REPEAT},ut={[ui]:e.NEAREST,[wE]:e.NEAREST_MIPMAP_NEAREST,[uu]:e.NEAREST_MIPMAP_LINEAR,[Ri]:e.LINEAR,[Zd]:e.LINEAR_MIPMAP_NEAREST,[Os]:e.LINEAR_MIPMAP_LINEAR},bt={[LE]:e.NEVER,[BE]:e.ALWAYS,[NE]:e.LESS,[hb]:e.LEQUAL,[PE]:e.EQUAL,[zE]:e.GEQUAL,[OE]:e.GREATER,[IE]:e.NOTEQUAL};function Ft(A,M){if(M.type===aa&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ri||M.magFilter===Zd||M.magFilter===uu||M.magFilter===Os||M.minFilter===Ri||M.minFilter===Zd||M.minFilter===uu||M.minFilter===Os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,it[M.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,it[M.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,it[M.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,ut[M.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,ut[M.minFilter]),M.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,bt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ui||M.minFilter!==uu&&M.minFilter!==Os||M.type===aa&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function se(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));let j=M.source,Q=f.get(j);Q===void 0&&(Q={},f.set(j,Q));let W=X(M);if(W!==A.__cacheKey){Q[W]===void 0&&(Q[W]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,z=!0),Q[W].usedTimes++;let _t=Q[A.__cacheKey];_t!==void 0&&(Q[A.__cacheKey].usedTimes--,_t.usedTimes===0&&E(M)),A.__cacheKey=W,A.__webglTexture=Q[W].texture}return z}function Y(A,M,z){let j=e.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=e.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=e.TEXTURE_3D);let Q=se(A,M),W=M.source;n.bindTexture(j,A.__webglTexture,e.TEXTURE0+z);let _t=i.get(W);if(W.version!==_t.__version||Q===!0){n.activeTexture(e.TEXTURE0+z);let rt=Jt.getPrimaries(Jt.workingColorSpace),ht=M.colorSpace===Xa?null:Jt.getPrimaries(M.colorSpace),jt=M.colorSpace===Xa||rt===ht?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let $=x(M.image,!1,a.maxTextureSize);$=de(M,$);let ft=s.convert(M.format,M.colorSpace),Et=s.convert(M.type),Tt=y(M.internalFormat,ft,Et,M.colorSpace,M.isVideoTexture);Ft(j,M);let dt,Xt=M.mipmaps,Pt=M.isVideoTexture!==!0,ce=_t.__version===void 0||Q===!0,U=W.dataReady,at=R(M,$);if(M.isDepthTexture)Tt=_(M.format===$r,M.type),ce&&(Pt?n.texStorage2D(e.TEXTURE_2D,1,Tt,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,Tt,$.width,$.height,0,ft,Et,null));else if(M.isDataTexture)if(Xt.length>0){Pt&&ce&&n.texStorage2D(e.TEXTURE_2D,at,Tt,Xt[0].width,Xt[0].height);for(let k=0,J=Xt.length;k<J;k++)dt=Xt[k],Pt?U&&n.texSubImage2D(e.TEXTURE_2D,k,0,0,dt.width,dt.height,ft,Et,dt.data):n.texImage2D(e.TEXTURE_2D,k,Tt,dt.width,dt.height,0,ft,Et,dt.data);M.generateMipmaps=!1}else Pt?(ce&&n.texStorage2D(e.TEXTURE_2D,at,Tt,$.width,$.height),U&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,$.width,$.height,ft,Et,$.data)):n.texImage2D(e.TEXTURE_2D,0,Tt,$.width,$.height,0,ft,Et,$.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Pt&&ce&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,Tt,Xt[0].width,Xt[0].height,$.depth);for(let k=0,J=Xt.length;k<J;k++)if(dt=Xt[k],M.format!==ci)if(ft!==null)if(Pt){if(U)if(M.layerUpdates.size>0){let ct=jx(dt.width,dt.height,M.format,M.type);for(let ot of M.layerUpdates){let Ut=dt.data.subarray(ot*ct/dt.data.BYTES_PER_ELEMENT,(ot+1)*ct/dt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,k,0,0,ot,dt.width,dt.height,1,ft,Ut)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,k,0,0,0,dt.width,dt.height,$.depth,ft,dt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,k,Tt,dt.width,dt.height,$.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pt?U&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,k,0,0,0,dt.width,dt.height,$.depth,ft,Et,dt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,k,Tt,dt.width,dt.height,$.depth,0,ft,Et,dt.data)}else{Pt&&ce&&n.texStorage2D(e.TEXTURE_2D,at,Tt,Xt[0].width,Xt[0].height);for(let k=0,J=Xt.length;k<J;k++)dt=Xt[k],M.format!==ci?ft!==null?Pt?U&&n.compressedTexSubImage2D(e.TEXTURE_2D,k,0,0,dt.width,dt.height,ft,dt.data):n.compressedTexImage2D(e.TEXTURE_2D,k,Tt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pt?U&&n.texSubImage2D(e.TEXTURE_2D,k,0,0,dt.width,dt.height,ft,Et,dt.data):n.texImage2D(e.TEXTURE_2D,k,Tt,dt.width,dt.height,0,ft,Et,dt.data)}else if(M.isDataArrayTexture)if(Pt){if(ce&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,Tt,$.width,$.height,$.depth),U)if(M.layerUpdates.size>0){let k=jx($.width,$.height,M.format,M.type);for(let J of M.layerUpdates){let ct=$.data.subarray(J*k/$.data.BYTES_PER_ELEMENT,(J+1)*k/$.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,J,$.width,$.height,1,ft,Et,ct)}M.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ft,Et,$.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Tt,$.width,$.height,$.depth,0,ft,Et,$.data);else if(M.isData3DTexture)Pt?(ce&&n.texStorage3D(e.TEXTURE_3D,at,Tt,$.width,$.height,$.depth),U&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ft,Et,$.data)):n.texImage3D(e.TEXTURE_3D,0,Tt,$.width,$.height,$.depth,0,ft,Et,$.data);else if(M.isFramebufferTexture){if(ce)if(Pt)n.texStorage2D(e.TEXTURE_2D,at,Tt,$.width,$.height);else{let k=$.width,J=$.height;for(let ct=0;ct<at;ct++)n.texImage2D(e.TEXTURE_2D,ct,Tt,k,J,0,ft,Et,null),k>>=1,J>>=1}}else if(Xt.length>0){if(Pt&&ce){let k=Mt(Xt[0]);n.texStorage2D(e.TEXTURE_2D,at,Tt,k.width,k.height)}for(let k=0,J=Xt.length;k<J;k++)dt=Xt[k],Pt?U&&n.texSubImage2D(e.TEXTURE_2D,k,0,0,ft,Et,dt):n.texImage2D(e.TEXTURE_2D,k,Tt,ft,Et,dt);M.generateMipmaps=!1}else if(Pt){if(ce){let k=Mt($);n.texStorage2D(e.TEXTURE_2D,at,Tt,k.width,k.height)}U&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ft,Et,$)}else n.texImage2D(e.TEXTURE_2D,0,Tt,ft,Et,$);m(M)&&h(j),_t.__version=W.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function et(A,M,z){if(M.image.length!==6)return;let j=se(A,M),Q=M.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+z);let W=i.get(Q);if(Q.version!==W.__version||j===!0){n.activeTexture(e.TEXTURE0+z);let _t=Jt.getPrimaries(Jt.workingColorSpace),rt=M.colorSpace===Xa?null:Jt.getPrimaries(M.colorSpace),ht=M.colorSpace===Xa||_t===rt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let jt=M.isCompressedTexture||M.image[0].isCompressedTexture,$=M.image[0]&&M.image[0].isDataTexture,ft=[];for(let J=0;J<6;J++)!jt&&!$?ft[J]=x(M.image[J],!0,a.maxCubemapSize):ft[J]=$?M.image[J].image:M.image[J],ft[J]=de(M,ft[J]);let Et=ft[0],Tt=s.convert(M.format,M.colorSpace),dt=s.convert(M.type),Xt=y(M.internalFormat,Tt,dt,M.colorSpace),Pt=M.isVideoTexture!==!0,ce=W.__version===void 0||j===!0,U=Q.dataReady,at=R(M,Et);Ft(e.TEXTURE_CUBE_MAP,M);let k;if(jt){Pt&&ce&&n.texStorage2D(e.TEXTURE_CUBE_MAP,at,Xt,Et.width,Et.height);for(let J=0;J<6;J++){k=ft[J].mipmaps;for(let ct=0;ct<k.length;ct++){let ot=k[ct];M.format!==ci?Tt!==null?Pt?U&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,0,0,ot.width,ot.height,Tt,ot.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,Xt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pt?U&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,0,0,ot.width,ot.height,Tt,dt,ot.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,Xt,ot.width,ot.height,0,Tt,dt,ot.data)}}}else{if(k=M.mipmaps,Pt&&ce){k.length>0&&at++;let J=Mt(ft[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,at,Xt,J.width,J.height)}for(let J=0;J<6;J++)if($){Pt?U&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ft[J].width,ft[J].height,Tt,dt,ft[J].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,ft[J].width,ft[J].height,0,Tt,dt,ft[J].data);for(let ct=0;ct<k.length;ct++){let Ut=k[ct].image[J].image;Pt?U&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,0,0,Ut.width,Ut.height,Tt,dt,Ut.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,Xt,Ut.width,Ut.height,0,Tt,dt,Ut.data)}}else{Pt?U&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Tt,dt,ft[J]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,Tt,dt,ft[J]);for(let ct=0;ct<k.length;ct++){let ot=k[ct];Pt?U&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,0,0,Tt,dt,ot.image[J]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,Xt,Tt,dt,ot.image[J])}}}m(M)&&h(e.TEXTURE_CUBE_MAP),W.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function yt(A,M,z,j,Q,W){let _t=s.convert(z.format,z.colorSpace),rt=s.convert(z.type),ht=y(z.internalFormat,_t,rt,z.colorSpace),jt=i.get(M),$=i.get(z);if($.__renderTarget=M,!jt.__hasExternalTextures){let ft=Math.max(1,M.width>>W),Et=Math.max(1,M.height>>W);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?n.texImage3D(Q,W,ht,ft,Et,M.depth,0,_t,rt,null):n.texImage2D(Q,W,ht,ft,Et,0,_t,rt,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),qt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,Q,$.__webglTexture,0,kt(M)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,j,Q,$.__webglTexture,W),n.bindFramebuffer(e.FRAMEBUFFER,null)}function st(A,M,z){if(e.bindRenderbuffer(e.RENDERBUFFER,A),M.depthBuffer){let j=M.depthTexture,Q=j&&j.isDepthTexture?j.type:null,W=_(M.stencilBuffer,Q),_t=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,rt=kt(M);qt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,rt,W,M.width,M.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,rt,W,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,W,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_t,e.RENDERBUFFER,A)}else{let j=M.textures;for(let Q=0;Q<j.length;Q++){let W=j[Q],_t=s.convert(W.format,W.colorSpace),rt=s.convert(W.type),ht=y(W.internalFormat,_t,rt,W.colorSpace),jt=kt(M);z&&qt(M)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,jt,ht,M.width,M.height):qt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,jt,ht,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,ht,M.width,M.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function At(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=i.get(M.depthTexture);j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),I(M.depthTexture,0);let Q=j.__webglTexture,W=kt(M);if(M.depthTexture.format===Wr)qt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0,W):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0);else if(M.depthTexture.format===$r)qt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0,W):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ct(A){let M=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let j=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){let Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=j}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");At(M.__webglFramebuffer,A)}else if(z){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=e.createRenderbuffer(),st(M.__webglDepthbuffer[j],A,!1);else{let Q=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,W=M.__webglDepthbuffer[j];e.bindRenderbuffer(e.RENDERBUFFER,W),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,W)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=e.createRenderbuffer(),st(M.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,Q)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ht(A,M,z){let j=i.get(A);M!==void 0&&yt(j.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),z!==void 0&&Ct(A)}function be(A){let M=A.texture,z=i.get(A),j=i.get(M);A.addEventListener("dispose",T);let Q=A.textures,W=A.isWebGLCubeRenderTarget===!0,_t=Q.length>1;if(_t||(j.__webglTexture===void 0&&(j.__webglTexture=e.createTexture()),j.__version=M.version,r.memory.textures++),W){z.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[rt]=[];for(let ht=0;ht<M.mipmaps.length;ht++)z.__webglFramebuffer[rt][ht]=e.createFramebuffer()}else z.__webglFramebuffer[rt]=e.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let rt=0;rt<M.mipmaps.length;rt++)z.__webglFramebuffer[rt]=e.createFramebuffer()}else z.__webglFramebuffer=e.createFramebuffer();if(_t)for(let rt=0,ht=Q.length;rt<ht;rt++){let jt=i.get(Q[rt]);jt.__webglTexture===void 0&&(jt.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&qt(A)===!1){z.__webglMultisampledFramebuffer=e.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){let ht=Q[rt];z.__webglColorRenderbuffer[rt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,z.__webglColorRenderbuffer[rt]);let jt=s.convert(ht.format,ht.colorSpace),$=s.convert(ht.type),ft=y(ht.internalFormat,jt,$,ht.colorSpace,A.isXRRenderTarget===!0),Et=kt(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Et,ft,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+rt,e.RENDERBUFFER,z.__webglColorRenderbuffer[rt])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=e.createRenderbuffer(),st(z.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(W){n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),Ft(e.TEXTURE_CUBE_MAP,M);for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)yt(z.__webglFramebuffer[rt][ht],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ht);else yt(z.__webglFramebuffer[rt],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(M)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_t){for(let rt=0,ht=Q.length;rt<ht;rt++){let jt=Q[rt],$=i.get(jt);n.bindTexture(e.TEXTURE_2D,$.__webglTexture),Ft(e.TEXTURE_2D,jt),yt(z.__webglFramebuffer,A,jt,e.COLOR_ATTACHMENT0+rt,e.TEXTURE_2D,0),m(jt)&&h(e.TEXTURE_2D)}n.unbindTexture()}else{let rt=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(rt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(rt,j.__webglTexture),Ft(rt,M),M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)yt(z.__webglFramebuffer[ht],A,M,e.COLOR_ATTACHMENT0,rt,ht);else yt(z.__webglFramebuffer,A,M,e.COLOR_ATTACHMENT0,rt,0);m(M)&&h(rt),n.unbindTexture()}A.depthBuffer&&Ct(A)}function Zt(A){let M=A.textures;for(let z=0,j=M.length;z<j;z++){let Q=M[z];if(m(Q)){let W=v(A),_t=i.get(Q).__webglTexture;n.bindTexture(W,_t),h(W),n.unbindTexture()}}}let Ce=[],O=[];function Nn(A){if(A.samples>0){if(qt(A)===!1){let M=A.textures,z=A.width,j=A.height,Q=e.COLOR_BUFFER_BIT,W=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_t=i.get(A),rt=M.length>1;if(rt)for(let ht=0;ht<M.length;ht++)n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let ht=0;ht<M.length;ht++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),rt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_t.__webglColorRenderbuffer[ht]);let jt=i.get(M[ht]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,jt,0)}e.blitFramebuffer(0,0,z,j,0,0,z,j,Q,e.NEAREST),l===!0&&(Ce.length=0,O.length=0,Ce.push(e.COLOR_ATTACHMENT0+ht),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ce.push(W),O.push(W),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,O)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),rt)for(let ht=0;ht<M.length;ht++){n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,_t.__webglColorRenderbuffer[ht]);let jt=i.get(M[ht]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,jt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let M=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[M])}}}function kt(A){return Math.min(a.maxSamples,A.samples)}function qt(A){let M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function St(A){let M=r.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function de(A,M){let z=A.colorSpace,j=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==io&&z!==Xa&&(Jt.getTransfer(z)===ae?(j!==ci||Q!==oa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}function Mt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=q,this.setTexture2D=I,this.setTexture2DArray=F,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=Ht,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=Nn,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=qt}function DR(e,t){function n(i,a=Xa){let s,r=Jt.getTransfer(a);if(i===oa)return e.UNSIGNED_BYTE;if(i===Qm)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Km)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ib)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===eb)return e.BYTE;if(i===nb)return e.SHORT;if(i===Tl)return e.UNSIGNED_SHORT;if(i===Jm)return e.INT;if(i===Is)return e.UNSIGNED_INT;if(i===aa)return e.FLOAT;if(i===Dl)return e.HALF_FLOAT;if(i===ab)return e.ALPHA;if(i===sb)return e.RGB;if(i===ci)return e.RGBA;if(i===rb)return e.LUMINANCE;if(i===ob)return e.LUMINANCE_ALPHA;if(i===Wr)return e.DEPTH_COMPONENT;if(i===$r)return e.DEPTH_STENCIL;if(i===lb)return e.RED;if(i===$m)return e.RED_INTEGER;if(i===cb)return e.RG;if(i===tg)return e.RG_INTEGER;if(i===eg)return e.RGBA_INTEGER;if(i===Nu||i===Pu||i===Ou||i===Iu)if(r===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Nu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ou)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Iu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Nu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ou)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Iu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Hp||i===Vp||i===Gp||i===kp)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Hp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Vp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===kp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qp||i===Xp||i===Wp)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qp||i===Xp)return r===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Wp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yp||i===Zp||i===jp||i===Jp||i===Qp||i===Kp||i===$p||i===tm||i===em||i===nm||i===im||i===am||i===sm||i===rm)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Yp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===jp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Kp)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$p)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tm)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===em)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nm)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===im)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===am)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===sm)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===rm)return r===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zu||i===om||i===lm)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===zu)return r===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===om)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lm)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ub||i===cm||i===um||i===hm)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===zu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cm)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===um)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===hm)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kr?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}function OR(e,t){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,pb(e)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function a(m,h,v,y,_){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,_)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),x(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,v,y):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===ln&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===ln&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);let v=t.get(h),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,Cs.copy(_),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),m.envMapRotation.value.setFromMatrix4(PR.makeRotationFromEuler(Cs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,y){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=y*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ln&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){let v=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function IR(e,t,n,i){let a={},s={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){let _=y.program;i.uniformBlockBinding(v,_)}function c(v,y){let _=a[v.id];_===void 0&&(g(v),_=u(v),a[v.id]=_,v.addEventListener("dispose",m));let R=y.program;i.updateUBOMapping(v,R);let w=t.render.frame;s[v.id]!==w&&(f(v),s[v.id]=w)}function u(v){let y=d();v.__bindingPointIndex=y;let _=e.createBuffer(),R=v.__size,w=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,_),e.bufferData(e.UNIFORM_BUFFER,R,w),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,y,_),_}function d(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let y=a[v.id],_=v.uniforms,R=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,y);for(let w=0,T=_.length;w<T;w++){let C=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,b=C.length;E<b;E++){let D=C[E];if(p(D,w,E,R)===!0){let q=D.__offset,V=Array.isArray(D.value)?D.value:[D.value],X=0;for(let I=0;I<V.length;I++){let F=V[I],K=x(F);typeof F=="number"||typeof F=="boolean"?(D.__data[0]=F,e.bufferSubData(e.UNIFORM_BUFFER,q+X,D.__data)):F.isMatrix3?(D.__data[0]=F.elements[0],D.__data[1]=F.elements[1],D.__data[2]=F.elements[2],D.__data[3]=0,D.__data[4]=F.elements[3],D.__data[5]=F.elements[4],D.__data[6]=F.elements[5],D.__data[7]=0,D.__data[8]=F.elements[6],D.__data[9]=F.elements[7],D.__data[10]=F.elements[8],D.__data[11]=0):(F.toArray(D.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,q,D.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(v,y,_,R){let w=v.value,T=y+"_"+_;if(R[T]===void 0)return typeof w=="number"||typeof w=="boolean"?R[T]=w:R[T]=w.clone(),!0;{let C=R[T];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return R[T]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(v){let y=v.uniforms,_=0,R=16;for(let T=0,C=y.length;T<C;T++){let E=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,D=E.length;b<D;b++){let q=E[b],V=Array.isArray(q.value)?q.value:[q.value];for(let X=0,I=V.length;X<I;X++){let F=V[X],K=x(F),G=_%R,it=G%K.boundary,ut=G+it;_+=it,ut!==0&&R-ut<K.storage&&(_+=R-ut),q.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=_,_+=K.storage}}}let w=_%R;return w>0&&(_+=R-w),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let _=r.indexOf(y.__bindingPointIndex);r.splice(_,1),e.deleteBuffer(a[y.id]),delete a[y.id],delete s[y.id]}function h(){for(let v in a)e.deleteBuffer(a[v]);r=[],a={},s={}}return{bind:l,update:c,dispose:h}}function ig(){let e=0,t=0,n=0,i=0;function a(s,r,o,l){e=s,t=o,n=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,p=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,p*=u,a(r,o,f,p)},calc:function(s){let r=s*s,o=r*s;return e+t*s+n*r+i*o}}}function Jx(e,t,n,i,a){let s=(i-t)*.5,r=(a-n)*.5,o=e*e,l=e*o;return(2*n-2*i+s+r)*l+(-3*n+3*i-2*s-r)*o+s*e+n}function zR(e,t){let n=1-e;return n*n*t}function BR(e,t){return 2*(1-e)*e*t}function FR(e,t){return e*e*t}function El(e,t,n,i){return zR(e,t)+BR(e,n)+FR(e,i)}function HR(e,t){let n=1-e;return n*n*n*t}function VR(e,t){let n=1-e;return 3*n*n*e*t}function GR(e,t){return 3*(1-e)*e*e*t}function kR(e,t){return e*e*e*t}function Al(e,t,n,i,a){return HR(e,t)+VR(e,n)+GR(e,i)+kR(e,a)}function Lu(e,t,n){return!e||!n&&e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function XR(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qx(){return performance.now()}var jm,Q1,Q_,K1,Kx,$1,ea,ja,ln,ia,Ya,Xr,Bu,K_,$_,tE,Us,eE,nE,iE,aE,sE,rE,oE,lE,wp,Rp,cE,uE,hE,fE,dE,pE,mE,gE,vE,Cp,Dp,Up,jr,Lp,Np,Pp,Op,$x,yE,_E,Za,xE,bE,ME,SE,EE,AE,TE,tb,Jr,Qr,Ip,zp,lh,Bp,Ps,Fp,ui,wE,uu,Ri,Zd,Os,oa,eb,nb,Tl,Jm,Is,aa,Dl,Qm,Km,Kr,ib,ab,sb,ci,rb,ob,Wr,$r,lb,$m,cb,tg,eg,Nu,Pu,Ou,Iu,Hp,Vp,Gp,kp,qp,Xp,Wp,Yp,Zp,jp,Jp,Qp,Kp,$p,tm,em,nm,im,am,sm,rm,zu,om,lm,ub,cm,um,hm,Fu,fm,jd,tx,ex,nx,RE,CE,DE,UE,Xa,jn,io,ch,ae,Dr,ix,LE,NE,PE,hb,OE,IE,zE,BE,ax,sx,sa,Hu,Ja,sn,Jd,dm,wt,Nt,Kd,rx,Jt,ox,lx,cx,ux,hx,Ur,pm,qE,Gu,XE,Jn,Ue,mm,la,ku,gm,hi,P,tp,fx,zs,Ji,ri,hu,Lr,Nr,Pr,Fa,Ha,Es,vl,fu,du,As,WE,yl,np,wl,Qi,ip,pu,Va,ap,mu,sp,vm,ze,Or,oi,YE,ZE,Ga,gu,Un,dx,px,ca,qu,jE,mx,Ir,Ki,vu,_l,JE,QE,gx,vx,yx,_x,KE,zr,rp,fi,li,$i,op,ta,Br,Fr,xx,lp,cp,up,hp,fp,dp,Ls,db,ka,yu,Bt,rn,$E,to,Xu,Ie,_u,Ke,Wu,Yu,cn,tA,Zn,mp,Hr,Ln,xl,Ye,Qn,bx,Ts,xu,Mx,bu,Mu,Su,gp,Eu,Sx,Au,Qe,Rl,iA,aA,sA,vn,Zu,qa,Ex,Ax,gn,Vr,Gr,ym,ju,_m,vp,rA,oA,na,ws,wu,Ju,Qu,cA,uA,hA,fA,dA,pA,mA,gA,vA,yA,_A,xA,bA,MA,SA,EA,AA,TA,wA,RA,CA,DA,UA,LA,NA,PA,OA,IA,zA,BA,FA,HA,VA,GA,kA,qA,XA,WA,YA,ZA,jA,JA,QA,KA,$A,tT,eT,nT,iT,aT,sT,rT,oT,lT,cT,uT,hT,fT,dT,pT,mT,gT,vT,yT,_T,xT,bT,MT,ST,ET,AT,TT,wT,RT,CT,DT,UT,LT,NT,PT,OT,IT,zT,BT,FT,HT,VT,GT,kT,qT,XT,WT,YT,ZT,jT,JT,QT,KT,$T,tw,ew,nw,iw,aw,sw,rw,ow,lw,cw,uw,hw,fw,dw,pw,mw,gw,vw,yw,_w,xw,bw,Mw,Sw,Ew,Aw,Tw,ww,Rw,Cw,Dw,Uw,Lw,Nw,Pw,Ow,Iw,zw,Bw,Fw,Hw,Vw,It,nt,wi,Ru,Rs,Gw,xm,qr,Tx,Ns,yp,wx,_p,xp,bp,Mp,Ds,kr,Rx,Ku,$u,gb,Lx,vb,yb,_b,Nx,Px,Ox,Ix,zx,bm,Mm,Sm,Sp,Zr,X2,W2,Hx,Du,eR,nR,aR,fR,Am,Tm,_R,wm,Rm,SR,ER,TR,Cm,Wa,UR,Sl,LR,NR,Dm,Um,Cs,PR,th,eh,ua,di,nh,Lm,Uu,Ep,Ap,Tp,Cl,Nm,Pm,Om,Im,zm,ih,Bm,qR,pi,ah,no,Fm,Hm,Vm,mi,Bs,Gm,km,qm,sh,Fs,Xm,Wm,WR,Ym,rh,oh,ag,YR,sg,ZR,jR,JR,QR,KR,$R,tC,Zm,_e,UC,hh=lo(()=>{jm="170",Q1=0,Q_=1,K1=2,Kx=1,$1=2,ea=3,ja=0,ln=1,ia=2,Ya=0,Xr=1,Bu=2,K_=3,$_=4,tE=5,Us=100,eE=101,nE=102,iE=103,aE=104,sE=200,rE=201,oE=202,lE=203,wp=204,Rp=205,cE=206,uE=207,hE=208,fE=209,dE=210,pE=211,mE=212,gE=213,vE=214,Cp=0,Dp=1,Up=2,jr=3,Lp=4,Np=5,Pp=6,Op=7,$x=0,yE=1,_E=2,Za=0,xE=1,bE=2,ME=3,SE=4,EE=5,AE=6,TE=7,tb=300,Jr=301,Qr=302,Ip=303,zp=304,lh=306,Bp=1e3,Ps=1001,Fp=1002,ui=1003,wE=1004,uu=1005,Ri=1006,Zd=1007,Os=1008,oa=1009,eb=1010,nb=1011,Tl=1012,Jm=1013,Is=1014,aa=1015,Dl=1016,Qm=1017,Km=1018,Kr=1020,ib=35902,ab=1021,sb=1022,ci=1023,rb=1024,ob=1025,Wr=1026,$r=1027,lb=1028,$m=1029,cb=1030,tg=1031,eg=1033,Nu=33776,Pu=33777,Ou=33778,Iu=33779,Hp=35840,Vp=35841,Gp=35842,kp=35843,qp=36196,Xp=37492,Wp=37496,Yp=37808,Zp=37809,jp=37810,Jp=37811,Qp=37812,Kp=37813,$p=37814,tm=37815,em=37816,nm=37817,im=37818,am=37819,sm=37820,rm=37821,zu=36492,om=36494,lm=36495,ub=36283,cm=36284,um=36285,hm=36286,Fu=2300,fm=2301,jd=2302,tx=2400,ex=2401,nx=2402,RE=3200,CE=3201,DE=0,UE=1,Xa="",jn="srgb",io="srgb-linear",ch="linear",ae="srgb",Dr=7680,ix=519,LE=512,NE=513,PE=514,hb=515,OE=516,IE=517,zE=518,BE=519,ax=35044,sx="300 es",sa=2e3,Hu=2001,Ja=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;let a=this._listeners[t];if(a!==void 0){let s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jd=Math.PI/180,dm=180/Math.PI;wt=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(on(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nt=class e{constructor(t,n,i,a,s,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){let u=this.elements;return u[0]=t,u[1]=a,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],x=a[0],m=a[3],h=a[6],v=a[1],y=a[4],_=a[7],R=a[2],w=a[5],T=a[8];return s[0]=r*x+o*v+l*R,s[3]=r*m+o*y+l*w,s[6]=r*h+o*_+l*T,s[1]=c*x+u*v+d*R,s[4]=c*m+u*y+d*w,s[7]=c*h+u*_+d*T,s[2]=f*x+p*v+g*R,s[5]=f*m+p*y+g*w,s[8]=f*h+p*_+g*T,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return n*r*u-n*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*r-o*c,f=o*l-u*s,p=c*s-r*l,g=n*d+i*f+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(a*c-u*i)*x,t[2]=(o*i-a*r)*x,t[3]=f*x,t[4]=(u*n-a*l)*x,t[5]=(a*s-o*n)*x,t[6]=p*x,t[7]=(i*l-c*n)*x,t[8]=(r*n-i*s)*x,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Kd.makeScale(t,n)),this}rotate(t){return this.premultiply(Kd.makeRotation(-t)),this}translate(t,n){return this.premultiply(Kd.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Kd=new Nt;rx={};Jt={enabled:!0,workingColorSpace:io,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===ae&&(e.r=ra(e.r),e.g=ra(e.g),e.b=ra(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ae&&(e.r=Yr(e.r),e.g=Yr(e.g),e.b=Yr(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===Xa?ch:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};ox=[.64,.33,.3,.6,.15,.06],lx=[.2126,.7152,.0722],cx=[.3127,.329],ux=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hx=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[io]:{primaries:ox,whitePoint:cx,transfer:ch,toXYZ:ux,fromXYZ:hx,luminanceCoefficients:lx,workingColorSpaceConfig:{unpackColorSpace:jn},outputColorSpaceConfig:{drawingBufferColorSpace:jn}},[jn]:{primaries:ox,whitePoint:cx,transfer:ae,toXYZ:ux,fromXYZ:hx,luminanceCoefficients:lx,outputColorSpaceConfig:{drawingBufferColorSpace:jn}}});pm=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ur===void 0&&(Ur=Vu("canvas")),Ur.width=t.width,Ur.height=t.height;let i=Ur.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ur}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Vu("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=ra(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ra(n[i]/255)*255):n[i]=ra(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},qE=0,Gu=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=Ul(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push($d(a[r].image)):s.push($d(a[r]))}else s=$d(a);i.url=s}return n||(t.images[this.uuid]=i),i}};XE=0,Jn=class e extends Ja{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ps,a=Ps,s=Ri,r=Os,o=ci,l=oa,c=e.DEFAULT_ANISOTROPY,u=Xa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:XE++}),this.uuid=Ul(),this.name="",this.source=new Gu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==tb)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bp:t.x=t.x-Math.floor(t.x);break;case Ps:t.x=t.x<0?0:1;break;case Fp:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bp:t.y=t.y-Math.floor(t.y);break;case Ps:t.y=t.y<0?0:1;break;case Fp:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=tb;Jn.DEFAULT_ANISOTROPY=1;Ue=class e{constructor(t=0,n=0,i=0,a=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s,l=t.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let y=(c+1)/2,_=(p+1)/2,R=(h+1)/2,w=(u+f)/4,T=(d+x)/4,C=(g+m)/4;return y>_&&y>R?y<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(y),a=w/i,s=T/i):_>R?_<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(_),i=w/a,s=C/a):R<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(R),i=T/s,a=C/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(f-u)/v,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mm=class extends Ja{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Ue(0,0,t,n),this.scissorTest=!1,this.viewport=new Ue(0,0,t,n);let a={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let s=new Jn(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,a=t.textures.length;i<a;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let n=Object.assign({},t.texture.image);return this.texture.source=new Gu(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},la=class extends mm{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},ku=class extends Jn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=ui,this.minFilter=ui,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},gm=class extends Jn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=ui,this.minFilter=ui,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hi=class{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3],f=s[r+0],p=s[r+1],g=s[r+2],x=s[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d;return}if(o===1){t[n+0]=f,t[n+1]=p,t[n+2]=g,t[n+3]=x;return}if(d!==x||l!==f||c!==p||u!==g){let m=1-o,h=l*f+c*p+u*g+d*x,v=h>=0?1:-1,y=1-h*h;if(y>Number.EPSILON){let R=Math.sqrt(y),w=Math.atan2(R,h*v);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}let _=o*v;if(l=l*m+f*_,c=c*m+p*_,u=u*m+g*_,d=d*m+x*_,m===1-o){let R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}t[n]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,a,s,r){let o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],p=s[r+2],g=s[r+3];return t[n]=o*g+u*d+l*p-c*f,t[n+1]=l*g+u*f+c*d-o*p,t[n+2]=c*g+u*p+o*f-l*d,t[n+3]=u*g-o*d-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"YZX":this._x=f*u*d+c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d-f*p*g;break;case"XZY":this._x=f*u*d-c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+o+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(on(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,a=this._y,s=this._z,r=this._w,o=r*t._w+i*t._x+a*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*a+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(fx.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(fx.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),u=2*(o*n-s*a),d=2*(s*i-r*n);return this.x=n+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return tp.copy(this).projectOnVector(t),this.sub(tp)}reflect(t){return this.sub(tp.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(on(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tp=new P,fx=new hi,zs=class{constructor(t=new P(1/0,1/0,1/0),n=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ri.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ri.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=ri.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ri):ri.fromBufferAttribute(s,r),ri.applyMatrix4(t.matrixWorld),this.expandByPoint(ri);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hu.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),hu.copy(i.boundingBox)),hu.applyMatrix4(t.matrixWorld),this.union(hu)}let a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ri),ri.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vl),fu.subVectors(this.max,vl),Lr.subVectors(t.a,vl),Nr.subVectors(t.b,vl),Pr.subVectors(t.c,vl),Fa.subVectors(Nr,Lr),Ha.subVectors(Pr,Nr),Es.subVectors(Lr,Pr);let n=[0,-Fa.z,Fa.y,0,-Ha.z,Ha.y,0,-Es.z,Es.y,Fa.z,0,-Fa.x,Ha.z,0,-Ha.x,Es.z,0,-Es.x,-Fa.y,Fa.x,0,-Ha.y,Ha.x,0,-Es.y,Es.x,0];return!ep(n,Lr,Nr,Pr,fu)||(n=[1,0,0,0,1,0,0,0,1],!ep(n,Lr,Nr,Pr,fu))?!1:(du.crossVectors(Fa,Ha),n=[du.x,du.y,du.z],ep(n,Lr,Nr,Pr,fu))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ri).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ri).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ji),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ji=[new P,new P,new P,new P,new P,new P,new P,new P],ri=new P,hu=new zs,Lr=new P,Nr=new P,Pr=new P,Fa=new P,Ha=new P,Es=new P,vl=new P,fu=new P,du=new P,As=new P;WE=new zs,yl=new P,np=new P,wl=class{constructor(t=new P,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):WE.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;yl.subVectors(t,this.center);let n=yl.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(yl,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(np.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(yl.copy(t.center).add(np)),this.expandByPoint(yl.copy(t.center).sub(np))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Qi=new P,ip=new P,pu=new P,Va=new P,ap=new P,mu=new P,sp=new P,vm=class{constructor(t=new P,n=new P(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Qi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Qi.copy(this.origin).addScaledVector(this.direction,n),Qi.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){ip.copy(t).add(n).multiplyScalar(.5),pu.copy(n).sub(t).normalize(),Va.copy(this.origin).sub(ip);let s=t.distanceTo(n)*.5,r=-this.direction.dot(pu),o=Va.dot(this.direction),l=-Va.dot(pu),c=Va.lengthSq(),u=Math.abs(1-r*r),d,f,p,g;if(u>0)if(d=r*l-o,f=r*o-l,g=s*u,d>=0)if(f>=-g)if(f<=g){let x=1/u;d*=x,f*=x,p=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(ip).addScaledVector(pu,f),p}intersectSphere(t,n){Qi.subVectors(t.center,this.origin);let i=Qi.dot(this.direction),a=Qi.dot(Qi)-i*i,s=t.radius*t.radius;if(a>s)return null;let r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,a=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,a=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,r=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,r=(t.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,Qi)!==null}intersectTriangle(t,n,i,a,s){ap.subVectors(n,t),mu.subVectors(i,t),sp.crossVectors(ap,mu);let r=this.direction.dot(sp),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Va.subVectors(this.origin,t);let l=o*this.direction.dot(mu.crossVectors(Va,mu));if(l<0)return null;let c=o*this.direction.dot(ap.cross(Va));if(c<0||l+c>r)return null;let u=-o*Va.dot(sp);return u<0?null:this.at(u/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ze=class e{constructor(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m)}set(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,a=1/Or.setFromMatrixColumn(t,0).length(),s=1/Or.setFromMatrixColumn(t,1).length(),r=1/Or.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let f=r*u,p=r*d,g=o*u,x=o*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=f-x*c,n[9]=-o*l,n[2]=x-f*c,n[6]=g+p*c,n[10]=r*l}else if(t.order==="YXZ"){let f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f+x*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*u,n[9]=-o,n[2]=p*o-g,n[6]=x+f*o,n[10]=r*l}else if(t.order==="ZXY"){let f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f-x*o,n[4]=-r*d,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*u,n[9]=x-f*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let f=r*u,p=r*d,g=o*u,x=o*d;n[0]=l*u,n[4]=g*c-p,n[8]=f*c+x,n[1]=l*d,n[5]=x*c+f,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let f=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*u,n[4]=x-f*d,n[8]=g*d+p,n[1]=d,n[5]=r*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*d+g,n[10]=f-x*d}else if(t.order==="XZY"){let f=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+x,n[5]=r*u,n[9]=p*d-g,n[2]=g*d-p,n[6]=o*u,n[10]=x*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(YE,t,ZE)}lookAt(t,n,i){let a=this.elements;return Un.subVectors(t,n),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ga.crossVectors(i,Un),Ga.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ga.crossVectors(i,Un)),Ga.normalize(),gu.crossVectors(Un,Ga),a[0]=Ga.x,a[4]=gu.x,a[8]=Un.x,a[1]=Ga.y,a[5]=gu.y,a[9]=Un.y,a[2]=Ga.z,a[6]=gu.z,a[10]=Un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],x=i[6],m=i[10],h=i[14],v=i[3],y=i[7],_=i[11],R=i[15],w=a[0],T=a[4],C=a[8],E=a[12],b=a[1],D=a[5],q=a[9],V=a[13],X=a[2],I=a[6],F=a[10],K=a[14],G=a[3],it=a[7],ut=a[11],bt=a[15];return s[0]=r*w+o*b+l*X+c*G,s[4]=r*T+o*D+l*I+c*it,s[8]=r*C+o*q+l*F+c*ut,s[12]=r*E+o*V+l*K+c*bt,s[1]=u*w+d*b+f*X+p*G,s[5]=u*T+d*D+f*I+p*it,s[9]=u*C+d*q+f*F+p*ut,s[13]=u*E+d*V+f*K+p*bt,s[2]=g*w+x*b+m*X+h*G,s[6]=g*T+x*D+m*I+h*it,s[10]=g*C+x*q+m*F+h*ut,s[14]=g*E+x*V+m*K+h*bt,s[3]=v*w+y*b+_*X+R*G,s[7]=v*T+y*D+_*I+R*it,s[11]=v*C+y*q+_*F+R*ut,s[15]=v*E+y*V+_*K+R*bt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],f=t[10],p=t[14],g=t[3],x=t[7],m=t[11],h=t[15];return g*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*p-i*l*p)+x*(+n*l*p-n*c*f+s*r*f-a*r*p+a*c*u-s*l*u)+m*(+n*c*d-n*o*p-s*r*d+i*r*p+s*o*u-i*c*u)+h*(-a*o*u-n*l*d+n*o*f+a*r*d-i*r*f+i*l*u)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],f=t[10],p=t[11],g=t[12],x=t[13],m=t[14],h=t[15],v=d*m*c-x*f*c+x*l*p-o*m*p-d*l*h+o*f*h,y=g*f*c-u*m*c-g*l*p+r*m*p+u*l*h-r*f*h,_=u*x*c-g*d*c+g*o*p-r*x*p-u*o*h+r*d*h,R=g*d*l-u*x*l-g*o*f+r*x*f+u*o*m-r*d*m,w=n*v+i*y+a*_+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/w;return t[0]=v*T,t[1]=(x*f*s-d*m*s-x*a*p+i*m*p+d*a*h-i*f*h)*T,t[2]=(o*m*s-x*l*s+x*a*c-i*m*c-o*a*h+i*l*h)*T,t[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*p-i*l*p)*T,t[4]=y*T,t[5]=(u*m*s-g*f*s+g*a*p-n*m*p-u*a*h+n*f*h)*T,t[6]=(g*l*s-r*m*s-g*a*c+n*m*c+r*a*h-n*l*h)*T,t[7]=(r*f*s-u*l*s+u*a*c-n*f*c-r*a*p+n*l*p)*T,t[8]=_*T,t[9]=(g*d*s-u*x*s-g*i*p+n*x*p+u*i*h-n*d*h)*T,t[10]=(r*x*s-g*o*s+g*i*c-n*x*c-r*i*h+n*o*h)*T,t[11]=(u*o*s-r*d*s-u*i*c+n*d*c+r*i*p-n*o*p)*T,t[12]=R*T,t[13]=(u*x*a-g*d*a+g*i*f-n*x*f-u*i*m+n*d*m)*T,t[14]=(g*o*a-r*x*a-g*i*l+n*x*l+r*i*m-n*o*m)*T,t[15]=(r*d*a-u*o*a+u*i*l-n*d*l-r*i*f+n*o*f)*T,this}scale(t){let n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){let a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,u=r+r,d=o+o,f=s*c,p=s*u,g=s*d,x=r*u,m=r*d,h=o*d,v=l*c,y=l*u,_=l*d,R=i.x,w=i.y,T=i.z;return a[0]=(1-(x+h))*R,a[1]=(p+_)*R,a[2]=(g-y)*R,a[3]=0,a[4]=(p-_)*w,a[5]=(1-(f+h))*w,a[6]=(m+v)*w,a[7]=0,a[8]=(g+y)*T,a[9]=(m-v)*T,a[10]=(1-(f+x))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){let a=this.elements,s=Or.set(a[0],a[1],a[2]).length(),r=Or.set(a[4],a[5],a[6]).length(),o=Or.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),t.x=a[12],t.y=a[13],t.z=a[14],oi.copy(this);let c=1/s,u=1/r,d=1/o;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=u,oi.elements[5]*=u,oi.elements[6]*=u,oi.elements[8]*=d,oi.elements[9]*=d,oi.elements[10]*=d,n.setFromRotationMatrix(oi),i.x=s,i.y=r,i.z=o,this}makePerspective(t,n,i,a,s,r,o=sa){let l=this.elements,c=2*s/(n-t),u=2*s/(i-a),d=(n+t)/(n-t),f=(i+a)/(i-a),p,g;if(o===sa)p=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===Hu)p=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=sa){let l=this.elements,c=1/(n-t),u=1/(i-a),d=1/(r-s),f=(n+t)*c,p=(i+a)*u,g,x;if(o===sa)g=(r+s)*d,x=-2*d;else if(o===Hu)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Or=new P,oi=new ze,YE=new P(0,0,0),ZE=new P(1,1,1),Ga=new P,gu=new P,Un=new P,dx=new ze,px=new hi,ca=class e{constructor(t=0,n=0,i=0,a=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(on(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-on(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(on(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-on(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(on(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-on(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return dx.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dx,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return px.setFromEuler(this),this.setFromQuaternion(px,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ca.DEFAULT_ORDER="XYZ";qu=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jE=0,mx=new P,Ir=new hi,Ki=new ze,vu=new P,_l=new P,JE=new P,QE=new hi,gx=new P(1,0,0),vx=new P(0,1,0),yx=new P(0,0,1),_x={type:"added"},KE={type:"removed"},zr={type:"childadded",child:null},rp={type:"childremoved",child:null},fi=class e extends Ja{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jE++}),this.uuid=Ul(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new P,n=new ca,i=new hi,a=new P(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ze},normalMatrix:{value:new Nt}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ir.setFromAxisAngle(t,n),this.quaternion.multiply(Ir),this}rotateOnWorldAxis(t,n){return Ir.setFromAxisAngle(t,n),this.quaternion.premultiply(Ir),this}rotateX(t){return this.rotateOnAxis(gx,t)}rotateY(t){return this.rotateOnAxis(vx,t)}rotateZ(t){return this.rotateOnAxis(yx,t)}translateOnAxis(t,n){return mx.copy(t).applyQuaternion(this.quaternion),this.position.add(mx.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(gx,t)}translateY(t){return this.translateOnAxis(vx,t)}translateZ(t){return this.translateOnAxis(yx,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ki.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?vu.copy(t):vu.set(t,n,i);let a=this.parent;this.updateWorldMatrix(!0,!1),_l.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ki.lookAt(_l,vu,this.up):Ki.lookAt(vu,_l,this.up),this.quaternion.setFromRotationMatrix(Ki),a&&(Ki.extractRotation(a.matrixWorld),Ir.setFromRotationMatrix(Ki),this.quaternion.premultiply(Ir.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_x),zr.child=t,this.dispatchEvent(zr),zr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(KE),rp.child=t,this.dispatchEvent(rp),rp.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ki.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ki.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ki),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_x),zr.child=t,this.dispatchEvent(zr),zr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,t,JE),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_l,QE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),f=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let a=t.children[i];this.add(a.clone())}return this}};fi.DEFAULT_UP=new P(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;li=new P,$i=new P,op=new P,ta=new P,Br=new P,Fr=new P,xx=new P,lp=new P,cp=new P,up=new P,hp=new Ue,fp=new Ue,dp=new Ue,Ls=class e{constructor(t=new P,n=new P,i=new P){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),li.subVectors(t,n),a.cross(li);let s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){li.subVectors(a,n),$i.subVectors(i,n),op.subVectors(t,n);let r=li.dot(li),o=li.dot($i),l=li.dot(op),c=$i.dot($i),u=$i.dot(op),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;let f=1/d,p=(c*l-o*u)*f,g=(r*u-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,ta)===null?!1:ta.x>=0&&ta.y>=0&&ta.x+ta.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,ta)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ta.x),l.addScaledVector(r,ta.y),l.addScaledVector(o,ta.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return hp.setScalar(0),fp.setScalar(0),dp.setScalar(0),hp.fromBufferAttribute(t,n),fp.fromBufferAttribute(t,i),dp.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(hp,s.x),r.addScaledVector(fp,s.y),r.addScaledVector(dp,s.z),r}static isFrontFacing(t,n,i,a){return li.subVectors(i,n),$i.subVectors(t,n),li.cross($i).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),$i.subVectors(this.a,this.b),li.cross($i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return e.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,a=this.b,s=this.c,r,o;Br.subVectors(a,i),Fr.subVectors(s,i),lp.subVectors(t,i);let l=Br.dot(lp),c=Fr.dot(lp);if(l<=0&&c<=0)return n.copy(i);cp.subVectors(t,a);let u=Br.dot(cp),d=Fr.dot(cp);if(u>=0&&d<=u)return n.copy(a);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),n.copy(i).addScaledVector(Br,r);up.subVectors(t,s);let p=Br.dot(up),g=Fr.dot(up);if(g>=0&&p<=g)return n.copy(s);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Fr,o);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return xx.subVectors(s,a),o=(d-u)/(d-u+(p-g)),n.copy(a).addScaledVector(xx,o);let h=1/(m+x+f);return r=x*h,o=f*h,n.copy(i).addScaledVector(Br,r).addScaledVector(Fr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},db={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ka={h:0,s:0,l:0},yu={h:0,s:0,l:0};Bt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=jn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,n),this}setRGB(t,n,i,a=Jt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Jt.toWorkingColorSpace(this,a),this}setHSL(t,n,i,a=Jt.workingColorSpace){if(t=FE(t,1),n=on(n,0,1),i=on(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=pp(r,s,t+1/3),this.g=pp(r,s,t),this.b=pp(r,s,t-1/3)}return Jt.toWorkingColorSpace(this,a),this}setStyle(t,n=jn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=jn){let i=db[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ra(t.r),this.g=ra(t.g),this.b=ra(t.b),this}copyLinearToSRGB(t){return this.r=Yr(t.r),this.g=Yr(t.g),this.b=Yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=jn){return Jt.fromWorkingColorSpace(rn.copy(this),t),Math.round(on(rn.r*255,0,255))*65536+Math.round(on(rn.g*255,0,255))*256+Math.round(on(rn.b*255,0,255))}getHexString(t=jn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Jt.workingColorSpace){Jt.fromWorkingColorSpace(rn.copy(this),n);let i=rn.r,a=rn.g,s=rn.b,r=Math.max(i,a,s),o=Math.min(i,a,s),l,c,u=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,n=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(rn.copy(this),n),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=jn){Jt.fromWorkingColorSpace(rn.copy(this),t);let n=rn.r,i=rn.g,a=rn.b;return t!==jn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(ka),this.setHSL(ka.h+t,ka.s+n,ka.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ka),t.getHSL(yu);let i=Qd(ka.h,yu.h,n),a=Qd(ka.s,yu.s,n),s=Qd(ka.l,yu.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Bt;Bt.NAMES=db;$E=0,to=class extends Ja{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$E++}),this.uuid=Ul(),this.name="",this.blending=Xr,this.side=ja,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wp,this.blendDst=Rp,this.blendEquation=Us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ix,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dr,this.stencilZFail=Dr,this.stencilZPass=Dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xr&&(i.blending=this.blending),this.side!==ja&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wp&&(i.blendSrc=this.blendSrc),this.blendDst!==Rp&&(i.blendDst=this.blendDst),this.blendEquation!==Us&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==jr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ix&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Dr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Dr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Dr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){let r=[];for(let o in s){let l=s[o];delete l.metadata,r.push(l)}return r}if(n){let s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Xu=class extends to{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ca,this.combine=$x,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ie=new P,_u=new wt,Ke=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=ax,this.updateRanges=[],this.gpuType=aa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)_u.fromBufferAttribute(this,n),_u.applyMatrix3(t),this.setXY(n,_u.x,_u.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ie.fromBufferAttribute(this,n),Ie.applyMatrix3(t),this.setXYZ(n,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ie.fromBufferAttribute(this,n),Ie.applyMatrix4(t),this.setXYZ(n,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ie.fromBufferAttribute(this,n),Ie.applyNormalMatrix(t),this.setXYZ(n,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ie.fromBufferAttribute(this,n),Ie.transformDirection(t),this.setXYZ(n,Ie.x,Ie.y,Ie.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=gl(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Mn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=gl(n,this.array)),n}setX(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=gl(n,this.array)),n}setY(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=gl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=gl(n,this.array)),n}setW(t,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array),a=Mn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=Mn(n,this.array),i=Mn(i,this.array),a=Mn(a,this.array),s=Mn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ax&&(t.usage=this.usage),t}},Wu=class extends Ke{constructor(t,n,i){super(new Uint16Array(t),n,i)}},Yu=class extends Ke{constructor(t,n,i){super(new Uint32Array(t),n,i)}},cn=class extends Ke{constructor(t,n,i){super(new Float32Array(t),n,i)}},tA=0,Zn=new ze,mp=new fi,Hr=new P,Ln=new zs,xl=new zs,Ye=new P,Qn=class e extends Ja{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tA++}),this.uuid=Ul(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fb(t)?Yu:Wu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Nt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,n,i){return Zn.makeTranslation(t,n,i),this.applyMatrix4(Zn),this}scale(t,n,i){return Zn.makeScale(t,n,i),this.applyMatrix4(Zn),this}lookAt(t){return mp.lookAt(t),mp.updateMatrix(),this.applyMatrix4(mp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hr).negate(),this.translate(Hr.x,Hr.y,Hr.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let a=0,s=t.length;a<s;a++){let r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new cn(i,3))}else{for(let i=0,a=n.count;i<a;i++){let s=t[i];n.setXYZ(i,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zs);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){let s=n[i];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wl);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){let o=n[s];xl.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Ln.min,xl.min),Ln.expandByPoint(Ye),Ye.addVectors(Ln.max,xl.max),Ln.expandByPoint(Ye)):(Ln.expandByPoint(xl.min),Ln.expandByPoint(xl.max))}Ln.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)Ye.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(Ye));if(n)for(let s=0,r=n.length;s<r;s++){let o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ye.fromBufferAttribute(o,c),l&&(Hr.fromBufferAttribute(t,c),Ye.add(Hr)),a=Math.max(a,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new P,l[C]=new P;let c=new P,u=new P,d=new P,f=new wt,p=new wt,g=new wt,x=new P,m=new P;function h(C,E,b){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,b),f.fromBufferAttribute(s,C),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,b),u.sub(c),d.sub(c),p.sub(f),g.sub(f);let D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),o[C].add(x),o[E].add(x),o[b].add(x),l[C].add(m),l[E].add(m),l[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let C=0,E=v.length;C<E;++C){let b=v[C],D=b.start,q=b.count;for(let V=D,X=D+q;V<X;V+=3)h(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let y=new P,_=new P,R=new P,w=new P;function T(C){R.fromBufferAttribute(a,C),w.copy(R);let E=o[C];y.copy(E),y.sub(R.multiplyScalar(R.dot(E))).normalize(),_.crossVectors(w,E);let D=_.dot(l[C])<0?-1:1;r.setXYZW(C,y.x,y.y,y.z,D)}for(let C=0,E=v.length;C<E;++C){let b=v[C],D=b.start,q=b.count;for(let V=D,X=D+q;V<X;V+=3)T(t.getX(V+0)),T(t.getX(V+1)),T(t.getX(V+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ke(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let a=new P,s=new P,r=new P,o=new P,l=new P,c=new P,u=new P,d=new P;if(t)for(let f=0,p=t.count;f<p;f+=3){let g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),r.fromBufferAttribute(n,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)a.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),r.fromBufferAttribute(n,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ye.fromBufferAttribute(t,n),Ye.normalize(),t.setXYZ(n,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u),p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let h=0;h<u;h++)f[g++]=c[p++]}return new Ke(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,a=this.attributes;for(let o in a){let l=a[o],c=t(l,i);n.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let f=c[u],p=t(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let a={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(a[l]=u,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(n));let a=t.attributes;for(let c in a){let u=a[c];this.setAttribute(c,u.clone(n))}let s=t.morphAttributes;for(let c in s){let u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,u=r.length;c<u;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bx=new ze,Ts=new vm,xu=new wl,Mx=new P,bu=new P,Mu=new P,Su=new P,gp=new P,Eu=new P,Sx=new P,Au=new P,Qe=class extends fi{constructor(t=new Qn,n=new Xu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){let i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);let o=this.morphTargetInfluences;if(s&&o){Eu.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(gp.fromBufferAttribute(d,t),r?Eu.addScaledVector(gp,u):Eu.addScaledVector(gp.sub(n),u))}n.add(Eu)}return n}raycast(t,n){let i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xu.copy(i.boundingSphere),xu.applyMatrix4(s),Ts.copy(t.ray).recast(t.near),!(xu.containsPoint(Ts.origin)===!1&&(Ts.intersectSphere(xu,Mx)===null||Ts.origin.distanceToSquared(Mx)>(t.far-t.near)**2))&&(bx.copy(s).invert(),Ts.copy(t.ray).applyMatrix4(bx),!(i.boundingBox!==null&&Ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ts)))}_computeIntersections(t,n,i){let a,s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,x=f.length;g<x;g++){let m=f[g],h=r[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=v,R=y;_<R;_+=3){let w=o.getX(_),T=o.getX(_+1),C=o.getX(_+2);a=Tu(this,h,t,i,c,u,d,w,T,C),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){let v=o.getX(m),y=o.getX(m+1),_=o.getX(m+2);a=Tu(this,r,t,i,c,u,d,v,y,_),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=f.length;g<x;g++){let m=f[g],h=r[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=v,R=y;_<R;_+=3){let w=_,T=_+1,C=_+2;a=Tu(this,h,t,i,c,u,d,w,T,C),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){let v=m,y=m+1,_=m+2;a=Tu(this,r,t,i,c,u,d,v,y,_),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}};Rl=class e extends Qn{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};let o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);let l=[],c=[],u=[],d=[],f=0,p=0;g("z","y","x",-1,-1,i,n,t,r,s,0),g("z","y","x",1,-1,i,n,-t,r,s,1),g("x","z","y",1,1,t,i,n,a,r,2),g("x","z","y",1,-1,t,i,-n,a,r,3),g("x","y","z",1,-1,t,n,i,a,s,4),g("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new cn(c,3)),this.setAttribute("normal",new cn(u,3)),this.setAttribute("uv",new cn(d,2));function g(x,m,h,v,y,_,R,w,T,C,E){let b=_/T,D=R/C,q=_/2,V=R/2,X=w/2,I=T+1,F=C+1,K=0,G=0,it=new P;for(let ut=0;ut<F;ut++){let bt=ut*D-V;for(let Ft=0;Ft<I;Ft++){let se=Ft*b-q;it[x]=se*v,it[m]=bt*y,it[h]=X,c.push(it.x,it.y,it.z),it[x]=0,it[m]=0,it[h]=w>0?1:-1,u.push(it.x,it.y,it.z),d.push(Ft/T),d.push(1-ut/C),K+=1}}for(let ut=0;ut<C;ut++)for(let bt=0;bt<T;bt++){let Ft=f+bt+I*ut,se=f+bt+I*(ut+1),Y=f+(bt+1)+I*(ut+1),et=f+(bt+1)+I*ut;l.push(Ft,se,et),l.push(se,Y,et),G+=6}o.addGroup(p,G,E),p+=G,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};iA={clone:eo,merge:mn},aA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vn=class extends to{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=aA,this.fragmentShader=sA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=eo(t.uniforms),this.uniformsGroups=nA(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let a in this.uniforms){let r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Zu=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=sa}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},qa=new P,Ex=new wt,Ax=new wt,gn=class extends Zu{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=dm*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Jd*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return dm*2*Math.atan(Math.tan(Jd*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qa.x,qa.y).multiplyScalar(-t/qa.z),qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qa.x,qa.y).multiplyScalar(-t/qa.z)}getViewSize(t,n){return this.getViewBounds(t,Ex,Ax),n.subVectors(Ax,Ex)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Jd*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Vr=-90,Gr=1,ym=class extends fi{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new gn(Vr,Gr,t,n);a.layers=this.layers,this.add(a);let s=new gn(Vr,Gr,t,n);s.layers=this.layers,this.add(s);let r=new gn(Vr,Gr,t,n);r.layers=this.layers,this.add(r);let o=new gn(Vr,Gr,t,n);o.layers=this.layers,this.add(o);let l=new gn(Vr,Gr,t,n);l.layers=this.layers,this.add(l);let c=new gn(Vr,Gr,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(let c of n)this.remove(c);if(t===sa)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Hu)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,l,c,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(n,s),t.setRenderTarget(i,1,a),t.render(n,r),t.setRenderTarget(i,2,a),t.render(n,o),t.setRenderTarget(i,3,a),t.render(n,l),t.setRenderTarget(i,4,a),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,a),t.render(n,u),t.setRenderTarget(d,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ju=class extends Jn{constructor(t,n,i,a,s,r,o,l,c,u){t=t!==void 0?t:[],n=n!==void 0?n:Jr,super(t,n,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},_m=class extends la{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new ju(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ri}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Rl(5,5,5),s=new vn({name:"CubemapFromEquirect",uniforms:eo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Ya});s.uniforms.tEquirect.value=n;let r=new Qe(a,s),o=n.minFilter;return n.minFilter===Os&&(n.minFilter=Ri),new ym(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n,i,a){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}},vp=new P,rA=new P,oA=new Nt,na=class{constructor(t=new P(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let a=vp.subVectors(i,n).cross(rA.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(vp),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||oA.getNormalMatrix(t),a=this.coplanarPoint(vp).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ws=new wl,wu=new P,Ju=class{constructor(t=new na,n=new na,i=new na,a=new na,s=new na,r=new na){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=sa){let i=this.planes,a=t.elements,s=a[0],r=a[1],o=a[2],l=a[3],c=a[4],u=a[5],d=a[6],f=a[7],p=a[8],g=a[9],x=a[10],m=a[11],h=a[12],v=a[13],y=a[14],_=a[15];if(i[0].setComponents(l-s,f-c,m-p,_-h).normalize(),i[1].setComponents(l+s,f+c,m+p,_+h).normalize(),i[2].setComponents(l+r,f+u,m+g,_+v).normalize(),i[3].setComponents(l-r,f-u,m-g,_-v).normalize(),i[4].setComponents(l-o,f-d,m-x,_-y).normalize(),n===sa)i[5].setComponents(l+o,f+d,m+x,_+y).normalize();else if(n===Hu)i[5].setComponents(o,d,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ws)}intersectsSprite(t){return ws.center.set(0,0,0),ws.radius=.7071067811865476,ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(ws)}intersectsSphere(t){let n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let a=n[i];if(wu.x=a.normal.x>0?t.max.x:t.min.x,wu.y=a.normal.y>0?t.max.y:t.min.y,wu.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(wu)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};Qu=class e extends Qn{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};let s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=t/o,f=n/l,p=[],g=[],x=[],m=[];for(let h=0;h<u;h++){let v=h*f-r;for(let y=0;y<c;y++){let _=y*d-s;g.push(_,-v,0),x.push(0,0,1),m.push(y/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<o;v++){let y=v+c*h,_=v+c*(h+1),R=v+1+c*(h+1),w=v+1+c*h;p.push(y,_,w),p.push(_,R,w)}this.setIndex(p),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(x,3)),this.setAttribute("uv",new cn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},cA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_A=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,MA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,SA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,EA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,AA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,TA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,CA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,DA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,UA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,LA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,NA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,PA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,OA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,BA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FA="gl_FragColor = linearToOutputTexel( gl_FragColor );",HA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,VA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,GA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,WA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,YA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,QA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,KA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$A=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,oT=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,uT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pT=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_T=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,MT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ST=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ET=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,RT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,UT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,LT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,PT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,BT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,FT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,XT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,WT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,YT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,JT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,KT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$T=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ew=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,iw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ow=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_w=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ew=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Aw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ww=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Nw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ow=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:cA,alphahash_pars_fragment:uA,alphamap_fragment:hA,alphamap_pars_fragment:fA,alphatest_fragment:dA,alphatest_pars_fragment:pA,aomap_fragment:mA,aomap_pars_fragment:gA,batching_pars_vertex:vA,batching_vertex:yA,begin_vertex:_A,beginnormal_vertex:xA,bsdfs:bA,iridescence_fragment:MA,bumpmap_pars_fragment:SA,clipping_planes_fragment:EA,clipping_planes_pars_fragment:AA,clipping_planes_pars_vertex:TA,clipping_planes_vertex:wA,color_fragment:RA,color_pars_fragment:CA,color_pars_vertex:DA,color_vertex:UA,common:LA,cube_uv_reflection_fragment:NA,defaultnormal_vertex:PA,displacementmap_pars_vertex:OA,displacementmap_vertex:IA,emissivemap_fragment:zA,emissivemap_pars_fragment:BA,colorspace_fragment:FA,colorspace_pars_fragment:HA,envmap_fragment:VA,envmap_common_pars_fragment:GA,envmap_pars_fragment:kA,envmap_pars_vertex:qA,envmap_physical_pars_fragment:eT,envmap_vertex:XA,fog_vertex:WA,fog_pars_vertex:YA,fog_fragment:ZA,fog_pars_fragment:jA,gradientmap_pars_fragment:JA,lightmap_pars_fragment:QA,lights_lambert_fragment:KA,lights_lambert_pars_fragment:$A,lights_pars_begin:tT,lights_toon_fragment:nT,lights_toon_pars_fragment:iT,lights_phong_fragment:aT,lights_phong_pars_fragment:sT,lights_physical_fragment:rT,lights_physical_pars_fragment:oT,lights_fragment_begin:lT,lights_fragment_maps:cT,lights_fragment_end:uT,logdepthbuf_fragment:hT,logdepthbuf_pars_fragment:fT,logdepthbuf_pars_vertex:dT,logdepthbuf_vertex:pT,map_fragment:mT,map_pars_fragment:gT,map_particle_fragment:vT,map_particle_pars_fragment:yT,metalnessmap_fragment:_T,metalnessmap_pars_fragment:xT,morphinstance_vertex:bT,morphcolor_vertex:MT,morphnormal_vertex:ST,morphtarget_pars_vertex:ET,morphtarget_vertex:AT,normal_fragment_begin:TT,normal_fragment_maps:wT,normal_pars_fragment:RT,normal_pars_vertex:CT,normal_vertex:DT,normalmap_pars_fragment:UT,clearcoat_normal_fragment_begin:LT,clearcoat_normal_fragment_maps:NT,clearcoat_pars_fragment:PT,iridescence_pars_fragment:OT,opaque_fragment:IT,packing:zT,premultiplied_alpha_fragment:BT,project_vertex:FT,dithering_fragment:HT,dithering_pars_fragment:VT,roughnessmap_fragment:GT,roughnessmap_pars_fragment:kT,shadowmap_pars_fragment:qT,shadowmap_pars_vertex:XT,shadowmap_vertex:WT,shadowmask_pars_fragment:YT,skinbase_vertex:ZT,skinning_pars_vertex:jT,skinning_vertex:JT,skinnormal_vertex:QT,specularmap_fragment:KT,specularmap_pars_fragment:$T,tonemapping_fragment:tw,tonemapping_pars_fragment:ew,transmission_fragment:nw,transmission_pars_fragment:iw,uv_pars_fragment:aw,uv_pars_vertex:sw,uv_vertex:rw,worldpos_vertex:ow,background_vert:lw,background_frag:cw,backgroundCube_vert:uw,backgroundCube_frag:hw,cube_vert:fw,cube_frag:dw,depth_vert:pw,depth_frag:mw,distanceRGBA_vert:gw,distanceRGBA_frag:vw,equirect_vert:yw,equirect_frag:_w,linedashed_vert:xw,linedashed_frag:bw,meshbasic_vert:Mw,meshbasic_frag:Sw,meshlambert_vert:Ew,meshlambert_frag:Aw,meshmatcap_vert:Tw,meshmatcap_frag:ww,meshnormal_vert:Rw,meshnormal_frag:Cw,meshphong_vert:Dw,meshphong_frag:Uw,meshphysical_vert:Lw,meshphysical_frag:Nw,meshtoon_vert:Pw,meshtoon_frag:Ow,points_vert:Iw,points_frag:zw,shadow_vert:Bw,shadow_frag:Fw,sprite_vert:Hw,sprite_frag:Vw},nt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},wi={basic:{uniforms:mn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:mn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:mn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:mn([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:mn([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:mn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:mn([nt.points,nt.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:mn([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:mn([nt.common,nt.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:mn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:mn([nt.sprite,nt.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:mn([nt.common,nt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:mn([nt.lights,nt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};wi.physical={uniforms:mn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};Ru={r:0,b:0,g:0},Rs=new ca,Gw=new ze;xm=class extends Zu{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},qr=4,Tx=[.125,.215,.35,.446,.526,.582],Ns=20,yp=new xm,wx=new Bt,_p=null,xp=0,bp=0,Mp=!1,Ds=(1+Math.sqrt(5))/2,kr=1/Ds,Rx=[new P(-Ds,kr,0),new P(Ds,kr,0),new P(-kr,0,Ds),new P(kr,0,Ds),new P(0,Ds,-kr),new P(0,Ds,kr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Ku=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,a=100){_p=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,a,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ux(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_p,xp,bp),this._renderer.xr.enabled=Mp,t.scissorTest=!1,Cu(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Jr||t.mapping===Qr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_p=this._renderer.getRenderTarget(),xp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Mp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ri,minFilter:Ri,generateMipmaps:!1,type:Dl,format:ci,colorSpace:io,depthBuffer:!1},a=Cx(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cx(t,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jw(s)),this._blurMaterial=Jw(s,t,n)}return a}_compileMaterial(t){let n=new Qe(this._lodPlanes[0],t);this._renderer.compile(n,yp)}_sceneToCubeUV(t,n,i,a){let o=new gn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(wx),u.toneMapping=Za,u.autoClear=!1;let p=new Xu({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),g=new Qe(new Rl,p),x=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(wx),x=!0);for(let h=0;h<6;h++){let v=h%3;v===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):v===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));let y=this._cubeSize;Cu(a,v*y,h>2?y:0,y,y),u.setRenderTarget(a),x&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,a=t.mapping===Jr||t.mapping===Qr;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ux()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dx());let s=a?this._cubemapMaterial:this._equirectMaterial,r=new Qe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;Cu(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,yp)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let a=this._lodPlanes.length;for(let s=1;s<a;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Rx[(a-s-1)%Rx.length];this._blur(t,s-1,s,r,o)}n.autoClear=i}_blur(t,n,i,a,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Qe(this._lodPlanes[a],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ns-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Ns;m>Ns&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ns}`);let h=[],v=0;for(let T=0;T<Ns;++T){let C=T/x,E=Math.exp(-C*C/2);h.push(E),T===0?v+=E:T<m&&(v+=2*E)}for(let T=0;T<h.length;T++)h[T]=h[T]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-i;let _=this._sizeLods[a],R=3*_*(a>y-qr?a-y+qr:0),w=4*(this._cubeSize-_);Cu(n,R,w,3*_,2*_),l.setRenderTarget(n),l.render(d,yp)}};$u=class extends Jn{constructor(t,n,i,a,s,r,o,l,c,u=Wr){if(u!==Wr&&u!==$r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Wr&&(i=Is),i===void 0&&u===$r&&(i=Kr),super(null,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=o!==void 0?o:ui,this.minFilter=l!==void 0?l:ui,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},gb=new Jn,Lx=new $u(1,1),vb=new ku,yb=new gm,_b=new ju,Nx=[],Px=[],Ox=new Float32Array(16),Ix=new Float32Array(9),zx=new Float32Array(4);bm=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=S2(n.type)}},Mm=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=k2(n.type)}},Sm=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let a=this.seq;for(let s=0,r=a.length;s!==r;++s){let o=a[s];o.setValue(t,n[o.id],i)}}},Sp=/(\w+)(\])?(\[|\.)?/g;Zr=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let s=t.getActiveUniform(n,a),r=t.getUniformLocation(n,s.name);q2(s,r,this)}}setValue(t,n,i,a){let s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){let a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){let o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){let i=[];for(let a=0,s=t.length;a!==s;++a){let r=t[a];r.id in n&&i.push(r)}return i}};X2=37297,W2=0;Hx=new Nt;Du=new P;eR=/^[ \t]*#include +<([\w\d./]+)>/gm;nR=new Map;aR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;fR=0,Am=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Tm(t),n.set(t,i)),i}},Tm=class{constructor(t){this.id=fR++,this.code=t,this.usedTimes=0}};_R=0;wm=class extends to{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=RE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Rm=class extends to{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},SR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ER=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;TR={[Cp]:Dp,[Up]:Pp,[Lp]:Op,[jr]:Np,[Dp]:Cp,[Pp]:Up,[Op]:Lp,[Np]:jr};Cm=class extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Wa=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},UR={type:"move"},Sl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let x of t.hand.values()){let m=n.getJointPose(x,i),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(UR)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Wa;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},LR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Dm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){let a=new Jn,s=t.properties.get(a);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new vn({vertexShader:LR,fragmentShader:NR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Qe(new Qu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Um=class extends Ja{constructor(t,n){super();let i=this,a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,g=null,x=new Dm,m=n.getContextAttributes(),h=null,v=null,y=[],_=[],R=new wt,w=null,T=new gn;T.viewport=new Ue;let C=new gn;C.viewport=new Ue;let E=[T,C],b=new Cm,D=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=y[Y];return et===void 0&&(et=new Sl,y[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=y[Y];return et===void 0&&(et=new Sl,y[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=y[Y];return et===void 0&&(et=new Sl,y[Y]=et),et.getHandSpace()};function V(Y){let et=_.indexOf(Y.inputSource);if(et===-1)return;let yt=y[et];yt!==void 0&&(yt.update(Y.inputSource,Y.frame,c||r),yt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){a.removeEventListener("select",V),a.removeEventListener("selectstart",V),a.removeEventListener("selectend",V),a.removeEventListener("squeeze",V),a.removeEventListener("squeezestart",V),a.removeEventListener("squeezeend",V),a.removeEventListener("end",X),a.removeEventListener("inputsourceschange",I);for(let Y=0;Y<y.length;Y++){let et=_[Y];et!==null&&(_[Y]=null,y[Y].disconnect(et))}D=null,q=null,x.reset(),t.setRenderTarget(h),p=null,f=null,d=null,a=null,v=null,se.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(Y){if(a=Y,a!==null){if(h=t.getRenderTarget(),a.addEventListener("select",V),a.addEventListener("selectstart",V),a.addEventListener("selectend",V),a.addEventListener("squeeze",V),a.addEventListener("squeezestart",V),a.addEventListener("squeezeend",V),a.addEventListener("end",X),a.addEventListener("inputsourceschange",I),m.xrCompatible!==!0&&await n.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),a.renderState.layers===void 0){let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,et),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new la(p.framebufferWidth,p.framebufferHeight,{format:ci,type:oa,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,yt=null,st=null;m.depth&&(st=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,et=m.stencil?$r:Wr,yt=m.stencil?Kr:Is);let At={colorFormat:n.RGBA8,depthFormat:st,scaleFactor:s};d=new XRWebGLBinding(a,n),f=d.createProjectionLayer(At),a.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new la(f.textureWidth,f.textureHeight,{format:ci,type:oa,depthTexture:new $u(f.textureWidth,f.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),se.setContext(a),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function I(Y){for(let et=0;et<Y.removed.length;et++){let yt=Y.removed[et],st=_.indexOf(yt);st>=0&&(_[st]=null,y[st].disconnect(yt))}for(let et=0;et<Y.added.length;et++){let yt=Y.added[et],st=_.indexOf(yt);if(st===-1){for(let Ct=0;Ct<y.length;Ct++)if(Ct>=_.length){_.push(yt),st=Ct;break}else if(_[Ct]===null){_[Ct]=yt,st=Ct;break}if(st===-1)break}let At=y[st];At&&At.connect(yt)}}let F=new P,K=new P;function G(Y,et,yt){F.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(yt.matrixWorld);let st=F.distanceTo(K),At=et.projectionMatrix.elements,Ct=yt.projectionMatrix.elements,Ht=At[14]/(At[10]-1),be=At[14]/(At[10]+1),Zt=(At[9]+1)/At[5],Ce=(At[9]-1)/At[5],O=(At[8]-1)/At[0],Nn=(Ct[8]+1)/Ct[0],kt=Ht*O,qt=Ht*Nn,St=st/(-O+Nn),de=St*-O;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(de),Y.translateZ(St),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),At[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let Mt=Ht+St,A=be+St,M=kt-de,z=qt+(st-de),j=Zt*be/A*Mt,Q=Ce*be/A*Mt;Y.projectionMatrix.makePerspective(M,z,j,Q,Mt,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(a===null)return;let et=Y.near,yt=Y.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(yt=x.depthFar)),b.near=C.near=T.near=et,b.far=C.far=T.far=yt,(D!==b.near||q!==b.far)&&(a.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,q=b.far),T.layers.mask=Y.layers.mask|2,C.layers.mask=Y.layers.mask|4,b.layers.mask=T.layers.mask|C.layers.mask;let st=Y.parent,At=b.cameras;it(b,st);for(let Ct=0;Ct<At.length;Ct++)it(At[Ct],st);At.length===2?G(b,T,C):b.projectionMatrix.copy(T.projectionMatrix),ut(Y,b,st)};function ut(Y,et,yt){yt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(yt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=dm*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(b)};let bt=null;function Ft(Y,et){if(u=et.getViewerPose(c||r),g=et,u!==null){let yt=u.views;p!==null&&(t.setRenderTargetFramebuffer(v,p.framebuffer),t.setRenderTarget(v));let st=!1;yt.length!==b.cameras.length&&(b.cameras.length=0,st=!0);for(let Ct=0;Ct<yt.length;Ct++){let Ht=yt[Ct],be=null;if(p!==null)be=p.getViewport(Ht);else{let Ce=d.getViewSubImage(f,Ht);be=Ce.viewport,Ct===0&&(t.setRenderTargetTextures(v,Ce.colorTexture,f.ignoreDepthValues?void 0:Ce.depthStencilTexture),t.setRenderTarget(v))}let Zt=E[Ct];Zt===void 0&&(Zt=new gn,Zt.layers.enable(Ct),Zt.viewport=new Ue,E[Ct]=Zt),Zt.matrix.fromArray(Ht.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Ht.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(be.x,be.y,be.width,be.height),Ct===0&&(b.matrix.copy(Zt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),st===!0&&b.cameras.push(Zt)}let At=a.enabledFeatures;if(At&&At.includes("depth-sensing")){let Ct=d.getDepthInformation(yt[0]);Ct&&Ct.isValid&&Ct.texture&&x.init(t,Ct,a.renderState)}}for(let yt=0;yt<y.length;yt++){let st=_[yt],At=y[yt];st!==null&&At!==void 0&&At.update(st,et,c||r)}bt&&bt(Y,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}let se=new mb;se.setAnimationLoop(Ft),this.setAnimationLoop=function(Y){bt=Y},this.dispose=function(){}}},Cs=new ca,PR=new ze;th=class{constructor(t={}){let{canvas:n=HE(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let g=new Uint32Array(4),x=new Int32Array(4),m=null,h=null,v=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jn,this.toneMapping=Za,this.toneMappingExposure=1;let _=this,R=!1,w=0,T=0,C=null,E=-1,b=null,D=new Ue,q=new Ue,V=null,X=new Bt(0),I=0,F=n.width,K=n.height,G=1,it=null,ut=null,bt=new Ue(0,0,F,K),Ft=new Ue(0,0,F,K),se=!1,Y=new Ju,et=!1,yt=!1,st=new ze,At=new ze,Ct=new P,Ht=new Ue,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function Ce(){return C===null?G:1}let O=i;function Nn(S,L){return n.getContext(S,L)}try{let S={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${jm}`),n.addEventListener("webglcontextlost",J,!1),n.addEventListener("webglcontextrestored",ct,!1),n.addEventListener("webglcontextcreationerror",ot,!1),O===null){let L="webgl2";if(O=Nn(L,S),O===null)throw Nn(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let kt,qt,St,de,Mt,A,M,z,j,Q,W,_t,rt,ht,jt,$,ft,Et,Tt,dt,Xt,Pt,ce,U;function at(){kt=new Kw(O),kt.init(),Pt=new DR(O,kt),qt=new Ww(O,kt,t,Pt),St=new wR(O,kt),qt.reverseDepthBuffer&&f&&St.buffers.depth.setReversed(!0),de=new e2(O),Mt=new pR,A=new CR(O,kt,St,Mt,qt,Pt,de),M=new Zw(_),z=new Qw(_),j=new lA(O),ce=new qw(O,j),Q=new $w(O,j,de,ce),W=new i2(O,Q,j,de),Tt=new n2(O,qt,A),$=new Yw(Mt),_t=new dR(_,M,z,kt,qt,ce,$),rt=new OR(_,Mt),ht=new gR,jt=new MR(kt),Et=new kw(_,M,z,St,W,p,l),ft=new AR(_,W,qt),U=new IR(O,de,qt,St),dt=new Xw(O,kt,de),Xt=new t2(O,kt,de),de.programs=_t.programs,_.capabilities=qt,_.extensions=kt,_.properties=Mt,_.renderLists=ht,_.shadowMap=ft,_.state=St,_.info=de}at();let k=new Um(_,O);this.xr=k,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let S=kt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=kt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(S){S!==void 0&&(G=S,this.setSize(F,K,!1))},this.getSize=function(S){return S.set(F,K)},this.setSize=function(S,L,B=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=S,K=L,n.width=Math.floor(S*G),n.height=Math.floor(L*G),B===!0&&(n.style.width=S+"px",n.style.height=L+"px"),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(F*G,K*G).floor()},this.setDrawingBufferSize=function(S,L,B){F=S,K=L,G=B,n.width=Math.floor(S*B),n.height=Math.floor(L*B),this.setViewport(0,0,S,L)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(bt)},this.setViewport=function(S,L,B,H){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,L,B,H),St.viewport(D.copy(bt).multiplyScalar(G).round())},this.getScissor=function(S){return S.copy(Ft)},this.setScissor=function(S,L,B,H){S.isVector4?Ft.set(S.x,S.y,S.z,S.w):Ft.set(S,L,B,H),St.scissor(q.copy(Ft).multiplyScalar(G).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){St.setScissorTest(se=S)},this.setOpaqueSort=function(S){it=S},this.setTransparentSort=function(S){ut=S},this.getClearColor=function(S){return S.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(S=!0,L=!0,B=!0){let H=0;if(S){let N=!1;if(C!==null){let tt=C.texture.format;N=tt===eg||tt===tg||tt===$m}if(N){let tt=C.texture.type,lt=tt===oa||tt===Is||tt===Tl||tt===Kr||tt===Qm||tt===Km,mt=Et.getClearColor(),gt=Et.getClearAlpha(),Rt=mt.r,Lt=mt.g,vt=mt.b;lt?(g[0]=Rt,g[1]=Lt,g[2]=vt,g[3]=gt,O.clearBufferuiv(O.COLOR,0,g)):(x[0]=Rt,x[1]=Lt,x[2]=vt,x[3]=gt,O.clearBufferiv(O.COLOR,0,x))}else H|=O.COLOR_BUFFER_BIT}L&&(H|=O.DEPTH_BUFFER_BIT),B&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",J,!1),n.removeEventListener("webglcontextrestored",ct,!1),n.removeEventListener("webglcontextcreationerror",ot,!1),ht.dispose(),jt.dispose(),Mt.dispose(),M.dispose(),z.dispose(),W.dispose(),ce.dispose(),U.dispose(),_t.dispose(),k.dispose(),k.removeEventListener("sessionstart",pg),k.removeEventListener("sessionend",mg),Qa.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let S=de.autoReset,L=ft.enabled,B=ft.autoUpdate,H=ft.needsUpdate,N=ft.type;at(),de.autoReset=S,ft.enabled=L,ft.autoUpdate=B,ft.needsUpdate=H,ft.type=N}function ot(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ut(S){let L=S.target;L.removeEventListener("dispose",Ut),Ae(L)}function Ae(S){$e(S),Mt.remove(S)}function $e(S){let L=Mt.get(S).programs;L!==void 0&&(L.forEach(function(B){_t.releaseProgram(B)}),S.isShaderMaterial&&_t.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,B,H,N,tt){L===null&&(L=be);let lt=N.isMesh&&N.matrixWorld.determinant()<0,mt=zb(S,L,B,H,N);St.setMaterial(H,lt);let gt=B.index,Rt=1;if(H.wireframe===!0){if(gt=Q.getWireframeAttribute(B),gt===void 0)return;Rt=2}let Lt=B.drawRange,vt=B.attributes.position,Qt=Lt.start*Rt,ue=(Lt.start+Lt.count)*Rt;tt!==null&&(Qt=Math.max(Qt,tt.start*Rt),ue=Math.min(ue,(tt.start+tt.count)*Rt)),gt!==null?(Qt=Math.max(Qt,0),ue=Math.min(ue,gt.count)):vt!=null&&(Qt=Math.max(Qt,0),ue=Math.min(ue,vt.count));let pe=ue-Qt;if(pe<0||pe===1/0)return;ce.setup(N,H,mt,B,gt);let yn,$t=dt;if(gt!==null&&(yn=j.get(gt),$t=Xt,$t.setIndex(yn)),N.isMesh)H.wireframe===!0?(St.setLineWidth(H.wireframeLinewidth*Ce()),$t.setMode(O.LINES)):$t.setMode(O.TRIANGLES);else if(N.isLine){let xt=H.linewidth;xt===void 0&&(xt=1),St.setLineWidth(xt*Ce()),N.isLineSegments?$t.setMode(O.LINES):N.isLineLoop?$t.setMode(O.LINE_LOOP):$t.setMode(O.LINE_STRIP)}else N.isPoints?$t.setMode(O.POINTS):N.isSprite&&$t.setMode(O.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)$t.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))$t.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let xt=N._multiDrawStarts,Ui=N._multiDrawCounts,te=N._multiDrawCount,$n=gt?j.get(gt).bytesPerElement:1,Hs=Mt.get(H).currentProgram.getUniforms();for(let Sn=0;Sn<te;Sn++)Hs.setValue(O,"_gl_DrawID",Sn),$t.render(xt[Sn]/$n,Ui[Sn])}else if(N.isInstancedMesh)$t.renderInstances(Qt,pe,N.count);else if(B.isInstancedBufferGeometry){let xt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ui=Math.min(B.instanceCount,xt);$t.renderInstances(Qt,pe,Ui)}else $t.render(Qt,pe)};function ee(S,L,B){S.transparent===!0&&S.side===ia&&S.forceSinglePass===!1?(S.side=ln,S.needsUpdate=!0,Ol(S,L,B),S.side=ja,S.needsUpdate=!0,Ol(S,L,B),S.side=ia):Ol(S,L,B)}this.compile=function(S,L,B=null){B===null&&(B=S),h=jt.get(B),h.init(L),y.push(h),B.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),S!==B&&S.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(h.pushLight(N),N.castShadow&&h.pushShadow(N))}),h.setupLights();let H=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let tt=N.material;if(tt)if(Array.isArray(tt))for(let lt=0;lt<tt.length;lt++){let mt=tt[lt];ee(mt,B,N),H.add(mt)}else ee(tt,B,N),H.add(tt)}),y.pop(),h=null,H},this.compileAsync=function(S,L,B=null){let H=this.compile(S,L,B);return new Promise(N=>{function tt(){if(H.forEach(function(lt){Mt.get(lt).currentProgram.isReady()&&H.delete(lt)}),H.size===0){N(S);return}setTimeout(tt,10)}kt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Kn=null;function Di(S){Kn&&Kn(S)}function pg(){Qa.stop()}function mg(){Qa.start()}let Qa=new mb;Qa.setAnimationLoop(Di),typeof self<"u"&&Qa.setContext(self),this.setAnimationLoop=function(S){Kn=S,k.setAnimationLoop(S),S===null?Qa.stop():Qa.start()},k.addEventListener("sessionstart",pg),k.addEventListener("sessionend",mg),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(L),L=k.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,L,C),h=jt.get(S,y.length),h.init(L),y.push(h),At.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Y.setFromProjectionMatrix(At),yt=this.localClippingEnabled,et=$.init(this.clippingPlanes,yt),m=ht.get(S,v.length),m.init(),v.push(m),k.enabled===!0&&k.isPresenting===!0){let tt=_.xr.getDepthSensingMesh();tt!==null&&gh(tt,L,-1/0,_.sortObjects)}gh(S,L,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(it,ut),Zt=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Zt&&Et.addToRenderList(m,S),this.info.render.frame++,et===!0&&$.beginShadows();let B=h.state.shadowsArray;ft.render(B,S,L),et===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=m.opaque,N=m.transmissive;if(h.setupLights(),L.isArrayCamera){let tt=L.cameras;if(N.length>0)for(let lt=0,mt=tt.length;lt<mt;lt++){let gt=tt[lt];vg(H,N,S,gt)}Zt&&Et.render(S);for(let lt=0,mt=tt.length;lt<mt;lt++){let gt=tt[lt];gg(m,S,gt,gt.viewport)}}else N.length>0&&vg(H,N,S,L),Zt&&Et.render(S),gg(m,S,L);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(_,S,L),ce.resetDefaultState(),E=-1,b=null,y.pop(),y.length>0?(h=y[y.length-1],et===!0&&$.setGlobalState(_.clippingPlanes,h.state.camera)):h=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function gh(S,L,B,H){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){H&&Ht.setFromMatrixPosition(S.matrixWorld).applyMatrix4(At);let lt=W.update(S),mt=S.material;mt.visible&&m.push(S,lt,mt,B,Ht.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){let lt=W.update(S),mt=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ht.copy(S.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Ht.copy(lt.boundingSphere.center)),Ht.applyMatrix4(S.matrixWorld).applyMatrix4(At)),Array.isArray(mt)){let gt=lt.groups;for(let Rt=0,Lt=gt.length;Rt<Lt;Rt++){let vt=gt[Rt],Qt=mt[vt.materialIndex];Qt&&Qt.visible&&m.push(S,lt,Qt,B,Ht.z,vt)}}else mt.visible&&m.push(S,lt,mt,B,Ht.z,null)}}let tt=S.children;for(let lt=0,mt=tt.length;lt<mt;lt++)gh(tt[lt],L,B,H)}function gg(S,L,B,H){let N=S.opaque,tt=S.transmissive,lt=S.transparent;h.setupLightsView(B),et===!0&&$.setGlobalState(_.clippingPlanes,B),H&&St.viewport(D.copy(H)),N.length>0&&Pl(N,L,B),tt.length>0&&Pl(tt,L,B),lt.length>0&&Pl(lt,L,B),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function vg(S,L,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[H.id]===void 0&&(h.state.transmissionRenderTarget[H.id]=new la(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Dl:oa,minFilter:Os,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let tt=h.state.transmissionRenderTarget[H.id],lt=H.viewport||D;tt.setSize(lt.z,lt.w);let mt=_.getRenderTarget();_.setRenderTarget(tt),_.getClearColor(X),I=_.getClearAlpha(),I<1&&_.setClearColor(16777215,.5),_.clear(),Zt&&Et.render(B);let gt=_.toneMapping;_.toneMapping=Za;let Rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),h.setupLightsView(H),et===!0&&$.setGlobalState(_.clippingPlanes,H),Pl(S,B,H),A.updateMultisampleRenderTarget(tt),A.updateRenderTargetMipmap(tt),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let vt=0,Qt=L.length;vt<Qt;vt++){let ue=L[vt],pe=ue.object,yn=ue.geometry,$t=ue.material,xt=ue.group;if($t.side===ia&&pe.layers.test(H.layers)){let Ui=$t.side;$t.side=ln,$t.needsUpdate=!0,yg(pe,B,H,yn,$t,xt),$t.side=Ui,$t.needsUpdate=!0,Lt=!0}}Lt===!0&&(A.updateMultisampleRenderTarget(tt),A.updateRenderTargetMipmap(tt))}_.setRenderTarget(mt),_.setClearColor(X,I),Rt!==void 0&&(H.viewport=Rt),_.toneMapping=gt}function Pl(S,L,B){let H=L.isScene===!0?L.overrideMaterial:null;for(let N=0,tt=S.length;N<tt;N++){let lt=S[N],mt=lt.object,gt=lt.geometry,Rt=H===null?lt.material:H,Lt=lt.group;mt.layers.test(B.layers)&&yg(mt,L,B,gt,Rt,Lt)}}function yg(S,L,B,H,N,tt){S.onBeforeRender(_,L,B,H,N,tt),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(_,L,B,H,S,tt),N.transparent===!0&&N.side===ia&&N.forceSinglePass===!1?(N.side=ln,N.needsUpdate=!0,_.renderBufferDirect(B,L,H,N,S,tt),N.side=ja,N.needsUpdate=!0,_.renderBufferDirect(B,L,H,N,S,tt),N.side=ia):_.renderBufferDirect(B,L,H,N,S,tt),S.onAfterRender(_,L,B,H,N,tt)}function Ol(S,L,B){L.isScene!==!0&&(L=be);let H=Mt.get(S),N=h.state.lights,tt=h.state.shadowsArray,lt=N.state.version,mt=_t.getParameters(S,N.state,tt,L,B),gt=_t.getProgramCacheKey(mt),Rt=H.programs;H.environment=S.isMeshStandardMaterial?L.environment:null,H.fog=L.fog,H.envMap=(S.isMeshStandardMaterial?z:M).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",Ut),Rt=new Map,H.programs=Rt);let Lt=Rt.get(gt);if(Lt!==void 0){if(H.currentProgram===Lt&&H.lightsStateVersion===lt)return xg(S,mt),Lt}else mt.uniforms=_t.getUniforms(S),S.onBeforeCompile(mt,_),Lt=_t.acquireProgram(mt,gt),Rt.set(gt,Lt),H.uniforms=mt.uniforms;let vt=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(vt.clippingPlanes=$.uniform),xg(S,mt),H.needsLights=Fb(S),H.lightsStateVersion=lt,H.needsLights&&(vt.ambientLightColor.value=N.state.ambient,vt.lightProbe.value=N.state.probe,vt.directionalLights.value=N.state.directional,vt.directionalLightShadows.value=N.state.directionalShadow,vt.spotLights.value=N.state.spot,vt.spotLightShadows.value=N.state.spotShadow,vt.rectAreaLights.value=N.state.rectArea,vt.ltc_1.value=N.state.rectAreaLTC1,vt.ltc_2.value=N.state.rectAreaLTC2,vt.pointLights.value=N.state.point,vt.pointLightShadows.value=N.state.pointShadow,vt.hemisphereLights.value=N.state.hemi,vt.directionalShadowMap.value=N.state.directionalShadowMap,vt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,vt.spotShadowMap.value=N.state.spotShadowMap,vt.spotLightMatrix.value=N.state.spotLightMatrix,vt.spotLightMap.value=N.state.spotLightMap,vt.pointShadowMap.value=N.state.pointShadowMap,vt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Lt,H.uniformsList=null,Lt}function _g(S){if(S.uniformsList===null){let L=S.currentProgram.getUniforms();S.uniformsList=Zr.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function xg(S,L){let B=Mt.get(S);B.outputColorSpace=L.outputColorSpace,B.batching=L.batching,B.batchingColor=L.batchingColor,B.instancing=L.instancing,B.instancingColor=L.instancingColor,B.instancingMorph=L.instancingMorph,B.skinning=L.skinning,B.morphTargets=L.morphTargets,B.morphNormals=L.morphNormals,B.morphColors=L.morphColors,B.morphTargetsCount=L.morphTargetsCount,B.numClippingPlanes=L.numClippingPlanes,B.numIntersection=L.numClipIntersection,B.vertexAlphas=L.vertexAlphas,B.vertexTangents=L.vertexTangents,B.toneMapping=L.toneMapping}function zb(S,L,B,H,N){L.isScene!==!0&&(L=be),A.resetTextureUnits();let tt=L.fog,lt=H.isMeshStandardMaterial?L.environment:null,mt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:io,gt=(H.isMeshStandardMaterial?z:M).get(H.envMap||lt),Rt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Lt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),vt=!!B.morphAttributes.position,Qt=!!B.morphAttributes.normal,ue=!!B.morphAttributes.color,pe=Za;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pe=_.toneMapping);let yn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$t=yn!==void 0?yn.length:0,xt=Mt.get(H),Ui=h.state.lights;if(et===!0&&(yt===!0||S!==b)){let Pn=S===b&&H.id===E;$.setState(H,S,Pn)}let te=!1;H.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Ui.state.version||xt.outputColorSpace!==mt||N.isBatchedMesh&&xt.batching===!1||!N.isBatchedMesh&&xt.batching===!0||N.isBatchedMesh&&xt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&xt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&xt.instancing===!1||!N.isInstancedMesh&&xt.instancing===!0||N.isSkinnedMesh&&xt.skinning===!1||!N.isSkinnedMesh&&xt.skinning===!0||N.isInstancedMesh&&xt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&xt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&xt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&xt.instancingMorph===!1&&N.morphTexture!==null||xt.envMap!==gt||H.fog===!0&&xt.fog!==tt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==$.numPlanes||xt.numIntersection!==$.numIntersection)||xt.vertexAlphas!==Rt||xt.vertexTangents!==Lt||xt.morphTargets!==vt||xt.morphNormals!==Qt||xt.morphColors!==ue||xt.toneMapping!==pe||xt.morphTargetsCount!==$t)&&(te=!0):(te=!0,xt.__version=H.version);let $n=xt.currentProgram;te===!0&&($n=Ol(H,L,N));let Hs=!1,Sn=!1,ro=!1,me=$n.getUniforms(),gi=xt.uniforms;if(St.useProgram($n.program)&&(Hs=!0,Sn=!0,ro=!0),H.id!==E&&(E=H.id,Sn=!0),Hs||b!==S){St.buffers.depth.getReversed()?(st.copy(S.projectionMatrix),GE(st),kE(st),me.setValue(O,"projectionMatrix",st)):me.setValue(O,"projectionMatrix",S.projectionMatrix),me.setValue(O,"viewMatrix",S.matrixWorldInverse);let ha=me.map.cameraPosition;ha!==void 0&&ha.setValue(O,Ct.setFromMatrixPosition(S.matrixWorld)),qt.logarithmicDepthBuffer&&me.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&me.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,Sn=!0,ro=!0)}if(N.isSkinnedMesh){me.setOptional(O,N,"bindMatrix"),me.setOptional(O,N,"bindMatrixInverse");let Pn=N.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),me.setValue(O,"boneTexture",Pn.boneTexture,A))}N.isBatchedMesh&&(me.setOptional(O,N,"batchingTexture"),me.setValue(O,"batchingTexture",N._matricesTexture,A),me.setOptional(O,N,"batchingIdTexture"),me.setValue(O,"batchingIdTexture",N._indirectTexture,A),me.setOptional(O,N,"batchingColorTexture"),N._colorsTexture!==null&&me.setValue(O,"batchingColorTexture",N._colorsTexture,A));let oo=B.morphAttributes;if((oo.position!==void 0||oo.normal!==void 0||oo.color!==void 0)&&Tt.update(N,B,$n),(Sn||xt.receiveShadow!==N.receiveShadow)&&(xt.receiveShadow=N.receiveShadow,me.setValue(O,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(gi.envMap.value=gt,gi.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&L.environment!==null&&(gi.envMapIntensity.value=L.environmentIntensity),Sn&&(me.setValue(O,"toneMappingExposure",_.toneMappingExposure),xt.needsLights&&Bb(gi,ro),tt&&H.fog===!0&&rt.refreshFogUniforms(gi,tt),rt.refreshMaterialUniforms(gi,H,G,K,h.state.transmissionRenderTarget[S.id]),Zr.upload(O,_g(xt),gi,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Zr.upload(O,_g(xt),gi,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&me.setValue(O,"center",N.center),me.setValue(O,"modelViewMatrix",N.modelViewMatrix),me.setValue(O,"normalMatrix",N.normalMatrix),me.setValue(O,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Pn=H.uniformsGroups;for(let ha=0,fa=Pn.length;ha<fa;ha++){let bg=Pn[ha];U.update(bg,$n),U.bind(bg,$n)}}return $n}function Bb(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function Fb(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,L,B){Mt.get(S.texture).__webglTexture=L,Mt.get(S.depthTexture).__webglTexture=B;let H=Mt.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,L){let B=Mt.get(S);B.__webglFramebuffer=L,B.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,B=0){C=S,w=L,T=B;let H=!0,N=null,tt=!1,lt=!1;if(S){let gt=Mt.get(S);if(gt.__useDefaultFramebuffer!==void 0)St.bindFramebuffer(O.FRAMEBUFFER,null),H=!1;else if(gt.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(gt.__hasExternalTextures)A.rebindTextures(S,Mt.get(S.texture).__webglTexture,Mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let vt=S.depthTexture;if(gt.__boundDepthTexture!==vt){if(vt!==null&&Mt.has(vt)&&(S.width!==vt.image.width||S.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}let Rt=S.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);let Lt=Mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Lt[L])?N=Lt[L][B]:N=Lt[L],tt=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?N=Mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Lt)?N=Lt[B]:N=Lt,D.copy(S.viewport),q.copy(S.scissor),V=S.scissorTest}else D.copy(bt).multiplyScalar(G).floor(),q.copy(Ft).multiplyScalar(G).floor(),V=se;if(St.bindFramebuffer(O.FRAMEBUFFER,N)&&H&&St.drawBuffers(S,N),St.viewport(D),St.scissor(q),St.setScissorTest(V),tt){let gt=Mt.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+L,gt.__webglTexture,B)}else if(lt){let gt=Mt.get(S.texture),Rt=L||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,gt.__webglTexture,B||0,Rt)}E=-1},this.readRenderTargetPixels=function(S,L,B,H,N,tt,lt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){St.bindFramebuffer(O.FRAMEBUFFER,mt);try{let gt=S.texture,Rt=gt.format,Lt=gt.type;if(!qt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-H&&B>=0&&B<=S.height-N&&O.readPixels(L,B,H,N,Pt.convert(Rt),Pt.convert(Lt),tt)}finally{let gt=C!==null?Mt.get(C).__webglFramebuffer:null;St.bindFramebuffer(O.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(S,L,B,H,N,tt,lt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){let gt=S.texture,Rt=gt.format,Lt=gt.type;if(!qt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=S.width-H&&B>=0&&B<=S.height-N){St.bindFramebuffer(O.FRAMEBUFFER,mt);let vt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,vt),O.bufferData(O.PIXEL_PACK_BUFFER,tt.byteLength,O.STREAM_READ),O.readPixels(L,B,H,N,Pt.convert(Rt),Pt.convert(Lt),0);let Qt=C!==null?Mt.get(C).__webglFramebuffer:null;St.bindFramebuffer(O.FRAMEBUFFER,Qt);let ue=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await VE(O,ue,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,vt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,tt),O.deleteBuffer(vt),O.deleteSync(ue),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,L=null,B=0){S.isTexture!==!0&&(bl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,S=arguments[1]);let H=Math.pow(2,-B),N=Math.floor(S.image.width*H),tt=Math.floor(S.image.height*H),lt=L!==null?L.x:0,mt=L!==null?L.y:0;A.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,lt,mt,N,tt),St.unbindTexture()},this.copyTextureToTexture=function(S,L,B=null,H=null,N=0){S.isTexture!==!0&&(bl("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],L=arguments[2],N=arguments[3]||0,B=null);let tt,lt,mt,gt,Rt,Lt,vt,Qt,ue,pe=S.isCompressedTexture?S.mipmaps[N]:S.image;B!==null?(tt=B.max.x-B.min.x,lt=B.max.y-B.min.y,mt=B.isBox3?B.max.z-B.min.z:1,gt=B.min.x,Rt=B.min.y,Lt=B.isBox3?B.min.z:0):(tt=pe.width,lt=pe.height,mt=pe.depth||1,gt=0,Rt=0,Lt=0),H!==null?(vt=H.x,Qt=H.y,ue=H.z):(vt=0,Qt=0,ue=0);let yn=Pt.convert(L.format),$t=Pt.convert(L.type),xt;L.isData3DTexture?(A.setTexture3D(L,0),xt=O.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(A.setTexture2DArray(L,0),xt=O.TEXTURE_2D_ARRAY):(A.setTexture2D(L,0),xt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,L.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,L.unpackAlignment);let Ui=O.getParameter(O.UNPACK_ROW_LENGTH),te=O.getParameter(O.UNPACK_IMAGE_HEIGHT),$n=O.getParameter(O.UNPACK_SKIP_PIXELS),Hs=O.getParameter(O.UNPACK_SKIP_ROWS),Sn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,pe.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pe.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,gt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Rt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Lt);let ro=S.isDataArrayTexture||S.isData3DTexture,me=L.isDataArrayTexture||L.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){let gi=Mt.get(S),oo=Mt.get(L),Pn=Mt.get(gi.__renderTarget),ha=Mt.get(oo.__renderTarget);St.bindFramebuffer(O.READ_FRAMEBUFFER,Pn.__webglFramebuffer),St.bindFramebuffer(O.DRAW_FRAMEBUFFER,ha.__webglFramebuffer);for(let fa=0;fa<mt;fa++)ro&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Mt.get(S).__webglTexture,N,Lt+fa),S.isDepthTexture?(me&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Mt.get(L).__webglTexture,N,ue+fa),O.blitFramebuffer(gt,Rt,tt,lt,vt,Qt,tt,lt,O.DEPTH_BUFFER_BIT,O.NEAREST)):me?O.copyTexSubImage3D(xt,N,vt,Qt,ue+fa,gt,Rt,tt,lt):O.copyTexSubImage2D(xt,N,vt,Qt,ue+fa,gt,Rt,tt,lt);St.bindFramebuffer(O.READ_FRAMEBUFFER,null),St.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else me?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(xt,N,vt,Qt,ue,tt,lt,mt,yn,$t,pe.data):L.isCompressedArrayTexture?O.compressedTexSubImage3D(xt,N,vt,Qt,ue,tt,lt,mt,yn,pe.data):O.texSubImage3D(xt,N,vt,Qt,ue,tt,lt,mt,yn,$t,pe):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,N,vt,Qt,tt,lt,yn,$t,pe.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,N,vt,Qt,pe.width,pe.height,yn,pe.data):O.texSubImage2D(O.TEXTURE_2D,N,vt,Qt,tt,lt,yn,$t,pe);O.pixelStorei(O.UNPACK_ROW_LENGTH,Ui),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,te),O.pixelStorei(O.UNPACK_SKIP_PIXELS,$n),O.pixelStorei(O.UNPACK_SKIP_ROWS,Hs),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Sn),N===0&&L.generateMipmaps&&O.generateMipmap(xt),St.unbindTexture()},this.copyTextureToTexture3D=function(S,L,B=null,H=null,N=0){return S.isTexture!==!0&&(bl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,S=arguments[2],L=arguments[3],N=arguments[4]||0),bl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,L,B,H,N)},this.initRenderTarget=function(S){Mt.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),St.unbindTexture()},this.resetState=function(){w=0,T=0,C=null,St.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Jt._getUnpackColorSpace()}},eh=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ca,this.environmentIntensity=1,this.environmentRotation=new ca,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}},ua=class extends Ke{constructor(t,n,i,a=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},di=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,a=this.getPoint(0),s=0;n.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),s+=i.distanceTo(a),n.push(s),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n){let i=this.getLengths(),a=0,s=i.length,r;n?r=n:r=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);let u=i[a],f=i[a+1]-u,p=(r-u)/f;return(a+p)/(s-1)}getTangent(t,n){let a=t-1e-4,s=t+1e-4;a<0&&(a=0),s>1&&(s=1);let r=this.getPoint(a),o=this.getPoint(s),l=n||(r.isVector2?new wt:new P);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n){let i=new P,a=[],s=[],r=[],o=new P,l=new ze;for(let p=0;p<=t;p++){let g=p/t;a[p]=this.getTangentAt(g,new P)}s[0]=new P,r[0]=new P;let c=Number.MAX_VALUE,u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(on(a[p-1].dot(a[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}r[p].crossVectors(a[p],s[p])}if(n===!0){let p=Math.acos(on(s[0].dot(s[t]),-1,1));p/=t,a[0].dot(o.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(a[g],p*g)),r[g].crossVectors(a[g],s[g])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},nh=class extends di{constructor(t=0,n=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new wt){let i=n,a=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Lm=class extends nh{constructor(t,n,i,a,s,r){super(t,n,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}};Uu=new P,Ep=new ig,Ap=new ig,Tp=new ig,Cl=class extends di{constructor(t=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=a}getPoint(t,n=new P){let i=n,a=this.points,s=a.length,r=(s-(this.closed?0:1))*t,o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(Uu.subVectors(a[0],a[1]).add(a[0]),c=Uu);let d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(Uu.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=Uu),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Ep.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,g,x,m),Ap.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,g,x,m),Tp.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(Ep.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Ap.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Tp.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(Ep.calc(l),Ap.calc(l),Tp.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new P().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Nm=class extends di{constructor(t=new wt,n=new wt,i=new wt,a=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new wt){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Al(t,a.x,s.x,r.x,o.x),Al(t,a.y,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Pm=class extends di{constructor(t=new P,n=new P,i=new P,a=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new P){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Al(t,a.x,s.x,r.x,o.x),Al(t,a.y,s.y,r.y,o.y),Al(t,a.z,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Om=class extends di{constructor(t=new wt,n=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new wt){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new wt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Im=class extends di{constructor(t=new P,n=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new P){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new P){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zm=class extends di{constructor(t=new wt,n=new wt,i=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new wt){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(El(t,a.x,s.x,r.x),El(t,a.y,s.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ih=class extends di{constructor(t=new P,n=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new P){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(El(t,a.x,s.x,r.x),El(t,a.y,s.y,r.y),El(t,a.z,s.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Bm=class extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new wt){let i=n,a=this.points,s=(a.length-1)*t,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(Jx(o,l.x,c.x,u.x,d.x),Jx(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new wt().fromArray(a))}return this}},qR=Object.freeze({__proto__:null,ArcCurve:Lm,CatmullRomCurve3:Cl,CubicBezierCurve:Nm,CubicBezierCurve3:Pm,EllipseCurve:nh,LineCurve:Om,LineCurve3:Im,QuadraticBezierCurve:zm,QuadraticBezierCurve3:ih,SplineCurve:Bm}),pi=class e extends Qn{constructor(t=1,n=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let l=Math.min(r+o,Math.PI),c=0,u=[],d=new P,f=new P,p=[],g=[],x=[],m=[];for(let h=0;h<=i;h++){let v=[],y=h/i,_=0;h===0&&r===0?_=.5/n:h===i&&l===Math.PI&&(_=-.5/n);for(let R=0;R<=n;R++){let w=R/n;d.x=-t*Math.cos(a+w*s)*Math.sin(r+y*o),d.y=t*Math.cos(r+y*o),d.z=t*Math.sin(a+w*s)*Math.sin(r+y*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(w+_,1-y),v.push(c++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){let y=u[h][v+1],_=u[h][v],R=u[h+1][v],w=u[h+1][v+1];(h!==0||r>0)&&p.push(y,_,w),(h!==i-1||l<Math.PI)&&p.push(_,R,w)}this.setIndex(p),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(x,3)),this.setAttribute("uv",new cn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ah=class e extends Qn{constructor(t=new ih(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),n=64,i=1,a=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:i,radialSegments:a,closed:s};let r=t.computeFrenetFrames(n,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;let o=new P,l=new P,c=new wt,u=new P,d=[],f=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new cn(d,3)),this.setAttribute("normal",new cn(f,3)),this.setAttribute("uv",new cn(p,2));function x(){for(let y=0;y<n;y++)m(y);m(s===!1?n:0),v(),h()}function m(y){u=t.getPointAt(y/n,u);let _=r.normals[y],R=r.binormals[y];for(let w=0;w<=a;w++){let T=w/a*Math.PI*2,C=Math.sin(T),E=-Math.cos(T);l.x=E*_.x+C*R.x,l.y=E*_.y+C*R.y,l.z=E*_.z+C*R.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+i*l.x,o.y=u.y+i*l.y,o.z=u.z+i*l.z,d.push(o.x,o.y,o.z)}}function h(){for(let y=1;y<=n;y++)for(let _=1;_<=a;_++){let R=(a+1)*(y-1)+(_-1),w=(a+1)*y+(_-1),T=(a+1)*y+_,C=(a+1)*(y-1)+_;g.push(R,w,C),g.push(w,T,C)}}function v(){for(let y=0;y<=n;y++)for(let _=0;_<=a;_++)c.x=y/n,c.y=_/a,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new e(new qR[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};no=class{constructor(t,n,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,a=n[i],s=n[i-1];t:{e:{let r;n:{i:if(!(t<a)){for(let o=i+2;;){if(a===void 0){if(t<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=a,a=n[++i],t<a)break e}r=n.length;break n}if(!(t>=s)){let o=n[1];t<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(a=s,s=n[--i-1],t>=s)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(a=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,a)}return this.interpolate_(i,s,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,a=this.valueSize,s=t*a;for(let r=0;r!==a;++r)n[r]=i[s+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Fm=class extends no{constructor(t,n,i,a){super(t,n,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tx,endingEnd:tx}}intervalChanged_(t,n,i){let a=this.parameterPositions,s=t-2,r=t+1,o=a[s],l=a[r];if(o===void 0)switch(this.getSettings_().endingStart){case ex:s=t,o=2*n-i;break;case nx:s=a.length-2,o=n+a[s]-a[s+1];break;default:s=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ex:r=t,l=2*i-n;break;case nx:r=1,l=i+a[1]-a[0];break;default:r=t-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=r*u}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-n)/(a-n),x=g*g,m=x*g,h=-f*m+2*f*x-f*g,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,y=(-1-p)*m+(1.5+p)*x+.5*g,_=p*m-p*x;for(let R=0;R!==o;++R)s[R]=h*r[u+R]+v*r[c+R]+y*r[l+R]+_*r[d+R];return s}},Hm=class extends no{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-n)/(a-n),d=1-u;for(let f=0;f!==o;++f)s[f]=r[c+f]*d+r[l+f]*u;return s}},Vm=class extends no{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},mi=class{constructor(t,n,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Lu(n,this.TimeBufferType),this.values=Lu(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Lu(t.times,Array),values:Lu(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Vm(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Hm(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Fm(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case Fu:n=this.InterpolantFactoryMethodDiscrete;break;case fm:n=this.InterpolantFactoryMethodLinear;break;case jd:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fu;case this.InterpolantFactoryMethodLinear:return fm;case this.InterpolantFactoryMethodSmooth:return jd}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]*=t}return this}trim(t,n){let i=this.times,a=i.length,s=0,r=a-1;for(;s!==a&&i[s]<t;)++s;for(;r!==-1&&i[r]>n;)--r;if(++r,s!==0||r!==a){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=i.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(a!==void 0&&XR(a))for(let o=0,l=a.length;o!==l;++o){let c=a[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===jd,s=t.length-1,r=1;for(let o=1;o<s;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(a)l=!0;else{let d=o*i,f=d-i,p=d+i;for(let g=0;g!==i;++g){let x=n[d+g];if(x!==n[f+g]||x!==n[p+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,f=r*i;for(let p=0;p!==i;++p)n[f+p]=n[d+p]}++r}}if(s>0){t[r]=t[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,a=new i(this.name,t,n);return a.createInterpolant=this.createInterpolant,a}};mi.prototype.TimeBufferType=Float32Array;mi.prototype.ValueBufferType=Float32Array;mi.prototype.DefaultInterpolation=fm;Bs=class extends mi{constructor(t,n,i){super(t,n,i)}};Bs.prototype.ValueTypeName="bool";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=Fu;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;Gm=class extends mi{};Gm.prototype.ValueTypeName="color";km=class extends mi{};km.prototype.ValueTypeName="number";qm=class extends no{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(a-n),c=t*o;for(let u=c+o;c!==u;c+=4)hi.slerpFlat(s,0,r,c-o,r,c,l);return s}},sh=class extends mi{InterpolantFactoryMethodLinear(t){return new qm(this.times,this.values,this.getValueSize(),t)}};sh.prototype.ValueTypeName="quaternion";sh.prototype.InterpolantFactoryMethodSmooth=void 0;Fs=class extends mi{constructor(t,n,i){super(t,n,i)}};Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=Fu;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;Xm=class extends mi{};Xm.prototype.ValueTypeName="vector";Wm=class{constructor(t,n,i){let a=this,s=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.itemStart=function(u){o++,s===!1&&a.onStart!==void 0&&a.onStart(u,r,o),s=!0},this.itemEnd=function(u){r++,a.onProgress!==void 0&&a.onProgress(u,r,o),r===o&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},WR=new Wm,Ym=class{constructor(t){this.manager=t!==void 0?t:WR,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(a,s){i.load(t,a,n,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ym.DEFAULT_MATERIAL_NAME="__DEFAULT";rh=class extends Qn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},oh=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qx(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=Qx();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}};ag="\\[\\]\\.:\\/",YR=new RegExp("["+ag+"]","g"),sg="[^"+ag+"]",ZR="[^"+ag.replace("\\.","")+"]",jR=/((?:WC+[\/:])*)/.source.replace("WC",sg),JR=/(WCOD+)?/.source.replace("WCOD",ZR),QR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sg),KR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sg),$R=new RegExp("^"+jR+JR+QR+KR+"$"),tC=["material","materials","bones","map"],Zm=class{constructor(t,n,i){let a=i||_e.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,a)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,s=i.length;a!==s;++a)i[a].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},_e=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(YR,"")}static parseTrackName(t){let n=$R.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},a=i.nodeName&&i.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let s=i.nodeName.substring(a+1);tC.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,a),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},a=i(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)t[n++]=i[a]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,a=n.propertyName,s=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[a];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=Zm;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];UC=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jm}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jm)});var Le,rg=lo(()=>{"use strict";Le={noche:"#0E2A4F",oceano:"#123763",tierra:"#56739B",norteamerica:"#3170F7",mexico:"#B9DBFF",latinoamerica:"#4FA3E8",eaa:"#6E7BFF",rotulo:"#5AAEF0",trigo:"#D9A456",trigoTostado:"#A8692B",avena:"#E7D5AF",avenaTostada:"#BFA270",ajonjoli:"#F2E5C6",ajonjoliTostado:"#CFB385",maiz:"#F4C142",maizTostado:"#D98B1E",tierraNatural:"#3D5C88"}});function fh(e,t){let n=e.getAttribute("position"),i=new P;for(let a=0;a<n.count;a++)i.fromBufferAttribute(n,a),t(i),n.setXYZ(a,i.x,i.y,i.z);return e.computeVertexNormals(),e}var dh,og,bb,lg=lo(()=>{"use strict";hh();rg();dh={trigo:{nombre:"Trigo",tam:[.0058,.0036,.003],color:[Le.trigo,Le.trigoTostado],brillo:.18,punta:0,geometria:()=>fh(new pi(1,14,10),e=>{let t=e.x;e.y*=1-.16*t,e.z*=1-.1*t,e.z>0&&(e.z-=.42*Math.exp(-(e.y*e.y)/.03)*e.z*(1-.6*t*t)),e.x*=1+.08*(1-Math.abs(e.y))})},avena:{nombre:"Avena",tam:[.0068,.0058,.0016],color:[Le.avena,Le.avenaTostada],brillo:.08,punta:0,geometria:()=>fh(new pi(1,32,12),e=>{let t=Math.atan2(e.y,e.x),n=1+.07*Math.sin(2*t+.6)+.05*Math.sin(3*t+1.7)+.025*Math.sin(5*t);e.x*=n,e.y*=n,e.z=e.z*.22+.2*(e.x*e.x+e.y*e.y)-.1,e.z+=.09*Math.sin(e.x*7+e.y*1.5)})},ajonjoli:{nombre:"Ajonjol\xED",tam:[.0062,.0042,.0018],color:[Le.ajonjoli,Le.ajonjoliTostado],brillo:.22,punta:0,geometria:()=>fh(new pi(1,14,8),e=>{let t=(e.x+1)/2;e.y*=1-.6*Math.pow(t,1.6),e.x*=1+.15*Math.max(0,e.x),e.z*=.45,e.z>0&&(e.z+=.1*Math.exp(-(e.y*e.y)/.02))})},maiz:{nombre:"Ma\xEDz",tam:[.0052,.0048,.003],color:[Le.maiz,Le.maizTostado],brillo:.3,punta:1,geometria:()=>fh(new pi(1,14,10),e=>{let t=Math.hypot(e.x,e.y);if(t>1e-6){let n=e.x/t,i=e.y/t,a=Math.min(1.3,Math.pow(Math.pow(Math.abs(n),3.2)+Math.pow(Math.abs(i),3.2),-1/3.2));e.x=n*t*a,e.y=i*t*a}e.y*=1-.16*e.x,e.z*=.6,e.z>0&&(e.z-=.12*Math.exp(-(e.x*e.x+e.y*e.y)/.15))})},punto:{nombre:"Punto (v1)",tam:[.0046,.004,.0017],color:[Le.tierra,Le.tierra],brillo:0,punta:0,geometria:()=>new pi(1,8,6)}},og=["trigo","avena","ajonjoli","maiz","multigrano","punto"],bb={...Object.fromEntries(Object.entries(dh).map(([e,t])=>[e,t.nombre])),multigrano:"Multigrano"}});var Sb=vi(ph=>{"use strict";var eC=Symbol.for("react.transitional.element"),nC=Symbol.for("react.fragment");function Mb(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:eC,type:e,key:i,ref:t!==void 0?t:null,props:n}}ph.Fragment=nC;ph.jsx=Mb;ph.jsxs=Mb});var Ll=vi((IC,Eb)=>{"use strict";Eb.exports=Sb()});function Tb(e,t=!1){let n=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),s={},r={},o=e[0].morphTargetsRelative,l=new Qn,c=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!a.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;r[p]===void 0&&(r[p]=[]),r[p].push(d.morphAttributes[p])}if(t){let p;if(n)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(n){let u=0,d=[];for(let f=0;f<e.length;++f){let p=e[f].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+u);u+=e[f].attributes.position.count}l.setIndex(d)}for(let u in s){let d=Ab(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(let u in r){let d=r[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){let p=[];for(let x=0;x<r[u].length;++x)p.push(r[u][x][f]);let g=Ab(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Ab(e){let t,n,i,a=-1,s=0;for(let c=0;c<e.length;++c){let u=e[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=u.itemSize),n!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=u.gpuType),a!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*n}let r=new t(s),o=new Ke(r,n,i),l=0;for(let c=0;c<e.length;++c){let u=e[c];if(u.isInterleavedBufferAttribute){let d=l/n;for(let f=0,p=u.count;f<p;f++)for(let g=0;g<n;g++){let x=u.getComponent(f,g);o.setComponent(f+d,g,x)}}else r.set(u.array,l);l+=u.count*n}return a!==void 0&&(o.gpuType=a),o}var wb=lo(()=>{hh()});var Db={};Wb(Db,{EscenaGlobo:()=>hg});function cg(e,t,n=1){let i=e*so,a=t*so;return new P(Math.cos(i)*Math.sin(a)*n,Math.sin(i)*n,Math.cos(i)*Math.cos(a)*n)}var so,iC,Rb,Nl,ug,Cb,aC,sC,rC,oC,lC,cC,uC,hC,hg,Ub=lo(()=>{"use strict";hh();wb();rg();lg();so=Math.PI/180,iC=[Le.tierra,Le.norteamerica,Le.mexico,Le.latinoamerica,Le.eaa].map(e=>new Bt(e)),Rb=2,Nl=[["trigo",.45],["avena",.2],["ajonjoli",.2],["maiz",.15]];ug=(e,t,n,i)=>e+(t-e)*(1-Math.exp(-n*i)),Cb=e=>((e+180)%360+360)%360-180,aC=`
  attribute vec2 aLatLon;
  attribute float aRegion;
  attribute float aPais;
  attribute float aAzar;
  uniform float uRegion;
  uniform float uPop;
  uniform float uFoco;
  uniform float uTiempo;
  uniform float uEscala;
  uniform vec3 uColores[5];
  uniform vec3 uTam;
  uniform float uNatural;
  uniform float uForma;
  uniform vec3 uGrano;
  uniform vec3 uGranoTostado;
  uniform vec3 uTierraNatural;
  varying vec3 vNormal;
  varying vec3 vColor;
  varying vec3 vLocal;
  void main() {
    vec3 n = vec3(cos(aLatLon.x) * sin(aLatLon.y), sin(aLatLon.x), cos(aLatLon.x) * cos(aLatLon.y));
    vec3 este = normalize(cross(vec3(0.0, 1.0, 0.0), n) + vec3(1e-5, 0.0, 0.0));
    vec3 norte = cross(n, este);
    float a = aAzar * 6.2831853;
    vec3 t = cos(a) * este + sin(a) * norte;
    vec3 b = cross(n, t);

    bool opera = aRegion > 0.5;
    bool activo = opera && (uRegion < 0.5 || abs(aRegion - uRegion) < 0.5);
    float foco = abs(aPais - uFoco) < 0.5 ? 1.0 : 0.0;
    // Leudado: cada grano brinca con su propio retraso y se queda un poco alzado.
    float d = clamp((uPop - aAzar * 0.55) / 0.45, 0.0, 1.0);
    float salto = activo ? sin(d * 3.14159) * 0.05 + d * 0.004 : 0.0;
    float latido = foco * (0.012 + 0.008 * sin(uTiempo * 7.0 + aAzar * 6.0));
    // Tama\xF1o por tipo de grano, con variaci\xF3n por grano para que no se vean de molde.
    vec3 s = uTam * uEscala * (0.88 + 0.24 * fract(aAzar * 7.0)) * (activo ? 1.0 + 0.2 * d : (opera ? 1.0 : 0.8));
    s.y *= mix(1.0, 0.88 + 0.24 * fract(aAzar * 13.0), uForma);
    vLocal = position;
    float h = s.z + salto + latido;

    vec3 p = n * (1.0 + h) + t * position.x * s.x + b * position.y * s.y + n * position.z * s.z;
    vNormal = normalize(normalMatrix * normalize(t * normal.x / s.x + b * normal.y / s.y + n * normal.z / s.z));

    vec3 c;
    if (uNatural < 0.5) {
      c = uColores[int(aRegion + 0.5)];
      if (opera && !activo) c = mix(uColores[0], c, 0.35);
      if (activo && uRegion > 0.5) c = mix(c, vec3(1.0), 0.12 * d);
      c *= 0.85 + 0.25 * aAzar;
    } else {
      // Grano natural: dorado donde operamos, apagado donde no; la regi\xF3n en foco se tuesta un poco.
      c = mix(uGrano, uGranoTostado, 0.75 * fract(aAzar * 5.0));
      if (!opera) c = mix(uTierraNatural, c, 0.22);
      else if (!activo) c = mix(uTierraNatural, c, 0.5);
      if (activo && uRegion > 0.5) c = mix(c, c * 1.12 + 0.04, d);
    }
    c = mix(c, vec3(1.0), foco * 0.6);
    vColor = c;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,sC=`
  uniform float uBrillo;
  uniform float uPunta;
  uniform float uForma;
  varying vec3 vNormal;
  varying vec3 vColor;
  varying vec3 vLocal;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 luz = normalize(vec3(-0.45, 0.6, 0.75));
    float dif = max(dot(n, luz), 0.0);
    float esp = pow(max(dot(n, normalize(luz + vec3(0.0, 0.0, 1.0))), 0.0), 28.0) * uBrillo;
    float sombra = mix(1.0, 0.72 + 0.28 * smoothstep(-1.0, 0.5, vLocal.z), uForma); // la panza del grano, m\xE1s oscura
    vec3 c = mix(vColor, vColor * 1.2 + 0.1, uPunta * smoothstep(0.35, 0.95, -vLocal.x)); // corona clara del ma\xEDz
    gl_FragColor = vec4(c * (0.38 + 0.68 * dif) * sombra + esp, 1.0);
    #include <colorspace_fragment>
  }
`,rC=`
  varying vec3 vPos;
  varying vec3 vNormalVista;
  void main() {
    vPos = position;
    vNormalVista = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,oC=`
  uniform vec3 uOceano;
  uniform vec3 uBorde;
  uniform float uCuadro;
  varying vec3 vPos;
  varying vec3 vNormalVista;
  void main() {
    vec3 n = normalize(vPos);
    float lat = asin(n.y) * 57.29578;
    float lon = atan(n.x, n.z) * 57.29578;
    float a = step(0.5, fract(lon / 10.0));
    float b = step(0.5, fract(lat / 10.0));
    float cuadro = (a + b) * 0.5;
    float frente = clamp(vNormalVista.z, 0.0, 1.0);
    vec3 c = uOceano * (1.0 - uCuadro * 0.8 + uCuadro * cuadro);
    c = mix(uBorde, c, smoothstep(0.0, 0.55, frente));
    float luz = max(dot(vNormalVista, normalize(vec3(-0.45, 0.6, 0.75))), 0.0);
    gl_FragColor = vec4(c * (0.75 + 0.4 * luz), 1.0);
    #include <colorspace_fragment>
  }
`,lC=`
  varying vec3 vMundo;
  void main() {
    vMundo = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vMundo, 1.0);
  }
`,cC=`
  uniform vec3 uColor;
  varying vec3 vMundo;
  void main() {
    // Distancia del rayo de vista al centro del globo: 1 en el borde, se apaga hacia 1.12.
    vec3 rayo = normalize(vMundo - cameraPosition);
    float d = length(cross(rayo, -cameraPosition));
    float f = pow(clamp(1.0 - (d - 1.0) / 0.12, 0.0, 1.0), 2.5);
    gl_FragColor = vec4(uColor, f * 0.6);
    #include <colorspace_fragment>
  }
`,uC=`
  attribute float aRetraso;
  varying float vT;
  varying float vRetraso;
  void main() {
    vT = uv.x;
    vRetraso = aRetraso;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,hC=`
  uniform float uProgreso;
  uniform float uOpacidad;
  uniform vec3 uColor;
  varying float vT;
  varying float vRetraso;
  void main() {
    float p = clamp((uProgreso - vRetraso) / 1.2, 0.0, 1.0);
    if (vT > p || uOpacidad <= 0.0) discard;
    float cabeza = smoothstep(p - 0.12, p, vT) * step(p, 0.999);
    // Son decenas de arcos: casi transparentes para que se entiendan sin hacer ruido; la cabeza brilla al trazarse.
    gl_FragColor = vec4(uColor, uOpacidad * mix(0.2, 0.55, cabeza));
    #include <colorspace_fragment>
  }
`,hg=class{constructor(t,n,i){this.lienzo=t;this.capa=n;this.paises=i;Wt(this,"renderer");Wt(this,"escena",new eh);Wt(this,"camara",new gn(30,1,.05,50));Wt(this,"globo",new Wa);Wt(this,"granos",[]);Wt(this,"comunes",{uRegion:{value:0},uPop:{value:0},uFoco:{value:-1},uTiempo:{value:0},uEscala:{value:1},uColores:{value:iC},uNatural:{value:0},uTierraNatural:{value:new Bt(Le.tierraNatural)}});Wt(this,"cargado",!1);Wt(this,"oceano");Wt(this,"instancias",{});Wt(this,"tipo","punto");Wt(this,"paleta","azul");Wt(this,"arcos");Wt(this,"etiquetas",[]);Wt(this,"gestos",new AbortController);Wt(this,"actual",{lat:15,lon:-60,dist:9});Wt(this,"parada",{region:0,desde:{lat:15,lon:-60,dist:4.4},hasta:{lat:15,lon:-60,dist:4.4}});Wt(this,"tParada",0);Wt(this,"duracion",8);Wt(this,"desfase",{lat:0,lon:0});Wt(this,"zoom",1);Wt(this,"pop",0);Wt(this,"progresoArcos",0);Wt(this,"foco",-1);Wt(this,"tiempo",0);Wt(this,"reloj",new oh);Wt(this,"visible",!0);Wt(this,"cuadro",0);Wt(this,"arrastre");Wt(this,"pellizco",new Map);Wt(this,"distPellizco",0);Wt(this,"quietud",!1);Wt(this,"desplazamiento",{x:0,y:0});Wt(this,"onInteraccion");this.renderer=new th({canvas:t,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.quietud=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.escena.add(this.globo),this.camara.position.set(0,0,this.actual.dist);let a=new Qe(new pi(1,96,64),new vn({vertexShader:rC,fragmentShader:oC,uniforms:{uOceano:{value:new Bt(Le.oceano)},uBorde:{value:new Bt(Le.noche)},uCuadro:{value:.12}}}));this.oceano=a,this.globo.add(a);let s=new Qe(new pi(1.12,64,48),new vn({vertexShader:lC,fragmentShader:cC,uniforms:{uColor:{value:new Bt(Le.norteamerica)}},transparent:!0,side:ln,depthWrite:!1,blending:Bu}));this.escena.add(s),this.crearEtiquetas(),this.crearArcos(),this.enlazarGestos(),this.renderer.setAnimationLoop(()=>this.dibujar())}async cargar(t){let n=await(await fetch(t)).arrayBuffer(),i=n.byteLength/6,a=new Int16Array(n,0,i),s=new Int16Array(n,i*2,i),r=new Uint8Array(n,i*4,i),o=new Uint8Array(n,i*5,i),l=new Float32Array(i*2),c=new Float32Array(i);for(let d=0;d<i;d++){l[d*2]=a[d]/100*so,l[d*2+1]=s[d]/100*so;let f=Math.sin(d*12.9898)*43758.5453;c[d]=f-Math.floor(f)}this.instancias={aLatLon:new ua(l,2),aRegion:new ua(Float32Array.from(r),1),aPais:new ua(Float32Array.from(o),1),aAzar:new ua(c,1)},this.cargado=!0;let u=this.tipo;this.tipo=void 0,this.setGrano(u??"punto",this.paleta)}geometriaGrano(t,n){let i=dh[t].geometria(),a=new rh;a.index=i.index,a.setAttribute("position",i.getAttribute("position")),a.setAttribute("normal",i.getAttribute("normal"));for(let[s,r]of Object.entries(this.instancias))if(!n)a.setAttribute(s,r);else{let o=new Float32Array(n.length*r.itemSize);n.forEach((l,c)=>o.set(r.array.subarray(l*r.itemSize,(l+1)*r.itemSize),c*r.itemSize)),a.setAttribute(s,new ua(o,r.itemSize))}return a.instanceCount=n?n.length:this.instancias.aAzar.count,a}mallaGrano(t,n){let i=dh[t],a=new Qe(this.geometriaGrano(t,n),new vn({vertexShader:aC,fragmentShader:sC,uniforms:{...this.comunes,uForma:{value:t==="punto"?0:1},uTam:{value:new P(...i.tam)},uGrano:{value:new Bt(i.color[0])},uGranoTostado:{value:new Bt(i.color[1])},uBrillo:{value:i.brillo},uPunta:{value:i.punta}}}));return a.frustumCulled=!1,a}setGrano(t,n){this.paleta=n;let i=n==="natural"&&t!=="punto";if(this.comunes.uNatural.value=i?1:0,this.oceano&&(this.oceano.material.uniforms.uCuadro.value=i?.28:.12),t!==this.tipo&&(this.tipo=t,!!this.cargado)){for(let a of this.granos)this.globo.remove(a),a.geometry.dispose(),a.material.dispose();if(t!=="multigrano")this.granos=[this.mallaGrano(t)];else{let a=Nl.map(()=>[]),s=this.instancias.aAzar.array;for(let r=0;r<s.length;r++){let o=s[r]*31.7%1,l=0;for(let c=Nl[0][1];o>c&&l<Nl.length-1;c+=Nl[++l][1]);a[l].push(r)}this.granos=Nl.map(([r],o)=>this.mallaGrano(r,a[o]))}for(let a of this.granos)this.globo.add(a)}}crearEtiquetas(){this.capa.replaceChildren(),this.etiquetas=this.paises.map((t,n)=>{let i=document.createElement("div");return i.className="pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap font-display text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 md:text-xs",i.innerHTML=`<span class="h-1.5 w-1.5 rounded-full bg-white ring-[3px] ring-white/25"></span><span class="rounded-full bg-globo-noche/70 px-2 py-0.5 backdrop-blur-sm">${t.nombre}</span>`,this.capa.appendChild(i),{i:n,pais:t,el:i,pos:cg(t.lat,t.lon,1.012)}})}crearArcos(){let t=this.paises.find(r=>r.region===Rb);if(!t)return;let n=cg(t.lat,t.lon),i=this.paises.filter(r=>r!==t),a=i.map((r,o)=>{let l=cg(r.lat,r.lon),u=.03+.2*(n.angleTo(l)/Math.PI),d=new hi().setFromUnitVectors(n,l),f=Array.from({length:48},(x,m)=>{let h=m/47;return n.clone().applyQuaternion(new hi().slerp(d,h)).multiplyScalar(1.003+Math.sin(Math.PI*h)*u)}),p=new ah(new Cl(f),48,.0028,5,!1),g=p.getAttribute("position").count;return p.setAttribute("aRetraso",new Ke(new Float32Array(g).fill(o/i.length*1.6),1)),p}),s=Tb(a);s&&(this.arcos=new Qe(s,new vn({vertexShader:uC,fragmentShader:hC,uniforms:{uProgreso:{value:0},uOpacidad:{value:0},uColor:{value:new Bt("#FFFFFF")}},transparent:!0,depthWrite:!1})),this.globo.add(this.arcos))}enlazarGestos(){let t=this.lienzo,{signal:n}=this.gestos;t.addEventListener("pointerdown",a=>{if(this.pellizco.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pellizco.size===1&&(this.arrastre={x:a.clientX,y:a.clientY,id:a.pointerId}),this.pellizco.size===2){let[s,r]=[...this.pellizco.values()];this.distPellizco=Math.hypot(s.x-r.x,s.y-r.y)}},{signal:n}),window.addEventListener("pointermove",a=>{if(this.pellizco.has(a.pointerId)&&this.pellizco.set(a.pointerId,{x:a.clientX,y:a.clientY}),this.pellizco.size===2){let[l,c]=[...this.pellizco.values()],u=Math.hypot(l.x-c.x,l.y-c.y);this.distPellizco>0&&this.acercar(this.distPellizco/u),this.distPellizco=u;return}if(!this.arrastre||this.arrastre.id!==a.pointerId)return;let s=a.clientX-this.arrastre.x,r=a.clientY-this.arrastre.y;if(Math.abs(s)+Math.abs(r)<2)return;let o=40*this.actual.dist/Math.max(320,this.lienzo.clientHeight);this.desfase.lon-=s*o,this.desfase.lat=Math.max(-60,Math.min(60,this.desfase.lat+r*o)),this.arrastre.x=a.clientX,this.arrastre.y=a.clientY,this.onInteraccion?.()},{signal:n});let i=a=>{this.pellizco.delete(a.pointerId),this.arrastre?.id===a.pointerId&&(this.arrastre=void 0),this.pellizco.size<2&&(this.distPellizco=0)};window.addEventListener("pointerup",i,{signal:n}),window.addEventListener("pointercancel",i,{signal:n}),t.addEventListener("wheel",a=>{a.ctrlKey&&(a.preventDefault(),this.acercar(Math.exp(a.deltaY*.01)))},{passive:!1,signal:n})}acercar(t){this.zoom=Math.max(.5,Math.min(1.7,this.zoom*t)),this.onInteraccion?.()}irA(t,n){this.parada=t,this.duracion=n,this.tParada=0,this.desfase={lat:0,lon:0},this.zoom=1,this.pop=0,t.region===0&&(this.progresoArcos=0),this.comunes.uRegion.value=t.region}enfocar(t){this.foco=t}setVisible(t){this.visible=t}ajustar(t){this.desplazamiento=t}dibujar(){let t=Math.min(this.reloj.getDelta(),.05);if(!this.visible)return;let n=this.lienzo.clientWidth,i=this.lienzo.clientHeight;if(!n||!i)return;(this.lienzo.width!==Math.round(n*this.renderer.getPixelRatio())||this.lienzo.height!==Math.round(i*this.renderer.getPixelRatio()))&&this.renderer.setSize(n,i,!1),this.camara.aspect=n/i,this.camara.setViewOffset(n,i,-this.desplazamiento.x*n,-this.desplazamiento.y*i,n,i);let a=this.quietud;this.tiempo+=t,this.tParada+=t;let s=a?1:Math.min(1,this.tParada/this.duracion),r=s*s*(3-2*s),{desde:o,hasta:l,giro:c=0}=this.parada,u={lat:o.lat+(l.lat-o.lat)*r+this.desfase.lat,lon:o.lon+Cb(l.lon-o.lon)*r+(a?0:c*this.tParada)+this.desfase.lon,dist:(o.dist+(l.dist-o.dist)*r)*this.zoom};n<i?u.dist*=Math.pow(i/n,.75):u.dist*=Math.pow(Math.max(1,1.6/(n/i)),.6),u.dist=Math.max(1.32,Math.min(8,u.dist));let d=this.paises[this.foco];if(d&&(u.lat=d.lat,u.lon=d.lon),u.lat=Math.max(-75,Math.min(75,u.lat)),a)this.actual=u;else{let p=this.arrastre?14:2.4;this.actual.lat=ug(this.actual.lat,u.lat,p,t),this.actual.lon+=Cb(u.lon-this.actual.lon)*(1-Math.exp(-p*t)),this.actual.dist=ug(this.actual.dist,u.dist,this.arrastre?8:1.8,t)}this.globo.rotation.set(this.actual.lat*so,-this.actual.lon*so,0,"XYZ"),this.camara.position.set(0,0,this.actual.dist),this.camara.lookAt(0,0,0),this.camara.updateProjectionMatrix(),this.pop=a?1:Math.min(1,this.pop+t/1.6);let f=this.comunes;if(f.uPop.value=this.pop,f.uTiempo.value=this.tiempo,f.uFoco.value=this.foco,f.uEscala.value=.5+.13*this.actual.dist,this.arcos){let p=this.arcos.material.uniforms,g=this.parada.region===0;this.progresoArcos=a?3:this.progresoArcos+t*.9,p.uProgreso.value=this.progresoArcos,p.uOpacidad.value=ug(p.uOpacidad.value,g?1:0,4,t)}this.renderer.render(this.escena,this.camara),(this.cuadro++%2===0||this.arrastre)&&this.moverEtiquetas(n,i)}moverEtiquetas(t,n){this.globo.updateMatrixWorld();let i=this.camara.position,a=[],s=l=>l.i===this.foco?1e6:l.pais.granos,r=[...this.etiquetas].sort((l,c)=>s(c)-s(l)),o=new P;for(let l of r){let c=l.i,d=this.parada.region!==0&&l.pais.region===this.parada.region||c===this.foco||this.parada.region===0&&l.pais.region===Rb;o.copy(l.pos).applyMatrix4(this.globo.matrixWorld);let f=o.clone().normalize().dot(i.clone().sub(o).normalize());o.project(this.camara);let p=(o.x*.5+.5)*t,g=(-o.y*.5+.5)*n,x=l.el.offsetWidth||80,m={x0:p-6,y0:g-12,x1:p+x,y1:g+12},h=a.some(y=>m.x0<y.x1&&m.x1>y.x0&&m.y0<y.y1&&m.y1>y.y0),v=d&&f>.18&&p>0&&p+x<t-8&&g>10&&g<n-10&&(!h||c===this.foco);v&&a.push(m),l.el.style.opacity=v?"1":"0",l.el.style.transform=`translate3d(${p-3}px, ${g-9}px, 0)`}}destruir(){this.renderer.setAnimationLoop(null),this.gestos.abort(),this.renderer.dispose(),this.escena.traverse(t=>{t instanceof Qe&&(t.geometry.dispose(),t.material.dispose())}),this.capa.replaceChildren()}}});var Pb=Vs(j_());var Re="https://www.grupobimbo.com",si="https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/IA25_GB_Celebramos_ESP_VF_28%20de%20septiembre%2026.pdf",pn={pagina:"Informe Anual 2025, \xABNuestra empresa\xBB",url:si},le="Informe Anual 2025 (cierre de 2025)",F1="https://d2rwhogv2mrkk6.cloudfront.net/s3fs-public/reportes-2026/Grupo%20Bimbo%20Reporta%20Resultados%20del%203T26_0.pdf",Ms={pagina:"Reporte de resultados 3T26, \xABAcerca de Grupo Bimbo\xBB",url:F1},Ss="Reporte 3T26 (22 de octubre de 2026)",H1="https://d2rwhogv2mrkk6.cloudfront.net/2026-07/anexos_datos%20desempen%CC%83o_VF%20JULIO.pdf",an=(e,t)=>({pagina:`Informe Anual 2025, p. ${e}`,url:si,dice:t}),ml={fundacion:{id:"fundacion",etiqueta:"A\xF1o de fundaci\xF3n",valor:"1945",estado:"confirmada",fuentes:[{...pn,dice:"comenz\xF3 en 1945 como una peque\xF1a panader\xEDa en M\xE9xico"},{pagina:"Preguntas frecuentes",url:`${Re}/es/faq/generales`,dice:"naci\xF3 en M\xE9xico en 1945"}]},anios:{id:"anios",etiqueta:"A\xF1os de historia",valor:"m\xE1s de 80",unidad:"a\xF1os",estado:"confirmada",nota:"81 a\xF1os en 2026. Cimientos dice \xABSiete d\xE9cadas\xBB: desactualizado.",fuentes:[{pagina:"Nosotros",url:`${Re}/es/nosotros`,dice:"m\xE1s de 80 a\xF1os"},{...pn,dice:"Durante ocho d\xE9cadas"}]},paisesOperacion:{id:"paisesOperacion",etiqueta:"Pa\xEDses donde operamos",valor:"39",unidad:"pa\xEDses",estado:"confirmada",corte:Ss,nota:"Marcas dice \xABm\xE1s de 39\xBB en un titular; el resto del sitio y el informe dicen 39.",fuentes:[{...Ms,dice:"opera directamente en 39"},{...pn,dice:"operamos directamente en 39"},{pagina:"Nosotros",url:`${Re}/es/nosotros`,dice:"operamos directamente en 39"}]},paisesPresencia:{id:"paisesPresencia",etiqueta:"Pa\xEDses a los que llegan nuestros productos",valor:"102",unidad:"pa\xEDses",estado:"confirmada",corte:Ss,nota:"\xDAltimo reporte: 102 (39 directos + 63 con socios). El Informe Anual 2025 dice 93 al cierre de 2025 y Nosotros dice 96; Nosotros debe actualizarse.",fuentes:[{...Ms,dice:"Tiene presencia en 102 pa\xEDses alrededor del mundo, de los cuales opera directamente en 39 y sirve a otros 63"},{...pn,dice:"Tenemos presencia en 93 pa\xEDses, operamos directamente en 39 y atendemos otros 54"},{pagina:"Nosotros",url:`${Re}/es/nosotros`,dice:"presencia en 96 pa\xEDses"},{pagina:"Inversionistas \u203A Qui\xE9nes somos",url:`${Re}/es/inversionistas/quienes-somos`,dice:"presencia en 102 pa\xEDses"}]},panaderias:{id:"panaderias",etiqueta:"Panader\xEDas y botaneras",valor:"250",estado:"confirmada",corte:Ss,nota:"\xDAltimo reporte: 250 \xABpanader\xEDas y botaneras\xBB. El Informe Anual 2025 dice 249 \xABpanader\xEDas y plantas\xBB al cierre de 2025 (75 en Norteam\xE9rica, 38 en M\xE9xico, 94 en EAA y 42 en Latinoam\xE9rica). El sitio tambi\xE9n dice 251 y 214.",fuentes:[{...Ms,dice:"cuenta con 250 panader\xEDas y botaneras"},{...pn,dice:"contamos con 249 panader\xEDas y plantas"},{pagina:"Nosotros",url:`${Re}/es/nosotros`,dice:"251 panader\xEDas y plantas"},{pagina:"Inversionistas \u203A Qui\xE9nes somos",url:`${Re}/es/inversionistas/quienes-somos`,dice:"250 panader\xEDas y botaneras"},{pagina:"Marcas (texto alternativo de la infograf\xEDa)",url:`${Re}/es/marcas`,dice:"214 panader\xEDas"}]},colaboradores:{id:"colaboradores",etiqueta:"Colaboradores",valor:"m\xE1s de 152,000",estado:"confirmada",corte:Ss,nota:"\xDAltimo reporte: m\xE1s de 152,000, igual que la Home y \xDAnete. El Informe Anual 2025 dice m\xE1s de 153,000 al cierre de 2025 (por regi\xF3n: +26 mil en Norteam\xE9rica, +77 mil en M\xE9xico, +18 mil en EAA y +28 mil en Latinoam\xE9rica).",fuentes:[{...Ms,dice:"m\xE1s de 152,000 colaboradores"},{...pn,dice:"m\xE1s de 153,000 colaboradores"},{pagina:"\xDAnete",url:`${Re}/es/unete-a-nuestro-equipo`,dice:"m\xE1s de 152 mil personas"}]},marcas:{id:"marcas",etiqueta:"Marcas",valor:"m\xE1s de 100",unidad:"marcas",estado:"confirmada",fuentes:[{...pn,dice:"m\xE1s de 100 marcas"},{pagina:"Home",url:`${Re}/es`,dice:"m\xE1s de 100 marcas"}]},productos:{id:"productos",etiqueta:"Productos",valor:"m\xE1s de 9,000",unidad:"productos",estado:"confirmada",corte:le,nota:"Inversionistas dice \xABM\xE1s de 10mil productos\xBB.",fuentes:[{...pn,dice:"m\xE1s de 9,000 productos"},{pagina:"Inversionistas \u203A Qui\xE9nes somos",url:`${Re}/es/inversionistas/quienes-somos`,dice:"M\xE1s de 10mil productos"}]},centrosVenta:{id:"centrosVenta",etiqueta:"Centros de ventas",valor:"m\xE1s de 1,600",estado:"confirmada",corte:Ss,nota:"\xDAltimo reporte: m\xE1s de 1,600, igual que Nosotros e Inversionistas. El Informe Anual 2025 dice m\xE1s de 1,700 al cierre de 2025.",fuentes:[{...Ms,dice:"m\xE1s de 1,600 centros de ventas"},{...pn,dice:"m\xE1s de 1,700 centros de ventas"},{pagina:"Nosotros",url:`${Re}/es/nosotros`,dice:"m\xE1s de 1,600 centros de ventas"}]},rutas:{id:"rutas",etiqueta:"Rutas de distribuci\xF3n",valor:"m\xE1s de 54,000",unidad:"rutas",estado:"confirmada",corte:Ss,fuentes:[{...Ms,dice:"m\xE1s de 54,000 rutas"},{...pn,dice:"m\xE1s de 54,000 rutas"},{pagina:"Inversionistas \u203A Qui\xE9nes somos",url:`${Re}/es/inversionistas/quienes-somos`,dice:"m\xE1s de 54,000 rutas"}]},ventas:{id:"ventas",etiqueta:"Ventas netas \xFAltimos 12 meses",valor:"Ps. 420,168 millones",estado:"confirmada",corte:"3T26, \xFAltimos 12 meses",fuentes:[{pagina:"Inversionistas \u203A Qui\xE9nes somos",url:`${Re}/es/inversionistas/quienes-somos`,dice:"Ventas Netas U12M 3T26 de Ps. $420,168 millones"}]},emisionesMeta:{id:"emisionesMeta",etiqueta:"Meta de cero emisiones de carbono",valor:"2050",estado:"confirmada",nota:"El informe dice \xABemisiones cero\xBB y \xABCero Emisiones de Carbono\xBB, nunca \xABnetas\xBB; el sitio actual s\xED dice \xABnetas\xBB.",fuentes:[{pagina:"Informe Anual 2025, \xABAvanzando hacia cero emisiones de carbono\xBB",url:si,dice:"Reforzamos nuestro compromiso de alcanzar emisiones cero al 2050"},{pagina:"Sustentabilidad",url:`${Re}/es/sustentabilidad`,dice:"alcanzar emisiones netas cero para 2050"}]},agriculturaMeta:{id:"agriculturaMeta",etiqueta:"Meta de agricultura regenerativa",valor:"100% de ingredientes clave en 2050",estado:"confirmada",nota:"Ingredientes clave: trigo, ma\xEDz, papa y az\xFAcar (Informe Anual 2025, p. 111). La meta intermedia de 2030 (mantener 200 mil hect\xE1reas) ya se super\xF3 con m\xE1s de 500 mil.",fuentes:[{pagina:"Prensa",url:`${Re}/es/prensa`,dice:"que el 100% de sus ingredientes clave provenga de tierras cultivadas bajo pr\xE1cticas regenerativas"}]},hectareas:{id:"hectareas",etiqueta:"Hect\xE1reas con agricultura regenerativa",valor:"m\xE1s de 500 mil",estado:"confirmada",corte:le,fuentes:[{...pn,dice:"M\xE1s de 500 mil hect\xE1reas se cultivan con pr\xE1cticas de agricultura regenerativa"},{pagina:"Sustentabilidad (metadatos)",url:`${Re}/es/sustentabilidad`,dice:"+500 mil hect\xE1reas con agricultura regenerativa"}]},empaques:{id:"empaques",etiqueta:"Empaques dise\xF1ados para ser reciclables",valor:"99%",estado:"confirmada",corte:le,nota:"La meta de 2025 era 100% reciclables, biodegradables o compostables. El informe precisa que el 99% est\xE1 \xABdise\xF1ado para cumplir con est\xE1ndares de reciclabilidad\xBB: que se recicle depende de la infraestructura de cada pa\xEDs.",fuentes:[{...pn,dice:"El 99% de nuestros empaques son reciclables"},an(85,"99% de nuestros empaques est\xE1n dise\xF1ados para cumplir con est\xE1ndares de reciclabilidad")]},energia:{id:"energia",etiqueta:"Electricidad renovable seg\xFAn los criterios de RE100",valor:"99%",estado:"confirmada",corte:le,nota:"Decidido 3 nov 2026: se publica 99%. Es electricidad, no toda la energ\xEDa. El 1% restante est\xE1 en pa\xEDses sin acceso a electricidad renovable local (Ucrania, Venezuela, T\xFAnez, Nicaragua, Corea del Sur) y se respalda con certificados comprados en otros mercados; por eso la carta del informe dice \xAB100%*\xBB, con asterisco \xABen proceso de validaci\xF3n por un tercero\xBB. Si Bimbo prefiere el 100%, el texto debe decir \xABrespaldamos\xBB y explicar los certificados. Los metadatos de Sustentabilidad dicen \xAB100% energ\xEDa renovable\xBB: hay que corregirlos.",fuentes:[{pagina:"Informe Anual 2025, anexo Datos de Desempe\xF1o, p. 27",url:H1,dice:"alcanzamos 99% de electricidad renovable a nivel global, en conformidad con los requisitos y criterios establecidos por RE100"},an(12,"El 100%* del consumo de energ\xEDa el\xE9ctrica, respecto a la l\xEDnea base de 2020, proviene de fuentes renovables"),{pagina:"Sustentabilidad (metadatos)",url:`${Re}/es/sustentabilidad`,dice:"100% energ\xEDa renovable"}]},reusoAgua:{id:"reusoAgua",etiqueta:"Re\xFAso de agua tratada en servicios",valor:"100%",estado:"confirmada",corte:le,nota:"Alcance: agua tratada que se re\xFAsa en servicios fuera de proceso (riego, lavado de veh\xEDculos, ba\xF1os), respecto a la l\xEDnea base de 2020. No es todo el consumo de agua.",fuentes:[an(12,"Alcanzamos 100% de re\xFAso de agua respecto a la l\xEDnea base de 2020")]},vehiculosElectricos:{id:"vehiculosElectricos",etiqueta:"Veh\xEDculos el\xE9ctricos",valor:"m\xE1s de 4,000",estado:"confirmada",corte:le,fuentes:[{...pn,dice:"M\xE1s de 4,000 veh\xEDculos el\xE9ctricos forman parte de nuestras operaciones"}]},ventasUSD:{id:"ventasUSD",etiqueta:"Ventas anuales",valor:"m\xE1s de US$23 mil millones",estado:"confirmada",corte:Ss,nota:"El Informe Anual 2025 dice \xABsuperiores a los US$22 mil millones\xBB al cierre de 2025.",fuentes:[{...Ms,dice:"Con Ventas anuales superiores a los US$23 mil millones"},{...pn,dice:"Con Ventas superiores a los US$22 mil millones"}]},innovacion:{id:"innovacion",etiqueta:"\xCDndice de innovaci\xF3n",valor:"m\xE1s de 12%",estado:"confirmada",corte:le,nota:"La carta del informe no define el \xEDndice: no explicarlo como \xABventas de productos nuevos\xBB sin confirmarlo. Ejemplos del a\xF1o: Artesano Masa Madre, pan brioche Plus Vita en Brasil, media hogaza y Open Top.",fuentes:[an(9,"Nuestro \xEDndice de innovaci\xF3n super\xF3 el 12%")]},ventasHSR:{id:"ventasHSR",etiqueta:"Ventas de productos con 3.5 estrellas o m\xE1s (Health Star Rating)",valor:"48%",estado:"confirmada",corte:le,nota:"La meta era 50% en 2025 y no se alcanz\xF3: el informe espera cerrar la brecha en 2026. Decir \xAB48%\xBB y la meta, nunca \xABla mitad\xBB.",fuentes:[an(11,"48% de nuestras ventas provienen de productos que cumplen o superan est\xE1ndares \xF3ptimos de nutrici\xF3n de acuerdo con el sistema Health Star Rating")]},ventasHSRMeta:{id:"ventasHSRMeta",etiqueta:"Meta 2025 de ventas con 3.5 estrellas o m\xE1s",valor:"50%",estado:"confirmada",nota:"No alcanzada (48%). El informe espera cerrar la brecha en 2026.",fuentes:[an(31,"50% de las ventas totales netas de productos con HSR \u2265 3.5 estrellas")]},sinColorantes:{id:"sinColorantes",etiqueta:"Consumo diario sin colorantes artificiales",valor:"100%",estado:"confirmada",corte:le,nota:"Solo el portafolio de consumo diario (pan de caja, boller\xEDa, tortillas, bagels). El resto del portafolio, a finales de 2026.",fuentes:[an(11,"100% del portafolio de consumo diario ya est\xE1 libre de colorantes artificiales y 99% libre de saborizantes artificiales")]},buenVecino:{id:"buenVecino",etiqueta:"Proyectos Buen Vecino",valor:"m\xE1s de 270",estado:"confirmada",corte:le,nota:"Proyectos con las comunidades vecinas de nuestros centros de trabajo, en 32 pa\xEDses (p. 56).",fuentes:[an(12,"Impulsamos m\xE1s de 270 proyectos de Buen Vecino en las comunidades donde operamos")]},reconocimientos:{id:"reconocimientos",etiqueta:"Premios y reconocimientos en 2025",valor:"m\xE1s de 90",estado:"confirmada",corte:le,fuentes:[an(24,"En 2025, Grupo Bimbo recibi\xF3 m\xE1s de 90 premios y reconocimientos a nivel global")]},ventas2025:{id:"ventas2025",etiqueta:"Ventas netas 2025",valor:"Ps. 426,952 millones",estado:"confirmada",corte:le,nota:"R\xE9cord; 4.6% m\xE1s que en 2024 (la carta redondea a 5%).",fuentes:[an(7,"VENTAS NETAS +4.6% VS. 2024 \xB7 2025 $426,952 mdp")]},uafida2025:{id:"uafida2025",etiqueta:"UAFIDA Ajustada 2025",valor:"Ps. 59,456 millones",estado:"confirmada",corte:le,nota:"R\xE9cord; 7.2% m\xE1s que en 2024. Usar el nombre exacto \xABUAFIDA Ajustada\xBB.",fuentes:[an(7,"UAFIDA AJUSTADA +7.2% VS. 2024 \xB7 2025 $59,456 mdp")]},apalancamiento:{id:"apalancamiento",etiqueta:"Apalancamiento al cierre de 2025",valor:"2.7 veces",estado:"confirmada",corte:le,fuentes:[an(11,"redujimos nuestro nivel de apalancamiento a 2.7 veces")]},retornoAccionistas:{id:"retornoAccionistas",etiqueta:"Retorno a accionistas en 2025",valor:"Ps. 5,569 millones",estado:"confirmada",corte:le,nota:"Dividendos y recompra de acciones.",fuentes:[an(11,"regresamos $5,569 millones de pesos a nuestros accionistas mediante dividendos y recompra de acciones")]},ceroCeroPaises:{id:"ceroCeroPaises",etiqueta:"Pa\xEDses con Cero Cero",valor:"16",unidad:"pa\xEDses",estado:"confirmada",corte:le,fuentes:[an(10,"Cero Cero contin\xFAa consolid\xE1ndose internacionalmente y ya est\xE1 presente en 16 pa\xEDses")]},panBimboPaises:{id:"panBimboPaises",etiqueta:"Pa\xEDses con Pan Blanco y Pan Integral Bimbo",valor:"12",unidad:"pa\xEDses",estado:"confirmada",corte:le,fuentes:[an(10,"el Pan Blanco y el Pan Integral Bimbo hoy llegan a 12 pa\xEDses")]},horasCapacitacion:{id:"horasCapacitacion",etiqueta:"Horas de capacitaci\xF3n por colaborador",valor:"28",unidad:"horas al a\xF1o en promedio",estado:"confirmada",corte:le,fuentes:[an(71,"En 2025 dimos en promedio 28 horas de capacitaci\xF3n por colaborador")]},mujeresLiderazgo:{id:"mujeresLiderazgo",etiqueta:"Mujeres en posiciones de liderazgo",valor:"m\xE1s del 30%",estado:"confirmada",corte:le,nota:"Solo puestos de liderazgo; la meta es 40% en 2030. Las mujeres son el 25% de la n\xF3mina total: no mezclar las dos cifras.",fuentes:[{...pn,dice:"m\xE1s del 30% de participaci\xF3n de mujeres en posiciones de liderazgo"}]},bgr:{id:"bgr",etiqueta:"Bimbo Global Race 2026",valor:"29 ciudades de 23 pa\xEDses",estado:"confirmada",corte:"Comunicado del 30 de septiembre de 2026",nota:"Se toma el comunicado m\xE1s reciente. Marcas dice 28 ciudades de 22 pa\xEDses (probablemente la edici\xF3n anterior).",fuentes:[{pagina:"Prensa",url:`${Re}/es/prensa`,dice:"29 ciudades de 23 pa\xEDses"},{pagina:"Marcas",url:`${Re}/es/marcas`,dice:"22 pa\xEDses y 28 ciudades"}]},mexicoColaboradores:{id:"mexicoColaboradores",etiqueta:"Colaboradores en M\xE9xico",valor:"m\xE1s de 77,000",estado:"confirmada",corte:le,nota:"Las preguntas frecuentes dicen \xABm\xE1s de 78,000\xBB.",fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"COLABORADORES +77k (M\xE9xico)"},{pagina:"Preguntas frecuentes",url:`${Re}/es/faq/generales`,dice:"m\xE1s de 78,000 personas en M\xE9xico"}]},mexicoPlantas:{id:"mexicoPlantas",etiqueta:"Panader\xEDas y plantas en M\xE9xico",valor:"38",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"PANADER\xCDAS Y PLANTAS 38 (M\xE9xico)"},{pagina:"Preguntas frecuentes",url:`${Re}/es/faq/generales`,dice:"38 plantas de producci\xF3n en M\xE9xico"}]},norteamericaPlantas:{id:"norteamericaPlantas",etiqueta:"Panader\xEDas y plantas en Norteam\xE9rica",valor:"75",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"PANADER\xCDAS Y PLANTAS 75 (Norteam\xE9rica)"}]},norteamericaColaboradores:{id:"norteamericaColaboradores",etiqueta:"Colaboradores en Norteam\xE9rica",valor:"m\xE1s de 26,000",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"COLABORADORES +26k (Norteam\xE9rica)"}]},latamPlantas:{id:"latamPlantas",etiqueta:"Panader\xEDas y plantas en Latinoam\xE9rica",valor:"42",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"PANADER\xCDAS Y PLANTAS 42 (Latinoam\xE9rica)"}]},latamColaboradores:{id:"latamColaboradores",etiqueta:"Colaboradores en Latinoam\xE9rica",valor:"m\xE1s de 28,000",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"COLABORADORES +28k (Latinoam\xE9rica)"}]},eaaPlantas:{id:"eaaPlantas",etiqueta:"Panader\xEDas y plantas en EAA",valor:"94",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"PANADER\xCDAS Y PLANTAS 94 (EAA)"}]},eaaColaboradores:{id:"eaaColaboradores",etiqueta:"Colaboradores en EAA",valor:"m\xE1s de 18,000",estado:"confirmada",corte:le,fuentes:[{pagina:"Informe Anual 2025, presencia por regi\xF3n",url:si,dice:"COLABORADORES +18k (EAA)"}]}},TC=Object.values(ml).filter(e=>e.estado==="por-confirmar");var V1={slug:"inicio",nombre:"Inicio",ruta:"/",meta:{title:"Grupo Bimbo | Alimentamos un mundo mejor",description:"La empresa de panificaci\xF3n m\xE1s grande del mundo: {marcas} marcas, operaci\xF3n directa en {paisesOperacion} pa\xEDses y metas p\xFAblicas de sustentabilidad."},audiencias:["todas"],secciones:[{id:"hero",tipo:"hero",rotulo:"Grupo Bimbo \xB7 desde {fundacion}",titular:"Alimentamos un mundo mejor",bajada:"Somos la empresa de panificaci\xF3n m\xE1s grande del mundo y un jugador relevante en botanas. Hacemos pan, pan dulce, pastelitos, galletas, tortillas y botanas en {paisesOperacion} pa\xEDses, y nuestros productos llegan a {paisesPresencia}.",ctas:[{texto:"Explora nuestras marcas",destino:"/wireframes/marcas"},{texto:"Conoce nuestra estrategia",destino:"/wireframes/sustentabilidad"}],medio:"Video a sangre: del horno a la mesa, sin audio. P\xF3ster inmediato; versi\xF3n vertical para tel\xE9fono. Sin carrusel autom\xE1tico.",nota:"Reemplaza el carrusel actual (alt vac\xEDo, controles en dos idiomas, sin pausa visible). El H1 es el prop\xF3sito, no \xAB\xDAltimas noticias\xBB. La bajada sigue la frase oficial del reporte 3T26 (\xABempresa de panificaci\xF3n l\xEDder y m\xE1s grande del mundo y un jugador relevante en snacks\xBB); \xABhornear\xBB no aplica a las botanas."},{id:"accesos",tipo:"distribuidor",titulo:"\xBFQu\xE9 est\xE1s buscando?",rutas:[{audiencia:"Inversionistas",texto:"Resultados trimestrales, reportes anuales y gobierno corporativo.",cta:{texto:"Ver el \xFAltimo reporte",destino:"/wireframes/inversionistas"}},{audiencia:"Carreras",texto:"Vacantes en los {paisesOperacion} pa\xEDses donde operamos.",cta:{texto:"Buscar vacantes",destino:"/wireframes/carreras"}},{audiencia:"Marcas",texto:"Encuentra una marca por pa\xEDs o categor\xEDa.",cta:{texto:"Abrir el directorio",destino:"/wireframes/marcas"}},{audiencia:"Prensa",texto:"Comunicados, noticias y kit de medios.",cta:{texto:"Ir a la sala de prensa",destino:"/wireframes/prensa"}},{audiencia:"Proveedores",texto:"Registro, portal y pol\xEDticas para proveedores.",cta:{texto:"Ir al portal",destino:"https://proveedores.grupobimbo.com/"}},{audiencia:"Contacto",texto:"Dudas sobre un producto, denuncias \xE9ticas y m\xE1s.",cta:{texto:"Elegir un canal",destino:"/wireframes/contacto"}}],nota:"Fila de accesos en el primer pantallazo bajo el hero. En tel\xE9fono, lista de 6 renglones."},{id:"cifras",tipo:"cifras",titulo:"Bimbo en cifras",ids:["paisesOperacion","panaderias","marcas","colaboradores"],nota:"Contadores al entrar en pantalla. Cada cifra muestra su fecha de corte; todas salen de content/cifras.ts."},{id:"mision",tipo:"texto",rotulo:"Nuestra misi\xF3n",titulo:"Alimentos deliciosos y nutritivos en las manos de todos",parrafos:["Esa es nuestra misi\xF3n desde {fundacion}, cuando seis emprendedores encabezados por Lorenzo Servitje abrieron una panader\xEDa en la colonia Santa Mar\xEDa Insurgentes, con 34 colaboradores y cuatro productos. Hoy son {productos}, y la filosof\xEDa es la misma: ser una empresa sustentable, altamente productiva y plenamente humana."],cta:{texto:"Conoce qui\xE9nes somos",destino:"/wireframes/nosotros"},nota:"Texto grande que se revela por palabras con el scroll. Fundaci\xF3n, 34 colaboradores y cuatro productos: Informe Anual 2025, pp. 8 y 14."},{id:"ciclo",tipo:"etapas",titulo:"Del campo a tu mesa",intro:"Cinco etapas, una sola operaci\xF3n.",items:[{titulo:"Campo",texto:"Trabajamos con agricultores para que el trigo, el ma\xEDz, la papa y el az\xFAcar vengan de agricultura regenerativa. Hoy son {hectareas} hect\xE1reas; la meta es {agriculturaMeta}."},{titulo:"Panader\xEDas",texto:"Producimos en {panaderias} panader\xEDas y botaneras de cuatro continentes."},{titulo:"Distribuci\xF3n",texto:"Una de las redes de distribuci\xF3n directa m\xE1s grandes del mundo: {rutas} rutas y {centrosVenta} centros de ventas."},{titulo:"Tiendas",texto:"De la tienda de la esquina al supermercado, en {paisesPresencia} pa\xEDses."},{titulo:"Tu mesa",texto:"{marcas} marcas para cada momento del d\xEDa, del desayuno a la cena."}],nota:"Secci\xF3n \xABciclo completo\xBB: avanza sola cada 3.4 s, se pausa con el cursor y con un bot\xF3n visible (WCAG 2.2.2)."},{id:"marcas",tipo:"tarjetas",rotulo:"Nuestras marcas",titulo:"{marcas} marcas, una para cada momento del d\xEDa",items:[{titulo:"Bimbo",texto:"Pan de caja y boller\xEDa"},{titulo:"Marinela",texto:"Pastelitos y galletas"},{titulo:"Barcel \xB7 Takis",texto:"Botanas saladas"},{titulo:"Thomas'",texto:"English muffins y bagels"},{titulo:"Entenmann's",texto:"Pan dulce y reposter\xEDa"},{titulo:"Oroweat",texto:"Pan de granos enteros"},{titulo:"Sara Lee",texto:"Pan de caja"},{titulo:"Donuts",texto:"Boller\xEDa"}],columnas:4,nota:"Logos reales con texto alternativo. Cada tarjeta enlaza al sitio de la marca (enlace verificado en el cat\xE1logo). Categor\xEDas por confirmar con el cat\xE1logo."},{id:"sustentabilidad",tipo:"tarjetas",rotulo:"Sustentabilidad",titulo:"Metas p\xFAblicas, y cu\xE1nto llevamos",intro:"En 2021 lanzamos nuestra estrategia de sustentabilidad, con tres pilares y una base com\xFAn. Cada a\xF1o publicamos lo que avanzamos y lo que nos falta.",items:[{titulo:"Para Ti",texto:"Mejores perfiles nutrimentales: el {ventasHSR} de nuestras ventas viene de productos con 3.5 estrellas o m\xE1s en el Health Star Rating.",cta:{texto:"Ver Para Ti",destino:"/wireframes/sustentabilidad#para-ti"}},{titulo:"Para la Vida",texto:"Comunidades m\xE1s fuertes y un trabajo seguro e incluyente: {buenVecino} proyectos Buen Vecino en 2025.",cta:{texto:"Ver Para la Vida",destino:"/wireframes/sustentabilidad#para-la-vida"}},{titulo:"Para la Naturaleza",texto:"Vamos hacia cero desperdicios, cero emisiones de carbono en {emisionesMeta} y agricultura regenerativa.",cta:{texto:"Ver Para la Naturaleza",destino:"/wireframes/sustentabilidad#para-la-naturaleza"}}],columnas:3,nota:"Los tres pilares con su nombre oficial y un dato cada uno. Tono de camino, no de logro: \xABvamos hacia\xBB, nunca \xABlogramos\xBB. Se quit\xF3 \xABbien pagado\xBB: el informe dice que no busca una meta fija de paridad salarial (p. 81). Reemplaza la imagen con texto incrustado y las tres anclas que hoy van al mismo lugar."},{id:"presencia",tipo:"texto",rotulo:"Presencia",titulo:"Operamos en {paisesOperacion} pa\xEDses de cuatro continentes",parrafos:["Y con socios estrat\xE9gicos, nuestros productos llegan a {paisesPresencia} pa\xEDses."],cta:{texto:"Ver pa\xEDses y marcas",destino:"/wireframes/marcas"},nota:"Mapa de relieve en nube de puntos (skill mapa-relieve) con los 39 pa\xEDses; clic en un pa\xEDs abre sus marcas."},{id:"noticias",tipo:"noticias",titulo:"Lo m\xE1s reciente",cantidad:3,cta:{texto:"Ver todos los comunicados",destino:"/wireframes/prensa"},nota:"Tres notas del CMS con fecha, categor\xEDa e imagen con texto alternativo."},{id:"reconocimientos",tipo:"lista",titulo:"Reconocimientos",intro:"En 2025 recibimos {reconocimientos} premios y reconocimientos. Estos son los m\xE1s recientes.",items:["Forbes \xB7 World's Best Employers 2026","Ethisphere \xB7 World's Most Ethical Companies, por d\xE9cima vez","Merco \xB7 Empresa con mejor reputaci\xF3n de M\xE9xico","TIME \xB7 Una de las mejores empresas del mundo [a\xF1o por confirmar]"],nota:"Un solo componente de sellos con a\xF1o; sustituye el sello Forbes 2024 del pie."},{id:"cta",tipo:"cta",titular:"\xBFQuieres hablar con nosotros?",texto:"Cu\xE9ntanos qui\xE9n eres y te llevamos al canal correcto.",ctas:[{texto:"Ir a Contacto",destino:"/wireframes/contacto"}]}]},G1={slug:"nosotros",nombre:"Nosotros",ruta:"/nosotros",meta:{title:"Qui\xE9nes somos | Grupo Bimbo",description:"Nuestra filosof\xEDa, misi\xF3n, prop\xF3sito y creencias; la historia desde {fundacion}, los fundadores y el equipo que dirige Grupo Bimbo."},audiencias:["todas","inversionistas","candidatos","prensa"],secciones:[{id:"hero",tipo:"hero",rotulo:"Nosotros",titular:"Una panader\xEDa de {fundacion} que hoy opera en {paisesOperacion} pa\xEDses",bajada:"Somos {colaboradores} colaboradores. Esto es lo que creemos y c\xF3mo llegamos hasta aqu\xED.",medio:"Foto de archivo de la primera panader\xEDa junto a una planta actual."},{id:"identidad",tipo:"tarjetas",titulo:"Lo que nos gu\xEDa",items:[{titulo:"Filosof\xEDa",texto:"Ser una empresa sustentable, altamente productiva y plenamente humana."},{titulo:"Misi\xF3n",texto:"Alimentos deliciosos y nutritivos en las manos de todos."},{titulo:"Prop\xF3sito",texto:"Alimentamos un mundo mejor."}],columnas:3,nota:"Redacci\xF3n oficial del Informe Anual 2025 (p. 6). En el sitio actual solo existe dentro del texto alternativo de una imagen, y con otra redacci\xF3n (\xABTener alimentos\u2026\xBB, \xABalimentar un mundo mejor\xBB)."},{id:"creencias",tipo:"lista",titulo:"Nuestras creencias",intro:"Siete creencias gu\xEDan c\xF3mo trabajamos.",items:["Valoramos a la persona.","Somos una comunidad.","Conseguimos resultados.","Competimos y ganamos con calidad superior.","Somos operadores eficaces.","Actuamos con integridad.","Trascendemos y permanecemos en el tiempo."],nota:"Redacci\xF3n literal del Informe Anual 2025 (p. 6); el sitio actual dice \xABoperadores eficientes\xBB. Se quitaron las frases de apoyo que hab\xEDamos redactado: si Bimbo quiere una explicaci\xF3n por creencia, la escribe o valida el \xE1rea de Cultura."},{id:"cifras",tipo:"cifras",titulo:"Hoy",ids:["paisesOperacion","paisesPresencia","panaderias","centrosVenta","rutas","productos","ventasUSD"]},{id:"categorias",tipo:"lista",titulo:"Qu\xE9 hacemos",items:["Pan de caja y artesanal","Boller\xEDa","Pan dulce","Pastelitos","Galletas","Pan tostado","English muffins","Bagels","Tortillas y flatbread","Botanas saladas"]},{id:"historia",tipo:"eras",titulo:"{anios} a\xF1os en ocho eras",items:[{periodo:"1945\u20131950",titulo:"Una panader\xEDa y un pan envuelto en celof\xE1n",texto:"Seis emprendedores encabezados por Lorenzo Servitje fundan Panificaci\xF3n Bimbo con 34 colaboradores y lanzan un pan de caja envuelto, novedad en la Ciudad de M\xE9xico."},{periodo:"1950\u20131960",titulo:"Nace Marinela",texto:"Llegan las donas, los Bimbollos, las Medias Noches y los primeros pastelitos."},{periodo:"1960\u20131970",titulo:"La primera gran reorganizaci\xF3n",texto:"Lorenzo Servitje asume la Direcci\xF3n General y la empresa se profesionaliza."},{periodo:"1970\u20131980",titulo:"La planta m\xE1s grande de Am\xE9rica Latina",texto:"Construimos la panificadora m\xE1s grande de la regi\xF3n y una de las diez m\xE1s grandes del mundo."},{periodo:"1980\u20131990",titulo:"Empresa p\xFAblica",texto:"El 15% de las acciones empieza a cotizar en la Bolsa Mexicana de Valores."},{periodo:"1990\u20132000",titulo:"Rumbo a Latinoam\xE9rica",texto:"La Organizaci\xF3n Latinoam\xE9rica lleva nuestras panader\xEDas m\xE1s all\xE1 de M\xE9xico."},{periodo:"2000\u20132010",titulo:"Un nuevo continente",texto:"Llegamos a Asia, a la costa oeste de Estados Unidos y sumamos El Globo y Chocolates La Corona."},{periodo:"2010\u2013hoy",titulo:"La panificadora m\xE1s grande del mundo",texto:"Sumamos operaciones en Norteam\xE9rica, Europa, \xC1frica y Asia y en 2021 lanzamos nuestra estrategia de sustentabilidad. En 2025 cumplimos 80 a\xF1os y abrimos MiBIMBO, un museo interactivo en la Ciudad de M\xE9xico."}],nota:"L\xEDnea por eras con fotos de archivo. Cada era abre las historias que hoy existen como notas sueltas."},{id:"fundadores",tipo:"tarjetas",titulo:"Fundadores",items:[{titulo:"Lorenzo Servitje",texto:"[semblanza por migrar]"},{titulo:"Roberto Servitje",texto:"[semblanza por migrar]"},{titulo:"Jaime Sendra",texto:"[semblanza por migrar]"},{titulo:"Alfonso Velasco",texto:"[semblanza por migrar]"},{titulo:"Jos\xE9 T. Mata",texto:"[semblanza por migrar]"},{titulo:"Jaime Jorba",texto:"[semblanza por migrar]"}],columnas:3},{id:"liderazgo",tipo:"tarjetas",titulo:"Liderazgo",items:[{titulo:"Daniel Servitje",texto:"Presidente Ejecutivo de Grupo Bimbo."},{titulo:"Alejandro Rodr\xEDguez Bas",texto:"Director General desde noviembre de 2025. Encabeza el Comit\xE9 Directivo; antes dirigi\xF3 Barcel Global."},{titulo:"Comit\xE9 Directivo",texto:"Diego Gaxiola Cuevas (Administraci\xF3n y Finanzas), Juan Muldoon Barrena (Personas), Ra\xFAl Ignacio Obreg\xF3n Servitje y Fernando Lerdo de Tejada Servitje (directores generales adjuntos), Jos\xE9 Manuel Gonz\xE1lez Guzm\xE1n (Bimbo M\xE9xico), Jorge Guillermo Z\xE1rate Lupercio (Cadena de Suministro), Greg Kohersen (Bimbo Bakeries USA) y Alejandro Pintado (Barcel M\xE9xico)."}],columnas:3,nota:"Cargos del Informe Anual 2025 (pp. 13 y 142); confirmar vigencia con Bimbo antes de publicar. Semblanzas profesionales y fotos por migrar, sin datos personales."},{id:"cta",tipo:"cta",titular:"Trabaja con nosotros",texto:"Buscamos personas que quieran alimentar un mundo mejor.",ctas:[{texto:"Ver vacantes",destino:"/wireframes/carreras"}]}]},k1={slug:"marcas",nombre:"Marcas",ruta:"/marcas",meta:{title:"Nuestras marcas | Grupo Bimbo",description:"{marcas} marcas en {paisesOperacion} pa\xEDses: Bimbo, Marinela, Barcel, Takis, Thomas', Oroweat y m\xE1s. Busca por pa\xEDs o categor\xEDa."},audiencias:["consumidores","prensa","clientes"],secciones:[{id:"hero",tipo:"hero",rotulo:"Marcas",titular:"{marcas} marcas, una para cada momento del d\xEDa",bajada:"Busca por pa\xEDs, regi\xF3n o categor\xEDa y llega directo al sitio de cada marca."},{id:"directorio",tipo:"directorio",titulo:"Directorio de marcas",intro:"Escribe el nombre de una marca o usa los filtros.",filtros:["Regi\xF3n","Pa\xEDs","Categor\xEDa"],muestra:["Bimbo","Marinela","Barcel","Takis","T\xEDa Rosa","Wonder","Oroweat","Thomas'","Entenmann's","Sara Lee","Arnold","Dempster's","Pullman","Plus Vita","Ideal","Donuts","Bollycao","New York Bakery Co."],nota:"Alimentado por un cat\xE1logo \xFAnico de marcas (nombre, logo, categor\xEDas, pa\xEDses, URL verificada). Hoy 10 de 21 marcas de M\xE9xico no enlazan a su sitio."},{id:"innovacion",tipo:"texto",rotulo:"Innovaci\xF3n",titulo:"Marcas que crecen y viajan",parrafos:["En 2025 nuestro \xEDndice de innovaci\xF3n lleg\xF3 a {innovacion}, con lanzamientos como Artesano Masa Madre en M\xE9xico y Latinoam\xE9rica, el pan brioche de Plus Vita en Brasil y formatos m\xE1s accesibles, como la media hogaza.","Cero Cero ya est\xE1 en {ceroCeroPaises} pa\xEDses, y el Pan Blanco y el Pan Integral Bimbo llegan a {panBimboPaises}."],nota:"Carta del Director General, Informe Anual 2025 (pp. 9\u201310). Fotos de producto sin recortar el empaque ni el logo."},{id:"regiones",tipo:"regiones",titulo:"D\xF3nde operamos",intro:"{paisesOperacion} pa\xEDses, agrupados en las cuatro regiones con las que reportamos resultados.",regiones:[{nombre:"Norteam\xE9rica",paises:["Canad\xE1","Estados Unidos"]},{nombre:"M\xE9xico",paises:["M\xE9xico"]},{nombre:"Latinoam\xE9rica (Centro y Sudam\xE9rica)",paises:["Argentina","Brasil","Chile","Colombia","Costa Rica","Ecuador","El Salvador","Guatemala","Honduras","Nicaragua","Panam\xE1","Paraguay","Per\xFA","Uruguay","Venezuela"]},{nombre:"EAA (Europa, Asia y \xC1frica)",paises:["China","Corea del Sur","Croacia","Eslovenia","Espa\xF1a","Francia","India","Italia","Kazajist\xE1n","Marruecos","Montenegro","Portugal","Reino Unido","Ruman\xEDa","Rusia","Serbia","Sud\xE1frica","Suiza","T\xFAnez","Turqu\xEDa","Ucrania"]}],nota:"Regiones del Informe Anual 2025 y de los reportes trimestrales (Norteam\xE9rica, M\xE9xico, Latinoam\xE9rica, EAA). Corrige la agrupaci\xF3n actual, que pone a Colombia, Ecuador y Venezuela en \xABCentroam\xE9rica\xBB. Suma 39 pa\xEDses."},{id:"cta",tipo:"cta",titular:"\xBFVendes o distribuyes nuestros productos?",texto:"Escr\xEDbenos y te ponemos en contacto con el equipo comercial de tu pa\xEDs.",ctas:[{texto:"Ir a Contacto",destino:"/wireframes/contacto"}]}]},q1={slug:"sustentabilidad",nombre:"Sustentabilidad",ruta:"/sustentabilidad",meta:{title:"Sustentabilidad | Grupo Bimbo",description:"Nuestra estrategia de sustentabilidad: metas p\xFAblicas para Para Ti, Para la Vida y Para la Naturaleza, lo que hemos avanzado y lo que nos falta."},audiencias:["comunidad","inversionistas","prensa"],secciones:[{id:"hero",tipo:"hero",rotulo:"Sustentabilidad",titular:"Un camino con metas p\xFAblicas",bajada:"Para ti, para la vida y para la naturaleza. En 2021 nos pusimos metas con fecha; cada a\xF1o publicamos cu\xE1nto avanzamos, qu\xE9 cumplimos y qu\xE9 todav\xEDa no."},{id:"origen",tipo:"texto",titulo:"Viene de nuestra filosof\xEDa",parrafos:["Desde el inicio quisimos ser una empresa sustentable, altamente productiva y plenamente humana. La estrategia de 2021 convierte esa idea en metas medibles, organizadas en tres pilares y cuatro cimientos."]},{id:"pilares",tipo:"tarjetas",titulo:"Tres pilares",items:[{titulo:"Para Ti",texto:"Mejores perfiles nutrimentales para todos \xB7 Marcas sustentables y transparentes \xB7 Dietas m\xE1s saludables a base de plantas.",cta:{texto:"Ver Para Ti",destino:"#para-ti"}},{titulo:"Para la Vida",texto:"Fortalecer nuestras comunidades \xB7 Cuidar a nuestra gente.",cta:{texto:"Ver Para la Vida",destino:"#para-la-vida"}},{titulo:"Para la Naturaleza",texto:"Hacia cero desperdicios \xB7 Avanzando hacia cero emisiones de carbono \xB7 Agricultura regenerativa.",cta:{texto:"Ver Para la Naturaleza",destino:"#para-la-naturaleza"}}],columnas:3,nota:"Reemplaza \xAB8 principios b\xE1sicos\xBB: son 3 pilares con 8 temas, m\xE1s 4 cimientos. Decidido: la p\xE1gina de Nutrici\xF3n se integra en Para Ti, que es donde el Informe Anual 2025 reporta los perfiles nutrimentales; /nutricion redirige a /sustentabilidad#para-ti."},{id:"metas",tipo:"cifras",titulo:"C\xF3mo vamos",ids:["ventasHSR","sinColorantes","buenVecino","mujeresLiderazgo","hectareas","empaques","energia","reusoAgua","vehiculosElectricos"],nota:"Avances del Informe Anual 2025, cada uno con su alcance en la etiqueta: electricidad (no toda la energ\xEDa), agua de servicios, empaques dise\xF1ados para ser reciclables, consumo diario. Agrupar por pilar: Para Ti (3), Para la Vida (2), Para la Naturaleza (4)."},{id:"pendientes",tipo:"texto",rotulo:"Lo que falta",titulo:"Lo que todav\xEDa no logramos",parrafos:["No alcanzamos la meta de 2025 para reducir las emisiones de nuestra cadena de valor. Estamos recalculando nuestra l\xEDnea base, y mientras terminamos pedimos pausar la validaci\xF3n de nuestros objetivos ante la iniciativa Science Based Targets. La meta no cambia: cero emisiones de carbono en {emisionesMeta}.","En nutrici\xF3n nos propusimos que en 2025 el {ventasHSRMeta} de nuestras ventas viniera de productos con 3.5 estrellas o m\xE1s. Llegamos a {ventasHSR} y esperamos cerrar la diferencia en 2026."],nota:"Pedido por la revisi\xF3n del supervisor (3 nov 2026): Sustentabilidad habla de camino, no de logro. Bimbo lo reporta abiertamente (Informe Anual 2025, pp. 31\u201332, 101, 109 y 169). Validar con Bimbo el tono de esta secci\xF3n antes de publicar."},{id:"cimientos",tipo:"lista",titulo:"Cuatro cimientos",intro:"Lo que sostiene a los tres pilares.",items:["Est\xE1ndares ambientales y edificios sustentables","Calidad e inocuidad alimentaria","Derechos humanos y est\xE1ndares laborales","Abastecimiento sustentable de materias primas"]},{id:"descargas",tipo:"descargas",titulo:"Reportes y descargas",items:[{titulo:"Informe Anual Integrado 2025 \xABCelebramos lo que nos une\xBB",detalle:"182 p\xE1ginas \xB7 PDF"},{titulo:"Datos de Desempe\xF1o 2025",detalle:"Anexo del informe \xB7 PDF"},{titulo:"An\xE1lisis de doble materialidad 2025",detalle:"PDF"},{titulo:"Planes de acci\xF3n de agricultura y aceite de palma",detalle:"2023\u20132025 \xB7 PDF"},{titulo:"Contribuci\xF3n a los ODS",detalle:"PDF"}],nota:"Concentra el Centro de Descargas. Cada archivo muestra a\xF1o y peso."},{id:"contacto",tipo:"texto",titulo:"\xBFPreguntas sobre sustentabilidad?",parrafos:["Escr\xEDbenos a sustentabilidad@grupobimbo.com."],nota:"Correo del Informe Anual 2025 (p. 182)."}]},X1={slug:"inversionistas",nombre:"Inversionistas",ruta:"/inversionistas",meta:{title:"Inversionistas | Grupo Bimbo",description:"Resultados trimestrales, informes anuales, eventos y gobierno corporativo de Grupo Bimbo (BMV: BIMBO)."},audiencias:["inversionistas","analistas"],secciones:[{id:"hero",tipo:"hero",rotulo:"Inversionistas",titular:"Resultados, reportes y gobierno corporativo",bajada:"Cotizamos en la Bolsa Mexicana de Valores con la clave BIMBO y en el mercado extraburs\xE1til de Estados Unidos con un programa de ADR Nivel 1, clave BMBOY.",ctas:[{texto:"Descarga el reporte 3T26",destino:"#reporte"}]},{id:"cifras",tipo:"cifras",titulo:"La compa\xF1\xEDa en cifras",ids:["ventas","ventasUSD","paisesOperacion","rutas","productos"]},{id:"anio",tipo:"texto",rotulo:"2025 en breve",titulo:"Ventas y UAFIDA Ajustada r\xE9cord en nuestro 80 aniversario",parrafos:["Cerramos 2025 con ventas netas de {ventas2025} y una UAFIDA Ajustada de {uafida2025}, ambas r\xE9cord. Redujimos el apalancamiento a {apalancamiento} y regresamos {retornoAccionistas} a nuestros accionistas en dividendos y recompra de acciones."],cta:{texto:"Leer el Informe Anual 2025",destino:"#"},nota:"Informe Anual 2025 (pp. 7 y 11). Se actualiza con cada informe anual; los trimestres van en \xABReportes trimestrales\xBB."},{id:"tesis",tipo:"tarjetas",titulo:"Por qu\xE9 invertir en Bimbo",items:[{titulo:"Distribuci\xF3n",texto:"Red de distribuci\xF3n directa y plantas que garantizan calidad y frescura."},{titulo:"Diversificaci\xF3n",texto:"Productos, canales y geograf\xEDas balanceados entre mercados desarrollados y emergentes."},{titulo:"Innovaci\xF3n",texto:"Categor\xEDas, precios y presentaciones para cada ocasi\xF3n de consumo."},{titulo:"Eficiencia",texto:"Capacidad de producci\xF3n y modelos de bajo costo."},{titulo:"Equipo directivo",texto:"Experiencia probada y compromiso con los colaboradores."},{titulo:"Rentabilidad",texto:"Generaci\xF3n consistente de efectivo para crecer de forma org\xE1nica y con adquisiciones."},{titulo:"Sustentabilidad",texto:"Metas p\xFAblicas y una cultura corporativa distintiva."}],columnas:4,nota:"Mismo contenido que \xABValor Bimbo\xBB, en texto y no en im\xE1genes descargables."},{id:"accesos",tipo:"distribuidor",titulo:"Informaci\xF3n financiera",rutas:[{audiencia:"Reportes trimestrales",texto:"Del m\xE1s reciente al m\xE1s antiguo.",cta:{texto:"Ver reportes",destino:"#"}},{audiencia:"Informes anuales",texto:"Informe anual integrado de cada ejercicio.",cta:{texto:"Ver informes",destino:"#"}},{audiencia:"Reportes BMV",texto:"Informaci\xF3n entregada a la Bolsa Mexicana de Valores.",cta:{texto:"Ver reportes BMV",destino:"#"}},{audiencia:"Eventos y presentaciones",texto:"Conferencias de resultados y presentaciones.",cta:{texto:"Ver eventos",destino:"#"}},{audiencia:"Gobierno corporativo",texto:"Consejo, comit\xE9s, asambleas y c\xF3digo.",cta:{texto:"Ver gobierno corporativo",destino:"#"}},{audiencia:"Deuda vinculada a la sustentabilidad",texto:"Certificados burs\xE1tiles ligados a metas de emisiones y su avance.",cta:{texto:"Ver los instrumentos",destino:"#"}}],nota:"CbCR solo existe en ingl\xE9s: se enlaza con la etiqueta \xAB(en ingl\xE9s)\xBB. \xABDeuda vinculada a la sustentabilidad\xBB sigue al informe (\xABcertificados burs\xE1tiles vinculados a la sustentabilidad\xBB, p. 169); no usar \xABbonos verdes\xBB ni \xABbonos sustentables\xBB. Confirmar el t\xE9rmino con Relaci\xF3n con Inversionistas."},{id:"contacto",tipo:"texto",titulo:"Relaci\xF3n con Inversionistas",parrafos:["Escr\xEDbenos a ir@grupobimbo.com.","[tel\xE9fono por migrar desde Inversionistas \u203A Contacto]"],nota:"Correo del Informe Anual 2025 (p. 182)."}]},W1={slug:"prensa",nombre:"Prensa",ruta:"/prensa",meta:{title:"Sala de prensa | Grupo Bimbo",description:"Comunicados oficiales, noticias, kit de medios y contacto de prensa de Grupo Bimbo."},audiencias:["prensa"],secciones:[{id:"hero",tipo:"hero",rotulo:"Prensa",titular:"Noticias y comunicados de Grupo Bimbo",bajada:"Comunicados oficiales, notas y material para medios."},{id:"listado",tipo:"noticias",titulo:"Comunicados y noticias",cantidad:6,cta:{texto:"Cargar m\xE1s",destino:"#"},nota:"Filtro por seis categor\xEDas (Negocio y resultados, Marcas e innovaci\xF3n, Sustentabilidad, Comunidad, Nuestra gente, Reconocimientos) en lugar de las 17 actuales, que incluyen duplicados. La categor\xEDa de cada nota va pegada a su t\xEDtulo."},{id:"kit",tipo:"descargas",titulo:"Kit de medios",items:[{titulo:"Logotipos",detalle:"SVG y PNG"},{titulo:"Fotograf\xEDas",detalle:"Plantas, productos y directivos"},{titulo:"Ficha de la compa\xF1\xEDa",detalle:"Cifras de content/cifras.ts con fecha de corte"}]},{id:"contacto",tipo:"texto",titulo:"Contacto de prensa",parrafos:["[correo de prensa por confirmar]"]}]},Y1={slug:"carreras",nombre:"Carreras",ruta:"/carreras",meta:{title:"Trabaja en Grupo Bimbo | Carreras",description:"Vacantes en los {paisesOperacion} pa\xEDses donde operamos. Conoce c\xF3mo es trabajar en la panificadora m\xE1s grande del mundo."},audiencias:["candidatos"],secciones:[{id:"hero",tipo:"hero",rotulo:"Carreras",titular:"Haz carrera en la panificadora m\xE1s grande del mundo",bajada:"Somos {colaboradores} colaboradores en {paisesOperacion} pa\xEDses. \xABValoramos a la persona\xBB es la primera de nuestras creencias, y la persona es el eje de nuestras decisiones.",ctas:[{texto:"Buscar vacantes en mi pa\xEDs",destino:"#vacantes"}]},{id:"cifras",tipo:"cifras",titulo:"Qui\xE9nes somos",ids:["colaboradores","paisesOperacion","mujeresLiderazgo","horasCapacitacion"]},{id:"cuidado",tipo:"tarjetas",titulo:"C\xF3mo cuidamos a nuestra gente",intro:"El cuidado de nuestra gente es la base de todo lo que hacemos.",items:[{titulo:"Pertenencia",texto:"Queremos que cada persona se sienta valorada, respetada y libre de ser aut\xE9ntica."},{titulo:"Formaci\xF3n",texto:"{horasCapacitacion} horas de capacitaci\xF3n al a\xF1o en promedio, con GB University y programas de liderazgo."},{titulo:"Seguridad y bienestar",texto:"Nuestros l\xEDderes siguen cuatro verbos: cuido, corrijo, capacito y celebro."}],columnas:3,nota:"Frases del Informe Anual 2025 (pp. 62, 64, 71 y 75). No prometer \xABcero accidentes\xBB ni paridad salarial."},{id:"vacantes",tipo:"distribuidor",titulo:"Vacantes por pa\xEDs",intro:"Cada regi\xF3n publica sus vacantes en su propia bolsa de trabajo.",rutas:[{audiencia:"M\xE9xico",texto:"Plantas, ventas, distribuci\xF3n y corporativo.",cta:{texto:"Ver vacantes en M\xE9xico",destino:"[enlace pendiente]"}},{audiencia:"Latinoam\xE9rica",texto:"Colombia, Costa Rica, Ecuador, Guatemala, Panam\xE1 y m\xE1s.",cta:{texto:"Ver vacantes",destino:"https://careers.grupobimbo.com/careers-home"}},{audiencia:"Brasil",texto:"Vagas em todo o Brasil.",cta:{texto:"Ver vagas",destino:"https://trabalheconosco.vagas.com.br/grupo-bimbo"}},{audiencia:"Estados Unidos",texto:"Bimbo Bakeries USA, Barcel USA y Bimbo QSR.",cta:{texto:"Ver vacantes",destino:"[enlace pendiente]"}},{audiencia:"Europa",texto:"Espa\xF1a y otros pa\xEDses de la regi\xF3n.",cta:{texto:"Ver vacantes",destino:"[enlace pendiente]"}}],nota:"Reemplaza la lista actual, que mete a Colombia, Ecuador y Venezuela en \xABLatinoam\xE9rica Centro\xBB."},{id:"proceso",tipo:"etapas",titulo:"C\xF3mo es el proceso",items:[{titulo:"Encuentra tu vacante",texto:"Busca por pa\xEDs y \xE1rea."},{titulo:"Post\xFAlate",texto:"Comparte tu experiencia en l\xEDnea."},{titulo:"Entrevistas",texto:"Conoce al equipo y al puesto."},{titulo:"Bienvenida",texto:"Tu primer d\xEDa en Bimbo."}],nota:"Etapas gen\xE9ricas: validar con \xABNuestros procesos de selecci\xF3n\xBB del sitio actual."},{id:"fraude",tipo:"aviso",titulo:"Cuidado con los fraudes",texto:"Grupo Bimbo no solicita ning\xFAn tipo de pago durante el proceso de selecci\xF3n. Si alguien te lo pide en nuestro nombre, rep\xF3rtalo.",nota:"Texto tomado del pie del sitio actual; aqu\xED es donde el candidato lo necesita."}]},Z1={slug:"contacto",nombre:"Contacto",ruta:"/contacto",meta:{title:"Contacto | Grupo Bimbo",description:"Escr\xEDbenos seg\xFAn tu caso: consumidores, clientes, proveedores, inversionistas, prensa, candidatos o l\xEDnea \xE9tica Comenta."},audiencias:["todas"],secciones:[{id:"hero",tipo:"hero",rotulo:"Contacto",titular:"\xBFCon qui\xE9n quieres hablar?",bajada:"Elige tu caso y te llevamos al canal correcto."},{id:"canales",tipo:"distribuidor",titulo:"Canales",rutas:[{audiencia:"Consumidores",texto:"Una duda o una queja sobre un producto.",cta:{texto:"atencionenlinea@grupobimbo.com",destino:"mailto:atencionenlinea@grupobimbo.com"}},{audiencia:"Clientes y distribuidores",texto:"Compras, pedidos y nuevas cuentas.",cta:{texto:"[canal por confirmar]",destino:"#"}},{audiencia:"Proveedores",texto:"Registro, pagos y portal.",cta:{texto:"Portal de proveedores",destino:"https://proveedores.grupobimbo.com/"}},{audiencia:"Inversionistas",texto:"Relaci\xF3n con Inversionistas.",cta:{texto:"Ir a Inversionistas",destino:"/wireframes/inversionistas"}},{audiencia:"Prensa",texto:"Solicitudes de medios.",cta:{texto:"Ir a Prensa",destino:"/wireframes/prensa"}},{audiencia:"Candidatos",texto:"Vacantes y procesos de selecci\xF3n.",cta:{texto:"Ir a Carreras",destino:"/wireframes/carreras"}},{audiencia:"Organizaciones sociales",texto:"Propuestas de inversi\xF3n social y donativos.",cta:{texto:"inversionsocial@grupobimbo.com",destino:"mailto:inversionsocial@grupobimbo.com"}},{audiencia:"Visitas",texto:"Visitas virtuales y escolares a nuestras panader\xEDas.",cta:{texto:"Agendar una visita",destino:"https://visitas.bimboconnect.com"}}]},{id:"comenta",tipo:"texto",rotulo:"L\xEDnea \xE9tica",titulo:"Comenta: reporta una posible falta al C\xF3digo de \xC9tica",parrafos:["Para colaboradores y proveedores. Los reportes son confidenciales: no revelamos la identidad de quien reporta ni de las personas involucradas.","Puedes reportar por tel\xE9fono las 24 horas (seg\xFAn tu pa\xEDs), en comenta@grupobimbo.com o en el sitio de Comenta.","Comenta no atiende quejas de producto, servicio o pagos; para eso, escribe a atenci\xF3n a consumidores."],cta:{texto:"Reportar en Comenta",destino:"#"},nota:"Hoy Comenta es un bot\xF3n naranja destacado en el pie, sin explicaci\xF3n. Canales del Informe Anual 2025 (p. 167)."},{id:"fraude",tipo:"aviso",titulo:"Aviso sobre fraudes",texto:"No solicitamos pagos para procesos de selecci\xF3n ni vendemos autom\xF3viles por internet fuera de la casa de subastas MORTON. Verifica siempre en nuestros canales oficiales.",nota:"Contenido del modal actual de fraudes y del pie. Aqu\xED se lee sin abrir nada."},{id:"oficinas",tipo:"texto",titulo:"Oficinas corporativas",parrafos:["Prolongaci\xF3n Paseo de la Reforma 1000, col. Pe\xF1a Blanca Santa Fe, alcald\xEDa \xC1lvaro Obreg\xF3n, C.P. 01210, Ciudad de M\xE9xico."],nota:"Direcci\xF3n del Informe Anual 2025. Las preguntas frecuentes del sitio dan otra (Alfonso N\xE1poles G\xE1ndara 1117) y deben corregirse. El tel\xE9fono se publica cuando Bimbo confirme cu\xE1l."}]},J_=[V1,G1,k1,q1,X1,W1,Y1,Z1];var j1=/\{(\w+)\}/g;function J1(e){let t=[],n=0;for(let i of e.matchAll(j1)){let a=ml[i[1]];if(!a)throw new Error(`Cifra desconocida en el copy: {${i[1]}}`);i.index>n&&t.push({texto:e.slice(n,i.index)}),t.push({texto:a.valor,cifra:a}),n=i.index+i[0].length}return n<e.length&&t.push({texto:e.slice(n)}),t[0]&&(t[0]={...t[0],texto:t[0].texto.charAt(0).toUpperCase()+t[0].texto.slice(1)}),t}function Yd(e,t=!1){return J1(e).map(n=>t&&n.cifra?.estado==="por-confirmar"?`${n.texto} [por confirmar]`:n.texto).join("")}var xe=Vs(kl());lg();var pt=Vs(Ll()),fC={0:{desde:{lat:14,lon:-100,dist:4.87},hasta:{lat:22,lon:-72,dist:4.35},giro:1.5},1:{desde:{lat:50,lon:-112,dist:3.6},hasta:{lat:44,lon:-94,dist:3.35}},2:{desde:{lat:25,lon:-105,dist:2.85},hasta:{lat:21,lon:-99,dist:2.6}},3:{desde:{lat:0,lon:-74,dist:3.75},hasta:{lat:-18,lon:-64,dist:3.5}},4:{desde:{lat:18,lon:16,dist:3.9},hasta:{lat:38,lon:60,dist:4}}},Lb={mundo:11,region:8},Nb=["bg-globo-tierra","bg-globo-norteamerica","bg-globo-mexico","bg-globo-latinoamerica","bg-globo-eaa"];function mh({valor:e,className:t}){let n=e.replace(/^más de /,"+"),i=n.match(/\d[\d,]*/),a=i?Number(i[0].replace(/,/g,"")):0,[s,r]=(0,xe.useState)(a);if((0,xe.useEffect)(()=>{if(!i||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return r(a);let l=0,c=performance.now(),u=d=>{let f=Math.min(1,(d-c)/1100);r(Math.round(a*(1-Math.pow(1-f,3)))),f<1&&(l=requestAnimationFrame(u))};return l=requestAnimationFrame(u),()=>cancelAnimationFrame(l)},[e]),!i)return(0,pt.jsx)("span",{className:t,children:n});let o=i.index??0;return(0,pt.jsxs)("span",{className:`tabular-nums ${t??""}`,"aria-label":n,children:[n.slice(0,o),s.toLocaleString("en-US"),n.slice(o+i[0].length)]})}function fg({rotulo:e,titulo:t,bajada:n,paradas:i,grano:a="punto",paleta:s="azul",laboratorio:r=!1}){let o=(0,xe.useRef)(null),l=(0,xe.useRef)(null),c=(0,xe.useRef)(null),u=(0,xe.useRef)(null),d=(0,xe.useRef)(null),[f,p]=(0,xe.useState)([]),[g,x]=(0,xe.useState)(0),[m,h]=(0,xe.useState)(!0),[v,y]=(0,xe.useState)(!1),[_,R]=(0,xe.useState)(!1),[w,T]=(0,xe.useState)(a),[C,E]=(0,xe.useState)(s),b=i[g],D=b.region===0?Lb.mundo:Lb.region;(0,xe.useEffect)(()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches&&h(!1);let I=!0,F=null;return(async()=>{let[{EscenaGlobo:K},G]=await Promise.all([Promise.resolve().then(()=>(Ub(),Db)),fetch("/globo/paises.json").then(it=>it.json())]);!I||!o.current||!l.current||(F=new K(o.current,l.current,G.paises),F.onInteraccion=()=>h(!1),d.current=F,p(G.paises),await F.cargar("/globo/granos.bin"),I&&R(!0))})(),()=>{I=!1,F?.destruir(),d.current=null}},[]),(0,xe.useEffect)(()=>{let I=window.matchMedia("(min-width: 768px)"),F=()=>d.current?.ajustar(I.matches?{x:.17,y:0}:{x:0,y:0});return F(),I.addEventListener("change",F),()=>I.removeEventListener("change",F)},[f]),(0,xe.useEffect)(()=>{let I=c.current;if(!I)return;let F=new IntersectionObserver(([K])=>{y(K.isIntersecting),d.current?.setVisible(K.isIntersecting)});return F.observe(I),()=>F.disconnect()},[f]),(0,xe.useEffect)(()=>{if(!r)return;let I=new URLSearchParams(window.location.search),F=I.get("grano"),K=I.get("color");F&&og.includes(F)&&T(F),(K==="azul"||K==="natural")&&E(K)},[r]),(0,xe.useEffect)(()=>{if(d.current?.setGrano(w,C),!r)return;let I=new URL(window.location.href);I.searchParams.set("grano",w),I.searchParams.set("color",C),window.history.replaceState(null,"",I)},[w,C,f,r]),(0,xe.useEffect)(()=>{d.current?.irA({region:b.region,...fC[b.region]},D),d.current?.enfocar(-1)},[b,D,f]),(0,xe.useEffect)(()=>{let I=u.current,F=I?.querySelectorAll("button")[g];I&&F&&I.scrollWidth>I.clientWidth&&I.scrollTo({left:F.offsetLeft-16,behavior:"smooth"})},[g]);let q=I=>{x(I),h(!1)},V=I=>d.current?.enfocar(I?f.findIndex(F=>F.nombre===I):-1),X=[...new Set([...b.destacados,...b.datos].map(I=>I.corte).filter(Boolean))];return(0,pt.jsxs)("section",{ref:c,"aria-labelledby":"globo-titulo","data-globo":!0,className:"relative isolate flex flex-col overflow-clip bg-globo-noche font-display text-white md:block md:h-[calc(100svh-2rem)] md:min-h-[36rem]",children:[(0,pt.jsxs)("div",{className:"relative order-2 h-[58svh] min-h-[340px] md:absolute md:inset-0 md:h-auto",children:[(0,pt.jsx)("canvas",{ref:o,"aria-label":`Globo terr\xE1queo con los pa\xEDses donde opera Grupo Bimbo. Vista actual: ${b.nombre}.`,role:"img",className:`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-1000 active:cursor-grabbing ${_?"opacity-100":"opacity-0"}`}),(0,pt.jsx)("div",{"aria-hidden":!0,className:"pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-globo-noche from-40% via-globo-noche/70 to-transparent md:block"}),(0,pt.jsx)("div",{ref:l,"aria-hidden":!0,className:"pointer-events-none absolute inset-0"}),(0,pt.jsx)("p",{className:"pointer-events-none absolute bottom-3 right-4 hidden text-xs text-white/50 md:block",children:"Arrastra para girar \xB7 pellizca o usa + / \u2212 para acercar"}),r&&(0,pt.jsxs)("div",{className:"absolute right-4 top-4 z-20 w-[15rem] rounded-2xl border border-white/15 bg-globo-noche/85 p-3 text-xs backdrop-blur md:right-6 md:top-6",children:[(0,pt.jsx)("p",{className:"font-semibold uppercase tracking-[0.2em] text-globo-rotulo",children:"Laboratorio \xB7 v2"}),(0,pt.jsx)("p",{className:"mt-3 text-white/60",children:"Grano"}),(0,pt.jsx)("div",{className:"mt-1.5 flex flex-wrap gap-1.5",children:og.map(I=>(0,pt.jsx)("button",{type:"button","aria-pressed":w===I,onClick:()=>T(I),className:`rounded-full px-2.5 py-1 font-semibold transition-colors ${w===I?"bg-white text-globo-noche":"bg-white/10 hover:bg-white/20"}`,children:bb[I]},I))}),(0,pt.jsx)("p",{className:"mt-3 text-white/60",children:"Color"}),(0,pt.jsx)("div",{className:"mt-1.5 flex gap-1.5",children:["natural","azul"].map(I=>(0,pt.jsx)("button",{type:"button","aria-pressed":C===I,onClick:()=>E(I),className:`rounded-full px-2.5 py-1 font-semibold transition-colors ${C===I?"bg-white text-globo-noche":"bg-white/10 hover:bg-white/20"}`,children:I==="natural"?"Natural":"Azul por regi\xF3n"},I))})]})]}),(0,pt.jsxs)("div",{className:"pointer-events-none relative z-10 order-1 contents md:flex md:h-full md:w-[46%] md:max-w-[38.75rem] md:flex-col md:py-12 md:pl-16",children:[(0,pt.jsxs)("header",{className:"order-1 px-4 pt-10 md:px-0 md:pt-0",children:[(0,pt.jsx)("p",{className:"text-xs font-semibold uppercase tracking-[0.2em] text-globo-rotulo",children:e}),(0,pt.jsx)("h1",{id:"globo-titulo",className:"mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl",children:t}),(0,pt.jsx)("p",{className:"mt-4 max-w-md text-base text-white/75",children:n})]}),(0,pt.jsxs)("nav",{ref:u,"aria-label":"Regiones",className:"pointer-events-auto order-3 -mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:order-4 md:mt-auto md:flex-wrap md:overflow-visible md:px-0",onMouseEnter:()=>c.current?.style.setProperty("--pausa","paused"),onMouseLeave:()=>c.current?.style.removeProperty("--pausa"),children:[i.map((I,F)=>{let K=F===g;return(0,pt.jsxs)("button",{type:"button",onClick:()=>q(F),"aria-pressed":K,className:`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-extrabold uppercase tracking-wide transition-colors ${K?"border-white bg-white text-globo-noche":"border-white/25 text-white hover:border-white/70"}`,children:[(0,pt.jsxs)("span",{className:"relative z-10 flex items-center gap-2",children:[(0,pt.jsx)("span",{className:`h-2.5 w-2.5 rounded-full ${I.region===0?"bg-gradient-to-r from-globo-norteamerica via-globo-mexico to-globo-eaa":Nb[I.region]}`}),I.nombre]}),K&&m&&v&&(0,pt.jsx)("span",{"aria-hidden":!0,onAnimationEnd:()=>x((g+1)%i.length),className:"absolute inset-y-0 left-0 w-full origin-left bg-globo-mexico/60 motion-safe:animate-[globo-avance_linear_forwards]",style:{animationDuration:`${D}s`,animationPlayState:"var(--pausa, running)"}},`${I.id}-${g}`)]},I.id)}),(0,pt.jsxs)("span",{className:"ml-auto flex shrink-0 gap-2 md:ml-0",children:[(0,pt.jsx)("button",{type:"button",onClick:()=>h(I=>!I),"aria-label":m?"Pausar recorrido":"Reanudar recorrido",className:"grid h-10 w-10 place-items-center rounded-full border border-white/25 text-sm hover:border-white/70",children:m?"\u275A\u275A":"\u25B6"}),(0,pt.jsx)("button",{type:"button",onClick:()=>d.current?.acercar(.8),"aria-label":"Acercar",className:"grid h-10 w-10 place-items-center rounded-full border border-white/25 text-xl leading-none hover:border-white/70",children:"+"}),(0,pt.jsx)("button",{type:"button",onClick:()=>d.current?.acercar(1.25),"aria-label":"Alejar",className:"grid h-10 w-10 place-items-center rounded-full border border-white/25 text-xl leading-none hover:border-white/70",children:"\u2212"})]})]}),(0,pt.jsxs)("div",{className:"pointer-events-auto order-4 px-4 pb-12 pt-6 motion-safe:animate-[globo-entra_0.6s_ease-out] md:order-3 md:px-0 md:pb-6 md:pt-8",onMouseEnter:()=>c.current?.style.setProperty("--pausa","paused"),onMouseLeave:()=>c.current?.style.removeProperty("--pausa"),children:[b.region===0?(0,pt.jsx)("div",{className:"flex items-end gap-8",children:b.destacados.map((I,F)=>(0,pt.jsxs)("div",{children:[(0,pt.jsx)(mh,{valor:I.valor,className:`block font-black leading-none ${F===0?"text-8xl md:text-9xl":"text-6xl md:text-7xl"}`}),(0,pt.jsx)("p",{className:"mt-2 max-w-[11rem] text-xs font-semibold uppercase leading-tight tracking-wide text-globo-rotulo",children:I.etiqueta})]},I.etiqueta))}):(0,pt.jsxs)(pt.Fragment,{children:[(0,pt.jsxs)("p",{className:"flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-globo-rotulo",children:[(0,pt.jsx)("span",{className:`h-3 w-3 rounded-full ${Nb[b.region]}`}),"Regi\xF3n ",b.region," de ",i.length-1,b.detalle&&(0,pt.jsxs)("span",{className:"normal-case tracking-normal text-white/60",children:["\xB7 ",b.detalle]})]}),(0,pt.jsx)("h2",{className:"mt-2 text-[2.5rem] font-black uppercase leading-none tracking-tight sm:text-5xl md:text-6xl",children:b.nombre}),(0,pt.jsxs)("div",{className:"mt-6 flex flex-wrap items-end gap-x-8 gap-y-4",children:[b.destacados.map(I=>(0,pt.jsxs)("div",{children:[(0,pt.jsx)(mh,{valor:I.valor,className:"block text-5xl font-black leading-none md:text-6xl"}),(0,pt.jsx)("p",{className:"mt-2 text-xs font-semibold uppercase tracking-wide text-globo-rotulo",children:I.etiqueta})]},I.etiqueta)),(0,pt.jsxs)("div",{children:[(0,pt.jsx)(mh,{valor:String(b.paises.length),className:"block text-5xl font-black leading-none md:text-6xl"}),(0,pt.jsx)("p",{className:"mt-2 text-xs font-semibold uppercase tracking-wide text-globo-rotulo",children:b.paises.length===1?"Pa\xEDs":"Pa\xEDses"})]})]})]}),b.datos.length>0&&(0,pt.jsx)("dl",{className:"mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-3",children:b.datos.map(I=>(0,pt.jsxs)("div",{children:[(0,pt.jsx)("dd",{children:(0,pt.jsx)(mh,{valor:I.valor,className:"block text-3xl font-black leading-none"})}),(0,pt.jsx)("dt",{className:"mt-1.5 text-[0.6875rem] font-semibold uppercase leading-tight tracking-wide text-globo-rotulo",children:I.etiqueta})]},I.etiqueta))}),b.paises.length>0&&(0,pt.jsx)("ul",{className:"mt-6 flex flex-wrap gap-1.5","aria-label":`Pa\xEDses de ${b.nombre}`,children:b.paises.map(I=>(0,pt.jsx)("li",{children:(0,pt.jsx)("button",{type:"button",onMouseEnter:()=>V(I),onMouseLeave:()=>V(null),onFocus:()=>V(I),onBlur:()=>V(null),className:"rounded-full bg-white/10 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white hover:text-globo-noche focus-visible:bg-white focus-visible:text-globo-noche",children:I})},I))}),X.length>0&&(0,pt.jsxs)("p",{className:"mt-6 text-[0.6875rem] text-white/45",children:["Corte: ",X.join(" \xB7 "),"."]})]},b.id)]})]})}var Ib=Vs(Ll()),Ci=(e,t)=>{let n=ml[e];return{valor:n.valor,etiqueta:t??n.etiqueta,corte:n.corte??null}};function Ob(e,t){let n=J_.flatMap(i=>i.secciones).find(i=>i.id===e);if(n?.tipo!==t)throw new Error(`Falta la secci\xF3n \xAB${e}\xBB (${t}) en content/paginas.ts`);return n}var dg=Ob("presencia","texto"),dC=Ob("regiones","regiones"),pC=[["norteamericaPlantas","norteamericaColaboradores"],["mexicoPlantas","mexicoColaboradores"],["latamPlantas","latamColaboradores"],["eaaPlantas","eaaColaboradores"]],mC=[{id:"mundo",nombre:"El mundo",region:0,destacados:[Ci("paisesPresencia"),Ci("paisesOperacion")],datos:[Ci("panaderias"),Ci("colaboradores"),Ci("rutas"),Ci("centrosVenta"),Ci("marcas"),Ci("productos")],paises:[]},...dC.regiones.map((e,t)=>{let[n,i]=e.nombre.replace(")","").split(" ("),[a,s]=pC[t];return{id:`region-${t+1}`,nombre:n,detalle:i??null,region:t+1,destacados:[Ci(a,"Panader\xEDas y plantas"),Ci(s,"Colaboradores")],datos:[],paises:e.paises}})];function gC(e,{grano:t="multigrano",paleta:n="natural"}={}){let i=(0,Pb.createRoot)(e);return i.render((0,Ib.jsx)(fg,{rotulo:dg.rotulo??"Presencia",titulo:Yd(dg.titulo),bajada:Yd(dg.parrafos[0]),paradas:mC,grano:t,paleta:n})),()=>i.unmount()}window.BimboGlobo={montar:gC};})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
