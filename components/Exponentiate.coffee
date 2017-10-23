noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.icon = 'caret-up'
  c.inPorts.add 'base',
    datatype: 'number'
    required: true
  c.inPorts.add 'exponent',
    datatype: 'number'
    required: true
    control: true
  c.outPorts.add 'power',
    datatype: 'number'

  c.process (input, output) ->
    return unless input.hasData 'base', 'exponent'
    [base, exponent] = input.getData 'base', 'exponent'
    output.sendDone
      power: Math.pow base, exponent
