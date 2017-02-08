noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    inPorts:
      dividend:
        datatype: 'all'
        required: true
      divisor:
        datatype: 'all'
        required: true
    outPorts:
      remainder:
        datatype: 'all'

  c.process (input, output) ->
    return unless input.hasData 'dividend', 'divisor'
    [dividend, divisor] = input.getData 'dividend', 'divisor'
    output.sendDone dividend % divisor
