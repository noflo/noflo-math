const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component({
    description: 'Sum numbers coming from multiple inputs together',
    inPorts: {
      in: {
        datatype: 'number',
        addressable: true,
      },
    },
    outPorts: {
      out: {
        datatype: 'number',
      },
    },
  });

  c.forwardBrackets = {};
  return c.process((input, output) => {
    const indexesWithStream = input.attached('in').filter((idx) => input.hasStream(['in', idx]));
    if (!indexesWithStream.length) { return; }

    const connection = ['in', indexesWithStream[0]];
    const stream = input.getStream(connection).filter((ip) => ip.type === 'data');

    let sum = 0;
    let previous = 0;
    stream.forEach((packet) => {
      sum += packet.data;

      // if the data is from the same port as the previous packet
      // send out just this packets data
      if (packet.index === previous.index) {
        output.send({ out: packet.data });
        sum = 0;

      // if they are from different ones, send out
      // then store this data for next iteration
      } else {
        output.send({ out: sum });
        sum = packet.data;
      }

      previous = packet;
    });

    output.done();
  });
};
