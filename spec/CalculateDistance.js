/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('CalculateDistance component', function() {
  let c = null;
  let origin = null;
  let destination = null;
  let distance = null;
  let loader = null;
  before(function(done) {
    loader = new noflo.ComponentLoader(baseDir);
    return done();
  });
  beforeEach(function(done) {
    this.timeout(4000);
    loader.load('math/CalculateDistance', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      origin = noflo.internalSocket.createSocket();
      destination = noflo.internalSocket.createSocket();
      distance = noflo.internalSocket.createSocket();
      c.inPorts.origin.attach(origin);
      c.inPorts.destination.attach(destination);
      c.outPorts.distance.attach(distance);
      return done();
    });
  });

  return describe('on calculating', () => it('should return correct distance', function(done) {
    distance.on('data', function(data) {
      chai.expect(data.toPrecision(2)).to.equal('1.4');
      return done();
    });
    origin.send({
      x: 0,
      y: 0
    });
    return destination.send({
      x: 1,
      y: 1
    });
  }));
});
