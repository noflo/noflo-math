noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Divide = require '../components/Modulo.coffee'
else
  Divide = require 'noflo-math/components/Modulo.js'

describe 'Modulo component', ->
  c = null
  dividend = null
  divisor = null
  remainder = null
  beforeEach ->
    c = Divide.getComponent()
    dividend = noflo.internalSocket.createSocket()
    divisor = noflo.internalSocket.createSocket()
    remainder = noflo.internalSocket.createSocket()
    c.inPorts.dividend.attach dividend
    c.inPorts.divisor.attach divisor
    c.outPorts.remainder.attach remainder

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
    it 'should calculate 5 / 2', (done) ->
      remainder.once 'data', (res) ->
        chai.expect(res).to.equal 1
        done()
      dividend.send 5
      divisor.send 2
