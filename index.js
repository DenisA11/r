var glob = require("glob");
var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));


var dir = argv.folder || '**/*';
var findText = argv.findText;
var replaceText = argv.replaceText;

//Пожалел букву r? Обычно пишут err. :)
glob(dir, function (er, files) {
    //Ошибка не хендлится. Хотя бы залогировать или throw err;
    files.forEach(function(file){
        //findText и replaceText проверяются в цикле многократно. Можно было проверить серху.
        //Если мы "зашли так далеко", предполагается, что все данные валидны.
        
        //Если муж forEach (т.е. functional way), можно было применить сразу .filter и отбросить if.
        //Как-нибудь хитро в одну строчку закрутить с регуляркой, или прочекать лоу дэш, может что-то стандартное есть.
        if(file.indexOf(findText) > -1 && findText && replaceText){
            //Тут ты скорее всего можешь зацепить имя директории, а не только имя файла.
            //Как-нибудь бы через path.basename.
            var newText = file.replace(findText, replaceText);
            fs.rename(file, newText , function(err){
                //Фигурные скобки рекомендуется ставить всегда.
                if(err) throw err;
                console.log(newText);
            })
        }
    })
});
