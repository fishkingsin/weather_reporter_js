var util = require('util'),
bleno = require('bleno'),
BlenoPrimaryService = bleno.PrimaryService,
WeatherReporterCharacteristic = require('./weather_reporter_characteristic');
LongWeatherReporterCharacteristic = require('./long_weather_reporter_characteristic');
var Characteristic = bleno.Characteristic;
var ReadOnlyWeatherReportCharacteristic =function () {
	bleno.Characteristic.call(this, {
		uuid: '08590F7EDB05467E875772F6FAEB13D6',
		value: [0x01],
		properties: ['read'],
		descriptors: [
		new bleno.Descriptor({
			uuid: '2901',
			value: 'Read Only Report Weather Characteristic'
		})
		]
	});
	
}
util.inherits(ReadOnlyWeatherReportCharacteristic, Characteristic);
function WeatherReporterService(weatherReporter) {
	WeatherReporterService.super_.call(this, {
		uuid: 'E20A39F473F54BC4A12F17D1AD07A961',
		characteristics: [
		new WeatherReporterCharacteristic(weatherReporter),
		new LongWeatherReporterCharacteristic(weatherReporter),
		new ReadOnlyWeatherReportCharacteristic(),
		]
	});
}

util.inherits(WeatherReporterService, BlenoPrimaryService);

module.exports = WeatherReporterService;
