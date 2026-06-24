/* ===== APPOINTMENT HELPERS ===== */

// '2026-06-15' -> '15 tháng 6, 2026'
function formatViDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate()} tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
}

// '14:30' -> '2:30 chiều'. Nếu đã là chuỗi tiếng Việt (có 'sáng/chiều...') thì giữ nguyên.
function formatViTime(t) {
  if (!t) return '';
  if (/sáng|trưa|chiều|tối/i.test(t)) return t.trim();
  const parts = t.split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] != null ? parts[1] : '00';
  if (isNaN(h)) return t;
  const period = h < 12 ? 'sáng' : 'chiều';
  let hh = h % 12; if (hh === 0) hh = 12;
  return `${hh}:${String(m).padStart(2, '0')} ${period}`;
}

// Chọn màu theo loại dịch vụ
function colorForService(type) {
  const s = (type || '').toLowerCase();
  if (s.includes('spa') || s.includes('tắm') || s.includes('cắt') || s.includes('lông')) return '#8E24AA';
  if (s.includes('khám') || s.includes('kiểm tra') || s.includes('tổng quát')) return 'var(--green)';
  return 'var(--primary)'; // tiêm phòng & mặc định
}

// Thêm 1 lịch hẹn mới vào state.appointments
function addAppointment({ petId, type, dateISO, time, place, color }) {
  const pet = state.pets.find(p => p.id === petId) || state.pets[0] || {};
  state.apptSeq = (state.apptSeq || 0) + 1;
  state.appointments.push({
    id: state.apptSeq,
    petId: pet.id,
    pet: pet.name || '',
    breed: pet.breed || '',
    type: type || 'Lịch hẹn',
    dateISO: dateISO || '',
    time: formatViTime(time),
    place: place || '',
    color: color || colorForService(type),
  });
}

/* ===== VENUE HELPERS (phòng khám & tiệm chăm sóc) ===== */

// Lấy phòng khám đang được chọn
function getSelectedClinic() {
  return state.clinics.find(c => c.id === state.booking.clinicId) || state.clinics[0] || null;
}

// Lấy tiệm chăm sóc đang được chọn
function getSelectedSalon() {
  return state.salons.find(s => s.id === state.booking.salonId) || state.salons[0] || null;
}

// Gắn sự kiện chọn (phòng khám hoặc tiệm) cho 1 danh sách
// bookingKey: 'clinicId' hoặc 'salonId'; onChange: gọi lại sau khi chọn
function bindVenuePicker(listId, bookingKey, onChange) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.querySelectorAll('.clinic-item').forEach(item => {
    item.addEventListener('click', () => {
      state.booking[bookingKey] = parseInt(item.dataset.venueId);
      const venue = bookingKey === 'salonId' ? getSelectedSalon() : getSelectedClinic();
      if (venue) state.booking.location = venue.name;
      list.querySelectorAll('.clinic-item').forEach(x =>
        x.classList.toggle('selected', x === item)
      );
      if (typeof onChange === 'function') onChange();
    });
  });
}

/* ===== PRICING (giá theo tiệm + khung giờ) ===== */

