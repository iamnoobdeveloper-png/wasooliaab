// Dummy bottle counts per area
const dummyBottleCounts = {
  Gulshan: 120,
  Johar: 90,
  DHA: 150,
  Clifton: 110
};

let productionRecords = [];

// ✅ Show dummy count when area changes
function updateBottleCount() {
  const area = document.getElementById("areaSelect").value;
  const countField = document.getElementById("bottleCount");
  if (area && dummyBottleCounts[area] !== undefined) {
    countField.value = dummyBottleCounts[area];
  } else {
    countField.value = "";
  }
}

// ✅ Save production record
function saveProduction() {
  const area = document.getElementById("areaSelect").value;
  const base = parseInt(document.getElementById("bottleCount").value) || 0;
  const extra = parseInt(document.getElementById("extraBottles").value) || 0;
  const total = base + extra;

  if (!area) return alert("⚠️ Please select an Area first.");
  if (base === 0) return alert("⚠️ Invalid bottle count for this area.");

  productionRecords.push({
    area,
    base,
    extra,
    total
  });

  updateTable();
  updateSummary();
  alert(`✅ ${total} bottles produced for ${area}`);

  // Reset fields
  document.getElementById("areaSelect").value = "";
  document.getElementById("bottleCount").value = "";
  document.getElementById("extraBottles").value = "";
}

// ✅ Update Table with records
function updateTable() {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";
  productionRecords.forEach((rec, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${rec.area}</td>
        <td>${rec.base}</td>
        <td>${rec.extra}</td>
        <td>${rec.total}</td>
      </tr>`;
  });
}

// ✅ Update summary cards
function updateSummary() {
  const todayTotal = productionRecords.reduce((sum, r) => sum + r.total, 0);
  document.getElementById("todayCount").innerText = todayTotal;
  document.getElementById("tomorrowCount").innerText = todayTotal + 50; // dummy next day growth
}

// ✅ Print Production Report
function printReport() {
  if (productionRecords.length === 0) {
    alert("⚠️ No production records to print.");
    return;
  }

  const date = new Date().toLocaleDateString();
  const rows = productionRecords
    .map(
      (r, i) =>
        `<tr><td>${i + 1}</td><td>${r.area}</td><td>${r.base}</td><td>${r.extra}</td><td>${r.total}</td></tr>`
    )
    .join("");

  const w = window.open("", "", "height=900,width=1200");
  w.document.write(`
    <html>
    <head>
      <title>Production Report</title>
      <style>
        body { font-family: Arial; margin: 40px; }
        h2 { color: #2196f3; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background-color: #f1f5ff; }
      </style>
    </head>
    <body>
      <h2>Wasooli AAB – Production Report</h2>
      <p><strong>Date:</strong> ${date}</p>
      <table>
        <thead><tr><th>#</th><th>Area</th><th>Bottle Count</th><th>Extra Bottles</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}