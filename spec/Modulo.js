describe('Modulo component', () => {
  let c = null;
  let dividend = null;
  let divisor = null;
  let remainder = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Modulo')
      .then((instance) => {
        c = instance;
        dividend = noflo.internalSocket.createSocket();
        divisor = noflo.internalSocket.createSocket();
        c.inPorts.dividend.attach(dividend);
        c.inPorts.divisor.attach(divisor);
      });
  });
  beforeEach(() => {
    remainder = noflo.internalSocket.createSocket();
    c.outPorts.remainder.attach(remainder);
  });
  afterEach(() => {
    c.outPorts.remainder.detach(remainder);
    remainder = null;
  });

  describe('when instantiated', () => {
    it('should calculate 5 / 2 = 1', (done) => {
      remainder.once('data', (res) => {
        chai.expect(res).to.equal(1);
        done();
      });
      dividend.send(5);
      divisor.send(2);
    });
    it('should calculate 10 / 2 = 0', (done) => {
      remainder.once('data', (res) => {
        chai.expect(res).to.equal(0);
        done();
      });
      dividend.send(10);
      divisor.send(2);
    });
  });
});
