noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'plus'
    inPorts:
      dividend:
        datatype: 'all'
        required: true
      divisor:
        datatype: 'all'
        required: true
    outPorts:
      quotient:
        datatype: 'all'

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'dividend', 'divisor'
    [dividend, divisor] = input.getData 'dividend', 'divisor'
    output.sendDone quotient: dividend / divisor
