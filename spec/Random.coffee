noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Random = require '../components/Random.coffee'
else
  Random = require 'noflo-math/components/Random.js'

describe 'Random component', ->
  c = null
  bang = null
  result = null
  beforeEach ->
    c = Random.getComponent()
    bang = noflo.internalSocket.createSocket()
    result = noflo.internalSocket.createSocket()
    c.inPorts.in.attach bang
    c.outPorts.out.attach result

  describe 'when instantiated', ->

    it 'should generate number between 0 and 1', (done) ->
      result.once 'data', (res) ->
        chai.expect(res).to.be.within(0, 1)
        done()
      bang.send null
