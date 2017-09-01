# spider
This is a spider demo based on Nodejs, and shown by Vue


1. 导入依赖库  
   
   		const https = require('https');
   		const fs = require('fs');
   		const cheerio = require('cheerio');
   		const request = require('request');
		const async = require('async');
   
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

5. 下载图片

		function asyncFetchData() {
    		var rfs = fs.readFileSync('./data/img.json');
    		var data = JSON.parse(rfs).imgs;
			// 异步并发请求
    		async.mapLimit(data, 20,
        		function(item, callback) {
            		// 每个img对象的处理逻辑
            		var valid = 'https:undefined';
            		if (item.img !== valid) {
                		fetchImg(item, callback);
            		}
        		},
        		function(err) {
            		console.log("失败" + err);
       			 }
   			 )
		};
		...
		// pipe: .pipe(fs.createWriteStream(filepath)) 一直在报错
		// 使用二进制文件流下载就成功了，图片是二进制文件
        request({ url: item.img, encoding: 'binary' }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                fs.writeFile(__dirname + filepath, body, 'binary', function(err) {
                    if (err) { console.log(err); }
                });
            }
        });

6. 基于Vue组件化开发
	> axios 异步获取爬下来的数据：server/data/data.json
	
	> props 父组件向子组件传输数据
	
	> v-for 渲染列表显示爬虫数据
	

#### 问题： 
  1. 由于代码还需要完善，暂未build发布，且前端和后台还是完全分离状态。必须: 先进入server目录执行node spider.js生成最新的data.json，才能在主程序中npm run dev。server目录和主程序都需要先npm install加载依赖。
  2. 后台未搭建数据库，故而数据并没有存储在服务器中，只是静态资源文件。模糊匹配暂不实现。