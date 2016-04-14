/**
 * @fileOverview 组件初始化, 定义实例, 引用css, 引用模板, 引用其他依赖模板
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


;'use strict';

var attrs = require('./attrs');
var defaults = require('./options');
var events = require('./events');
var service = require('./service');


function DataLazyLoad(options) {

	var that = this;

	that._options = $.extend(true, {}, defaults, options);

	that._attrs = $.extend(true, {}, attrs);


	$.each(events.on, function(eventType, bindEvent) {

		bindEvent.call(that);

	});
	//check options, if error, throw custom Error
	//@todo

	//return that;
}

DataLazyLoad.prototype = {

	init: function($dataLazyLoadElements) {

		var that = this;

		//每次初始化时, 更新要lazyload的元素
		$.each($dataLazyLoadElements, function(index, element) {

			that._attrs.dataLazyLoadElements.push($(element));

		});

		service.throttleUpdate(this._attrs.dataLazyLoadElements, this._options, this._attrs);

	}

};

module.exports = DataLazyLoad;