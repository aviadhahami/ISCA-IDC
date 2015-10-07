'use strict';

module.exports = function(app){

    var multer = require('multer');
    var upload = multer({ dest: './uploads/'});

    app.use(multer({ dest: './uploads/',
        rename: function (fieldname, filename) {
            console.log(fieldname);
            return fieldname+'_CV_'+Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path);
        }
    }));

    app.post('/api/cv',function(req,res){
        upload(req,res,function(err) {
            if(err) {
                return res.end('Error uploading file.');
            }
        });
        res.json(true);
    });
};
