var plateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
// Function that will determine the color of a neighborhood based on the borough it belongs to
var plateLayer = new L.LayerGroup()

d3.json(plateData, function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Style each feature (in this case a neighborhood)
        style: function (feature) {
            return {
                color: "plum",
                // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: "plum",
                fillOpacity: 0.0,
                weight: 2
            };
        },
        // Called on each feature
        onEachFeature: function (feature, layer) {
            // Set mouse events to change map styling
            layer.on({
                // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                mouseover: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.2
                    });
                },
                // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
                mouseout: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.0
                    });
                },
            });
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup("<h6> Tectonic Plate </h6> <hr> <h6>" + feature.properties.PlateName + "</h6>");

        }
    }).addTo(plateLayer);
});