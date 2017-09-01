/**
 * @file 爬取文件中的url图片
 * @author liruonan(812560550@qq.com)
 * @since 17/8/25
 */

const fs = require('fs');
const request = require('request');
const async = require('async');

function asyncFetchData() {
    var rfs = fs.readFileSync('./data/img.json');
    var data = JSON.parse(rfs).imgs;
    // console.log(data)

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

var currentCount = 0; // 当前并发数记录
function fetchImg(item, callback) {
    var filepath = '/image/' + item.id + '.png';
    fs.exists(filepath, function(exists) {
        if (exists) {
            console.log(filepath + ' is exists');
            callback(null, 'exists');
        } else {
            // 文件不存在，开始下载文件
            currentCount++;

            // pipe 一直在报错
            // .pipe(fs.createWriteStream(filepath))
            request({ url: item.img, encoding: 'binary' }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    fs.writeFile(__dirname + filepath, body, 'binary', function(err) {
                        if (err) { console.log(err); }
                    });
                }
            });
        }
    });
}

asyncFetchData();