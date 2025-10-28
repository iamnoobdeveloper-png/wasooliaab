// Dummy bottle counts per area
const dummyBottleCounts = {
  Gulshan: 120,
  Johar: 95,
  DHA: 150,
  Clifton: 110
};

const gatePassRecords = [];

// ✅ Set Dummy Bottle Count on Area Selection
function setDummyBottleCount() {
  const area = document.getElementById("areaSelect").value;
  const bottleInput = document.getElementById("baseBottleCount");
  if (area && dummyBottleCounts[area] !== undefined) {
    bottleInput.value = dummyBottleCounts[area];
  } else {
    bottleInput.value = "";
  }
}

// ✅ Generate and Save Gate Pass
function generateGatePass() {
  const area = document.getElementById("areaSelect").value;
  const base = parseInt(document.getElementById("baseBottleCount").value) || 0;
  const extra = parseInt(document.getElementById("extraBottles").value) || 0;
  const salesPerson = document.getElementById("salesPerson").value;

  if (!area) return alert("⚠️ Please select an Area.");
  if (!salesPerson) return alert("⚠️ Please select a Sales Person.");

  gatePassRecords.push({
    area,
    base,
    extra,
    salesPerson
  });

  updateGatePassTable();

  alert(`✅ Gate Pass Generated for ${area}\nTotal Bottles: ${base + extra}`);

  // Reset inputs
  document.getElementById("areaSelect").value = "";
  document.getElementById("baseBottleCount").value = "";
  document.getElementById("extraBottles").value = "";
  document.getElementById("salesPerson").value = "";
}

// ✅ Update Records Table
function updateGatePassTable() {
  const tbody = document.querySelector("#gatePassTable tbody");
  tbody.innerHTML = "";
  gatePassRecords.forEach((rec, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${rec.area}</td>
        <td>${rec.base}</td>
        <td>${rec.extra}</td>
        <td>${rec.salesPerson}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteRecord(${i})">Delete</button></td>
      </tr>`;
  });
}

// ✅ Delete Record
function deleteRecord(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    gatePassRecords.splice(index, 1);
    updateGatePassTable();
  }
}

// ✅ Print Summary
function printGatePass() {
  if (gatePassRecords.length === 0) {
    alert("⚠️ No gate pass records to print.");
    return;
  }

  const date = new Date().toLocaleDateString();
  let rows = gatePassRecords.map(
    (r, i) =>
      `<tr><td>${i + 1}</td><td>${r.area}</td><td>${r.base}</td><td>${r.extra}</td><td>${r.salesPerson}</td></tr>`
  ).join("");

  const w = window.open("", "", "height=900,width=1200");
  w.document.write(`
    <html><head><title>Gate Pass Summary</title>
    <style>
      body { font-family: Arial; margin: 40px; }
      h2 { color: #2196f3; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
      th { background-color: #f1f5ff; }
    </style>
    </head><body>
      <h2>Wasooli AAB – Gate Pass Summary</h2>
      <p><strong>Date:</strong> ${date}</p>
      <table>
        <thead><tr><th>#</th><th>Area</th><th>Bottle Count</th><th>Extra Bottles</th><th>Sales Person</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body></html>`);
  w.document.close();
  w.focus();
  w.print();
}