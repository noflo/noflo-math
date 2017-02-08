noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    inPorts:
      number:
        datatype: 'number'
        required: true
        control: true
      in:
        datatype: 'bang'
        required: true
    outPorts:
      out:
        datatype: 'number'
        required: true

  c.process (input, output) ->
    return unless input.hasData 'in', 'number'
    [data, number] = input.getData 'in', 'number'

    output.sendDone out: number
