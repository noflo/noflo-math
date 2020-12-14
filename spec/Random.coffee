describe 'Random component', ->
  c = null
  bang = null
  result = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Random', (err, instance) ->
      return done err if err
      c = instance
      bang = noflo.internalSocket.createSocket()
      c.inPorts.in.attach bang
      done()
    return
  beforeEach ->
    result = noflo.internalSocket.createSocket()
    c.outPorts.out.attach result
  afterEach ->
    c.outPorts.out.attach result
    result = null

  describe 'when instantiated', ->

    it 'should generate number between 0 and 1', (done) ->
      result.once 'data', (res) ->
        chai.expect(res).to.be.within(0, 1)
        done()
      bang.send null
