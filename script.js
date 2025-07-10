// Cek apakah pengguna sudah login
function checkAuth() {
  const user = localStorage.getItem("user");
  if (!user && window.location.pathname !== "/register.html") {
    window.location.href = "index.html";
  }
}

// Fungsi login
function login() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username] && users[username] === password) {
    localStorage.setItem("user", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}

// Fungsi registrasi
function register() {
  const username = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("Username sudah terdaftar.");
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "index.html";
  }
}

// Simpan data mahasiswa
function simpanData() {
  const nrp = document.getElementById("nrp").value;
  const nama = document.getElementById("nama").value;
  const departemen = document.getElementById("departemen").value;
  const ukm = document.getElementById("ukm").value;

  if (!nrp || !nama || !departemen || !ukm) {
    alert("Semua kolom harus diisi!");
    return;
  }

  const data = { nrp, nama, departemen, ukm };
  const dataList = JSON.parse(localStorage.getItem("mahasiswa")) || [];
  dataList.push(data);
  localStorage.setItem("mahasiswa", JSON.stringify(dataList));

  alert("Data berhasil disimpan!");
  tampilkanData();
}

// Tampilkan data mahasiswa
function tampilkanData() {
  const list = document.getElementById("dataList");
  list.innerHTML = "";
  const dataList = JSON.parse(localStorage.getItem("mahasiswa")) || [];

  if (dataList.length === 0) {
    list.innerHTML = "<li>Belum ada data.</li>";
    return;
  }

  dataList.forEach((item, idx) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - NRP: ${item.nrp}, Departemen: ${item.departemen}, UKM: ${item.ukm}`;
    list.appendChild(li);
  });
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// Jalankan saat halaman dimuat
window.onload = () => {
  if (window.location.pathname.includes("dashboard.html")) {
    checkAuth();
    tampilkanData();
  }
};
