noflo = require 'noflo'

class Add extends noflo.Component
  constructor: ->
    @a = null
    @b = null
    @inPorts =
      a: new noflo.Port
      b: new noflo.Port
    @outPorts =
      result: new noflo.Port

    @inPorts.a.on 'data', (data) =>
      @a = data
      do @add unless @b is null
    @inPorts.b.on 'data', (data) =>
      @b = data
      do @add unless @a is null

  add: ->
    @outPorts.result.send @a + @b
    @outPorts.result.disconnect()

exports.getComponent = -> new Add
