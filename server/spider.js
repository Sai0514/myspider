/**
 * @file spider
 * @author liruonan(812560550@qq.com)
 * @since 17/6/22
 */

const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

var url = 'https://juejin.im/welcome/frontend';
var path = 'https://juejin.im';
var reg = /^(http|https)/;

var ERR_OK = 0;

var fetchPage = function (x){
	https.get(x, function(res) {
		var html = '';

		res.on('data', function (chunk){
			html += chunk;
		});

		res.on('end', function (){
			var $ = cheerio.load(html);
			var data = [],
				obj = {},
				article = {},
				image = {};

			$('div.list-box li.item').each(function(i, elem){
				var title = $(this).find('.title-row .title').text();
				var link = $(this).find('.title-row .title').attr('href');
				var count = $(this).find('.meta-row .count').text();
				var username = $(this).find('.meta-row .username').text();
				var date = $(this).find('.meta-row span.date').text();
				var img = $(this).find('.conetnt-box .thumb img').attr('src');
			
				if (title && link && count && username && date) {
					if(!reg.test(link)){
						link = path + link;
					}
					if(!reg.test(img)){
						img = 'https:'+img;
					}
					data.push(
						obj ={
							title: title,
							link: link,
							count: count,
							username: username,
							date: date,
							img: img
						}
					);
				}    
			});
			article = {
				type: 0,		 // 0表示前端类型
				errno: ERR_OK,
				errmsg: 'success',
				data: data
			};	
			image = {
				type: 0,		 // 0表示前端类型
				errno: ERR_OK,
				errmsg: 'success',
				img: data.map(function(item){
					return item.img;
				})
			};
			fs.writeFileSync('data/juejin.html',html);
			fs.writeFileSync('data/data.json',JSON.stringify(article));
			fs.writeFileSync('data/img.json',JSON.stringify(image));
		})
	})
}

fetchPage(url)
