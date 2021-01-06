describe('Accumulate component', () => {
  let c = null;
  let cin = null;
  let reset = null;
  let emitreset = null;
  let cout = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Accumulate')
      .then((instance) => {
        c = instance;
        cin = noflo.internalSocket.createSocket();
        reset = noflo.internalSocket.createSocket();
        emitreset = noflo.internalSocket.createSocket();
        c.inPorts.in.attach(cin);
        c.inPorts.reset.attach(reset);
        c.inPorts.emitreset.attach(emitreset);
      });
  });
  beforeEach(() => {
    cout = noflo.internalSocket.createSocket();
    c.outPorts.out.attach(cout);
    return c.start();
  });
  afterEach(() => {
    c.outPorts.out.detach(cout);
    cout = null;
    return c.shutdown();
  });

  describe('when instantiated', () => {
    it('should accumulate number', (done) => {
      cout.once('data', (res) => {
        chai.expect(res).to.equal(2);
        cout.once('data', (res2) => {
          chai.expect(res2).to.equal(7);
          cout.once('data', (res3) => {
            chai.expect(res3).to.equal(10);
            done();
          });
        });
      });
      cin.send(2);
      cin.send(5);
      cin.send(3);
      cin.disconnect();
    });
    it('should emit 0 when emitreset is set', (done) => {
      emitreset.send(true);
      emitreset.disconnect();

      cout.once('data', (res) => {
        chai.expect(res).to.equal(4);
        cout.once('data', (res2) => {
          chai.expect(res2).to.equal(6);
          cout.once('data', (res3) => {
            chai.expect(res3).to.equal(0);
            done();
          });
        });
      });
      cin.send(4);
      cin.send(2);
      reset.send(true);
    });
  });
});
