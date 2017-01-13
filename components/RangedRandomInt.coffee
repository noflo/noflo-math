noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    inPorts:
      in:
        datatype: 'bang'
        required: true
      lower:
        datatype: 'number'
        description: 'the lower bound'
        control: true
      upper:
        datatype: 'number'
        description: 'the uppwer bound'
        control: true
    outPorts:
      out:
        datatype: 'number'
        required: true

  c.icon = 'random'
  c.description = 'Generate a random number in the given range.'

  c.forwardBrackets =
    in: 'out'
    lower: 'out'
    upper: 'out'

  # On data flow.
  c.process (input, output) ->
    return unless input.has 'in', (ip) -> ip.type is 'data'
    lower = input.getData 'lower'
    upper = input.getData 'upper'

    # Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
    lower = Math.min lower, upper
    upper = Math.max lower, upper
    range = (0.5 + upper) - lower
    value = lower + Math.random() * range
    output.sendDone Math.floor(value)
