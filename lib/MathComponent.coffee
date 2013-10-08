noflo = require 'noflo'

class MathComponent extends noflo.Component
  constructor: (primary, secondary, res) ->
    @inPorts = {}
    @outPorts = {}
    @inPorts[primary] = new noflo.Port 'number'
    @inPorts[secondary] = new noflo.Port 'number'
    @inPorts.clear = new noflo.Port 'bang'
    @outPorts[res] = new noflo.Port 'number'

    @primary =
      value: null
      group: []
    @secondary = null
    @groups = []

    calculate = =>
      for group in @primary.group
        @outPorts[res].beginGroup group
      @outPorts[res].send @calculate @primary.value, @secondary
      for group in @primary.group
        @outPorts[res].endGroup()
      @outPorts[res].disconnect()

    @inPorts[primary].on 'begingroup', (group) =>
      @groups.push group
    @inPorts[primary].on 'data', (data) =>
      @primary =
        value: data
        group: @groups.slice 0
      do calculate unless @secondary is null
    @inPorts[primary].on 'endgroup', =>
      @groups.pop()
    @inPorts[secondary].on 'data', (data) =>
      @secondary = data
      do calculate unless @primary.value is null

    @inPorts.clear.on 'data', (data) =>
      @primary =
        value: null
        group: []
      @secondary = null
      @groups = []

exports.MathComponent = MathComponent