// Định dạng tiền VNĐ: 150000 -> '150.000đ'
function formatVND(n) {
  return String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Hệ số theo giờ: sớm rẻ, muộn đắt. 8h -> 0.90, mỗi giờ +5%, tối đa ~1.40
function timeFactor(t) {
  const parts = (t || '09:00').split(':');
  const h = parseInt(parts[0], 10) + (parseInt(parts[1] || '0', 10) / 60);
  const factor = 0.90 + (h - 8) * 0.05;
  return Math.max(0.80, Math.min(1.40, factor));
}

// Tính lại giá tất cả option theo tiệm + giờ đang chọn; trả về giá của option đang chọn
// prefix: 'groom' (grid id 'groom-style', 'groom-time') hoặc 'bath' ('bath-pkg', 'bath-time')
function updateServicePrices(prefix) {
  const salon = getSelectedSalon();
  const sf = salon && salon.priceFactor ? salon.priceFactor : 1;

  const timeEl = document.querySelector('#' + prefix + '-time .time-slot.selected');
  const tf = timeFactor(timeEl ? timeEl.dataset.time : '09:00');

  let selectedTotal = 0;
  document.querySelectorAll('#' + prefix + '-style .option-card, #' + prefix + '-pkg .option-card').forEach(card => {
    const priceEl = card.querySelector('.option-price');
    if (!priceEl || priceEl.dataset.base == null) return;
    const base = parseInt(priceEl.dataset.base, 10);
    const val = Math.round(base * sf * tf / 1000) * 1000; // làm tròn tới nghìn
    priceEl.textContent = formatVND(val);
    if (card.classList.contains('selected')) selectedTotal = val;
  });

  const totalEl = document.getElementById(prefix + '-total');
  if (totalEl) totalEl.textContent = formatVND(selectedTotal);
  return selectedTotal;
}

// Mở màn đánh giá cho 1 phòng khám / tiệm
function openReviews(type, id) {
  state.viewReview = { type, id };
  goTo('reviews');
}

// Mở hồ sơ y tế của thú cưng
function openPetRecord(id) {
  state.viewPetId = id;
  goTo('petrecord');
}

// Mở màn chỉnh sửa thú cưng theo id
function editPetById(id) {
  const pet = state.pets.find(p => p.id === id);
  if (pet) { state.editingPet = pet; goTo('editpet'); }
}

/* ===== GLOBAL SEARCH (tìm kiếm toàn ứng dụng) ===== */

function handleGlobalSearch(q) {
  const box = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  if (!box) return;

  const query = (q || '').trim().toLowerCase();
  if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';
  if (!query) { box.innerHTML = ''; box.classList.remove('show'); return; }

  const results = [];

  // Chỉ tìm các chức năng lớn của app
  const dests = [
    { kw: ['tiêm', 'vắc xin', 'vaccine', 'tiêm phòng'], label: 'Tiêm phòng', sub: 'Đặt lịch tiêm vắc xin', target: 'vaccineselect', icon: ICONS.syringe },
    { kw: ['khám', 'kiểm tra', 'phòng khám', 'sức khỏe', 'thuốc'], label: 'Phòng khám', sub: 'Khám, tiêm & mua thuốc', target: 'clinic', icon: ICONS.calendar },
    { kw: ['spa', 'tắm', 'cắt lông', 'grooming', 'làm đẹp', 'tiệm'], label: 'Spa', sub: 'Tắm & cắt lông', target: 'spa', icon: ICONS.heart },
    { kw: ['cửa hàng', 'shop', 'mua sắm', 'phụ kiện', 'thức ăn', 'sản phẩm', 'đồ chơi'], label: 'Cửa hàng', sub: 'Thức ăn, đồ chơi, phụ kiện', target: 'shop', icon: ICONS.cart },
    { kw: ['cộng đồng', 'community', 'bài viết', 'bài đăng'], label: 'Cộng đồng', sub: 'Bài viết từ cộng đồng', target: 'community', icon: ICONS.users },
    { kw: ['nhắc nhở', 'nhắc nhở sắp tới', 'lịch', 'lịch hẹn', 'sắp tới', 'appointment'], label: 'Nhắc nhở sắp tới', sub: 'Lịch hẹn của tất cả thú cưng', target: 'schedule', icon: ICONS.clock },
  ];

  const matches = (d) => {
    if ((d.label || '').toLowerCase().includes(query)) return true;
    return d.kw.some(k => k.includes(query) || query.includes(k));
  };

  dests.forEach(d => {
    if (matches(d)) {
      results.push({ icon: d.icon, title: d.label, sub: d.sub, onclick: `selectSearch('screen','${d.target}')` });
    }
  });

  if (!results.length) {
    box.innerHTML = `<div class="search-empty">Không tìm thấy chức năng cho "${q}"</div>`;
  } else {
    box.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="${r.onclick}">
        <div class="sr-ic">${r.icon || ''}</div>
        <div class="sr-text">
          <div class="sr-title">${r.title}</div>
          <div class="sr-sub">${r.sub || ''}</div>
        </div>
        <span class="sr-tag">Chức năng</span>
      </div>
    `).join('');
  }
  box.classList.add('show');
}

function selectSearch(type, target) {
  clearGlobalSearch();
  if (type === 'screen') goTo(target);
}

function clearGlobalSearch() {
  const input = document.getElementById('global-search');
  const box = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  if (input) input.value = '';
  if (box) { box.innerHTML = ''; box.classList.remove('show'); }
  if (clearBtn) clearBtn.style.display = 'none';
}

/* ===== EVENT BINDING (gọi sau mỗi lần goTo) ===== */

function bindScreenEvents(screen) {
  switch(screen) {
    case 'create': bindCreateEvents(); break;
    case 'breed': bindBreedEvents(); break;
    case 'vaccineselect': bindVaccineSelectEvents(); break;
    case 'booking': bindBookingEvents(); break;
    case 'home': bindHomeEvents(); break;
    case 'checkup': bindServiceScreen('checkup-pet-list', 'checkup-type', 'checkup-time', 'checkup-clinic-list', 'clinicId'); break;
    case 'medicine': bindServiceScreen('med-pet-list', null, null); bindMedicineSearch(); break;
    case 'grooming': bindServiceScreen('groom-pet-list', 'groom-style', 'groom-time', 'groom-salon-list', 'salonId', () => updateServicePrices('groom')); break;
    case 'bath': bindServiceScreen('bath-pet-list', 'bath-pkg', 'bath-time', 'bath-salon-list', 'salonId', () => updateServicePrices('bath')); break;
    case 'editpet': bindEditPetEvents(); break;
    case 'community': bindCommunityEvents(); break;
    case 'createpost': bindCreatePostEvents(); break;
    case 'shop': bindShopEvents(); break;
    case 'cartview': bindCartEvents(); break;
  }
}

/* --- Create Pet --- */
function bindCreateEvents() {
  // Type cards
  document.querySelectorAll('.type-card').forEach(c => {
    c.addEventListener('click', () => {
      state.createPet.type = c.dataset.type;
      document.querySelectorAll('.type-card').forEach(x => x.classList.toggle('selected', x === c));
    });
  });

  // Gender cards
  document.querySelectorAll('.gender-card').forEach(c => {
    c.addEventListener('click', () => {
      state.createPet.gender = c.dataset.gender;
      document.querySelectorAll('.gender-card').forEach(x => x.classList.toggle('selected', x === c));
    });
  });

  // Photo upload
  const photoPreview = document.getElementById('photo-preview');
  const photoInput = document.getElementById('photo-input');
  if (photoPreview && photoInput) {
    photoPreview.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        photoPreview.innerHTML = `<img src="${ev.target.result}" alt="Pet photo">`;
        state.createPet.photo = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

function handleGoToBreed() {
  const name = document.getElementById('pet-name-input').value.trim();
  if (!name) { showToast('Vui lòng nhập tên thú cưng'); return; }
  state.createPet.name = name;
  goTo('breed');
}

/* --- Breed --- */
function bindBreedEvents() {
  // Breed cards
  document.querySelectorAll('.breed-card').forEach(c => {
    c.addEventListener('click', () => {
      state.createPet.breed = c.dataset.breed;
      document.querySelectorAll('.breed-card').forEach(x =>
        x.classList.toggle('selected', x.dataset.breed === state.createPet.breed)
      );
    });
  });

  // Search
  const searchInput = document.getElementById('breed-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.breed-card').forEach(c => {
        const name = c.dataset.breed.toLowerCase();
        c.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }
}

function handleGoToPetInfo() {
  if (!state.createPet.breed) { showToast('Vui lòng chọn giống'); return; }
  goTo('petinfo');
}

/* --- Pet Info --- */
function handleFinishCreate() {
  const bday = document.getElementById('pet-birthday').value;
  const weight = document.getElementById('pet-weight').value;

  if (!bday) { showToast('Vui lòng chọn ngày sinh'); return; }
  if (!weight) { showToast('Vui lòng nhập cân nặng'); return; }

  const cp = state.createPet;
  cp.birthday = bday;
  cp.weight = parseFloat(weight);

  // Tìm ảnh giống
  const breeds = BREEDS[cp.type] || BREEDS.dog;
  const breedData = breeds.find(b => b.name === cp.breed);

  const newPet = {
    id: Date.now(),
    name: cp.name,
    breed: cp.breed,
    type: cp.type,
    gender: cp.gender,
    age: Math.max(0, Math.floor((Date.now() - new Date(bday)) / (365.25 * 24 * 3600 * 1000))),
    weight: cp.weight,
    birthday: cp.birthday,
    status: 'healthy',
    statusLabel: 'Sức Khoẻ Tốt',
    lastVisit: 'Chưa khám',
    img: cp.photo || (breedData ? breedData.img : TYPE_IMAGES[cp.type]),
  };

  state.pets.push(newPet);

  // Reset
  state.createPet = { name: '', type: 'dog', gender: 'male', breed: '', birthday: '', weight: '', photo: null };

  showToast('Đã thêm ' + newPet.name + ' thành công!');
  setTimeout(() => goHome(), 600);
}

/* --- Vaccine Select --- */
function bindVaccineSelectEvents() {
  document.querySelectorAll('.pet-select-item').forEach(item => {
    item.addEventListener('click', () => {
      state.booking.petId = parseInt(item.dataset.petId);
      document.querySelectorAll('.pet-select-item').forEach(x =>
        x.classList.toggle('selected', x === item)
      );
    });
  });
}

function handleGoToBooking() {
  if (!state.booking.petId) { showToast('Vui lòng chọn thú cưng'); return; }
  goTo('booking');
}

/* --- Booking Form --- */
function bindBookingEvents() {
  // Vaccine tags
  document.querySelectorAll('#vaccine-tags .tag').forEach(t => {
    t.addEventListener('click', () => {
      state.booking.vaccine = t.dataset.vaccine;
      document.querySelectorAll('#vaccine-tags .tag').forEach(x =>
        x.className = 'tag ' + (x.dataset.vaccine === state.booking.vaccine ? 'active' : 'inactive')
      );
    });
  });

  // Reminder tags
  document.querySelectorAll('#reminder-tags .tag').forEach(t => {
    t.addEventListener('click', () => {
      state.booking.reminder = t.dataset.reminder;
      document.querySelectorAll('#reminder-tags .tag').forEach(x =>
        x.className = 'tag ' + (x.dataset.reminder === state.booking.reminder ? 'active' : 'inactive')
      );
    });
  });

  // Clinic picker
  bindVenuePicker('booking-clinic-list', 'clinicId');
}

function handleConfirmBooking() {
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;
  const clinic = getSelectedClinic();

  if (!date) { showToast('Vui lòng chọn ngày tiêm'); return; }
  if (!clinic) { showToast('Vui lòng chọn phòng khám'); return; }

  state.booking.date = date;
  state.booking.time = time || '09:00';
  state.booking.location = clinic.name;
  state.booking.note = document.getElementById('booking-note').value;

  // Lưu lịch hẹn mới vào danh sách
  addAppointment({
    petId: state.booking.petId,
    type: 'Tiêm phòng — ' + state.booking.vaccine,
    dateISO: state.booking.date,
    time: state.booking.time,
    place: clinic.name,
    color: 'var(--primary)',
  });

  goTo('success');
}

/* --- Home --- */
function bindHomeEvents() {
  document.querySelectorAll('.pet-action-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = parseInt(btn.dataset.id);
      const pet = state.pets.find(p => p.id === id);
      if (!pet) return;

      if (action === 'delete') {
        if (confirm('Bạn có chắc muốn xóa ' + pet.name + '?')) {
          state.pets = state.pets.filter(p => p.id !== id);
          goTo('home'); // Re-render
          showToast('Đã xóa ' + pet.name);
        }
      } else if (action === 'fav') {
        pet.fav = !pet.fav;
        goTo('home');
        showToast(pet.fav ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích');
      } else if (action === 'edit') {
        state.editingPet = pet;
        goTo('editpet');
      }
    });
  });
}

/* ===== GENERIC SERVICE SCREEN EVENTS ===== */
function bindServiceScreen(petListId, optionGridId, timeGridId, venueListId, venueBookingKey, onChange) {
  // Pet selector
  const petList = document.getElementById(petListId);
  if (petList) {
    petList.querySelectorAll('.pet-select-item').forEach(item => {
      item.addEventListener('click', () => {
        state.booking.petId = parseInt(item.dataset.petId);
        petList.querySelectorAll('.pet-select-item').forEach(x =>
          x.classList.toggle('selected', x === item)
        );
      });
    });
  }

  // Option cards
  if (optionGridId) {
    const grid = document.getElementById(optionGridId);
    if (grid) {
      grid.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
          grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          if (typeof onChange === 'function') onChange();
        });
      });
    }
  }

  // Time slots
  if (timeGridId) {
    const grid = document.getElementById(timeGridId);
    if (grid) {
      grid.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
          grid.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
          slot.classList.add('selected');
          if (typeof onChange === 'function') onChange();
        });
      });
    }
  }

  // Venue picker (phòng khám / tiệm)
  if (venueListId) {
    bindVenuePicker(venueListId, venueBookingKey || 'clinicId', onChange);
  }

  // Tính giá lần đầu (nếu có)
  if (typeof onChange === 'function') onChange();
}

function bindMedicineSearch() {
  const input = document.getElementById('med-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.med-product-card').forEach(card => {
      const name = card.querySelector('.med-product-name').textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

/* ===== EDIT PET EVENTS ===== */
function bindEditPetEvents() {
  const pet = state.editingPet;
  if (!pet) return;

  // Type cards
  document.querySelectorAll('.type-card').forEach(c => {
    c.addEventListener('click', () => {
      pet.type = c.dataset.type;
      document.querySelectorAll('.type-card').forEach(x => x.classList.toggle('selected', x === c));
    });
  });

  // Gender cards
  document.querySelectorAll('.gender-card').forEach(c => {
    c.addEventListener('click', () => {
      pet.gender = c.dataset.gender;
      document.querySelectorAll('.gender-card').forEach(x => x.classList.toggle('selected', x === c));
    });
  });

  // Photo upload
  const photoEl = document.getElementById('edit-photo');
  const photoInput = document.getElementById('edit-photo-input');
  if (photoEl && photoInput) {
    photoEl.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        photoEl.innerHTML = `<img src="${ev.target.result}" alt="Pet">`;
        pet.img = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

function handleSaveEdit() {
  const pet = state.editingPet;
  if (!pet) return;

  const name = document.getElementById('edit-name').value.trim();
  const breed = document.getElementById('edit-breed').value.trim();
  const weight = document.getElementById('edit-weight').value;
  const birthday = document.getElementById('edit-birthday').value;

  if (!name) { showToast('Vui lòng nhập tên'); return; }

  // Cập nhật data
  const idx = state.pets.findIndex(p => p.id === pet.id);
  if (idx !== -1) {
    state.pets[idx].name = name;
    state.pets[idx].breed = breed;
    state.pets[idx].weight = parseFloat(weight) || pet.weight;
    state.pets[idx].birthday = birthday || pet.birthday;
    state.pets[idx].type = pet.type;
    state.pets[idx].gender = pet.gender;
    state.pets[idx].img = pet.img;
  }

  showToast('Đã lưu thay đổi cho ' + name);
  setTimeout(() => goHome(), 600);
}

/* ===== COMMUNITY EVENTS ===== */
function bindCommunityEvents() {
  document.querySelectorAll('.post-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = parseInt(btn.dataset.postId);
      const action = btn.dataset.action;
      const post = state.posts.find(p => p.id === postId);
      if (!post) return;

      if (action === 'like') {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        goTo('community'); // Re-render
      } else if (action === 'comment') {
        showToast('Bình luận — sắp ra mắt!');
      } else if (action === 'share') {
        showToast('Đã chia sẻ!');
      }
    });
  });
}

function bindCreatePostEvents() {
  // Pet selector
  document.querySelectorAll('.post-pet-option').forEach(opt => {
    opt.addEventListener('click', () => {
      state.newPost.petId = parseInt(opt.dataset.petId);
      document.querySelectorAll('.post-pet-option').forEach(x =>
        x.classList.toggle('selected', x === opt)
      );
    });
  });

  // Photo upload
  const photoInput = document.getElementById('post-photo-input');
  const photoPreview = document.getElementById('post-photo-preview');
  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        state.newPost.photo = ev.target.result;
        photoPreview.innerHTML = `<img src="${ev.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`;
      };
      reader.readAsDataURL(file);
    });
  }
}

