noflo = require 'noflo'
if typeof process is 'object' and process.title is 'node'
  chai = require 'chai' unless chai
  CalculateDistance = require '../components/CalculateDistance.coffee'
else
  CalculateDistance = require 'noflo-math/components/CalculateDistance.js'

describe 'CalculateDistance component', ->
  c = null
  origin = null
  destination = null
  distance = null
  beforeEach ->
    c = CalculateDistance.getComponent()
    origin = noflo.internalSocket.createSocket()
    destination = noflo.internalSocket.createSocket()
    distance = noflo.internalSocket.createSocket()
    c.inPorts.origin.attach origin
    c.inPorts.destination.attach destination
    c.outPorts.distance.attach distance

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.origin).to.be.a 'null'
      chai.expect(c.destination).to.be.a 'null'
  describe 'on calculating', ->
    it 'should return correct distance', (done) ->
      distance.on 'data', (data) ->
        chai.expect(data.toPrecision(2)).to.equal '1.4'
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 1
        y: 1
