noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'CountSum component', ->
  c = null
  first = null
  second = null
  sum = null
  loader = null
  before ->
    loader = new noflo.ComponentLoader baseDir
  beforeEach (done) ->
    @timeout 4000
    loader.load 'math/CountSum', (err, instance) ->
      return done err if err
      c = instance
      first = noflo.internalSocket.createSocket()
      second = noflo.internalSocket.createSocket()
      c.inPorts.in.attach first
      sum = noflo.internalSocket.createSocket()
      c.outPorts.out.attach sum
      done()
  afterEach ->
    c.outPorts.out.detach sum
    sum = null
    c.shutdown()

  describe 'with a single connected port', ->
    it 'should forward the same number', (done) ->
      expects = [5, 1]
      sends = [5, 1]

      sum.on 'data', (data) ->
        chai.expect(data).to.equal expects.shift()
      sum.on 'disconnect', ->
        done()

      first.send data for data in sends
      first.disconnect()

  describe 'with two connected ports', ->
    it 'should sum the inputs together', (done) ->
      c.inPorts.in.attach second
      expects = [1, 3, 5, 7]
      sendsOne = [1, 3]
      sendsTwo = [2, 4]

      sum.on 'data', (data) ->
        chai.expect(data).to.equal expects.shift()
      sum.on 'disconnect', ->
        done()

      first.send sendsOne.shift()
      second.send sendsTwo.shift()
      first.send sendsOne.shift()
      second.send sendsTwo.shift()
      first.disconnect()
      second.disconnect()
