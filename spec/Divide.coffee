noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'Divide component', ->
  c = null
  dividend = null
  divisor = null
  quotient = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Divide', (err, instance) ->
      return done err if err
      c = instance
      dividend = noflo.internalSocket.createSocket()
      divisor = noflo.internalSocket.createSocket()
      c.inPorts.dividend.attach dividend
      c.inPorts.divisor.attach divisor
      done()
  beforeEach ->
    quotient = noflo.internalSocket.createSocket()
    c.outPorts.quotient.attach quotient
  afterEach ->
    c.outPorts.quotient.detach quotient
    quotient = null

  describe 'when instantiated', ->
    it 'should calculate 5 / 2', (done) ->
      quotient.once 'data', (res) ->
        chai.expect(res).to.equal 2.5
        done()
      dividend.send 5
      divisor.send 2
