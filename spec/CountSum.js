/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('CountSum component', function() {
  let c = null;
  let first = null;
  let second = null;
  let sum = null;
  let loader = null;
  before(() => loader = new noflo.ComponentLoader(baseDir));
  beforeEach(function(done) {
    this.timeout(4000);
    loader.load('math/CountSum', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      first = noflo.internalSocket.createSocket();
      second = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(first);
      sum = noflo.internalSocket.createSocket();
      c.outPorts.out.attach(sum);
      return done();
    });
  });
  afterEach(function() {
    c.outPorts.out.detach(sum);
    sum = null;
    return c.shutdown();
  });

  describe('with a single connected port', () => it('should forward the same number', function(done) {
    const expects = [5, 1];
    const sends = [5, 1];

    sum.on('data', function(data) {
      chai.expect(data).to.equal(expects.shift());
      if (!expects.length) { return done(); }
    });

    for (let data of Array.from(sends)) { first.send(data); }
    return first.disconnect();
  }));

  return describe('with two connected ports', () => it('should sum the inputs together', function(done) {
    c.inPorts.in.attach(second);
    const expects = [1, 3, 5, 7];
    const sendsOne = [1, 3];
    const sendsTwo = [2, 4];

    sum.on('data', data => chai.expect(data).to.equal(expects.shift()));
    sum.on('disconnect', () => done());

    first.send(sendsOne.shift());
    second.send(sendsTwo.shift());
    first.send(sendsOne.shift());
    second.send(sendsTwo.shift());
    first.disconnect();
    return second.disconnect();
  }));
});
