{MathComponent} = require '../lib/MathComponent'

class Multiply extends MathComponent
  icon: 'asterisk'
  constructor: ->
    super 'multiplicand', 'multiplier', 'product'

  calculate: (multiplicand, multiplier) ->
    multiplicand * multiplier

exports.getComponent = -> new Multiply
