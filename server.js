var util = require('util');

var bleno = require('bleno');


var WeatherReporterService = require('./weather_reporter_service');
var WeatherReporter = require('./WeatherReporter');
var name = 'WeatherReporter';

var weatherReport = new WeatherReporter.WeatherReporter();
var weatherReporterService = new WeatherReporterService(weatherReport);



bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    
    bleno.startAdvertising(name, [weatherReporterService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    
    bleno.setServices([
      weatherReporterService
    ]);
  }
});
