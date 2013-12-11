noflo = require 'noflo'

class Floor extends noflo.Component
  constructor: ->
    @inPorts =
      in: new noflo.Port 'number'
    @outPorts =
      out: new noflo.Port 'integer'

    @inPorts.in.on 'begingroup', (group) =>
      @outPorts.out.beginGroup group
    @inPorts.in.on 'data', (data) =>
      @outPorts.out.send Math.floor data
    @inPorts.in.on 'endgroup', =>
      @outPorts.out.endGroup()
    @inPorts.in.on 'disconnect', =>
      @outPorts.out.disconnect()

exports.getComponent = -> new Floor
