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
      if @outPorts[res].isAttached()
        @outPorts[res].send @calculate @primary.value, @secondary
      for group in @primary.group
        @outPorts[res].endGroup()
      if @outPorts[res].isConnected() and @primary.disconnect
        @outPorts[res].disconnect()

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
      @primary.disconnect = true
      return @outPorts[res].disconnect()
    @inPorts[secondary].on 'data', (data) =>
      @secondary = data
      do calculate unless @primary.value is null

    @inPorts.clear.on 'data', (data) =>
      if @outPorts[res].isConnected()
        for group in @primary.group
          @outPorts[res].endGroup()
        if @primary.disconnect
          @outPorts[res].disconnect()

      @primary =
        value: null
        group: []
        disconnect: false
      @secondary = null
      @groups = []

exports.MathComponent = MathComponent
