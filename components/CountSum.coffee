noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    description: 'Sum numbers coming from multiple inputs together'
    inPorts:
      in:
        datatype: 'number'
        addressable: true
    outPorts:
      out:
        datatype: 'number'

  c.forwardBrackets = {}
  c.process (input, output, id) ->
    return unless input.hasStream 'in'

    stream = input.getStream('in').filter (ip) -> ip.type is 'data'

    sum = 0
    previous = 0
    for packet in stream
      sum += packet.data

      # if the data is from the same port as the previous packet
      # send out just this packets data
      if packet.index is previous.index
        output.send out: packet.data
        sum = 0

      # if they are from different ones, send out
      # then store this data for next iteration
      else
        output.send out: sum
        sum = packet.data

      previous = packet

    output.done()
