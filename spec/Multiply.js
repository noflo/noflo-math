/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Multiply component', function() {
  let c = null;
  let multiplicand = null;
  let multiplier = null;
  let product = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Multiply', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      multiplicand = noflo.internalSocket.createSocket();
      multiplier = noflo.internalSocket.createSocket();
      c.inPorts.multiplicand.attach(multiplicand);
      c.inPorts.multiplier.attach(multiplier);
      return done();
    });
  });
  beforeEach(function() {
    product = noflo.internalSocket.createSocket();
    return c.outPorts.product.attach(product);
  });
  afterEach(function() {
    c.outPorts.product.attach(product);
    return product = null;
  });

  return describe('when instantiated', () => it('should calculate 2 * 5', function(done) {
    product.once('data', function(res) {
      chai.expect(res).to.equal(10);
      return done();
    });
    multiplicand.send(2);
    return multiplier.send(5);
  }));
});
