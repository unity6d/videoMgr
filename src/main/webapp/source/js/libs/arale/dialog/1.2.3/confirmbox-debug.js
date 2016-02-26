define("arale/dialog/1.2.3/confirmbox-debug",["$-debug","./dialog-debug","arale/overlay/1.1.3/overlay-debug","arale/position/1.0.1/position-debug","arale/iframe-shim/1.0.2/iframe-shim-debug","arale/widget/1.1.1/widget-debug","arale/base/1.1.1/base-debug","arale/class/1.1.0/class-debug","arale/events/1.1.0/events-debug","arale/overlay/1.1.3/mask-debug","arale/templatable/0.9.1/templatable-debug","gallery/handlebars/1.0.2/handlebars-debug","./dialog-debug.handlebars","./confirmbox-debug.handlebars","./dialog-debug.css"],function(a,b,c){var d=a("$-debug"),e=a("./dialog-debug"),f=a("./confirmbox-debug.handlebars");a("./dialog-debug.css");var g=e.extend({attrs:{title:"默认标题",confirmTpl:'<a class="ui-dialog-button-orange" href="javascript:;">确定</a>',cancelTpl:'<a class="ui-dialog-button-white" href="javascript:;">取消</a>',message:"默认内容"},setup:function(){g.superclass.setup.call(this);var a={classPrefix:this.get("classPrefix"),message:this.get("message"),title:this.get("title"),confirmTpl:this.get("confirmTpl"),cancelTpl:this.get("cancelTpl"),hasFoot:this.get("confirmTpl")||this.get("cancelTpl")};this.set("content",f(a))},events:{"click [data-role=confirm]":function(a){a.preventDefault(),this.trigger("confirm")},"click [data-role=cancel]":function(a){a.preventDefault(),this.hide()}},_onChangeMessage:function(a){this.$("[data-role=message]").html(a)},_onChangeTitle:function(a){this.$("[data-role=title]").html(a)},_onChangeConfirmTpl:function(a){this.$("[data-role=confirm]").html(a)},_onChangeCancelTpl:function(a){this.$("[data-role=cancel]").html(a)}});g.alert=function(a,b,c){var e={message:a,title:"",cancelTpl:"",closeTpl:"",onConfirm:function(){b&&b(),this.hide()}};new g(d.extend(null,e,c)).show().after("hide",function(){this.destroy()})},g.confirm=function(a,b,c,e){var f={message:a,title:b||"确认框",closeTpl:"",onConfirm:function(){c&&c(),this.hide()}};new g(d.extend(null,f,e)).show().after("hide",function(){this.destroy()})},g.show=function(a,b,c){var e={message:a,title:"",confirmTpl:!1,cancelTpl:!1};new g(d.extend(null,e,c)).show().before("hide",function(){b&&b()}).after("hide",function(){this.destroy()})},c.exports=g,c.exports.outerBoxClass="arale-dialog-1_2_3"}),define("arale/dialog/1.2.3/dialog-debug",["$-debug","arale/overlay/1.1.3/overlay-debug","arale/position/1.0.1/position-debug","arale/iframe-shim/1.0.2/iframe-shim-debug","arale/widget/1.1.1/widget-debug","arale/base/1.1.1/base-debug","arale/class/1.1.0/class-debug","arale/events/1.1.0/events-debug","arale/overlay/1.1.3/mask-debug","arale/templatable/0.9.1/templatable-debug","gallery/handlebars/1.0.2/handlebars-debug"],function(a,b,c){function d(a){null==a.attr("tabindex")&&a.attr("tabindex","-1")}function e(a){var b=a[0].contentWindow.document;return b.body.scrollHeight&&b.documentElement.scrollHeight?Math.min(b.body.scrollHeight,b.documentElement.scrollHeight):b.documentElement.scrollHeight?b.documentElement.scrollHeight:b.body.scrollHeight?b.body.scrollHeight:void 0}var f=a("$-debug"),g=a("arale/overlay/1.1.3/overlay-debug"),h=a("arale/overlay/1.1.3/mask-debug"),i=a("arale/events/1.1.0/events-debug"),j=a("arale/templatable/0.9.1/templatable-debug"),k=g.extend({Implements:j,attrs:{template:a("arale/dialog/1.2.3/dialog-debug.handlebars"),trigger:{value:null,getter:function(a){return f(a)}},classPrefix:"ui-dialog",content:{value:null,setter:function(a){return/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(a)&&(this._type="iframe"),a}},hasMask:!0,closeTpl:"×",width:500,height:null,initialHeight:300,effect:"none",zIndex:999,autoFit:!0,align:{value:{selfXY:["50%","50%"],baseXY:["50%","50%"]},getter:function(a){return this.element.height()>f(window).height()?{selfXY:["50%","0"],baseXY:["50%","0"]}:a}}},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix")}),k.superclass.parseElement.call(this),this.contentElement=this.$("[data-role=content]"),this.contentElement.css({background:"#fff",height:"100%",zoom:1}),this.$("[data-role=close]").hide()},events:{"click [data-role=close]":function(a){a.preventDefault(),this.hide()}},show:function(){return"iframe"===this._type&&(!this.get("height")&&this.contentElement.css("height",this.get("initialHeight")),this._showIframe()),k.superclass.show.call(this),this},hide:function(){return"iframe"===this._type&&this.iframe&&(this.iframe.attr({src:"javascript:'';"}),this.iframe.remove(),this.iframe=null),k.superclass.hide.call(this),clearInterval(this._interval),delete this._interval,this},destroy:function(){return this.element.remove(),this._hideMask(),clearInterval(this._interval),k.superclass.destroy.call(this)},setup:function(){k.superclass.setup.call(this),this._setupTrigger(),this._setupMask(),this._setupKeyEvents(),this._setupFocus(),d(this.element),d(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0)},_onRenderContent:function(a){if("iframe"!==this._type){var b;try{b=f(a)}catch(c){b=[]}b[0]?this.contentElement.empty().append(b):this.contentElement.empty().html(a),this._setPosition()}},_onRenderCloseTpl:function(a){""===a?this.$("[data-role=close]").html(a).hide():this.$("[data-role=close]").html(a).show()},_onRenderVisible:function(a){a?"fade"===this.get("effect")?this.element.fadeIn(300):this.element.show():this.element.hide()},_setupTrigger:function(){this.delegateEvents(this.get("trigger"),"click",function(a){a.preventDefault(),this.activeTrigger=f(a.currentTarget),this.show()})},_setupMask:function(){var a=this;h._dialogs=h._dialogs||[],this.after("show",function(){if(this.get("hasMask")){h.set("zIndex",a.get("zIndex")).show(),h.element.insertBefore(a.element);for(var b=!1,c=0;c<h._dialogs.length;c++)h._dialogs[c]===a&&(b=!0);b||h._dialogs.push(a)}}),this.after("hide",this._hideMask)},_hideMask:function(){if(this.get("hasMask"))if(h._dialogs&&h._dialogs.pop(),h._dialogs&&h._dialogs.length>0){var a=h._dialogs[h._dialogs.length-1];h.set("zIndex",a.get("zIndex")),h.element.insertBefore(a.element)}else h.hide()},_setupFocus:function(){this.after("show",function(){this.element.focus()}),this.after("hide",function(){this.activeTrigger&&this.activeTrigger.focus()})},_setupKeyEvents:function(){this.delegateEvents(f(document),"keyup",function(a){27===a.keyCode&&this.get("visible")&&this.hide()})},_showIframe:function(){var a=this;this.iframe||this._createIframe(),this.iframe.attr({src:this._fixUrl(),name:"dialog-iframe"+(new Date).getTime()}),this.iframe.one("load",function(){a.get("visible")&&(a.get("autoFit")&&(clearInterval(a._interval),a._interval=setInterval(function(){a._syncHeight()},300)),a._syncHeight(),a._setPosition(),a.trigger("complete:show"))})},_fixUrl:function(){var a=this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);return a.shift(),a[1]=(a[1]&&"?"!==a[1]?a[1]+"&":"?")+"t="+(new Date).getTime(),a.join("")},_createIframe:function(){var a=this;this.iframe=f("<iframe>",{src:"javascript:'';",scrolling:"no",frameborder:"no",allowTransparency:"true",css:{border:"none",width:"100%",display:"block",height:"100%",overflow:"hidden"}}).appendTo(this.contentElement),i.mixTo(this.iframe[0]),this.iframe[0].on("close",function(){a.hide()})},_syncHeight:function(){var a;if(this.get("height"))clearInterval(this._interval),delete this._interval;else{try{this._errCount=0,a=e(this.iframe)+"px"}catch(b){this._errCount=(this._errCount||0)+1,this._errCount>=6&&(a=this.get("initialHeight"),clearInterval(this._interval),delete this._interval)}this.contentElement.css("height",a),this.element[0].className=this.element[0].className}}});c.exports=k,c.exports.outerBoxClass="arale-dialog-1_2_3"}),define("arale/dialog/1.2.3/dialog-debug.handlebars",["gallery/handlebars/1.0.2/runtime-debug"],function(a,b,c){var d=a("gallery/handlebars/1.0.2/runtime-debug"),e=d.template;c.exports=e(function(a,b,c,d,e){this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||{};for(var f in a.helpers)c[f]=c[f]||a.helpers[f];e=e||{};var g,h="",i="function",j=this.escapeExpression;return h+='<div class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'">\n    <a class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'-close" title="关闭本框" href="javascript:;" data-role="close"></a>\n    <div class="',(g=c.classPrefix)?g=g.call(b,{hash:{},data:e}):(g=b.classPrefix,g=typeof g===i?g.apply(b):g),h+=j(g)+'-content" data-role="content"></div>\n</div>\n'})}),define("arale/dialog/1.2.3/confirmbox-debug.handlebars",["gallery/handlebars/1.0.2/runtime-debug"],function(a,b,c){var d=a("gallery/handlebars/1.0.2/runtime-debug"),e=d.template;c.exports=e(function(a,b,c,d,e){function f(a,b){var d,e="";return e+='\n<div class="',(d=c.classPrefix)?d=d.call(a,{hash:{},data:b}):(d=a.classPrefix,d=typeof d===m?d.apply(a):d),e+=n(d)+'-title" data-role="title">',(d=c.title)?d=d.call(a,{hash:{},data:b}):(d=a.title,d=typeof d===m?d.apply(a):d),(d||0===d)&&(e+=d),e+="</div>\n"}function g(a,b){var d,e="";return e+='\n    <div class="',(d=c.classPrefix)?d=d.call(a,{hash:{},data:b}):(d=a.classPrefix,d=typeof d===m?d.apply(a):d),e+=n(d)+'-operation" data-role="foot">\n        ',d=c["if"].call(a,a.confirmTpl,{hash:{},inverse:o.noop,fn:o.program(4,h,b),data:b}),(d||0===d)&&(e+=d),e+="\n        ",d=c["if"].call(a,a.cancelTpl,{hash:{},inverse:o.noop,fn:o.program(6,i,b),data:b}),(d||0===d)&&(e+=d),e+="\n    </div>\n    "}function h(a,b){var d,e="";return e+='\n        <div class="',(d=c.classPrefix)?d=d.call(a,{hash:{},data:b}):(d=a.classPrefix,d=typeof d===m?d.apply(a):d),e+=n(d)+'-confirm" data-role="confirm">\n            ',(d=c.confirmTpl)?d=d.call(a,{hash:{},data:b}):(d=a.confirmTpl,d=typeof d===m?d.apply(a):d),(d||0===d)&&(e+=d),e+="\n        </div>\n        "}function i(a,b){var d,e="";return e+='\n        <div class="',(d=c.classPrefix)?d=d.call(a,{hash:{},data:b}):(d=a.classPrefix,d=typeof d===m?d.apply(a):d),e+=n(d)+'-cancel" data-role="cancel">\n            ',(d=c.cancelTpl)?d=d.call(a,{hash:{},data:b}):(d=a.cancelTpl,d=typeof d===m?d.apply(a):d),(d||0===d)&&(e+=d),e+="\n        </div>\n        "}this.compilerInfo=[3,">= 1.0.0-rc.4"],c=c||{};for(var j in a.helpers)c[j]=c[j]||a.helpers[j];e=e||{};var k,l="",m="function",n=this.escapeExpression,o=this;return k=c["if"].call(b,b.title,{hash:{},inverse:o.noop,fn:o.program(1,f,e),data:e}),(k||0===k)&&(l+=k),l+='\n<div class="',(k=c.classPrefix)?k=k.call(b,{hash:{},data:e}):(k=b.classPrefix,k=typeof k===m?k.apply(b):k),l+=n(k)+'-container">\n    <div class="',(k=c.classPrefix)?k=k.call(b,{hash:{},data:e}):(k=b.classPrefix,k=typeof k===m?k.apply(b):k),l+=n(k)+'-message" data-role="message">',(k=c.message)?k=k.call(b,{hash:{},data:e}):(k=b.message,k=typeof k===m?k.apply(b):k),(k||0===k)&&(l+=k),l+="</div>\n    ",k=c["if"].call(b,b.hasFoot,{hash:{},inverse:o.noop,fn:o.program(3,g,e),data:e}),(k||0===k)&&(l+=k),l+="\n</div>\n"})});