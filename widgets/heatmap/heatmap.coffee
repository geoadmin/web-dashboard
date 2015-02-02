class Dashing.Heatmap extends Dashing.Widget

  @doneThat = 0;

  ready: ->
    @layer = ga.layer.create 'ch.swisstopo.pixelkarte-grau' 
    @vectorSource = new ol.source.Vector()
    @heatmap = new ol.layer.Heatmap({
      radius: 5,
      source: @vectorSource
    })
    @heatmap.getSource().on('addfeature', (event) ->
      event.feature.set('weight', 0.6)
    )
    @map = new ga.Map({
      target: 'map-canvas'
      layers: [@layer, @heatmap]
      view: new ol.View(
        resolution: 650
        center: [660000, 180000]
      )
      interactions: []
      controls: [
        new ol.control.Attribution()
        ]
    })
  onData: (data) ->
    # console.log data
    if typeof(@previousData) == 'undefined'
      @previousData = [];
      @round = 0;
    @round++
    if (@previousData[@round - 50] instanceof Array)
      # console.log "deleting old data from round: "+ (@round - 50)
      for i in @previousData[@round - 50]
        @vectorSource.removeFeature i
      delete @previousData[@round - 50]
    @previousData[@round] = []
    for hit in data.hits
      point = new ol.geom.Point([hit._source["wmts.input_x"], hit._source["wmts.input_y"]])
      feature = new ol.Feature(point)
      @previousData[@round].push(feature)
    @vectorSource.addFeatures @previousData[@round]
