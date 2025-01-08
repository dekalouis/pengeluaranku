// buat fungsionalitas ---
// Database awal untuk pengetesan

let expenses = [
  {
    id: Date.now() + 1,
    name: "Belanja bulanan",
    amount: 1500000,
    date: "2025-01-01",
    category: "Kebutuhan Pokok",
  },
  {
    id: Date.now() + 2,
    name: "Gojek ke kantor",
    amount: 35500,
    date: "2025-01-01",
    category: "Transportasi",
  },
];

const formPengeluaran = document.getElementById("form-pengeluaran");

//1. bikin fungsi tambah pengeluaran (reset) - Deka
function addPengeluaran() {
  const name = document.getElementById("nama-pengeluaran").value;
  const amount = Number(document.getElementById("jumlah-pengeluaran").value);
  const date = document.getElementById("tanggal-pengeluaran").value;
  const category = document.getElementById("kategori-pengeluaran").value;
  //   console.log(name, amount, date, category);
  if (!name || !amount || !category || !date) {
    alert(`Isi dulu yuk datanya!`);
  }

  let pengeluaran = {
    id: Date.now(),
    name,
    amount,
    category,
    date,
  };

  console.log(pengeluaran);
  expenses.push(pengeluaran);
  formPengeluaran.reset();
}

//2. function render buat displaynya update - Rian

//3. bikin CRUDnya buat add/edit/delete dll2 - Thomy

//4. bikin function filternya - Raden

//5. yang styling coba dr luar yaaa ekekkekek - Resya
