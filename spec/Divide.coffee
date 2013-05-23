noflo = require 'noflo'
if typeof process is 'object' and process.title is 'node'
  chai = require 'chai' unless chai
  Divide = require '../components/Divide.coffee'
else
  Divide = require 'noflo-math/components/Divide.js'

describe 'Divide component', ->
  c = null
  dividend = null
  divisor = null
  quotient = null
  beforeEach ->
    c = Divide.getComponent()
    dividend = noflo.internalSocket.createSocket()
    divisor = noflo.internalSocket.createSocket()
    quotient = noflo.internalSocket.createSocket()
    c.inPorts.dividend.attach dividend
    c.inPorts.divisor.attach divisor
    c.outPorts.quotient.attach quotient

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.dividend).to.be.a 'null'
      chai.expect(c.divisor).to.be.a 'null'
    it 'should calculate 2 + 5', (done) ->
      quotient.once 'data', (res) ->
        chai.expect(res).to.equal 2.5
        done()
      dividend.send 5
      divisor.send 2
