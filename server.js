const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/process-ip', (req, res) => {
    // Simulasi data IP dari backend dengan kolom penerima dan pengirim terpisah
    const data = [
        { penerima: '192.168.1.1', pengirim: '203.0.113.0', penerimaCountry: 'ID', pengirimCountry: 'US', penerimaLatitude: -6.2088, penerimaLongitude: 106.8456, pengirimLatitude: 37.7749, pengirimLongitude: -122.4194 },
        { penerima: '203.0.113.0', pengirim: '195.154.123.45', penerimaCountry: 'US', pengirimCountry: 'FR', penerimaLatitude: 37.7749, penerimaLongitude: -122.4194, pengirimLatitude: 48.8566, pengirimLongitude: 2.3522 },
        // Tambahkan data IP lainnya di sini
    ];

    res.json(data);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});