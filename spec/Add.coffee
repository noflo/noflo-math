noflo = require 'noflo'
if typeof process is 'object' and process.title is 'node'
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
      chai.expect(c.augend).to.be.a 'null'
      chai.expect(c.addend).to.be.a 'null'
    it 'should calculate 2 + 5', (done) ->
      sum.once 'data', (res) ->
        chai.expect(res).to.equal 7
        done()
      augend.send 2
      addend.send 5
