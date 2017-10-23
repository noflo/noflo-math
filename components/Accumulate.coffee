noflo = require 'noflo'

exports.getComponent = () ->
  c = new noflo.Component
    description: 'Accumulate numbers coming from the input port'
    inPorts:
      in:
        datatype: 'number'
        description: 'Numbers to accumulate'
        required: true
      reset:
        datatype: 'bang'
        description: 'Reset accumulation counter'
      emitreset:
        datatype: 'boolean'
        description: 'Whether to emit an output upon reset'
        control: true
        default: false
    outPorts:
      out:
        datatype: 'number'
        required: true

  c.forwardBrackets = {}

  c.counter = {}
  c.tearDown = (callback) ->
    c.counter = {}
    do callback

  c.process (input, output) ->
    if input.hasData 'reset'
      input.getData 'reset'
      c.counter[input.scope] = 0
      emitReset = false
      emitReset = input.getData('emitreset') if input.hasData 'emitreset'
      return output.sendDone c.counter[input.scope] if emitReset
      return output.done()

    return unless input.hasData 'in'

    data = input.getData 'in'
    c.counter[input.scope] = 0 unless c.counter[input.scope]
    c.counter[input.scope] += data

    output.sendDone c.counter[input.scope]
