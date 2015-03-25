var glob = require("glob");
var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));


var dir = argv.folder || '**/*';
var findText = argv.findText;
var replaceText = argv.replaceText;


glob(dir, function (er, files) {
    files.forEach(function(file){
        if(file.indexOf(findText) > -1 && findText && replaceText){
            var newText = file.replace(findText, replaceText);
            fs.rename(file, newText , function(err){
                if(err) throw err;
                console.log(newText);
            })
        }
    })
});