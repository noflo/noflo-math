noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'plus'
    inPorts:
      minuend:
        datatype: 'all'
        required: true
      subtrahend:
        datatype: 'all'
        required: true
    outPorts:
      difference:
        datatype: 'all'

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'minuend', 'subtrahend'
    [minuend, subtrahend] = input.getData 'minuend', 'subtrahend'
    output.sendDone minuend - subtrahend
