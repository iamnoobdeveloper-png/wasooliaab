// Dummy expense report data
const dummyExpenses = [
  { head: "Office Expense", subhead: "Stationary", desc: "Purchased paper and pens", amount: 1500, date: "2025-10-25", added: "Ali Raza" },
  { head: "Fuel", subhead: "Diesel", desc: "Generator fuel refill", amount: 3500, date: "2025-10-25", added: "Bilal Ahmed" },
  { head: "Maintenance", subhead: "Vehicle Repair", desc: "Van service and parts", amount: 8200, date: "2025-10-26", added: "Hamza Khan" },
  { head: "Utilities", subhead: "Electricity Bill", desc: "K-Electric office bill", amount: 9500, date: "2025-10-26", added: "Ali Raza" },
  { head: "Fuel", subhead: "Diesel", desc: "Backup generator usage", amount: 2700, date: "2025-10-27", added: "Bilal Ahmed" },
  { head: "Office Expense", subhead: "Stationary", desc: "Printer cartridge refill", amount: 1200, date: "2025-10-27", added: "Hamza Khan" },
];

function showReport() {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const head = document.getElementById("headSelect").value;
  const subHead = document.getElementById("subHeadSelect").value;

  const tbody = document.querySelector("#expenseTable tbody");
  const reportSection = document.getElementById("reportSection");
  const excelBtn = document.getElementById("excelBtn");
  const printBtn = document.getElementById("printBtn");

  // Validation
  if (!fromDate || !toDate || !head || !subHead) {
    reportSection.style.display = "none";
    excelBtn.style.display = "none";
    printBtn.style.display = "none";
    alert("⚠️ Please select From Date, To Date, Head and Sub Head to view report.");
    return;
  }

  // Filter dummy data
  const filtered = dummyExpenses.filter(
    rec => rec.head === head && rec.subhead === subHead
  );

  tbody.innerHTML = "";
  let total = 0;

  filtered.forEach((rec, i) => {
    total += rec.amount;
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${rec.head}</td>
        <td>${rec.subhead}</td>
        <td>${rec.desc}</td>
        <td>${rec.amount}</td>
        <td>${rec.date}</td>
        <td>${rec.added}</td>
      </tr>`;
  });

  document.getElementById("totalAmount").innerText = total;

  // Show report only when data found
  reportSection.style.display = "block";
  excelBtn.style.display = "inline-block";
  printBtn.style.display = "inline-block";

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No data found for selected filters</td></tr>`;
  }
}

// ✅ Export to Excel
function exportToExcel() {
  const table = document.getElementById("expenseTable");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Expense Report" });
  XLSX.writeFile(wb, "Expense_Report.xlsx");
}

// ✅ Print Report
function printReport() {
  const tableHTML = document.getElementById("expenseTable").outerHTML;
  const date = new Date().toLocaleDateString();
  const w = window.open("", "", "height=900,width=1200");

  w.document.write(`
    <html>
    <head>
      <title>Expense Report</title>
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
      <h2>Wasooli AAB – Expense Report</h2>
      <p><strong>Generated on:</strong> ${date}</p>
      ${tableHTML}
    </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}
