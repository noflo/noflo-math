noflo = require 'noflo'

class CalculateAngle extends noflo.Component
  description: 'Calculate the angle between two points'
  icon: 'compass'
  constructor: ->
    @origin = null
    @destination = null
    @inPorts =
      origin: new noflo.Port 'object'
      destination: new noflo.Port 'object'
    @outPorts =
      angle: new noflo.Port 'number'

    @inPorts.origin.on 'data', (@origin) =>
      do @calculate if @destination
    @inPorts.destination.on 'data', (@destination) =>
      do @calculate if @origin

  calculate: ->
    deltaX = @destination.x - @origin.x
    deltaY = @destination.y - @origin.y
    @origin = null
    @destination = null
    angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) + 90
    angle = angle + 360 if angle < 0
    @outPorts.angle.send angle

exports.getComponent = -> new CalculateAngle
