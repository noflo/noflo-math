describe 'Exponentiate component', ->
  c = null
  base = null
  exponent = null
  power = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Exponentiate', (err, instance) ->
      return done err if err
      c = instance
      base = noflo.internalSocket.createSocket()
      exponent = noflo.internalSocket.createSocket()
      c.inPorts.base.attach base
      c.inPorts.exponent.attach exponent
      done()
    return
  beforeEach ->
    power = noflo.internalSocket.createSocket()
    c.outPorts.power.attach power
  afterEach ->
    c.outPorts.power.attach power
    power = null

  describe 'when instantiated', ->
    it 'should calculate 2 to the power 5 = 32', (done) ->
      power.once 'data', (res) ->
        chai.expect(res).to.equal 32
        done()
      base.send 2
      exponent.send 5