function handleCreatePost() {
  const content = document.getElementById('post-content').value.trim();
  if (!content) { showToast('Vui lòng nhập nội dung'); return; }

  const pet = state.pets.find(p => p.id === state.newPost.petId) || state.pets[0];
  const newPost = {
    id: Date.now(),
    userId: 'me', userName: state.user.name, userAvatar: state.user.avatar || state.user.initials,
    petName: pet.name, petBreed: pet.breed,
    content: content,
    img: state.newPost.photo || pet.img,
    likes: 0, comments: 0, liked: false,
    time: 'Vừa xong'
  };
  state.posts.unshift(newPost);
  state.newPost = { content: '', petId: null, photo: null };
  showToast('Đã đăng bài thành công!');
  setTimeout(() => goTo('community'), 600);
}

/* ===== GENERIC SERVICE SUCCESS ===== */
function handleServiceSuccess(serviceName, serviceType) {
  // Lấy thông tin từ form hiện tại
  const pet = state.pets.find(p => p.id === state.booking.petId) || state.pets[0];
  const dateEl = document.querySelector('input[type="date"]');
  const timeSlot = document.querySelector('.time-slot.selected');
  const locEl = document.querySelector('.location-wrap input');

  let dateStr = '—';
  if (dateEl && dateEl.value) {
    const d = new Date(dateEl.value);
    const days = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
    dateStr = `${days[d.getDay()]}, ${d.getDate()} tháng ${d.getMonth()+1}, ${d.getFullYear()}`;
  }
  const timeStr = timeSlot ? timeSlot.textContent.trim() : '';

  // Chọn nơi theo loại dịch vụ: khám -> phòng khám, spa/tắm -> tiệm chăm sóc
  let placeStr = '—';
  if (serviceType === 'checkup' || serviceType === 'medicine') {
    const clinic = getSelectedClinic();
    placeStr = clinic ? clinic.name : '—';
  } else if (serviceType === 'grooming' || serviceType === 'bath') {
    const salon = getSelectedSalon();
    placeStr = salon ? salon.name : '—';
  } else if (locEl) {
    placeStr = locEl.value;
  }

  // Giá: với spa/tắm, lấy giá đã tính theo tiệm + giờ; tính trực tiếp từ option đang chọn
  let priceStr = '';
  if (serviceType === 'grooming' || serviceType === 'bath') {
    const prefix = serviceType === 'grooming' ? 'groom' : 'bath';
    const salon = getSelectedSalon();
    const sf = salon && salon.priceFactor ? salon.priceFactor : 1;
    const tEl = document.querySelector('#' + prefix + '-time .time-slot.selected');
    const tf = timeFactor(tEl ? tEl.dataset.time : '09:00');
    const sel = document.querySelector('#' + prefix + '-style .option-card.selected .option-price, #' + prefix + '-pkg .option-card.selected .option-price');
    if (sel && sel.dataset.base != null) {
      const val = Math.round(parseInt(sel.dataset.base, 10) * sf * tf / 1000) * 1000;
      priceStr = formatVND(val);
    }
  }

  state.lastSuccess = {
    service: serviceName,
    datetime: dateStr + (timeStr ? ' | ' + timeStr : ''),
    location: placeStr,
    price: priceStr,
    subtitle: serviceName + ' đã được đặt lịch'
  };

  // Lưu lịch hẹn mới vào danh sách
  addAppointment({
    petId: state.booking.petId,
    type: serviceName + (priceStr ? ' · ' + priceStr : ''),
    dateISO: dateEl ? dateEl.value : '',
    time: timeStr,
    place: placeStr,
    color: colorForService(serviceType + ' ' + serviceName),
  });

  goTo('genericsuccess');
}

