# jquery.dataLazyLoad
简单的数据懒加载器, 根据自身业务需要实现了jsop方式获取模板+数据+初始化脚本进行加载

开发环境采用webpack-dev-server

## 运行环境

*   确保安装了nodejs环境

*   确保全局安装了gulp

*   将项目拉下来后, 根目录执行npm install

*   根目录执行gulp webpack:dev-server

*   打开浏览器, 输入localhost:9090/demo/datalazyload.html

##  [查看在线示例](http://www.vanadis.cn/demo/datalazyload.html)

## 配置项

*   `threshold`: 判断元素是否在范围内的额外边距, 默认为0
*   `jsonpCallback`: jsonp文件中使用的function名称
*   `load`: jsonp数据加载至页面上后执行的自定义方法
*   `container`: 包含懒加载元素的基容器
*   `dataKeyAttr`: jsonp数据定义的获取用的key, 需要与jsonp数据中返回的object对象中的key对应, 默认为'content'
*   `dataCacheKeyAttr`: 与定义在页面元素上的data-*对应, 用于指定缓存不同数据至本地的key, 默认为'cache-key'
*   `dataCacheTimeKeyAttr`: 与定义在页面元素上的data-*对应, 用于指定缓存不同数据的更新时间, 默认为'cache-time'
*   `dataSrcAttr`: 与定义在页面元素上的data-*对应, 用于指定获取jsonp数据的相对路由
*   `dataSrcDomain`: 用于额外指定获取jsonp数据的路由的前半部分, 默认为''
*   `throttleInterval`: 用于指定懒加载事件触发的最小间隔, 默认为10(ms)

## 简单使用

### 页面元素
```html
<div class="container center-block">
    <div class="lazyload" data-src="jsonp/floor-1.js" data-cache-key="floor-1" data-cache-time="20160501120909123">
        loading...
    </div>
    <div class="lazyload" data-src="jsonp/floor-2.js" data-cache-key="floor-2" data-cache-time="20160501120909124">
        loading...
    </div>
    <div class="lazyload" data-src="jsonp/floor-3.js" data-cache-key="floor-3" data-cache-time="20160501120909125">
        loading...
    </div>
    <div class="lazyload" data-src="jsonp/floor-4.js" data-cache-key="floor-4" data-cache-time="20160501120909126">
        loading...
    </div>
    <div class="lazyload" data-src="jsonp/floor-5.js" data-cache-key="floor-5" data-cache-time="20160501120909127">
        loading...
    </div>
</div>
```
### javascript初始化
```javascript
var DataLazyLoad = require('./../src/datalazyload');

var instance = new DataLazyLoad({
  threshold: 20,
  jsonpCallback: 'loadLazyData',
  load: function($element) {
    $element.find('script').remove();
  }

});

instance.init($('.lazyload'));
```
