noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'plus'
    inPorts:
      augend:
        datatype: 'all'
      addend:
        datatype: 'all'
    outPorts:
      sum:
        datatype: 'all'

  c.process (input, output) ->
    console.log input.buffer.get 'augend'
    console.log input.buffer.get 'addend'

    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'augend', 'addend'
    [augend, addend] = input.getData 'augend', 'addend'

    console.log augend, addend
    output.sendDone sum: Number(augend) + Number(addend)
