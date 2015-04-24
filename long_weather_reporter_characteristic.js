var util = require('util');
var bleno = require('bleno');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var weatherReporter = require('./WeatherReporter');
function LognWeatherReportCharacteristic(weatherReporter) {
  bleno.Characteristic.call(this, {
    uuid: '08590F7EDB05467E875772F6FAEB13D5',
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Report Weather Characteristic'
      })
    ]
  });
  this.weatherReporter = weatherReporter;
}

util.inherits(LognWeatherReportCharacteristic, bleno.Characteristic);

LognWeatherReportCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 0) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var report = decoder.write(data);
    console.log(report);
    var self = this;
    this.weatherReporter.once('longreport', function(report) {
      if (self.updateValueCallback) {
        var data = new Buffer(1);
        data.writeUInt8(result, 0);
        self.updateValueCallback(data);
      }
    });
    this.weatherReporter.longreport(report);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = LognWeatherReportCharacteristic;