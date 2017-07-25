# spider
This is a spider demo based on Nodejs, and shown by Vue


1. 导入依赖库  
   
   		const https = require('https');
   		const fs = require('fs');
   		const cheerio = require('cheerio');
   		const request = require('request');
   
2. 第三方API

   		var url = 'https://juejin.im/welcome/frontend';
   		var path = 'https://juejin.im';
   
3. 爬取数据

   		var fetchPage = function (x){
	    	    https.get(x, function(res) {
		       var html = '';

		       res.on('data', function (chunk){
			   html += chunk;
		       });

		       res.on('end', function (){
			  var $ = cheerio.load(html);
        		  // 通过选择器进行页面数据的爬取
        		  ...
      		      });
    		    });
   	        }
4. 存入数据
  
  	 	fs.writeFile('data/juejin.html',html);
	 	fs.writeFile('data/data.json',JSON.stringify(article));
	 	fs.writeFile('data/img.json',JSON.stringify(image));

5. 基于Vue组件化开发
	> axios 异步获取爬下来的数据：server/data/data.json
	
	> props 父组件向子组件传输数据
	
	> v-for 渲染爬虫列表
	

#### 问题： 
  1. 目前图片是直接利用data.json中的link，后期考虑把图片也爬下来。因为大量的图片需要多页面下载，考虑使用async/await异步下载方法。
  2. 输入框的作用是，模糊匹配达到输入关键词，实现过滤相关技术贴的功能，暂未实现。希望有兴趣的同学可以交流。
  3. 目前前端和后台还是完全分离状态。必须: 先进入server目录执行node spider.js生成最新的data.json，才能在主程序中npm run dev
  4. 由于代码还需要完善，目前赞未build发布。server目录和主程序都需要先npm install加载依赖。