noflo = require 'noflo'

class Divide extends noflo.Component
  constructor: ->
    @dividend = null
    @divisor = null
    @inPorts =
      dividend: new noflo.Port 'number'
      divisor: new noflo.Port 'number'
      clear: new noflo.Port 'bang'
    @outPorts =
      quotient: new noflo.Port 'number'

    @inPorts.dividend.on 'data', (data) =>
      @dividend = data
      do @add unless @divisor is null
    @inPorts.divisor.on 'data', (data) =>
      @divisor = data
      do @add unless @dividend is null

    @inPorts.clear.on 'data', (data) =>
      @dividend = null
      @divisor = null

  add: ->
    @outPorts.quotient.send @dividend / @divisor
    @outPorts.quotient.disconnect()

exports.getComponent = -> new Divide
