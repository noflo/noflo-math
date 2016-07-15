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
    return input.buffer.get().pop() if input.ip.type isnt 'data'
    return unless input.has 'in'
    data = input.getData 'in'
    output.sendDone Math.ceil data
