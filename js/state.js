/* ===== SVG ICONS (thay thế emoji) ===== */
const ICONS = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  syringe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2l4 4M15 5l6 6M10.5 9.5L3 17v4h4l7.5-7.5M10.5 9.5l3-3M13.5 6.5l3 3"/></svg>',
  paw: '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5c-14.3-42.9.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7.9 78.6 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2-25.8 0-46.7-20.9-46.7-46.7v-1.6c0-10.4 1.6-20.8 5.2-30.5zM312 128c-14.3-42.9.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5zm99.2 70.7c-18.9 32.4-14.3 70.1 10.2 84.1s59.7-.9 78.5-33.3 14.3-70.1-10.2-84.1-59.7.9-78.5 33.3z"/></svg>',
};

/* ===== BREED DATA với ảnh thật ===== */
const BREEDS = {
  dog: [
    { name: 'Poodle', img: 'img/dog/poodle.jpg' },
    { name: 'Corgi', img: 'img/dog/corgi.jpg' },
    { name: 'Golden Retriever', img: 'img/dog/golden_retriever.jpg' },
    { name: 'Shiba Inu', img: 'img/dog/shiba.jpg' },
    { name: 'Pomeranian', img: 'img/dog/pomeranian.jpg' },
    { name: 'Husky', img: 'img/dog/husky.jpg' },
    { name: 'Samoyed', img: 'img/dog/samoyed.jpg' },
    { name: 'French Bulldog', img: 'img/dog/bulldog.jpg' },
    { name: 'Alaska', img: 'img/dog/alaska.jpg' },
  ],
  cat: [
    { name: 'British Shorthair', img: 'img/cat/Britishblue.jpg' },
    { name: 'Munchkin', img: 'img/cat/munchkin.jpg' },
    { name: 'Scottish Fold', img: 'img/cat/scottish.jpg' },
    { name: 'Persian', img: 'img/cat/Persialainen.jpg' },
    { name: 'Maine Coon', img: 'img/cat/mainecoon.jpg' },
    { name: 'Bengal', img: 'img/cat/bengal.jpg' },
    { name: 'Ragdoll', img: 'img/cat/Ragdoll.jpg' },
    { name: 'Siamese', img: 'img/cat/siamese.jpg' },
    { name: 'Sphynx', img: 'img/cat/sphinx.jpg' },
  ]
};

/* ===== TYPE IMAGES ===== */
const TYPE_IMAGES = {
  dog: 'https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg',
  cat: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg',
};

/* ===== APP STATE ===== */
const state = {
  currentScreen: 'intro',
  navHistory: ['intro'],

  pets: [
    { id: 1, name: 'Luna', breed: 'Golden Retriever', type: 'dog', gender: 'female', age: 3,
      weight: 28, birthday: '2021-03-15', status: 'healthy', statusLabel: 'Sức Khoẻ Tuyệt Vời',
      lastVisit: '15 tháng 6, 2026',
      img: 'https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg' },
    { id: 2, name: 'Max', breed: 'French Bulldog', type: 'dog', gender: 'male', age: 2,
      weight: 12, birthday: '2022-07-22', status: 'warn', statusLabel: 'Cần Chú Ý',
      lastVisit: '10 tháng 6, 2026',
      img: 'https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_640.jpg' },
    { id: 3, name: 'Oliver', breed: 'British Shorthair', type: 'cat', gender: 'male', age: 1,
      weight: 5, birthday: '2023-11-05', status: 'healthy', statusLabel: 'Khoẻ Mạnh',
      lastVisit: '8 tháng 6, 2026',
      img: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg' },
  ],

  createPet: {
    name: '', type: 'dog', gender: 'male',
    breed: '', birthday: '', weight: '', photo: null
  },

  booking: {
    petId: 1, vaccine: 'Dại (Rabies)',
    date: '2026-06-04', time: '09:00',
    location: 'Phòng Khám Thú Y Yên Lãng',
    reminder: '1 ngày', note: ''
  }
};
