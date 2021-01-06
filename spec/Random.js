describe('Random component', () => {
  let c = null;
  let bang = null;
  let result = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Random')
      .then((instance) => {
        c = instance;
        bang = noflo.internalSocket.createSocket();
        c.inPorts.in.attach(bang);
      });
  });
  beforeEach(() => {
    result = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(result);
  });
  afterEach(() => {
    c.outPorts.out.attach(result);
    result = null;
  });

  describe('when instantiated', () => it('should generate number between 0 and 1', (done) => {
    result.once('data', (res) => {
      chai.expect(res).to.be.within(0, 1);
      done();
    });
    bang.send(null);
  }));
});
