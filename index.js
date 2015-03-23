var fs = require('fs');

var i = 'laundry';
var o = 'shmaundry';
var path = './basket';
var dirs = [];
readAllandRename(path,i,o);

function readAllandRename(dir, input, output){
    var stats = fs.statSync(dir);
    if(stats.isDirectory()){
        fs.readdir(dir, function(err, result){
            if(err) throw err;
            result.forEach(function(res){
                dirs.push(res);
                readAllandRename(dir + '/' + res, input, output);
            })
        });
    } else {
        if(dir.indexOf(input) > -1){
            var out = dir.replace(input, output);
            fs.rename(dir, out, function (err) {
                if (err) throw err;
                console.log('renamed started', dir);
                console.log('renamed complete', out);
            });
        }
    }
}
