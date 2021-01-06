/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Random component', function() {
  let c = null;
  let bang = null;
  let result = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Random', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      bang = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(bang);
      return done();
    });
  });
  beforeEach(function() {
    result = noflo.internalSocket.createSocket();
    return c.outPorts.out.attach(result);
  });
  afterEach(function() {
    c.outPorts.out.attach(result);
    return result = null;
  });

  return describe('when instantiated', () => it('should generate number between 0 and 1', function(done) {
    result.once('data', function(res) {
      chai.expect(res).to.be.within(0, 1);
      return done();
    });
    return bang.send(null);
  }));
});
