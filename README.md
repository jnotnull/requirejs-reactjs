丰趣海淘采用的是服务端渲染和客服端渲染想结合的方式，关于这方面的东东可以参见这篇文章（[丰趣海淘：跨境电商平台的前端性能优化实践][1]）。丰趣海淘前端采用的框架是canjs，它面向对象，支持双向绑定，同时清晰的分层结构让人感觉这是一个非常棒的框架。

js在发展，框架也在发展，我们丰趣海淘也开始做一些其他框架的尝试，已满足海淘前端组同学们的胃口。这次实践的就是react和ES6。

丰趣海淘前端系统现状：

 1. 系统采用requirejs来管理代码依赖
 2. 需要支持IE8

基于以上两点，考虑到当前还是小范围试验阶段，不准备大改，所以要尽量保留现有代码的结构，针对某些页面可以快速方便的使用react进行开发。

1、react版本选择

react最新版本已经到15.1.0, 其中React with Add-Ons的min版本大概是158K，还是太大，我们转而选择react-lite，它的min版本只有27K。同时因为react-lite不支持IE8，所以除了加上es5-shim和es5-sham之外，还需要对react-lite框架本身做一些代码调整。

2、ES6语法转换器选择

因为WEB端很多浏览器还不支持ES5，ES6的语法，因此需要选择语法转换器。JSTransform 已经被FB废弃，围绕它的插件不用考虑。我们使用FB推荐的Babel。

3、和requirejs的集成

丰趣海淘希望的方式是继续使用requirejs来管理非react es6代码，基于这点，我们使用requirejs-babel。使用方式非常简单：
    
    define(['es6!your-es6-module'], function(module) {
        // ...
    });

为了不把babel require进去，需要在require.config.js中增加如下配置：

    pragmasOnSave: {
        'excludeBabel': true
    },

4、在ES6代码中插入require代码

因为项目中其他代码还是使用define来定义的，在ES6中直接按照如下方式引入即可：

	import SFFindRecommendProducts from 'sf.b2c.mall.api.product.findRecommendProducts';
	
	......
	
	var findRecommendProducts = new SFFindRecommendProducts({
      'itemId': -1,
      'size': 8
    });

    findRecommendProducts
      .sendRequest()
      .done(function(data) {
        ......
        self.setState({itemlist: data.value});
      })
      
这样，在requirejs管理的项目中就能愉快的玩起react和ES6了。

  [1]: http://blog.tingyun.com/web/article/detail/586?spm=5176.100239.blogcont.3.iUM2sw
