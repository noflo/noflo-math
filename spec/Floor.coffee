describe 'Floor component', ->
  c = null
  vin = null
  vout = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Floor', (err, instance) ->
      return done err if err
      c = instance
      vin = noflo.internalSocket.createSocket()
      c.inPorts.in.attach vin
      done()
    return
  beforeEach ->
    vout = noflo.internalSocket.createSocket()
    c.outPorts.out.attach vout
  afterEach ->
    c.outPorts.out.detach vout
    vout = null

  describe 'when instantiated', ->
    it 'should calculate 5.4 = 5', (done) ->
      vout.once 'data', (res) ->
        chai.expect(res).to.equal 5
        done()
      vin.send 5.4
    it 'should calculate 2.9 = 2', (done) ->
      vout.once 'data', (res) ->
        chai.expect(res).to.equal 2
        done()
      vin.send 2.9
