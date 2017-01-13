noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'arrow-up'
    description: 'Round a number up'
    inPorts:
      in:
        datatype: 'number'
    outPorts:
      out:
        datatype: 'int'

  c.process (input, output) ->
    return unless input.hasData 'in'
    data = input.getData 'in'
    output.sendDone Math.ceil data
