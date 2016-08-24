var multer = require('multer');
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './client/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ 
    storage: storage
    }).single('file');

module.exports = {
    uploadImg: function(req, res) {
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.send({error_code:0,err_desc:null, file:req.file});
        });
    }
}