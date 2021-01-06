/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const noflo = require('noflo');

exports.getComponent = function() {
  const c = new noflo.Component({
    description: 'Sum numbers coming from multiple inputs together',
    inPorts: {
      in: {
        datatype: 'number',
        addressable: true
      }
    },
    outPorts: {
      out: {
        datatype: 'number'
      }
    }
  });

  c.forwardBrackets = {};
  return c.process(function(input, output, id) {
    const indexesWithStream = input.attached('in').filter(idx => input.hasStream(['in', idx]));
    if (!indexesWithStream.length) { return; }

    const connection = ['in', indexesWithStream[0]];
    const stream = input.getStream(connection).filter(ip => ip.type === 'data');

    let sum = 0;
    let previous = 0;
    for (let packet of Array.from(stream)) {
      sum += packet.data;

      // if the data is from the same port as the previous packet
      // send out just this packets data
      if (packet.index === previous.index) {
        output.send({out: packet.data});
        sum = 0;

      // if they are from different ones, send out
      // then store this data for next iteration
      } else {
        output.send({out: sum});
        sum = packet.data;
      }

      previous = packet;
    }

    return output.done();
  });
};
