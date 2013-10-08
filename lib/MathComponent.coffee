noflo = require 'noflo'

class MathComponent extends noflo.Component
  constructor: (primary, secondary, res, inputType = 'number') ->
    @inPorts = {}
    @outPorts = {}
    @inPorts[primary] = new noflo.Port inputType
    @inPorts[secondary] = new noflo.Port inputType
    @inPorts.clear = new noflo.Port 'bang'
    @outPorts[res] = new noflo.Port 'number'

    @primary =
      value: null
      group: []
      disconnect: false
    @secondary = null
    @groups = []

    calculate = =>
      for group in @primary.group
        @outPorts[res].beginGroup group
      @outPorts[res].send @calculate @primary.value, @secondary
      for group in @primary.group
        @outPorts[res].endGroup()
      @outPorts[res].disconnect() if @primary.disconnect

    @inPorts[primary].on 'begingroup', (group) =>
      @groups.push group
    @inPorts[primary].on 'data', (data) =>
      @primary =
        value: data
        group: @groups.slice 0
        disconnect: false
      do calculate unless @secondary is null
    @inPorts[primary].on 'endgroup', =>
      @groups.pop()
    @inPorts[primary].on 'disconnect', =>
      if @primary.value and @secondary
        return @outPorts[res].disconnect()
      @primary.disconnect = true
    @inPorts[secondary].on 'data', (data) =>
      @secondary = data
      do calculate unless @primary.value is null

    @inPorts.clear.on 'data', (data) =>
      @primary =
        value: null
        group: []
        disconnect: false
      @secondary = null
      @groups = []

exports.MathComponent = MathComponent
