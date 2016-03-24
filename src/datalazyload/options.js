/**
 * @fileOverview 组件公开配置
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var options = {

	//$dataLazyLoadElements: null,	//[必填]需要进行数据懒加载的容器, 数据加载后将会替换容器内所有内容
	threshold: 0,									//在可视区域的额外边距值
	container: window,							//基容器, 默认为window
	dataKeyAttr: 'content',
	dataSrcDomain: '',
	dataCacheKeyAttr: 'cache-key',
	dataSrcAttr: 'src',
	load: null,									//数据加载并替换容器内容后触发, 可额外定义替换容器后的操作
	jsonpCallBack: null,				//[必填]jquery返回jsonp时指定的jsonp callback
	throttleInterval: 10				//scroll和resize触发最小间隔
};


module.exports = options;