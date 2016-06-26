noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'plus'
    inPorts:
      augend:
        datatype: 'all'
        required: true
      addend:
        datatype: 'all'
        required: true
    outPorts:
      sum:
        datatype: 'all'

  c.process (input, output) ->
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'augend', 'addend'
    [augend, addend] = input.getData 'augend', 'addend'
    output.sendDone sum: Number(augend) + Number(addend)
