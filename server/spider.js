/**
 * @file 爬取网页中的数据
 * @author liruonan(812560550@qq.com)
 * @since 17/6/22
 */

const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); // 类似于jQuery

var url = 'https://juejin.im/welcome/frontend';
var path = 'https://juejin.im';
var reg = /^(http|https)/;

var fetchPage = function(x) {
    https.get(x, function(res) {
        var html = '';

        res.on('data', function(chunk) {
            html += chunk;
        });

        res.on('end', function() {
            var $ = cheerio.load(html);
            var obj = {},
                data = [];

            var i = 0,
                obj2 = {},
                imgs = [];

            var article = {},
                image = {};

            $('ul.entry-list div.content-box').each(function(i, elem) {
                var title = $(this).find('.title-row a').text();
                var link = $(this).find(' .title-row a').attr('href');
                var username = $(this).find('.meta-row .username').text();
                var tag = $(this).find('.meta-row .tag').text();
                var count = $(this).find('.action-row .count').text();
                // var date = $(this).find('.meta-row span.date').text();
                var img = $(this).find('.thumb img').attr('src');

                if (title && link && count && username && tag) {
                    if (!reg.test(link)) {
                        link = path + link;
                    }
                    if (!reg.test(img)) {
                        img = 'https:' + img;
                    }
                    data.push(
                        obj = {
                            title: title,
                            link: link,
                            username: username,
                            tag: tag,
                            count: count,
                            img: img
                        }
                    );

                    imgs.push(
                        obj2 = {
                            id: i++,
                            img: img
                        }
                    )
                }
            });
            article = {
                type: 0, // 0表示前端类型
                errmsg: 'success',
                data: data
            };

            image = {
                type: 0, // 0表示前端类型
                errmsg: 'success',
                imgs: imgs
            };

            fs.writeFileSync('data/juejin.html', html); // 同步写入
            fs.writeFileSync('data/data.json', JSON.stringify(article));
            fs.writeFileSync('data/img.json', JSON.stringify(image));
        })
    })
}

fetchPage(url)