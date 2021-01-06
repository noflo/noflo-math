/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('RangedRandomInt component', function() {
  let c = null;
  let bang = null;
  let lower = null;
  let upper = null;
  let result = null;
  let loader = null;
  before(() => loader = new noflo.ComponentLoader(baseDir));
  beforeEach(function(done) {
    this.timeout(4000);
    loader.load('math/RangedRandomInt', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      bang = noflo.internalSocket.createSocket();
      lower = noflo.internalSocket.createSocket();
      upper = noflo.internalSocket.createSocket();
      result = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(bang);
      c.inPorts.lower.attach(lower);
      c.inPorts.upper.attach(upper);
      c.outPorts.out.attach(result);
      return done();
    });
  });

  return describe('when instantiated', function() {

    it('should generate number between lower and upper', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.be.within(1, 6);
        return done();
      });
      lower.send(1);
      upper.send(6);
      return bang.send(null);
    });

    it('should generate an integer number', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.equal(Math.floor(res));
        return done();
      });
      lower.send(1);
      upper.send(6);
      return bang.send(null);
    });

    return it('should generate handle mixed lower and upper', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.be.within(1, 6);
        return done();
      });
      lower.send(6);
      upper.send(1);
      return bang.send(null);
    });
  });
});


