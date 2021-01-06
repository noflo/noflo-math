describe('Exponentiate component', () => {
  let c = null;
  let base = null;
  let exponent = null;
  let power = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Exponentiate')
      .then((instance) => {
        c = instance;
        base = noflo.internalSocket.createSocket();
        exponent = noflo.internalSocket.createSocket();
        c.inPorts.base.attach(base);
        c.inPorts.exponent.attach(exponent);
      });
  });
  beforeEach(() => {
    power = noflo.internalSocket.createSocket();
    c.outPorts.power.attach(power);
  });
  afterEach(() => {
    c.outPorts.power.attach(power);
    power = null;
  });

  describe('when instantiated', () => it('should calculate 2 to the power 5 = 32', (done) => {
    power.once('data', (res) => {
      chai.expect(res).to.equal(32);
      done();
    });
    base.send(2);
    exponent.send(5);
  }));
});
