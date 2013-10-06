noflo = require 'noflo'

class Add extends noflo.Component
  icon: 'plus'
  constructor: ->
    @augend = null
    @addend = null
    @inPorts =
      augend: new noflo.Port 'number'
      addend: new noflo.Port 'number'
      clear: new noflo.Port 'bang'
    @outPorts =
      sum: new noflo.Port 'number'

    @inPorts.augend.on 'data', (data) =>
      @augend = data
      do @add unless @addend is null
    @inPorts.addend.on 'data', (data) =>
      @addend = data
      do @add unless @augend is null

    @inPorts.clear.on 'data', (data) =>
      @augend = null
      @addend = null

  add: ->
    @outPorts.sum.send @augend + @addend
    @outPorts.sum.disconnect()

exports.getComponent = -> new Add
