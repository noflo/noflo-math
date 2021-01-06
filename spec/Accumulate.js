/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Accumulate component', function() {
  let c = null;
  let cin = null;
  let reset = null;
  let emitreset = null;
  let cout = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Accumulate', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      cin = noflo.internalSocket.createSocket();
      reset = noflo.internalSocket.createSocket();
      emitreset = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(cin);
      c.inPorts.reset.attach(reset);
      c.inPorts.emitreset.attach(emitreset);
      return done();
    });
  });
  beforeEach(function() {
    cout = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(cout);
    return c.start();
  });
  afterEach(function() {
    c.outPorts.out.detach(cout);
    cout = null;
    return c.shutdown();
  });

  return describe('when instantiated', function() {
    it('should accumulate number', function(done) {
      cout.once('data', function(res) {
        chai.expect(res).to.equal(2);
        return cout.once('data', function(res) {
          chai.expect(res).to.equal(7);
          return cout.once('data', function(res) {
            chai.expect(res).to.equal(10);
            return done();
          });
        });
      });
      cin.send(2);
      cin.send(5);
      cin.send(3);
      return cin.disconnect();
    });
    return it('should emit 0 when emitreset is set', function(done) {
      emitreset.send(true);
      emitreset.disconnect();

      cout.once('data', function(res) {
        chai.expect(res).to.equal(4);
        return cout.once('data', function(res) {
          chai.expect(res).to.equal(6);
          return cout.once('data', function(res) {
            chai.expect(res).to.equal(0);
            return done();
          });
        });
      });
      cin.send(4);
      cin.send(2);
      return reset.send(true);
    });
  });
});
