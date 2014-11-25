noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.icon = 'random'
  c.description = 'Generate a random number in the given range.'

  c.inPorts.add 'in',
    datatype: 'bang'
    required: true

  c.inPorts.add 'lower',
    datatype: 'number'
    description: 'the lower bound'
    required: true

  c.inPorts.add 'upper',
    datatype: 'number'
    description: 'the uppwer bound'
    required: true

  c.outPorts.add 'out',
    datatype: 'number'
    
  # On data flow.
  noflo.helpers.WirePattern c,
    in: ['in']
    out: ['out']
    params: ['lower', 'upper']
    forwardGroups: true
  ,
    (data, groups, out) ->
      # Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
      lower = Math.min c.params.lower, c.params.upper
      upper = Math.max c.params.lower, c.params.upper
      range = (0.5 + upper) - lower
      value = lower + Math.random() * range
      out.send Math.floor value

