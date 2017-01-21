mapboxgl.accessToken = 'pk.eyJ1IjoiaGJpbmRyYSIsImEiOiJjaXk3ZG82eTAwMDV5MndvNmdqYW5scDVqIn0.he1_ALGQ23OxOhYo2RXAzA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-77.04, 38.907], // starting position
    zoom: 3, // starting zoom
    interactive:false
});

map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
});

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('load', function() {

    // Add a layer showing the places.
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "description": "Crime Scene",
                        "icon": "star"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.007481, 38.876516]
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
        }
    });
});

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
});