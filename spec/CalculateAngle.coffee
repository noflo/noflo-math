noflo = require 'noflo'

unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'CalculateAngle component', ->
  c = null
  origin = null
  destination = null
  angle = null

  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/CalculateAngle', (err, instance) ->
      return done err if err
      c = instance
      done()

  beforeEach ->
    destination = noflo.internalSocket.createSocket()
    angle = noflo.internalSocket.createSocket()
    origin = noflo.internalSocket.createSocket()
    c.inPorts.origin.attach origin
    c.inPorts.destination.attach destination
    c.outPorts.angle.attach angle

  afterEach ->
    c.outPorts.angle.detach angle

  describe 'on calculating', ->
    it 'should return correct angle (135)', (done) ->
      angle.on 'data', (data) ->
        chai.expect(data).to.equal 135
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
        done()
      origin.send
        x: 1
        y: 2
      destination.send
        x: 0
        y: 2
