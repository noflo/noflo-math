noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Multiply = require '../components/Multiply.coffee'
else
  Multiply = require 'noflo-math/components/Multiply.js'

describe 'Multiply component', ->
  c = null
  multiplicand = null
  multiplier = null
  product = null
  beforeEach ->
    c = Multiply.getComponent()
    multiplicand = noflo.internalSocket.createSocket()
    multiplier = noflo.internalSocket.createSocket()
    product = noflo.internalSocket.createSocket()
    c.inPorts.multiplicand.attach multiplicand
    c.inPorts.multiplier.attach multiplier
    c.outPorts.product.attach product

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
    it 'should calculate 2 + 5', (done) ->
      product.once 'data', (res) ->
        chai.expect(res).to.equal 10
        done()
      multiplicand.send 2
      multiplier.send 5
