noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'Multiply component', ->
  c = null
  multiplicand = null
  multiplier = null
  product = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Multiply', (err, instance) ->
      return done err if err
      c = instance
      multiplicand = noflo.internalSocket.createSocket()
      multiplier = noflo.internalSocket.createSocket()
      c.inPorts.multiplicand.attach multiplicand
      c.inPorts.multiplier.attach multiplier
      done()
  beforeEach ->
    product = noflo.internalSocket.createSocket()
    c.outPorts.product.attach product
  afterEach ->
    c.outPorts.product.attach product
    product = null

  describe 'when instantiated', ->
    it 'should calculate 2 * 5', (done) ->
      product.once 'data', (res) ->
        chai.expect(res).to.equal 10
        done()
      multiplicand.send 2
      multiplier.send 5
