noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
  c.icon = 'reorder'
  c.description = 'Map a number from a source range to a target reange.'

  c.inPorts.add 'in',
    datatype: 'number'
    required: true

  c.inPorts.add 'in_lower',
    datatype: 'number'
    description: 'the lower bound of the input value'
    required: true

  c.inPorts.add 'in_upper',
    datatype: 'number'
    description: 'the uppwer bound of the input value'
    required: true

  c.inPorts.add 'out_lower',
    datatype: 'number'
    description: 'the lower bound of the output value'
    required: true

  c.inPorts.add 'out_upper',
    datatype: 'number'
    description: 'the uppwer bound of the output value'
    required: true

  c.outPorts.add 'out',
    datatype: 'number'
    
  # On data flow.
  noflo.helpers.WirePattern c,
    in: ['in']
    out: ['out']
    params: ['in_lower', 'in_upper', 'out_lower', 'out_upper']
    forwardGroups: true
  ,
    (data, groups, out) ->
      in_lower = Math.min c.params.in_lower, c.params.in_upper
      in_upper = Math.max c.params.in_lower, c.params.in_upper
      in_range = in_upper - in_lower
      out_lower = Math.min c.params.out_lower, c.params.out_upper
      out_upper = Math.max c.params.out_lower, c.params.out_upper
      out_range = out_upper - out_lower
      value = out_lower + ((data - in_lower) * out_range / in_range)
      out.send value

