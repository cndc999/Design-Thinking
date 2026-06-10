/* ===== EVENT BINDING (gọi sau mỗi lần goTo) ===== */

function bindScreenEvents(screen) {
  switch(screen) {
    case 'create': bindCreateEvents(); break;
    case 'breed': bindBreedEvents(); break;
    case 'vaccineselect': bindVaccineSelectEvents(); break;
    case 'booking': bindBookingEvents(); break;
    case 'home': bindHomeEvents(); break;
    case 'checkup': bindServiceScreen('checkup-pet-list', 'checkup-type', 'checkup-time'); break;
    case 'medicine': bindServiceScreen('med-pet-list', null, null); bindMedicineSearch(); break;
    case 'grooming': bindServiceScreen('groom-pet-list', 'groom-style', 'groom-time'); break;
    case 'bath': bindServiceScreen('bath-pet-list', 'bath-pkg', 'bath-time'); break;
    case 'editpet': bindEditPetEvents(); break;
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
}

function handleConfirmBooking() {
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;
  const loc = document.getElementById('booking-location').value;

  if (!date) { showToast('Vui lòng chọn ngày tiêm'); return; }

  state.booking.date = date;
  state.booking.time = time || '09:00';
  state.booking.location = loc || 'Phòng Khám Thú Y Yên Lãng';
  state.booking.note = document.getElementById('booking-note').value;

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
function bindServiceScreen(petListId, optionGridId, timeGridId) {
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
        });
      });
    }
  }
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

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  goTo('intro');
});
