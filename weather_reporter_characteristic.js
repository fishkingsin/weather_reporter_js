var util = require('util');
var bleno = require('bleno');
var weatherReporter = require('./WeatherReporter');
function WeatherReportCharacteristic(weatherReporter) {
  bleno.Characteristic.call(this, {
    uuid: '23333333333333333333333333330001',
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

util.inherits(WeatherReportCharacteristic, bleno.Characteristic);

WeatherReportCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var temperature = data.readUInt8(0);
    var self = this;
    this.weatherReporter.once('report', function(result) {
      if (self.updateValueCallback) {
        var data = new Buffer(1);
        data.writeUInt8(result, 0);
        self.updateValueCallback(data);
      }
    });
    this.weatherReporter.report(temperature);
    callback(this.RESULT_SUCCESS);
  }
};

module.exports = WeatherReportCharacteristic;