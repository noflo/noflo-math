{MathComponent} = require '../lib/MathComponent'

class Add extends MathComponent
  icon: 'plus'
  constructor: ->
    super 'augend', 'addend', 'sum'

  calculate: (augend, addend) ->
    Number(augend) + Number(addend)

exports.getComponent = -> new Add
