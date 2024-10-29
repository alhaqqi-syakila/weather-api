document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd82c9e8da2604929b1a02241242910'; // Ganti dengan API key kamu
    const city = localStorage.getItem('city') || 'Sukabumi'; // Ambil nama kota dari localStorage
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const translations = {
        "Clear": "Cerah",
        "Partly Cloudy": "Cerah berawan",
        "Partly cloudy": "Cerah berawan",
        "Overcast": "Mendung",
        "Rain": "Hujan",
        "Thunderstorm": "Guntur",
        "Snow": "Salju",
        "Mist": "Kabut",
        "Fog": "Kabut",
        "Patchy rain nearby": 'Hujan merata',
        "Sunny": 'Cerah',
        "Light rain": 'Hujan ringan'
    };

    const notesByCondition = {
        "Cerah": "Hari ini sangat cerah dan menyenangkan! Sangat ideal untuk kegiatan luar ruangan seperti berolahraga, berjalan-jalan, atau piknik bersama teman dan keluarga. Jangan lupa untuk memakai sunscreen agar kulitmu terlindungi dari sinar matahari yang langsung.",
        "Cerah berawan": "Cuaca cerah berawan hari ini. Ini adalah waktu yang baik untuk melakukan aktivitas luar ruangan tanpa khawatir terlalu panas. Mungkin kamu bisa pergi ke taman atau melakukan hobi di luar.",
        "Mendung": "Hari ini terlihat mendung, dan ada kemungkinan hujan. Sebaiknya bawa payung atau jas hujan jika kamu berencana untuk keluar. Namun, ini adalah waktu yang bagus untuk bersantai di dalam rumah dan menikmati film atau membaca buku.",
        "Hujan ringan": "Ini adalah waktu yang baik untuk menikmati suasana yang sejuk dan segar. Mungkin kamu bisa berjalan-jalan di sekitar lingkungan dengan payung, atau duduk di jendela sambil menikmati secangkir kopi hangat. Ini juga saat yang tepat untuk membaca buku atau menonton film favorit di rumah.",
        "Hujan": "Hujan turun dengan deras hari ini. Ini adalah kesempatan yang baik untuk bersantai di dalam rumah, menikmati secangkir teh hangat, atau melakukan aktivitas kreatif seperti melukis atau menulis. Pastikan untuk tidak keluar tanpa payung.",
        "Guntur": "Hati-hati! Ada badai yang mungkin akan datang. Sebaiknya tetap di dalam rumah dan hindari aktivitas di luar. Manfaatkan waktu ini untuk merencanakan kegiatan di dalam ruangan.",
        "Salju": "Salju turun hari ini! Ini adalah waktu yang sempurna untuk bermain salju, membuat boneka salju, atau hanya menikmati keindahan alam yang bersalju. Pastikan untuk mengenakan pakaian hangat agar tetap nyaman.",
        "Kabut": "Cuaca berkabut hari ini, yang dapat mengurangi visibilitas. Jika kamu harus keluar, berhati-hatilah dan pastikan untuk mengemudi dengan hati-hati. Ini bisa menjadi kesempatan yang baik untuk menikmati suasana tenang di dalam rumah.",
        "Hujan merata": "Hujan merata sepanjang hari. Ini adalah waktu yang sempurna untuk berdiam di rumah, mungkin menyiapkan makanan hangat atau menonton film favorit. Nikmati suasana hujan dari jendela sambil bersantai."
    };

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Kota tidak tersedia');
            }
            return res.json();
        })
        .then(data => {
            // Menampilkan data cuaca
            document.querySelector('.kota').innerHTML = `${data.location.name}`;
            
            const condition = data.current.condition.text;
            const translatedCondition = translations[condition] || condition;
            document.querySelector('.deskripsi').innerHTML = `<p>${translatedCondition}</p>`;
            document.querySelector('.suhu').innerHTML = `<p>${Math.round(data.current.temp_c)}°</p>`;
            
            // Menampilkan informasi lainnya (angin, kelembaban, visibilitas)
            document.querySelector('.angin-val').innerHTML = `${data.current.wind_kph} Kp/h`;
            document.querySelector('.lembab-val').innerHTML = `${data.current.humidity}%`;
            document.querySelector('.visiblitas-val').innerHTML = `${data.current.vis_km} Km`;
            
            // Catatan harian
            const note = notesByCondition[translatedCondition] || "Tidak ada catatan untuk kondisi ini.";
            document.querySelector('.text-catatan').innerHTML = note;
        })
        .catch(error => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });

    // Menampilkan tanggal
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);
    document.querySelector('.tanggal').innerHTML = formattedDate;
});
