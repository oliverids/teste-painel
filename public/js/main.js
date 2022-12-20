const data = await fetch('https://api.npoint.io/23f47eae1b1cf839cbe9').then(r => r.json());

let popupContent;

const map = L.map('map', {
    center: [-19.8, -40.6],
    zoom: 7,
    minZoom: 7,
    maxZoom: 8,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for(let i = 0; i < data.cidades.length; i++) {
    popupContent = `<a href="#${data.cidades[i].nome}"><h2>${data.cidades[i].nome}</h2></a>`;

    let marker = L.marker([data.cidades[i].lat, data.cidades[i].lon]).bindPopup(popupContent).addTo(map)

}


