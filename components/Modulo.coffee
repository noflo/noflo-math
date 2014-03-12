{MathComponent} = require '../lib/MathComponent'

class Divide extends MathComponent
  constructor: ->
    super 'dividend', 'divisor', 'remainder'

  calculate: (dividend, divisor) ->
    dividend % divisor

exports.getComponent = -> new Divide
