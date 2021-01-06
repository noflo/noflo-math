describe('Divide component', () => {
  let c = null;
  let dividend = null;
  let divisor = null;
  let quotient = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Divide')
      .then((instance) => {
        c = instance;
        dividend = noflo.internalSocket.createSocket();
        divisor = noflo.internalSocket.createSocket();
        c.inPorts.dividend.attach(dividend);
        c.inPorts.divisor.attach(divisor);
      });
  });
  beforeEach(() => {
    quotient = noflo.internalSocket.createSocket();
    c.outPorts.quotient.attach(quotient);
  });
  afterEach(() => {
    c.outPorts.quotient.detach(quotient);
    quotient = null;
  });

  describe('when instantiated', () => it('should calculate 5 / 2', (done) => {
    quotient.once('data', (res) => {
      chai.expect(res).to.equal(2.5);
      done();
    });
    dividend.send(5);
    divisor.send(2);
  }));
});
