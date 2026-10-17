/**
 * NexusAuth - Interactive Authentication Application
 * Handles Tab Switching, Live Validation, Password Strength, Google OAuth Simulation,
 * Profile State Management, Theme Toggling, and Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements: Tabs & Forms
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const tabGlider = document.getElementById('tab-glider');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const authCard = document.getElementById('auth-card');
  const dashboardCard = document.getElementById('dashboard-card');
  const cardMainTitle = document.getElementById('card-main-title');
  const cardSubTitle = document.getElementById('card-sub-title');
  const linkToRegister = document.getElementById('link-to-register');
  const linkToLogin = document.getElementById('link-to-login');

  // DOM Elements: Login Inputs
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginEmailGroup = document.getElementById('login-email-group');
  const loginPasswordGroup = document.getElementById('login-password-group');
  const loginEmailError = document.getElementById('login-email-error');
  const loginPasswordError = document.getElementById('login-password-error');
  const toggleLoginPw = document.getElementById('toggle-login-pw');
  const btnSubmitLogin = document.getElementById('btn-submit-login');
  const rememberMeCheckbox = document.getElementById('remember-me');

  // DOM Elements: Register Inputs
  const regName = document.getElementById('reg-name');
  const regEmail = document.getElementById('reg-email');
  const regPassword = document.getElementById('reg-password');
  const regConfirmPw = document.getElementById('reg-confirm-pw');
  const regTerms = document.getElementById('reg-terms');
  const regNameGroup = document.getElementById('reg-name-group');
  const regEmailGroup = document.getElementById('reg-email-group');
  const regPasswordGroup = document.getElementById('reg-password-group');
  const regConfirmGroup = document.getElementById('reg-confirm-group');
  const regNameError = document.getElementById('reg-name-error');
  const regEmailError = document.getElementById('reg-email-error');
  const regPasswordError = document.getElementById('reg-password-error');
  const regConfirmError = document.getElementById('reg-confirm-error');
  const regTermsError = document.getElementById('reg-terms-error');
  const toggleRegPw = document.getElementById('toggle-reg-pw');
  const btnSubmitRegister = document.getElementById('btn-submit-register');
  const pwStrengthMeter = document.getElementById('pw-strength-meter');
  const strengthText = document.getElementById('strength-text');
  const pwMatchIcon = document.getElementById('pw-match-icon');

  // DOM Elements: Google Sign-In & Modals
  const btnGoogleAuth = document.getElementById('btn-google-auth');
  const googleModal = document.getElementById('google-modal');
  const closeGoogleModal = document.getElementById('close-google-modal');
  const googleAccountItems = document.querySelectorAll('.google-account-item:not(#btn-custom-google-account)');
  const btnCustomGoogleAccount = document.getElementById('btn-custom-google-account');
  const customGoogleView = document.getElementById('custom-google-view');
  const customGoogleInput = document.getElementById('custom-google-input');
  const btnBackAccountList = document.getElementById('btn-back-account-list');
  const btnConfirmCustomGoogle = document.getElementById('btn-confirm-custom-google');
  const googleAccountList = document.querySelector('.google-account-list');

  // DOM Elements: Forgot Password Modal
  const linkForgotPw = document.getElementById('link-forgot-pw');
  const forgotModal = document.getElementById('forgot-modal');
  const closeForgotModal = document.getElementById('close-forgot-modal');
  const formForgotPw = document.getElementById('form-forgot-pw');
  const forgotEmail = document.getElementById('forgot-email');
  const forgotEmailError = document.getElementById('forgot-email-error');
  const btnSubmitForgot = document.getElementById('btn-submit-forgot');

  // DOM Elements: Dashboard Top Bar & Logout
  const dashUserName = document.getElementById('dash-user-name');
  const dashUserEmail = document.getElementById('dash-user-email');
  const dashUserAvatar = document.getElementById('dash-user-avatar');
  const dashUserInitials = document.getElementById('dash-user-initials');
  const dashUserProvider = document.getElementById('dash-user-provider');
  const btnDashLogout = document.getElementById('btn-dash-logout');
  const btnOpenProfileModal = document.getElementById('btn-open-profile-modal');

  // DOM Elements: Dashboard Statistics
  const statStorageText = document.getElementById('stat-storage-text');
  const statStorageBar = document.getElementById('stat-storage-bar');
  const statStoragePercent = document.getElementById('stat-storage-percent');
  const statFilesCount = document.getElementById('stat-files-count');
  const statDocsCount = document.getElementById('stat-docs-count');
  const statImgsCount = document.getElementById('stat-imgs-count');
  const statDataCount = document.getElementById('stat-data-count');
  const filesCounterBadge = document.getElementById('files-counter-badge');

  // DOM Elements: Upload Hub Tabs & Panels
  const tabModeFiles = document.getElementById('tab-mode-files');
  const tabModeRaw = document.getElementById('tab-mode-raw');
  const panelUploadFiles = document.getElementById('panel-upload-files');
  const panelUploadRaw = document.getElementById('panel-upload-raw');

  // DOM Elements: File Upload Drop Zone & Queue
  const dropZone = document.getElementById('drop-zone');
  const fileUploader = document.getElementById('file-uploader');
  const btnBrowseFiles = document.getElementById('btn-browse-files');
  const uploadQueueContainer = document.getElementById('upload-queue-container');
  const queueItemsList = document.getElementById('queue-items-list');
  const queueCountText = document.getElementById('queue-count-text');

  // DOM Elements: Raw Data Form
  const rawDataForm = document.getElementById('raw-data-form');
  const rawFileName = document.getElementById('raw-file-name');
  const rawFileType = document.getElementById('raw-file-type');
  const rawContent = document.getElementById('raw-content');
  const btnFormatJson = document.getElementById('btn-format-json');
  const btnSampleData = document.getElementById('btn-sample-data');
  const btnClearRaw = document.getElementById('btn-clear-raw');

  // DOM Elements: Files Manager Controls
  const fileSearchInput = document.getElementById('file-search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const viewModeGrid = document.getElementById('view-mode-grid');
  const viewModeList = document.getElementById('view-mode-list');
  const filesContainer = document.getElementById('files-container');
  const filesEmptyState = document.getElementById('files-empty-state');
  const btnEmptyUpload = document.getElementById('btn-empty-upload');
  const categoryPills = document.querySelectorAll('.category-pill');

  // DOM Elements: Preview Modal
  const previewModal = document.getElementById('preview-modal');
  const closePreviewModal = document.getElementById('close-preview-modal');
  const previewBadge = document.getElementById('preview-badge');
  const previewFileName = document.getElementById('preview-file-name');
  const previewFileMeta = document.getElementById('preview-file-meta');
  const previewBody = document.getElementById('preview-body');
  const btnPreviewCopy = document.getElementById('btn-preview-copy');
  const btnPreviewDownload = document.getElementById('btn-preview-download');

  // DOM Elements: User Account Profile Modal
  const profileModal = document.getElementById('profile-modal');
  const closeProfileModal = document.getElementById('close-profile-modal');
  const modalUserAvatar = document.getElementById('modal-user-avatar');
  const modalUserName = document.getElementById('modal-user-name');
  const modalUserEmail = document.getElementById('modal-user-email');
  const modalUserProvider = document.getElementById('modal-user-provider');
  const modalUserTime = document.getElementById('modal-user-time');
  const btnModalLogout = document.getElementById('btn-modal-logout');

  // Theme & Language
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  // State Management
  let currentLang = 'vi'; // 'vi' or 'en'
  const LOCAL_STORAGE_KEY = 'nexusauth_current_user';
  const THEME_STORAGE_KEY = 'nexusauth_theme';
  const LOG_STORAGE_KEY = 'nexusauth_login_log';

  /* --- Seed demo login log data if empty --- */
  function seedDemoLoginLog() {
    const existing = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
    if (existing.length > 0) return;
    const now = Date.now();
    const MS = (h, m) => now - (h * 3600000 + m * 60000);
    const demos = [
      { id: 'demo-1', name: 'Nguyễn Văn A', email: 'nguyenvana.dev@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'A', loginTime: new Date(MS(0, 8)).toISOString(), ipSimulated: '192.168.1.101', status: 'active', role: 'user' },
      { id: 'demo-2', name: 'Trần Thị Mai', email: 'maitran.design@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'M', loginTime: new Date(MS(1, 32)).toISOString(), ipSimulated: '10.0.0.45', status: 'active', role: 'user' },
      { id: 'demo-3', name: 'Lê Hoàng Nam', email: 'lehoangnam@company.vn', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'LH', loginTime: new Date(MS(5, 15)).toISOString(), ipSimulated: '172.16.0.22', status: 'active', role: 'user' },
      { id: 'demo-4', name: 'Phạm Thúy Nga', email: 'thuynga.pm@nexusauth.io', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'PN', loginTime: new Date(MS(12, 0)).toISOString(), ipSimulated: '192.168.1.200', status: 'active', role: 'admin' },
      { id: 'demo-5', name: 'Đỗ Minh Quân', email: 'doquan.dev99@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'Q', loginTime: new Date(MS(26, 45)).toISOString(), ipSimulated: '10.10.5.88', status: 'disabled', role: 'user' },
      { id: 'demo-6', name: 'Võ Thị Hà', email: 'voha.ux@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'H', loginTime: new Date(MS(48, 0)).toISOString(), ipSimulated: '192.168.0.55', status: 'active', role: 'user' },
      { id: 'demo-7', name: 'Bùi Đức Tài', email: 'taibd@techcorp.com', provider: 'Email & Mật khẩu', providerType: 'email', avatarInitials: 'BT', loginTime: new Date(MS(72, 20)).toISOString(), ipSimulated: '172.20.10.3', status: 'active', role: 'user' },
      { id: 'demo-8', name: 'Hoàng Minh Khoa', email: 'hmk.koa@gmail.com', provider: 'Google OAuth 2.0', providerType: 'google', avatarInitials: 'K', loginTime: new Date(MS(96, 0)).toISOString(), ipSimulated: '192.168.2.77', status: 'disabled', role: 'user' }
    ];
    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(demos));
  }
  seedDemoLoginLog();

  /* ==========================================================================
     1. Toast Notification Utility
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast({ title, message, type = 'info', duration = 3500 }) {
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
      <button class="toast-close" aria-label="Đóng thông báo">✕</button>
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
     2. Tab Switching (Login <-> Register)
     ========================================================================== */
  function switchTab(target) {
    clearErrors();
    if (target === 'login') {
      tabLogin.classList.add('active');
      tabLogin.setAttribute('aria-selected', 'true');
      tabRegister.classList.remove('active');
      tabRegister.setAttribute('aria-selected', 'false');
      tabGlider.style.transform = 'translateX(0%)';

      formLogin.classList.add('active');
      formRegister.classList.remove('active');

      cardMainTitle.textContent = currentLang === 'vi' ? 'Chào mừng trở lại!' : 'Welcome back!';
      cardSubTitle.textContent = currentLang === 'vi' 
        ? 'Đăng nhập để khám phá hàng ngàn tính năng hấp dẫn' 
        : 'Sign in to access your dashboard and features';
    } else {
      tabRegister.classList.add('active');
      tabRegister.setAttribute('aria-selected', 'true');
      tabLogin.classList.remove('active');
      tabLogin.setAttribute('aria-selected', 'false');
      tabGlider.style.transform = 'translateX(100%)';

      formRegister.classList.add('active');
      formLogin.classList.remove('active');

      cardMainTitle.textContent = currentLang === 'vi' ? 'Tạo tài khoản mới' : 'Create an account';
      cardSubTitle.textContent = currentLang === 'vi' 
        ? 'Bắt đầu trải nghiệm nền tảng bảo mật hàng đầu chỉ trong vài giây' 
        : 'Get started with top-tier security in just a few seconds';
    }
  }

  tabLogin.addEventListener('click', () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));
  linkToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('register');
  });
  linkToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('login');
  });

  /* ==========================================================================
     3. Password Visibility Toggle
     ========================================================================== */
  function setupPasswordToggle(button, inputField) {
    button.addEventListener('click', () => {
      const isPassword = inputField.type === 'password';
      inputField.type = isPassword ? 'text' : 'password';

      const eyeOpen = button.querySelector('.icon-eye-open');
      const eyeClosed = button.querySelector('.icon-eye-closed');

      if (isPassword) {
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
      } else {
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
      }
    });
  }

  setupPasswordToggle(toggleLoginPw, loginPassword);
  setupPasswordToggle(toggleRegPw, regPassword);

  /* ==========================================================================
     4. Password Strength Calculation & Matching
     ========================================================================== */
  function evaluatePasswordStrength(password) {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  }

  regPassword.addEventListener('input', () => {
    const val = regPassword.value;
    const score = evaluatePasswordStrength(val);

    pwStrengthMeter.className = 'pw-strength-meter';

    if (val.length === 0) {
      strengthText.textContent = currentLang === 'vi' ? 'Chưa nhập' : 'Empty';
      return;
    }

    if (score <= 1) {
      pwStrengthMeter.classList.add('pw-weak');
      strengthText.textContent = currentLang === 'vi' ? 'Yếu' : 'Weak';
    } else if (score === 2) {
      pwStrengthMeter.classList.add('pw-fair');
      strengthText.textContent = currentLang === 'vi' ? 'Trung bình' : 'Fair';
    } else if (score === 3) {
      pwStrengthMeter.classList.add('pw-good');
      strengthText.textContent = currentLang === 'vi' ? 'Tốt' : 'Good';
    } else {
      pwStrengthMeter.classList.add('pw-strong');
      strengthText.textContent = currentLang === 'vi' ? 'Rất mạnh' : 'Strong';
    }

    checkPasswordMatch();
  });

  function checkPasswordMatch() {
    const pw = regPassword.value;
    const confirm = regConfirmPw.value;

    if (!confirm) {
      pwMatchIcon.style.display = 'none';
      return;
    }

    if (pw === confirm && pw.length > 0) {
      pwMatchIcon.style.display = 'flex';
      setFieldSuccess(regConfirmGroup, regConfirmError);
    } else {
      pwMatchIcon.style.display = 'none';
    }
  }

  regConfirmPw.addEventListener('input', checkPasswordMatch);

  /* ==========================================================================
     5. Validation Helpers
     ========================================================================== */
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function setFieldError(group, errorSpan, message) {
    group.classList.add('has-error');
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
  }

  function setFieldSuccess(group, errorSpan) {
    group.classList.remove('has-error');
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
  }

  function clearErrors() {
    document.querySelectorAll('.input-group').forEach(grp => grp.classList.remove('has-error'));
    document.querySelectorAll('.input-error-msg').forEach(msg => {
      msg.textContent = '';
      msg.style.display = 'none';
    });
  }

  // Clear error on input focus
  [loginEmail, loginPassword, regName, regEmail, regPassword, regConfirmPw, forgotEmail].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const group = input.closest('.input-group') || input.parentElement;
        const errorMsg = group.querySelector('.input-error-msg');
        if (group && errorMsg) {
          setFieldSuccess(group, errorMsg);
        }
      });
    }
  });

  /* ==========================================================================
     6. Login Form Submission
     ========================================================================== */
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const emailVal = loginEmail.value.trim();
    const passwordVal = loginPassword.value;
    let hasError = false;

    if (!emailVal) {
      setFieldError(loginEmailGroup, loginEmailError, currentLang === 'vi' ? 'Vui lòng nhập email hoặc tên đăng nhập' : 'Please enter your email or username');
      hasError = true;
    }

    if (!passwordVal) {
      setFieldError(loginPasswordGroup, loginPasswordError, currentLang === 'vi' ? 'Vui lòng nhập mật khẩu' : 'Please enter your password');
      hasError = true;
    } else if (passwordVal.length < 6) {
      setFieldError(loginPasswordGroup, loginPasswordError, currentLang === 'vi' ? 'Mật khẩu phải có ít nhất 6 ký tự' : 'Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

    // Loading State
    setButtonLoading(btnSubmitLogin, true);

    setTimeout(() => {
      setButtonLoading(btnSubmitLogin, false);

      const user = {
        name: emailVal.includes('@') ? emailVal.split('@')[0] : emailVal,
        email: emailVal.includes('@') ? emailVal : `${emailVal}@domain.com`,
        provider: 'Email / Mật khẩu',
        providerType: 'email',
        avatarInitials: (emailVal[0] || 'U').toUpperCase(),
        avatarUrl: '',
        loginTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      if (rememberMeCheckbox.checked) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      }

      showToast({
        title: currentLang === 'vi' ? 'Đăng nhập thành công!' : 'Sign In Successful!',
        message: currentLang === 'vi' ? `Chào mừng bạn quay lại, ${user.name}` : `Welcome back, ${user.name}`,
        type: 'success'
      });

      renderUserProfile(user);
    }, 900);
  });

  /* ==========================================================================
     7. Register Form Submission
     ========================================================================== */
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const nameVal = regName.value.trim();
    const emailVal = regEmail.value.trim();
    const pwVal = regPassword.value;
    const confirmPwVal = regConfirmPw.value;
    const termsAccepted = regTerms.checked;
    let hasError = false;

    if (!nameVal || nameVal.length < 2) {
      setFieldError(regNameGroup, regNameError, currentLang === 'vi' ? 'Vui lòng nhập họ và tên hợp lệ' : 'Please enter a valid full name');
      hasError = true;
    }

    if (!emailVal || !isValidEmail(emailVal)) {
      setFieldError(regEmailGroup, regEmailError, currentLang === 'vi' ? 'Vui lòng nhập địa chỉ email hợp lệ' : 'Please enter a valid email address');
      hasError = true;
    }

    if (!pwVal || pwVal.length < 8) {
      setFieldError(regPasswordGroup, regPasswordError, currentLang === 'vi' ? 'Mật khẩu phải có ít nhất 8 ký tự' : 'Password must be at least 8 characters');
      hasError = true;
    }

    if (pwVal !== confirmPwVal) {
      setFieldError(regConfirmGroup, regConfirmError, currentLang === 'vi' ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match');
      hasError = true;
    }

    if (!termsAccepted) {
      regTermsError.textContent = currentLang === 'vi' ? 'Bạn cần đồng ý với điều khoản để tiếp tục' : 'You must accept the terms to continue';
      regTermsError.style.display = 'block';
      hasError = true;
    }

    if (hasError) return;

    // Loading State
    setButtonLoading(btnSubmitRegister, true);

    setTimeout(() => {
      setButtonLoading(btnSubmitRegister, false);

      const user = {
        name: nameVal,
        email: emailVal,
        provider: 'Tài khoản NexusAuth mới',
        providerType: 'email',
        avatarInitials: getInitials(nameVal),
        avatarUrl: '',
        loginTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));

      showToast({
        title: currentLang === 'vi' ? 'Đăng ký thành công!' : 'Registration Complete!',
        message: currentLang === 'vi' ? `Tài khoản ${nameVal} đã được tạo thành công!` : `Account ${nameVal} created successfully!`,
        type: 'success'
      });

      renderUserProfile(user);
    }, 1100);
  });

  /* ==========================================================================
     8. Google Sign-In Modal Simulation
     ========================================================================== */
  btnGoogleAuth.addEventListener('click', () => {
    googleModal.style.display = 'flex';
  });

  closeGoogleModal.addEventListener('click', () => {
    googleModal.style.display = 'none';
    resetGoogleCustomView();
  });

  // Close when clicking modal backdrop
  googleModal.addEventListener('click', (e) => {
    if (e.target === googleModal) {
      googleModal.style.display = 'none';
      resetGoogleCustomView();
    }
  });

  // Handle clicking one of the predefined Google accounts
  googleAccountItems.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name');
      const email = item.getAttribute('data-email');
      const avatarInitial = item.getAttribute('data-avatar');

      simulateGoogleLogin({
        name,
        email,
        avatarInitials: avatarInitial
      });
    });
  });

  // Switch to custom google account input
  btnCustomGoogleAccount.addEventListener('click', () => {
    googleAccountList.style.display = 'none';
    customGoogleView.style.display = 'flex';
    customGoogleInput.focus();
  });

  btnBackAccountList.addEventListener('click', resetGoogleCustomView);

  function resetGoogleCustomView() {
    googleAccountList.style.display = 'flex';
    customGoogleView.style.display = 'none';
    customGoogleInput.value = '';
  }

  btnConfirmCustomGoogle.addEventListener('click', () => {
    const val = customGoogleInput.value.trim();
    if (!val || !isValidEmail(val)) {
      showToast({
        title: 'Email không hợp lệ',
        message: 'Vui lòng nhập định dạng email Google hợp lệ (ví dụ: user@gmail.com)',
        type: 'error'
      });
      return;
    }

    const name = val.split('@')[0];
    simulateGoogleLogin({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: val,
      avatarInitials: name.charAt(0).toUpperCase()
    });
  });

  function simulateGoogleLogin({ name, email, avatarInitials }) {
    googleModal.style.display = 'none';
    resetGoogleCustomView();

    showToast({
      title: 'Đang xác thực với Google...',
      message: 'Vui lòng chờ trong giây lát',
      type: 'info',
      duration: 1500
    });

    setTimeout(() => {
      const user = {
        name,
        email,
        provider: 'Google OAuth 2.0',
        providerType: 'google',
        avatarInitials,
        avatarUrl: '',
        loginTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));

      showToast({
        title: currentLang === 'vi' ? 'Đăng nhập Google thành công!' : 'Google Sign-In Successful!',
        message: currentLang === 'vi' ? `Chào mừng ${name} đã kết nối tài khoản Google.` : `Welcome ${name}, connected via Google.`,
        type: 'success'
      });

      renderUserProfile(user);
    }, 1200);
  }

  /* ==========================================================================
     9. Forgot Password Modal
     ========================================================================== */
  linkForgotPw.addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal.style.display = 'flex';
    forgotEmail.value = loginEmail.value || '';
  });

  closeForgotModal.addEventListener('click', () => {
    forgotModal.style.display = 'none';
  });

  forgotModal.addEventListener('click', (e) => {
    if (e.target === forgotModal) {
      forgotModal.style.display = 'none';
    }
  });

  formForgotPw.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = forgotEmail.value.trim();

    if (!emailVal || !isValidEmail(emailVal)) {
      forgotEmailError.textContent = currentLang === 'vi' ? 'Vui lòng nhập email hợp lệ' : 'Please enter a valid email';
      forgotEmailError.style.display = 'block';
      return;
    }

    setButtonLoading(btnSubmitForgot, true);

    setTimeout(() => {
      setButtonLoading(btnSubmitForgot, false);
      forgotModal.style.display = 'none';
      formForgotPw.reset();

      showToast({
        title: currentLang === 'vi' ? 'Đã gửi hướng dẫn khôi phục!' : 'Reset Link Sent!',
        message: currentLang === 'vi' ? `Vui lòng kiểm tra hộp thư đến tại ${emailVal}` : `Please check your inbox at ${emailVal}`,
        type: 'success',
        duration: 5000
      });
    }, 1000);
  });

  /* ==========================================================================
     10. Render User Profile & Logout
     ========================================================================== */

  function logLoginSession(user) {
    const logs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '[]');
    const entry = {
      id: 'sess-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      name: user.name,
      email: user.email,
      provider: user.provider || (user.providerType === 'google' ? 'Google OAuth 2.0' : 'Email & Mật khẩu'),
      providerType: user.providerType || 'email',
      avatarInitials: user.avatarInitials || getInitials(user.name),
      loginTime: new Date().toISOString(),
      ipSimulated: '192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
      status: 'active',
      role: 'user'
    };
    logs.unshift(entry);
    if (logs.length > 200) logs.splice(200);
    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
  }

  /* ==========================================================================
     10. File Hub & Upload Dashboard Logic
     ========================================================================== */
  const FILES_STORAGE_KEY = 'nexusauth_uploaded_files_v1';
  const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1Vc0cv2dB-6wLxuaEcbv-LjKi7nq3xHXQ';
  const DRIVE_FOLDER_ID = '1Vc0cv2dB-6wLxuaEcbv-LjKi7nq3xHXQ';
  const DRIVE_WEBHOOK_KEY = 'nexusauth_drive_webhook';

  let filesList = [];
  let currentFilter = 'all';
  let currentSearchQuery = '';
  let activePreviewFile = null;

  // Google Drive DOM Elements
  const driveModal = document.getElementById('drive-modal');
  const closeDriveModal = document.getElementById('close-drive-modal');
  const btnOpenDriveModal = document.getElementById('btn-open-drive-modal');
  const btnSyncAllDrive = document.getElementById('btn-sync-all-drive');
  const btnModalSyncAll = document.getElementById('btn-modal-sync-all');
  const driveWebhookUrlInput = document.getElementById('drive-webhook-url');
  const btnSaveWebhook = document.getElementById('btn-save-webhook');
  const btnViewScript = document.getElementById('btn-view-script');
  const scriptSnippetWrap = document.getElementById('script-snippet-wrap');
  const btnCopyScript = document.getElementById('btn-copy-script');

  // Initial Seed Files
  const DEFAULT_SAMPLE_FILES = [
    {
      id: 'file-sample-1',
      name: 'Bao_cao_tai_chinh_Q1_2026.pdf',
      type: 'doc',
      ext: 'pdf',
      size: 2516582,
      formattedSize: '2.4 MB',
      createdAt: '15/10/2026, 14:32',
      content: 'TÀI LIỆU BÁO CÁO TỔNG KẾT QUÝ 1 - 2026\nHệ thống NexusAuth Cloud Storage.\nTổng người dùng hoạt động: 125,000+\nĐộ tin cậy máy chủ: 99.99%\nTrạng thái mã hóa: AES-256 E2EE Đạt chuẩn quốc tế.',
      dataUrl: null
    },
    {
      id: 'file-sample-2',
      name: 'Kien_truc_NexusAuth_E2EE.png',
      type: 'img',
      ext: 'png',
      size: 1887436,
      formattedSize: '1.8 MB',
      createdAt: '16/10/2026, 09:15',
      content: 'Sơ đồ luồng mã hóa E2EE và xác thực hai lớp Google OAuth 2.0.',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%236366F1"/><stop offset="100%" stop-color="%23EC4899"/></linearGradient></defs><rect width="600" height="350" rx="16" fill="%230f1426"/><circle cx="150" cy="175" r="70" fill="url(%23g)" opacity="0.3"/><circle cx="450" cy="175" r="70" fill="%2306b6d4" opacity="0.3"/><text x="300" y="160" fill="%23ffffff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">NexusAuth Architecture 2026</text><text x="300" y="195" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">End-to-End Encryption - AES-256 Storage</text></svg>'
    },
    {
      id: 'file-sample-3',
      name: 'Danh_sach_khach_hang_doanh_nghiep.xlsx',
      type: 'data',
      ext: 'xlsx',
      size: 860160,
      formattedSize: '840 KB',
      createdAt: '17/10/2026, 11:05',
      content: 'STT, Doanh Nghiệp, Mã Số Thuế, Quy Mô, Cấp Độ Bảo Mật\n1, Vingroup Tech, 0101245789, 5000+, Doanh nghiệp VIP\n2, FPT Software, 0101245790, 2000+, Đối tác chiến lược\n3, Viettel Solutions, 0101245791, 10000+, Cực kỳ bảo mật\n4, VNPT Cloud, 0101245792, 3500+, Tiêu chuẩn ISO/IEC',
      dataUrl: null
    },
    {
      id: 'file-sample-4',
      name: 'Cau_hinh_he_thong_API.json',
      type: 'code',
      ext: 'json',
      size: 46080,
      formattedSize: '45 KB',
      createdAt: '17/10/2026, 18:20',
      content: JSON.stringify({
        appName: "NexusAuth Data Hub",
        version: "2.4.0",
        environment: "production",
        security: {
          encryption: "AES-256-GCM",
          twoFactorRequired: true,
          tokenExpiryHours: 24
        },
        storage: {
          allocatedQuotaMB: 10240,
          cloudSync: "enabled",
          autoMalwareScan: true
        },
        supportedUploadTypes: [
          ".pdf", ".docx", ".xlsx", ".csv", ".json", ".png", ".jpg", ".zip", ".txt"
        ]
      }, null, 2),
      dataUrl: null
    }
  ];

  function loadSavedFiles() {
    try {
      const saved = localStorage.getItem(FILES_STORAGE_KEY);
      if (saved) {
        filesList = JSON.parse(saved);
      } else {
        filesList = [...DEFAULT_SAMPLE_FILES];
        localStorage.setItem(FILES_STORAGE_KEY, JSON.stringify(filesList));
      }
    } catch (e) {
      filesList = [...DEFAULT_SAMPLE_FILES];
    }
  }

  function saveFilesToStorage() {
    try {
      localStorage.setItem(FILES_STORAGE_KEY, JSON.stringify(filesList));
    } catch (e) {
      console.warn('LocalStorage limit reached or quota exceeded:', e);
    }
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function getFileCategory(ext) {
    ext = (ext || '').toLowerCase();
    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(ext)) return 'doc';
    if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp'].includes(ext)) return 'img';
    if (['xlsx', 'xls', 'csv', 'tsv'].includes(ext)) return 'data';
    if (['json', 'sql', 'js', 'ts', 'html', 'css', 'py', 'md', 'xml', 'yaml', 'yml'].includes(ext)) return 'code';
    return 'doc';
  }

  function getIconBadgeClass(ext, type) {
    ext = (ext || '').toLowerCase();
    if (ext === 'pdf') return 'icon-type-pdf';
    if (type === 'img') return 'icon-type-img';
    if (type === 'data') return 'icon-type-data';
    if (type === 'code') return 'icon-type-code';
    if (['zip', 'rar', '7z', 'tar'].includes(ext)) return 'icon-type-zip';
    if (type === 'doc') return 'icon-type-doc';
    return 'icon-type-other';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function updateDashboardStats() {
    const totalBytes = filesList.reduce((acc, f) => acc + (f.size || 0), 0);
    const maxQuotaBytes = 10 * 1024 * 1024 * 1024; // 10 GB
    const percent = Math.min(100, Math.max(0.1, (totalBytes / maxQuotaBytes) * 100));

    if (statStorageText) statStorageText.textContent = formatBytes(totalBytes);
    if (statStorageBar) statStorageBar.style.width = `${percent.toFixed(1)}%`;
    if (statStoragePercent) statStoragePercent.textContent = `${percent.toFixed(1)}%`;

    const docCount = filesList.filter(f => f.type === 'doc').length;
    const imgCount = filesList.filter(f => f.type === 'img').length;
    const dataCount = filesList.filter(f => f.type === 'data' || f.type === 'code').length;

    if (statFilesCount) statFilesCount.textContent = filesList.length;
    if (filesCounterBadge) filesCounterBadge.textContent = `${filesList.length} ${currentLang === 'vi' ? 'tệp' : 'files'}`;
    if (statDocsCount) statDocsCount.textContent = `${docCount} ${currentLang === 'vi' ? 'Tài liệu' : 'Documents'}`;
    if (statImgsCount) statImgsCount.textContent = `${imgCount} ${currentLang === 'vi' ? 'Hình ảnh' : 'Images'}`;
    if (statDataCount) statDataCount.textContent = `${dataCount} ${currentLang === 'vi' ? 'Dữ liệu / Code' : 'Data / Code'}`;
  }

  function renderFileList() {
    if (!filesContainer) return;

    let filtered = filesList;

    // Filter by Category
    if (currentFilter !== 'all') {
      filtered = filtered.filter(f => f.type === currentFilter);
    }

    // Filter by Search Query
    if (currentSearchQuery.trim()) {
      const q = currentSearchQuery.trim().toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(q) || 
        (f.ext && f.ext.toLowerCase().includes(q))
      );
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      filesContainer.innerHTML = '';
      if (filesEmptyState) filesEmptyState.style.display = 'flex';
      return;
    }

    if (filesEmptyState) filesEmptyState.style.display = 'none';

    filesContainer.innerHTML = filtered.map(file => {
      const extLabel = (file.ext || 'FILE').toUpperCase().slice(0, 4);
      const iconClass = getIconBadgeClass(file.ext, file.type);

      return `
        <div class="file-card" data-id="${file.id}">
          <div class="file-card-top">
            <div class="file-type-icon ${iconClass}">
              ${extLabel}
            </div>
            <div class="file-info-block">
              <h4 class="file-name-title" data-action="preview" data-id="${file.id}" title="${escapeHtml(file.name)}">
                ${escapeHtml(file.name)}
              </h4>
              <div class="file-size-date">
                <span>${file.formattedSize || formatBytes(file.size)}</span>
                <span>•</span>
                <span>${file.createdAt}</span>
              </div>
            </div>
          </div>
          <div class="file-card-bottom">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="file-badge-enc">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                AES-256
              </span>
              ${file.driveSynced ? `<span class="file-badge-drive" title="Tệp đã được đồng bộ lên Google Drive">☁️ Drive</span>` : ''}
            </div>
            <div class="file-actions-group">
              <button type="button" class="file-action-btn drive-sync-btn ${file.driveSynced ? 'drive-synced' : ''}" data-action="sync-drive" data-id="${file.id}" title="${file.driveSynced ? 'Đã lưu trên Google Drive (Nhấn để mở thư mục)' : 'Đồng bộ tệp này lên Google Drive'}">
                <svg width="15" height="15" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                  <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H1.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                  <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h26z" fill="#00ac47"/>
                  <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-26.05l5.85 10.1z" fill="#ea4335"/>
                  <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                  <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                  <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h26.05c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                </svg>
              </button>
              <button type="button" class="file-action-btn" data-action="preview" data-id="${file.id}" title="${currentLang === 'vi' ? 'Xem trước nội dung' : 'Preview content'}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button type="button" class="file-action-btn" data-action="download" data-id="${file.id}" title="${currentLang === 'vi' ? 'Tải tệp về máy' : 'Download file'}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <button type="button" class="file-action-btn delete-btn" data-action="delete" data-id="${file.id}" title="${currentLang === 'vi' ? 'Xóa tệp' : 'Delete file'}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Upload Hub Mode Switcher (Files vs Raw Data)
  if (tabModeFiles && tabModeRaw) {
    tabModeFiles.addEventListener('click', () => {
      tabModeFiles.classList.add('active');
      tabModeRaw.classList.remove('active');
      if (panelUploadFiles) panelUploadFiles.style.display = 'block';
      if (panelUploadRaw) panelUploadRaw.style.display = 'none';
    });

    tabModeRaw.addEventListener('click', () => {
      tabModeRaw.classList.add('active');
      tabModeFiles.classList.remove('active');
      if (panelUploadFiles) panelUploadFiles.style.display = 'none';
      if (panelUploadRaw) panelUploadRaw.style.display = 'block';
    });
  }

  // File Drag & Drop Handlers
  if (dropZone && fileUploader) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        handleUploadFiles(droppedFiles);
      }
    });

    dropZone.addEventListener('click', (e) => {
      if (e.target.closest('#btn-browse-files') || e.target === dropZone || dropZone.contains(e.target)) {
        fileUploader.click();
      }
    });

    fileUploader.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleUploadFiles(e.target.files);
        fileUploader.value = '';
      }
    });
  }

  if (btnBrowseFiles && fileUploader) {
    btnBrowseFiles.addEventListener('click', (e) => {
      e.stopPropagation();
      fileUploader.click();
    });
  }

  // File Upload Processing & Progress Simulation
  function handleUploadFiles(files) {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (uploadQueueContainer) uploadQueueContainer.style.display = 'flex';
    if (queueCountText) {
      queueCountText.textContent = `${fileArray.length} ${currentLang === 'vi' ? 'tệp đang xử lý' : 'files queued'}`;
    }

    if (queueItemsList) {
      queueItemsList.innerHTML = fileArray.map((f, i) => `
        <div class="queue-item" id="queue-item-${i}">
          <div class="queue-item-meta">
            <span class="queue-item-name" title="${escapeHtml(f.name)}">${escapeHtml(f.name)} (${formatBytes(f.size)})</span>
            <span class="queue-item-status" id="queue-status-${i}">Đang chuẩn bị...</span>
          </div>
          <div class="queue-item-bar">
            <div class="queue-item-fill" id="queue-fill-${i}" style="width: 5%;"></div>
          </div>
        </div>
      `).join('');
    }

    let completedCount = 0;
    const nowStr = new Date().toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    fileArray.forEach((file, index) => {
      const fillEl = document.getElementById(`queue-fill-${index}`);
      const statusEl = document.getElementById(`queue-status-${index}`);
      const ext = file.name.split('.').pop() || '';
      const category = getFileCategory(ext);

      let progress = 10;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress > 95) progress = 95;
        if (fillEl) fillEl.style.width = `${progress}%`;
        if (statusEl) statusEl.textContent = `${currentLang === 'vi' ? 'Đang mã hóa & tải lên...' : 'Encrypting & uploading...'} ${progress}%`;
      }, 150);

      const reader = new FileReader();

      const finishUpload = (content, dataUrl) => {
        clearInterval(interval);
        if (fillEl) fillEl.style.width = '100%';
        if (statusEl) {
          statusEl.textContent = currentLang === 'vi' ? 'Hoàn tất ✓' : 'Done ✓';
          statusEl.style.color = '#10b981';
        }

        const newFileObj = {
          id: 'file-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          name: file.name,
          type: category,
          ext: ext.toLowerCase(),
          size: file.size,
          formattedSize: formatBytes(file.size),
          createdAt: nowStr,
          content: content || '',
          dataUrl: dataUrl || null
        };

        filesList.unshift(newFileObj);
        completedCount++;

        if (completedCount === fileArray.length) {
          saveFilesToStorage();
          updateDashboardStats();
          renderFileList();

          setTimeout(() => {
            if (uploadQueueContainer) uploadQueueContainer.style.display = 'none';
          }, 1000);

          showToast({
            title: currentLang === 'vi' ? 'Tải lên thành công!' : 'Upload Complete!',
            message: currentLang === 'vi' 
              ? `Đã mã hóa và lưu trữ ${completedCount} tệp an toàn vào kho dữ liệu.` 
              : `Encrypted and stored ${completedCount} files successfully.`,
            type: 'success'
          });
        }
      };

      if (category === 'img') {
        reader.onload = (e) => finishUpload('Hình ảnh nhị phân', e.target.result);
        reader.readAsDataURL(file);
      } else if (category === 'code' || category === 'data' || ['txt', 'md', 'sql', 'json', 'csv'].includes(ext.toLowerCase())) {
        reader.onload = (e) => finishUpload(e.target.result, null);
        reader.readAsText(file);
      } else {
        setTimeout(() => finishUpload('Nội dung tài liệu đã được mã hóa an toàn theo chuẩn AES-256.', null), 700);
      }
    });
  }

  // Raw Data Form Submission
  if (rawDataForm) {
    rawDataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = rawFileName ? rawFileName.value.trim() : '';
      const type = rawFileType ? rawFileType.value : 'json';
      const content = rawContent ? rawContent.value.trim() : '';

      if (!name || !content) {
        showToast({
          title: currentLang === 'vi' ? 'Thiếu thông tin' : 'Missing Information',
          message: currentLang === 'vi' ? 'Vui lòng nhập đầy đủ tên tệp và nội dung dữ liệu' : 'Please provide file name and content',
          type: 'warning'
        });
        return;
      }

      const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : type;
      const sizeBytes = new Blob([content]).size;
      const nowStr = new Date().toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const newFileObj = {
        id: 'file-raw-' + Date.now(),
        name: name.includes('.') ? name : `${name}.${type}`,
        type: getFileCategory(ext),
        ext: ext,
        size: sizeBytes,
        formattedSize: formatBytes(sizeBytes),
        createdAt: nowStr,
        content: content,
        dataUrl: null
      };

      filesList.unshift(newFileObj);
      saveFilesToStorage();
      updateDashboardStats();
      renderFileList();

      rawDataForm.reset();

      showToast({
        title: currentLang === 'vi' ? 'Lưu dữ liệu thành công!' : 'Data Saved!',
        message: currentLang === 'vi' 
          ? `Tệp "${newFileObj.name}" đã được mã hóa và đưa vào kho dữ liệu.` 
          : `File "${newFileObj.name}" encrypted and added to storage.`,
        type: 'success'
      });
    });
  }

  // Raw Form Helpers (Format JSON, Sample Data, Clear)
  if (btnFormatJson && rawContent) {
    btnFormatJson.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(rawContent.value);
        rawContent.value = JSON.stringify(parsed, null, 2);
        showToast({ title: 'JSON Formatted', message: 'Đã chuẩn hóa định dạng JSON đẹp mắt', type: 'info', duration: 1800 });
      } catch (err) {
        showToast({ title: 'JSON Không Hợp Lệ', message: 'Nội dung chưa đúng cấu trúc cú pháp JSON', type: 'error' });
      }
    });
  }

  if (btnSampleData && rawContent && rawFileName) {
    btnSampleData.addEventListener('click', () => {
      rawFileName.value = 'khach_hang_tiem_nang_2026.json';
      if (rawFileType) rawFileType.value = 'json';
      rawContent.value = JSON.stringify({
        chi_nhanh: "Hồ Chí Minh & Hà Nội",
        nam_tai_chinh: 2026,
        danh_sach: [
          { id: 101, ten: "Nguyễn Hoàng Long", email: "long.nh@startup.vn", goi: "Enterprise" },
          { id: 102, ten: "Lê Thị Thu Thảo", email: "thao.le@fintech.io", goi: "Professional" }
        ],
        ma_hoa: "AES-256"
      }, null, 2);
      showToast({ title: 'Đã Chèn Dữ Liệu Mẫu', message: 'Đã điền dữ liệu JSON mẫu vào trường nhập liệu', type: 'info', duration: 1800 });
    });
  }

  if (btnClearRaw && rawContent && rawFileName) {
    btnClearRaw.addEventListener('click', () => {
      rawContent.value = '';
      rawFileName.value = '';
      showToast({ title: 'Đã Xóa Trắng', message: 'Đã dọn dẹp các trường nhập liệu', type: 'info', duration: 1500 });
    });
  }

  // Search & Filter Listeners
  if (fileSearchInput) {
    fileSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (btnClearSearch) {
        btnClearSearch.style.display = currentSearchQuery ? 'block' : 'none';
      }
      renderFileList();
    });
  }

  if (btnClearSearch && fileSearchInput) {
    btnClearSearch.addEventListener('click', () => {
      fileSearchInput.value = '';
      currentSearchQuery = '';
      btnClearSearch.style.display = 'none';
      renderFileList();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      renderFileList();
    });
  });

  // View Mode Toggles (Grid vs List)
  if (viewModeGrid && viewModeList && filesContainer) {
    viewModeGrid.addEventListener('click', () => {
      viewModeGrid.classList.add('active');
      viewModeList.classList.remove('active');
      filesContainer.classList.remove('list-view');
      filesContainer.classList.add('grid-view');
    });

    viewModeList.addEventListener('click', () => {
      viewModeList.classList.add('active');
      viewModeGrid.classList.remove('active');
      filesContainer.classList.remove('grid-view');
      filesContainer.classList.add('list-view');
    });
  }

  // File Card Actions (Preview, Download, Delete)
  if (filesContainer) {
    filesContainer.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-action]');
      if (!targetBtn) return;

      const action = targetBtn.getAttribute('data-action');
      const fileId = targetBtn.getAttribute('data-id');
      const file = filesList.find(f => f.id === fileId);
      if (!file) return;

      if (action === 'preview') {
        openFilePreview(file);
      } else if (action === 'download') {
        downloadFile(file);
      } else if (action === 'delete') {
        deleteFile(file);
      } else if (action === 'sync-drive') {
        syncSingleFileToDrive(file);
      }
    });
  }

  // Empty state button triggers browse action
  if (btnEmptyUpload && dropZone) {
    btnEmptyUpload.addEventListener('click', () => {
      dropZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      dropZone.classList.add('dragover');
      setTimeout(() => dropZone.classList.remove('dragover'), 1200);
      if (fileUploader) fileUploader.click();
    });
  }

  // Preview Modal Logic
  function openFilePreview(file) {
    if (!previewModal || !previewBody) return;
    activePreviewFile = file;

    if (previewBadge) previewBadge.textContent = (file.ext || 'FILE').toUpperCase();
    if (previewFileName) previewFileName.textContent = file.name;
    if (previewFileMeta) {
      previewFileMeta.textContent = `${currentLang === 'vi' ? 'Dung lượng:' : 'Size:'} ${file.formattedSize || formatBytes(file.size)} • ${currentLang === 'vi' ? 'Khởi tạo lúc' : 'Created at'} ${file.createdAt}`;
    }

    if (file.type === 'img' && file.dataUrl) {
      previewBody.innerHTML = `
        <div class="preview-image-wrap">
          <img src="${file.dataUrl}" alt="${escapeHtml(file.name)}">
        </div>
      `;
    } else if (file.type === 'data' && file.content && file.content.includes(',')) {
      const rows = file.content.split('\n').filter(r => r.trim());
      const headerCols = rows[0] ? rows[0].split(',') : [];
      const dataRows = rows.slice(1);

      previewBody.innerHTML = `
        <div class="preview-table-wrap">
          <table class="preview-table">
            <thead>
              <tr>${headerCols.map(c => `<th>${escapeHtml(c.trim())}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${dataRows.map(r => `<tr>${r.split(',').map(c => `<td>${escapeHtml(c.trim())}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (file.type === 'code' || file.type === 'data' || ['txt', 'md', 'sql', 'json'].includes(file.ext)) {
      previewBody.innerHTML = `
        <pre class="preview-code-block"><code>${escapeHtml(file.content || '// Không có nội dung văn bản')}</code></pre>
      `;
    } else {
      previewBody.innerHTML = `
        <div class="preview-doc-summary">
          <div class="file-type-icon ${getIconBadgeClass(file.ext, file.type)}" style="width: 64px; height: 64px; font-size: 1.25rem;">
            ${(file.ext || 'DOC').toUpperCase()}
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">${escapeHtml(file.name)}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 480px;">
            ${escapeHtml(file.content || 'Tài liệu nhị phân đã được mã hóa an toàn trên hệ thống. Bạn có thể nhấn Tải Tệp Về Máy để mở với ứng dụng chuyên dụng.')}
          </p>
          <span style="font-size: 0.8rem; color: #10b981; font-weight: 600;">🔒 Mã Hóa Đầu Cuối (E2EE) • SHA-256 Verified</span>
        </div>
      `;
    }

    previewModal.style.display = 'flex';
  }

  if (closePreviewModal && previewModal) {
    closePreviewModal.addEventListener('click', () => {
      previewModal.style.display = 'none';
      activePreviewFile = null;
    });

    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        previewModal.style.display = 'none';
        activePreviewFile = null;
      }
    });
  }

  if (btnPreviewCopy) {
    btnPreviewCopy.addEventListener('click', () => {
      if (!activePreviewFile) return;
      const textToCopy = activePreviewFile.content || activePreviewFile.name;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast({
          title: currentLang === 'vi' ? 'Đã sao chép!' : 'Copied!',
          message: currentLang === 'vi' ? 'Nội dung đã được lưu vào bộ nhớ tạm.' : 'Content copied to clipboard.',
          type: 'success',
          duration: 2000
        });
      }).catch(() => {
        showToast({ title: 'Lỗi', message: 'Không thể sao chép vào bộ nhớ', type: 'error' });
      });
    });
  }

  if (btnPreviewDownload) {
    btnPreviewDownload.addEventListener('click', () => {
      if (activePreviewFile) {
        downloadFile(activePreviewFile);
      }
    });
  }

  // Download File Helper
  function downloadFile(file) {
    if (file.dataUrl && file.dataUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.dataUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast({ title: 'Đang tải xuống', message: `Bắt đầu tải ${file.name}`, type: 'info', duration: 2000 });
      return;
    }

    const blob = new Blob([file.content || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast({
      title: currentLang === 'vi' ? 'Đang tải xuống' : 'Downloading',
      message: `${currentLang === 'vi' ? 'Bắt đầu tải tệp' : 'Started downloading'} ${file.name}`,
      type: 'info',
      duration: 2000
    });
  }

  // Delete File Helper
  function deleteFile(file) {
    const confirmMsg = currentLang === 'vi' 
      ? `Bạn có chắc muốn xóa tệp "${file.name}" khỏi kho lưu trữ?` 
      : `Are you sure you want to delete "${file.name}"?`;

    if (!confirm(confirmMsg)) return;

    filesList = filesList.filter(f => f.id !== file.id);
    saveFilesToStorage();
    updateDashboardStats();
    renderFileList();

    showToast({
      title: currentLang === 'vi' ? 'Đã xóa tệp' : 'File Deleted',
      message: currentLang === 'vi' ? `Tệp "${file.name}" đã được xóa khỏi kho lưu trữ.` : `File "${file.name}" has been deleted.`,
      type: 'warning'
    });
  }

  // Account Profile Modal
  if (btnOpenProfileModal && profileModal) {
    btnOpenProfileModal.addEventListener('click', () => {
      profileModal.style.display = 'flex';
    });
  }

  if (closeProfileModal && profileModal) {
    closeProfileModal.addEventListener('click', () => {
      profileModal.style.display = 'none';
    });

    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) {
        profileModal.style.display = 'none';
      }
    });
  }

  /* ==========================================================================
     Google Drive Cloud Synchronization Handlers
     ========================================================================== */
  function openDriveModal() {
    if (!driveModal) return;
    if (driveWebhookUrlInput) {
      driveWebhookUrlInput.value = localStorage.getItem(DRIVE_WEBHOOK_KEY) || '';
    }
    driveModal.style.display = 'flex';
  }

  if (btnOpenDriveModal) btnOpenDriveModal.addEventListener('click', openDriveModal);

  if (closeDriveModal && driveModal) {
    closeDriveModal.addEventListener('click', () => {
      driveModal.style.display = 'none';
    });

    driveModal.addEventListener('click', (e) => {
      if (e.target === driveModal) {
        driveModal.style.display = 'none';
      }
    });
  }

  if (btnViewScript && scriptSnippetWrap) {
    btnViewScript.addEventListener('click', () => {
      const isHidden = scriptSnippetWrap.style.display === 'none';
      scriptSnippetWrap.style.display = isHidden ? 'flex' : 'none';
      btnViewScript.textContent = isHidden ? 'Ẩn Mã Apps Script' : '📋 Xem Mã Apps Script (1-Click)';
    });
  }

  if (btnCopyScript) {
    btnCopyScript.addEventListener('click', () => {
      const scriptCode = `function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var folder = DriveApp.getFolderById("1Vc0cv2dB-6wLxuaEcbv-LjKi7nq3xHXQ");
  var decoded = Utilities.base64Decode(data.base64.split(",")[1] || data.base64);
  var blob = Utilities.newBlob(decoded, data.mimeType, data.fileName);
  var file = folder.createFile(blob);
  return ContentService.createTextOutput(JSON.stringify({status:"ok", url: file.getUrl()}))
    .setMimeType(ContentService.MimeType.JSON);
}`;
      navigator.clipboard.writeText(scriptCode).then(() => {
        showToast({ title: 'Đã sao chép mã!', message: 'Mã Google Apps Script đã được lưu vào bộ nhớ tạm.', type: 'success' });
      });
    });
  }

  if (btnSaveWebhook && driveWebhookUrlInput) {
    btnSaveWebhook.addEventListener('click', () => {
      const url = driveWebhookUrlInput.value.trim();
      if (url) {
        localStorage.setItem(DRIVE_WEBHOOK_KEY, url);
        showToast({ title: 'Đã lưu Webhook', message: 'Cấu hình Webhook Google Apps Script đã sẵn sàng hoạt động.', type: 'success' });
      } else {
        localStorage.removeItem(DRIVE_WEBHOOK_KEY);
        showToast({ title: 'Đã xóa Webhook', message: 'Hệ thống sẽ chạy ở chế độ mô phỏng đám mây & liên kết Drive.', type: 'info' });
      }
    });
  }

  function syncSingleFileToDrive(file) {
    if (file.driveSynced) {
      window.open(DRIVE_FOLDER_URL, '_blank');
      showToast({
        title: 'Mở Google Drive',
        message: `Đang mở thư mục Google Drive chứa tệp "${file.name}"...`,
        type: 'info'
      });
      return;
    }

    const webhookUrl = localStorage.getItem(DRIVE_WEBHOOK_KEY);

    showToast({
      title: 'Đang đồng bộ...',
      message: `Đang mã hóa và đẩy "${file.name}" lên Google Drive (Folder: 1Vc0cv2dB...)`,
      type: 'info',
      duration: 2000
    });

    if (webhookUrl) {
      try {
        const payload = {
          fileName: file.name,
          mimeType: file.type === 'img' ? 'image/png' : 'text/plain',
          base64: file.dataUrl || (typeof btoa !== 'undefined' ? btoa(unescape(encodeURIComponent(file.content || ''))) : '')
        };

        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (err) {}
    }

    setTimeout(() => {
      file.driveSynced = true;
      saveFilesToStorage();
      renderFileList();

      showToast({
        title: 'Đồng bộ Google Drive thành công! ☁️',
        message: `Tệp "${file.name}" đã được lưu an toàn vào thư mục Google Drive.`,
        type: 'success',
        duration: 4000
      });
    }, 1200);
  }

  function syncAllFilesToDrive() {
    if (filesList.length === 0) {
      showToast({ title: 'Kho dữ liệu trống', message: 'Vui lòng tải lên tệp trước khi đồng bộ lên Google Drive.', type: 'warning' });
      return;
    }

    showToast({
      title: 'Đang đẩy toàn bộ dữ liệu...',
      message: `Đang tải ${filesList.length} tệp lên thư mục Google Drive 1Vc0cv2dB-6wLxuaEcbv-LjKi7nq3xHXQ...`,
      type: 'info',
      duration: 2500
    });

    const webhookUrl = localStorage.getItem(DRIVE_WEBHOOK_KEY);

    filesList.forEach((file) => {
      if (webhookUrl && !file.driveSynced) {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              mimeType: file.type === 'img' ? 'image/png' : 'text/plain',
              base64: file.dataUrl || (typeof btoa !== 'undefined' ? btoa(unescape(encodeURIComponent(file.content || ''))) : '')
            })
          }).catch(() => {});
        } catch (e) {}
      }
      file.driveSynced = true;
    });

    setTimeout(() => {
      saveFilesToStorage();
      renderFileList();

      if (driveModal) driveModal.style.display = 'none';

      showToast({
        title: 'Đồng bộ hoàn tất 100%! ☁️',
        message: `Tất cả ${filesList.length} tệp đã được đồng bộ lên thư mục Google Drive.`,
        type: 'success',
        duration: 4500
      });
    }, 1500);
  }

  if (btnSyncAllDrive) btnSyncAllDrive.addEventListener('click', syncAllFilesToDrive);
  if (btnModalSyncAll) btnModalSyncAll.addEventListener('click', syncAllFilesToDrive);

  // Render User Dashboard & Session Display
  function renderUserProfile(user) {
    logLoginSession(user);

    // Switch Views: Hide Auth, Show File Upload Dashboard
    if (authCard) authCard.style.display = 'none';
    if (dashboardCard) dashboardCard.style.display = 'flex';

    // Populate Top Bar User Info
    if (dashUserName) dashUserName.textContent = user.name;
    if (dashUserEmail) dashUserEmail.textContent = user.email;
    if (dashUserInitials) dashUserInitials.textContent = user.avatarInitials || getInitials(user.name);
    if (dashUserProvider) {
      dashUserProvider.textContent = user.provider || (user.providerType === 'google' ? 'Google OAuth 2.0' : 'Email / Mật khẩu');
    }

    // Populate Profile Details Modal
    if (modalUserName) modalUserName.textContent = user.name;
    if (modalUserEmail) modalUserEmail.textContent = user.email;
    if (modalUserAvatar) modalUserAvatar.textContent = user.avatarInitials || getInitials(user.name);
    if (modalUserProvider) modalUserProvider.textContent = user.provider || 'Google OAuth 2.0';
    if (modalUserTime) modalUserTime.textContent = user.loginTime || 'Vừa xong';

    // Initialize File Management
    loadSavedFiles();
    updateDashboardStats();
    renderFileList();
  }

  // Logout Handlers (Both Dashboard Top Bar and Profile Modal)
  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    if (dashboardCard) dashboardCard.style.display = 'none';
    if (profileModal) profileModal.style.display = 'none';
    if (previewModal) previewModal.style.display = 'none';
    if (authCard) authCard.style.display = 'block';

    // Reset forms
    if (formLogin) formLogin.reset();
    if (formRegister) formRegister.reset();
    if (pwStrengthMeter) pwStrengthMeter.className = 'pw-strength-meter';
    if (strengthText) strengthText.textContent = currentLang === 'vi' ? 'Chưa nhập' : 'Empty';
    if (pwMatchIcon) pwMatchIcon.style.display = 'none';

    showToast({
      title: currentLang === 'vi' ? 'Đã đăng xuất' : 'Logged out',
      message: currentLang === 'vi' ? 'Bạn đã đăng xuất an toàn khỏi hệ thống.' : 'You have safely logged out.',
      type: 'info'
    });
  }

  if (btnDashLogout) {
    btnDashLogout.addEventListener('click', handleLogout);
  }

  if (btnModalLogout) {
    btnModalLogout.addEventListener('click', handleLogout);
  }

  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function setButtonLoading(button, isLoading) {
    const textSpan = button.querySelector('.btn-text');
    const loaderSpan = button.querySelector('.btn-loader');
    const arrowSvg = button.querySelector('.btn-arrow');

    if (isLoading) {
      button.disabled = true;
      if (textSpan) textSpan.style.opacity = '0.4';
      if (loaderSpan) loaderSpan.style.display = 'inline-flex';
      if (arrowSvg) arrowSvg.style.display = 'none';
    } else {
      button.disabled = false;
      if (textSpan) textSpan.style.opacity = '1';
      if (loaderSpan) loaderSpan.style.display = 'none';
      if (arrowSvg) arrowSvg.style.display = 'inline-block';
    }
  }

  /* ==========================================================================
     11. Theme Switcher (Dark / Light)
     ========================================================================== */
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    showToast({
      title: newTheme === 'dark' ? 'Chế độ tối' : 'Chế độ sáng',
      message: `Đã chuyển sang giao diện ${newTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`,
      type: 'info',
      duration: 2000
    });
  });

  /* ==========================================================================
     12. Language Switcher (VI / EN)
     ========================================================================== */
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    const flagSpan = langToggle.querySelector('.lang-flag');
    const textSpan = langToggle.querySelector('.lang-text');

    if (currentLang === 'vi') {
      flagSpan.textContent = '🇻🇳';
      textSpan.textContent = 'VI';
      document.getElementById('google-btn-label').textContent = 'Tiếp tục với Google';
      document.getElementById('divider-text').textContent = 'hoặc tiếp tục với email';
    } else {
      flagSpan.textContent = '🇺🇸';
      textSpan.textContent = 'EN';
      document.getElementById('google-btn-label').textContent = 'Continue with Google';
      document.getElementById('divider-text').textContent = 'or continue with email';
    }

    // Refresh active tab headers
    const isLogin = tabLogin.classList.contains('active');
    switchTab(isLogin ? 'login' : 'register');

    showToast({
      title: currentLang === 'vi' ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English',
      message: currentLang === 'vi' ? 'Giao diện đã đổi sang Tiếng Việt' : 'UI switched to English',
      type: 'info',
      duration: 2000
    });
  });

  /* ==========================================================================
     13. Check Initial Session
     ========================================================================== */
  const existingUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingUser) {
    try {
      const parsed = JSON.parse(existingUser);
      renderUserProfile(parsed);
    } catch (e) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
});
