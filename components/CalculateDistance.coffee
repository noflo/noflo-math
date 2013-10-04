noflo = require 'noflo'

class CalculateDistance extends noflo.Component
  description: 'Calculate the distance between two points'
  constructor: ->
    @origin = null
    @destination = null
    @inPorts =
      origin: new noflo.Port 'object'
      destination: new noflo.Port 'object'
    @outPorts =
      distance: new noflo.Port 'number'

    @inPorts.origin.on 'data', (@origin) =>
      do @calculate if @destination
    @inPorts.destination.on 'data', (@destination) =>
      do @calculate if @origin

  calculate: ->
    deltaX = @destination.x - @origin.x
    deltaY = @destination.y - @origin.y
    @origin = null
    @destination = null
    distance = Math.sqrt Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
    @outPorts.distance.send distance

exports.getComponent = -> new CalculateDistance
