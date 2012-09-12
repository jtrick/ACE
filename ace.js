// ace.js Copyright (c) The New Waters Foundation, all rights reserved.  For license see: http://OpenAce.org/license?id=ace.js


//if (true) {  // Fix? Always include here?  // 
	/*! jQuery v@1.8.0 jquery.com | jquery.org/license */
	//(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bX(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bV.length;while(e--){b=bV[e]+c;if(b in a)return b}return d}function bY(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function bZ(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bY(c)&&(e[f]=p._data(c,"olddisplay",cb(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b$(a,b,c){var d=bO.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function b_(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bU[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bU[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bU[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bU[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bU[e]+"Width"))||0));return f}function ca(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bP.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+b_(a,b,c||(f?"border":"content"),e)+"px"}function cb(a){if(bR[a])return bR[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bR[a]=c,c}function ch(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||cd.test(a)?d(a,e):ch(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ch(a+"["+e+"]",b[e],c,d);else d(a,b)}function cy(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cz(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cu;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cz(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cz(a,c,d,e,"*",g)),h}function cA(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cB(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cC(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cK(){try{return new a.XMLHttpRequest}catch(b){}}function cL(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cT(){return setTimeout(function(){cM=b},0),cM=p.now()}function cU(a,b){p.each(b,function(b,c){var d=(cS[b]||[]).concat(cS["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cV(a,b,c){var d,e=0,f=0,g=cR.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cM||cT(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cM||cT(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cW(k,j.opts.specialEasing);for(;e<g;e++){d=cR[e].call(j,a,k,j.opts);if(d)return d}return cU(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cW(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cX(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bY(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cb(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cO.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cY(a,b,c,d,e){return new cY.prototype.init(a,b,c,d,e)}function cZ(a,b){var c,d={height:a},e=0;for(;e<4;e+=2-b)c=bU[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function c_(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=r.test("Â ")?/^[\s\xA0]+|[\s\xA0]+$/g:/^\s+|\s+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.0",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":a.toString().replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||f.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete"||e.readyState!=="loading"&&e.addEventListener)setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){p.isFunction(c)&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return typeof a=="object"?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length||!d)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/^(?:\{.*\}|\[.*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||++p.uuid:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")===0&&(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.shift(),e=p._queueHooks(a,b),f=function(){p.dequeue(a,b)};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),delete e.stop,d.call(a,f,e)),!c.length&&e&&e.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)(d=p._data(g[h],a+"queueHooks"))&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)~f.indexOf(" "+b[g]+" ")||(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>-1)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,""+d),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=[].slice.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click")){g=p(this),g.context=this;for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){i={},k=[],g[0]=f;for(d=0;d<q;d++)l=o[d],m=l.selector,i[m]===b&&(i[m]=g.is(m)),i[m]&&k.push(l);k.length&&u.push({elem:f,matches:k})}}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){j=u[d],c.currentTarget=j.elem;for(e=0;e<j.matches.length&&!c.isImmediatePropagationStopped();e++){l=j.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,h=((p.event.special[l.origType]||{}).handle||l.handler).apply(j.elem,r),h!==b&&(c.result=h,h===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{ready:{setup:p.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bd(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)Z(a,b[e],c,d)}function be(a,b,c,d,e,f){var g,h=$.setFilters[b.toLowerCase()];return h||Z.error(b),(a||!(g=e))&&bd(a||"*",d,g=[],e),g.length>0?h(g,c,f):[]}function bf(a,c,d,e,f){var g,h,i,j,k,l,m,n,p=0,q=f.length,s=L.POS,t=new RegExp("^"+s.source+"(?!"+r+")","i"),u=function(){var a=1,c=arguments.length-2;for(;a<c;a++)arguments[a]===b&&(g[a]=b)};for(;p<q;p++){s.exec(""),a=f[p],j=[],i=0,k=e;while(g=s.exec(a)){n=s.lastIndex=g.index+g[0].length;if(n>i){m=a.slice(i,g.index),i=n,l=[c],B.test(m)&&(k&&(l=k),k=e);if(h=H.test(m))m=m.slice(0,-5).replace(B,"$&*");g.length>1&&g[0].replace(t,u),k=be(m,g[1],g[2],l,k,h)}}k?(j=j.concat(k),(m=a.slice(i))&&m!==")"?B.test(m)?bd(m,j,d,e):Z(m,c,d,e?e.concat(k):k):o.apply(d,j)):Z(a,c,d,e)}return q===1?d:Z.uniqueSort(d)}function bg(a,b,c){var d,e,f,g=[],i=0,j=D.exec(a),k=!j.pop()&&!j.pop(),l=k&&a.match(C)||[""],m=$.preFilter,n=$.filter,o=!c&&b!==h;for(;(e=l[i])!=null&&k;i++){g.push(d=[]),o&&(e=" "+e);while(e){k=!1;if(j=B.exec(e))e=e.slice(j[0].length),k=d.push({part:j.pop().replace(A," "),captures:j});for(f in n)(j=L[f].exec(e))&&(!m[f]||(j=m[f](j,b,c)))&&(e=e.slice(j.shift().length),k=d.push({part:f,captures:j}));if(!k)break}}return k||Z.error(a),g}function bh(a,b,e){var f=b.dir,g=m++;return a||(a=function(a){return a===e}),b.first?function(b,c){while(b=b[f])if(b.nodeType===1)return a(b,c)&&b}:function(b,e){var h,i=g+"."+d,j=i+"."+c;while(b=b[f])if(b.nodeType===1){if((h=b[q])===j)return b.sizset;if(typeof h=="string"&&h.indexOf(i)===0){if(b.sizset)return b}else{b[q]=j;if(a(b,e))return b.sizset=!0,b;b.sizset=!1}}}}function bi(a,b){return a?function(c,d){var e=b(c,d);return e&&a(e===!0?c:e,d)}:b}function bj(a,b,c){var d,e,f=0;for(;d=a[f];f++)$.relative[d.part]?e=bh(e,$.relative[d.part],b):(d.captures.push(b,c),e=bi(e,$.filter[d.part].apply(null,d.captures)));return e}function bk(a){return function(b,c){var d,e=0;for(;d=a[e];e++)if(d(b,c))return!0;return!1}}var c,d,e,f,g,h=a.document,i=h.documentElement,j="undefined",k=!1,l=!0,m=0,n=[].slice,o=[].push,q=("sizcache"+Math.random()).replace(".",""),r="[\\x20\\t\\r\\n\\f]",s="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",t=s.replace("w","w#"),u="([*^$|!~]?=)",v="\\["+r+"*("+s+")"+r+"*(?:"+u+r+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+t+")|)|)"+r+"*\\]",w=":("+s+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",x=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",y=r+"*([\\x20\\t\\r\\n\\f>+~])"+r+"*",z="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+v+"|"+w.replace(2,7)+"|[^\\\\(),])+",A=new RegExp("^"+r+"+|((?:^|[^\\\\])(?:\\\\.)*)"+r+"+$","g"),B=new RegExp("^"+y),C=new RegExp(z+"?(?="+r+"*,|$)","g"),D=new RegExp("^(?:(?!,)(?:(?:^|,)"+r+"*"+z+")*?|"+r+"*(.*?))(\\)|$)"),E=new RegExp(z.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+y,"g"),F=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,G=/[\x20\t\r\n\f]*[+~]/,H=/:not\($/,I=/h\d/i,J=/input|select|textarea|button/i,K=/\\(?!\\)/g,L={ID:new RegExp("^#("+s+")"),CLASS:new RegExp("^\\.("+s+")"),NAME:new RegExp("^\\[name=['\"]?("+s+")['\"]?\\]"),TAG:new RegExp("^("+s.replace("[-","[-\\*")+")"),ATTR:new RegExp("^"+v),PSEUDO:new RegExp("^"+w),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+r+"*(even|odd|(([+-]|)(\\d*)n|)"+r+"*(?:([+-]|)"+r+"*(\\d+)|))"+r+"*\\)|)","i"),POS:new RegExp(x,"ig"),needsContext:new RegExp("^"+r+"*[>+~]|"+x,"i")},M={},N=[],O={},P=[],Q=function(a){return a.sizzleFilter=!0,a},R=function(a){return function(b){return b.nodeName.toLowerCase()==="input"&&b.type===a}},S=function(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}},T=function(a){var b=!1,c=h.createElement("div");try{b=a(c)}catch(d){}return c=null,b},U=T(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),V=T(function(a){a.id=q+0,a.innerHTML="<a name='"+q+"'></a><div name='"+q+"'></div>",i.insertBefore(a,i.firstChild);var b=h.getElementsByName&&h.getElementsByName(q).length===2+h.getElementsByName(q+0).length;return g=!h.getElementById(q),i.removeChild(a),b}),W=T(function(a){return a.appendChild(h.createComment("")),a.getElementsByTagName("*").length===0}),X=T(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==j&&a.firstChild.getAttribute("href")==="#"}),Y=T(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||a.getElementsByClassName("e").length===0?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length!==1)}),Z=function(a,b,c,d){c=c||[],b=b||h;var e,f,g,i,j=b.nodeType;if(j!==1&&j!==9)return[];if(!a||typeof a!="string")return c;g=ba(b);if(!g&&!d)if(e=F.exec(a))if(i=e[1]){if(j===9){f=b.getElementById(i);if(!f||!f.parentNode)return c;if(f.id===i)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(i))&&bb(b,f)&&f.id===i)return c.push(f),c}else{if(e[2])return o.apply(c,n.call(b.getElementsByTagName(a),0)),c;if((i=e[3])&&Y&&b.getElementsByClassName)return o.apply(c,n.call(b.getElementsByClassName(i),0)),c}return bm(a,b,c,d,g)},$=Z.selectors={cacheLength:50,match:L,order:["ID","TAG"],attrHandle:{},createPseudo:Q,find:{ID:g?function(a,b,c){if(typeof b.getElementById!==j&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==j&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==j&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:W?function(a,b){if(typeof b.getElementsByTagName!==j)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(K,""),a[3]=(a[4]||a[5]||"").replace(K,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||Z.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&Z.error(a[0]),a},PSEUDO:function(a){var b,c=a[4];return L.CHILD.test(a[0])?null:(c&&(b=D.exec(c))&&b.pop()&&(a[0]=a[0].slice(0,b[0].length-c.length-1),c=b[0].slice(0,-1)),a.splice(2,3,c||a[3]),a)}},filter:{ID:g?function(a){return a=a.replace(K,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(K,""),function(b){var c=typeof b.getAttributeNode!==j&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(K,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=M[a];return b||(b=M[a]=new RegExp("(^|"+r+")"+a+"("+r+"|$)"),N.push(a),N.length>$.cacheLength&&delete M[N.shift()]),function(a){return b.test(a.className||typeof a.getAttribute!==j&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return b?function(d){var e=Z.attr(d,a),f=e+"";if(e==null)return b==="!=";switch(b){case"=":return f===c;case"!=":return f!==c;case"^=":return c&&f.indexOf(c)===0;case"*=":return c&&f.indexOf(c)>-1;case"$=":return c&&f.substr(f.length-c.length)===c;case"~=":return(" "+f+" ").indexOf(c)>-1;case"|=":return f===c||f.substr(0,c.length+1)===c+"-"}}:function(b){return Z.attr(b,a)!=null}},CHILD:function(a,b,c,d){if(a==="nth"){var e=m++;return function(a){var b,f,g=0,h=a;if(c===1&&d===0)return!0;b=a.parentNode;if(b&&(b[q]!==e||!a.sizset)){for(h=b.firstChild;h;h=h.nextSibling)if(h.nodeType===1){h.sizset=++g;if(h===a)break}b[q]=e}return f=a.sizset-d,c===0?f===0:f%c===0&&f/c>=0}}return function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b,c,d){var e=$.pseudos[a]||$.pseudos[a.toLowerCase()];return e||Z.error("unsupported pseudo: "+a),e.sizzleFilter?e(b,c,d):e}},pseudos:{not:Q(function(a,b,c){var d=bl(a.replace(A,"$1"),b,c);return function(a){return!d(a)}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!$.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},contains:Q(function(a){return function(b){return(b.textContent||b.innerText||bc(b)).indexOf(a)>-1}}),has:Q(function(a){return function(b){return Z(a,b).length>0}}),header:function(a){return I.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:R("radio"),checkbox:R("checkbox"),file:R("file"),password:R("password"),image:R("image"),submit:S("submit"),reset:S("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return J.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b,c){return c?a.slice(1):[a[0]]},last:function(a,b,c){var d=a.pop();return c?a:[d]},even:function(a,b,c){var d=[],e=c?1:0,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},odd:function(a,b,c){var d=[],e=c?0:1,f=a.length;for(;e<f;e=e+2)d.push(a[e]);return d},lt:function(a,b,c){return c?a.slice(+b):a.slice(0,+b)},gt:function(a,b,c){return c?a.slice(0,+b+1):a.slice(+b+1)},eq:function(a,b,c){var d=a.splice(+b,1);return c?a:d}}};$.setFilters.nth=$.setFilters.eq,$.filters=$.pseudos,X||($.attrHandle={href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}}),V&&($.order.push("NAME"),$.find.NAME=function(a,b){if(typeof b.getElementsByName!==j)return b.getElementsByName(a)}),Y&&($.order.splice(1,0,"CLASS"),$.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!==j&&!c)return b.getElementsByClassName(a)});try{n.call(i.childNodes,0)[0].nodeType}catch(_){n=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}var ba=Z.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},bb=Z.contains=i.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:i.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc=Z.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=bc(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=bc(b);return c};Z.attr=function(a,b){var c,d=ba(a);return d||(b=b.toLowerCase()),$.attrHandle[b]?$.attrHandle[b](a):U||d?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},Z.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},[0,0].sort(function(){return l=0}),i.compareDocumentPosition?e=function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:(e=function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],g=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return f(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)g.unshift(j),j=j.parentNode;c=e.length,d=g.length;for(var l=0;l<c&&l<d;l++)if(e[l]!==g[l])return f(e[l],g[l]);return l===c?f(a,g[l],-1):f(e[l],b,1)},f=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),Z.uniqueSort=function(a){var b,c=1;if(e){k=l,a.sort(e);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1)}return a};var bl=Z.compile=function(a,b,c){var d,e,f,g=O[a];if(g&&g.context===b)return g;e=bg(a,b,c);for(f=0;d=e[f];f++)e[f]=bj(d,b,c);return g=O[a]=bk(e),g.context=b,g.runs=g.dirruns=0,P.push(a),P.length>$.cacheLength&&delete O[P.shift()],g};Z.matches=function(a,b){return Z(a,null,null,b)},Z.matchesSelector=function(a,b){return Z(b,null,null,[a]).length>0};var bm=function(a,b,e,f,g){a=a.replace(A,"$1");var h,i,j,k,l,m,p,q,r,s=a.match(C),t=a.match(E),u=b.nodeType;if(L.POS.test(a))return bf(a,b,e,f,s);if(f)h=n.call(f,0);else if(s&&s.length===1){if(t.length>1&&u===9&&!g&&(s=L.ID.exec(t[0]))){b=$.find.ID(s[1],b,g)[0];if(!b)return e;a=a.slice(t.shift().length)}q=(s=G.exec(t[0]))&&!s.index&&b.parentNode||b,r=t.pop(),m=r.split(":not")[0];for(j=0,k=$.order.length;j<k;j++){p=$.order[j];if(s=L[p].exec(m)){h=$.find[p]((s[1]||"").replace(K,""),q,g);if(h==null)continue;m===r&&(a=a.slice(0,a.length-r.length)+m.replace(L[p],""),a||o.apply(e,n.call(h,0)));break}}}if(a){i=bl(a,b,g),d=i.dirruns++,h==null&&(h=$.find.TAG("*",G.test(a)&&b.parentNode||b));for(j=0;l=h[j];j++)c=i.runs++,i(l,b)&&e.push(l)}return e};h.querySelectorAll&&function(){var a,b=bm,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[],f=[":active"],g=i.matchesSelector||i.mozMatchesSelector||i.webkitMatchesSelector||i.oMatchesSelector||i.msMatchesSelector;T(function(a){a.innerHTML="<select><option selected></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+r+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),T(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+r+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=e.length&&new RegExp(e.join("|")),bm=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a)))if(d.nodeType===9)try{return o.apply(f,n.call(d.querySelectorAll(a),0)),f}catch(i){}else if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){var j=d.getAttribute("id"),k=j||q,l=G.test(a)&&d.parentNode||d;j?k=k.replace(c,"\\$&"):d.setAttribute("id",k);try{return o.apply(f,n.call(l.querySelectorAll(a.replace(C,"[id='"+k+"'] $&")),0)),f}catch(i){}finally{j||d.removeAttribute("id")}}return b(a,d,f,g,h)},g&&(T(function(b){a=g.call(b,"div");try{g.call(b,"[test!='']:sizzle"),f.push($.match.PSEUDO)}catch(c){}}),f=new RegExp(f.join("|")),Z.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!ba(b)&&!f.test(c)&&(!e||!e.test(c)))try{var h=g.call(b,c);if(h||a||b.document&&b.document.nodeType!==11)return h}catch(i){}return Z(c,null,null,[b]).length>0})}(),Z.attr=p.attr,p.find=Z,p.expr=Z.selectors,p.expr[":"]=p.expr.pseudos,p.unique=Z.uniqueSort,p.text=Z.getText,p.isXMLDoc=Z.isXML,p.contains=Z.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=(c[0]||c).ownerDocument||c[0]||c,typeof c.createDocumentFragment=="undefined"&&(c=e),a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=0,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(g=b===e&&bA;(h=a[s])!=null;s++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{g=g||bk(b),l=l||g.appendChild(b.createElement("div")),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(f=n.length-1;f>=0;--f)p.nodeName(n[f],"tbody")&&!n[f].childNodes.length&&n[f].parentNode.removeChild(n[f])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l=g.lastChild}h.nodeType?t.push(h):t=p.merge(t,h)}l&&(g.removeChild(l),h=l=g=null);if(!p.support.appendChecked)for(s=0;(h=t[s])!=null;s++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(s=0;(h=t[s])!=null;s++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[s+1,0].concat(r)),s+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^margin/,bO=new RegExp("^("+q+")(.*)$","i"),bP=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bQ=new RegExp("^([-+])=("+q+")","i"),bR={},bS={position:"absolute",visibility:"hidden",display:"block"},bT={letterSpacing:0,fontWeight:400,lineHeight:1},bU=["Top","Right","Bottom","Left"],bV=["Webkit","O","Moz","ms"],bW=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return bZ(this,!0)},hide:function(){return bZ(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bW.apply(this,arguments):this.each(function(){(c?a:bY(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bX(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bQ.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bX(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bT&&(f=bT[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(a,b){var c,d,e,f,g=getComputedStyle(a,null),h=a.style;return g&&(c=g[b],c===""&&!p.contains(a.ownerDocument.documentElement,a)&&(c=p.style(a,b)),bP.test(c)&&bN.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=c,c=g.width,h.width=d,h.minWidth=e,h.maxWidth=f)),c}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bP.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0||bH(a,"display")!=="none"?ca(a,b,d):p.swap(a,bS,function(){return ca(a,b,d)})},set:function(a,c,d){return b$(a,c,d?b_(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bP.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bU[d]+b]=e[d]||e[d-2]||e[0];return f}},bN.test(a)||(p.cssHooks[a+b].set=b$)});var cc=/%20/g,cd=/\[\]$/,ce=/\r?\n/g,cf=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,cg=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||cg.test(this.nodeName)||cf.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(ce,"\r\n")}}):{name:b.name,value:c.replace(ce,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ch(d,a[d],c,f);return e.join("&").replace(cc,"+")};var ci,cj,ck=/#.*$/,cl=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cm=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,cn=/^(?:GET|HEAD)$/,co=/^\/\//,cp=/\?/,cq=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cr=/([?&])_=[^&]*/,cs=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,ct=p.fn.load,cu={},cv={},cw=["*/"]+["*"];try{ci=f.href}catch(cx){ci=e.createElement("a"),ci.href="",ci=ci.href}cj=cs.exec(ci.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&ct)return ct.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cq,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cA(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cA(a,b),a},ajaxSettings:{url:ci,isLocal:cm.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cw},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cy(cu),ajaxTransport:cy(cv),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cB(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cC(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=""+(c||y),k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cl.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(ck,"").replace(co,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=cs.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]==cj[1]&&i[2]==cj[2]&&(i[3]||(i[1]==="http:"?80:443))==(cj[3]||(cj[1]==="http:"?80:443)))),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cz(cu,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!cn.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cp.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cr,"$1_="+z);l.url=A+(A===l.url?(cp.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cw+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cz(cv,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cD=[],cE=/\?/,cF=/(=)\?(?=&|$)|\?\?/,cG=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cD.pop()||p.expando+"_"+cG++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cF.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cF.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cF,"$1"+f):m?c.data=i.replace(cF,"$1"+f):k&&(c.url+=(cE.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cD.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cH,cI=a.ActiveXObject?function(){for(var a in cH)cH[a](0,1)}:!1,cJ=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cK()||cL()}:cK,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cI&&delete cH[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cJ,cI&&(cH||(cH={},p(a).unload(cI)),cH[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cM,cN,cO=/^(?:toggle|show|hide)$/,cP=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cQ=/queueHooks$/,cR=[cX],cS={"*":[function(a,b){var c,d,e,f=this.createTween(a,b),g=cP.exec(b),h=f.cur(),i=+h||0,j=1;if(g){c=+g[2],d=g[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&i){i=p.css(f.elem,a,!0)||c||1;do e=j=j||".5",i=i/j,p.style(f.elem,a,i+d),j=f.cur()/h;while(j!==1&&j!==e)}f.unit=d,f.start=i,f.end=g[1]?i+(g[1]+1)*c:c}return f}]};p.Animation=p.extend(cV,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cS[c]=cS[c]||[],cS[c].unshift(b)},prefilter:function(a,b){b?cR.unshift(a):cR.push(a)}}),p.Tween=cY,cY.prototype={constructor:cY,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cY.propHooks[this.prop];return a&&a.get?a.get(this):cY.propHooks._default.get(this)},run:function(a){var b,c=cY.propHooks[this.prop];return this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration),this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cY.propHooks._default.set(this),this}},cY.prototype.init.prototype=cY.prototype,cY.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cY.propHooks.scrollTop=cY.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(cZ(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bY).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cV(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cQ.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:cZ("show"),slideUp:cZ("hide"),slideToggle:cZ("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cY.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cN&&(cN=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cN),cN=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c$=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j,k,l,m=this[0],n=m&&m.ownerDocument;if(!n)return;return(e=n.body)===m?p.offset.bodyOffset(m):(d=n.documentElement,p.contains(d,m)?(c=m.getBoundingClientRect(),f=c_(n),g=d.clientTop||e.clientTop||0,h=d.clientLeft||e.clientLeft||0,i=f.pageYOffset||d.scrollTop,j=f.pageXOffset||d.scrollLeft,k=c.top+i-g,l=c.left+j-h,{top:k,left:l}):{top:0,left:0})},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c$.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c$.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=c_(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);
