noflo = require 'noflo'

class Multiply extends noflo.Component
  constructor: ->
    @multiplicand = null
    @multiplier = null
    @inPorts =
      multiplicand: new noflo.Port 'number'
      multiplier: new noflo.Port 'number'
      clear: new noflo.Port 'bang'
    @outPorts =
      product: new noflo.Port 'number'

    @inPorts.multiplicand.on 'data', (data) =>
      @multiplicand = data
      do @add unless @multiplier is null
    @inPorts.multiplier.on 'data', (data) =>
      @multiplier = data
      do @add unless @multiplicand is null

    @inPorts.clear.on 'data', (data) =>
      @multiplicand = null
      @multiplier = null

  add: ->
    @outPorts.product.send @multiplicand * @multiplier
    @outPorts.product.disconnect()

exports.getComponent = -> new Multiply
