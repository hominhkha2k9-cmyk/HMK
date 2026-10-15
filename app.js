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
  const profileCard = document.getElementById('profile-card');
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

  // DOM Elements: Profile Dashboard & Logout
  const userDisplayName = document.getElementById('user-display-name');
  const userDisplayEmail = document.getElementById('user-display-email');
  const userAvatar = document.getElementById('user-avatar');
  const userAvatarInitials = document.getElementById('user-avatar-initials');
  const userProviderBadge = document.getElementById('user-provider-badge');
  const userLoginTime = document.getElementById('user-login-time');
  const btnLogout = document.getElementById('btn-logout');
  const btnDemoAction = document.getElementById('btn-demo-action');

  // Theme & Language
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  // State Management
  let currentLang = 'vi'; // 'vi' or 'en'
  const LOCAL_STORAGE_KEY = 'nexusauth_current_user';
  const THEME_STORAGE_KEY = 'nexusauth_theme';

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
  function renderUserProfile(user) {
    authCard.style.display = 'none';
    profileCard.style.display = 'flex';

    userDisplayName.textContent = user.name;
    userDisplayEmail.textContent = user.email;
    userAvatarInitials.textContent = user.avatarInitials || getInitials(user.name);
    userLoginTime.textContent = user.loginTime || 'Vừa xong';

    if (user.providerType === 'google') {
      userProviderBadge.innerHTML = `<span class="provider-pill google">Google OAuth 2.0</span>`;
    } else {
      userProviderBadge.innerHTML = `<span class="provider-pill email">Email & Mật khẩu</span>`;
    }
  }

  btnLogout.addEventListener('click', () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    profileCard.style.display = 'none';
    authCard.style.display = 'block';

    // Clear form inputs
    formLogin.reset();
    formRegister.reset();
    pwStrengthMeter.className = 'pw-strength-meter';
    strengthText.textContent = currentLang === 'vi' ? 'Chưa nhập' : 'Empty';
    pwMatchIcon.style.display = 'none';

    showToast({
      title: currentLang === 'vi' ? 'Đã đăng xuất' : 'Logged out',
      message: currentLang === 'vi' ? 'Bạn đã đăng xuất an toàn khỏi tài khoản.' : 'You have safely logged out.',
      type: 'info'
    });
  });

  btnDemoAction.addEventListener('click', () => {
    showToast({
      title: 'Bảng Điều Khiển',
      message: 'Bạn đã đăng nhập hoàn chỉnh! Sẵn sàng tích hợp API thực tế.',
      type: 'success'
    });
  });

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
