const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    inPorts: {
      value: {
        datatype: 'number',
        required: true,
      },
      comparison: {
        datatype: 'number',
        required: true,
      },
      operator: {
        datatype: 'string',
        control: true,
        default: '==',
      },
    },
    outPorts: {
      pass: {
        datatype: 'number',
      },
      fail: {
        datatype: 'number',
      },
    },
  });

  c.description = 'Compare two numbers';
  c.icon = 'check';

  c.forwardBrackets = {
    value: ['pass'],
    comparison: ['pass'],
    operator: ['pass'],
  };
  return c.process((input, output) => {
    if (!input.hasData('value', 'comparison')) { return; }

    const value = input.getData('value');
    const comparison = input.getData('comparison');
    const operator = input.getData('operator') || '==';

    switch (operator) {
      case 'eq': case '==':
        if (value === comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case 'ne': case '!=':
        if (value !== comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case 'gt': case '>':
        if (value > comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case 'lt': case '<':
        if (value < comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case 'ge': case '>=':
        if (value >= comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      case 'le': case '<=':
        if (value <= comparison) {
          output.sendDone({ pass: value });
          return;
        }
        break;
      default: {
        // Unknown comparison is a fail
        output.sendDone({ fail: value });
        return;
      }
    }

    output.sendDone({ fail: value });
  });
};
