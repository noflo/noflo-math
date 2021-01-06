/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    inPorts: {
      value: {
        datatype: 'number',
        required: true
      },
      comparison: {
        datatype: 'number',
        required: true
      },
      operator: {
        datatype: 'string',
        control: true,
        default: '=='
      }
    },
    outPorts: {
      pass: {
        datatype: 'number'
      },
      fail: {
        datatype: 'number'
      }
    }
  });

  c.description = 'Compare two numbers';
  c.icon = 'check';

  c.forwardBrackets = {
    value: ['pass'],
    comparison: ['pass'],
    operator: ['pass']
  };
  return c.process(function(input, output) {
    if (!input.hasData('value', 'comparison')) { return; }

    const value = input.getData('value');
    const comparison = input.getData('comparison');
    const operator = input.getData('operator') || '==';

    switch (operator) {
      case 'eq': case '==':
        if (value === comparison) { return output.sendDone({pass: value}); }
        break;
      case 'ne': case '!=':
        if (value !== comparison) { return output.sendDone({pass: value}); }
        break;
      case 'gt': case '>':
        if (value > comparison) { return output.sendDone({pass: value}); }
        break;
      case 'lt': case '<':
        if (value < comparison) { return output.sendDone({pass: value}); }
        break;
      case 'ge': case '>=':
        if (value >= comparison) { return output.sendDone({pass: value}); }
        break;
      case 'le': case '<=':
        if (value <= comparison) { return output.sendDone({pass: value}); }
        break;
    }

    return output.sendDone({fail: value});
  });
};
