# spider
this is  a demo based on node for spider
基于Nodejs实现的spider爬虫小程序

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
