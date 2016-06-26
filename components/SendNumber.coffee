noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    inPorts:
      number:
        datatype: 'number'
        required: true
      in:
        datatype: 'bang'
        required: true
    outPorts:
      out:
        datatype: 'number'
        required: true

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'in', 'number'
    [data, number] = input.getData 'in', 'number'

    output.send out: number
    output.done()
