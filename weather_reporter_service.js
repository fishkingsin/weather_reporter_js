var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  WeatherReporterCharacteristic = require('./weather_reporter_characteristic');

function WeatherReporterService(weatherReporter) {
  WeatherReporterService.super_.call(this, {
      uuid: '23333333333333333333333333330007',
      characteristics: [
          new WeatherReporterCharacteristic(weatherReporter)
      ]
  });
}

util.inherits(WeatherReporterService, BlenoPrimaryService);

module.exports = WeatherReporterService;
