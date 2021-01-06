describe('Multiply component', () => {
  let c = null;
  let multiplicand = null;
  let multiplier = null;
  let product = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Multiply')
      .then((instance) => {
        c = instance;
        multiplicand = noflo.internalSocket.createSocket();
        multiplier = noflo.internalSocket.createSocket();
        c.inPorts.multiplicand.attach(multiplicand);
        c.inPorts.multiplier.attach(multiplier);
      });
  });
  beforeEach(() => {
    product = noflo.internalSocket.createSocket();
    c.outPorts.product.attach(product);
  });
  afterEach(() => {
    c.outPorts.product.attach(product);
    product = null;
  });

  describe('when instantiated', () => it('should calculate 2 * 5', (done) => {
    product.once('data', (res) => {
      chai.expect(res).to.equal(10);
      done();
    });
    multiplicand.send(2);
    multiplier.send(5);
  }));
});
