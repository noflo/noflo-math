noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'CalculateDistance component', ->
  c = null
  origin = null
  destination = null
  distance = null
  loader = null
  before (done) ->
    loader = new noflo.ComponentLoader baseDir
    done()
  beforeEach (done) ->
    @timeout 4000
    loader.load 'math/CalculateDistance', (err, instance) ->
      return done err if err
      c = instance
      origin = noflo.internalSocket.createSocket()
      destination = noflo.internalSocket.createSocket()
      distance = noflo.internalSocket.createSocket()
      c.inPorts.origin.attach origin
      c.inPorts.destination.attach destination
      c.outPorts.distance.attach distance
      done()

  describe 'when instantiated', ->
    it 'should not hold values', ->
      chai.expect(c.primary).to.be.an 'object'
      chai.expect(c.primary.value).to.be.a 'null'
      chai.expect(c.secondary).to.be.a 'null'
  describe 'on calculating', ->
    it 'should return correct distance', (done) ->
      distance.on 'data', (data) ->
        chai.expect(data.toPrecision(2)).to.equal '1.4'
        done()
      origin.send
        x: 0
        y: 0
      destination.send
        x: 1
        y: 1
