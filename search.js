document.getElementById('city-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah pengiriman form default
    const city = document.getElementById('city-input').value; // Mendapatkan nama kota

    // Simpan nama kota ke localStorage
    localStorage.setItem('city', city);

    // Arahkan ke halaman cuaca
    window.location.href = 'index.html'; 
});
