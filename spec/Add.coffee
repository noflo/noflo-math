noflo = require 'noflo'

unless noflo.isBrowser()
  chai = require 'chai'
  path = require 'path'
  baseDir = path.resolve __dirname, '../'
else
  baseDir = 'noflo-math'

describe 'Add component', ->
  c = null
  augend = null
  addend = null
  sum = null

  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/Add', (err, instance) ->
      return done err if err
      c = instance
      done()

  beforeEach ->
    augend = noflo.internalSocket.createSocket()
    addend = noflo.internalSocket.createSocket()
    sum = noflo.internalSocket.createSocket()
    c.inPorts.augend.attach augend
    c.inPorts.addend.attach addend
    c.outPorts.sum.attach sum

  describe 'when instantiated', ->
    it 'should calculate 2 + 5', (done) ->
      sum.once 'data', (res) ->
        chai.expect(res).to.equal 7
        done()
      augend.send 2
      addend.send 5
