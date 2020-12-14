describe 'Subtract component', ->
  c = null
  minuend = null
  subtrahend = null
  difference = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Subtract', (err, instance) ->
      return done err if err
      c = instance
      minuend = noflo.internalSocket.createSocket()
      subtrahend = noflo.internalSocket.createSocket()
      c.inPorts.minuend.attach minuend
      c.inPorts.subtrahend.attach subtrahend
      done()
    return
  beforeEach ->
    difference = noflo.internalSocket.createSocket()
    c.outPorts.difference.attach difference
  afterEach ->
    c.outPorts.difference.attach difference
    difference = null

  describe 'when instantiated', ->
    it 'should calculate 2 - 5', (done) ->
      difference.once 'data', (res) ->
        chai.expect(res).to.equal -3
        done()
      minuend.send 2
      subtrahend.send 5
