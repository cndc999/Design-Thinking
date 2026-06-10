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
    case 'spa': return screenSpa();
    case 'checkup': return screenCheckup();
    case 'medicine': return screenMedicine();
    case 'grooming': return screenGrooming();
    case 'bath': return screenBath();
    case 'editpet': return screenEditPet();
    case 'community': return screenCommunity();
    case 'createpost': return screenCreatePost();
    case 'genericsuccess': return screenGenericSuccess();
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
function screenHome() {
  const petCards = state.pets.map(p => `
    <div class="pet-card">
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

      <!-- CTA lớn: Thêm thú cưng -->
      <div class="home-cta" onclick="goTo('create')">
        <div class="cta-title">+ Thêm thú cưng mới</div>
        <div class="cta-sub">Tạo hồ sơ cho thú cưng của bạn</div>
      </div>

      <!-- 3 action cards -->
      <div class="action-row">
        <div class="action-card" onclick="goTo('vaccineselect')">
          <div class="ac-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.syringe}</div>
          <div class="ac-title">Tiêm phòng</div>
          <div class="ac-sub">Đặt lịch tiêm</div>
        </div>
        <div class="action-card" onclick="goTo('clinic')">
          <div class="ac-icon" style="background:var(--green-bg);color:var(--green)">${ICONS.calendar}</div>
          <div class="ac-title">Phòng khám</div>
          <div class="ac-sub">Khám & mua thuốc</div>
        </div>
        <div class="action-card" onclick="goTo('spa')">
          <div class="ac-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.heart}</div>
          <div class="ac-title">Spa</div>
          <div class="ac-sub">Tắm & cắt lông</div>
        </div>
      </div>

      <!-- Reminder → mở lịch tổng hợp -->
      <div class="reminder-card" onclick="goTo('schedule')">
        <div class="reminder-tag">Nhắc nhở sắp tới</div>
        <div class="reminder-title">Khám Sức Khỏe</div>
        <div class="reminder-pet">Luna — Golden Retriever</div>
        <div class="reminder-meta">
          <span class="reminder-chip">15 tháng 6, 2026</span>
          <span class="reminder-chip">2:30 chiều</span>
          <span class="reminder-chip">Happy Paws Clinic</span>
        </div>
      </div>

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
        <label class="form-label">Địa điểm</label>
        <div class="location-wrap">
          <input type="text" class="form-input" id="booking-location" value="${b.location}">
          <span class="suffix">${ICONS.pin}</span>
        </div>
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
  // Dữ liệu mẫu lịch hẹn
  const appointments = [
    { pet: 'Luna', breed: 'Golden Retriever', type: 'Tiêm phòng — Dại (Rabies)', date: '15 tháng 6, 2026', time: '9:00 sáng', place: 'Phòng Khám Thú Y Yên Lãng', color: 'var(--primary)' },
    { pet: 'Luna', breed: 'Golden Retriever', type: 'Khám tổng quát', date: '20 tháng 6, 2026', time: '2:30 chiều', place: 'Happy Paws Clinic', color: 'var(--green)' },
    { pet: 'Max', breed: 'French Bulldog', type: 'Spa — Tắm & Cắt lông', date: '22 tháng 6, 2026', time: '10:00 sáng', place: 'PetSpa Đống Đa', color: '#8E24AA' },
    { pet: 'Oliver', breed: 'British Shorthair', type: 'Tiêm phòng — Parvovirus', date: '28 tháng 6, 2026', time: '3:00 chiều', place: 'Phòng Khám Thú Y Yên Lãng', color: 'var(--primary)' },
  ];

  const petImg = (name) => {
    const p = state.pets.find(x => x.name === name);
    return p ? p.img : '';
  };

  const cards = appointments.map((a, i) => `
    <div class="schedule-card">
      <div class="schedule-color" style="background:${a.color}"></div>
      <div class="schedule-body">
        <div class="schedule-type">${a.type}</div>
        <div class="schedule-pet-row">
          <div class="schedule-pet-avatar"><img src="${petImg(a.pet)}" alt="${a.pet}"></div>
          <span>${a.pet} — ${a.breed}</span>
        </div>
        <div class="schedule-meta">
          <span>${a.date}</span>
          <span>${a.time}</span>
        </div>
        <div class="schedule-place">${a.place}</div>
      </div>
    </div>
  `).join('');

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
        <label class="form-label">Phòng khám</label>
        <div class="location-wrap">
          <input type="text" class="form-input" id="checkup-location" value="Happy Paws Clinic — Đống Đa">
          <span class="suffix">${ICONS.pin}</span>
        </div>
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
            <div class="option-price">150.000đ</div>
          </div>
          <div class="option-card" data-value="full">
            <div class="option-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.heart}</div>
            <div class="option-name">Cắt tạo kiểu</div>
            <div class="option-desc">Cắt theo yêu cầu, tạo kiểu thời trang</div>
            <div class="option-price">250.000đ</div>
          </div>
          <div class="option-card" data-value="premium">
            <div class="option-icon" style="background:var(--orange-bg);color:var(--orange)">${ICONS.shield}</div>
            <div class="option-name">Combo VIP</div>
            <div class="option-desc">Cắt tạo kiểu + tắm + sấy + nước hoa</div>
            <div class="option-price">400.000đ</div>
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
        <label class="form-label">Spa</label>
        <div class="location-wrap">
          <input type="text" class="form-input" value="PetSpa Đống Đa — 45 Tây Sơn">
          <span class="suffix">${ICONS.pin}</span>
        </div>
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
            <div class="option-price">100.000đ</div>
          </div>
          <div class="option-card" data-value="premium">
            <div class="option-icon" style="background:#F3E5F5;color:#8E24AA">${ICONS.shield}</div>
            <div class="option-name">Tắm cao cấp</div>
            <div class="option-desc">Dầu gội dược liệu, sấy tạo kiểu, xịt thơm</div>
            <div class="option-price">200.000đ</div>
          </div>
          <div class="option-card" data-value="spa">
            <div class="option-icon" style="background:var(--primary-bg);color:var(--primary)">${ICONS.heart}</div>
            <div class="option-name">Spa trọn gói</div>
            <div class="option-desc">Tắm + massage + vệ sinh tai, mắt, móng</div>
            <div class="option-price">350.000đ</div>
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
        <label class="form-label">Spa</label>
        <div class="location-wrap">
          <input type="text" class="form-input" value="PetSpa Đống Đa — 45 Tây Sơn">
          <span class="suffix">${ICONS.pin}</span>
        </div>
      </div>

      <button class="btn-primary" onclick="handleServiceSuccess('Tắm thú cưng','bath')">Xác nhận</button>
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
        <div class="post-user-avatar">${p.userAvatar}</div>
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
