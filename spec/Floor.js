describe('Floor component', () => {
  let c = null;
  let vin = null;
  let vout = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Floor')
      .then((instance) => {
        c = instance;
        vin = noflo.internalSocket.createSocket();
        c.inPorts.in.attach(vin);
      });
  });
  beforeEach(() => {
    vout = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(vout);
  });
  afterEach(() => {
    c.outPorts.out.detach(vout);
    vout = null;
  });

  describe('when instantiated', () => {
    it('should calculate 5.4 = 5', (done) => {
      vout.once('data', (res) => {
        chai.expect(res).to.equal(5);
        done();
      });
      vin.send(5.4);
    });
    it('should calculate 2.9 = 2', (done) => {
      vout.once('data', (res) => {
        chai.expect(res).to.equal(2);
        done();
      });
      vin.send(2.9);
    });
  });
});
