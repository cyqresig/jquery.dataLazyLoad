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

	update: function(dataLazyLoadElements, options, attrs) {
		var that = this,
			  loadedElements = [];
		$.each(dataLazyLoadElements, function(index, $element) {
			if(that.inviewport($element, options)) {
				that.loadData($element, options, attrs);
				loadedElements.push($element);
			}
		});
		$.each(loadedElements, function(index, $element) {
			var index = $.inArray($element, dataLazyLoadElements);
			if(~index) {
				dataLazyLoadElements.splice(index, 1);
			}
		});
	},

	throttleUpdate: function(dataLazyLoadElements, options, attrs) {
		var that = this;

		if(timer) {
			clearTimeout(timer);
		}

		if(dataLazyLoadElements.length == 0) {
			return;
		}

		timer = setTimeout(function() {

			that.update(dataLazyLoadElements, options, attrs);

		}, options.throttleInterval);

	},

	loadData: function($element, options, attrs) {
		var cacheTime,
			  dataCacheTime = $element.attr('data-' + options.dataCacheTimeKeyAttr),
			  dataCacheKey = $element.attr('data-' + options.dataCacheKeyAttr),
				cacheContent = JSON.parse(localStorage.getItem(dataCacheKey));
		//判断本地缓存数据是否存在
		if(cacheContent != null) {

			 cacheTime = cacheContent.dataCacheTime;
			//utils.debug('cacheContent = ');
			//utils.debug(cacheContent);
			//utils.debug('cacheTime = ' + cacheTime);
			//utils.debug('dataCacheTime = ' + dataCacheTime);
			//缓存时间更新, 重新请求远程数据
			if(cacheTime != dataCacheTime) {
					//utils.debug('缓存时间更新, 重新请求远程数据');
					this.loadJsonpData($element, options, dataCacheKey, dataCacheTime);
			}
			//缓存时间未更新, 直接使用本地缓存替换内容
			else {
				//utils.debug('缓存时间未更新, 直接使用本地缓存替换内容');
				if(cacheContent.dataCacheTime) {
					 this.replaceContent($element, cacheContent.dataCacheContent, options.load);
				}
			}
		}
		//本地缓存数据不存在
		else {
			//utils.debug('本地缓存数据不存在');
			this.loadJsonpData($element, options, dataCacheKey, dataCacheTime);
		}
	},

	loadJsonpData: function($element, options, dataCacheKey, dataCacheTime) {
		$.jsonp({
			url: options.dataSrcDomain + $element.attr('data-' + options.dataSrcAttr) + '?t=' + $element.attr('data-' + options.dataCacheTimeKeyAttr),
			callback: options.jsonpCallback,
			success: $.proxy(this.loadDataSuccess, this, options.dataKeyAttr, dataCacheTime, dataCacheKey, $element, options.load),
			error: $.proxy(this.loadDataError, this, dataCacheKey, $element, options.load)
		});
	},

	loadDataSuccess: function(dataKey, dataCacheTime, dataCacheKey, $element, loadFn, data, textStatus, jqXHR) {
		//判断数据是否有值, 如有值, 缓存数据至本地
		var content = data[dataKey];
		if(content) {
			localStorage.setItem(dataCacheKey, JSON.stringify({
				dataCacheTime: dataCacheTime,
				dataCacheContent: content
			}));
			this.replaceContent($element, content, loadFn);
		}
	},

	loadDataError: function(dataCacheKey, $element, loadFn, xhr, textStatus, errorThrown) {
		utils.debug(textStatus);
		//判断本地缓存数据是否存在, 如存在, 取缓存数据
		var cacheContent = JSON.parse(localStorage.getItem(dataCacheKey));
		if(cacheContent != null) {
			this.replaceContent($element, cacheContent.dataCacheContent, loadFn);
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