describe('CountSum component', () => {
  let c = null;
  let first = null;
  let second = null;
  let sum = null;
  let loader = null;
  before(() => {
    loader = new noflo.ComponentLoader(baseDir);
  });
  beforeEach(function () {
    this.timeout(4000);
    return loader.load('math/CountSum')
      .then((instance) => {
        c = instance;
        first = noflo.internalSocket.createSocket();
        second = noflo.internalSocket.createSocket();
        c.inPorts.in.attach(first);
        sum = noflo.internalSocket.createSocket();
        c.outPorts.out.attach(sum);
      });
  });
  afterEach(() => {
    c.outPorts.out.detach(sum);
    sum = null;
    return c.shutdown();
  });

  describe('with a single connected port', () => it('should forward the same number', (done) => {
    const expects = [5, 1];
    const sends = [5, 1];

    sum.on('data', (data) => {
      chai.expect(data).to.equal(expects.shift());
      if (!expects.length) {
        done();
      }
    });

    sends.forEach((first.send));
    first.disconnect();
  }));

  describe('with two connected ports', () => it('should sum the inputs together', (done) => {
    c.inPorts.in.attach(second);
    const expects = [1, 3, 5, 7];
    const sendsOne = [1, 3];
    const sendsTwo = [2, 4];

    sum.on('data', (data) => chai.expect(data).to.equal(expects.shift()));
    sum.on('disconnect', () => done());

    first.send(sendsOne.shift());
    second.send(sendsTwo.shift());
    first.send(sendsOne.shift());
    second.send(sendsTwo.shift());
    first.disconnect();
    second.disconnect();
  }));
});
