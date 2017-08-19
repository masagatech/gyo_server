var db = require("db");
var rs = require("gen").res;
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fileupload = module.exports = {};
// Include the node file module
var Jimp = require("jimp");
// Include ImageMagick


fileupload.uploadFile = function uploadFile(req, res, done) {
    let width = req.query.width || 200;
    //let height = req.query.height || 200 ;
    


    var form = new formidable.IncomingForm();
    form.uploadDir = "www/uploads"; //set upload directory
    form.keepExtensions = true; //keep file extension

    var files = [];
    var fields = [];

    form.on('field', function (field, value) {
        fields.push([field, value]);
    })

    form.on('file', function (field, file) {

        //gm(file.path).resize(200);
        // open a file called "lenna.png" 
        Jimp.read(file.path, function (err, lenna) {
            if (err) throw err;
            lenna.resize(Number(width),Jimp.AUTO)            // resize 
                .quality(80)                  // set greyscale 
                .write(file.path); // save 
        });
        // fs.readFile(file.path, function (err, data) {

        // fs.writeFile("www/uploads/a.jpg", data, function (err) {
        // write file to uploads/thumbs folder

        //res.redirect("/uploads/fullsize/" + imageName);
        //});
        //});
        //fs.readFile(file.path, function (err, data) {
        //console.log(data);
        // fs.writeFile(file.path, data1, function (err) {
        // write file to uploads/thumbs folder

        // im.resize({
        //     srcData: fs.readFileSync(file.path, 'binary'),
        //     width: 200
        // }, function (err, stdout, stderr) {
        //     if (err) console.log(err);
        //     //fs.writeFileSync( form.uploadDir + "/" + file.name, stdout, 'binary');
        //     console.log('resized image to fit within 200x200px');
        // });               
        // });

        // });
        files.push([field, file]);
    })

    form.on('end', function () {
        res.writeHead(200, { 'content-type': 'text/plain' });
        var sortedFiles = [];
        for (var i = 0; i <= files.length - 1; i++) {
            var upl = files[i][1];


            // im.resize({
            //     srcData: fs.readFileSync(upl.path, 'binary'),
            //     width: 200
            // }, function (err, stdout, stderr) {
            //     console.log(stderr);
            //     console.log(err);
            //     if (err) throw err;
            //     console.log('resized image to fit within 200x200px');
            // });
            sortedFiles.push({
                "name": upl.name,
                "type": upl.type,
                "size": upl.size,
                "path": upl.path
            });
        }

        res.write(JSON.stringify(sortedFiles));
        res.end();
    });

    form.parse(req);
}

