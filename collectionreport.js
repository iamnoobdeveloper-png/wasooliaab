// Dummy collection report data
const dummyCollection = [
  { name: "Imran Khan", address: "Block 10, Gulshan", delivered: 10, received: 8, paid: 1800, balance: 200, area: "Gulshan", sales: "Ali Raza" },
  { name: "Asad Ahmed", address: "Block 13, Gulshan", delivered: 12, received: 12, paid: 2000, balance: 0, area: "Gulshan", sales: "Ali Raza" },
  { name: "Hamza Tariq", address: "Block 9, Johar", delivered: 15, received: 13, paid: 2500, balance: 300, area: "Johar", sales: "Bilal Ahmed" },
  { name: "Taha Siddiqui", address: "Phase 6, DHA", delivered: 20, received: 18, paid: 3500, balance: 500, area: "DHA", sales: "Hamza Khan" },
  { name: "Umar Farooq", address: "Block 2, Clifton", delivered: 14, received: 14, paid: 2800, balance: 0, area: "Clifton", sales: "Bilal Ahmed" },
  { name: "Zain Abbas", address: "Phase 5, DHA", delivered: 10, received: 9, paid: 1900, balance: 100, area: "DHA", sales: "Ali Raza" },
];

function showReport() {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const area = document.getElementById("areaSelect").value;
  const sales = document.getElementById("salesPersonSelect").value;
  const tbody = document.querySelector("#collectionTable tbody");
  const reportSection = document.getElementById("reportSection");
  const excelBtn = document.getElementById("excelBtn");
  const printBtn = document.getElementById("printBtn");

  // Validation
  if (!fromDate || !toDate || !area || !sales) {
    reportSection.style.display = "none";
    excelBtn.style.display = "none";
    printBtn.style.display = "none";
    alert("⚠️ Please select From Date, To Date, Area, and Sales Person to view report.");
    return;
  }

  // Dummy filter logic (in real scenario, fetch API call)
  const filtered = dummyCollection.filter(
    rec => rec.area === area && rec.sales === sales
  );

  tbody.innerHTML = "";
  let totalPaid = 0;
  let totalBalance = 0;

  filtered.forEach((rec, i) => {
    totalPaid += rec.paid;
    totalBalance += rec.balance;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${rec.name}</td>
        <td>${rec.address}</td>
        <td>${rec.delivered}</td>
        <td>${rec.received}</td>
        <td>${rec.paid}</td>
        <td>${rec.balance}</td>
        <td>${rec.sales}</td>
      </tr>`;
  });

  document.getElementById("totalPaid").innerText = totalPaid;
  document.getElementById("totalBalance").innerText = totalBalance;

  reportSection.style.display = "block";
  excelBtn.style.display = "inline-block";
  printBtn.style.display = "inline-block";

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No data found for selected filters</td></tr>`;
  }
}

// ✅ Excel Export
function exportToExcel() {
  const table = document.getElementById("collectionTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Collection Report" });
  XLSX.writeFile(wb, "Collection_Report.xlsx");
}

// ✅ Print Report
function printReport() {
  const tableHTML = document.getElementById("collectionTable").outerHTML;
  const date = new Date().toLocaleDateString();
  const w = window.open("", "", "height=900,width=1200");

  w.document.write(`
    <html>
    <head>
      <title>Collection Report</title>
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
      <h2>Wasooli AAB – Collection Report</h2>
      <p><strong>Generated on:</strong> ${date}</p>
      ${tableHTML}
    </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}