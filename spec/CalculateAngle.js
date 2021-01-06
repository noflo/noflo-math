describe('CalculateAngle component', () => {
  let c = null;
  let origin = null;
  let destination = null;
  let angle = null;
  let loader = null;
  before(() => {
    loader = new noflo.ComponentLoader(baseDir);
  });
  beforeEach(function () {
    this.timeout(4000);
    return loader.load('math/CalculateAngle')
      .then((instance) => {
        c = instance;
        origin = noflo.internalSocket.createSocket();
        destination = noflo.internalSocket.createSocket();
        c.inPorts.origin.attach(origin);
        c.inPorts.destination.attach(destination);
        angle = noflo.internalSocket.createSocket();
        c.outPorts.angle.attach(angle);
      });
  });
  afterEach(() => {
    c.outPorts.angle.detach(angle);
    angle = null;
  });

  describe('on calculating', () => {
    it('should return correct angle (135)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(135);
        done();
      });
      origin.send({
        x: 0,
        y: 0,
      });
      destination.send({
        x: 1,
        y: 1,
      });
    });
    it('should return correct angle (315)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(315);
        done();
      });
      origin.send({
        x: 0,
        y: 0,
      });
      destination.send({
        x: -1,
        y: -1,
      });
    });
    it('should return correct angle (180)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(180);
        done();
      });
      origin.send({
        x: 0,
        y: 0,
      });
      destination.send({
        x: 0,
        y: 1,
      });
    });
    it('should return correct angle (270)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(270);
        done();
      });
      origin.send({
        x: 0,
        y: 0,
      });
      destination.send({
        x: -1,
        y: 0,
      });
    });
    it('should return correct angle (0)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(0);
        done();
      });
      origin.send({
        x: 0,
        y: 0,
      });
      destination.send({
        x: 0,
        y: -1,
      });
    });
    it('should return correct angle (45)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(45);
        done();
      });
      origin.send({
        x: 1,
        y: 2,
      });
      destination.send({
        x: 2,
        y: 1,
      });
    });
    it('should return correct angle (270)', (done) => {
      angle.on('data', (data) => {
        chai.expect(data).to.equal(270);
        done();
      });
      origin.send({
        x: 1,
        y: 2,
      });
      destination.send({
        x: 0,
        y: 2,
      });
    });
  });
});
