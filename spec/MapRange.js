/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('MapRange component', function() {
  let c = null;
  let input = null;
  let in_lower = null;
  let in_upper = null;
  let out_lower = null;
  let out_upper = null;
  let result = null;
  let loader = null;
  before(() => loader = new noflo.ComponentLoader(baseDir));
  beforeEach(function(done) {
    this.timeout(4000);
    loader.load('math/MapRange', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      input = noflo.internalSocket.createSocket();
      in_lower = noflo.internalSocket.createSocket();
      in_upper = noflo.internalSocket.createSocket();
      out_lower = noflo.internalSocket.createSocket();
      out_upper = noflo.internalSocket.createSocket();
      result = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(input);
      c.inPorts.in_lower.attach(in_lower);
      c.inPorts.in_upper.attach(in_upper);
      c.inPorts.out_lower.attach(out_lower);
      c.inPorts.out_upper.attach(out_upper);
      c.outPorts.out.attach(result);
      return done();
    });
  });

  return describe('when instantiated', function() {

    it('should map number between lower and upper', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.equal(50);
        return done();
      });
      in_lower.send(0);
      in_upper.send(10);
      out_lower.send(0);
      out_upper.send(100);
      return input.send(5);
    });

    it('should map number between lower and upper (with offset)', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.equal(60);
        return done();
      });
      in_lower.send(5);
      in_upper.send(10);
      out_lower.send(50);
      out_upper.send(100);
      return input.send(6);
    });

    return it('should generate handle mixed lower and upper', function(done) {
      result.once('data', function(res) {
        chai.expect(res).to.equal(50);
        return done();
      });
      in_lower.send(10);
      in_upper.send(0);
      out_lower.send(100);
      out_upper.send(0);
      return input.send(5);
    });
  });
});


