var mongoose = require('mongoose')
  , fs = require('fs')
  , http = require('http')
  , request = require('request')
  , _ = require("underscore");

    var youtubedl = require('youtube-dl');
    var md5 = require('md5');
    var path = require('path');
    var mime = require('mime');
    var ffmpeg = require('fluent-ffmpeg');
    var probe = require('node-ffprobe');
    //var fs = require('fs');

exports.grabeYoutube = function(req,res){


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

            var video = youtubedl(uri, [], { cwd: __dirname });

            var d= new Date();
            var vdo_name = '';
            vdo_name += md5(d.getTime() + info._filename)+'.mp4';
            vdo_name = vdo_name.replace(' ', '_');

            var vdo_path = 'public/videos/'+vdo_name;

            var size = 0;

            video.on('info', function(info) {
                size = info.size;
                video.pipe(fs.createWriteStream(vdo_path));
            });

            video.on('end', function(){


                    probe(vdo_path, function(err, probeData) 
                    {

                        var proc = new ffmpeg(vdo_path);

                        proc.screenshots({
                            timestamps: ['50%'],
                            folder: 'public/img/'+vdo_name,
                            size: '392x220'
                        }).on('end', function() {
                            if(info.thumbnail)
                            {
                                console.log('Screenshots taken - 1');
                                var file = vdo_path;
                                var filename = path.basename(file);
                                var mimetype = mime.lookup(file);
                                res.send({'video': vdo_path.replace('public/', ''), info: info, thumb :info.thumbnail});
                            }
                            else{
                                console.log('Screenshots taken - 2');
                                var file = vdo_path;
                                var filename = path.basename(file);
                                var mimetype = mime.lookup(file);
                                res.send({'video': vdo_path.replace('public/', ''), info: info, thumb : 'img/'+vdo_name+'/tn.png'});
                            }

                            
                        });

                    });

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
                    
         
            });
}


exports.download = function(req, res)
{
    var filename = 'public/'+req.query.uri;

    fs.readFile(filename, function (err, data){
      if (err) return console.log(err);

      //console.log(data)
      res.writeHead(206,{
        "Content-type" : "video/mp4",
        "Content-length" : data.length,
        "Content-disposition" : "attachment; filename="+req.query.filename+".mp4"
      })
      // return data;
      res.send(data)
    });



}
