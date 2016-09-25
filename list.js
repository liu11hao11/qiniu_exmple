
var qiniu = require("qiniu");
var async=require('asyncawait/async');
var await=require('asyncawait/await');

qiniu.conf.ACCESS_KEY = 'XXXXXXX';
qiniu.conf.SECRET_KEY = 'XXXXXXXXXXXXXX';

//构建查询list对象
var rsf = qiniu.rsf;
var bucket = 'panop';
var prefix ;
var marker="";
var delimiter="";
var limit;

var keyResults=[];
function getPrefixListItem(bucket, prefix, marker, limit, delimiter){
    rsf.listPrefix(bucket, prefix, marker, limit, delimiter, function(err, ret) {
        if (!err) {
            // ok
            console.log(ret.items.length);
            ret.items.forEach(function(item){
                keyResults.push(item.key);
            })
            if(ret.marker){//程序为处理完成，还有资源待处理
                var marker=ret.marker;
                getPrefixListItem(bucket, prefix, marker, limit, delimiter);
            }else{////程序查找前缀处理完成
                console.log(keyResults);
            }
        } else {
            console.log(err);
        }
    })
}

var prfixArray=[ '123456'];
prfixArray.forEach(function(prefix){
    getPrefixListItem(bucket, prefix, marker, limit, delimiter);
})



