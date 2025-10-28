document.addEventListener("DOMContentLoaded", () => {
  const sidebarHTML = `
  <div class="text-center p-3">
    <img src="LOGO_01-01.png" width="50" alt="logo">
    <h6 class="mt-2 text-white">Wasooli AAB</h6>
  </div>

  <ul class="p-0 m-0 text-white" style="list-style:none;">
    <li onclick="window.location.href='dashboard.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-tachometer-alt me-2"></i> Dashboard
    </li>

    <li onclick="window.location.href='company.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-building me-2"></i> Company Profile
    </li>

    <!-- Master Menu -->
    <li class="master-menu px-3">
      <div class="d-flex justify-content-between align-items-center py-2" style="cursor:pointer;">
        <span><i class="fas fa-database me-2"></i> Master</span>
        <i class="fas fa-chevron-down toggle-icon" style="font-size:12px;"></i>
      </div>
      <ul class="sub-menu mt-2" style="display:none; list-style:none; padding-left:15px;">
        <li onclick="window.location.href='packages.html'" class="py-1"><i class="fas fa-box me-2"></i> Packages</li>
        <li onclick="window.location.href='areas.html'" class="py-1"><i class="fas fa-map-marked-alt me-2"></i> Areas</li>
        <li onclick="window.location.href='inventory.html'" class="py-1"><i class="fas fa-warehouse me-2"></i> Inventory</li>
        <li onclick="window.location.href='employees.html'" class="py-1"><i class="fas fa-user-friends me-2"></i> Employees</li>
        <li onclick="window.location.href='areaallocation.html'" class="py-1"><i class="fas fa-network-wired me-2"></i> Area Allocation</li>
      </ul>
    </li>

    <li onclick="window.location.href='client.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-user-circle me-2"></i> Client Profile
    </li>
    <li onclick="window.location.href='production.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-industry me-2"></i> Production
    </li>
    <li onclick="window.location.href='gatepass.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-ticket-alt me-2"></i> Gate Pass
    </li>
    <li onclick="window.location.href='transaction.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-list-ul me-2"></i> Bulk Option
    </li>
    <li onclick="window.location.href='collection.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-hand-holding-usd me-2"></i> Collection
    </li>
    <li onclick="window.location.href='accounthead.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-book me-2"></i> Accounts Head
    </li>
    <li onclick="window.location.href='accountenrty.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-file-invoice-dollar me-2"></i> Accounts Entry
    </li>
    <li onclick="window.location.href='productionrpt.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-chart-bar me-2"></i> Production Report
    </li>
    <li onclick="window.location.href='collectionrpt.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-clipboard-list me-2"></i> Collection Report
    </li>
    <li onclick="window.location.href='expensereport.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-money-check-alt me-2"></i> Accounts Report
    </li>
    <li onclick="window.location.href='admincollection.html'" class="py-2 px-3 d-flex align-items-center">
      <i class="fas fa-users-cog me-2"></i> Admin Collection
    </li>
    <li class="py-2 px-3 d-flex align-items-center"><i class="fas fa-envelope me-2"></i> Messages</li>
    <li class="py-2 px-3 d-flex align-items-center"><i class="fas fa-cog me-2"></i> Settings</li>
  </ul>
  `;

  document.querySelector(".sidebar").innerHTML = sidebarHTML;

  // Collapsible sub-menu
  document.querySelectorAll(".master-menu > div").forEach(menu => {
    menu.addEventListener("click", () => {
      const subMenu = menu.parentElement.querySelector(".sub-menu");
      const icon = menu.querySelector(".toggle-icon");
      const isOpen = subMenu.style.display === "block";
      document.querySelectorAll(".sub-menu").forEach(s => s.style.display = "none");
      document.querySelectorAll(".toggle-icon").forEach(i => i.style.transform = "rotate(0deg)");
      if (!isOpen) {
        subMenu.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
