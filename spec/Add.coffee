describe 'Add component', ->
  c = null
  augend = null
  addend = null
  sum = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Add', (err, instance) ->
      return done err if err
      c = instance
      augend = noflo.internalSocket.createSocket()
      addend = noflo.internalSocket.createSocket()
      c.inPorts.augend.attach augend
      c.inPorts.addend.attach addend
      done()
  beforeEach ->
    sum = noflo.internalSocket.createSocket()
    c.outPorts.sum.attach sum
  afterEach ->
    c.outPorts.sum.detach sum
    sum = null

  describe 'when instantiated', ->
    it 'should calculate 2 + 5', (done) ->
      sum.once 'data', (res) ->
        chai.expect(res).to.equal 7
        done()
      augend.send 2
      addend.send 5
