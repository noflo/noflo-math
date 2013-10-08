{MathComponent} = require '../lib/MathComponent'

class Add extends MathComponent
  icon: 'plus'
  constructor: ->
    super 'augend', 'addend', 'sum'

  calculate: (augend, addend) ->
    augend + addend

exports.getComponent = -> new Add
