noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Add = require '../components/Add.coffee'
else
  Add = require 'noflo-math/components/Add.js'

describe 'Add component', ->
  c = null
  augend = null
  addend = null
  sum = null
  beforeEach ->
    c = Add.getComponent()
    augend = noflo.internalSocket.createSocket()
    addend = noflo.internalSocket.createSocket()
    sum = noflo.internalSocket.createSocket()
    c.inPorts.augend.attach augend
    c.inPorts.addend.attach addend
    c.outPorts.sum.attach sum

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
