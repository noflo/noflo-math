noflo = require 'noflo'

class Subtract extends noflo.Component
  icon: 'minus'
  constructor: ->
    @minuend = null
    @subtrahend = null
    @inPorts =
      minuend: new noflo.Port 'number'
      subtrahend: new noflo.Port 'number'
      clear: new noflo.Port 'bang'
    @outPorts =
      difference: new noflo.Port 'number'

    @inPorts.minuend.on 'data', (data) =>
      @minuend = data
      do @add unless @subtrahend is null
    @inPorts.subtrahend.on 'data', (data) =>
      @subtrahend = data
      do @add unless @minuend is null

    @inPorts.clear.on 'data', (data) =>
      @minuend = null
      @subtrahend = null

  add: ->
    @outPorts.difference.send @minuend - @subtrahend
    @outPorts.difference.disconnect()

exports.getComponent = -> new Subtract
