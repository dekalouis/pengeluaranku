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
const listPengeluaran = document.getElementById("list-pengeluaran");
const totalPengeluaran = document.getElementById("total-pengeluaran");

tampilkanPengeluaran(expenses);
updateTotalPengeluaran();

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
  tampilkanPengeluaran(expenses);
  updateTotalPengeluaran();
  formPengeluaran.reset();
}

//2. function render buat displaynya update - Rian
function tampilkanPengeluaran(pengeluaran) {
  listPengeluaran.innerHTML = "";
  pengeluaran.forEach((perPengeluaran) => {
    const baris = document.createElement("tr");

    baris.innerHTML = `
    <td>${perPengeluaran.name}</td>
      <td>Rp ${perPengeluaran.amount.toFixed(2)}</td>
      <td>${perPengeluaran.category}</td>
      <td>${perPengeluaran.date}</td>
      <td>
        <button onclick="editPengeluaran(${
          perPengeluaran.id
        })" class="button">Edit</button>
        <button onclick="hapusPengeluaran(${
          perPengeluaran.id
        })" class="button"">Delete</button>
      </td>
    `;

    listPengeluaran.appendChild(baris);
  });
}

function updateTotalPengeluaran() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalPengeluaran.textContent = total.toFixed(2);
}

//3. bikin CRUDnya buat edit/delete dll2 - Thomy
//Fungsi Hapus
function hapusPengeluaran(id) {
  let newExpenses = [];

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      newExpenses.push(expenses[i]);
    }
  }
  expenses = newExpenses;
  tampilkanPengeluaran(expenses);
  updateTotalPengeluaran();
}

//Fungsi Edit
function editPengeluaran(id) {
  let edit = null;

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      edit = expenses[i];
      break;
    }
  }

  document.getElementById("nama-pengeluaran").value = edit.name;
  document.getElementById("jumlah-pengeluaran").value = edit.amount;
  document.getElementById("tanggal-pengeluaran").value = edit.date;
  document.getElementById("kategori-pengeluaran").value = edit.category;

  const submitButton = document.querySelector("button[type='button']");
  submitButton.innerText = "Update";
  submitButton.setAttribute("onclick", `updatePengeluaran(${id})`);
}

//Fungsi Update
function updatePengeluaran(id) {
  const name = document.getElementById("nama-pengeluaran").value;
  const amount = Number(document.getElementById("jumlah-pengeluaran").value);
  const date = document.getElementById("tanggal-pengeluaran").value;
  const category = document.getElementById("kategori-pengeluaran").value;

  if (!name || !amount || !category || !date) {
    alert(`Isi dulu yuk datanya!`);
    return;
  }

  let update = null;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      update = expenses[i];
      break;
    }
  }

  update.name = name;
  update.amount = amount;
  update.date = date;
  update.category = category;

  // Reset tombol kembali ke
  const submitButton = document.querySelector("button[type='button']");
  submitButton.innerText = "+";
  submitButton.setAttribute("onclick", "addPengeluaran()");

  tampilkanPengeluaran(expenses);
  updateTotalPengeluaran();
  formPengeluaran.reset();
}
//4. bikin function filternya - Raden

//5. yang styling coba dr luar yaaa ekekkekek - Resya
