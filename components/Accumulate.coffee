noflo = require 'noflo'

exports.getComponent = () ->
  c = new noflo.Component
  c.description = 'Accumulate numbers coming from the input port'

  c.inPorts.add 'in',
    datatype: 'number'
    description: 'Numbers to accumulate'
  c.inPorts.add 'reset',
    datatype: 'bang'
    description: 'Reset accumulation counter'
    process: (event, data) ->
      return unless event is 'data'
      c.counter = 0
      c.outPorts.out.send c.counter
      c.outPorts.out.disconnect()
  c.inPorts.add 'emitreset',
    datatype: 'boolean'
    description: 'Whether to emit an output upon reset'
    process: (event, data) ->
      return unless event is 'data'
      c.emitReset = data

  c.outPorts.add 'out',
    datatype: 'number'

  c.counter = 0

  noflo.helpers.MapComponent c, (data, groups, out) ->
    c.counter += data
    out.send c.counter

  c
