var util = require('util');
var events = require('events');

var request = require('request');
var Lame = require('lame');
var Speaker = require('speaker');


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


module.exports.WeatherReporter = WeatherReporter;