noflo = require 'noflo'

exports.getComponent = ->
  c = new noflo.Component
    icon: 'random'
    description: 'Generate a random number between 0 and 1'
    inPorts:
      in:
        datatype: 'bang'
    outPorts:
      out:
        datatype: 'number'

  c.process (input, output) ->
    output.sendDone Math.random()
