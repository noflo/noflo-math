describe('RangedRandomInt component', () => {
  let c = null;
  let bang = null;
  let lower = null;
  let upper = null;
  let result = null;
  let loader = null;
  before(() => {
    loader = new noflo.ComponentLoader(baseDir);
  });
  beforeEach(function () {
    this.timeout(4000);
    return loader.load('math/RangedRandomInt')
      .then((instance) => {
        c = instance;
        bang = noflo.internalSocket.createSocket();
        lower = noflo.internalSocket.createSocket();
        upper = noflo.internalSocket.createSocket();
        result = noflo.internalSocket.createSocket();
        c.inPorts.in.attach(bang);
        c.inPorts.lower.attach(lower);
        c.inPorts.upper.attach(upper);
        c.outPorts.out.attach(result);
      });
  });

  describe('when instantiated', () => {
    it('should generate number between lower and upper', (done) => {
      result.once('data', (res) => {
        chai.expect(res).to.be.within(1, 6);
        done();
      });
      lower.send(1);
      upper.send(6);
      bang.send(null);
    });

    it('should generate an integer number', (done) => {
      result.once('data', (res) => {
        chai.expect(res).to.equal(Math.floor(res));
        done();
      });
      lower.send(1);
      upper.send(6);
      bang.send(null);
    });

    it('should generate handle mixed lower and upper', (done) => {
      result.once('data', (res) => {
        chai.expect(res).to.be.within(1, 6);
        done();
      });
      lower.send(6);
      upper.send(1);
      bang.send(null);
    });
  });
});
