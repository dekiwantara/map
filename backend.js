const express = require('express');
const app = express();
const path = require('path');
const geoip = require('geoip-lite');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/process-ip', (req, res) => {
    const data = [
        {
            penerima: '123.45.67.89',
            penerimaCountry: '',
            penerimaLatitude: 0,
            penerimaLongitude: 0,
            pengirim: '98.76.54.32',
            pengirimCountry: '',
            pengirimLatitude: 0,
            pengirimLongitude: 0
        },
        // Tambahkan data IP lainnya di sini
    ];

    for (let i = 0; i < data.length; i++) {
        const penerimaGeo = geoip.lookup(data[i].penerima);
        const pengirimGeo = geoip.lookup(data[i].pengirim);

        if (penerimaGeo) {
            data[i].penerimaCountry = penerimaGeo.country || '';
            data[i].penerimaLatitude = penerimaGeo.ll[0] || 0;
            data[i].penerimaLongitude = penerimaGeo.ll[1] || 0;
        }

        if (pengirimGeo) {
            data[i].pengirimCountry = pengirimGeo.country || '';
            data[i].pengirimLatitude = pengirimGeo.ll[0] || 0;
            data[i].pengirimLongitude = pengirimGeo.ll[1] || 0;
        }
    }

    res.json(data);
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
