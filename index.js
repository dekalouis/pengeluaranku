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
  {
    id: Date.now() + 2,
    name: "Nonton",
    amount: 325500,
    date: "2025-02-02",
    category: "Hiburan",
  },
  {
    id: Date.now() + 2,
    name: "Hotel",
    amount: 65500,
    date: "2025-03-03",
    category: "Kebutuhan Pokok",
  },
  {
    id: Date.now() + 2,
    name: "Nasi Padang",
    amount: 35500,
    date: "2025-04-04",
    category: "Makanan",
  },
];

const formPengeluaran = document.getElementById("form-pengeluaran");
const listPengeluaran = document.getElementById("list-pengeluaran");
const totalPengeluaran = document.getElementById("total-pengeluaran");
const filterKategori = document.getElementById("filter-category")

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
    return;
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

<td>Rp ${perPengeluaran.amount.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</td>

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
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  // totalPengeluaran.textContent = `Rp ${total.toFixed(2)}`;
  totalPengeluaran.textContent = `Rp ${total.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

//3. bikin CRUDnya buat add/edit/delete dll2 - Thomy

//4. bikin function filternya - Raden
function filterAllKategori() {
  const category = filterKategori.value;
  if (category === "Semua") {
    tampilkanPengeluaran(expenses);
  } else {
    const filteredKategori = expenses.filter(
      (expenses) => expenses.category === category
    );
    tampilkanPengeluaran(filteredKategori);
  }
}
 // filter unique value
getUniqueValuesFromColumn() 

function getUniqueValuesFromColumn() {
  let unique_col_values_dict = {}

  allFilters = document.querySelectorAll(".table-filter")
  allFilters.forEach((expenses) => {
    col_index = expenses.parentElement.getAttribute("col-index")
    // alert(col_index)
    const rows = document.querySelectorAll("#table-pengeluaran > tbody > tr")

    rows.forEach((row) => {
      cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML

      if (col_index in unique_col_values_dict) {
        if (unique_col_values_dict[col_index].includes(cell_value)) {
          // alert(cell_value + "is already : " + unique_col_values_dict[col_index])
        } else {
          unique_col_values_dict[col_index].push(cell_value)
          // alert("Array after adding cell value : " + unique_col_values_dict[col_index])
        }
      } else {
        unique_col_values_dict[col_index] = new Array(cell_value)
      }

    });
  });

  for (i in unique_col_values_dict) {
    // alert("column index : " + i + " has unique values : \n" + unique_col_values_dict[i]);
  }

  updateSelectOptions(unique_col_values_dict)

};

function updateSelectOptions(unique_col_values_dict) {
  allFilters =  document.querySelectorAll(".table-filter")

  allFilters.forEach((filter_i) => {
    col_index = filter_i.parentElement.getAttribute('col-index')

    unique_col_values_dict[col_index].forEach((i) => {
      filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
    });
  });
};


function filter_rows() {
  allFilters = document.querySelectorAll(".table-filter")
  let filter_value_dict = {}

  allFilters.forEach((filter_i) => {
      col_index = filter_i.parentElement.getAttribute('col-index')

      value = filter_i.value
      if (value != "all") {
          filter_value_dict[col_index] = value;
      }
  });

  let col_cell_value_dict = {};

  const rows = document.querySelectorAll("#table-pengeluaran tbody tr");
  rows.forEach((row) => {
      let display_row = true;

      allFilters.forEach((filter_i) => {
          col_index = filter_i.parentElement.getAttribute('col-index')
          col_cell_value_dict[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
      })

      for (let col_i in filter_value_dict) {
          filter_value = filter_value_dict[col_i]
          row_cell_value = col_cell_value_dict[col_i]
          
          if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
              display_row = false;
              break;
          }
      }
      if (display_row == true) {
          row.style.display = "table-row"
      } else {
          row.style.display = "none"
      }
  })

}

//5. yang styling coba dr luar yaaa ekekkekek - Resya
