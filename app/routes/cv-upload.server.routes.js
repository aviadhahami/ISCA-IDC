'use strict';

module.exports = function(app){

    var multer = require('multer');
    var upload = multer({ dest: './uploads/resumes/'});

    app.use(multer({ dest: './uploads/resumes/',
        rename: function (fieldname, filename, file) {
            console.log(fieldname,filename,file.user);
            var d  = new Date(),
                day = d.getDate(),
                month = d.getMonth() + 1,
                year = d.getFullYear();
            return file.user.firstName+file.user.lastName + '_CV_' + day +'.'+month+'.' + year;
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
