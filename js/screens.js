/* ===== SCREEN ROUTER ===== */

function getScreenHTML(screen) {
  switch(screen) {
    case 'intro': return screenIntro();
    case 'create': return screenCreate();
    case 'breed': return screenBreed();
    case 'petinfo': return screenPetInfo();
    case 'home': return screenHome();
    case 'vaccineselect': return screenVaccineSelect();
    case 'booking': return screenBooking();
    case 'success': return screenSuccess();
    case 'schedule': return screenSchedule();
    case 'clinic': return screenClinic();
    case 'clinics': return screenClinics();
    case 'salons': return screenSalons();
    case 'reviews': return screenReviews();
    case 'spa': return screenSpa();
    case 'checkup': return screenCheckup();
    case 'medicine': return screenMedicine();
    case 'grooming': return screenGrooming();
    case 'bath': return screenBath();
    case 'editpet': return screenEditPet();
    case 'petrecord': return screenPetRecord();
    case 'community': return screenCommunity();
    case 'createpost': return screenCreatePost();
    case 'genericsuccess': return screenGenericSuccess();
    case 'shop': return screenShop();
    case 'cartview': return screenCart();
    case 'ordersuccess': return screenOrderSuccess();
    default: return screenIntro();
  }
}

/* ===== 01: INTRO ===== */
function screenIntro() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Chào mừng trở lại!</h1>
      <p class="page-subtitle">Thông tin về thú cưng của bạn</p>

      <div class="intro-hero">
        <div class="intro-illustration">
          <img src="img/logo.jpg"
               alt="Thú cưng" onerror="this.style.display='none'">
        </div>
      </div>

      <div class="intro-empty">
        <h2>Bạn chưa có thú cưng nào</h2>
        <p>Hãy thêm thú cưng đầu tiên của bạn</p>
      </div>

      <button class="btn-primary large" onclick="goTo('create')">+ Thêm thú cưng</button>
      <button class="btn-ghost" onclick="goTo('home')">Bỏ qua</button>
    </div>
  `;
}

/* ===== 02: CREATE PET ===== */
function screenCreate() {
  const cp = state.createPet;
  return `
    <div class="screen-content">
      <h1 class="page-title-center">Thêm thú cưng</h1>

      <div class="photo-upload">
        <div class="photo-circle" id="photo-preview">
          <div class="cam-icon">${ICONS.camera}</div>
          <span>Thêm ảnh</span>
        </div>
        <input type="file" id="photo-input" accept="image/*" hidden>
      </div>

      <div class="form-group">
        <label class="form-label">Tên thú cưng</label>
        <input type="text" class="form-input" id="pet-name-input"
               placeholder="Nhập tên thú cưng" value="${cp.name}">
      </div>

      <div class="form-group">
        <label class="form-label">Loài</label>
        <div class="select-grid">
          <div class="select-card type-card ${cp.type==='dog'?'selected':''}" data-type="dog">
            <div class="check-mark">${ICONS.check}</div>
            <div class="card-img"><img src="${TYPE_IMAGES.dog}" alt="Chó"></div>
            <div class="card-label">Chó</div>
          </div>
          <div class="select-card type-card ${cp.type==='cat'?'selected':''}" data-type="cat">
            <div class="check-mark">${ICONS.check}</div>
            <div class="card-img"><img src="${TYPE_IMAGES.cat}" alt="Mèo"></div>
            <div class="card-label">Mèo</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giới tính</label>
        <div class="select-grid">
          <div class="select-card gender-card ${cp.gender==='male'?'selected':''}" data-gender="male">
            <div class="check-mark">${ICONS.check}</div>
            <div class="gender-sym" style="color:#5B9BD5">&#9794;</div>
            <div class="card-label">Đực</div>
          </div>
          <div class="select-card gender-card ${cp.gender==='female'?'selected':''}" data-gender="female">
            <div class="check-mark">${ICONS.check}</div>
            <div class="gender-sym" style="color:#E8432D">&#9792;</div>
            <div class="card-label">Cái</div>
          </div>
        </div>
      </div>

      <button class="btn-primary" onclick="handleGoToBreed()">Tiếp tục</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== 04: BREED ===== */
