var util = require('util');
var events = require('events');

var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');


var FeedParser = require('feedparser')
  , request = require('request');

var req = request('http://api.openweathermap.org/data/2.5/weather?q=HongKong&mode=xml')
  , feedparser = new FeedParser();
request('http://api.openweathermap.org/data/2.5/weather?q=HongKong&mode=xml', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Show the HTML for the Google homepage.
      // console.log(body('current'));
      var xml2js = require('xml2js');
      xml2js.parseString(body, function (err, result) {
        var current = result['current'];
        console.dir(current);
        var temperature = current['temperature'];
        console.dir(temperature);
        var value = temperature['value'];
        console.dir(value);
      });
	  }
	})
req.on('error', function (error) {
  // handle any request errors
  console.log(error);
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
  console.log(error);
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {
    console.log(item);
  }
});


function WeatherReporter() {
  events.EventEmitter.call(this);
  
}

util.inherits(WeatherReporter, events.EventEmitter);

WeatherReporter.prototype.report = function(temperature) {
  var time = 1;
  var self = this;
  var url = 'http://translate.google.com/translate_tts?tl=en&q=' + temperature + " degree";
  request(url).pipe(new Lame.Decoder).pipe(new Speaker);

  setTimeout(function() {
    var result = temperature;
    self.emit('report', result);
  }, time);
};


WeatherReporter.prototype.longreport = function(long_description) {
  var time = 1;
  var self = this;
  var url = 'http://translate.google.com/translate_tts?tl=en&q=' + long_description;
  request(url).pipe(new Lame.Decoder).pipe(new Speaker);

  setTimeout(function() {
    var result = temperature;
    self.emit('longreport', result);
  }, time);
};


module.exports.WeatherReporter = WeatherReporter;