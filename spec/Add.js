/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Add component', function() {
  let c = null;
  let augend = null;
  let addend = null;
  let sum = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Add', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      augend = noflo.internalSocket.createSocket();
      addend = noflo.internalSocket.createSocket();
      c.inPorts.augend.attach(augend);
      c.inPorts.addend.attach(addend);
      return done();
    });
  });
  beforeEach(function() {
    sum = noflo.internalSocket.createSocket();
    return c.outPorts.sum.attach(sum);
  });
  afterEach(function() {
    c.outPorts.sum.detach(sum);
    return sum = null;
  });

  return describe('when instantiated', () => it('should calculate 2 + 5', function(done) {
    sum.once('data', function(res) {
      chai.expect(res).to.equal(7);
      return done();
    });
    augend.send(2);
    return addend.send(5);
  }));
});