/* ===== SHOP EVENTS ===== */
function bindShopEvents() {
  // Category tabs
  document.querySelectorAll('.shop-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.selectedShopCat = tab.dataset.cat;
      goTo('shop');
    });
  });

  // Add to cart
  document.querySelectorAll('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      state.cart.push({ id, qty: 1 });
      goTo('shop');
      showToast('Đã thêm vào giỏ hàng');
    });
  });

  // Qty buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const item = state.cart.find(c => c.id === id);
      if (!item) return;
      if (action === 'plus') item.qty++;
      if (action === 'minus') {
        item.qty--;
        if (item.qty <= 0) state.cart = state.cart.filter(c => c.id !== id);
      }
      goTo('shop');
    });
  });

  // Search
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('.product-name').textContent.toLowerCase();
        card.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }
}

function bindCartEvents() {
  // Qty buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const item = state.cart.find(c => c.id === id);
      if (!item) return;
      if (action === 'plus') item.qty++;
      if (action === 'minus') {
        item.qty--;
        if (item.qty <= 0) state.cart = state.cart.filter(c => c.id !== id);
      }
      goTo('cartview');
    });
  });

  // Remove
  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      state.cart = state.cart.filter(c => c.id !== id);
      goTo('cartview');
      showToast('Đã xóa khỏi giỏ hàng');
    });
  });

  // Payment options
  document.querySelectorAll('.payment-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

function handlePlaceOrder() {
  const address = document.getElementById('delivery-address').value.trim();
  if (!address) { showToast('Vui lòng nhập địa chỉ giao hàng'); return; }

  const total = state.cart.reduce((sum, c) => {
    const p = state.shopProducts.find(x => x.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0) + 30000;

  state.lastOrder = {
    total: total,
    itemCount: state.cart.reduce((sum, c) => sum + c.qty, 0),
    address: address
  };
  state.cart = [];
  goTo('ordersuccess');
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  goTo('intro');
});
