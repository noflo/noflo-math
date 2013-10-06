noflo = require 'noflo'

class Compare extends noflo.Component
  description: 'Compare two numbers'
  icon: 'check'

  constructor: ->
    @operator = '=='
    @value = null
    @comparison = null

    @inPorts =
      value: new noflo.Port 'number'
      comparison: new noflo.Port 'number'
      operator: new noflo.Port 'string'
    @outPorts =
      pass: new noflo.Port 'number'
      fail: new noflo.Port 'number'

    @inPorts.operator.on 'data', (@operator) =>

    @inPorts.value.on 'data', (@value) =>
      do @compare if @comparison

    @inPorts.value.on 'disconnect', =>
      @outPorts.pass.disconnect()

    @inPorts.comparison.on 'data', (@comparison) =>
      do @compare if @value

  compare: ->
    switch @operator
      when 'eq', '=='
        @send @value if @value is @comparison
        return
      when 'ne', '!='
        @send @value if @value isnt @comparison
        return
      when 'gt', '>'
        @send @value if @value > @comparison
        return
      when 'lt', '<'
        @send @value if @value < @comparison
        return
      when 'ge', '>='
        @send @value if @value >= @comparison
        return
      when 'le', '<='
        @send @value if @value <= @comparison
        return

    return unless @outPorts.fail.isAttached()
    @outPorts.fail.send @value
    @outPorts.fail.disconnect()

  send: (val) ->
    @outPorts.pass.send @value

exports.getComponent = -> new Compare
