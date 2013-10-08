{MathComponent} = require '../lib/MathComponent'

class CalculateDistance extends MathComponent
  icon: 'arrow-right'
  description: 'Calculate the distance between two points'
  constructor: ->
    super 'origin', 'destination', 'distance', 'object'

  calculate: (origin, destination) ->
    deltaX = destination.x - origin.x
    deltaY = destination.y - origin.y
    origin = null
    destination = null
    distance = Math.sqrt Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
    return distance

exports.getComponent = -> new CalculateDistance
