/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Subtract component', function() {
  let c = null;
  let minuend = null;
  let subtrahend = null;
  let difference = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Subtract', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      minuend = noflo.internalSocket.createSocket();
      subtrahend = noflo.internalSocket.createSocket();
      c.inPorts.minuend.attach(minuend);
      c.inPorts.subtrahend.attach(subtrahend);
      return done();
    });
  });
  beforeEach(function() {
    difference = noflo.internalSocket.createSocket();
    return c.outPorts.difference.attach(difference);
  });
  afterEach(function() {
    c.outPorts.difference.attach(difference);
    return difference = null;
  });

  return describe('when instantiated', () => it('should calculate 2 - 5', function(done) {
    difference.once('data', function(res) {
      chai.expect(res).to.equal(-3);
      return done();
    });
    minuend.send(2);
    return subtrahend.send(5);
  }));
});
