/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Ceil component', function() {
  let c = null;
  let vin = null;
  let vout = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Ceil', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      vin = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(vin);
      return done();
    });
  });
  beforeEach(function() {
    vout = noflo.internalSocket.createSocket();
    return c.outPorts.out.attach(vout);
  });
  afterEach(function() {
    c.outPorts.out.detach(vout);
    return vout = null;
  });

  return describe('when instantiated', function() {
    it('should calculate 5.1 = 6', function(done) {
      vout.once('data', function(res) {
        chai.expect(res).to.equal(6);
        return done();
      });
      return vin.send(5.1);
    });
    return it('should calculate 2.9 = 3', function(done) {
      vout.once('data', function(res) {
        chai.expect(res).to.equal(3);
        return done();
      });
      return vin.send(2.9);
    });
  });
});
