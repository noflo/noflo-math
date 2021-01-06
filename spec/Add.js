describe('Add component', () => {
  let c = null;
  let augend = null;
  let addend = null;
  let sum = null;
  before(function () {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('math/Add')
      .then((instance) => {
        c = instance;
        augend = noflo.internalSocket.createSocket();
        addend = noflo.internalSocket.createSocket();
        c.inPorts.augend.attach(augend);
        c.inPorts.addend.attach(addend);
      });
  });
  beforeEach(() => {
    sum = noflo.internalSocket.createSocket();
    c.outPorts.sum.attach(sum);
  });
  afterEach(() => {
    c.outPorts.sum.detach(sum);
    sum = null;
  });

  describe('when instantiated', () => it('should calculate 2 + 5', (done) => {
    sum.once('data', (res) => {
      chai.expect(res).to.equal(7);
      done();
    });
    augend.send(2);
    addend.send(5);
  }));
});
