class Dashing.Heatmap extends Dashing.Widget

  @doneThat = 0;

  ready: ->
    @layer = ga.layer.create 'ch.swisstopo.pixelkarte-farbe' 
    @vectorSource = new ol.source.Vector()
    @heatmap = new ol.layer.Heatmap({
      radius: 5,
      source: @vectorSource
    })
    @heatmap.getSource().on('addfeature', (event) ->
      event.feature.set('weight', 0.2)
    )
    @map = new ga.Map({
      target: 'map-canvas',
      layers: [@layer, @heatmap],
      view: new ol.View2D({
        resolution: 650,
        center: [660000, 180000]
      })
    })
 
  onData: (data) ->
    #console.log data
    if typeof(@previousData) == 'undefined'
      @previousData = [];
      @round = 0;
    @round++
    if (@previousData[@round-3] instanceof Array)
      #console.log "deleting old data from round: "+ (@round-3)
      for i in @previousData[@round - 3]
        @vectorSource.removeFeature i
      delete @previousData[@round-3]
    @previousData[@round] = []
    for hit in data.hits
      point = new ol.geom.Point([hit._source["wmts.input_x"], hit._source["wmts.input_y"]])
      feature = new ol.Feature(point)
      @previousData[@round].push(feature)
    @vectorSource.addFeatures @previousData[@round]
