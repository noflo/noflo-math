noflo = require 'noflo'
if typeof process is 'object' and process.title is 'node'
  chai = require 'chai' unless chai
  CalculateAngle = require '../components/CalculateAngle.coffee'
else
  CalculateAngle = require 'noflo-math/components/CalculateAngle.js'

describe 'CalculateAngle component', ->
  c = null
  origin = null
  destination = null
  angle = null
  beforeEach ->
    c = CalculateAngle.getComponent()
    origin = noflo.internalSocket.createSocket()
    destination = noflo.internalSocket.createSocket()
    angle = noflo.internalSocket.createSocket()
    c.inPorts.origin.attach origin
    c.inPorts.destination.attach destination
    c.outPorts.angle.attach angle

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.origin).to.be.a 'null'
      chai.expect(c.destination).to.be.a 'null'
  describe 'on calculating', ->
    it 'should return correct angle (135)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 135
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 1
        y: 1
    it 'should return correct angle (315)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 315
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: -1
        y: -1
    it 'should return correct angle (180)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 180
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 0
        y: 1
    it 'should return correct angle (270)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 270
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: -1
        y: 0
    it 'should return correct angle (0)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 0
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 0
        y: -1
    it 'should return correct angle (45)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 45
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 1
        y: 2
      destination.send
        x: 2
        y: 1
    it 'should return correct angle (270)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 270
        chai.expect(c.origin).to.be.an 'object'
        chai.expect(c.destination).to.be.a 'null'
        done()
      origin.send
        x: 1
        y: 2
      destination.send
        x: 0
        y: 2
