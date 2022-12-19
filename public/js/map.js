const map = L.map('map', {
    center: [-20.32, -40.33],
    zoom: 4,
    minZoom: 1,
    maxZoom: 12,
});

// map.on('popupopen', function (e) {
//     var marker = e.popup._source._popup._content,
//         anchor = marker.substring(
//             marker.indexOf('"') + 1,
//             marker.lastIndexOf('">'));
// });

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);