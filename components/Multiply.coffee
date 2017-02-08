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
    return unless input.hasData 'multiplicand', 'multiplier'
    [multiplicand, multiplier] = input.getData 'multiplicand', 'multiplier'
    output.sendDone product: multiplicand * multiplier
