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
    outPorts:
      out:
        datatype: 'number'
        required: true

  c.forwardBrackets = {}

  c.process (input, output) ->
    return unless input.hasData 'in'

    buffer = input.buffer.get('in')
    datas = buffer.filter (ip) -> ip.type is 'data'
    close = buffer.filter (ip) -> ip.type is 'closeBracket'

    if input.has 'reset'
      reset = input.get 'reset'

      emitReset = null
      if input.has 'emitreset'
        buf = input.buffer.get('emitreset').filter (ip) -> ip.type is 'data'
        emitReset = buf[0].data
        input.buffer.set 'emitreset', []

      input.buffer.set 'in', []
      if emitReset?
        return output.sendDone 0
      return output.done()

    if close.length isnt 0
      input.buffer.set 'in', []
      return output.done()

    counter = 0
    for data in datas
      counter += data.data

    output.sendDone counter