//}

//$.getScript("http://crypto-js.googlecode.com/files/CryptoJS%20v3.0.2.zip");  // Fix. Encryption algorithms. Include core in download code to eliminate dependencies and optimize efficiency.


/* Fix.  Testing.
var ACE = ace();

var testObj = ace({
	"command" : "new",
	"aceType" : "task"
});

//ace._ACE = "Modified";
ace('testID');
*/

//log("ACE LOADING");




// The ace function. Use ace(aceID) to return the object represented by aceID. aceType can be used to restrict the type(s) of entity that are acceptable to return, and can be a single or space-separated string representing the aceID or an alias of the specified aceType(s).
function ace(aceID, aceType) {
	ace._ACE = ace._ACE || new AceAPI();  // Will establish a persistent refernce to the single instance of the aceAPI object.
	var ACE = ace._ACE,  // The var used globally within the ace() member objects.
		caller = ace.caller,  // Fix.  This should be made more useful.
		argType = typeOf(aceID),
		result = null;
		
	ace.fixACE = ace.fixACE || ((function holdScope() {  // Form a closure to maintain the scope of a single aceAPI object as ace._ACE.
		var scope_ACE;
		if (ace._ACE instanceof AceAPI) { 
			ACE = scope_ACE = ace._ACE;
		} else {
			// Fix. Notify Security Alert.
			//ace._ACE = ACE = scope_ACE;
		}
		return (function() { return scope_ACE; });
	})())
	
	if (ace._ACE instanceof AceAPI) {  // Fix.  Implement some mechanism to prevent ace._ACE from being modified from outside the ace() function. Add listener, etc?
		// Fix. Does nothing but ensure lack of modifications to prototype..
	} else {
		// Fix. Notify Security Alert.
		ace._ACE = ACE = ace.fixACE();
	}
	
	
	/*
	window.ACE = window.ACE || new AceAPI(getUserLoginObj());  // Fix! Fold this into a closure to protect within ace.
	var ACE = window.ACE;    // Fix! Remove global reference!
	
	(function() {  // Closure to hold a static instance of the AceAPI object.
		var typeVal = typeOf(ACE);
		log(typeVal, "typeVal");
		ACE = ACE || new AceAPI();
		return function() { return ACE; };
	})();   // Fix! Correct all of this when time is not quite as of the essence.
	if (this != window) {  // Fix.  Use best way to see if this was instantiated using new ace(); and return null if so.
		return;  // Fix? Should re-assign this to the correct object type and return that.
	}
	*/
	

	if (argType == "string") {
		if (aceID == "rand") {
			return randString((_.isNumber(aceType)) || 32);  // Fix. Ensure Integer, also may not end up using aceType.
		} else if (_.isAceID(aceID)) {  // Fix?  Perform this here?
			return ACE.ace(aceID);
		} else {
			return;  // Fix. Error handling, Notification.
		}
	} else if (argType == 'object') {
		if ((aceID.command) || aceID.aceCall) {
			result = ACE.aceCall(aceID);
		} else if (aceID.login) {
			result = ACE.userLogin(aceID);  // Fix? Handle login result additionally?
			return ((result)?(ACE):(null));
		} else {
			return;  // Fix. Error handling.
		}
		//ACE.aceCall(aceID);  // Fix. Integrity checking and ensure only single AceObj is returned.
	} else if (argType == 'undefined') {
		result = ACE.aceCall();  // Fix. What should we do here?
	} else {
		return;  // Fix. Error handling and default behavior.
	}
	
	if (typeOf(result) == "array") {
		if (result.length == 1) {
			return result[0];
		} else if (result.length > 1) {
			return result;  // Fix.  Figure out best way to return multiple objs asynchronously.  Make AceObj act as container for other AceObjs for multiples?
		} else {
			// Fix. Error handling.
		}
	} else {
		// Fix. Error handling.
	}
	
	
	// Private methods
	
	
	// Returns the primary aceType of the entity associated with aceID.  
	function aceType(aceID) {
		// Fix.
	}
	
	
	// Converts an aceID into an array of name segments, as separated by '-' and '_'.
	function aceIDtoArray(aceID) {
		aceID = aceIDchop(aceID);
		var segs = aceID.split("_");
		var idArray = segs[0].split("-");
		if (segs[1]) {
			// Fix. Complete behavior for concatenated system IDs.
		}
		return segs;
	}	
	
	
	// Generates random string for salting and hash generation, etc.
	function randString(length, chars) {
		if (!chars) { chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"; }
		if (!length) { length = 256; }
		var charString = '',
			charsL = chars.length;
		for (var i=0; i<length; i++) {
			charString += chars.charAt(Math.floor(Math.random()*charsL));
		}
		return charString;
	}
	
	// Drops the ace_ prefix from an aceID and returns the modified string for consistent usage.
	function aceIDchop(aceID, prefix) {
		//console.log("aceIDchop() aceID: "+aceID);  // Fix.
		if (typeof(aceID) != 'string' || !aceID.length) { return false; }  // Fix. Return as string? Error handling.
		if (prefix) { aceID = aceIDChop(aceID); } else { prefix = "ace_"; }
		if ((aceID.length > prefix.length) && (aceID.substr(0,prefix.length) == prefix)) { 
			return aceID.substr(prefix.length);
		} else {
			return aceID;
		}
		// Fix.  The following was an original hack combining this with what became aceIDtoArray().
		// var segs = aceID.split("_");
		// if (segs[0] == 'ace') { segs.shift(); }  // segs.splice(0, 1); }
		// if (segs[1]) {
			// return segs.join('_');
		// } else {
			// return segs[0];
		// }
	}
	
	
	// Boolean check to determine whether aceID represents a 'typ' entity structure by using simple name prefix check. Returns true or false.
	function isTyp(aceID) {
		if ((!(aceID = aceIDchop(aceID))) || (aceID.length < 5)) { return false; }
		return (aceID.substr(0,3) == "typ") ? (true) : (false);
	}
		
		
	// Objects available for privilaged use to this object.
	
	
	// The abstraction used to communicate with the central ACE system. The connection is abstracted and can be a local system call, across a network, or any other mechanism.
	function AceAPI() {
		var _AceAPI = this,
			userID = null,
			userName = null,
			markedTimes = [],
			uiArray = [],  // Used to track all AceUI instances currently loaded.
			data = null,  // The object abstraction used to interact with data locally, which automatically conveys through the ACE network.		
			keyCheck = {};  // Used by aceCheck to verify mutual access to this specific AceAPI for authentication.
			
		function initialize() {
			data = new AceData(_AceAPI);
		}
		
		// Authenticates user and returns their userID if successful, else null. Receives an object containing {"login":TRUE|FALSE, "userName":user, ("password":pass || "key":keyHash)}
		this.userLogin = function userLogin(loginObj) {
			loginObj = {  // Fix! Drop this.
				"login" : 1,
				"userName" : "testUser",
				"passHash" : "1234567890",
				"keyHash" : "0987654321"
			}
			userName = loginObj.userName;
			//var passHash = loginObj.passHash;
			//var keyHash = loginObj.keyHash;
			
			userID = "usr-test";  // Fix!!! Quick hack for testing. Should check local storage for auto-login, and connect through comm if desired. Else should request username and password.
			userName = "TestUser";  // Fix! Just for testing. 
			// Fix! Set userID and loginObj to fixed state here. Perform remaining login tasks!
			return userID;
		}
		
		
		// Returns the userID of the current user if logged in, null otherwise. If name is set, the userName will be returned.
		this.loggedIn = function loggedIn(name) {  // Fix. Identify best way to pass name into this, Remove auto-call?
			if (name) {
				return userName;  // Fix? Error handling, check access?
			} else if (userID) {
				return userID;  // Fix! Ensure this is passed by value.
			}
			return null;
			//return ((userID)?(ace().get('Name')):(null));
		}
		
		
		// Used to securely pass calls and data access scope between objects.  
		function callKey(callObj) {
			return function callPass(localACE) {
				// Fix.
			}
		}
		
		
		// Verifies a correct match between two key pairs. Used to authenticate mutual simultaneous access to this specific AceAPI by objects not sharing the same scope.
		this.aceCheck = function AceAPI_aceCheck(keyString) {
			var value = null;
			if (typeof(keyString) == "string") {
				value = keyCheck[keyString];
				if (value) {
					delete keyCheck[keyString];
					if (value != "verified") {
						keyCheck[value] = "verified";
					}
					return value;
				}
			} else if (!keyString) {
				//keyString = randString();  // Fix. Ensure doesn't already exist. Miniscule odds but theoretically possible.
				keyCheck[keyString = randString()] = randString();
				return keyString;
			}
		}
		
		
		// The universal shortcut method for returning an aceObj represented by aceID. Actually just calls data.ace(); loadRadius sets the number of peripheral load steps to take in loading lnk and sub-entities.
		this.ace = function AceAPI_ace(aceID, loadDepth) {
			if (typeof(aceID) == "string") { return data.ace(aceID, loadDepth); }
		}
		
		
		// The universal access method for the ACE API. Accepts an object using the ReSTful ACE communications protocols, as single or batch requests. See http://openace
		this.aceCall = function AceAPI_aceCall(callObj, caller) {  // Fix.  This function needs re-optimized since converting the call process.
			var aceID, key, value, commandBlock, callType, aceType, result, typ;
			var resultsArray = [];
			callType = typeOf(callObj);
			if (callType == "undefined") { return data.ace("_system_", "sys"); }  // Creates and returns an AceObj with no aceID, typically used to create an access point for system and retain a closure reference of the AceAPI object.
			if (callType == "string") { return data.ace(callObj); }  // Allow single string arg for possibility to make "get" aceCall using it as an aceID. 
			if (callType == "array") { return data.aceCall(callObj, "container"); }  // Creates and returns an AceObj with no aceID that serves as a collection of AceObjs to handle batch operations on or route to other processes.
			if (callType != 'object') { return; }  // Fix.  Error handling.
			
			// Call Redirections 
			if (callObj["aceCall"]) {
			//	return ACE.aceCall(value);
			} else if (callObj["command"]) {
				return [data.aceCall(callObj)];
			}
			
			// Iterate through the acceptable callObj command types:  
			if (value = callObj["get"]) {  				// Analogous to ReST: GET, or CRUD: load.
				//log("aceCall to ACE 'get': "+value);
				callType = typeOf(value);
				if (callType == 'string') {  // Can be in form { "get" : "{aceID}" (, aceType:"aceType")}
					result = data.aceCall({
						"command" : "get",
						"aceID" : value,
						"typ" : callObj.aceType
					}); 
					resultsArray.push(result);
				} else if (callType == 'object') {  
					if (aceID = value["aceID"]) {  // Single nested call { "get" : { "aceID":"{aceID}" } }
						result = data.aceCall({
							"command" : "get",
							"aceID" : aceID
						});
					}
					resultsArray.push(result);
				} else if (callType == 'array') { // Multiple get calls, can take several forms: 
					var thisItem;
					for (key in value) {
						callType = typeOf(thisItem = value[key]);
						if (callType == 'string') {  // { "get" : [ "{aceID}", "{aceID}", ... ] }
							result = data.aceCall({
								"command" : "get",
								"aceID" : thisItem
							});
							resultsArray.push(result);
						} else if (callType == 'object') {  // { "get" : [ {"aceID":"{aceID}"}, {"aceID":"{aceID}"}, ... ] }
							if (thisItem["aceID"]) {
								result = data.aceCall({
									"command" : "get",
									"aceID" : thisItem["aceID"]
								});
								resultsArray.push(result);
							} else {
								// Fix? Other possibilities?
							}
						} else {
							// Fix. Error handling.
						}
						/*result = data.aceCall({  // Fix.  Left from previos structure, check.
							"command" : "get",
							"aceID" : value[key]
						}); */
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["set"]) {  				// Analogous to ReST: PUT, or CRUD: update.
				//log("aceCall to value 'set': "+value);
				callType = typeOf(value);
				if (callType == 'object') {  // Nested call { "set" : { "{aceID}":{"property":"value"}, "{aceID}":{"property":"value"}, ...} }
					for (aceID in value) { 
						if (typeOf(commandBlock = value[aceID]) == 'object') {
							result = data.aceCall({
								"command" : "set",
								"aceID" : aceID,
								"items" : value[aceID]  // Fix? Parse the individual prop:value pairs here?
							}); 
							resultsArray.push(result);
						} else {
							// Fix. Error handling, Other options?
						}
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["new"]) {  				// Analogous to ReST: POST, or CRUD: create.
				var i=0, len=0;
				//log("aceCall to value 'new': "+value);
				callType = typeOf(value);
				if (callType == 'object') {  // Nested call { "new" : { "{aceType}":[{"aceID":"value", "property":"value", ...}, {"alias":"value", ...}, ...], "{aceType}":{"aceID":{"property":"value", ...}, "alias":{"property":"value", ...}, ...} } }
					for (aceType in value) {
						if (typeOf(commandBlock = value[aceType]) == 'array') {  // Nested array call  { "new" : { "{aceType}":[{"aceID":"value", "property":"value", ...}, {"alias":"value", ...}, ...] }, ... }
							if (len = commandBlock.length) { 
								for (i=0; i<len; i++) {
									if (typeOf(key = commandBlock[i]) == 'object') {
										aceID = (key.aceID || key.alias || _AceAPI.nextAceID());  // Fix. Remove alias and aceID items from commandBlock, resolve conflicts, duplicates, etc.
										result = data.aceCall({
											"command" : "new",
											"typ" : aceType,
											"aceID" : aceID,
											"items" : key  // Fix? Parse the individual prop:value pairs here?
										});
										resultsArray.push(result);
									} else {
										// Fix. Error handling.
									}
								}
							} else {
								// Fix. Error handling.
							}
						} else if (typeOf(commandBlock) == 'object') {  // Nested objects with proposed alias as keys { "new" : { "{aceType}":{"aceID":{"property":"value", ...}, "alias":{"property":"value", ...}, ...} } }
							for (aceID in commandBlock) {
								result = data.aceCall({
									"command" : "new",
									"typ" : aceType,
									"aceID" : aceID,
									"items" : commandBlock[aceID]
								});
								resultsArray.push(result);
							}
						} else {
							// Fix. Error handling, Other options?
						}
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["del"]) {  				// Analogous to ReST: DELETE, or CRUD: delete.
				//log("aceCall to value 'del': "+value);
				callType = typeOf(value);
				if (callType == 'string') { 						
					result = data.aceCall({
						"command" : "del",
						"aceID" : value
					});
					resultsArray.push(result);
				} else if (callType == 'object') {
					for (key in value) { 
						result = data.aceCall({
							"command" : "del",
							"aceID" : value[key]
						}); 
						resultsArray.push(result);
					} 
				} else {
					// Fix.  Error handling.
				}
			}
			if (value = callObj["dat"]) {  				// If loading from a file, stream, or other data source. Imports the object but does not propogate new or get calls.
				if (_.isObject(value)) {
					_.each(value, function(items,id) {
						result = data.aceCall({
							"command" : "dat",
							"aceID" : id,
							"items" : items
						});
						resultsArray.push(result);
					});
				} else {
					// Fix.  Error handling.
				}
			}
			
			if ((value = resultsArray.length) > 1) {
				return data.ace(resultsArray);
			} else if (value = 1) {
				return resultsArray[0];
			} else {
				// Fix.  Error handling.
			}
		}
		
		
		// Returns an incremented aceID.  Does nothing to any actual aceObjs, just performs the increment.
		this.nextAceID = function AceAPI_nextAceId(aceID) {
			if (!aceID || aceID == "") { return "A"; }  // Fix? aceIDs start with a letter.
			if (typeof(aceID) != 'string') { return false; }
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			var lastChar = aceID.charAt(aceID.length - 1);
			if (lastChar == '_') { return aceID + "a"; }  // Fix? Handle this behavior.
			if (lastChar == 'Z') { return (aceID + '0'); }
			var newID = aceID[(aceID.length - 1)] = (chars.charAt(chars.indexOf(lastChar) + 1));
			//log("aceID: |"+aceID+"|,  newID: |"+newID+"|");
			return newID;
		}
	
	
		// Used to gauge server load times across operations. eventNote is a string to associate with the event.
		this.markTime = function AceAPI_markTime(eventNote) {
			var timeNow = Date.now();
			var thisEvent = { time:timeNow, note:eventNote }
			if (markedTimes.length > 0) {
				var slotNum = (markedTimes.length - 1);
				var lastEvent = markedTimes[slotNum];
				var firstEvent = markedTimes[0];
				thisEvent.elapsed = (timeNow - lastEvent.time);
				thisEvent.total = (timeNow - firstEvent.time);
			} else {
				thisEvent.total = thisEvent.elapsed = 0;
			}
			markedTimes.push(thisEvent);
		}
		
		// Used to register and remove AceUI elements, send commands to and otherwise access the UI system associated with this ACE login.
		this.ui = function AceAPI_ui(callObj) {
			if (!_.isObject(callObj)) { return; }
			var command = callObj.command,
				uiType = callObj.uiType,
				domElement = callObj.domElement,
				uiID = callObj.uiID,
				aceID = callObj.aceID;
			
		}
		
		// Creates (if referTo is set) or resolves (if !referTo) an alias and propogates the call across this node.
		this.als = this.alias = function AceAPI_als(alias, referTo) {
			if (referTo) {
				return data.setAlias(alias, referTo);
			} else {
				return data.getAlias(alias);
			}
		}
		
		// Returns an empty object template structure for the entity represented by aceID.
		this.aceTyp = function AceAPI_aceTyp(aceID) {
			return data.aceTyp(aceID);
		}
		
		// These allow functions defined within ace() to be accessed outside of its scope.  Fix.
		this.aceIDChop = aceIDchop;
		
		initialize();
	}//AceAPI
	
	
	// The object abstraction used to interact with data locally, which automatically propogates through the ACE network.
	function AceData(ACE) {
		_AceData = this;
		var db = new DatabaseObj();  // An abstraction used for local database access.
		var comm = new AceComm(aceDataCallBack);  // Used for all communications with servers, other clients, and systems across network interfaces.
		var cryptObj = new AceCryptObj();
		var memObj = {  // An object representation of all data currently in local memory.
			"items" : {  // Contains all aceIDs stored locally, and links them to the object data associated with their internal items var.
				"aceID" : "AceObj.items"
			},
			"alias" : {  // Contains all Alias aceIDs stored locally that refer to a System aceID or another alias.
				"aliasID" : "aceID"
			},
			"aceObj" : {  // All aceObjs currently loaded in system memory.
				"aceID" : "aceObj"
			},
			"typ" : {  // The alias calls of entity types maintained locally, used to instantiate complex objects using layering via aceObj's "typ" fields.
				
			},
			"tempIDs" : {  // All aceObjs with temporary aceIDs (tmp-0Aa...) currently loaded in system memory and referenced by that ID.
				"tmp-max" : "maxID"  // The highest tempID currently issued by this system.
			}, 
			"que" : {  // Stores requests to be made to server and items returned but not loaded yet.
				"out" : {  // an object containing calls to be sent to the server in a batch call; divided by API commands.
					"get" : {
					
					},
					"set" : {
					
					},
					"new" : {
					
					},
					"del" : {
					
					}
				},
				"in" : {  // a collection of JSON objects representing sequential batches of returned call results.
					
				}
			},
			"sys" : {  // Used to hold system objects in memory for storing to disk between page loads rather than having to re-instantiate everything.  // Fix? Security risk?
				"db" : db,
				"comm" : comm
				//"userID" : _AceAPI.loggedIn()  // Fix.
			}
		}
		
		
		// Used to grab existing aceObj with aceID or instantiate a new one. If aceID represents a 'typ' structure, a new aceObj of that type will be instantiated and returned. If aceID is an array of aceIDs or aceObjs, a new container aceObj will be instantiated to hold them. loadDepth sets the number of peripheral load steps to take in loading lnk and sub-entities.
		var _ace = this.ace = function AceData_ace(aceID, loadDepth) {
			//if (!securityCheck(aceID, caller, "ace")) { return false; }  // Fix! Handle for cases of comm latency. Return AceObj. Error handling and notification.
			if (typeof(aceID) == "string") {
				if (!(aceID = aceIDchop(aceID))) {  // If this is an invalid aceID, return a bad object.
					return badCall();
				} else if (false) {  // Fix.  isTyp(aceID)) {  // If calling a 'typ' aceID, create a new AceObj of that typ. There are many instances where we may want the typ object structure for quick checks, so removed this.
					return newCall({  // Fix. Remove this. Eliminated reliance on 'typ' designation. 
						"command" : "new",
						"typ" : aceID
						//"caller" : caller
					});
				} else if (memObj.aceObj[aceID]) {  // If this AceObj exists in memory, return it.
					return memObj.aceObj[aceID];
				} else if (result = db.ace(aceID)) {  // If we find this aceID in the local db, instantiate it.
					return datCall({
						"command" : "dat",
						"aceID" : aceID,
						"items" : result,
						"loadDepth" : loadDepth,
						"source" : "db"
					});
				} else {  // Otherwise, send a 'get' call through to comm which returns a waiting AceObj.
					return comCall({
						"command" : "get",
						"aceID" : aceID,
						"loadDepth" : loadDepth,
						"caller" : caller
					});
				}
			} else if (typeOf(aceID) == 'array') {  // Fix. Do we want this?
				//return new AceObj(aceID, 'container');
			} else {
				return badCall();
			}
		}//AceData_ace()
		
		
		// Used to call the AceData abstraction for a single AceObj, handles logic and safety for calls. Attempts local action, propogating to the local db, and then sends to aceComm for central server transmission. Ultimately it makes more sense to centralize the security checking, decision-making, and propogation within this function because the object reference is never passed outside of AceAPI or AceObj so we can focus on ensuring integrity of these structures mere dependably than for those objects which we pass back to the user applications.
		this.aceCall = function AceData_aceCall(callObj) {
			if ((typeOf(callObj) != 'object') || (!safetyCheck(callObj))) { return; }  // Fix.  Error handling.
			//if (callObj.caller != AceData_aceCall.caller) { callObj.caller = AceData_aceCall.caller; } // Fix. This was from before structuring aceObj as the central logic point.
			callObj.dataCallTime = Date.now();
			
			var command = callObj.command;
			// Fix.  This was all removed when local functions were established for each call type
				// aceObj = null,
				// result = null,
				// aceType = callObj.aceType,
				// items = callObj.items;  // Fix. If setting or creating a new typ, corresponds to aceObj items structure.
				
			// if (typeof(aceID) == 'string') {  // All calls should have an associated aceID...
				// aceObj = _AceData.ace(aceID);  // This handles decision-making for memory check versus instantiating new aceObj.
				// if (!aceObj) { return; }  // Returns on security check failure or no retreived object.  // Fix. Notification, error handling, security alert
			// } else {
				// return; // Fix. Error handling and notification.
			// }
			
			// if (typeof(items) == "array") {  // If specifying properties for 'set' or 'new'
				// // Fix.
				// //if (callObj.props) { ; }  // Fix. Choose best structure for passing props.
			// }
			
			if (!command) { 
				// Fix. Behavior here?
			} else if (command == "get") {							// command == "get"
				return getCall(callObj);
			} else if (command == "set") {							// command == "set"
				return setCall(callObj);
			} else if (command == "new") {							// command == "new"
				return newCall(callObj);
			} else if (command == "del") {							// command == "del" 
				return delCall(callObj);
			} else if (command == "dat") {							// command == "dat" 
				return datCall(callObj);
			} else {
				// Fix. Handling for incorrect commands.
			}
			return result;
			
		}//AceData_aceCall()
		
		
		// The central handler for AceObj calls of 'command'=='get'.
		function getCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			return _ace(callObj.aceID, callObj.caller);
			// Fix? Complete this as a way of returning AceObj props? May not even need it though, as this function could sensibly be put in AceObj?
		}
		
		
		// The central handler for AceObj calls of 'command'=='set'.
		function setCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			if (!callObj.aceID) { return; }  // Fix?
			var resultObj = {},
				callItems = callObj.items,
				objItems = memObj.items[callObj.aceID];
			if (callItems) {
				for (var item in callItems) {
					resultObj[item] = {  // Fix. Use best callObj identifier (time, user.sub-aceID, etc. to stamp call and include sub-portion of entity that was modified.  Include also the previous value before the mod? 
						"userID" : ACE.loggedIn(),
						"sect" : "cor",
						"new" : callItems.item
					}
					if (item=="props") {  // Fix? Add more... // Check for illegal item names and skip them.
						// Fix? Do anything here?
					} else if (objItems.cor.item != undefined) {  // Fix! Needs converted from old structure.
						resultObj[item].old = objItems.cor.item;
						objItems.cor.item = callItems.item;
					} else if (objItems.cor.props.item != undefined) {  // Fix! Needs converted from old structure.
						resultObj[item].sect = "cor.props";
						resultObj[item].old = objItems.cor.props.item;
						objItems.cor.props.item = callItems.item;
					}
					// Fix. Include other possible sub-modules.
				}
			} else {
				// Fix. Error handling, other options?
			}
			//memObj.que.out.// Fix. Complete this.
			return memObj.aceObj[callObj.aceID];
			db.aceCall(callObj);
			comm.aceCall(callObj);
		}
		
		
		// The central handler for AceObj calls of 'command'=='new'. Returns the newly generated AceObj.
		function newCall(callObj) {
			if (typeOf(callObj) != "object") { return; }  // Fix?
			callObj.status = callObj.command = "new";
			if (!callObj.aceID) { callObj.aceID = _AceData.nextAceID(); }
			if (!callObj.typ) { callObj.typ = "typ-ent"; }
			var aceID = callObj.aceID,
				typID = callObj.typ,
				typObj = _ace(typID),
				items = aceTyp();
				
			items.als.push(aceID);
			items.cor.aceID = aceID;
			items.cor.typ = typID;
			items.sys.topSubID = "a";
			items.sys.created = Date.now();
			items.sys.creator = ACE.loggedIn();
			memObj.tempIDs[aceID] = null;
			
			
			//if (!isTyp(callObj.aceID)) { 
				// Fix. Handle this case. Clone AceObj represented by aceID? New AceObj of that typ?
			//} 
			// if (!memObj.items[aceID]) {  // Fix. Handle special cases that can occur if not in memory.
				// var testObj = null;
				// _ace(callObj.aceID);
				// _AceData.aceType(callObj.aceID);
				// if (aceID.status() != "loaded") {
					// return; // Fix. Handle this case. Must ensure we don't asynchronously duplicate an aceID. Probably que the command and set the return call for the above object 
				// }
			// } 
			if (callObj.items) {
				// Fix. Complete this. Safety checking, special considerations.
			} else { callObj.items = undefined; }  // Fix? Ensure $.extend() will ignore it.
			
			if (!memObj.items[typID]) { memObj.items[typID] = null; }  // Fix? Should never happen.
			if (typObj.status() == "loaded") { 
				memObj.items[aceID] = _.extend({}, items, memObj.items[typID], callObj.items);  // Fix? Ensure this works correctly in all cases. Should secure a closure and be passed by reference into the AceObj.
			} else {  
				// Fix. Pass callback to this object to execute once it's loaded completely. Also account for bad objects, offline, etc.
			}
			memObj.aceObj[aceID] = new AceObj(callObj, memObj.items[aceID]);
			callObj.items = packItems(callObj.aceID);
			dbCall(callObj);
			comCall(callObj);
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// The central handler for AceObj calls of 'command'=='del'.
		function delCall(callObj) {
			// Fix. Complete this. 
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// Used when loading existing data into local system as from comm return calls or files.
		function datCall(callObj, queIDs) {  // Fix. Error checking.
			if (!_.isObject(callObj)) { return; }  // Fix?
			var caller = callObj.caller,
				aceID = callObj.aceID,
				items = callObj.items,
				lnkTypes = ["als","cor","itm","typ","has"],  // Fix! Obtain programmatically.
				obj = {},  // Fix?
				typ = "";
				
			if (!_.isObject(items)) { return false; }  // Fix. Error handling, notification.
			if (memObj.items[aceID]) {
				return memObj.aceObj[aceID];  // Fix! Handle case where object already exists in memory. Alert, merge options, fork, etc.
				objCollision(callObj);
			} else {
				// Fix. Handle latency.
			}
			
			
			if (aceID == "typ-ent") { 
				memObj.items[aceID] = items;  // Fix!!! Safety handling.
				memObj.aceObj[aceID] = new AceObj(callObj, memObj.items[aceID]);
				callObj.items = packItems(aceID);
				callObj.command = "new";
				dbCall(callObj);
				return memObj.aceObj[callObj.aceID]; 
			}
			
			
			
			typ = (items.cor && items.cor.typ) ? (_ace(items.cor.typ).toStr()) : ("typ-ent");
			memObj.items[aceID] = _.extend((aceTyp(typ) || {}), memObj.items[aceID], items);  // Fix. Inefficient?  Use .prototype?
						
			_.each(items, function(lnk,key) {
				if (_.indexOf(lnkTypes,key)) {  // If this is a lnk-typ category
					var typLnk = key;
					if (typLnk = "cor") {
						typ = _ace(lnk.typ);  // memObj.items[aceID]
					}
					_.each(val, function(val,itm) {
						result = data.aceCall({
							"command" : "dat",
							"aceID" : id,
							"items" : val
						}); 
					});
				} else {
					aceType = key;
				}
				
				
				
			});
			
			memObj.aceObj[aceID] = new AceObj(callObj, memObj.items[aceID]);  // Fix! Experiment with this to determine best method for passing items.
			unpackItems(aceID, callObj.items);  // Fix. Check for error, inflate from string and ensure not passed by reference.
			return memObj.aceObj[aceID];
		}
		
		
		// Used to return an empty or faulty AceObj when appropriate.
		function badCall(callObj) {
			var typChk = null;
			callObj = {
				"callObj" : callObj,  // Fix? Stringify?
				"status" : "bad"
			};
			return new AceObj(callObj, {});
		}
		
		
		// Used to handle calls made to the local AceDatabase object.
		function dbCall(callObj) {  // Fix! Ensure caller security of this operation
			var result = null;
			
			if (typeOf(callObj) != "object") { return; }  // Fix?
			if (!callObj.aceID) { 
				// Fix. Error handling. Do anything here?
			}
			if (!memObj.aceObj[callObj.aceID]) {
				// Fix. Error handling. Create new?
			}
			if (!callObj.command || callObj.command == "db") { callObj.command = "get"; }  // Fix? May want to return rather than defaulting to 'get' call?
			result = db.aceCall(callObj);
			if (callObj.command == "get") {  // Fix? Place logic elsewhere?
				memObj.aceObj[callObj.aceID] = result;
			}
			return memObj.aceObj[callObj.aceID];
		}
		
		
		// Used to handle calls made to the comm object.
		function comCall(callObj) {  // Fix! Ensure caller security of this operation
			if (typeOf(callObj) != "object") { return; }  // Fix?
			var aceID = callObj.aceID;
			if (!aceID) { 
				// Fix.  What to do here?
			}
			if (!memObj.aceObj[aceID]) {  // Fix. Complete this.
				memObj.items[aceID] = aceTyp();
				memObj.aceObj[aceID] = new AceObj({
					"aceID" : aceID,
					"status" : "waiting",
					"command" : "com"
				}, memObj.items[aceID]);
			}
			if (!callObj.command || callObj.command == "com") { callObj.command = "get"; }
			comm.aceCall({
				"command" : "get",
				"aceID" : aceID,
				"caller" : memObj.aceObj[aceID]  // Fix. Pass callBack to handle latency.
			});
			memObj.tempIDs[aceID] = null;  // Fix? Address duplicates only on collision rather than here?
			return memObj.aceObj[aceID];
		}
		
		
		// Cycles through all of the AceObj items for aceID and performs an ace() call on their aceID's to instantiate those not already loaded.
		function loadCall(aceID) {
			// Fix. This has been transitioned directly into the AceObj.
			// if (!aceID) { return; }
			// var items = memObj.items[aceID],
				// itemName = null,
				// itemObj = null,
				// subName = null,
				// subItem = null;
			// itemObj = 
			// for (itemName in items["ext"]) {
				// _ace(item);
				// _ace(memObj.items[aceID]["ext"][item]);
			// }
			// for (item in memObj.items[aceID]["asp"]) {
				// _ace(item);
				// _ace(memObj.items[aceID]["ext"][item]);
			// }
		}
		
		
		// Resolves a variable to a string output. Used to handle items that may be strings, aceID's, or even aceObjs.
		function toStr(objStr) {
			if (_.isAceID(objStr)) {
				return toStr(_ace(objStr));
			} else if (_.isAceObj(objStr)) {
				return objStr.toStr();
			} else if (_.isString(objStr)) {
				return objStr;
			} else {
				return objStr.toString();  // Fix? Default to error, null, or other options?
			}
		}
		
		
		// Creates a new alias and propogates the call across this node.
		this.setAlias = setAlias; function setAlias(alias, referTo) {
			var refObj = _ace(referTo);
			if (!_.isAceID(alias) || !_.isAceID(referTo)) { return; }
			if (!refObj.als(alias, "check")) { refObj.als(alias, "to"); }
			var existing = getAlias(alias);
			if (existing) {
				if (existing == referTo) {
					// Fix! Handle behavior if alias already exists towards other aceID.
				} else {
					return referTo;
				}
			} else {
				memObj.alias[alias] = referTo;  // Fix. Error checking, handle latency, etc.
			}
			// Fix. Return value accordingly
		}
		
		
		// Checks for an alias and propogates the call across this node. On latency, ...
		this.getAlias = getAlias; function getAlias(alias) {
			if (!_.isAceID(alias)) { return; }
			var resolved = memObj.alias[alias];
			return getAlias(resolved) || resolved;  // For recursive references.
			
			// if (resolved) {
				 // again = 
			// } else {
			
			// }
		}
		
		
		// Occurs when multiple instances of same AceObj exist, as when loaded through a aceCall(dat) call or due to changes made to temporary object during latency, etc. 
		function objCollision(callObj) {
			var aceID = callObj.aceID,
				items = callObj.items,
				newID = 'tmp-'+_AceData.nextAceID(),
				action = {  // Fix. Identify best protocols here.
					"act" : null,
					"state" : "sta-conflict",
					"var-memID" : aceID,
					"var-datID" : newID
				};
			
			
			_ace(aceID).alt(newID);
			memObj.tempIDs[newID] = aceID;
			ACE.ui({
				"act" : "msg",
				"msg" : "msg-aceObj-conflict",
				"choice" : {
					"btn-merge" : act,
					"btn-fork" : forkObj()
				}
				
			});
		}
		
		
		// Used on AceObj collision to merge multiple instances of same AceObj into single profile. 
		function mergeObjs(callObj) {
			if (!_.isAceID(callObj.aceID)) { return; }
			var aceID = callObj.aceID,
				realID = getAlias(aceID),
				thisObj = _ace(aceID),
				tmpObj = null, 
				alsArray = []; 
				
			//if (memObj.tempIDs) { ; }
		}
		
		
		// Forks an instance of an AceObj to be substituted for another under the context of a given entity.
		function forkObj(callObj) {
			var aceID = callObj.aceID,
				forkID = (callObj.forkID || _AceData.nextAceID());
		}
		
		
		// Registers an alternative to an AceObj as aceID and altID, and cross-links the two.
		function altObj(callObj) {
			var aceID = callObj.aceID,
				altID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
				
			if (memObj.aceObj[aceID]) {
				if (memObj.aceObj[altID]) {
					// Fix. Special handling?
				} else {
					newCall({
						"aceID" : altID,
						"typ" : aceID,
						"items" : callObj.items
					});
				}
			} else {
				// Fix. Handle this case.
			}
				
			thisObj = memObj.items[altID];
			if (thisObj) {
				if (!thisObj.itm) { thisObj.itm = {}; }
				if (!thisObj.itm.alt) { 
					thisObj.itm.alt = newLnk({
						
					}); 
				} else {
					// Fix. Add alt to existing lnk.
				}
			}
		}
		
		
		// Resolves *callObj* items to the target aceID if using alias IDs (Does not affect memory items). Can also pass an aceID directly as a string callObj if it is an aliasID.
		function alsToID(callObj) {  // Fix.
			//if (!memObj.aceObj[aceID]) { return callObj; }
			var alias = callObj.alias || callObj.als || null,
				aceID = callObj.aceID || alias;
			callObj.aceID = (getAlias(aceID) || getAlias(alias) || aceID);
			return callObj;
		}
		
		
		// Returns empty object template structure taken from the AceData instance abstraction. Attempts local action, propogating to the local db, and then sends to aceComm for central server transmission.  Will callBack to the instantiated object if latency exists.
		this.aceTyp = aceTyp; function aceTyp(aceID) {
			if (!aceID || !_.isAceID(aceID)) { aceID = "typ-ent"; }  // Fix?
			var result = memObj.typ[aceID];
			if (_.isObject(result)) {
				return _.extend({}, result);
			} else if (_.isObject(memObj.aceObj[aceID]) && memObj.aceObj[aceID].ready()) {
				return _.extend({}, memObj.typ[aceID] = objStruct(memObj.items[altID]));
			} else {
				comm.ace(aceID, function(){  // Fix. Handle latency via callBack.
					
				});
				return _.extend({}, memObj.typ[aceID] = entityCore(aceID));  // Fix. Specific handling for waiting on response? Handle via collision?
			}
		}//aceTyp()
		
		
		// Fix! Obsolete.  Based on old model, ensure nothing is calling this and remove it.  // Returns JSON string representing aceType object template structures from the AceData abstraction if aceType represents a 'typ' ID or alias. Attempts local action, propogating to the local db, and then sends to aceComm for central server transmission.
		this.aceType = function AceData_aceType(aceType, caller) {
			//if (!aceType) { aceType = "typ-entity"; }  // Fix? Is this ever useful?
			if (!isTyp(aceType)) { return false; }
			var result = memObj.aceType[aceType];
			if (result) {
				return result;
			} else if (result = db.aceType(aceType)) {
				if (typeof(result) == 'string') {  // Fix? Storing as string on assumption that it's faster to convert than copying an object. See AceObj_new().
					//result = memObj.aceType[aceType] = JSON.parse(result);    // Fix? See above line.
					return memObj.aceType[aceType] = result;
				} else {
					// Fix. Error handling?
				}
			} else {
				comm.aceType(aceType, caller);  // Message handling is returned to the caller via comm.
				return false;  // Fix. Handle this return type and value. Specific handling for waiting on response?
			}
			return false;  // Fix. Handle this return type and value.
		}//AceData_aceType()
		
		
		// Special case for creating new aceType 'typ' classes.
		this.newType = function AceData_newType(aceObj, aceType) {
			
		}//AceData_newType()
		
		
		// Creates a new lnk object to connect an aspect of an AceObj to another.
		function newLnk(callObj) {
			var aceID = callObj.aceID,
				typLnk = callObj.typLnk,
				itmCat = (lnkCat(callObj) || "lnk"),
				lnkID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
		}
		
		
		// Adds an internl lnk reference to AceObj represented by lnkID for typLnk aspect of aceID.
		function lnkTo(callObj) {
			var aceID = callObj.aceID,
				typLnk = callObj.typLnk,
				itmCat = (lnkCat(callObj) || "lnk"),
				lnkID = (callObj.altID || _AceData.nextAceID()),
				thisObj = {};
		}
		
		
		// Checks for the existence of a lnk referenced by typLnk and returns the itm-cat designation for it. Returns null if no lnk of type typLnk exists in any of the item categories.
		function lnkCat(callObj) {
			var typLnk = callObj.typLnk,
				itemsObj = memObj.items[callObj.aceID],
				chkArray = ["cor","typ","has","lnk"],  // Fix. Obtain programmatically.
				lnks = null;
			if (!typLnk || !_.isObject(itemsObj)) { return; }
			_.each(chkArray, function(cat,num) {  // Fix? Mechanism to address multiple instances in different categories?
				lnks = itemsObj[cat];
				if (_.isObject(lnks)) {
					_.each(lnks, function(lnk,typ) {
						if (typ == typLnk) { return cat; }
					});
				}
			});
		}
		
		
		// Parses through an object's structure and makes a copy of the keys but with null values.  Used by aceTyp.
		function objStruct(srcObj) {
			var newObj = {};
			_.each(srcObj, function(val,key) {
				if (_.isObject(val)) {
					if (key=="sec" || key=="lds") {  // Fix? Other special cases? Handle differently?
						newObj[key] = _.extend({}, val);
					} else {
						newObj[key] = objStruct(val);
					}
				} else if (_.isArray(val)) {
					newObj[key] = [];
				} else {
					newObj[key] = null;
				}
			});
			return newObj;
		}
		
		
		// In rare case where basic entity structure is not held in memory or local storage, the basic itm structure will be returned via this function and added to the central memObj.typ record.
		function entityCore() {  // Fix! Replace this and ensure new instance generated for waiting comm calls, later replaced during collision.
			if (!memObj.typ["typ-ent"]) { 
				memObj.typ["typ-ent"] = {  // Fix. Ensure object structure matches that in db.
					"cor":{"aceID":"typ-ent","typ":"typ-ent"},
					"als":["typ-ent"],"itm":{},"typ":{},"has":{},
					"sys":{"topSubID":"a"},
					"lnk":{"par":{},"chd":{},"fnd":{},"ctr":{},"pri":{},"deb":{},"tag":{}},
					"lds":{"gui":["cor","itm","typ","has",{"lnk":["chd","pri","deb","tag","par"]}]},
					"sec":{"read":"*","write":"*","block":null}
				};
			}
			return _.extend({}, memObj.typ["typ-ent"]);
		}
		
		
		// Returns a converted version of live object items for aceObj with aceID as a JSON string for transmission to db and comm. Based on security settings, the string will also be encrypted through cryptObj for security.
		function packItems(aceID) {
			if (!memObj.items[aceID]) { return false; }  // Fix. error handling, notification.
			var items = JSON.stringify(memObj.items[aceID]),
				security = memObj.items[aceID].sec["read"];  // Fix. Establish security protol standard.
			if (security && security != "*") {  // Fix. Handle most effectively, Establish security protol keywords, etc.
				items = cryptObj.encrypt(items, aceID);
			}
			return items;
		}//packItems()
		
		
		// Converts an AceObj JSON string into the items entry for its aceID. If a key exists for the aceID in cryptObj, the string will also be decrypted first.
		function unpackItems(aceID, itemsString) {
			if (typeof(itemsString) != "string") { return false; }  // Fix. error handling, notification.
			if (cryptObj.checkID(aceID)) {  // If there is an encryption key for this aceID, decrypt it.
				itemsString = cryptObj.decrypt(itemsString, aceID);
			}
			return memObj.items[aceID] = JSON.parse(itemsString);  // Fix! Error checking, handling, aceID integrity, Verify whether we should set in memory, etc.
		}//unpackItems()
		
		
		// Performs alias resolution and surface-level safety checking operations for each of the various call types in relation to the user calling the function. Returns callObj, with modifications if appropriate.
		function safetyCheck(callObj) {
			// Fix! This currently does almost nothing.  May also want to include arguments.caller functionality from the point of the initial ace() call and pass into this to protect from malignant access.
			if (!callObj.typ) { callObj.typ = callObj.aceTyp || callObj.aceType || null; }
			callObj = alsToID(callObj);
			callObj.aceID = aceIDchop(callObj.aceID);
			var caller = callObj.caller,
				aceID = callObj.aceID,
				aceObj = callObj.aceObj,
				command = callObj.command;
			
			if (!command) { 
				// Fix. Behavior here?
			} else if (command == "get") {
				
			} else if (command == "set") {
				
			} else if (command == "new") {
				//if (!callObj.aceType) { callObj.aceType = 'typ-entity'; }  // Fix! Check whether this update is passed by reference to the callObj itself.
				
			} else if (command == "del") {
				
			} else if (command == "dat") {  // Fix? May never call this from here.
				
			} else {
				// Fix! Abort or correct.
			}
			
			if (typeOf(aceObj) == 'object') {  // Fix? May no longer be relevant. Used to designate an aceObj as the specific caller for safety.
				if (!aceObj.aceType()) { callObj.aceObj = null; }  // Fix. Tighten this.
			}
			
			return callObj;
		}//safetyCheck()
		
		
		// Checks user-specific access privilages for the entity represented by aceID, accounting for the calling function and command.
		function securityCheck(aceID, caller, command) {
			var userID = ACE.loggedIn();
			if (!userID) { 
				// Fix!
			}
			return true;  // Fix! This currently does nothing!
		}
		
		
		// Returns the combined userName and password as an encrypted hash.  Used to check against logins and other security encrypted functions.
		function getUserHash(userID) {
			var caller = getUserHash.caller;
			if (!securityCheck(userID, caller, "getUserHash")) { return false; }
			var userItems = memObj.items[userID];
			return CryptoJS.SHA256(userItems.userName+userItems.userPass);
		}
		
		
		// Used during response calls to load data into the aceData object. Passed into comm during instantiation to provide mechanism for handling latency.
		function aceDataCallBack(data) {
			var userID = ACE.loggedIn();
			if (!userID) { }  // Fix!
			if (aceCallBack.caller != comm) { } // Fix. Test for all scenarios. Handle security actions and notification.
			return true;  // Fix! This currently does nothing!
		}
		
		
		// Used to obtain to the next step in the ACE ID sequence after aceID. If !aceID, returns the next aceID stored within the que of this AceAPI
		this.nextAceID = function AceData_nextAceID(aceID) {
			var aceObj = _AceData.ace(aceID);
			if (!aceObj) {
				aceID = ACE.loggedIn();
				aceObj = _AceData.ace(aceID);
			}
			if (!aceObj) { return false; }  // Fix. Error handling, notification.
			return aceObj.nextAceID();
		}
		
		
		// Objects available for privilaged use to this object.
		
		
		// Security object, used to encrypt and decrypt data.
		function AceCryptObj() {
			var _AceCryptObj = this,
				//encryptionStack = {},  // Fix? This was originally used in conjunction with salt values and the userHash, but was dropped due to CryptoJS internally generating salts automatically.
				keyRing = {},
				log = [];
			
			function initialize() {
				var userID = ACE.loggedIn(), 
					userHash,
					result;
				if (!userID) { return; }  // Fix! Security handling, alert.
				userHash = getUserHash(userID);
				result = db.aceCall({  // Save pertinent objects to local db to secure AceCryptObj items.
					"command" : "get",
					"key" : "sys-AceCryptObj"
				});
				if (!result) { return false; }  // Fix. Error handling, notification alert for cases where existing obj structure is expected.
				result = CryptoJS.AES.decrypt(result, CryptoJS.SHA256(userHash).toString(CryptoJS.enc.Base64));
				if (result) {  // Fix? Explicitly convert to string if necessary. 
					result = JSON.parse(result);
					if (typeOf(result) == "array") {  // Fix? May want to store these as object rather than array?
						//encryptionStack = result[0];  // Fix. Remove this if not needed. See object vars above.
						keyRing = result[0];
						log = result[1];
					}
				}
			}
			
			// Encrypts data to be sent to processes. callKey is used to reference the encrypted data later, so should be unique and stored by entity intended for future access.
			this.encrypt = function encrypt(item, callKey) {
				var cryptStart = Date.now(),
					userID = ACE.loggedIn(),
					result = null;
				if (!userID) { return; }  // Fix! Security handling, alert.
				if (typeOf(item) != "string") { item = JSON.stringify(item); }  // Fix? Handle differently?
				if (keyRing.callKey) {
					// Fix! Handle case when callKey already exists for encrypted data.
				}
				keyRing.callKey = randString()+cryptStart;
				result = CryptoJS.AES.encrypt(item, keyRing.callKey);  // Fix? This originally used a salt, but it seems that CryptoJS.AES.encrypt does this automatically? Check to ensure this is true.
				// Fix? Originally also operated on encryptionStack, removed due to above. See obj vars.
				log.push({
					"dateTime" : cryptStart,
					"userID" : userID,
					"command" : "encrypt",
					"callKey" : "callKey",
					"timeSpent" : (cryptStart - Date.now())
				});
				db.aceCall({  // Save pertinent objects to local db to secure AceCryptObj items.
					"command" : "set",
					"key" : "sys-AceCryptObj",
					"value" : CryptoJS.AES.encrypt(JSON.stringify([keyRing,log]), CryptoJS.SHA256(getUserHash(userID)).toString(CryptoJS.enc.Base64))  // Fix? Originally had encryptionStack as 1st item in array. See obj vars above.
				});
				return result;
			}
						
			// Decrypts data returned from processes.
			this.decrypt = function decrypt(item, callKey) {
				var cryptStart = Date.now(),
					userID = ACE.loggedIn(),
					result = null;
				if (!userID) { return; }  // Fix! Security handling, alert.
				if (!keyRing.callKey) { return; }  // Fix! Security handling, alert.
				result = CryptoJS.AES.decrypt(item, keyRing.callKey);  // Fix! Cleanup and integrity checks.
				log.push({
					"dateTime" : cryptStart,
					"userID" : userID,
					"command" : "decrypt",
					"callKey" : "callKey",
					"success" : ((result)?(true):(false)),  // Fix? Ensure result !true when invalid pass.
					"timeSpent" : (cryptStart - Date.now())
				});
				if (result) {  // Fix. Further checking and ensure this should be parsed to an object in all cases.
					return JSON.parse(result);  // Fix? Explicitly convert to string if necessary. 
				}
			}
			
			initialize();
		};//AceCryptObj
		
		
		// An abstraction used for local database access.
		function DatabaseObj() {
			var _DatabaseObj = this;
			//log(_DatabaseObj, "_DatabaseObj");
			var dbID;  // The ID for this Database, if applicable.
			var dbAPI = new LocalDbApi();  // An interface used to abstract single-item data calls to the local database.
			var isLoaded;  // Bool, indicates whether this Database loaded successfully or not.
			var dbName;  // The name of the database to load objects from.
			var dbHost;  // The host location of this database.
			var dbDescription;  // The Description property for this database.
			
			var db = {  // The data structure mirroring the local db for quicker access.
				"aceID" : {  // Contains all aceIDs stored locally, and links them to the full name of the table they are stored in.
					"aceID" : "tableName"
				},
				"alias" : {  // Contains all Alias aceIDs stored locally that refer to a System aceID.
					"aliasID" : "aceID"
				},
				"tables" : {
					"tableName" : "tableTypeCode"
				},
				"dbStruct" : {  // The core database functionality used for object referencing and abstraction. 
					"pri" : {  // Primary tables used to register inique primary keys and inherent singular properties.
						"tableName" : "objName"
					},
					"ref" : {  // Used to associate tables in lists.
						"tableName" : "objName"
					},
					"typ" : {  // All tables which identify various singular categories that can be associated with _pri items.
						"tableName" : "objName"
					},
					"lnk" : {  // All tables tracking abstract links between items.
						"tableName" : "objName"
					},
					"tag" : {  // All tables containing specific entity or aspect associated tags
						"tableName" : "objName"
					},
					"log" : {  // All tables used for storing system activity.
						"tableName" : "objName"
					},
					"mod" : {  // All tables used for tracking individual changes made to entries in other tables.
						"tableName" : "objName"
					},
					"bad" : {  // Tables used for tracking bad links or otherwise corrupt data.
						"tableName" : "objName"
					}
				}
			}
		
		
			function initialize() {
				// Fix.  The following are remnants from the earlier approach of saving db objects as the entire data block in a single entry.
				// if (!loadTable("aceID")) { writeLists(db); }
				// loadLocalDb();
			}
			
			
			// Writes the default contents of the empty db object to the local database.
			function writeLists() {
				for (var tableName in db) {
					var result = dbAPI.aceCall({
						"command" : "new",
						"key" : tableName,
						"value" : {}
					});
				}
			}
			
			
			// Loads the local database into memory. Overwrites any existing object data so use carefully.
			function loadLocalDb() {  
				return;  // Fix!
				for (var tableName in db) {
					var result = dbAPI.aceCall({
						"command" : "new",
						"key" : tableName,
						"value" : {}
					});
				}
			}
			
			
			// Writes the table hash in the db object to the local database.
			function writeTable(tableName) {
				if (!db[tableName]) { return; }
				var result = dbAPI.aceCall({
					"command" : "set",
					"key" : tableName,
					"value" : db[tableName]
				});
			}
			
			
			// Loads a new copy of table tableName from the local database into memory. Ignores request if that table does not exist in db.
			function loadTable(tableName) {
				var tableObj = dbAPI.aceCall({
					"command" : "get",
					"key" : tableName
				});
				return;  // Fix!
			}
			
			
			// Adds a priRoot name to those being tracked by this ACE instance. Can be single value, an array of values, or a proposal to change the root name of an existing priRoot using {"priExisting":"priProposed", ...}
			function priAdd(priRoot) {
				var varTyp = typeOf(priRoot);
				if (varTyp == 'string') {
					if (priGet()) { return; }  // Fix. Error handling and notification.
				} else if (varTyp == 'array') {
					for (var key in writeObj) {
						priAdd(writeObj[key]);  // Fix. Error handling and notification.
					}
				} else if (varTyp == 'object') {
					for (var key in writeObj) {
						// Fix!
					}
				} else { 
					return;  // Fix. Error handling.
				}
			}
			
			function priGet(priRoot) {
				
			}
			
			
			// Serves as a local database abstraction object used to decouple the db API from its implementation. Due to cross-browser db limitations, we are writing entire contents of a table to the database, not individual objects. Changes are made to the db object, then store the entire table.
			function LocalDbApi(localDbType) {
				var thisDb = null;  // The interface to the actual mechanism used for storing data locally.
				
				if (!localDbType) {
					if (typeof appAPI != 'undefined') {  // This is the API set internally by CrossRider if activated.
						localDbType = "CrossRider";
					} else if (localStorage) {  // Checks for the native localStorage mechanism.
						localDbType = "localStorage";
					} else {  // Ah, that's not great...
						// Fix. Handle for obsolete browsers.
					}
				}
				
				if (localDbType == "CrossRider") {
					thisDb = new CrossRiderDb();
				} else if (localDbType == "localStorage") {
					thisDb = new localStorageDb();
				} else if (localDbType == "sqlLite") {
					thisDb = new SqlLiteDb();  // Fix? This has currently been dropped from the w3c specification.
				}
				//log(thisDb, "thisDb");
				
				
				// Used to call the localStorage abstraction for a single AceObj. 
				this.aceCall = function localDbApi_aceCall(callObj) {
					if (typeOf(callObj) != 'object') { return; }  // || (!safetyCheck(callObj))) { return; }  // Fix? No checks for safety, etc.  Fix. Error handling.
					var command = callObj.command,
						key = aceIDchop(callObj.aceID),
						value = callObj.items;
					
					if (!command || !key) { 
						return null;  // Fix? Behavior here?
					} else if (command == "get") {							// command == "get"
						if (key == "*") { command = "all"; }  // Fix?
					} else if (command == "set") {							// command == "set"
						// Fix? Special handling?
					} else if (command == "new") {							// command == "new"
						// Fix? Special handling?
					} else if (command == "del") {							// command == "del" 
						if (key == "*") { command = "clr"; }  // Fix?
					} else {
						return null;  // Fix. Error handling
					}
					return thisDb.aceCall({
						"command" : command,
						"key" : key,
						"value" : value
					});
				}//localDbApi_aceCall()
		
		
				
				// Following are abstract interfaces for supported database types.
				
				// Abstraction used to write simple key-value references to the local db, sandboxed for use in CrossRider extension applications. (http://crossrider.com)
				function CrossRiderDb() {
					this.aceCall = function CrossRiderDb_aceCall(callObj) { 
						if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
						var command = callObj.command;
						var key = callObj.key;
						var value = callObj.value;
						if (command == "get") { return appAPI.db.get(key); }
						if (command == "set") { return appAPI.db.set(key, value); }
						if (command == "new") {	return appAPI.db.set(key, value); }
						if (command == "del") {	return appAPI.db.remove(key); }
						if (command == "clr") { return appAPI.db.removeAll(); }  // Erases the entire db. Fix. Safety mechanisms?
						if (command == "all") { return appAPI.db.list(); }
					}
				}
				
				// Abstraction for the standard localStorage object. This should be reliable for non-extension use.
				function localStorageDb() {
					this.aceCall = function localStorageDb_aceCall(callObj) { 
						if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
						var command = callObj.command;
						var key = callObj.key;
						var value = callObj.value;
						if (command == "get") { return localStorage.getItem(key); }
						if (command == "set") { return localStorage.setItem(key, value); }
						if (command == "new") {	return localStorage.setItem(key, value); }
						if (command == "del") {	return localStorage.removeItem(key); }
						if (command == "clr") { return localStorage.clear(); }  // Erases the entire db. Fix. Safety mechanisms?
						if (command == "all") {	return getAllItems(); }
						/*  // Fix? Perform JSON operations here so as to unify handling of calls and results format? If better performance from keeping as string, then remove this code.
						if (command == "get") { 
							command = localStorage.getItem(key);
							return JSON.parse(command); 
						} else if (command == "set") { 
							return localStorage.setItem(key, JSON.stringify(value)); 
						} else if (command == "new") { 
							return localStorage.setItem(key, JSON.stringify(value)); 
						} else if (command == "del") { 
							return JSON.parse(localStorage.removeItem(key)); 
						}*/
					}
					
					function getAllItems() {
						var tblArray = [];
						for (var tblName in localStorage) { tblArray.push(tblName); }  // Fix? Is this valid?
						return tblArray; 
					}
				}
				
				// Abstraction for the sqlLite db, which has been removed from the w3c html5 specification but comes standard on some browsers.
				function SqlLiteDb() {
					this.aceCall = function SqlLiteDb_aceCall(callObj) { 
						// Fix. Implement?
					}
				}
				
			}//LocalDbApi
			
			
			// Public methods
			
			
			// Executes command and returns results from single calls to the local database.
			this.aceCall = function DatabaseObj_aceCall(callObj) {  // Fix! Determine best behavior for handling this callObj structure.
				if (typeOf(callObj) != 'object') { return; }  // Fix.  Error handling.
				var key = callObj.aceID || callObj.key,  // Fix?
					command = callObj.command,
					result = null;
				
				//if (isTyp(key)) { callObj["forceString"] = true; }  // Fix? Handle this mechanism in best way possible.  // Fix? Removed 
				callObj["forceString"] = false;  // Fix. Determine conclusively whether any advantage exists for keeping typ as JSON form.
				callObj.key = key;  // Fix? May not be necessary if strict in callObj.
				result = dbAPI.aceCall(callObj);
				if (typeof(result) == 'string') {  // Fix? Handle return type checking and conversion mechanism in best way possible. May want to internalize this to dbAPI.
					if (!callObj.forceString) { result = JSON.parse(result); }
				} else if (typeOf(result) == 'object') {
					//if (callObj.forceString) { result = JSON.stringify(result); }  // Fix. Determine conclusively whether any advantage exists for keeping typ as JSON form.
				} else {
					result = null;  // Fix. Error handling, notification. Other results?
				}
				return result;
			}
			
			
			// Calls basic single aceID get call to db.
			this.ace = function DatabaseObj_ace(aceID) {
				if (typeof(aceID) != 'string') { return null; }  // Fix.  Error handling, notification.
				return _DatabaseObj.aceCall({
					"command" : "get",
					"key" : aceID
				});
			}
			
			
		}//DatabaseObj
	
		
	}//AceData
		
	
	// The generic base object used to instantiate all other objects used in the ACE system. callObj can represent a single aceID to load the AceObj from. If callObj is an array, this aceObj will function as a container holding aceIDs passed in that array.
	function AceObj(callObj, items) {  // Fix. Alternative to items as arg?
		var _AceObj = this,
			_ACE = ACE,  // A local instance of the closure-held ACE var from ace(). Referenced here for clarity and efficiency.
			owner = AceObj.caller;  // Used to restrict calls to this AceObj's functions.
		var aceID = null,
			typeChk = typeOf(callObj),
			loadDepth = 1;
		if (typeChk == "string") {  // Fix? May want to always ensure callObj is an object?
			aceID = aceIDchop(callObj);  // new String(callObj);  // Fix. May not be necessary to duplicate this. Check whether simple string will track by value rather than by reference for all environments.
		} else if (typeChk == "object") {
			aceID = ((typeof(callObj.aceID)=="string")?(aceIDchop(callObj.aceID)):(null));
			if (callObj.loadDepth) { loadDepth = callObj.loadDepth; }
		}
		_AceObj.aceID = aceID;  // Used for loose checking.
		_AceObj.typ = items.cor.typ = callObj.typ;  // Fix?
		
		var objItems = {  // Items relevant only to the instantiated object. Will not be saved to memory.
			"aceID" : aceID,
			"status" : "initializing",  // 'loaded', 'bad', 'new', 'waiting', 'offline', 'container', 'mismatch', 'sys', etc. On loading, this status will be modified by various events.
			"contains" : [],  // Used to store application-associated aceIDs and their representative aceObj's if being used as a container.
			"count" : 0,  // If being used as a container, this will store a running count of "contains".
			"aceObjs" : { }, // All aceObj items linked to by this aceObj, referenced by their aceID. Used to quicken resolution calls to aceObjs held in the primary memObj.
			"modified" : false
		};
		
		// DO NOT RELY ON THIS STRUCTURE!  Shifted the following into data format, leaving here for reference.  
		// items["als"] = [];  // Any alias IDs that have been registered to represent this entity. Highest priority will have a lower index number, eg alias[0] is default.
		// items["cor"] = {  // Core individual properties associated with all ace entities, and established internally by system. Fix? Change name of property set from 'cor'?
			// "aceID" : aceID,
			// "name" : "",
			// "description" : "",
			// "typ" : "typ-entity",  // The aceID for the primary class of entity this AceObj falls under. Defaults to 'typ-entity'.
			// "value" : 0
		// };
		// items["sys"] = {  // System properties used internally by ACE for this aceType, not typically visible to an application interface, and that don't resolve as individual entities.
			// "topSubID" : "a",
			// "created" : null,
			// "modified" : null
		// },
		// items["itm"] = {  // Additional properties specific to this aceType that don't resolve as individual entities.
			
		// },
		// items["typ"] = {  // Additional layers of aspects that extend the entity (is-a relationships).
			// "typID" : "aceID"  // typID references the typ, with the particulars of this specific entity contained in the structured object it references.
		// };
		// items["has"] = {  // Sub-components of this entity that resolve to an aceID. (has-a relationships).
			// "typID" : "aceID"  // typID references the typ, with the particulars of this specific entity contained in the structured object it references. Multiple aspects are contained in a space-separated string rather than an object reference.
		// };
		// items["lnk"] = {  // All symbolic abstractions connecting this entity to other entities. Each key:value pair will stand as typLnk:{aceID:{lnkProp:lnkVal,...},...} as applicable. Because of the naming scheme for reserved types, the 'lnk-' segment of the aceID as lnk-name will be removed and the remainder will be used to reference the item in the containing list
			// "linkName" : { "aceID":"lnkID" },  // Example of link formatting.
			// "parents" : {},  // Parent entities for this entity. 
			// "children" : {},  // Child entities for this entity.
			// "founders" : {},  // Founding member(s) for this entity.
			// "contributions" : {},  // All recorded contributions for this entity.
			// "principles" : {},  // All principles adopted by this entity as goals.
			// "debates" : {},  // All debates that focus on an aspect of this entity.
			// "tags" : {},  // Any tags associated with this entity.
			// "lists" : {},  // Used to store simple lists of item references
		// };
		// items["sec"] = {  // All access privileges information for this entity.  // Fix! Identify best method and protocol for this.
			// "read" : "*",  // Fix. Establish default based on prefs.
			// "write" : [aceID],
			// "block" : [],
		// };
		// items["lds"] = {  // Fix.  Tracks which items to load for this entity automatically using a numerical priority system. Theoretically contains all lnk tables that apply such as ancestor or descendent but they are set at a low priority so that this entity is aware of them but does not waste resources by loading them into memory unless specificically directed to.
			// "all" : ["cor","itm","typ","has",{"lnk":["children","principles","debates","tags","parents"]}],
			// "gui" : ["cor","itm","typ","has",{"lnk":["children","principles","debates","tags","parents"]}],
			// "parent" : 1,
			// "child" : 1
		// };
		
		
		// Initializes the object.
		function initialize() {
			
			return _AceObj.state = objItems.status = "loaded";  // Fix. Integrate new structure.
			
			
			var status = null;
			
			if (typeChk == 'object') {  // Used for passing callObjs directly into aceObjs.
				_AceObj.load(callObj);
				_AceObj.state = objItems.status = "initialized";
			} else if (!aceID || aceID == "_system_" || status == "sys") {  // Fix. This may now be pointless. Determine best reaction.
				aceID = "_system_";  // Fix?
				status = "sys";
				// Fix.  Complete this.
			} else if (status == "bad") {
				// Fix. Complete this.
			} else {
				_AceObj.state = objItems.status = "bad";  // Fix. Error handling, default behavior.
			}
		}
		
		
		// This function is passed into comm callObjs as 'caller', to be executed by comm on receipt of a reply object.
		var caller = (function returnCall(callObj) {  // Fix. Closure would be passed into comm with this aceObj scope, is this a security vulnerability?
			return 1;  // Fix!  This all needs worked through. Should probably put in top-level ace() scope and record calls at each step in process.
			//var callTo = callObj.caller;
			if (callObj.msg) {
				
			}
			if (callObj.aceID) {
				
			}
			if (callObj.aceObj) {
				
			}
			
		})();
		
		
		// Performs a security check for this AceObj for the user logged in and ensuring the call is not being instantiated maliciously from some external source. Trims items from props that this user is not authorized for and returns true if access is granted overall.
		function securityCheck(userID, props) {
			return true;  // Fix! Currently does nothing. 
		}
		
		
		// Used to pass a restricted callObj directly into this object.
		function AceObj_call(callObj) {  // Fix? Better way to achieve this functionality? 
			
			// if (!callObj = safetyCheck(callObj)) {
				// return;  // Fix. Error handling, security.
			// }
		}
		
		// Splits a char-divided string itemStr into a sub-object structure.
		function splitItemStr(itemStr, subChar) {
			if (!subChar) { subChar = "."; }  // Fix. Settle on best char for symbolic sub-obj traversal through strings.
			var keyObj = {}, tmpObj = keyObj,
				propArray = itemStr.split(subChar),
				len = propArray.length;
			for (var i=len; i; i--) { 
				tmpObj[propArray[len-i]] = {};
				tmpObj = tmpObj[propArray[len-i]];
			}
			return keyObj;
		}
		
		// This will return an AceObj represented by aceID (Essentially just a shortcut to ACE.ace() unless reference exists for aceID in objItems["aceObjs"]. loadDepth sets the number of peripheral load steps to take in loading lnk and sub-entities.
		var _ace = this.ace = function AceObj_ace(aceID, loadDepth) {
			if (objItems["aceObjs"][aceID]) { return objItems["aceObjs"][aceID]; }  // Fix? Security and better checking?
			return ACE.ace(aceID, loadDepth);
			// if (!aceObj.aceType(aceType)) {   // Fix?  Is this useful?
				// objItems.status = "mismatch";
				// // Fix. Determine best behavior here.  Clear items?
			// }
		}
		
		// Used to get internal properties for this entity.
		this.get = function AceObj_get(prop) {
			if (!items || !items.cor || !items.cor.aceID || !securityCheck(items.cor.aceID, prop)) { return false; }
			if (!prop) { prop == "gui"; }  // Fix. User and context-established default.
			if (typeof(prop) == "string") {
				if (!prop || prop == "*") {  // Fix? Ideal syntax.
					return $.extend(true, {}, items); 
				} else if (prop.indexOf(".") >= 1) {  // Fix. Settle on best char for symbolic sub-obj traversal through strings.
					return getItems(splitItemStr(prop), items);
				} else if (items.lds[prop]) {  // Fix? Ideal mechanism for achieving this.
					return getItems(items.lds[prop], items);
				} else if (items[prop]) {
						return getItems(prop, items);
				} else {
					if (items.cor[prop]) {
						return items.cor[prop];
					} else if (items.itm[prop]) {
						return items.itm[prop];
					} else if (items.typ[prop]) {
						return items.typ[prop];
					} else if (items.has[prop]) {
						return items.has[prop];
					} else if (items.lnk[prop]) {
						return items.lnk[prop];
					} else {
						return null;  // Fix. Error handling, notification.
					}
				}
			} else if (typeOf(prop) == "object") {
				return getItems(prop, items);
				
				if (Object.keys(prop).length == 1) {
					return $.extend(true, prop, items);
				} else {
					return $.extend(true, prop, items[prop]);
				}
			}
			
			var keys = Object.keys(items);
			// Fix. Perform also for objItems.
			log("AceObj.get() called for entity with aceID "+aceID);
		}
		
		// Returns the object values in valsObj that match up with the object property structure of keysObj. subStr can be used to specify the object sub-key path, with property names separated by strDiv which defaults to "|".  // Fix? May want better method for this?
		function getItems(keysObj, valsObj, strDiv) {
			var key = "",
				substr = "",
				tmpObj = {},
				strArray = null;
			
			if (!valsObj) { return; }
			key = typeOf(keysObj);
			if (key == "string") {
				if (keysObj == "*") {  // Fix? Do we ever want this?
					return $.extend(true, {}, valsObj);  // Fix? Just keep this internal?
				} else if (valsObj[keysObj]) { 
					return $.extend(true, {}, valsObj[keysObj]);  // Fix? Keep this internal?  // getItems(Object.keys(valsObj), valsObj);  // tmpObj[keysObj] = valsObj[keysObj];
				} else {
					return;  // Fix. Error handling, notification.
				}
			} else if (key == "array") {
				for (var i=keysObj.length; i; i--) {
					key = keysObj[i-1];
					substr = typeOf(key);
					if (substr == "object") {
						for (substr in key) { tmpObj[substr] = getItems(key[substr], valsObj[substr]); }
					} else if (substr == "string") {
						tmpObj[key] = $.extend(true, {}, valsObj[key]);  // Fix? Keep this internal?
					} else {
						// Fix. Error handling, notification.
					}
				}
				return tmpObj;
			} else if (key == "object") {
				for (key in keysObj) {
					substr = typeOf(keysObj[key]);
					if (substr == "object" || substr == "array") {
						tmpObj[key] = getItems(keysObj[key], valsObj[key]);
					} else if (substr == "string") {
						tmpObj[key] = $.extend(true, {}, valsObj[key]);  // Fix? Keep this internal?
					} else {
						// Fix. Error handling, notification.
					}
				}
				return tmpObj;
			} else {
				return;  // Fix. Error handling, notification.
			}
			
			// if (typeOf(keysObj) != "object") { return keysObj; }  // Fix? Return null? When would this happen?
			// if (!strDiv) { strDiv = ":"; }  // Fix? Best char for this.
			// if (!subStr) { subStr = ""; }
			// strArray = subStr.split(strDiv);
			// for (var i=strArray.length; i; i--) { tmpObj = tmpObj[strArray[i-1]] = {}; }  // Fix.	
		}
		
		// Returns the most basic text form of this AceObj.
		this.toStr = function AceObj_toStr(itemName) {
			if (!itemName) {
				if (items["itm"]["str"]) { return items["itm"]["str"]; }  // Fix. Determine best way to do this.
				return (items.cor.description.toStr());
			}
			return _AceObj.get(itemName).toStr();  // Fix. Ensure best outcome.
		}
		
		// Returns an html form of this AceObj. Experimental.
		this.toHtm = function AceObj_toStr(itemName) {
			if (!itemName) {
				if (items["itm"]["htm"]) { return items["itm"]["htm"]; }  // Fix. Determine best way to do this.
			}
		}
		
		// Used to set internal properties for this entity. propObj contains key-val pairs as {"name":value, "lnk-child_{aceID}":value, ...} or a string or array to be set equal to value.
		this.set = function AceObj_set(propObj, value) {
			if (!securityCheck(items.cor.aceID)) { return false; }
			
			var keys = Object.keys(items);
			objItems.modified = true;
			log("AceObj.set() called for entity with aceID "+aceID);
		}
		
		// Checks for the existence of itemName in the pref obj of this aceObj. Returns the category name if it does exist, and null if not.
		function segmentItem(itemName) {  // Fix! Finish converting this.
			if (typeof(itemName) != 'string') { return false; }  // Fix. Error handling.
			var segs = itemName.split("_");
			if (segs[0] == 'ace') { segs.shift(); }  // segs.splice(0, 1); }
			segs = segs[0].split("-");
			
			for (var item in items) {
				if (item == segs[0]) {  // If the first segment matches an items category
				
				}
				var itemsArray = pvt.prefs[item];
				for (var catPrefName in itemsArray) {
					if (catPrefName == itemName) { 
						return item;
					}
				}
			}
		}
		
		// Sends a request to create a new Entity of type aceType, using a sub-alias of this Entity's aceID by default. If rootAlias is defined, it will return alias[0], or that alias if set for this entity, or default to the userID. 
		this.new = function AceObj_new(aceType, rootAlias) {
			return;  // Fix! This is all under the old structure.
			
			var aceID = null,
				aceObj = null;
			var result = _AceData.aceType(aceType, _AceObj);
			if (!result || rootAlias == "user" || rootAlias == "userID") {
				aceID = _AceData.nextAceID();
			} else {
				aceID = _AceObj.nextAceID(rootAlias);
			}
			aceObj = new AceObj(aceType, aceID);
			if (result) {
				// Fix.  Compare the following results to see which is faster (Holding template as string and instantiating, or copying the object held in memory)
				//items = memObj.items[aceID] = jQuery.extend(true, {}, result);  // Make a copy of the template for this entity aceType.
				newItems = memObj.items[aceID] = JSON.parse(result);
				_AceObj.state = objItems.status = "new";
			} else {
				_AceObj.state = objItems.status = "waiting";
			}
			//items.als.push(aceID);
			//items.cor.aceID = aceID;
			memObj.aceObj[aceID] = _AceObj;
			
			var callObj = {
				"command" : "new",
				"alias" : aceID,
				"aceType" : aceType,
				"items" : items,
				"caller" : caller,
			};
			db.aceCall(callObj);
			comm.aceCall(callObj);
			_AceObj.state = objItems.status = callObj.status;  // Fix? Address conflicts?
			return _AceObj;
		}
		
		// Sends a request to delete this entity from public reference. The associated history remains in the core dbs, but from an access perspective, this entity will no longer be available.
		this.del = function AceObj_del() {
			log("AceObj.del() called for entity with aceID "+aceID);
		}
		
		// Performs the operation passed in doFunc on each item under the focus specifier. If !focus, defaults to applying only to this AceObj; focus can be a space-separated string with identifiers such as "all ext asp lst tag lnk" and any "lnk" types will be handled directly under that item using its lnk-typ shorthand. 
		this.do = function AceObj_do(doFunc, focus) {
			if (!focus) { focus = "this"; }  // Fix?
			if (typeof(focus) != "string") { return; }  // Fix. Error, notification, handle differently?
		}
		
		// 
		this.act = function AceObj_act() {
			
		}
		
		// Specialized to return items accessible in the given context. Defaults to "gui"
		this.itm = function AceObj_itm(callObj) {
			// Fix! Complete this.
		}
		
		// Automatically creates a parent-child relationship between this entity and another existing or newly created entity.
		this.add = function AceObj_add() {
			if (!rootAlias) { rootAlias = als[0] || ACE.loggedIn(); }  // Fix? May need to remove auto-execute from ACE.loggedIn / define as getter, etc.
			log("AceObj.add() called for entity with aceID "+aceID);
		}
		
		this.rem = function AceObj_rem() {
			log("AceObj.rem() called for entity with aceID "+aceID);
		}
		
		this.lnk = function AceObj_lnk() {
			log("AceObj.lnk() called for entity with aceID "+aceID);
		}
		
		// Creates a new typ instance for this entity and performs necessary linking operations. 
		this.ext = function AceObj_ext() {
			log("AceObj.lnk() called for entity with aceID "+aceID);
		}
		
		// Registers an alternative version of this AceObj. 
		this.alt = function AceObj_alt(altID) {
			if (false) {
				
			}
		}
		
		// Loads the most current version of this entity, or if called by aceData can be used to assign new items to this object.
		this.load = function AceObj_load(callObj) {
			var caller = AceObj_load.caller;
			if (!callObj) {
				var itemName = null,
					itemObj = null,
					subName = null,
					subItem = null,
					i=0, len = null;
					
				for (itemName in items["typ"]) {
					_ace(itemName);
					_ace(items["typ"][itemName], loadDepth);
				}
				
				for (itemName in items["has"]) {
					_ace(itemName);
					itemObj = items["has"][itemName];
					for (i=itemObj.length; i; i--) {
						_ace(itemObj[i-1], loadDepth);
					}
				}
				
				if (loadDepth--) {  // Load links if loadDepth indicates appropriate.
					for (itemName in items["lnk"]) {
						itemObj = items["lnk"][itemName];
						for (subName in itemObj) {
							_ace(subName, loadDepth);
							_ace(itemObj[subName]);
						}
					}
				}
				
				// Fix. Include other items...
				
			} else {  // Fix. Determine best behavior for loading, if we even want this here.
				if ((caller != _AceObj) && (caller != owner)) { return; } // Fix! This may not be helpful (nor reliable)...
				// objItems.modified = false;
			}
			
			
		}
		
		// Saves the characteristics of this entity instance to memory and propogates the image to the core dbs.
		this.save = function AceObj_save() {
			if (!objItems.modified) { return; }  // Fix! Ensure this is implemented well!
			ACE.aceCall({
				"command" : "set",
				"aceID" : aceID,
				"items" : JSON.stringify(items),
			});
			objItems.modified = false;
			return _AceObj;  // Fix? Returning _AceObj makes statements chainable, but may want optimal way to verify?
		}
		
		// Used to propose a new alias for this entity or return an array of existing aliases if called with no arguments. command can be "to", "check", "from", "del", defaults to "to". 
		this.als = this.alias = function AceObj_alias(alsID, command) {  // Fix. 
			var alsArray = items.als;
			if (!command && !command) { return ((_.isArray(alsArray))?(alsArray.slice(0)):([])); }  // Fix?
			if (!command) { command = "to"; }
			if (!alsID || alsID == "auto") { alsID = _AceObj.nextAceID(); }
			if (!_isArray(alsArray)) { alsArray = items.als = []; }
			if (command == "to") {
				alsArray.push(alsID);  // Fix. Sorting order?
				if (!ACE.als(alsID)) { ACE.als(alsID, aceID); }
			} else if (command == "check") {
				return (_.indexOf(alsArray, alsID)) ? (true) : (false);
			} else if (command == "del") {
				// Fix. Handle this. Should never actually remove an alias, as it's useful for obscure references. (Unless replacing for new requested use?)
			} else if (command == "from") {
				// Fix. Handle options. Move this object to the new position? Remove it? 
			} else {
				// Fix. Error handling, notification.
			}
		}
		
		// Returns the aceID of this entity.
		this.aceID = function AceObj_aceID() {  // Fix? Establish as getter before altering that as a method? 
			return objItems.aceID = items.cor.aceID;  // Fix? Security check? Are there cases where this should be private?
		}
		
		// Returns the status of this AceObj.
		this.status = function AceObj_status() {  // Fix. Establish as frozen getter.
			return _AceObj.state = objItems.status;
		}
		
		// Returns boolean true if this AceObj has loaded successfully, false otherwise.
		this.ready = function AceObj_ready() {  // Fix. Establish as frozen getter.
			return (_AceObj.status() == "loaded") ? (true) : (false);
		}
		
		// Returns the primary aceType of this entity. If aceType is set it can be set to "all" which will return an array of all types, or it can be a single or space-separated string, in which case it will return false if this aceObj's aceType does not match one of thos in the string.
		this.aceType = function AceObj_aceType(aceType) {
			var objType = items.cor.typ;
			if (typeof(aceType) == "string") {
				if (aceType == "all") {  // Fix. Update function description.
					objType = [objType];
					_.each(items.typ, function(val,key) {
						objType.push(key);
					});
					return objType;
				} else {
					var types = aceType.split(" ");
					for (aceType in types) {  // Fix? Trace this to check for unwanted array props being included...
						if (objType == aceType) { return aceType; }
					}
					return false;
				}
			} else {
				return objType;  // Fix? Security check? Are there cases where this should be private?
			}
		}
		
		// Returns an incremented highest subID registered for this entity and replaces it for the new highest value.   If rootAlias is defined, it will return alias[0], or that alias if set for this entity.  Doesn't matter if the new AceID is actually used or not bc they are cheap.
		this.nextAceID = function AceObj_nextAceID(rootAlias) {
			var newAceID = null;
			if (newAceID) {  // Fix. (typeof(rootAlias) == 'string') && (items.als.length)) {  // Fix? Disabled this because of possible conflicts.
				rootAlias = ((items.als.indexOf(rootAlias))?(rootAlias):(items.als[0]));
			} else {
				rootAlias = items.cor.aceID;
			}
			items.sys.topSubAlias = ACE.nextAceID(items.sys.topSubAlias);
			newAceID = rootAlias+'_'+items.sys.topSubAlias;
			objItems.modified = true;
			return newAceID;
		}
		
		//log(this, "AceObj with aceID "+aceID);
		//log(ACE, "ACE from inside this AceObj");
		initialize();
	}//AceObj
	
	
	// Used for all communications with servers, other clients, and systems across network interfaces.
	function AceComm(aceDataCallBack) {
		_AceComm = this;
		var aceSrc = getSrcUrl();
		var connectionObj = {
			"connected" : null,
			"url" : aceSrc
		};
		var objIndex = {  // Tracks all loaded aceObjs that have sent calls to the server. In form { 'callTime+|+aceID' : aceObj }
			
		}
		var que = {  // Stores requests to be made to server and items returned but not loaded yet.
			"wait" : [  // a JSON containing callObjs that are to be sent to the server but in wait due to lack of connectivity or other cases. Ordered by time placed.
				
			],
			"out" : [  // a JSON containing callObjs that have been sent to the server, ordered by time placed.
				
			],
			"in" : [  // a JSON object containing returned aceObjs, to be sent to their callers.
				
			]
		};
		
		
		// Checks to see whether this is connected to a server.  
		this.isConnected = function AceComm_isConnected() {
			return (connectionObj["connected"]) ? (true) : (false);
		}
		
		
		// Used as the wrapper to make ajax calls to the ace server. callObj is a json object with properties matching those to be used in the server call url arguments.
		this.aceCall = function AceComm_aceCall(callObj) {
			ACE.markTime('aceCall()');
			if (!_AceComm.isConnected()) {
				callObj.status = "offline";
				// Fix!  Alert, logging, and storing data for future call, returning message to caller.
				que.wait.push(callObj);
				return; 
			}  
			if (typeOf(callObj) != 'object') { return; }  // Fix. Error handling.
			/*if (!callObj.caller) { return; }  // Fix. Error handling.
			var caller = callObj.caller;
			callObj.callType = callObj.callType || 'undefined';	*/
			var callString = "";  // JSON.stringify(callObj);
			console.log("AceComm_aceCall() called. callString: "+callString);
			for (key in callObj) {
				if (key) {
					// Fix? May want to address special behavior here.
				}
				callString += key + '=' + callObj[key] + '&'; 
			}
			var callTime = Date.now();
			var data = aceEncrypt(callString+'callTime='+callTime);
			var xhrObj = $.ajax({"data":data});  
			xhrObj.callTime = callTime;  // Used to reference the call in callStack during aceCallback().
			que.out[callTime] = callObj;  // Fix! Subdivide by caller for use in objIndex as well.
			ACE.markTime('/aceCall()');
		}
		
		
		// Used as a shortcut for making basic ace calls to this object's aceCall function.
		this.ace = function AceComm_ace(aceID, caller) {
			_AceComm.aceCall({
				"command" : "get",
				"aceID" : aceID,
				"caller" : caller  // Message handling is returned to the caller via this method.
			});
		}
		
		
		// Used as a shortcut for making basic ace calls to this object's aceCall function.
		this.aceType = function AceComm_aceType(aceType, caller) {
			_AceComm.aceCall({
				"command" : "get",
				"aceType" : aceType,
				"aceID" : aceType,
				"forceString" : true,  // Fix. Handle this mechanism in best way possible.
				"caller" : caller
			});
		}
		
		
		// Handles call placement in que.  queType can be 'wait', 'out', or 'in'.
		function queCall(callObj, queType) {
			
		}
		
		
		// Get default server location for system communications. Will eventually use entity membership, client geographic location, and server load to determine best option.
		function getSrcUrl() {
			var aceUrls = [  // Fix. This should be populated dynamically.
				"tasktracker.us/get.php",
				"openace.org",
				""
			];
			return "http://"+aceUrls[0];  // Fix.  This is just a temporary solution for prototype.
		}
		
		
		// Sets ajax defaults and establishes generic connection with an appropriate ACE server.
		function initializeConnection() {
			ACE.markTime('initializeConnection()');
			$.ajaxSetup({
				url: aceSrc,
				dataType: 'json',  // Fix? Determine optimal methods for handling this.
				beforeSend: acePreCall,
				success: aceCallback
			});
			ACE.callStack = {}; // Used to track open server calls and response time.
			aceCall({
				caller: 'ace',  // Used for central system communications with server.
				callType: 'handshake',  // Used to track open server calls and response time.
				signature: '1234567'  // Fix!  Use this to create hash keys for secure communications with server. 
			})
			ACE.callLog = Array();  // Used to store call times for internal performance checking.
		}


		// Used for low level ajax call tracking and error handling.
		function acePreCall(xhrObj) {
			ACE.jqXHRobjStack = ACE.jqXHRobjStack || new Array();
			var callObj = { 
				"callTime" : xhrObj.callTime,
				"xhrObj" : xhrObj,
				"dataHash" : xhrObj.dataHash,
				"dataSalt" : xhrObj.dataSalt,
			};
			ACE.jqXHRobjStack.push(xhrObj);
		}


		// Called on completion of each ajax request to handle returned data.
		function aceCallback(data, status, xhrObj) {
			//alert('aceCallback() data: '+data);
			//data = $.parseJSON(data);  // fix.	
			data = testData();  // Fix!
			var callTime = xhrObj.callTime;
			//delete data.callTime;
			var callData = ACE.callStack[callTime];
			var caller = callData.caller;
			var consoleObj = null;
			if (caller == 'ace') {  // For handling centralized system calls and cache loading.
				if (data.callType == 'handshake') {
					dataLoad(data);
				} else if (data.callType == 'aceLoad') {
					dataLoad(data);
				} else {
					// Fix. Error handling.
				}
			} else if ((consoleObj = objIndex[caller]) != null) {
				consoleObj.module.load(data);
			} else {
				// Fix. Error handling
			}
			aceDataCallBack(data);
		}
	
	}//AceComm
	
	//initialize();
}//ace
//Object.freeze(ace);  // Fix?



// *************************** Load Files **************************************** //



/*
$.getScript("http://openace.org/js/jQueryUI.js", function() {
	$.getScript("http://openace.org/js/ace.ui.js", function() {
		var loaded = true;
		log('hello');
	});
});
*/


// *************************** Tools **************************************** //



// WEAK checks to verify whether a variable represents an AceObj, AceID, AceUI, etc. Returns true if thisObj is the checked type, false otherwise.
_.mixin({  // Fix? To keep from polluting global namespace, added to _ but may be better options? Remove this and move withing ace if necessary.
	"isAceID" : function(thisObj) {  // Fix! These are all too weak. Check if exists via ace();
		if (!_.isString(thisObj) || thisObj.length > 100) { return false; }  // Fix. Ensure maxVal is sufficiently large. 
		if (thisObj.indexOf("_ace")!=0 && !thisObj.indexOf("_", 1)) { return false; }
		return true;
	},
	"isAceObj" : function(thisObj) {  // Fix! Pretty flimsy.
		if (!_.isObject(thisObj)) { return false; }
		if (!_.has(thisObj,ace) || !_.has(thisObj,aceCall) || !_.has(thisObj,aceID)) { return false; }
		return true;
	},
	"isAceUI" : function(thisObj) {  // Fix! Pretty flimsy.
		if (!_.isObject(thisObj)) { return false; }
		if (!_.has(thisObj,ace) || !_.has(thisObj,aceCall) || !_.has(thisObj,updateUI)) { return false; }
		return true;
	},
	"isAce" : function(thisObj) {  // Fix? All functionality here?
		if (!_.isObject(thisObj)) { return false; }
		if (!_.isAceID(thisObj) && !_.isAceObj(thisObj) && !_.isAceUI(thisObj)) { return false; }
		return true;
	}
});



// Logs logVal to the console, along with the caller function chain, and varName if set.
function log(logVal, varName) {
	var callingInfo = "";
	var funcCaller = log.caller;
	while (funcCaller) {
		callingInfo = ((funcCaller.name)||("{Anonymous}")) + "->" + callingInfo;
		funcCaller = funcCaller.caller;
	}
	callingInfo += "TaskTracker.log()"+((varName)?(" {"+varName+"}"):(""))+": ";			
	if (console.log) {  // Fix. In case of IE.
		console.log(callingInfo);
		console.log(logVal);
	} else {
		alert('TaskTracker.log() No browser console.log available!');
		// Fix. For IE.
	}
}
		
		
// Converts an object into a readable string. Returns null if thisObj is not an object.
function objToString(thisObj) {
	var objType = typeOf(thisObj);
	if (objType == 'object') {
		//alert('objToString() thisObj is objType: ' + objType);
	} else if (objType == 'string') {
		return thisObj;
	} else {
		return objType;
	}
	var outputString = 'objToString()  thisObj: { ';
	var undefinedList = new Array();
	var functionList = new Array();
	var objectList = new Array();
	for (key in thisObj) {
		var keyValue = thisObj[key];
		var thisType = typeOf(keyValue);
		//alert('objToString() key: '+key+', keyValue: '+keyValue+', thisType: '+thisType);
		if (thisType == 'undefined') {
			undefinedList.push(key);
		} else if (thisType == 'function') {
			functionList.push(key);
		}else if (thisType == 'object') {
			objectList.push(key);
		} else {
			outputString += key + ' : ' + keyValue + ', ';
		}
	}
	outputString += '}';
	if (functionList.length) { outputString += "\n     Functions: [ " + functionList.toString() + ' ] '; }
	if (objectList.length) { outputString += "\n     Object: [ " + objectList.toString() + ' ] '; }
	if (undefinedList.length) { outputString += "\n     Undefined: [ " + undefinedList.toString() + ' ] '; }
	return outputString;
}


// Dynamically adds a new script directly to the head of the page. 
function AddJs(scriptSrc) {
	var scriptRef = document.createElement('script');
	scriptRef.setAttribute("type","text/javascript");
	scriptRef.setAttribute("src", scriptSrc);
	document.getElementsByTagName("head")[0].appendChild(scriptRef); 
}


// An improved version of typeof that handles null and arrays in a useful way.
function typeOf(value) {
	if (value == null) { return 'null'; }
	var v = typeof value;
	if (v === 'object') { if (Array.isArray(value)) { return 'array'; } }
	if (v == 'string') { return v; }  // Fix? Additional functionality?
	// Fix. Check for modified 'undefined' object?
	return v;
}


// Does enhanced typeOf() checking and includes some minimal ACE functionality by checking for aceID and aceObj types.
function typeAce(value) {
	if (value == null) { return 'null'; }
	var v = typeof value;
	if (v === 'object') {
		if (Array.isArray(value)) {
			return 'array';
		} else if (typeof(value.aceID) != 'undefined') {  // Fix. Make more failsafe.
			return 'aceObj';
		}
	} else if (v == 'string') {
		if (value.slice(0,3) == 'ace_') {  // Fix. Make more failsafe.
			return 'aceID';
		}
	}
	return v;
}


// Returns TRUE if the string varName passed is defined in that scope, FALSE if not.
function isDefined(varName) {
    return ((typeof(this[varName]) == "undefined") ? (false) : (true));  // Probably just better to use typeof.
}


// Appends the Array object to utilze inArray() function. Returns the array location if exists, false if not.
Array.prototype.inArray = function(value) {
	var max = this.length;
	for (var i=0; i<max; i++) { if (this[i] == value) return i; }
	return false;
}


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}


// Implements Array.indexOf for browsers that don't support it.
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}


// Implements basic string trimming.  From http://www.electrictoolbox.com/javascript-trim-ltrim-rtrim/ 
function trim(text) { return text.replace(/^\s+|\s+$/g, ""); }
function ltrim(text) { return text.replace(/^\s+/g, ""); }
function rtrim(text) { return text.replace(/\s+$/g, ""); }









// Fallback JSON Implementation:
// var k;k||(k={});
// (function(){function l(a){return 10>a?"0"+a:a}function p(a){q.lastIndex=0;return q.test(a)?'"'+a.replace(q,function(a){var c=s[a];return"string"===typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function n(a,j){var c,d,h,o,g=e,f,b=j[a];b&&("object"===typeof b&&"function"===typeof b.toJSON)&&(b=b.toJSON(a));"function"===typeof i&&(b=i.call(j,a,b));switch(typeof b){case "string":return p(b);case "number":return isFinite(b)?""+b:"null";case "boolean":case "null":return""+b;
// case "object":if(!b)return"null";e+=m;f=[];if("[object Array]"===Object.prototype.toString.apply(b)){o=b.length;for(c=0;c<o;c+=1)f[c]=n(c,b)||"null";h=0===f.length?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&"object"===typeof i){o=i.length;for(c=0;c<o;c+=1)"string"===typeof i[c]&&(d=i[c],(h=n(d,b))&&f.push(p(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=n(d,b))&&f.push(p(d)+(e?": ":":")+h);h=0===f.length?"{}":e?"{\n"+e+f.join(",\n"+
// e)+"\n"+g+"}":"{"+f.join(",")+"}";e=g;return h}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+l(this.getUTCMonth()+1)+"-"+l(this.getUTCDate())+"T"+l(this.getUTCHours())+":"+l(this.getUTCMinutes())+":"+l(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var r=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
// q=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,m,s={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;"function"!==typeof k.stringify&&(k.stringify=function(a,j,c){var d;m=e="";if(typeof c==="number")for(d=0;d<c;d=d+1)m=m+" ";else typeof c==="string"&&(m=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return n("",
// {"":a})});"function"!==typeof k.parse&&(k.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)if(Object.prototype.hasOwnProperty.call(b,g)){f=c(b,g);f!==void 0?b[g]=f:delete b[g]}return e.call(a,d,b)}var d,a=""+a;r.lastIndex=0;r.test(a)&&(a=a.replace(r,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
// "]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){d=eval("("+a+")");return typeof e==="function"?c({"":d},""):d}throw new SyntaxError("JSON.parse");})})();

