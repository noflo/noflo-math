noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

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
  beforeEach ->
    power = noflo.internalSocket.createSocket()
    c.outPorts.power.attach power
  afterEach ->
    c.outPorts.power.attach power
    power = null

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
    it 'should calculate 2 to the power 5 = 32', (done) ->
      power.once 'data', (res) ->
        chai.expect(res).to.equal 32
        done()
      base.send 2
      exponent.send 5
