'use strict';

module.exports = function(app){
    var destFolder = './uploads/resumes/';
    var multer = require('multer');
    var upload = multer({ dest: destFolder});

    var http = require('http');
    var fs = require('fs');
    var path = require('path');

    var locationString = '';


    app.use(multer({ dest: destFolder,
        rename: function (fieldname, filename, file) {
            locationString = file.user.firstName+file.user.lastName + '_CV';
            return locationString;
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path);
            locationString += '.' + file.extension;
        }
    }));

    app.post('/api/cv',function(req,res){
        upload(req,res,function(err) {
            if(err) {
                return res.end('Error uploading file.');
            }
        });
        res.json({
            'URI':locationString
        });

        // Important to clear this!
        locationString = '';
    });
    app.get('/downloadcv/:file', function(req,res) {
        //var file = fs.createWriteStream(destFolder+req.params.file);
        //console.log(req.params);
        //res.pipe(file);
        console.log(__dirname);
        var location = path.join(destFolder+req.params.file);
        console.log(location);
        res.download(location);


    });
};
