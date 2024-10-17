// Data awal dalam bentuk array
let catches = [
    { id: 1, fishType: 'Ikan Tuna', weight: 15, dateCaught: '2024-10-01' },
    { id: 2, fishType: 'Ikan Salmon', weight: 8, dateCaught: '2024-10-05' },
];

// Fungsi untuk render data ke dalam tabel
function renderTable() {
    const tableBody = document.getElementById("catchTableBody");
    tableBody.innerHTML = "";  // Kosongkan tabel sebelum render
    catches.forEach((catchItem, index) => {
        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${catchItem.fishType}</td>
            <td>${catchItem.weight} kg</td>
            <td>${catchItem.dateCaught}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCatch(${catchItem.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCatch(${catchItem.id})">Delete</button>
            </td>
        </tr>`;
    });
}

// Fungsi untuk menambah hasil tangkapan baru
function addCatch() {
    const fishType = document.getElementById("fishType").value;
    const weight = document.getElementById("weight").value;
    const dateCaught = document.getElementById("dateCaught").value;
    
    const newCatch = {
        id: catches.length + 1,
        fishType: fishType,
        weight: parseFloat(weight),
        dateCaught: dateCaught
    };
    
    catches.push(newCatch);
    renderTable();
    clearForm();
}

// Fungsi untuk mengedit hasil tangkapan
function editCatch(id) {
    const catchItem = catches.find(c => c.id === id);
    document.getElementById("fishType").value = catchItem.fishType;
    document.getElementById("weight").value = catchItem.weight;
    document.getElementById("dateCaught").value = catchItem.dateCaught;
    document.getElementById("catchId").value = catchItem.id;
}

// Fungsi untuk memperbarui hasil tangkapan
function updateCatch() {
    const id = parseInt(document.getElementById("catchId").value);
    const fishType = document.getElementById("fishType").value;
    const weight = document.getElementById("weight").value;
    const dateCaught = document.getElementById("dateCaught").value;
    
    const catchIndex = catches.findIndex(c => c.id === id);
    catches[catchIndex] = { id: id, fishType: fishType, weight: parseFloat(weight), dateCaught: dateCaught };
    renderTable();
    clearForm();
}

// Fungsi untuk menghapus hasil tangkapan
function deleteCatch(id) {
    catches = catches.filter(c => c.id !== id);
    renderTable();
}

// Fungsi untuk mengosongkan form
function clearForm() {
    document.getElementById("fishType").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("dateCaught").value = "";
    document.getElementById("catchId").value = "";
}

// Fungsi untuk menangani form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("catchId").value;
    if (id) {
        updateCatch();
    } else {
        addCatch();
    }
}

// Menjalankan fungsi untuk menampilkan tabel saat halaman dimuat
window.onload = function () {
    const form = document.getElementById("catchForm");
    form.addEventListener("submit", handleFormSubmit);
    renderTable();
};
