/**
 * @fileOverview 组件业务逻辑
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */
var utils = require('./utils');
var events = require('./events');

var $window = $(window);

var timer;

var service = {

	belowthefold: function($element, options) {
		var fold, $element;

		if (options.container === undefined || options.container === window) {
			fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
		} else {
			fold = $(options.container).offset().top + $(options.container).height();
		}

		return fold <= $element.offset().top - options.threshold;
	},

  rightoffold: function($element, options) {
		var fold, $element;

		if (options.container === undefined || options.container === window) {
			fold = $window.width() + $window.scrollLeft();
		} else {
			fold = $(options.container).offset().left + $(options.container).width();
		}

		return fold <= $element.offset().left - options.threshold;
	},

	abovethetop: function($element, options) {
		var fold, $element;

		if (options.container === undefined || options.container === window) {
			fold = $window.scrollTop();
		} else {
			fold = $(options.container).offset().top;
		}

		return fold >= $element.offset().top + options.threshold  + $element.height();
	},

  leftofbegin: function($element, options) {
		var fold, $element;

		if (options.container === undefined || options.container === window) {
			fold = $window.scrollLeft();
		} else {
			fold = $(options.container).offset().left;
		}

		return fold >= $element.offset().left + options.threshold + $element.width();
	},

	inviewport: function($element, options) {
		return !this.rightoffold($element, options) && !this.leftofbegin($element, options) &&
			!this.belowthefold($element, options) && !this.abovethetop($element, options);
	},

	update: function(dataLazyLoadElements, options) {
		var that = this,
			  loadedElements = [];
		$.each(dataLazyLoadElements, function(index, $element) {
			if(that.inviewport($element, options)) {
				that.loadData($element, options);
				loadedElements.push($element);
			}
		});
		$.each(loadedElements, function(index, $element) {
			if(~$.inArray($element, dataLazyLoadElements)) {
				dataLazyLoadElements.splice(dataLazyLoadElements.indexOf($element), 1);
			}
		});
	},

	throttleUpdate: function(dataLazyLoadElements, options) {
		var that = this;

		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {

			if(dataLazyLoadElements.length == 0) {

				$.each(events.off, function(eventType, unBindEvent) {

					unBindEvent.call(that);

				});

				return;

			}

			that.update(dataLazyLoadElements, options);

		}, options.interval);

	},

	loadData: function($element, options) {
		var dataCacheKey = $element.attr('data-' + options.dataCacheKeyAttr);
		$.jsonp({
			url: options.dataSrcDomain + $element.attr('data-' + options.dataSrcAttr),
			callback: options.jsonpCallback,
			success: $.proxy(this.loadDataSuccess, this, options.dataKeyAttr, dataCacheKey, $element, options.load),
			error: $.proxy(this.loadDataError, this, dataCacheKey, $element, options.load)
		});
	},

	loadDataSuccess: function(dataKey, dataCacheKey, $element, loadFn, data, textStatus, jqXHR) {
		//判断数据是否有值, 如有值, 缓存数据至本地
		var content = data[dataKey];
		if(content) {
			localStorage.setItem(dataCacheKey, content);
			this.replaceContent($element, content, loadFn);
		}
	},

	loadDataError: function(dataCacheKey, $element, loadFn, xhr, textStatus, errorThrown) {
		utils.debug(textStatus);
		//判断本地缓存数据是否存在, 如存在, 取缓存数据
		var cacheContent = localStorage.getItem(dataCacheKey)
		if(cacheContent != null) {
			this.replaceContent($element, cacheContent, loadFn);
		}
	},

	replaceContent: function($element, cacheContent, loadFn) {
		//jquery html方法会自动解析出script标记并执行js代码
		$element.html(cacheContent);
		if(loadFn != null) {
			loadFn.call(this, $element);
		}
	}

};

module.exports = service;