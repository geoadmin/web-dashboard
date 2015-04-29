class Dashing.Heatmap extends Dashing.Widget

  @doneThat = 0

  ready: ->
    @layer = ga.layer.create 'ch.swisstopo.pixelkarte-grau' 
    @vectorSource = new ol.source.Vector()
    @heatmap = new ol.layer.Heatmap({
      radius: 3,
      source: @vectorSource,
      # gradient: ['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']
    })
    @heatmap.getSource().on('addfeature', (event) ->
      if typeof(event.feature) != "undefined"
        event.feature.set('weight', 1)
    )
    @controls = ol.control.defaults({zoom: false})
    @map = new ga.Map({
      target: 'map-canvas'
      layers: [@layer, @heatmap]
      view: new ol.View(
        resolution: 500
        center: [660000, 180000]
      )
      interactions: []
      controls: @controls
      renderer: 'canvas'
    })
  onData: (data) ->
    # console.log data
    if typeof(@previousData) == 'undefined'
      @previousData = []
      @round = 0
    @round++
    if (@previousData[@round - 30] instanceof Array)
      # console.log "deleting old data from round: "+ (@round - 30)
      for i in @previousData[@round - 30]
        @vectorSource.removeFeature i
      delete @previousData[@round - 30]
    @previousData[@round] = []
    for hit in data.hits
      point = new ol.geom.Point([hit._source["wmts.input_x"], hit._source["wmts.input_y"]])
      feature = new ol.Feature(point)
      @previousData[@round].push(feature)
      # console.log "added a new point to the map"
    if typeof(feature) != "undefined"
      @vectorSource.addFeatures @previousData[@round]
      # console.log "feature was not defined"
