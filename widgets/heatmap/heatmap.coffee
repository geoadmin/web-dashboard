class Dashing.Heatmap extends Dashing.Widget

  @doneThat = 0

  ready: ->
    @layer = ga.layer.create 'ch.swisstopo.pixelkarte-grau' 
    @vectorSource = new ol.source.Vector()
    @heatmap = new ol.layer.Heatmap({
      radius: 5,
      source: @vectorSource
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
    })
  onData: (data) ->
    # console.log data
    if typeof(@previousData) == 'undefined'
      @previousData = []
      @round = 0
    @round++
    if (@previousData[@round - 100] instanceof Array)
      # console.log "deleting old data from round: "+ (@round - 100)
      for i in @previousData[@round - 100]
        @vectorSource.removeFeature i
      delete @previousData[@round - 100]
    @previousData[@round] = []
    for hit in data.hits
      point = new ol.geom.Point([hit._source["wmts.input_x"], hit._source["wmts.input_y"]])
      feature = new ol.Feature(point)
      @previousData[@round].push(feature)
    if typeof(feature) != "undefined"
      @vectorSource.addFeatures @previousData[@round]
