/**
 * NexusAuth Admin Dashboard
 * Manages user accounts, login sessions, realtime stats, lock screen security with passcode "dashboard".
 */

document.addEventListener('DOMContentLoaded', () => {
  // Storage Keys
  const LOG_STORAGE_KEY = 'nexusauth_login_log';
  const ADMIN_PASS_KEY = 'nexusauth_admin_password';
  const ADMIN_AUTH_KEY = 'nexusauth_admin_authenticated';
  const THEME_STORAGE_KEY = 'nexusauth_theme';

  // Default Passcode
  const DEFAULT_CODE = 'dashboard';

  // DOM Elements: Lock Screen
  const lockScreen = document.getElementById('admin-lock-screen');
  const lockForm = document.getElementById('lock-form');
  const adminPasswordInput = document.getElementById('admin-password-input');
  const lockTogglePw = document.getElementById('lock-toggle-pw');
  const lockError = document.getElementById('lock-error');
  const adminShell = document.getElementById('admin-shell');

  // DOM Elements: Sidebar & Navigation
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const adminThemeToggle = document.getElementById('admin-theme-toggle');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  const views = document.querySelectorAll('.admin-view');

  // DOM Elements: Global Search
  const adminGlobalSearch = document.getElementById('admin-global-search');

  // DOM Elements: Stats & Dashboard
  const statTotalNum = document.getElementById('stat-total-num');
  const statTodayNum = document.getElementById('stat-today-num');
  const statGoogleNum = document.getElementById('stat-google-num');
  const statDisabledNum = document.getElementById('stat-disabled-num');
  const statTotalBar = document.getElementById('stat-total-bar');
  const statTodayBar = document.getElementById('stat-today-bar');
  const statGoogleBar = document.getElementById('stat-google-bar');
  const statDisabledBar = document.getElementById('stat-disabled-bar');
  const navUserCount = document.getElementById('nav-user-count');
  const recentLoginsTableWrap = document.getElementById('recent-logins-table-wrap');
  const btnRefreshData = document.getElementById('btn-refresh-data');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const btnExportCsvUsers = document.getElementById('btn-export-csv-users');

  // DOM Elements: Users View & Toolbar
  const usersSearch = document.getElementById('users-search');
  const usersSearchClear = document.getElementById('users-search-clear');
  const filterProvider = document.getElementById('filter-provider');
  const filterStatus = document.getElementById('filter-status');
  const filterTime = document.getElementById('filter-time');
  const filterSort = document.getElementById('filter-sort');
  const viewToggleTable = document.getElementById('view-toggle-table');
  const viewToggleGrid = document.getElementById('view-toggle-grid');
  const usersTableContainer = document.getElementById('users-table-container');
  const usersGridContainer = document.getElementById('users-grid-container');
  const usersTableBody = document.getElementById('users-table-body');
  const usersGridBody = document.getElementById('users-grid-body');
  const tableEmpty = document.getElementById('table-empty');
  const resultShowing = document.getElementById('result-showing');
  const resultTotal = document.getElementById('result-total');
  const paginationBar = document.getElementById('pagination-bar');
  const btnClearAllConfirm = document.getElementById('btn-clear-all-confirm');

  // DOM Elements: Timeline & Settings
  const sessionsTimeline = document.getElementById('sessions-timeline');
  const changePwForm = document.getElementById('change-pw-form');
  const newAdminPw = document.getElementById('new-admin-pw');
  const confirmAdminPw = document.getElementById('confirm-admin-pw');
  const btnResetLogSettings = document.getElementById('btn-reset-log-settings');
  const btnSeedDemo = document.getElementById('btn-seed-demo');
  const sysLogSize = document.getElementById('sys-log-size');
  const sysThemeInfo = document.getElementById('sys-theme-info');

  // DOM Elements: Modal Detail
  const userDetailModal = document.getElementById('user-detail-modal');
  const closeDetailModal = document.getElementById('close-detail-modal');
  const btnModalCloseAction = document.getElementById('btn-modal-close-action');
  const modalAvatar = document.getElementById('modal-avatar');
  const modalName = document.getElementById('modal-name');
  const modalEmail = document.getElementById('modal-email');
  const modalRoleBadge = document.getElementById('modal-role-badge');
  const modalProvider = document.getElementById('modal-provider');
  const modalLoginTime = document.getElementById('modal-login-time');
  const modalIp = document.getElementById('modal-ip');
  const modalStatus = document.getElementById('modal-status');
  const modalSessionId = document.getElementById('modal-session-id');
  const modalHistoryList = document.getElementById('modal-history-list');
  const btnModalDisable = document.getElementById('btn-modal-disable');
  const btnDisableLabel = document.getElementById('btn-disable-label');
  const btnModalDelete = document.getElementById('btn-modal-delete');

  // DOM Elements: Confirm Dialog & Toast
  const confirmDialog = document.getElementById('confirm-dialog');
  const confirmTitle = document.getElementById('confirm-title');
  const confirmDesc = document.getElementById('confirm-desc');
  const confirmCancel = document.getElementById('confirm-cancel');
  const confirmOk = document.getElementById('confirm-ok');
  const toastContainer = document.getElementById('admin-toast-container');

  // Application State
  let usersList = [];
  let currentPage = 1;
  const pageSize = 8;
  let activeModalSession = null;
  let confirmCallback = null;

  /* ==========================================================================
     1. Toast Utility
     ========================================================================== */
  function showToast({ title, message, type = 'info', duration = 3000 }) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Đóng">✕</button>
    `;

    toastContainer.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  }

  /* ==========================================================================
     2. Seed Demo Data & LocalStorage Management
     ========================================================================== */
  function getStoredAdminCode() {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_CODE;
  }

  function seedDemoUsersIfEmpty() {
    const raw = localStorage.getItem(LOG_STORAGE_KEY);
    if (raw && raw !== '[]') {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return;
      } catch (e) {}
    }

    const now = Date.now();
    const MS = (h, m) => now - (h * 3600000 + m * 60000);

    const sampleUsers = [
      { id: 'sess-demo-1', name: 'Nguyễn Văn An', email: 'nguyenvanan.dev@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'A', loginTime: new Date(MS(0, 12)).toISOString(), ipSimulated: '192.168.1.101', status: 'active', role: 'admin' },
      { id: 'sess-demo-2', name: 'Trần Thị Mai Lan', email: 'mailan.design@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'M', loginTime: new Date(MS(1, 45)).toISOString(), ipSimulated: '10.0.0.45', status: 'active', role: 'user' },
      { id: 'sess-demo-3', name: 'Lê Hoàng Nam', email: 'lehoangnam@company.vn', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'LN', loginTime: new Date(MS(4, 20)).toISOString(), ipSimulated: '172.16.0.22', status: 'active', role: 'user' },
      { id: 'sess-demo-4', name: 'Phạm Thuỳ Nga', email: 'thuynga.pm@nexusauth.io', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'PN', loginTime: new Date(MS(9, 30)).toISOString(), ipSimulated: '192.168.1.200', status: 'active', role: 'admin' },
      { id: 'sess-demo-5', name: 'Đỗ Minh Quân', email: 'doquan.security@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'Q', loginTime: new Date(MS(26, 10)).toISOString(), ipSimulated: '10.10.5.88', status: 'disabled', role: 'user' },
      { id: 'sess-demo-6', name: 'Võ Thị Hà My', email: 'hamy.ux@nexus.vn', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'H', loginTime: new Date(MS(48, 5)).toISOString(), ipSimulated: '192.168.0.55', status: 'active', role: 'user' },
      { id: 'sess-demo-7', name: 'Bùi Đức Tài', email: 'taibd@techcorp.com', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'BT', loginTime: new Date(MS(72, 35)).toISOString(), ipSimulated: '172.20.10.3', status: 'active', role: 'user' },
      { id: 'sess-demo-8', name: 'Hoàng Minh Khoa', email: 'hmk.dev@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'K', loginTime: new Date(MS(96, 50)).toISOString(), ipSimulated: '192.168.2.77', status: 'active', role: 'user' }
    ];

    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(sampleUsers));
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(LOG_STORAGE_KEY) || '[]';
      usersList = JSON.parse(raw);
    } catch (e) {
      usersList = [];
    }
  }

  function saveUsers() {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(usersList));
    } catch (e) {
      console.warn('LocalStorage limit:', e);
    }
  }

  /* ==========================================================================
     3. Lock Screen & "dashboard" Passcode Verification
     ========================================================================== */
  function checkInitialAuth() {
    const isAuthed = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    if (isAuthed) {
      unlockAdminDashboard(false);
    } else {
      if (lockScreen) lockScreen.style.display = 'flex';
      if (adminShell) adminShell.style.display = 'none';
      if (adminPasswordInput) adminPasswordInput.focus();
    }
  }

  function unlockAdminDashboard(showWelcome = true) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    if (lockScreen) lockScreen.style.display = 'none';
    if (adminShell) adminShell.style.display = 'flex';

    loadUsers();
    updateStats();
    renderRecentTable();
    renderUsersView();
    renderTimeline();
    updateSystemInfo();

    if (showWelcome) {
      showToast({
        title: 'Xác thực thành công!',
        message: 'Chào mừng bạn đã đăng nhập vào Bảng điều khiển Quản trị viên.',
        type: 'success'
      });
    }
  }

  if (lockForm) {
    lockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredCode = (adminPasswordInput.value || '').trim();
      const expectedCode = getStoredAdminCode().trim();

      // Case-insensitive match for "dashboard" or custom configured password
      const isValid = enteredCode.toLowerCase() === DEFAULT_CODE.toLowerCase() || 
                      enteredCode === expectedCode || 
                      enteredCode.toLowerCase() === expectedCode.toLowerCase();

      if (isValid) {
        if (lockError) lockError.style.display = 'none';
        unlockAdminDashboard(true);
      } else {
        if (lockError) {
          lockError.textContent = 'Mã xác nhận không đúng. Vui lòng nhập "dashboard" để tiếp tục.';
          lockError.style.display = 'block';
        }
        const card = document.querySelector('.lock-card');
        if (card) {
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 500);
        }
        if (adminPasswordInput) {
          adminPasswordInput.select();
        }
      }
    });
  }

  if (lockTogglePw && adminPasswordInput) {
    lockTogglePw.addEventListener('click', () => {
      const isPw = adminPasswordInput.type === 'password';
      adminPasswordInput.type = isPw ? 'text' : 'password';
      const eyeOpen = lockTogglePw.querySelector('.icon-eye-open');
      const eyeClosed = lockTogglePw.querySelector('.icon-eye-closed');
      if (eyeOpen && eyeClosed) {
        eyeOpen.style.display = isPw ? 'none' : 'block';
        eyeClosed.style.display = isPw ? 'block' : 'none';
      }
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
      if (adminShell) adminShell.style.display = 'none';
      if (lockScreen) lockScreen.style.display = 'flex';
      if (adminPasswordInput) {
        adminPasswordInput.value = '';
        adminPasswordInput.focus();
      }
      if (lockError) lockError.style.display = 'none';
      showToast({
        title: 'Đã khoá bảng quản trị',
        message: 'Bạn đã đăng xuất khỏi phiên quản trị viên.',
        type: 'info'
      });
    });
  }

  /* ==========================================================================
     4. Navigation & Views Switching
     ========================================================================== */
  function switchView(viewName) {
    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    views.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.style.display = 'block';
        view.classList.add('active');
      } else {
        view.style.display = 'none';
        view.classList.remove('active');
      }
    });

    const labelMap = {
      dashboard: 'Tổng quan',
      users: 'Quản lý Tài khoản',
      sessions: 'Lịch sử Phiên',
      settings: 'Cài đặt Quản trị'
    };
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = labelMap[viewName] || 'Tổng quan';

    if (viewName === 'users') renderUsersView();
    if (viewName === 'sessions') renderTimeline();
    if (viewName === 'settings') updateSystemInfo();

    // Close mobile drawer if opened
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  const btnViewAll = document.querySelector('.btn-view-all');
  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => switchView('users'));
  }

  // Sidebar Collapse & Mobile Menu
  if (sidebarCollapseBtn && sidebar) {
    sidebarCollapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      const adminMain = document.getElementById('admin-main');
      if (adminMain) adminMain.classList.toggle('sidebar-collapsed');
    });
  }

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  /* ==========================================================================
     5. Stats Calculation & Rendering
     ========================================================================== */
  function formatDateNice(isoStr) {
    if (!isoStr) return 'Vừa xong';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      const now = new Date();
      const diffMs = now - d;
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffMinutes < 1) return 'Vừa xong';
      if (diffMinutes < 60) return `${diffMinutes} phút trước`;
      if (diffHours < 24 && d.getDate() === now.getDate()) {
        return `Hôm nay ${d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
      }
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return isoStr;
    }
  }

  function updateStats() {
    const total = usersList.length;
    const now = new Date();
    const todayLogins = usersList.filter(u => {
      try {
        const d = new Date(u.loginTime);
        return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      } catch (e) {
        return false;
      }
    }).length;

    const googleLogins = usersList.filter(u => (u.providerType === 'google' || (u.provider || '').toLowerCase().includes('google'))).length;
    const disabledCount = usersList.filter(u => u.status === 'disabled').length;

    if (statTotalNum) statTotalNum.textContent = total;
    if (statTodayNum) statTodayNum.textContent = todayLogins;
    if (statGoogleNum) statGoogleNum.textContent = googleLogins;
    if (statDisabledNum) statDisabledNum.textContent = disabledCount;
    if (navUserCount) navUserCount.textContent = total;

    // Progress bar ratios
    if (statTotalBar) statTotalBar.style.width = '100%';
    if (statTodayBar) statTodayBar.style.width = `${Math.min(100, (todayLogins / Math.max(1, total)) * 100)}%`;
    if (statGoogleBar) statGoogleBar.style.width = `${Math.min(100, (googleLogins / Math.max(1, total)) * 100)}%`;
    if (statDisabledBar) statDisabledBar.style.width = `${Math.min(100, (disabledCount / Math.max(1, total)) * 100)}%`;
  }

  function renderRecentTable() {
    if (!recentLoginsTableWrap) return;
    const recent = usersList.slice(0, 5);

    if (recent.length === 0) {
      recentLoginsTableWrap.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-dim);">Chưa có phiên đăng nhập nào được ghi nhận.</div>
      `;
      return;
    }

    recentLoginsTableWrap.innerHTML = `
      <div class="table-scroll-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th class="col-avatar"></th>
              <th>Tài khoản</th>
              <th>Provider</th>
              <th>Thời gian</th>
              <th>Địa chỉ IP</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${recent.map(u => `
              <tr class="table-row-clickable" data-session-id="${u.id}">
                <td class="col-avatar">
                  <div class="user-avatar-circle circle-${u.providerType === 'google' ? 'google' : 'email'}">
                    ${escapeHtml(u.avatarInitials || (u.name || 'U').charAt(0).toUpperCase())}
                  </div>
                </td>
                <td>
                  <div class="user-identity">
                    <span class="identity-name">${escapeHtml(u.name || 'Người dùng')}</span>
                    <span class="identity-email">${escapeHtml(u.email || '—')}</span>
                  </div>
                </td>
                <td>
                  <span class="provider-badge ${u.providerType === 'google' ? 'badge-google' : 'badge-email'}">
                    ${u.providerType === 'google' ? '🔵 Google' : '🟣 Email'}
                  </span>
                </td>
                <td class="time-col">${formatDateNice(u.loginTime)}</td>
                <td class="ip-col"><code>${escapeHtml(u.ipSimulated || '127.0.0.1')}</code></td>
                <td>
                  <span class="status-badge ${u.status === 'disabled' ? 'badge-disabled' : 'badge-active'}">
                    ${u.status === 'disabled' ? '🔴 Vô hiệu' : '🟢 Hoạt động'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    recentLoginsTableWrap.querySelectorAll('.table-row-clickable').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-session-id');
        const session = usersList.find(u => u.id === id);
        if (session) openUserDetailModal(session);
      });
    });
  }

  /* ==========================================================================
     6. Users Table & Grid View with Search & Filtering
     ========================================================================== */
  function getFilteredUsers() {
    let result = [...usersList];

    // Global Search or Toolbar Search
    const searchVal = (usersSearch ? usersSearch.value : '') || (adminGlobalSearch ? adminGlobalSearch.value : '');
    const q = searchVal.trim().toLowerCase();

    if (q) {
      result = result.filter(u => 
        (u.name || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.ipSimulated || '').toLowerCase().includes(q)
      );
    }

    // Filter Provider
    const prov = filterProvider ? filterProvider.value : 'all';
    if (prov === 'google') {
      result = result.filter(u => u.providerType === 'google' || (u.provider || '').toLowerCase().includes('google'));
    } else if (prov === 'email') {
      result = result.filter(u => u.providerType === 'email' || !(u.provider || '').toLowerCase().includes('google'));
    }

    // Filter Status
    const stat = filterStatus ? filterStatus.value : 'all';
    if (stat !== 'all') {
      result = result.filter(u => u.status === stat);
    }

    // Filter Time
    const timeVal = filterTime ? filterTime.value : 'all';
    if (timeVal !== 'all') {
      const now = Date.now();
      const hoursMap = { today: 24, '7d': 7 * 24, '30d': 30 * 24 };
      const limitMs = (hoursMap[timeVal] || 24) * 3600000;
      result = result.filter(u => {
        try {
          return (now - new Date(u.loginTime).getTime()) <= limitMs;
        } catch (e) {
          return false;
        }
      });
    }

    // Sort
    const sortVal = filterSort ? filterSort.value : 'newest';
    if (sortVal === 'newest') {
      result.sort((a, b) => new Date(b.loginTime || 0) - new Date(a.loginTime || 0));
    } else if (sortVal === 'oldest') {
      result.sort((a, b) => new Date(a.loginTime || 0) - new Date(b.loginTime || 0));
    } else if (sortVal === 'name-az') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return result;
  }

  function renderUsersView() {
    const filtered = getFilteredUsers();
    const total = filtered.length;

    if (resultShowing) resultShowing.textContent = Math.min(filtered.length, pageSize);
    if (resultTotal) resultTotal.textContent = usersList.length;

    if (total === 0) {
      if (usersTableBody) usersTableBody.innerHTML = '';
      if (usersGridBody) usersGridBody.innerHTML = '';
      if (tableEmpty) tableEmpty.style.display = 'flex';
      if (paginationBar) paginationBar.innerHTML = '';
      return;
    }

    if (tableEmpty) tableEmpty.style.display = 'none';

    // Pagination
    const totalPages = Math.ceil(total / pageSize);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + pageSize);

    if (resultShowing) resultShowing.textContent = pageItems.length;

    // Render Table Mode
    if (usersTableBody) {
      usersTableBody.innerHTML = pageItems.map(u => `
        <tr data-session-id="${u.id}">
          <td class="col-avatar">
            <div class="user-avatar-circle circle-${u.providerType === 'google' ? 'google' : 'email'}">
              ${escapeHtml(u.avatarInitials || (u.name || 'U').charAt(0).toUpperCase())}
            </div>
          </td>
          <td>
            <div class="user-identity">
              <span class="identity-name">${escapeHtml(u.name || 'Người dùng')}</span>
              <span class="identity-email">${escapeHtml(u.email || '—')}</span>
            </div>
          </td>
          <td>
            <span class="provider-badge ${u.providerType === 'google' ? 'badge-google' : 'badge-email'}">
              ${u.providerType === 'google' ? '🔵 Google OAuth' : '🟣 Email / PW'}
            </span>
          </td>
          <td class="time-col">${formatDateNice(u.loginTime)}</td>
          <td class="ip-col"><code>${escapeHtml(u.ipSimulated || '127.0.0.1')}</code></td>
          <td>
            <span class="role-pill ${u.role === 'admin' ? 'role-admin' : 'role-user'}">${u.role || 'user'}</span>
          </td>
          <td>
            <span class="status-badge ${u.status === 'disabled' ? 'badge-disabled' : 'badge-active'}">
              ${u.status === 'disabled' ? '🔴 Vô hiệu hoá' : '🟢 Hoạt động'}
            </span>
          </td>
          <td class="col-actions">
            <div class="actions-cell-group">
              <button type="button" class="btn-action-icon btn-view-user" data-id="${u.id}" title="Xem chi tiết">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button type="button" class="btn-action-icon btn-toggle-status" data-id="${u.id}" title="${u.status === 'disabled' ? 'Mở khoá tài khoản' : 'Vô hiệu hoá tài khoản'}">
                ${u.status === 'disabled' 
                  ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`
                  : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
                }
              </button>
              <button type="button" class="btn-action-icon btn-delete-user" data-id="${u.id}" title="Xoá bản ghi này">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    // Render Grid Mode
    if (usersGridBody) {
      usersGridBody.innerHTML = pageItems.map(u => `
        <div class="user-card-item" data-session-id="${u.id}">
          <div class="card-item-header">
            <div class="user-avatar-circle circle-${u.providerType === 'google' ? 'google' : 'email'}">
              ${escapeHtml(u.avatarInitials || (u.name || 'U').charAt(0).toUpperCase())}
            </div>
            <div class="card-item-title-meta">
              <h4 class="card-user-name">${escapeHtml(u.name || 'Người dùng')}</h4>
              <p class="card-user-email">${escapeHtml(u.email || '—')}</p>
            </div>
            <span class="status-badge ${u.status === 'disabled' ? 'badge-disabled' : 'badge-active'}">
              ${u.status === 'disabled' ? '🔴 Vô hiệu' : '🟢 Active'}
            </span>
          </div>

          <div class="card-item-body">
            <div class="card-meta-row">
              <span class="meta-label">Provider:</span>
              <span class="meta-val">${u.providerType === 'google' ? 'Google OAuth' : 'Email/Password'}</span>
            </div>
            <div class="card-meta-row">
              <span class="meta-label">IP:</span>
              <span class="meta-val"><code>${escapeHtml(u.ipSimulated || '127.0.0.1')}</code></span>
            </div>
            <div class="card-meta-row">
              <span class="meta-label">Đăng nhập:</span>
              <span class="meta-val">${formatDateNice(u.loginTime)}</span>
            </div>
          </div>

          <div class="card-item-footer">
            <button class="btn-card-action btn-view-user" data-id="${u.id}">Chi tiết</button>
            <button class="btn-card-action btn-toggle-status" data-id="${u.id}">
              ${u.status === 'disabled' ? 'Kích hoạt' : 'Vô hiệu hoá'}
            </button>
            <button class="btn-card-action btn-delete-user" data-id="${u.id}" style="color:var(--error);">Xoá</button>
          </div>
        </div>
      `).join('');
    }

    renderPagination(totalPages);
    attachRowActionListeners();
  }

  function renderPagination(totalPages) {
    if (!paginationBar) return;
    if (totalPages <= 1) {
      paginationBar.innerHTML = '';
      return;
    }

    let html = `
      <button class="page-btn" id="page-prev" ${currentPage === 1 ? 'disabled' : ''}>← Trước</button>
      <div class="page-numbers">
    `;

    for (let p = 1; p <= totalPages; p++) {
      html += `<button class="page-num ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    html += `
      </div>
      <button class="page-btn" id="page-next" ${currentPage === totalPages ? 'disabled' : ''}>Sau →</button>
    `;

    paginationBar.innerHTML = html;

    const prevBtn = document.getElementById('page-prev');
    const nextBtn = document.getElementById('page-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderUsersView(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderUsersView(); } });

    paginationBar.querySelectorAll('.page-num').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.getAttribute('data-page'), 10) || 1;
        renderUsersView();
      });
    });
  }

  function attachRowActionListeners() {
    document.querySelectorAll('.btn-view-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const session = usersList.find(u => u.id === id);
        if (session) openUserDetailModal(session);
      });
    });

    document.querySelectorAll('.btn-toggle-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleUserStatus(id);
      });
    });

    document.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        deleteUserSession(id);
      });
    });
  }

  // Search & Filter Events
  if (usersSearch) {
    usersSearch.addEventListener('input', () => {
      currentPage = 1;
      if (usersSearchClear) usersSearchClear.style.display = usersSearch.value ? 'block' : 'none';
      renderUsersView();
    });
  }

  if (usersSearchClear && usersSearch) {
    usersSearchClear.addEventListener('click', () => {
      usersSearch.value = '';
      usersSearchClear.style.display = 'none';
      currentPage = 1;
      renderUsersView();
    });
  }

  if (adminGlobalSearch) {
    adminGlobalSearch.addEventListener('input', (e) => {
      if (usersSearch) usersSearch.value = e.target.value;
      if (usersSearchClear) usersSearchClear.style.display = e.target.value ? 'block' : 'none';
      currentPage = 1;
      switchView('users');
    });
  }

  [filterProvider, filterStatus, filterTime, filterSort].forEach(select => {
    if (select) {
      select.addEventListener('change', () => {
        currentPage = 1;
        renderUsersView();
      });
    }
  });

  // Table vs Grid View Toggle
  if (viewToggleTable && viewToggleGrid) {
    viewToggleTable.addEventListener('click', () => {
      viewToggleTable.classList.add('active');
      viewToggleGrid.classList.remove('active');
      if (usersTableContainer) usersTableContainer.style.display = 'block';
      if (usersGridContainer) usersGridContainer.style.display = 'none';
    });

    viewToggleGrid.addEventListener('click', () => {
      viewToggleGrid.classList.add('active');
      viewToggleTable.classList.remove('active');
      if (usersTableContainer) usersTableContainer.style.display = 'none';
      if (usersGridContainer) usersGridContainer.style.display = 'block';
    });
  }

  /* ==========================================================================
     7. Account Status & Actions (Toggle, Delete, Detail Modal)
     ========================================================================== */
  function toggleUserStatus(id) {
    const session = usersList.find(u => u.id === id);
    if (!session) return;

    const newStatus = session.status === 'disabled' ? 'active' : 'disabled';
    // Update all entries with matching email
    usersList.forEach(u => {
      if (u.email === session.email || u.id === session.id) {
        u.status = newStatus;
      }
    });

    saveUsers();
    updateStats();
    renderRecentTable();
    renderUsersView();

    showToast({
      title: newStatus === 'active' ? 'Đã kích hoạt tài khoản' : 'Đã vô hiệu hoá tài khoản',
      message: `Tài khoản ${session.name} (${session.email}) hiện ${newStatus === 'active' ? 'có thể đăng nhập bình thường' : 'đã bị chặn truy cập'}.`,
      type: newStatus === 'active' ? 'success' : 'warning'
    });

    if (activeModalSession && activeModalSession.id === id) {
      openUserDetailModal(session);
    }
  }

  function deleteUserSession(id) {
    const session = usersList.find(u => u.id === id);
    if (!session) return;

    openConfirmDialog(
      'Xoá bản ghi phiên đăng nhập',
      `Bạn có chắc chắn muốn xoá phiên đăng nhập của ${session.name} (${session.email}) khỏi hệ thống?`,
      () => {
        usersList = usersList.filter(u => u.id !== id);
        saveUsers();
        updateStats();
        renderRecentTable();
        renderUsersView();
        renderTimeline();
        updateSystemInfo();

        if (userDetailModal) userDetailModal.style.display = 'none';

        showToast({
          title: 'Đã xoá phiên',
          message: 'Bản ghi phiên đăng nhập đã được xoá an toàn khỏi cơ sở dữ liệu.',
          type: 'info'
        });
      }
    );
  }

  function openUserDetailModal(session) {
    if (!userDetailModal) return;
    activeModalSession = session;

    if (modalAvatar) {
      modalAvatar.textContent = session.avatarInitials || (session.name || 'U').charAt(0).toUpperCase();
      modalAvatar.className = `modal-avatar circle-${session.providerType === 'google' ? 'google' : 'email'}`;
    }
    if (modalName) modalName.textContent = session.name || 'Người dùng';
    if (modalEmail) modalEmail.textContent = session.email || '—';
    if (modalRoleBadge) modalRoleBadge.textContent = session.role || 'user';
    if (modalProvider) modalProvider.textContent = session.provider || (session.providerType === 'google' ? 'Google OAuth 2.0' : 'Email & Mật khẩu');
    if (modalLoginTime) modalLoginTime.textContent = session.loginTime ? new Date(session.loginTime).toLocaleString('vi-VN') : '—';
    if (modalIp) modalIp.textContent = session.ipSimulated || '127.0.0.1';
    if (modalStatus) {
      modalStatus.innerHTML = session.status === 'disabled' 
        ? `<span class="status-badge badge-disabled">🔴 Vô hiệu hoá</span>`
        : `<span class="status-badge badge-active">🟢 Đang hoạt động</span>`;
    }
    if (modalSessionId) modalSessionId.textContent = session.id;

    if (btnDisableLabel) {
      btnDisableLabel.textContent = session.status === 'disabled' ? 'Mở khoá tài khoản' : 'Vô hiệu hoá';
    }

    // Login History for this email
    if (modalHistoryList) {
      const history = usersList.filter(u => u.email === session.email);
      modalHistoryList.innerHTML = history.map(h => `
        <div class="history-item">
          <span class="history-time">${formatDateNice(h.loginTime)}</span>
          <span class="history-ip">IP: ${escapeHtml(h.ipSimulated || '127.0.0.1')}</span>
          <span class="history-prov">${h.providerType === 'google' ? 'Google OAuth' : 'Email'}</span>
        </div>
      `).join('');
    }

    userDetailModal.style.display = 'flex';
  }

  if (closeDetailModal) closeDetailModal.addEventListener('click', () => { userDetailModal.style.display = 'none'; });
  if (btnModalCloseAction) btnModalCloseAction.addEventListener('click', () => { userDetailModal.style.display = 'none'; });
  if (userDetailModal) {
    userDetailModal.addEventListener('click', (e) => {
      if (e.target === userDetailModal) userDetailModal.style.display = 'none';
    });
  }

  if (btnModalDisable) {
    btnModalDisable.addEventListener('click', () => {
      if (activeModalSession) toggleUserStatus(activeModalSession.id);
    });
  }

  if (btnModalDelete) {
    btnModalDelete.addEventListener('click', () => {
      if (activeModalSession) deleteUserSession(activeModalSession.id);
    });
  }

  /* ==========================================================================
     8. Timeline View
     ========================================================================== */
  function renderTimeline() {
    if (!sessionsTimeline) return;
    if (usersList.length === 0) {
      sessionsTimeline.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-dim);">Chưa có phiên đăng nhập nào.</div>`;
      return;
    }

    sessionsTimeline.innerHTML = usersList.map((u, i) => `
      <div class="timeline-item">
        <div class="timeline-dot ${u.status === 'disabled' ? 'dot-disabled' : (u.providerType === 'google' ? 'dot-google' : 'dot-email')}"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <strong class="timeline-name">${escapeHtml(u.name || 'Người dùng')}</strong>
            <span class="timeline-date">${formatDateNice(u.loginTime)}</span>
          </div>
          <p class="timeline-desc">
            Đăng nhập qua <strong>${escapeHtml(u.provider || 'Email')}</strong> từ địa chỉ IP <code>${escapeHtml(u.ipSimulated || '127.0.0.1')}</code>.
            ${u.status === 'disabled' ? '<span style="color:var(--error); font-weight:600;">(Tài khoản đang bị vô hiệu hoá)</span>' : ''}
          </p>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     9. Settings View & System Info
     ========================================================================== */
  function updateSystemInfo() {
    const raw = localStorage.getItem(LOG_STORAGE_KEY) || '';
    const bytes = new Blob([raw]).size;
    if (sysLogSize) sysLogSize.textContent = `${(bytes / 1024).toFixed(1)} KB`;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (sysThemeInfo) sysThemeInfo.textContent = theme === 'dark' ? 'Dark Mode (Tối)' : 'Light Mode (Sáng)';
  }

  if (changePwForm) {
    changePwForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = newAdminPw ? newAdminPw.value.trim() : '';
      const p2 = confirmAdminPw ? confirmAdminPw.value.trim() : '';

      if (!p1 || p1.length < 4) {
        showToast({ title: 'Mật khẩu quá ngắn', message: 'Vui lòng nhập mã xác nhận ít nhất 4 ký tự.', type: 'error' });
        return;
      }
      if (p1 !== p2) {
        showToast({ title: 'Mật khẩu không khớp', message: 'Mật khẩu xác nhận không khớp nhau.', type: 'error' });
        return;
      }

      localStorage.setItem(ADMIN_PASS_KEY, p1);
      changePwForm.reset();
      showToast({
        title: 'Đổi mã xác nhận thành công!',
        message: 'Mã xác nhận truy cập Bảng quản trị mới đã được cập nhật.',
        type: 'success'
      });
    });
  }

  if (btnResetLogSettings) {
    btnResetLogSettings.addEventListener('click', () => {
      openConfirmDialog(
        'Xoá toàn bộ nhật ký đăng nhập?',
        'Tất cả thông tin tài khoản và phiên đăng nhập sẽ bị xoá khỏi localStorage. Hành động này không thể hoàn tác.',
        () => {
          usersList = [];
          localStorage.removeItem(LOG_STORAGE_KEY);
          updateStats();
          renderRecentTable();
          renderUsersView();
          renderTimeline();
          updateSystemInfo();
          showToast({ title: 'Đã dọn sạch dữ liệu', message: 'Toàn bộ log đăng nhập đã được xoá sạch.', type: 'info' });
        }
      );
    });
  }

  if (btnClearAllConfirm) {
    btnClearAllConfirm.addEventListener('click', () => {
      if (btnResetLogSettings) btnResetLogSettings.click();
    });
  }

  if (btnSeedDemo) {
    btnSeedDemo.addEventListener('click', () => {
      localStorage.removeItem(LOG_STORAGE_KEY);
      seedDemoUsersIfEmpty();
      loadUsers();
      updateStats();
      renderRecentTable();
      renderUsersView();
      renderTimeline();
      updateSystemInfo();
      showToast({ title: 'Khôi phục dữ liệu demo', message: 'Đã nạp 8 tài khoản mẫu chuẩn vào hệ thống.', type: 'success' });
    });
  }

  /* ==========================================================================
     10. Export CSV
     ========================================================================== */
  function exportUsersToCsv() {
    const list = getFilteredUsers();
    if (list.length === 0) {
      showToast({ title: 'Không có dữ liệu', message: 'Không có bản ghi nào để xuất file CSV.', type: 'warning' });
      return;
    }

    const headers = ['STT', 'Ho_Va_Ten', 'Email', 'Provider', 'Thoi_Gian_Dang_Nhap', 'Dia_Chi_IP', 'Vai_Tro', 'Trang_Thai'];
    const rows = list.map((u, i) => [
      i + 1,
      `"${(u.name || '').replace(/"/g, '""')}"`,
      `"${(u.email || '').replace(/"/g, '""')}"`,
      `"${(u.provider || u.providerType || '').replace(/"/g, '""')}"`,
      `"${(u.loginTime || '').replace(/"/g, '""')}"`,
      `"${(u.ipSimulated || '').replace(/"/g, '""')}"`,
      `"${(u.role || 'user').replace(/"/g, '""')}"`,
      `"${(u.status || 'active').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexusauth_users_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast({
      title: 'Đã xuất file CSV!',
      message: `Đã tải xuống danh sách ${list.length} tài khoản thành công.`,
      type: 'success'
    });
  }

  if (btnExportCsv) btnExportCsv.addEventListener('click', exportUsersToCsv);
  if (btnExportCsvUsers) btnExportCsvUsers.addEventListener('click', exportUsersToCsv);

  /* ==========================================================================
     11. Refresh & Realtime Storage Sync
     ========================================================================== */
  if (btnRefreshData) {
    btnRefreshData.addEventListener('click', () => {
      btnRefreshData.classList.add('rotating');
      loadUsers();
      updateStats();
      renderRecentTable();
      renderUsersView();
      renderTimeline();
      updateSystemInfo();
      setTimeout(() => {
        btnRefreshData.classList.remove('rotating');
        showToast({ title: 'Đã làm mới dữ liệu', message: 'Cập nhật danh sách tài khoản mới nhất.', type: 'info', duration: 1500 });
      }, 500);
    });
  }

  // Listen to other tabs logging in
  window.addEventListener('storage', (e) => {
    if (e.key === LOG_STORAGE_KEY) {
      loadUsers();
      updateStats();
      renderRecentTable();
      renderUsersView();
      renderTimeline();
      updateSystemInfo();
    }
  });

  /* ==========================================================================
     12. Confirm Dialog Modal
     ========================================================================== */
  function openConfirmDialog(title, desc, onOk) {
    if (!confirmDialog) return;
    if (confirmTitle) confirmTitle.textContent = title;
    if (confirmDesc) confirmDesc.textContent = desc;
    confirmCallback = onOk;
    confirmDialog.style.display = 'flex';
  }

  if (confirmCancel && confirmDialog) {
    confirmCancel.addEventListener('click', () => {
      confirmDialog.style.display = 'none';
      confirmCallback = null;
    });
  }

  if (confirmOk && confirmDialog) {
    confirmOk.addEventListener('click', () => {
      if (typeof confirmCallback === 'function') confirmCallback();
      confirmDialog.style.display = 'none';
      confirmCallback = null;
    });
  }

  /* ==========================================================================
     13. Theme Toggle (Sync with Main App)
     ========================================================================== */
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (adminThemeToggle) {
    adminThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      updateSystemInfo();
      showToast({
        title: newTheme === 'dark' ? 'Giao diện tối' : 'Giao diện sáng',
        message: `Đã đổi sang giao diện ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`,
        type: 'info',
        duration: 2000
      });
    });
  }

  /* ==========================================================================
     14. Initialize
     ========================================================================== */
  seedDemoUsersIfEmpty();
  checkInitialAuth();
});
