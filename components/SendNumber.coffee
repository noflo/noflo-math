noflo = require 'noflo'

class SendNumber extends noflo.Component
  constructor: ->
    @data =
      number: null
      group: []
    @groups = []
    @inPorts = new noflo.InPorts
      number:
        datatype: 'number'
      in:
        datatype: 'bang'
    @outPorts = new noflo.OutPorts
      out:
        datatype: 'number'

    @inPorts.number.on 'data', (data) =>
      @data.number = data

    @inPorts.in.on 'begingroup', (group) =>
      @groups.push group

    @inPorts.in.on 'data', (data) =>
      return if @data.number is null
      @data.group = @groups.slice 0
      @sendNumber @data

    @inPorts.in.on 'endgroup', (group) =>
      @groups.pop()
    @inPorts.in.on 'disconnect', =>
      @outPorts.out.disconnect()

  sendNumber: (data) ->
    for group in data.group
      @outPorts.out.beginGroup group
    @outPorts.out.send data.number
    for group in data.group
      @outPorts.out.endGroup()


exports.getComponent = -> new SendNumber
