/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Compare component', function() {
  let c = null;
  let value = null;
  let comparison = null;
  let operator = null;
  let pass = null;
  let fail = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Compare', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      value = noflo.internalSocket.createSocket();
      c.inPorts.value.attach(value);
      comparison = noflo.internalSocket.createSocket();
      c.inPorts.comparison.attach(comparison);
      operator = noflo.internalSocket.createSocket();
      c.inPorts.operator.attach(operator);
      return done();
    });
  });
  beforeEach(function() {
    pass = noflo.internalSocket.createSocket();
    c.outPorts.pass.attach(pass);
    fail = noflo.internalSocket.createSocket();
    return c.outPorts.fail.attach(fail);
  });
  afterEach(function() {
    c.outPorts.pass.detach(pass);
    pass = null;
    c.outPorts.fail.detach(fail);
    return fail = null;
  });

  describe('With default equals operator', function() {
    it('should pass equal numbers', function(done) {
      pass.on('data', function(data) {
        chai.expect(data).to.equal(42);
        return done();
      });
      fail.on('data', data => done(new Error(`Comparison failed with ${data}`)));
      value.send(42);
      return comparison.send(42);
    });
    return it('should fail unequal numbers', function(done) {
      pass.on('data', data => done(new Error(`Comparison passed with ${data}`)));
      fail.on('data', function(data) {
        chai.expect(data).to.equal(42);
        return done();
      });
      value.send(42);
      return comparison.send(41);
    });
  });
  return describe('With "lt" operator', function() {
    it('should pass smaller number', function(done) {
      pass.on('data', function(data) {
        chai.expect(data).to.equal(42);
        return done();
      });
      fail.on('data', data => done(new Error(`Comparison failed with ${data}`)));
      operator.send('lt');
      value.send(42);
      return comparison.send(43);
    });
    return it('should fail equal number', function(done) {
      pass.on('data', data => done(new Error(`Comparison passed with ${data}`)));
      fail.on('data', function(data) {
        chai.expect(data).to.equal(42);
        return done();
      });
      operator.send('lt');
      value.send(42);
      return comparison.send(42);
    });
  });
});
