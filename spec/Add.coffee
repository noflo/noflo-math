noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

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
    it 'should not hold values', ->
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
    it 'should calculate 2 + 5', (done) ->
      sum.once 'data', (res) ->
        chai.expect(res).to.equal 7
        done()
      augend.send 2
      addend.send 5
    it 'should not hold values after a clear', ->
      augend.send 4
      addend.send 2
      clear = noflo.internalSocket.createSocket()
      c.inPorts.clear.attach clear
      clear.send true
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
