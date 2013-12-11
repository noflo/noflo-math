noflo = require 'noflo'
unless noflo.isBrowser()
  chai = require 'chai' unless chai
  CountSum = require '../components/CountSum.coffee'
else
  CountSum = require 'noflo-math/components/CountSum.js'

describe 'CountSum component', ->
  c = null
  first = null
  second = null
  sum = null
  beforeEach ->
    c = CountSum.getComponent()
    first = noflo.internalSocket.createSocket()
    second = noflo.internalSocket.createSocket()
    sum = noflo.internalSocket.createSocket()
    c.inPorts.in.attach first
    c.outPorts.out.attach sum

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
