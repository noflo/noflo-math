noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'Ceil component', ->
  c = null
  vin = null
  vout = null
  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Ceil', (err, instance) ->
      return done err if err
      c = instance
      vin = noflo.internalSocket.createSocket()
      c.inPorts.in.attach vin
      done()
  beforeEach ->
    vout = noflo.internalSocket.createSocket()
    c.outPorts.out.attach vout
  afterEach ->
    c.outPorts.out.detach vout
    vout = null

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
