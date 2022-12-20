const data = await fetch('https://api.npoint.io/23f47eae1b1cf839cbe9').then(r => r.json()),
    cidades = await data.cidades,
    barCharts = await data.barCharts,
    lineCharts = await data.lineCharts;


const barChart = document.getElementById('barChart'),
    lineChart = document.getElementById('lineChart');

let bar = new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Valor Contratado (em milhões)',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let line = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Superavit (em milhões)',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});


function createChart(id) {
    bar.destroy();
    line.destroy();

    // bar.data.datasets.data = [0, 0, 0, 0, 0, 0];
    // bar.update();

    // console.log(bar.data.datasets.data)


    bar = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Valor Contratado (em milhões)',
                data: barCharts[id].data,
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

     line = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: 'Superavit (em milhões)',
              data: barCharts[id].data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
        }
    });
}

let popupContent;

const map = L.map('map', {
    center: [-19.8, -40.6],
    zoom: 7,
    minZoom: 7,
    maxZoom: 8,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
}).addTo(map);

for (let i = 0; i < cidades.length; i++) {

    popupContent = /*html*/`<p>${cidades[i].nome}</p>`;

    L.marker([cidades[i].lat, cidades[i].lon]).bindPopup(popupContent).addTo(map);
}

map.on('popupopen', function (e) {
    let marker = e.popup._source._popup._content,
        anchor = marker.substring(
            marker.indexOf('>') + 1,
            marker.lastIndexOf('</'));

    let cidade = cidades.find(item => item.nome === anchor),
        cidadeId = cidade.id;

    createChart(cidadeId);

});


