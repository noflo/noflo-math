describe 'Compare component', ->
  c = null
  value = null
  comparison = null
  operator = null
  pass = null
  fail = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Compare', (err, instance) ->
      return done err if err
      c = instance
      value = noflo.internalSocket.createSocket()
      c.inPorts.value.attach value
      comparison = noflo.internalSocket.createSocket()
      c.inPorts.comparison.attach comparison
      operator = noflo.internalSocket.createSocket()
      c.inPorts.operator.attach operator
      done()
    return
  beforeEach ->
    pass = noflo.internalSocket.createSocket()
    c.outPorts.pass.attach pass
    fail = noflo.internalSocket.createSocket()
    c.outPorts.fail.attach fail
  afterEach ->
    c.outPorts.pass.detach pass
    pass = null
    c.outPorts.fail.detach fail
    fail = null

  describe 'With default equals operator', ->
    it 'should pass equal numbers', (done) ->
      pass.on 'data', (data) ->
        chai.expect(data).to.equal 42
        done()
      fail.on 'data', (data) ->
        done new Error "Comparison failed with #{data}"
      value.send 42
      comparison.send 42
    it 'should fail unequal numbers', (done) ->
      pass.on 'data', (data) ->
        done new Error "Comparison passed with #{data}"
      fail.on 'data', (data) ->
        chai.expect(data).to.equal 42
        done()
      value.send 42
      comparison.send 41
  describe 'With "lt" operator', ->
    it 'should pass smaller number', (done) ->
      pass.on 'data', (data) ->
        chai.expect(data).to.equal 42
        done()
      fail.on 'data', (data) ->
        done new Error "Comparison failed with #{data}"
      operator.send 'lt'
      value.send 42
      comparison.send 43
    it 'should fail equal number', (done) ->
      pass.on 'data', (data) ->
        done new Error "Comparison passed with #{data}"
      fail.on 'data', (data) ->
        chai.expect(data).to.equal 42
        done()
      operator.send 'lt'
      value.send 42
      comparison.send 42
