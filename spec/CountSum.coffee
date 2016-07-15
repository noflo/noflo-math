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

  before (done) ->
    @timeout 4000
    loader = new noflo.ComponentLoader baseDir
    loader.load 'math/CountSum', (err, instance) ->
      return done err if err
      c = instance
      done()

  beforeEach ->
    first = noflo.internalSocket.createSocket()
    second = noflo.internalSocket.createSocket()
    sum = noflo.internalSocket.createSocket()
    c.inPorts.in.attach first
    c.outPorts.out.attach sum

  afterEach ->
    c.outPorts.out.detach sum

  describe 'with a single connected port', ->
    it 'should forward the same number', (done) ->
      expects = [5, 1]
      sends = [5, 1]

      sum.on 'data', (data) ->
        chai.expect(data).to.equal expects.shift()
        if expects.length is 0
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
        if expects.length is 0
          done()

      first.send new noflo.IP 'openBracket'
      second.send new noflo.IP 'openBracket'

      # 1, 2 = 3
      # 2 +^ = 5
      # 4 +^ = 9...

      # $a = [0](1) + null == 1
      # $b = $a(1) + [1](2) == 3
      # $c = [1](2) + [0](3) == 5
      # $d = [0](3) + [1](4) == 7

      first.send sendsOne.shift()
      second.send sendsTwo.shift()
      first.send sendsOne.shift()
      second.send sendsTwo.shift()

      first.send new noflo.IP 'closeBracket'
      second.send new noflo.IP 'closeBracket'

      first.disconnect()
      second.disconnect()
