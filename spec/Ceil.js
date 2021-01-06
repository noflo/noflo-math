describe('Ceil component', () => {
  let c = null;
  let vin = null;
  let vout = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Ceil')
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
    it('should calculate 5.1 = 6', (done) => {
      vout.once('data', (res) => {
        chai.expect(res).to.equal(6);
        done();
      });
      vin.send(5.1);
    });
    it('should calculate 2.9 = 3', (done) => {
      vout.once('data', (res) => {
        chai.expect(res).to.equal(3);
        done();
      });
      vin.send(2.9);
    });
  });
});
