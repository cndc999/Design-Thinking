/* ===== NAVIGATION ===== */

function goTo(screen) {
  const container = document.getElementById('screen-container');
  container.innerHTML = '';

  // Push to history
  if (state.currentScreen !== screen) {
    state.navHistory.push(screen);
  }
  state.currentScreen = screen;

  // Render topnav
  renderTopnav(screen);

  // Render screen
  const el = document.createElement('div');
  el.className = 'screen';
  el.innerHTML = getScreenHTML(screen);
  container.appendChild(el);

  // Bind events cho screen vừa render
  bindScreenEvents(screen);
}

function goBack() {
  if (state.navHistory.length > 1) {
    state.navHistory.pop();
    const prev = state.navHistory[state.navHistory.length - 1];
    state.navHistory.pop(); // goTo sẽ push lại
    goTo(prev);
  } else {
    goTo('home');
  }
}

function goHome() {
  state.navHistory = ['home'];
  goTo('home');
}

/* ===== TOPNAV RENDERING ===== */

function renderTopnav(screen) {
  const nav = document.getElementById('topnav-container');

  // Screens that use success header (no topnav)
  if (screen === 'success' || screen === 'genericsuccess') {
    nav.innerHTML = '';
    return;
  }

  const isHome = (screen === 'home');
  const isIntro = (screen === 'intro');

  let left = '';
  if (!isHome && !isIntro) {
    left = `
      <button class="topnav-btn-icon" onclick="goBack()" title="Quay lại">${ICONS.back}</button>
      <button class="topnav-btn-icon" onclick="goHome()" title="Trang chủ">${ICONS.home}</button>
    `;
  } else {
    left = `<div class="topnav-avatar">QA</div>`;
  }

  let right = '';
  if (isHome) {
    right = '';
  }

  nav.innerHTML = `
    <div class="topnav">
      ${left}
      <div class="topnav-title">Chăm Sóc Thú Cưng</div>
      ${right}
    </div>
  `;
}

/* ===== TOAST ===== */

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2500);
}
