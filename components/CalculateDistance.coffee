noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    description: 'Calculate the distance between two points'
    icon: 'arrow-right'
    inPorts:
      origin:
        datatype: 'object'
        required: true
      destination:
        datatype: 'object'
        required: true
    outPorts:
      distance:
        datatype: 'int'
        required: true

  c.process (input, output) ->
    return unless input.hasData 'origin', 'destination'
    [origin, destination] = input.getData 'origin', 'destination'

    deltaX = destination.x - origin.x
    deltaY = destination.y - origin.y
    origin = null
    destination = null
    distance = Math.sqrt Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
    output.sendDone
      distance: distance
