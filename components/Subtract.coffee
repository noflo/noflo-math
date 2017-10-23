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
        control: true
    outPorts:
      difference:
        datatype: 'all'

  c.process (input, output) ->
    return unless input.hasData 'minuend', 'subtrahend'
    [minuend, subtrahend] = input.getData 'minuend', 'subtrahend'
    output.sendDone minuend - subtrahend
