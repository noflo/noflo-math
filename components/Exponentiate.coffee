{MathComponent} = require '../lib/MathComponent'

class Exponentiate extends MathComponent
  icon: 'caret'
  constructor: ->
    super 'base', 'exponent', 'power'

  calculate: (base, exponent) ->
    Math.pow(base, exponent)

exports.getComponent = -> new Exponentiate
