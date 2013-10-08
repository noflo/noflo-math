{MathComponent} = require '../lib/MathComponent'

class Divide extends MathComponent
  constructor: ->
    super 'dividend', 'divisor', 'quotient'

  calculate: (dividend, divisor) ->
    dividend / divisor

exports.getComponent = -> new Divide
