noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'arrow-down'
    description: 'Round a number down'
    inPorts:
      in:
        datatype: 'number'
    outPorts:
      out:
        datatype: 'int'

  c.process (input, output) ->
    return unless input.hasData 'in'
    data = input.getData 'in'
    output.sendDone Math.floor data
