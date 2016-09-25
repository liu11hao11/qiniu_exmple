/**
 * Created by Alex Liu on 2016/9/22.
 */


var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = 'XXXXX';
qiniu.conf.SECRET_KEY = 'XXXXX';

//构建client对象
var client = new qiniu.rs.Client();
//你要测试的空间， 并且这个key在你空间中存在
var bucket = 'panop';
var key = 'jiuhua.jpg';

//移动到的目标空间名和重命名的key
var dstbucket = 'panopv2'
var dstkey = 'jiuhua.jpg'

//复制资源
client.copy(bucket, key, dstbucket, dstkey, function(err, ret) {
    if (!err) {
        console.log(ret);
        // ok
    } else {
        console.log(err);
    }
});


function handleCopyFile(bucket,key,dstbucket,dstkey){
   return  new qiniu.rs.EntryPathPair(new qiniu.rs.EntryPath(bucket,key),new qiniu.rs.EntryPath(dstbucket,dstkey));
}


//批量复制。
var enties=[
    handleCopyFile("panop","jiuhua.jpg","panopv2","ja.jpg")
];
client.forceBatchCopy(enties,true,
    function(err, ret) {
        if (!err) {
            console.log(ret);
            ret.forEach(function(batchItem){
                if(batchItem.code!==200){
                    console.log()
                }
            })
            // ok
        } else {
            console.log(err);
        }
    }
)

//强制复制资源
client.forceCopy(bucket, key, dstbucket, dstkey,true, function(err, ret) {
    if (!err) {
        console.log(ret);
        // ok
    } else {
        console.log(err);
    }
});
