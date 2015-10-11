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
          console.log(info)
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
      //console.log(vdo_path.replace('public/', ''))

      var file = vdo_path;

      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      // res.setHeader('Content-type', mimetype);
      res.download(vdo_path.replace('public/', ''));

      // // var filestream = fs.createReadStream(file);
      // // filestream.pipe(res);
      // res.download(vdo_path,function(err){
      //     if(err)
      //     {
      //         console.log("Error in download");
      //     }
      //     else
      //     {
      //         console.log("Download Successful");
      res.send({'video': vdo_path.replace('public/', '')});
      //     }

      // });
      



    });

    var pos = 0;
    var last_pos = '';

    video.on('data', function(data) {
        pos += data.length;
        // `size` should not be 0 here.

        if (size) {

            var percent = Math.floor(pos / size * 100);
            console.log(percent)


        }
    });


}

