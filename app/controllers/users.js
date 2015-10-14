var mongoose = require('mongoose')
  , fs = require('fs')
  , http = require('http')
  , request = require('request')
  , _ = require("underscore");


exports.grabeYoutube = function(req,res){

    var youtubedl = require('youtube-dl');

    var uri = req.body.url;
    youtubedl.getInfo(uri, [], function(err, info) {
        if (err)
        {
          res.send({success:false});
        } 
            
        else if(info)
        {
          if(!info.thumbnail)
          {
            console.log("No Thumbnail")
          }
          console.log("info")
          res.send({success:true, info:info});
        }
            
 
    });
}


exports.uploadYoutube = function(req,res, io){

    var youtubedl = require('youtube-dl');
    var md5 = require('md5');
    var path = require('path');
    var mime = require('mime');

    var uri = req.body.url;
    var video = youtubedl(uri, [], { cwd: __dirname });

    var d= new Date();
    var vdo_name = '';
    vdo_name += md5(d.getTime() + req.body.video_name)+'.mp4';
    vdo_name = vdo_name.replace(' ', '_');

    var vdo_path = 'public/videos/'+vdo_name;

    var size = 0;

    video.on('info', function(info) {
        console.log('Download started');


        size = info.size;

        video.pipe(fs.createWriteStream(vdo_path));

    });

    video.on('end', function(){
      console.log("Video Saved Successfully")
      var file = vdo_path;
      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      res.send({'video': vdo_path.replace('public/', '')});

    });

    var pos = 0;
    var last_pos = '';

    video.on('data', function(data) {
        pos += data.length;
        if (size) {

            var percent = Math.floor(pos / size * 100);
            console.log(percent)


        }
    });


}

exports.download = function(req, res)
{
  // res.setHeader("Content-type", "video/mp4");
  // res.setHeader("Content-disposition", "attachment; filename=bilashcse.mp4");

  var filename = 'public/'+req.query.uri;
  var fs = require('fs');
  fs.readFile(filename, function (err, data){
    if (err) return console.log(err);

    console.log(data)
    res.writeHead(206,{
      "Content-type" : "video/mp4",
      "Content-length" : data.length,
      "Content-disposition" : "attachment; filename="+req.query.filename+".mp4"
    })
    // return data;
    res.send(data)
  });



}

