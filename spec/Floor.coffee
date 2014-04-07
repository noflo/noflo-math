noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Floor = require '../components/Floor.coffee'
else
  Floor = require 'noflo-math/components/Floor.js'

describe 'Floor component', ->
  c = null
  number = null
  result = null
  beforeEach ->
    c = Floor.getComponent()
    number = noflo.internalSocket.createSocket()
    result = noflo.internalSocket.createSocket()
    c.inPorts.in.attach number
    c.outPorts.out.attach result

  describe 'when instantiated', ->

    it 'should floor 2.9 to 2', (done) ->
      result.once 'data', (res) ->
        chai.expect(res).to.equal 2
        done()
      number.send 2.9
