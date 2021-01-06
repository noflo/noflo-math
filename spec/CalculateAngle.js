/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('CalculateAngle component', function() {
  let c = null;
  let origin = null;
  let destination = null;
  let angle = null;
  let loader = null;
  before(function(done) {
    loader = new noflo.ComponentLoader(baseDir);
    return done();
  });
  beforeEach(function(done) {
    this.timeout(4000);
    loader.load('math/CalculateAngle', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      origin = noflo.internalSocket.createSocket();
      destination = noflo.internalSocket.createSocket();
      c.inPorts.origin.attach(origin);
      c.inPorts.destination.attach(destination);
      angle = noflo.internalSocket.createSocket();
      c.outPorts.angle.attach(angle);
      return done();
    });
  });
  afterEach(function() {
    c.outPorts.angle.detach(angle);
    return angle = null;
  });

  return describe('on calculating', function() {
    it('should return correct angle (135)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(135);
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
    });
    it('should return correct angle (315)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(315);
        return done();
      });
      origin.send({
        x: 0,
        y: 0
      });
      return destination.send({
        x: -1,
        y: -1
      });
    });
    it('should return correct angle (180)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(180);
        return done();
      });
      origin.send({
        x: 0,
        y: 0
      });
      return destination.send({
        x: 0,
        y: 1
      });
    });
    it('should return correct angle (270)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(270);
        return done();
      });
      origin.send({
        x: 0,
        y: 0
      });
      return destination.send({
        x: -1,
        y: 0
      });
    });
    it('should return correct angle (0)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(0);
        return done();
      });
      origin.send({
        x: 0,
        y: 0
      });
      return destination.send({
        x: 0,
        y: -1
      });
    });
    it('should return correct angle (45)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(45);
        return done();
      });
      origin.send({
        x: 1,
        y: 2
      });
      return destination.send({
        x: 2,
        y: 1
      });
    });
    return it('should return correct angle (270)', function(done) {
      angle.on('data', function(data) {
        chai.expect(data).to.equal(270);
        return done();
      });
      origin.send({
        x: 1,
        y: 2
      });
      return destination.send({
        x: 0,
        y: 2
      });
    });
  });
});
