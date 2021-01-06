const noflo = require('noflo');

/* eslint-disable camelcase */

exports.getComponent = () => {
  const c = new noflo.Component({
    inPorts: {
      in: {
        datatype: 'number',
        required: true,
      },
      in_lower: {
        datatype: 'number',
        description: 'the lower bound of the input value',
        required: true,
        control: true,
      },
      in_upper: {
        datatype: 'number',
        description: 'the uppwer bound of the input value',
        required: true,
        control: true,
      },
      out_lower: {
        datatype: 'number',
        description: 'the lower bound of the output value',
        required: true,
        control: true,
      },
      out_upper: {
        datatype: 'number',
        description: 'the uppwer bound of the output value',
        required: true,
        control: true,
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
      },
    },
  });

  c.icon = 'reorder';
  c.description = 'Map a number from a source range to a target reange.';

  // On data flow.
  return c.process((input, output) => {
    if (!input.hasData('in', 'in_lower', 'in_upper', 'out_upper', 'out_lower')) { return; }

    const data = input.getData('in');
    const in_lower_data = input.getData('in_lower');
    const in_upper_data = input.getData('in_upper');
    const out_upper_data = input.getData('out_upper');
    const out_lower_data = input.getData('out_lower');

    const in_lower = Math.min(in_lower_data, in_upper_data);
    const in_upper = Math.max(in_lower_data, in_upper_data);
    const in_range = in_upper - in_lower;
    const out_lower = Math.min(out_lower_data, out_upper_data);
    const out_upper = Math.max(out_lower_data, out_upper_data);
    const out_range = out_upper - out_lower;
    const value = out_lower + (((data - in_lower) * out_range) / in_range);
    output.sendDone(value);
  });
};
