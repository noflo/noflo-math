noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  Ceil = require '../components/Ceil.coffee'
else
  Ceil = require 'noflo-math/components/Ceil.js'

describe 'Ceil component', ->
  c = null
  vin = null
  vout = null
  beforeEach ->
    c = Ceil.getComponent()
    vin = noflo.internalSocket.createSocket()
    vout = noflo.internalSocket.createSocket()
    c.inPorts.in.attach vin
    c.outPorts.out.attach vout

  describe 'when instantiated', ->
    it 'should calculate 5.1 = 6', (done) ->
      vout.once 'data', (res) ->
        chai.expect(res).to.equal 6
        done()
      vin.send 5.1
    it 'should calculate 2.9 = 3', (done) ->
      vout.once 'data', (res) ->
        chai.expect(res).to.equal 3
        done()
      vin.send 2.9
