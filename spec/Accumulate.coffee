describe 'Accumulate component', ->
  c = null
  cin = null
  reset = null
  emitreset = null
  cout = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Accumulate', (err, instance) ->
      return done err if err
      c = instance
      cin = noflo.internalSocket.createSocket()
      reset = noflo.internalSocket.createSocket()
      emitreset = noflo.internalSocket.createSocket()
      c.inPorts.in.attach cin
      c.inPorts.reset.attach reset
      c.inPorts.emitreset.attach emitreset
      done()
  beforeEach (done) ->
    cout = noflo.internalSocket.createSocket()
    c.outPorts.out.attach cout
    c.start done
  afterEach (done) ->
    c.outPorts.out.detach cout
    cout = null
    c.shutdown done

  describe 'when instantiated', ->
    it 'should accumulate number', (done) ->
      cout.once 'data', (res) ->
        chai.expect(res).to.equal 2
        cout.once 'data', (res) ->
          chai.expect(res).to.equal 7
          cout.once 'data', (res) ->
            chai.expect(res).to.equal 10
            done()
      cin.send 2
      cin.send 5
      cin.send 3
      cin.disconnect()
    it 'should emit 0 when emitreset is set', (done) ->
      emitreset.send true
      emitreset.disconnect()

      cout.once 'data', (res) ->
        chai.expect(res).to.equal 4
        cout.once 'data', (res) ->
          chai.expect(res).to.equal 6
          cout.once 'data', (res) ->
            chai.expect(res).to.equal 0
            done()
      cin.send 4
      cin.send 2
      reset.send true
