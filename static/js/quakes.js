var quakeLayer = new L.LayerGroup();

var quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson?$limit=1000"

// Read GeoJson Data
d3.json(quakeData, function(data) {
    L.geoJson(data, {
        // Style each feature (in this case a neighborhood)
        pointToLayer: function (geoJsonPoint, latlng) {
            return new L.circleMarker(latlng, {
                fillColor: getColor(geoJsonPoint.properties.mag),
                weight: 0,
                fillOpacity: 0.8,
                radius: getRadius(geoJsonPoint.properties.mag)
            });
        },
        onEachFeature: onEachFeature
    }).addTo(quakeLayer);

    // create a function to bind popup and info to each circle marker
    function onEachFeature(feature, layer) {

        if (feature.properties && feature.properties.mag) {
            layer.bindPopup(`<h6>EARTHQUAKE</h6><hr>
                <h6>Magnitude: ${feature.properties.mag}</h6>
                <text><b>Location:</b> ${feature.properties.place}<br>
                <b>Tsunami:</b> ${feature.properties.tsunami}</text>`);
        }
        // create a mouse-over event to make the circles increase in size when hovering
        layer.on({
            mouseover: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillColor: getColor(feature.properties.mag),
                    radius: getRadius(feature.properties.mag) + 3,
                    fillOpacity: 1,
                    color: "#AB47BC",
                    weight: 2
                });

            },
            mouseout: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillColor: getColor(feature.properties.mag),
                    radius: getRadius(feature.properties.mag),
                    fillOpacity: 0.8,
                    weight: 0
                });
            }
        })
    }
    
    // create a function to determine color weight based on earthquake magnitude

    // function getColor(mag) {
    //     if (mag <= 1){
    //         return "#FFCC80"
    //     }
    //     else if (mag > 1 && mag <= 2 ) {
    //         return "#FFB74D"
    //     }
    //     else if (mag > 2 && mag <= 3) {
    //         return "#FFA726"
    //     }
    //     else if (mag > 3 && mag <= 4) {
    //         return "#FF9800"
    //     }
    //     else if (mag > 4 && mag <= 5) {
    //         return "#FB8C00"
    //     }
    //     else if (mag > 5) {
    //         return "#F57C00"
    //     }
    //     else {
    //         return "black"
    //     }
    // }

    function getColor(d) {
        return d > 5 ? '#F57C00' :
               d > 4 ? '#FB8C00' :
               d > 3 ? '#FF9800' :
               d > 2 ? '#FFA726' :
               d > 1 ? '#FFB74D' :
               d > 0 ? '#FFCC80' :
                       '#FFE0B2';
    }

    // function getRadius(mag) {
    //     if (mag <= 1) {
    //         return 3
    //     }
    //     else if (mag > 1 && mag <= 2) {
    //         return 5
    //     }
    //     else if (mag > 2 && mag <= 3) {
    //         return 7
    //     }
    //     else if (mag > 3 && mag <= 4) {
    //         return 9
    //     }
    //     else if (mag > 4 && mag <= 5) {
    //         return 11
    //     }
    //     else if (mag > 5) {
    //         return 13
    //     }
    //     else {
    //         return 2
    //     }
    // }

    function getRadius(d) {
        return d > 5 ? 13 :
               d > 4 ? 11 :
               d > 3 ? 9 :
               d > 2 ? 7 :
               d > 1 ? 5 :
               d > 0 ? 3 :
                       2;
    }

    var legend = L.control({ position: 'topright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0, 1, 2, 3, 4, 5],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mags.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(mags[i] + 1) + '"></i> ' +
                mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
})