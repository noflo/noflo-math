/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component;
  c.icon = 'caret-up';
  c.inPorts.add('base', {
    datatype: 'number',
    required: true
  }
  );
  c.inPorts.add('exponent', {
    datatype: 'number',
    required: true,
    control: true
  }
  );
  c.outPorts.add('power',
    {datatype: 'number'});

  return c.process(function(input, output) {
    if (!input.hasData('base', 'exponent')) { return; }
    const [base, exponent] = Array.from(input.getData('base', 'exponent'));
    return output.sendDone({
      power: Math.pow(base, exponent)});
  });
};
