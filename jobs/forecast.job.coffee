nconf = require 'nconf'
http = require 'https'

# Forecast API Key from https://developer.forecast.io
forecast_api_key = nconf.get 'forecast_api_key'
# Latitude, Longitude for location
forecast_location = "46.928,7.451" 

# Unit Format
# "us" - U.S. Imperial
# "si" - International System of Units
# "uk" - SI w. windSpeed in mph
forecast_units = "si"

check_interval = 15 # in mintues

api =
  hostname: "api.forecast.io"
  path: "/forecast/#{forecast_api_key}/#{forecast_location}?units=#{forecast_units}"
  exclude: ["daily"]
api.path = "#{api.path}&exclude=" + api.exclude.join "," if api.exclude and api.exclude.length

fetchWeather = ->
  http.get api, (res) ->
    if res.statusCode is 200
      body = ""
      res.on "data", (chunk) ->
        body += chunk
      res.on "end", ->
        body = JSON.parse body
        result =
          current_temp: Math.round body.currently.temperature
          current_icon: body.currently.icon
          current_desc: body.currently.summary
          next_desc: body.minutely?.summary or "No data"
          next_icon: body.minutely?.icon
          later_desc: body.hourly?.summary
          later_icon: body.hourly?.icon
        send_event "forecast", result
    else
      console.log "forecast.io status code: #{res.statusCode}"
  .on "error", (err) ->
    console.log "Error reading from forecast.io:", err

setInterval fetchWeather, check_interval * 60 * 1e3
fetchWeather()
