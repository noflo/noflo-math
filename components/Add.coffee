noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'plus'
    inPorts:
      augend:
        datatype: 'number'
        required: true
      addend:
        datatype: 'number'
        required: true
    outPorts:
      sum:
        datatype: 'number'

  c.process (input, output) ->
    return unless input.hasData 'augend', 'addend'
    [augend, addend] = input.getData 'augend', 'addend'
    output.sendDone
      sum: Number(augend) + Number(addend)