function screenBreed() {
  const cp = state.createPet;
  const title = cp.type === 'dog' ? 'Giống chó của bạn' : 'Giống mèo của bạn';
  const list = BREEDS[cp.type] || BREEDS.dog;

  const cards = list.map(b => `
    <div class="breed-card ${cp.breed===b.name?'selected':''}" data-breed="${b.name}">
      <div class="breed-img"><img src="${b.img}" alt="${b.name}"></div>
      <div class="breed-name">${b.name}</div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title-center" id="breed-title">${title}</h1>

      <div class="search-bar">
        ${ICONS.search}
        <input type="text" id="breed-search" placeholder="Tìm kiếm">
      </div>

      <div class="breed-grid" id="breed-grid">${cards}</div>

      <button class="load-more" onclick="showToast('Đang tải thêm...')">Load More</button>
      <button class="btn-primary" onclick="handleGoToPetInfo()">Tiếp tục</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== 05: PET INFO ===== */
function screenPetInfo() {
  return `
    <div class="screen-content">
      <div class="intro-illustration small" style="margin-bottom:24px">
        <img src="img/icon.jpeg"
             alt="Pet" onerror="this.style.display='none'">
      </div>

      <div class="form-group">
        <label class="form-label">Sinh nhật</label>
        <div class="date-wrap">
          <input type="date" class="form-input" id="pet-birthday" value="2026-06-04">
          <span class="suffix">${ICONS.calendar}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Cân nặng</label>
        <div class="weight-row">
          <div class="input-wrap" style="flex:1">
            <input type="number" class="form-input" id="pet-weight" placeholder="Nhập cân nặng">
          </div>
          <select class="weight-unit"><option>kg</option><option>lb</option></select>
        </div>
      </div>

      <div style="height:60px"></div>
      <button class="btn-primary" onclick="handleFinishCreate()">Hoàn tất</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== 06: HOME ===== */

// Lấy lịch hẹn gần nhất sắp tới (ưu tiên ngày >= hôm nay, nếu không có thì lấy gần nhất)
function getUpcomingAppt() {
  const list = (state.appointments || []).slice();
  if (!list.length) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const byDate = (a, b) => new Date(a.dateISO || 0) - new Date(b.dateISO || 0);
  const future = list.filter(a => a.dateISO && new Date(a.dateISO) >= today).sort(byDate);
  if (future.length) return future[0];
  return list.sort(byDate)[list.length - 1]; // không còn lịch tương lai -> lấy lịch mới nhất
}

function screenHome() {
  const upcoming = getUpcomingAppt();
  const reminderCard = upcoming ? `
      <div class="reminder-card" onclick="goTo('schedule')">
        <div class="reminder-tag">Nhắc nhở sắp tới</div>
        <div class="reminder-title">${upcoming.type}</div>
        <div class="reminder-pet">${upcoming.pet} — ${upcoming.breed}</div>
        <div class="reminder-meta">
          <span class="reminder-chip">${formatViDate(upcoming.dateISO)}</span>
          <span class="reminder-chip">${upcoming.time}</span>
          <span class="reminder-chip">${upcoming.place}</span>
        </div>
      </div>` : '';

  const petCards = state.pets.map(p => `
    <div class="pet-card" onclick="openPetRecord(${p.id})">
      <div class="pet-avatar"><img src="${p.img}" alt="${p.name}"></div>
      <div class="pet-info">
        <div class="pet-name">${p.name}</div>
        <div class="pet-breed">${p.breed}</div>
        <span class="pet-status ${p.status==='healthy'?'status-healthy':'status-warn'}">${p.statusLabel}</span>
        <div class="pet-date">${p.lastVisit}</div>
      </div>
      <div class="pet-actions">
        <button class="pet-action-btn" data-action="edit" data-id="${p.id}" title="Sửa">${ICONS.edit}</button>
        <button class="pet-action-btn" data-action="delete" data-id="${p.id}" title="Xóa">${ICONS.trash}</button>
        <button class="pet-action-btn ${p.fav?'fav active':''}" data-action="fav" data-id="${p.id}" title="Yêu thích">${ICONS.heart}</button>
      </div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title">Chào mừng trở lại!</h1>
      <p class="page-subtitle">Thông tin về thú cưng của bạn</p>

      <!-- Thanh tìm kiếm toàn cục -->
      <div class="search-wrap">
        <span class="search-ic">${ICONS.search}</span>
        <input type="text" id="global-search" class="search-input-global"
          placeholder="Tìm chức năng: tiêm, spa, cửa hàng, lịch hẹn..."
          oninput="handleGlobalSearch(this.value)">
        <span class="search-clear" id="search-clear" onclick="clearGlobalSearch()" style="display:none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </span>
      </div>
      <div id="search-results" class="search-results"></div>

      <!-- CTA lớn: Thêm thú cưng -->
      <div class="home-cta" onclick="goTo('create')">
        <div class="cta-title">+ Thêm thú cưng mới</div>
        <div class="cta-sub">Tạo hồ sơ cho thú cưng của bạn</div>
      </div>

      <!-- 3 ô danh mục chính -->
      <div class="home-cats">
        <div class="cat-box" onclick="goTo('clinic')">
          <div class="cat-icon" style="background:var(--green-bg);color:var(--green)">${ICONS.calendar}</div>
          <div class="cat-title">Phòng khám</div>
          <div class="cat-sub">Khám · Tiêm · Thuốc</div>
        </div>
        <div class="cat-box" onclick="goTo('spa')">
          <div class="cat-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.heart}</div>
          <div class="cat-title">Spa</div>
          <div class="cat-sub">Tắm · Cắt lông</div>
        </div>
        <div class="cat-box" onclick="goTo('shop')">
          <div class="cat-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.cart}</div>
          <div class="cat-title">Cửa hàng</div>
          <div class="cat-sub">Thức ăn · Phụ kiện</div>
        </div>
      </div>

      <!-- Reminder → mở lịch tổng hợp (lấy lịch gần nhất sắp tới) -->
      ${reminderCard}

      <!-- Community -->
      <div class="community-preview" onclick="goTo('community')">
        <div class="community-header">
          <span class="community-icon">${ICONS.users}</span>
          <span class="community-title">Cộng đồng thú cưng</span>
          <span class="community-badge">${state.posts.length} bài mới</span>
        </div>
        <div class="community-peek">${state.posts[0] ? state.posts[0].content.substring(0, 60) + '...' : ''}</div>
      </div>

      <!-- Pet list -->
      <div class="section-hdr">
        <div class="sec-title">Thú Cưng Của Bạn</div>
        <span class="sec-link" onclick="goTo('create')">+ Thêm</span>
      </div>
      <div id="home-pet-list">${petCards}</div>
    </div>
  `;
}

/* ===== 07: VACCINE SELECT ===== */
function screenVaccineSelect() {
  const items = state.pets.map(p => `
    <div class="pet-select-item ${state.booking.petId===p.id?'selected':''}" data-pet-id="${p.id}">
      <div class="radio-circle"><div class="radio-dot"></div></div>
      <div class="psi-avatar"><img src="${p.img}" alt="${p.name}"></div>
      <div class="psi-info">
        <div class="psi-name">${p.name}</div>
        <div class="psi-sub">${p.breed} · ${p.age} tuổi</div>
      </div>
      <span class="psi-badge ${p.status==='healthy'?'status-healthy':'status-warn'}">
        ${p.status==='healthy'?'Khoẻ':'Chú ý'}
      </span>
    </div>
  `).join('');

  return `
    <div class="screen-content" style="padding-bottom:0">
      <div class="vaccine-banner">
        <div class="shield-icon">${ICONS.shield}</div>
        <p class="tip">Khám sức khỏe cho chó mèo đều đặn giúp phát hiện sớm các bệnh tiềm ẩn
        và đảm bảo chất lượng sống tốt nhất cho thú cưng.</p>
      </div>
    </div>

    <div class="bottom-sheet">
      <div class="sheet-title">Chọn thú cưng cần đặt lịch</div>
      <div id="vaccine-pet-list">${items}</div>
      <button class="btn-primary" onclick="handleGoToBooking()">Tiếp tục</button>
    </div>
  `;
}

/* ===== 08: BOOKING FORM ===== */
function screenBooking() {
  const pet = state.pets.find(p => p.id === state.booking.petId) || state.pets[0];
  const b = state.booking;

  const vaccines = ['Dại (Rabies)','Parvovirus','Distemper','Leptospirosis','Khác'];
  const vaccTags = vaccines.map(v =>
    `<button class="tag ${b.vaccine===v?'active':'inactive'}" data-vaccine="${v}">${v}</button>`
  ).join('');

  const reminders = ['12 giờ','1 ngày','3 ngày'];
  const remTags = reminders.map(r =>
    `<button class="tag ${b.reminder===r?'active':'inactive'}" data-reminder="${r}">${r}</button>`
  ).join('');

  return `
    <div class="screen-content">
      <div class="booking-pet-header">
        <div class="psi-avatar"><img src="${pet.img}" alt="${pet.name}"></div>
        <div class="psi-info">
          <div class="psi-name">${pet.name}</div>
          <div class="psi-sub">${pet.breed}</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Loại vắc xin</label>
        <div class="tag-row" id="vaccine-tags">${vaccTags}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Ngày tiêm</label>
        <div class="date-wrap">
          <input type="date" class="form-input" id="booking-date" value="${b.date}">
          <span class="suffix">${ICONS.calendar}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giờ tiêm</label>
        <div class="date-wrap">
          <input type="time" class="form-input" id="booking-time" value="${b.time}">
          <span class="suffix">${ICONS.clock}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Chọn phòng khám</label>
        ${clinicPickerHTML(state.booking.clinicId, 'booking-clinic-list')}
      </div>

      <div class="form-group">
        <label class="form-label">Nhắc trước</label>
        <div class="tag-row" id="reminder-tags">${remTags}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Ghi chú</label>
        <textarea class="form-input" id="booking-note" rows="3" placeholder="Nhập ghi chú...">${b.note}</textarea>
      </div>

      <button class="btn-primary" onclick="handleConfirmBooking()">Xác nhận đặt lịch</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== 09: SUCCESS ===== */
function screenSuccess() {
  const pet = state.pets.find(p => p.id === state.booking.petId) || state.pets[0];
  const b = state.booking;
  const d = new Date(b.date);
  const days = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  const dateStr = `${days[d.getDay()]}, ${d.getDate()} tháng ${d.getMonth()+1}, ${d.getFullYear()}`;
  const timeStr = formatTime(b.time);

  function formatTime(t) {
    if (!t) return '09:00 sáng';
    const [h, m] = t.split(':').map(Number);
    return `${String(h<=12?h:h-12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${h<12?'sáng':'chiều'}`;
  }

  const rows = [
    { icon: ICONS.paw, label: 'Thú cưng', value: `${pet.name} | ${pet.breed}` },
    { icon: ICONS.syringe, label: 'Vắc xin', value: b.vaccine },
    { icon: ICONS.calendar, label: 'Ngày & Giờ', value: `${dateStr} | ${timeStr}` },
    { icon: ICONS.pin, label: 'Địa điểm', value: b.location },
    { icon: ICONS.bell, label: 'Nhắc nhở', value: `Trước ${b.reminder}` },
  ];

  const summaryRows = rows.map(r => `
    <div class="summary-row">
      ${r.icon}
      <div>
        <div class="summary-label">${r.label}</div>
        <div class="summary-value">${r.value}</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="success-header">
      <div class="success-check">${ICONS.check}</div>
      <h2 class="success-title">Đặt lịch thành công</h2>
      <p class="success-sub">Lịch tiêm đã được lưu</p>
    </div>
    <div class="screen-content" style="padding-top:20px">
      <div class="booking-summary">${summaryRows}</div>
      <button class="btn-secondary" onclick="goTo('vaccineselect')">+ Thêm lịch nhắc khác</button>
      <button class="btn-ghost" onclick="goHome()">Về màn hình chính</button>
    </div>
  `;
}

/* ===== SCHEDULE: Lịch tổng hợp ===== */
function screenSchedule() {
  // Lấy từ danh sách lịch hẹn thật, sắp xếp theo ngày tăng dần
  const appointments = (state.appointments || []).slice().sort((a, b) => {
    return new Date(a.dateISO || 0) - new Date(b.dateISO || 0);
  });

  const petImg = (a) => {
    const p = state.pets.find(x => x.id === a.petId) || state.pets.find(x => x.name === a.pet);
    return p ? p.img : '';
  };

  const cards = appointments.length ? appointments.map((a) => `
    <div class="schedule-card">
      <div class="schedule-color" style="background:${a.color}"></div>
      <div class="schedule-body">
        <div class="schedule-type">${a.type}</div>
        <div class="schedule-pet-row">
          <div class="schedule-pet-avatar"><img src="${petImg(a)}" alt="${a.pet}"></div>
          <span>${a.pet} — ${a.breed}</span>
        </div>
        <div class="schedule-meta">
          <span>${formatViDate(a.dateISO)}</span>
          <span>${a.time}</span>
        </div>
        <div class="schedule-place">${a.place}</div>
      </div>
    </div>
  `).join('') : '<p class="page-subtitle">Chưa có lịch hẹn nào.</p>';

  return `
    <div class="screen-content">
      <h1 class="page-title">Lịch hẹn</h1>
      <p class="page-subtitle">Tổng hợp lịch của tất cả thú cưng</p>
      ${cards}
      <button class="btn-primary" onclick="goTo('vaccineselect')" style="margin-top:12px">+ Đặt lịch mới</button>
      <button class="btn-ghost" onclick="goHome()">Về màn hình chính</button>
    </div>
  `;
}

/* ===== CLINIC: Phòng khám ===== */
function screenClinic() {
  const services = [
    { id: 'vaccine', title: 'Tiêm phòng', sub: 'Đặt lịch tiêm vắc xin', icon: ICONS.syringe, color: 'var(--primary-bg)', iconColor: 'var(--primary)', screen: 'vaccineselect' },
    { id: 'checkup', title: 'Kiểm tra tổng quát', sub: 'Khám sức khỏe định kỳ', icon: ICONS.shield, color: 'var(--green-bg)', iconColor: 'var(--green)', screen: 'checkup' },
    { id: 'medicine', title: 'Mua thuốc', sub: 'Đặt mua thuốc theo đơn', icon: ICONS.plus, color: 'var(--orange-bg)', iconColor: 'var(--orange)', screen: 'medicine' },
  ];

  const cards = services.map(s => `
    <div class="service-card" onclick="goTo('${s.screen}')">
      <div class="service-icon" style="background:${s.color};color:${s.iconColor}">${s.icon}</div>
      <div class="service-info">
        <div class="service-title">${s.title}</div>
        <div class="service-sub">${s.sub}</div>
      </div>
      <div class="service-arrow">${ICONS.back}</div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title">Phòng khám</h1>
      <p class="page-subtitle">Chọn dịch vụ bạn cần</p>
      ${cards}
      <div class="service-card" onclick="goTo('clinics')" style="margin-top:4px">
        <div class="service-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.pin}</div>
        <div class="service-info">
          <div class="service-title">Phòng khám gần bạn</div>
          <div class="service-sub">Xem địa chỉ & đánh giá phòng khám</div>
        </div>
        <div class="service-arrow">${ICONS.back}</div>
      </div>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== SPA ===== */
function screenSpa() {
  const services = [
    { id: 'grooming', title: 'Cắt lông', sub: 'Tạo kiểu, tỉa lông chuyên nghiệp', icon: ICONS.edit, color: '#F3E5F5', iconColor: '#8E24AA', screen: 'grooming' },
    { id: 'bath', title: 'Tắm', sub: 'Tắm sạch, sấy khô, xịt thơm', icon: ICONS.heart, color: '#E3F2FD', iconColor: '#1565C0', screen: 'bath' },
  ];

  const cards = services.map(s => `
    <div class="service-card" onclick="goTo('${s.screen}')">
      <div class="service-icon" style="background:${s.color};color:${s.iconColor}">${s.icon}</div>
      <div class="service-info">
        <div class="service-title">${s.title}</div>
        <div class="service-sub">${s.sub}</div>
      </div>
      <div class="service-arrow">${ICONS.back}</div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title">Spa thú cưng</h1>
      <p class="page-subtitle">Chọn dịch vụ chăm sóc</p>
      ${cards}
      <div class="service-card" onclick="goTo('salons')" style="margin-top:4px">
        <div class="service-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.pin}</div>
        <div class="service-info">
          <div class="service-title">Tiệm chăm sóc gần bạn</div>
          <div class="service-sub">Xem địa chỉ & đánh giá tiệm spa</div>
        </div>
        <div class="service-arrow">${ICONS.back}</div>
      </div>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== Helper: Stars rating (đánh giá sao /5) ===== */
function starsHTML(rating) {
  const full = Math.round(rating || 0);
  let out = '';
  for (let i = 1; i <= 5; i++) {
    out += `<span class="cstar ${i <= full ? 'on' : ''}">${ICONS.star}</span>`;
  }
  return out;
}

/* ===== Helper: Venue picker (chọn phòng khám / tiệm thay vì nhập tay) ===== */
function venuePickerHTML(venues, selectedId, listId) {
  const items = venues.map(v => `
    <div class="clinic-item ${selectedId === v.id ? 'selected' : ''}" data-venue-id="${v.id}">
      <div class="radio-circle"><div class="radio-dot"></div></div>
      <div class="clinic-info">
        <div class="clinic-name">${v.name}</div>
        <div class="clinic-addr">${ICONS.pin}<span>${v.address}</span></div>
        <div class="clinic-rate">
          <span class="clinic-stars">${starsHTML(v.rating)}</span>
          <span class="clinic-rate-num">${v.rating.toFixed(1)}</span>
          <span class="clinic-reviews">(${v.reviews} đánh giá)</span>
        </div>
      </div>
    </div>
  `).join('');
  return `<div class="clinic-list" id="${listId || ''}">${items}</div>`;
}
function clinicPickerHTML(selectedId, listId) { return venuePickerHTML(state.clinics, selectedId, listId); }
function salonPickerHTML(selectedId, listId) { return venuePickerHTML(state.salons, selectedId, listId); }

/* ===== Helper: Venue list card (có nút xem đánh giá) ===== */
function venueListHTML(venues, type) {
  return venues.map(v => `
    <div class="clinic-item static">
      <div class="clinic-info">
        <div class="clinic-name">${v.name}</div>
        <div class="clinic-addr">${ICONS.pin}<span>${v.address}</span></div>
        <div class="clinic-rate">
          <span class="clinic-stars">${starsHTML(v.rating)}</span>
          <span class="clinic-rate-num">${v.rating.toFixed(1)}</span>
          <span class="clinic-reviews">(${v.reviews} đánh giá)</span>
        </div>
        <button class="review-link" onclick="openReviews('${type}', ${v.id})">${ICONS.comment} Xem đánh giá</button>
      </div>
    </div>
  `).join('');
}

/* ===== Helper: Sinh review giả lập (ổn định theo id) ===== */
function getReviews(type, id) {
  const venue = (type === 'salon' ? state.salons : state.clinics).find(v => v.id === id);
  if (!venue) return [];
  // số review hiển thị: 4-5, sinh ổn định theo id
  const count = 4 + (id % 2);
  const list = [];
  for (let i = 0; i < count; i++) {
    const seed = id * 7 + i * 13;
    const name = state.reviewNames[seed % state.reviewNames.length];
    // phân bố sao quanh rating của venue
    let stars, text;
    const r = (seed % 10);
    if (r < 6) { stars = 5; text = state.reviewTexts5[seed % state.reviewTexts5.length]; }
    else if (r < 9) { stars = 4; text = state.reviewTexts4[seed % state.reviewTexts4.length]; }
    else { stars = 3; text = state.reviewTexts3[seed % state.reviewTexts3.length]; }
    const initials = name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();
    list.push({ name, initials, stars, text, time: state.reviewTimes[seed % state.reviewTimes.length] });
  }
  return list;
}

/* ===== CLINICS: Danh sách phòng khám ===== */
function screenClinics() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Phòng khám gần bạn</h1>
      <p class="page-subtitle">Chọn phòng khám uy tín cho thú cưng</p>
      ${venueListHTML(state.clinics, 'clinic')}
      <button class="btn-primary" onclick="goTo('vaccineselect')" style="margin-top:12px">+ Đặt lịch tại phòng khám</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== SALONS: Danh sách tiệm chăm sóc ===== */
function screenSalons() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Tiệm chăm sóc gần bạn</h1>
      <p class="page-subtitle">Spa, cắt lông & làm đẹp cho thú cưng</p>
      ${venueListHTML(state.salons, 'salon')}
      <button class="btn-primary" onclick="goTo('spa')" style="margin-top:12px">+ Đặt lịch chăm sóc</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== REVIEWS: Xem đánh giá của 1 phòng khám / tiệm ===== */
function screenReviews() {
  const v = state.viewReview;
  if (!v) return screenClinics();
  const venue = (v.type === 'salon' ? state.salons : state.clinics).find(x => x.id === v.id);
  if (!venue) return screenClinics();

  const reviews = getReviews(v.type, v.id);
  const reviewCards = reviews.map(rv => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${rv.initials}</div>
        <div class="review-meta">
          <div class="review-name">${rv.name}</div>
          <div class="review-stars">${starsHTML(rv.stars)}</div>
        </div>
        <div class="review-time">${rv.time}</div>
      </div>
      <div class="review-text">${rv.text}</div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <div class="review-summary">
        <div class="rs-score">${venue.rating.toFixed(1)}</div>
        <div class="rs-info">
          <div class="rs-name">${venue.name}</div>
          <div class="rs-stars">${starsHTML(venue.rating)}</div>
          <div class="rs-sub">${venue.reviews} đánh giá · ${venue.address}</div>
        </div>
      </div>
      <div class="section-hdr" style="margin-top:18px"><span class="sec-title">Đánh giá gần đây</span></div>
      ${reviewCards}
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== Helper: Pet selector HTML ===== */
function petSelectorHTML(selectedId) {
  return state.pets.map(p => `
    <div class="pet-select-item ${selectedId===p.id?'selected':''}" data-pet-id="${p.id}">
      <div class="radio-circle"><div class="radio-dot"></div></div>
      <div class="psi-avatar"><img src="${p.img}" alt="${p.name}"></div>
      <div class="psi-info">
        <div class="psi-name">${p.name}</div>
        <div class="psi-sub">${p.breed}</div>
      </div>
    </div>
  `).join('');
}

/* ===== CHECKUP: Kiểm tra tổng quát ===== */
function screenCheckup() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Kiểm tra tổng quát</h1>
      <p class="page-subtitle">Đặt lịch khám sức khỏe định kỳ</p>

      <div class="form-group">
        <label class="form-label">Chọn thú cưng</label>
        <div id="checkup-pet-list">${petSelectorHTML(state.booking.petId)}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Loại khám</label>
        <div class="option-grid" id="checkup-type">
          <div class="option-card selected" data-value="basic">
            <div class="option-icon" style="background:var(--green-bg);color:var(--green)">${ICONS.shield}</div>
            <div class="option-name">Khám cơ bản</div>
            <div class="option-desc">Kiểm tra tổng quát, đo nhiệt độ, cân nặng</div>
            <div class="option-price">200.000đ</div>
          </div>
          <div class="option-card" data-value="full">
            <div class="option-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.heart}</div>
            <div class="option-name">Khám toàn diện</div>
            <div class="option-desc">Xét nghiệm máu, siêu âm, X-quang</div>
            <div class="option-price">500.000đ</div>
          </div>
          <div class="option-card" data-value="dental">
            <div class="option-icon" style="background:#E3F2FD;color:#1565C0">${ICONS.check}</div>
            <div class="option-name">Khám răng miệng</div>
            <div class="option-desc">Kiểm tra, cạo vôi, đánh bóng răng</div>
            <div class="option-price">350.000đ</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ngày khám</label>
        <div class="date-wrap">
          <input type="date" class="form-input" id="checkup-date" value="2026-06-20">
          <span class="suffix">${ICONS.calendar}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giờ khám</label>
        <div class="time-slot-grid" id="checkup-time">
          <div class="time-slot" data-time="08:00">08:00</div>
          <div class="time-slot" data-time="09:00">09:00</div>
          <div class="time-slot selected" data-time="10:00">10:00</div>
          <div class="time-slot" data-time="14:00">14:00</div>
          <div class="time-slot" data-time="15:00">15:00</div>
          <div class="time-slot" data-time="16:00">16:00</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Chọn phòng khám</label>
        ${clinicPickerHTML(state.booking.clinicId, 'checkup-clinic-list')}
      </div>

      <button class="btn-primary" onclick="handleServiceSuccess('Kiểm tra tổng quát','checkup')">Xác nhận đặt lịch</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== MEDICINE: Mua thuốc ===== */
function screenMedicine() {
  const categories = [
    { name: 'Tẩy giun', icon: ICONS.shield, color: 'var(--green-bg)', iconColor: 'var(--green)' },
    { name: 'Vitamin', icon: ICONS.heart, color: 'var(--primary-bg)', iconColor: 'var(--primary)' },
    { name: 'Kháng sinh', icon: ICONS.plus, color: 'var(--orange-bg)', iconColor: 'var(--orange)' },
    { name: 'Da liễu', icon: ICONS.edit, color: '#F3E5F5', iconColor: '#8E24AA' },
  ];

  const products = [
    { name: 'Drontal Plus', desc: 'Tẩy giun cho chó — 1 viên/10kg', price: '85.000đ', stock: true },
    { name: 'Vitamin B Complex', desc: 'Bổ sung vitamin nhóm B', price: '120.000đ', stock: true },
    { name: 'Amoxicillin 250mg', desc: 'Kháng sinh — Cần đơn bác sĩ', price: '65.000đ', stock: true },
    { name: 'Frontline Plus', desc: 'Trị ve, bọ chét — ống 1ml', price: '180.000đ', stock: true },
    { name: 'Omega 3 Fish Oil', desc: 'Dầu cá bổ sung — 60 viên', price: '250.000đ', stock: false },
  ];

  const catCards = categories.map(c => `
    <div class="med-cat-card">
      <div class="med-cat-icon" style="background:${c.color};color:${c.iconColor}">${c.icon}</div>
      <div class="med-cat-name">${c.name}</div>
    </div>
  `).join('');

  const prodCards = products.map(p => `
    <div class="med-product-card">
      <div class="med-product-info">
        <div class="med-product-name">${p.name}</div>
        <div class="med-product-desc">${p.desc}</div>
        <div class="med-product-price">${p.price}</div>
      </div>
      <button class="med-add-btn ${p.stock?'':'disabled'}" onclick="${p.stock ? "this.textContent='Đã thêm';this.classList.add('added');showToast('Đã thêm vào giỏ')" : ''}">
        ${p.stock ? '+ Thêm' : 'Hết hàng'}
      </button>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title">Mua thuốc</h1>
      <p class="page-subtitle">Đặt mua thuốc theo đơn hoặc không đơn</p>

      <div class="form-group">
        <label class="form-label">Chọn thú cưng</label>
        <div id="med-pet-list">${petSelectorHTML(state.booking.petId)}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Danh mục</label>
        <div class="med-cat-grid">${catCards}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Sản phẩm</label>
        <div class="search-bar" style="margin-bottom:12px">
          ${ICONS.search}
          <input type="text" placeholder="Tìm thuốc..." id="med-search">
        </div>
        <div id="med-product-list">${prodCards}</div>
      </div>

      <button class="btn-primary" onclick="showToast('Đã gửi đơn hàng!'); setTimeout(()=>goHome(),800)">Xác nhận đặt hàng</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== GROOMING: Cắt lông ===== */
function screenGrooming() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Cắt lông</h1>
      <p class="page-subtitle">Chọn kiểu cắt cho thú cưng</p>

      <div class="form-group">
        <label class="form-label">Chọn thú cưng</label>
        <div id="groom-pet-list">${petSelectorHTML(state.booking.petId)}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Kiểu cắt</label>
        <div class="option-grid" id="groom-style">
          <div class="option-card selected" data-value="basic">
            <div class="option-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.edit}</div>
            <div class="option-name">Tỉa gọn cơ bản</div>
            <div class="option-desc">Tỉa lông mặt, chân, tai, đuôi</div>
            <div class="option-price" data-base="150000">150.000đ</div>
          </div>
          <div class="option-card" data-value="full">
            <div class="option-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.heart}</div>
            <div class="option-name">Cắt tạo kiểu</div>
            <div class="option-desc">Cắt theo yêu cầu, tạo kiểu thời trang</div>
            <div class="option-price" data-base="250000">250.000đ</div>
          </div>
          <div class="option-card" data-value="premium">
            <div class="option-icon" style="background:var(--orange-bg);color:var(--orange)">${ICONS.shield}</div>
            <div class="option-name">Combo VIP</div>
            <div class="option-desc">Cắt tạo kiểu + tắm + sấy + nước hoa</div>
            <div class="option-price" data-base="400000">400.000đ</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ngày hẹn</label>
        <div class="date-wrap">
          <input type="date" class="form-input" id="groom-date" value="2026-06-22">
          <span class="suffix">${ICONS.calendar}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giờ hẹn</label>
        <div class="time-slot-grid" id="groom-time">
          <div class="time-slot" data-time="09:00">09:00</div>
          <div class="time-slot selected" data-time="10:00">10:00</div>
          <div class="time-slot" data-time="11:00">11:00</div>
          <div class="time-slot" data-time="14:00">14:00</div>
          <div class="time-slot" data-time="15:00">15:00</div>
          <div class="time-slot" data-time="16:00">16:00</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Chọn tiệm chăm sóc</label>
        ${salonPickerHTML(state.booking.salonId, 'groom-salon-list')}
      </div>

      <div class="price-summary">
        <div class="ps-note">${ICONS.clock} Giá thay đổi theo tiệm & khung giờ — giờ sớm rẻ hơn</div>
        <div class="ps-total"><span>Tạm tính</span><span id="groom-total" class="ps-amount">—</span></div>
      </div>

      <button class="btn-primary" onclick="handleServiceSuccess('Cắt lông','grooming')">Xác nhận</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== BATH: Tắm ===== */
function screenBath() {
  return `
    <div class="screen-content">
      <h1 class="page-title">Tắm thú cưng</h1>
      <p class="page-subtitle">Chọn gói tắm phù hợp</p>

      <div class="form-group">
        <label class="form-label">Chọn thú cưng</label>
        <div id="bath-pet-list">${petSelectorHTML(state.booking.petId)}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Gói dịch vụ</label>
        <div class="option-grid" id="bath-pkg">
          <div class="option-card selected" data-value="basic">
            <div class="option-icon" style="background:#E3F2FD;color:#1565C0">${ICONS.heart}</div>
            <div class="option-name">Tắm cơ bản</div>
            <div class="option-desc">Tắm sạch, sấy khô</div>
            <div class="option-price" data-base="100000">100.000đ</div>
          </div>
          <div class="option-card" data-value="premium">
            <div class="option-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.shield}</div>
            <div class="option-name">Tắm cao cấp</div>
            <div class="option-desc">Dầu gội dược liệu, sấy tạo kiểu, xịt thơm</div>
            <div class="option-price" data-base="200000">200.000đ</div>
          </div>
          <div class="option-card" data-value="spa">
            <div class="option-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.heart}</div>
            <div class="option-name">Spa trọn gói</div>
            <div class="option-desc">Tắm + massage + vệ sinh tai, mắt, móng</div>
            <div class="option-price" data-base="350000">350.000đ</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ngày hẹn</label>
        <div class="date-wrap">
          <input type="date" class="form-input" id="bath-date" value="2026-06-22">
          <span class="suffix">${ICONS.calendar}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giờ hẹn</label>
        <div class="time-slot-grid" id="bath-time">
          <div class="time-slot" data-time="09:00">09:00</div>
          <div class="time-slot selected" data-time="10:30">10:30</div>
          <div class="time-slot" data-time="13:30">13:30</div>
          <div class="time-slot" data-time="14:30">14:30</div>
          <div class="time-slot" data-time="16:00">16:00</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Chọn tiệm chăm sóc</label>
        ${salonPickerHTML(state.booking.salonId, 'bath-salon-list')}
      </div>

      <div class="price-summary">
        <div class="ps-note">${ICONS.clock} Giá thay đổi theo tiệm & khung giờ — giờ sớm rẻ hơn</div>
        <div class="ps-total"><span>Tạm tính</span><span id="bath-total" class="ps-amount">—</span></div>
      </div>

      <button class="btn-primary" onclick="handleServiceSuccess('Tắm thú cưng','bath')">Xác nhận</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== PET RECORD: Hồ sơ y tế & lịch sử khám ===== */
function screenPetRecord() {
  const pet = state.pets.find(p => p.id === state.viewPetId) || state.pets[0];
  if (!pet) return `<div class="screen-content"><p>Không tìm thấy thú cưng</p></div>`;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = (state.appointments || [])
    .filter(a => a.petId === pet.id && a.dateISO && new Date(a.dateISO) >= today)
    .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
  const history = (pet.history || []).slice().sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

  const kindColor = (k) => k === 'vaccine' ? 'var(--primary)' : k === 'spa' ? '#8E24AA' : 'var(--green)';
  const kindIcon = (k) => k === 'vaccine' ? ICONS.syringe : k === 'spa' ? ICONS.heart : ICONS.shield;

  const infoItem = (label, val) => `
    <div class="rec-info-item"><div class="rii-label">${label}</div><div class="rii-val">${val}</div></div>`;

  const vaccineTags = (pet.vaccines || []).map(v => `<span class="vac-tag">${v}</span>`).join('');

  const upcomingHTML = upcoming.length ? upcoming.map(a => `
    <div class="rec-event">
      <div class="rec-ic" style="background:var(--primary-bg);color:${a.color || 'var(--primary)'}">${ICONS.clock}</div>
      <div class="rec-event-body">
        <div class="rec-event-title">${a.type}</div>
        <div class="rec-event-meta">${formatViDate(a.dateISO)} · ${a.time} · ${a.place}</div>
      </div>
    </div>`).join('') : '<div class="rec-empty">Chưa có lịch hẹn sắp tới</div>';

  const historyHTML = history.length ? history.map(h => `
    <div class="rec-event">
      <div class="rec-ic" style="background:var(--primary-bg);color:${kindColor(h.kind)}">${kindIcon(h.kind)}</div>
      <div class="rec-event-body">
        <div class="rec-event-title">${h.detail}</div>
        <div class="rec-event-sub">${h.type}${h.vet ? ' · ' + h.vet : ''}</div>
        <div class="rec-event-meta">${formatViDate(h.dateISO)} · ${h.place}</div>
        ${h.note ? `<div class="rec-event-note">${h.note}</div>` : ''}
      </div>
    </div>`).join('') : '<div class="rec-empty">Chưa có lịch sử khám</div>';

  return `
    <div class="screen-content">
      <div class="rec-header">
        <div class="rec-avatar"><img src="${pet.img}" alt="${pet.name}"></div>
        <div class="rec-head-info">
          <div class="rec-name">${pet.name}</div>
          <div class="rec-breed">${pet.breed}</div>
          <span class="pet-status ${pet.status === 'healthy' ? 'status-healthy' : 'status-warn'}">${pet.statusLabel}</span>
        </div>
      </div>

      <div class="section-hdr"><span class="sec-title">Hồ sơ y tế</span></div>
      <div class="rec-info-grid">
        ${infoItem('Tuổi', pet.age + ' tuổi')}
        ${infoItem('Giới tính', pet.gender === 'female' ? 'Cái' : 'Đực')}
        ${infoItem('Cân nặng', pet.weight + ' kg')}
        ${infoItem('Ngày sinh', formatViDate(pet.birthday))}
        ${infoItem('Triệt sản', pet.neutered || '—')}
        ${infoItem('Dị ứng', pet.allergies || 'Không')}
        ${infoItem('Nhóm máu', pet.bloodType || '—')}
      </div>

      ${vaccineTags ? `<div class="rec-vaccines"><div class="rii-label" style="margin-bottom:6px">Đã tiêm</div><div class="vac-row">${vaccineTags}</div></div>` : ''}

      <div class="section-hdr" style="margin-top:18px"><span class="sec-title">Lịch hẹn sắp tới</span></div>
      <div class="rec-list">${upcomingHTML}</div>

      <div class="section-hdr" style="margin-top:18px"><span class="sec-title">Lịch sử khám & tiêm</span></div>
      <div class="rec-list">${historyHTML}</div>

      <button class="btn-secondary" onclick="editPetById(${pet.id})" style="margin-top:14px">Chỉnh sửa thông tin</button>
      <button class="btn-ghost" onclick="goBack()">Quay lại</button>
    </div>
  `;
}

/* ===== EDIT PET ===== */
function screenEditPet() {
  const pet = state.editingPet;
  if (!pet) return `<div class="screen-content"><p>Không tìm thấy thú cưng</p></div>`;

  return `
    <div class="screen-content">
      <h1 class="page-title">Chỉnh sửa thú cưng</h1>
      <p class="page-subtitle">Cập nhật thông tin cho ${pet.name}</p>

      <div style="text-align:center;margin-bottom:20px">
        <div class="photo-circle" id="edit-photo" style="margin:0 auto">
          <img src="${pet.img}" alt="${pet.name}">
        </div>
        <input type="file" id="edit-photo-input" accept="image/*" hidden>
      </div>

      <div class="form-group">
        <label class="form-label">Tên</label>
        <input type="text" class="form-input" id="edit-name" value="${pet.name}">
      </div>

      <div class="form-group">
        <label class="form-label">Giống</label>
        <input type="text" class="form-input" id="edit-breed" value="${pet.breed}">
      </div>

      <div class="form-group">
        <label class="form-label">Loài</label>
        <div class="select-grid">
          <div class="select-card type-card ${pet.type==='dog'?'selected':''}" data-type="dog">
            <div class="check-mark">${ICONS.check}</div>
            <div class="card-img"><img src="${TYPE_IMAGES.dog}" alt="Chó"></div>
            <div class="card-label">Chó</div>
          </div>
          <div class="select-card type-card ${pet.type==='cat'?'selected':''}" data-type="cat">
            <div class="check-mark">${ICONS.check}</div>
            <div class="card-img"><img src="${TYPE_IMAGES.cat}" alt="Mèo"></div>
            <div class="card-label">Mèo</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Giới tính</label>
        <div class="select-grid">
          <div class="select-card gender-card ${pet.gender==='male'?'selected':''}" data-gender="male">
            <div class="check-mark">${ICONS.check}</div>
            <div class="gender-sym" style="color:#5B9BD5">&#9794;</div>
            <div class="card-label">Đực</div>
          </div>
          <div class="select-card gender-card ${pet.gender==='female'?'selected':''}" data-gender="female">
            <div class="check-mark">${ICONS.check}</div>
            <div class="gender-sym" style="color:#E8432D">&#9792;</div>
            <div class="card-label">Cái</div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Cân nặng (kg)</label>
        <input type="number" class="form-input" id="edit-weight" value="${pet.weight}">
      </div>

      <div class="form-group">
        <label class="form-label">Sinh nhật</label>
        <input type="date" class="form-input" id="edit-birthday" value="${pet.birthday}">
      </div>

      <button class="btn-primary" onclick="handleSaveEdit()">Lưu thay đổi</button>
      <button class="btn-ghost" onclick="goBack()">Hủy</button>
    </div>
  `;
}

/* ===== COMMUNITY FEED ===== */
function screenCommunity() {
  const postCards = state.posts.map(p => `
    <div class="post-card">
      <div class="post-header">
        <div class="post-user-avatar">
          ${p.userAvatar && p.userAvatar.startsWith('data:') || p.userAvatar && p.userAvatar.startsWith('http') || p.userAvatar && p.userAvatar.startsWith('img/')
            ? '<img src="'+p.userAvatar+'" alt="">'
            : (p.userAvatar || '?')}
        </div>
        <div class="post-user-info">
          <div class="post-user-name">${p.userName}</div>
          <div class="post-time">${p.time}</div>
        </div>
      </div>
      <div class="post-pet-tag">${p.petName} — ${p.petBreed}</div>
      <div class="post-content">${p.content}</div>
      ${p.img ? `<div class="post-image"><img src="${p.img}" alt="Post"></div>` : ''}
      <div class="post-actions">
        <button class="post-action-btn ${p.liked?'liked':''}" data-post-id="${p.id}" data-action="like">
          <span class="post-action-icon">${p.liked ? ICONS.heartFill : ICONS.heart}</span>
          <span>${p.likes}</span>
        </button>
        <button class="post-action-btn" data-post-id="${p.id}" data-action="comment">
          <span class="post-action-icon">${ICONS.comment}</span>
          <span>${p.comments}</span>
        </button>
        <button class="post-action-btn" data-post-id="${p.id}" data-action="share">
          <span class="post-action-icon">${ICONS.send}</span>
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <div class="community-top-bar">
        <h1 class="page-title">Cộng đồng</h1>
        <button class="btn-new-post" onclick="goTo('createpost')">+ Đăng bài</button>
      </div>
      <p class="page-subtitle">Chia sẻ khoảnh khắc với thú cưng</p>

      <div id="post-feed">${postCards}</div>
    </div>
  `;
}

/* ===== CREATE POST ===== */
function screenCreatePost() {
  const petOptions = state.pets.map(p => `
    <div class="post-pet-option ${state.newPost.petId===p.id?'selected':''}" data-pet-id="${p.id}">
      <div class="psi-avatar"><img src="${p.img}" alt="${p.name}"></div>
      <span>${p.name}</span>
    </div>
  `).join('');

  return `
    <div class="screen-content">
      <h1 class="page-title">Tạo bài đăng</h1>
      <p class="page-subtitle">Chia sẻ với cộng đồng</p>

      <div class="form-group">
        <label class="form-label">Chọn thú cưng</label>
        <div class="post-pet-selector" id="post-pet-selector">${petOptions}</div>
      </div>

      <div class="form-group">
        <label class="form-label">Nội dung</label>
        <textarea class="form-input post-textarea" id="post-content" rows="4" placeholder="Chia sẻ điều gì đó về thú cưng của bạn..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Ảnh</label>
        <div class="post-photo-upload" id="post-photo-area">
          <div class="post-photo-placeholder" id="post-photo-preview" onclick="document.getElementById('post-photo-input').click()">
            <span class="post-photo-icon">${ICONS.image}</span>
            <span>Thêm ảnh</span>
          </div>
          <input type="file" id="post-photo-input" accept="image/*" hidden>
        </div>
      </div>

      <button class="btn-primary" onclick="handleCreatePost()">Đăng bài</button>
      <button class="btn-ghost" onclick="goBack()">Hủy</button>
    </div>
  `;
}

/* ===== GENERIC SUCCESS (cho tất cả dịch vụ) ===== */
function screenGenericSuccess() {
  const s = state.lastSuccess || {};
  const pet = state.pets.find(p => p.id === state.booking.petId) || state.pets[0];

  const rows = [
    { icon: ICONS.paw, label: 'Thú cưng', value: pet ? `${pet.name} | ${pet.breed}` : '—' },
    { icon: ICONS.calendar, label: 'Dịch vụ', value: s.service || '—' },
    { icon: ICONS.calendar, label: 'Ngày & Giờ', value: s.datetime || '—' },
    { icon: ICONS.pin, label: 'Địa điểm', value: s.location || '—' },
  ];
  if (s.price) rows.push({ icon: ICONS.star, label: 'Giá', value: s.price });

  const summaryRows = rows.map(r => `
    <div class="summary-row">
      ${r.icon}
      <div>
        <div class="summary-label">${r.label}</div>
        <div class="summary-value">${r.value}</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="success-header">
      <div class="success-check">${ICONS.check}</div>
      <h2 class="success-title">Đặt lịch thành công</h2>
      <p class="success-sub">${s.subtitle || 'Lịch hẹn đã được lưu'}</p>
    </div>
    <div class="screen-content" style="padding-top:20px">
      <div class="booking-summary">${summaryRows}</div>
      <button class="btn-secondary" onclick="goTo('schedule')">Xem lịch hẹn</button>
      <button class="btn-ghost" onclick="goHome()">Về màn hình chính</button>
    </div>
  `;
}

/* ===== SHOP ===== */
function screenShop() {
  const catTabs = [
    { id: 'all', name: 'Tất cả' },
    ...state.shopCategories
  ].map(c => `
    <button class="shop-tab ${state.selectedShopCat===c.id?'active':'inactive'}" data-cat="${c.id}">
      ${c.icon||''} ${c.name}
    </button>
  `).join('');

  const filtered = state.selectedShopCat === 'all'
    ? state.shopProducts
    : state.shopProducts.filter(p => p.cat === state.selectedShopCat);

  const products = filtered.map(p => {
    const inCart = state.cart.find(c => c.id === p.id);
    return `
      <div class="product-card">
        <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-meta">
            <span class="product-rating">${ICONS.star} ${p.rating}</span>
            <span class="product-sold">Đã bán ${p.sold}</span>
          </div>
          <div class="product-bottom">
            <div class="product-price">${p.price.toLocaleString('vi-VN')}đ</div>
            ${inCart
              ? `<div class="product-qty-ctrl">
                  <button class="qty-btn" data-id="${p.id}" data-action="minus">${ICONS.minus}</button>
                  <span class="qty-num">${inCart.qty}</span>
                  <button class="qty-btn" data-id="${p.id}" data-action="plus">${ICONS.plus}</button>
                </div>`
              : `<button class="product-add-btn" data-id="${p.id}">+ Thêm</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');

  const cartCount = state.cart.reduce((sum, c) => sum + c.qty, 0);

  return `
    <div class="screen-content">
      <div class="shop-header">
        <h1 class="page-title">Cửa hàng</h1>
        <button class="cart-badge-btn" onclick="goTo('cartview')">
          ${ICONS.cart}
          ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
        </button>
      </div>
      <p class="page-subtitle">Vật phẩm chăm sóc thú cưng</p>

      <div class="shop-tabs" id="shop-tabs">${catTabs}</div>

      <div class="search-bar" style="margin-bottom:14px">
        ${ICONS.search}
        <input type="text" id="shop-search" placeholder="Tìm sản phẩm...">
      </div>

      <div id="product-list">${products}</div>
    </div>
  `;
}

/* ===== CART ===== */
function screenCart() {
  if (state.cart.length === 0) {
    return `
      <div class="screen-content" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">${ICONS.cart}</div>
        <h2 style="margin-bottom:8px">Giỏ hàng trống</h2>
        <p class="page-subtitle">Hãy thêm sản phẩm từ cửa hàng</p>
        <button class="btn-primary" style="margin-top:16px" onclick="goTo('shop')">Đến cửa hàng</button>
      </div>
    `;
  }

  const items = state.cart.map(c => {
    const p = state.shopProducts.find(x => x.id === c.id);
    if (!p) return '';
    const subtotal = p.price * c.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${p.price.toLocaleString('vi-VN')}đ</div>
          <div class="product-qty-ctrl">
            <button class="qty-btn" data-id="${p.id}" data-action="minus">${ICONS.minus}</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" data-id="${p.id}" data-action="plus">${ICONS.plus}</button>
          </div>
        </div>
        <div class="cart-item-subtotal">${subtotal.toLocaleString('vi-VN')}đ</div>
        <button class="cart-remove" data-id="${p.id}" data-action="remove">${ICONS.trash}</button>
      </div>
    `;
  }).join('');

  const total = state.cart.reduce((sum, c) => {
    const p = state.shopProducts.find(x => x.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);

  return `
    <div class="screen-content">
      <h1 class="page-title">Giỏ hàng</h1>
      <p class="page-subtitle">${state.cart.length} sản phẩm</p>

      <div id="cart-items">${items}</div>

      <div class="cart-divider"></div>

      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Tạm tính</span>
          <span>${total.toLocaleString('vi-VN')}đ</span>
        </div>
        <div class="cart-summary-row">
          <span>Phí vận chuyển</span>
          <span>30.000đ</span>
        </div>
        <div class="cart-summary-row total">
          <span>Tổng cộng</span>
          <span>${(total + 30000).toLocaleString('vi-VN')}đ</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Địa chỉ giao hàng</label>
        <div class="location-wrap">
          <input type="text" class="form-input" id="delivery-address" placeholder="Nhập địa chỉ..." value="">
          <span class="suffix">${ICONS.pin}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Phương thức thanh toán</label>
        <div class="payment-options" id="payment-options">
          <div class="payment-opt selected" data-method="cod">Thanh toán khi nhận hàng (COD)</div>
          <div class="payment-opt" data-method="bank">Chuyển khoản ngân hàng</div>
          <div class="payment-opt" data-method="ewallet">Ví điện tử (MoMo/ZaloPay)</div>
        </div>
      </div>

      <button class="btn-primary" onclick="handlePlaceOrder()">Đặt hàng — ${(total + 30000).toLocaleString('vi-VN')}đ</button>
      <button class="btn-ghost" onclick="goTo('shop')">Tiếp tục mua sắm</button>
    </div>
  `;
}

/* ===== ORDER SUCCESS ===== */
function screenOrderSuccess() {
  const total = state.lastOrder ? state.lastOrder.total : 0;
  const itemCount = state.lastOrder ? state.lastOrder.itemCount : 0;

  return `
    <div class="success-header">
      <div class="success-check">${ICONS.check}</div>
      <h2 class="success-title">Đặt hàng thành công!</h2>
      <p class="success-sub">Đơn hàng của bạn đang được xử lý</p>
    </div>
    <div class="screen-content" style="padding-top:20px">
      <div class="booking-summary">
        <div class="summary-row">
          ${ICONS.box}
          <div>
            <div class="summary-label">Đơn hàng</div>
            <div class="summary-value">${itemCount} sản phẩm</div>
          </div>
        </div>
        <div class="summary-row">
          ${ICONS.cart}
          <div>
            <div class="summary-label">Tổng tiền</div>
            <div class="summary-value">${total.toLocaleString('vi-VN')}đ</div>
          </div>
        </div>
        <div class="summary-row">
          ${ICONS.pin}
          <div>
            <div class="summary-label">Giao đến</div>
            <div class="summary-value">${state.lastOrder ? state.lastOrder.address : '—'}</div>
          </div>
        </div>
        <div class="summary-row">
          ${ICONS.calendar}
          <div>
            <div class="summary-label">Dự kiến giao</div>
            <div class="summary-value">2–3 ngày</div>
          </div>
        </div>
      </div>
      <button class="btn-secondary" onclick="goTo('shop')">Tiếp tục mua sắm</button>
      <button class="btn-ghost" onclick="goHome()">Về màn hình chính</button>
    </div>
  `;
}
