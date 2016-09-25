var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = 'XXXX';
qiniu.conf.SECRET_KEY = 'XXXX';

//构建bucketmanager对象
var client = new qiniu.rs.Client();

//你要测试的空间， 并且这个key在你空间中存在
bucket = 'panop';
key = 'Chrysanthemum.jpg';

//移动到的目标空间名和重命名的key
dstbucket = 'panop'
dstkey = 'jiuhua.jpg'


//移动资源
client.move(bucket, key, dstbucket, dstkey, function (err, ret) {
    if (!err) {
        // ok
    } else {
        console.log(err);
    }
});


function handleCopyFile(bucket, key, dstbucket, dstkey) {
    return new qiniu.rs.EntryPathPair(new qiniu.rs.EntryPath(bucket, key), new qiniu.rs.EntryPath(dstbucket, dstkey));
}


//批量复制。
var enties = [
    handleCopyFile("panop", "jiuhua.jpg", "panopv2", "ja.jpg")
];

//强制批量移动资源
client.forceBatchMove(enties, true, function (err, ret) {
    if (!err) {
        // ok
    } else {
        console.log(err);
    }
});
