/**
 * @fileOverview 组件事件处理
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var util = require('./utils');
var service = require('./service');


var handler = {

	onScrollHandler: function() {

		service.throttleUpdate(this._attrs.dataLazyLoadElements, this._options, this._attrs);

	},

	onResizeHanlder: function() {

		service.throttleUpdate(this._attrs.dataLazyLoadElements, this._options, this._attrs);

	}

}




module.exports = handler;