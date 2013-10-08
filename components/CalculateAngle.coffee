{MathComponent} = require '../lib/MathComponent'

class CalculateAngle extends MathComponent
  description: 'Calculate the angle between two points'
  icon: 'compass'
  constructor: ->
    super 'origin', 'destination', 'angle', 'object'

  calculate: (origin, destination) ->
    deltaX = destination.x - origin.x
    deltaY = destination.y - origin.y
    origin = null
    destination = null
    angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) + 90
    angle = angle + 360 if angle < 0
    return angle

exports.getComponent = -> new CalculateAngle
