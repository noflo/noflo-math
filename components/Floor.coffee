noflo = require 'noflo'

class Floor extends noflo.Component
  icon: 'arrow-down'
  description: 'Round a number down'
  constructor: ->
    @inPorts =
      in: new noflo.Port 'number'
    @outPorts =
      out: new noflo.Port 'int'

    @inPorts.in.on 'begingroup', (group) =>
      return unless @outPorts.out.isAttached()
      @outPorts.out.beginGroup group
    @inPorts.in.on 'data', (data) =>
      return unless @outPorts.out.isAttached()
      @outPorts.out.send Math.floor data
    @inPorts.in.on 'endgroup', =>
      return unless @outPorts.out.isAttached()
      @outPorts.out.endGroup()
    @inPorts.in.on 'disconnect', =>
      return unless @outPorts.out.isAttached()
      @outPorts.out.disconnect()

exports.getComponent = -> new Floor
