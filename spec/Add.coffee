noflo = require 'noflo'
if typeof process is 'object' and process.title is 'node'
  chai = require 'chai' unless chai
  Add = require '../components/Add.coffee'
else
  Add = require 'noflo-math/components/Add.js'

describe 'Add component', ->
  c = null
  a = null
  b = null
  result = null
  beforeEach ->
    c = Add.getComponent()
    a = noflo.internalSocket.createSocket()
    b = noflo.internalSocket.createSocket()
    result = noflo.internalSocket.createSocket()
    c.inPorts.a.attach a
    c.inPorts.b.attach b
    c.outPorts.result.attach result

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.a).to.be.a 'null'
      chai.expect(c.b).to.be.a 'null'
    it 'should calculate 2 + 5', (done) ->
      result.once 'data', (res) ->
        chai.expect(res).to.equal 7
        done()
      a.send 2
      b.send 5
