!function(t){function o(e){if(n[e])return n[e].exports;var a=n[e]={exports:{},id:e,loaded:!1};return t[e].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}var n={};return o.m=t,o.c=n,o.p="/demo/",o(0)}([function(t,o,n){t.exports=n(4)},function(t,o,n){var e=n(6),a={on:{scroll:function(){var t=$(this._options.container);t.on("scroll.lazyload",$.proxy(e.onScrollHandler,this))},resize:function(){$(window).on("resize.lazyload",$.proxy(e.onResizeHanlder,this))}},off:{scroll:function(){var t=$(this._options.container);t.off("scroll.lazyload")},resize:function(){$(window).off("resize.lazyload")}}};t.exports=a},function(t,o,n){var e,a=n(3),r=n(1),i=$(window),l={belowthefold:function(t,o){var n,t;return n=void 0===o.container||o.container===window?(window.innerHeight?window.innerHeight:i.height())+i.scrollTop():$(o.container).offset().top+$(o.container).height(),n<=t.offset().top-o.threshold},rightoffold:function(t,o){var n,t;return n=void 0===o.container||o.container===window?i.width()+i.scrollLeft():$(o.container).offset().left+$(o.container).width(),n<=t.offset().left-o.threshold},abovethetop:function(t,o){var n,t;return n=void 0===o.container||o.container===window?i.scrollTop():$(o.container).offset().top,n>=t.offset().top+o.threshold+t.height()},leftofbegin:function(t,o){var n,t;return n=void 0===o.container||o.container===window?i.scrollLeft():$(o.container).offset().left,n>=t.offset().left+o.threshold+t.width()},inviewport:function(t,o){return!(this.rightoffold(t,o)||this.leftofbegin(t,o)||this.belowthefold(t,o)||this.abovethetop(t,o))},update:function(t,o){var n=this,e=[];$.each(t,function(t,a){n.inviewport(a,o)&&(n.loadData(a,o),e.push(a))}),$.each(e,function(o,n){~$.inArray(n,t)&&t.splice(t.indexOf(n),1)})},throttleUpdate:function(t,o){var n=this;e&&clearTimeout(e),e=setTimeout(function(){return 0==t.length?void $.each(r.off,function(t,o){o.call(n)}):void n.update(t,o)},o.interval)},loadData:function(t,o){var n=t.attr("data-"+o.dataCacheKeyAttr);$.jsonp({url:o.dataSrcDomain+t.attr("data-"+o.dataSrcAttr),callback:o.jsonpCallback,success:$.proxy(this.loadDataSuccess,this,o.dataKeyAttr,n,t,o.load),error:$.proxy(this.loadDataError,this,n,t,o.load)})},loadDataSuccess:function(t,o,n,e,a,r,i){var l=a[t];l&&(localStorage.setItem(o,l),this.replaceContent(n,l,e))},loadDataError:function(t,o,n,e,r,i){a.debug(r);var l=localStorage.getItem(t);null!=l&&this.replaceContent(o,l,n)},replaceContent:function(t,o,n){t.html(o),null!=n&&n.call(this,t)}};t.exports=l},function(t,o){var n={debug:function(t){console&&console.debug(t)}};t.exports=n},function(t,o,n){var e=n(7),a=new e({threshold:20,jsonpCallback:"loadLazyData",load:function(t){t.find("script").remove()}});a.init($(".lazyload"))},function(t,o){var n={dataLazyLoadElements:[]};t.exports=n},function(t,o,n){var e=(n(3),n(2)),a={onScrollHandler:function(){e.throttleUpdate(this._attrs.dataLazyLoadElements,this._options)},onResizeHanlder:function(){e.throttleUpdate(this._attrs.dataLazyLoadElements,this._options)}};t.exports=a},function(t,o,n){"use strict";function e(t){var o=this;o._options=$.extend(!0,{},r,t),o._attrs=$.extend(!0,{},a),$.each(i.on,function(t,n){n.call(o)})}var a=n(5),r=n(8),i=n(1),l=n(2);e.prototype={init:function(t){var o=this;$.each(t,function(t,n){o._attrs.dataLazyLoadElements.push($(n))}),l.throttleUpdate(this._attrs.dataLazyLoadElements,this._options)}},t.exports=e},function(t,o){var n={threshold:0,container:window,dataKeyAttr:"content",dataSrcDomain:"",dataCacheKeyAttr:"cache-key",dataSrcAttr:"src",load:null,jsonpCallBack:null,throttleInterval:10};t.exports=n}]);