/**
 * @fileOverview 组件事件
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var handler = require('./handlers');

var event = {

	on: {

		scroll: function() {

			var $container = $(this._options.container);

			$container.on('scroll.lazyload', $.proxy(handler.onScrollHandler, this))

		},

		resize: function() {

			$(window).on('resize.lazyload', $.proxy(handler.onResizeHanlder, this));

		}

	},

	off: {

		scroll: function() {

			var $container = $(this._options.container);

			$container.off('scroll.lazyload');

		},

		resize: function() {

			$(window).off('resize.lazyload');

		}

	}



};

module.exports = event;
