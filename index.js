// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// if data is null
app.get("/api",(req,res) => {
  res.json(
    {
      "unix": Date.now(),
      "utc": (new Date()).toUTCString()
    }
  )
});


app.get("/api/:date",(req,res)=>{
  let { date } = req.params;
  let dateObj;

  // 判断是否是时间戳
  if (/^\d+$/.test(date)){
    date = parseInt(date);

    if(date.toString().length === 13){
      dateObj = new Date(date);
    }

    if(date.toString().length === 10){
      dateObj = new Date(date * 1000);  
    }
  }else{
    // 非timestamp
    dateObj = new Date(date);
  }

  // check if the date is invalid
  if(isNaN(dateObj)){
    return res.status(400).json({
      error:"Invalid Date"
    });
  }

  return res.json({
    "unix":dateObj.getTime(),
    "utc":dateObj.toUTCString()
  })

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
