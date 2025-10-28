// Dummy client data
const clients = [
  { name: "Imran Khan", area: "Gulshan", sales: "Ali Raza", pending: [{ month: "Oct 2025", amount: 2500, status: "Pending" }] },
  { name: "Asad Ahmed", area: "Johar", sales: "Bilal Ahmed", pending: [{ month: "Oct 2025", amount: 1800, status: "Pending" }] },
  { name: "Hamza Tariq", area: "DHA", sales: "Hamza Khan", pending: [{ month: "Oct 2025", amount: 3200, status: "Pending" }] },
  { name: "Taha Siddiqui", area: "Clifton", sales: "Ali Raza", pending: [{ month: "Oct 2025", amount: 2900, status: "Pending" }] },
];

let selectedClient = null;
let receivedCollections = [];

function showClients() {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const area = document.getElementById("areaSelect").value;
  const sales = document.getElementById("salesPersonSelect").value;
  const list = document.getElementById("clientList");

  if (!fromDate || !toDate || !area || !sales) {
    alert("⚠️ Please select all filters first.");
    return;
  }

  list.innerHTML = "";
  const filtered = clients.filter(c => (area === "" || c.area === area) && (sales === "" || c.sales === sales));

  filtered.forEach((c, i) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor:pointer;" onclick="loadClient(${i})">
        <span>${c.name}</span>
        <span class="badge bg-primary">${c.pending[0].status}</span>
      </li>`;
  });
}

function loadClient(index) {
  selectedClient = clients[index];
  document.getElementById("clientInfo").style.display = "block";
  document.getElementById("clientName").innerText = selectedClient.name;
  document.getElementById("clientArea").innerText = selectedClient.area;
  document.getElementById("clientSales").innerText = selectedClient.sales;

  const tbody = document.querySelector("#pendingTable tbody");
  tbody.innerHTML = "";
  selectedClient.pending.forEach(p => {
    tbody.innerHTML += `<tr><td>${p.month}</td><td>${p.amount}</td><td>${p.status}</td></tr>`;
  });
}

function openCollectionModal() {
  if (!selectedClient) return alert("Please select a client first.");

  document.getElementById("modalClient").value = selectedClient.name;
  document.getElementById("modalAmount").value = selectedClient.pending[0].amount;

  const modal = new bootstrap.Modal(document.getElementById("collectModal"));
  modal.show();
}

function receiveCollection() {
  const newAmount = parseFloat(document.getElementById("modalAmount").value);
  if (isNaN(newAmount) || newAmount <= 0) return alert("Please enter a valid amount.");

  const date = new Date().toLocaleDateString();

  receivedCollections.push({
    name: selectedClient.name,
    month: selectedClient.pending[0].month,
    amount: newAmount,
    date,
  });

  // Update received table
  const section = document.getElementById("receivedSection");
  const tbody = document.querySelector("#receivedTable tbody");
  section.style.display = "block";

  tbody.innerHTML = "";
  receivedCollections.forEach(r => {
    tbody.innerHTML += `<tr><td>${r.month}</td><td>${r.amount}</td><td>${r.date}</td></tr>`;
  });

  // Update pending status
  selectedClient.pending[0].status = "Received";
  loadClient(clients.indexOf(selectedClient));

  const modalEl = document.getElementById("collectModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}
