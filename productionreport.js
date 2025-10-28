// Dummy production dataset (date-wise and area-wise)
const dummyProduction = [
  { area: "Gulshan", date: "2025-10-25", base: 120, extra: 10 },
  { area: "Johar", date: "2025-10-25", base: 80, extra: 5 },
  { area: "DHA", date: "2025-10-25", base: 150, extra: 20 },
  { area: "Clifton", date: "2025-10-25", base: 100, extra: 8 },

  { area: "Gulshan", date: "2025-10-26", base: 130, extra: 15 },
  { area: "Johar", date: "2025-10-26", base: 85, extra: 10 },
  { area: "DHA", date: "2025-10-26", base: 160, extra: 25 },
  { area: "Clifton", date: "2025-10-26", base: 105, extra: 12 },

  { area: "Gulshan", date: "2025-10-27", base: 125, extra: 5 },
  { area: "Johar", date: "2025-10-27", base: 90, extra: 10 },
  { area: "DHA", date: "2025-10-27", base: 155, extra: 15 },
  { area: "Clifton", date: "2025-10-27", base: 110, extra: 8 },
];

function filterReport() {
  const date = document.getElementById("reportDate").value;
  const area = document.getElementById("reportArea").value;
  const tbody = document.querySelector("#reportTable tbody");

  let filtered = dummyProduction;

  if (date) {
    filtered = filtered.filter(rec => rec.date === date);
  }

  if (area !== "All") {
    filtered = filtered.filter(rec => rec.area === area);
  }

  tbody.innerHTML = "";
  let total = 0;

  filtered.forEach((rec, i) => {
    const totalBottles = rec.base + rec.extra;
    total += totalBottles;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${rec.area}</td>
        <td>${rec.date}</td>
        <td>${rec.base}</td>
        <td>${rec.extra}</td>
        <td>${totalBottles}</td>
      </tr>`;
  });

  document.getElementById("grandTotal").innerText = total;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No data found for selected filters</td></tr>`;
  }
}

// ✅ Excel Export
function exportToExcel() {
  const table = document.getElementById("reportTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Production Report" });
  XLSX.writeFile(wb, "Production_Report.xlsx");
}

// ✅ Print Report
function printReport() {
  const tableHTML = document.getElementById("reportTable").outerHTML;
  const date = new Date().toLocaleDateString();
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
        tfoot td { font-weight: bold; background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h2>Wasooli AAB – Production Report</h2>
      <p><strong>Generated on:</strong> ${date}</p>
      ${tableHTML}
    </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}

// ✅ Initialize
document.addEventListener("DOMContentLoaded", filterReport);
