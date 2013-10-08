{MathComponent} = require '../lib/MathComponent'

class Subtract extends MathComponent
  icon: 'minus'
  constructor: ->
    super 'minuend', 'subtrahend', 'difference'

  calculate: (minuend, subtrahend) ->
    minuend - subtrahend

exports.getComponent = -> new Subtract
