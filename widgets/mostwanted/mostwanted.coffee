class Dashing.Mostwanted extends Dashing.Widget

  @accessor 'value', Dashing.AnimatedValue

  ready: ->
    mostwanted = $(@node).find(".mostwanted")
