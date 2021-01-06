describe('Subtract component', () => {
  let c = null;
  let minuend = null;
  let subtrahend = null;
  let difference = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Subtract')
      .then((instance) => {
        c = instance;
        minuend = noflo.internalSocket.createSocket();
        subtrahend = noflo.internalSocket.createSocket();
        c.inPorts.minuend.attach(minuend);
        c.inPorts.subtrahend.attach(subtrahend);
      });
  });
  beforeEach(() => {
    difference = noflo.internalSocket.createSocket();
    c.outPorts.difference.attach(difference);
  });
  afterEach(() => {
    c.outPorts.difference.attach(difference);
    difference = null;
  });

  describe('when instantiated', () => it('should calculate 2 - 5', (done) => {
    difference.once('data', (res) => {
      chai.expect(res).to.equal(-3);
      done();
    });
    minuend.send(2);
    subtrahend.send(5);
  }));
});
