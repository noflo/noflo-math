noflo = require 'noflo'

unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'Random component', ->
  c = null
  bang = null
  result = null

  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Random', (err, instance) ->
      return done err if err
      c = instance
      done()

  beforeEach ->
    bang = noflo.internalSocket.createSocket()
    result = noflo.internalSocket.createSocket()
    c.inPorts.in.attach bang
    c.outPorts.out.attach result

  describe 'when instantiated', ->
    it 'should generate number between 0 and 1', (done) ->
      return @skip() if noflo.isBrowser()
      result.once 'data', (res) ->
        chai.expect(res).to.be.within(0, 1)
        done()
      bang.send null
