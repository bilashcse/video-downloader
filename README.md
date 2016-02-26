# Online video-downloader

Node.js & Angular.js based online video downloader. This application helps you to download videos from -




Used youtube-dl npm package :

## Getting video information :
```javascript
var youtubedl = require('youtube-dl');
var url = 'Video Link';

youtubedl.getInfo(url, function(err, info) {
  if (err) throw err;

  console.log('id:', info.id);
  console.log('title:', info.title);
  console.log('url:', info.url);
  console.log('thumbnail:', info.thumbnail);
  console.log('description:', info.description);
  console.log('filename:', info._filename);
  console.log('format id:', info.format_id);
});
```


## Downloading videos :
```javascript
  var filename = "Video URL Link";
  var fs = require('fs');
  fs.readFile(filename, function (err, data){
    if (err) return console.log(err);
    // Header setup for download
    res.writeHead(206,{
      "Content-type" : "video/mp4",
      "Content-length" : data.length,
      "Content-disposition" : "attachment; filename="+req.query.filename+".mp4"
    })

    res.send(data)
  });

```

## Setup header for download:
```javascript

    res.writeHead(206,{
      "Content-type" : "video/mp4",
      "Content-length" : data.length,
      "Content-disposition" : "attachment; filename="+req.query.filename+".mp4"
    });

```
# Copyright

Copyright (c) 2016 Nazmul Hossain

# License : The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


