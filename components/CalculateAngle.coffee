noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    description: 'Calculate the angle between two points'
    icon: 'compass'
    inPorts:
      origin:
        datatype: 'object'
        required: true
      destination:
        datatype: 'object'
        required: true
    outPorts:
      angle:
        datatype: 'int'
        required: true

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'origin', 'destination'
    [origin, destination] = input.getData 'origin', 'destination'

    deltaX = destination.x - origin.x
    deltaY = destination.y - origin.y
    origin = null
    destination = null
    angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) + 90
    angle = angle + 360 if angle < 0
    output.sendDone angle
