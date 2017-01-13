noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    inPorts:
      value:
        datatype: 'number'
        required: true
      comparison:
        datatype: 'number'
        required: true
      operator:
        datatype: 'string'
        control: true
        default: '=='
    outPorts:
      pass:
        datatype: 'number'
      fail:
        datatype: 'number'

  c.description = 'Compare two numbers'
  c.icon = 'check'

  c.forwardBrackets =
    value: 'pass'
    comparison: 'pass'
    operator: 'pass'
  c.process (input, output) ->
    return input.buffer.pop() unless input.ip.type is 'data'
    return unless input.has 'value', 'comparison', (ip) -> ip.type is 'data'

    value = input.getData 'value'
    comparison = input.getData 'comparison'
    operator = input.getData 'operator'

    switch operator
      when 'eq', '=='
        return output.sendDone pass: value if value is comparison
      when 'ne', '!='
        return output.sendDone pass: value if value isnt comparison
      when 'gt', '>'
        return output.sendDone pass: value if value > comparison
      when 'lt', '<'
        return output.sendDone pass: value if value < comparison
      when 'ge', '>='
        return output.sendDone pass: value if value >= comparison
      when 'le', '<='
        return output.sendDone pass: value if value <= comparison

    return unless output.ports.fail.isAttached()
    output.sendDone fail: value
