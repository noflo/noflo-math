noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Exponentiate = require '../components/Exponentiate.coffee'
else
  Exponentiate = require 'noflo-math/components/Exponentiate.js'

describe 'Exponentiate component', ->
  c = null
  base = null
  exponent = null
  power = null
  beforeEach ->
    c = Exponentiate.getComponent()
    base = noflo.internalSocket.createSocket()
    exponent = noflo.internalSocket.createSocket()
    power = noflo.internalSocket.createSocket()
    c.inPorts.base.attach base
    c.inPorts.exponent.attach exponent
    c.outPorts.power.attach power

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