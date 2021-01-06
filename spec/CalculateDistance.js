describe('CalculateDistance component', () => {
  let c = null;
  let origin = null;
  let destination = null;
  let distance = null;
  let loader = null;
  before(() => {
    loader = new noflo.ComponentLoader(baseDir);
  });
  beforeEach(function () {
    this.timeout(4000);
    return loader.load('math/CalculateDistance')
      .then((instance) => {
        c = instance;
        origin = noflo.internalSocket.createSocket();
        destination = noflo.internalSocket.createSocket();
        distance = noflo.internalSocket.createSocket();
        c.inPorts.origin.attach(origin);
        c.inPorts.destination.attach(destination);
        c.outPorts.distance.attach(distance);
      });
  });

  describe('on calculating', () => it('should return correct distance', (done) => {
    distance.on('data', (data) => {
      chai.expect(data.toPrecision(2)).to.equal('1.4');
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
  }));
});
