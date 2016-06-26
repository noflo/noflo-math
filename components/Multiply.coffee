noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'asterisk'
    inPorts:
      multiplicand:
        datatype: 'all'
        required: true
      multiplier:
        datatype: 'all'
        required: true
    outPorts:
      product:
        datatype: 'all'
        required: true

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'multiplicand', 'multiplier'
    [multiplicand, multiplier] = input.getData 'multiplicand', 'multiplier'
    output.sendDone product: multiplicand * multiplier
