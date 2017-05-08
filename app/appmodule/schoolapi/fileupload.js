var db = require("db");
var rs = require("gen").res;
var path = require('path');
var formidable = require('formidable');
var fileupload = module.exports = {};


//file upload example

fileupload.uploadFile = function uploadFile(req, res, done) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

    var form = new formidable.IncomingForm();
    var i = 0;

    //Formidable uploads to operating systems tmp dir by default

    form.uploadDir = "./www/uploads"; //set upload directory
    form.keepExtensions = true; //keep file extension

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write(JSON.stringify(files.fileUploaded));

        i = i + 1;

        console.log("form.bytesReceived");

        var name = JSON.stringify(files.fileUploaded.name);
        var filepath = JSON.stringify(files.fileUploaded.path);
        var size = JSON.stringify(files.fileUploaded.size);
        var type = JSON.stringify(files.fileUploaded.type);

        //TESTING

        console.log("file name: " + name);
        console.log("file path: " + filepath);
        console.log("file size: " + size);
        console.log("file type: " + type);
        console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));
        console.log("guid: " + guid);

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name

        // fs.rename(files.fileUploaded.path, './uploads/' + files.fileUploaded.name, function(err) {
        //     if (err)
        //         throw err;
        //     console.log('renamed complete');
        // });

        res.end();
    });

    // if (path.extname(req.files.file.name).toLowerCase() === '.png') {
    //     fs.rename(tempPath, targetPath, function(err) {
    //         if (err) throw err;
    //         console.log("Upload completed!");
    //     });
    // } else {
    //     fs.unlink(tempPath, function() {
    //         if (err) throw err;
    //         console.error("Only .png files are allowed!");
    //     });
    // }
}