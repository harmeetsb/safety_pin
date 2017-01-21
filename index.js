mapboxgl.accessToken = 'pk.eyJ1IjoiaGJpbmRyYSIsImEiOiJjaXk3ZG82eTAwMDV5MndvNmdqYW5scDVqIn0.he1_ALGQ23OxOhYo2RXAzA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-100.486052, 37.830348],
    zoom: 3,
    interactive:false
});

map.on('load', function () {
    map.addSource("states", {
        "type": "geojson",
        "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
    });

    map.addLayer({
        "id": "state-fills",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
            "fill-color": "#627BC1",
            "fill-opacity": 0.5
        }
    });

    map.addLayer({
        "id": "state-borders",
        "type": "line",
        "source": "states",
        "layout": {},
        "paint": {
            "line-color": "#627BC1",
            "line-width": 2
        }
    });

    map.addLayer({
        "id": "state-fills-hover",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
            "fill-color": "#627BC1",
            "fill-opacity": 1
        },
        "filter": ["==", "name", ""]
    });

    // When the user moves their mouse over the page, we look for features
    // at the mouse position (e.point) and within the states layer (states-fill).
    // If a feature is found, then we'll update the filter in the state-fills-hover
    // layer to only show that state, thus making a hover effect.
    map.on("mousemove", function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
        if (features.length) {
            map.setFilter("state-fills-hover", ["==", "name", features[0].properties.name]);
        } else {
            map.setFilter("state-fills-hover", ["==", "name", ""]);
        }
    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the map
    map.on("mouseout", function() {
        map.setFilter("state-fills-hover", ["==", "name", ""]);
    });
});