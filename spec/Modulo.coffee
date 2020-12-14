describe 'Modulo component', ->
  c = null
  dividend = null
  divisor = null
  remainder = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Modulo', (err, instance) ->
      return done err if err
      c = instance
      dividend = noflo.internalSocket.createSocket()
      divisor = noflo.internalSocket.createSocket()
      c.inPorts.dividend.attach dividend
      c.inPorts.divisor.attach divisor
      done()
    return
  beforeEach ->
    remainder = noflo.internalSocket.createSocket()
    c.outPorts.remainder.attach remainder
  afterEach ->
    c.outPorts.remainder.detach remainder
    remainder = null

  describe 'when instantiated', ->
    it 'should calculate 5 / 2 = 1', (done) ->
      remainder.once 'data', (res) ->
        chai.expect(res).to.equal 1
        done()
      dividend.send 5
      divisor.send 2
    it 'should calculate 10 / 2 = 0', (done) ->
      remainder.once 'data', (res) ->
        chai.expect(res).to.equal 0
        done()
      dividend.send 10
      divisor.send 2
