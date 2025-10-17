
const hotlineServices = [
  { id: 1, icon: 'B12-A5-Emergency-Hotline/assets/ambulance.png', name: 'জরুরী অ্যাম্বুলেন্স', nameEn: 'Emergency Ambulance', number: '199', category: 'Medical' },
  { id: 2, icon: 'B12-A5-Emergency-Hotline/assets/fire-service.png', name: 'অগ্নি নির্বাপন', nameEn: 'Fire Service', number: '161', category: 'Emergency' },
  { id: 3, icon: 'B12-A5-Emergency-Hotline/assets/police.png', name: 'পুলিশ', nameEn: 'Police', number: '999', category: 'Security' },
  { id: 4, icon: 'B12-A5-Emergency-Hotline/assets/emergency.png', name: 'হেল্পলাইন', nameEn: 'Health Helpline', number: '162', category: 'Medical' },
  { id: 5, icon: 'B12-A5-Emergency-Hotline/assets/brac.png', name: 'শিশু সহায়তা', nameEn: 'Child Support', number: '1098', category: 'Support' },
  { id: 6, icon: 'B12-A5-Emergency-Hotline/assets/logo.png', name: 'জাতীয় হেল্পলাইন', nameEn: 'National Helpline', number: '333', category: 'General' }
];


let state = {
  heartCount: 0,
  coinCount: 100,
  copyCount: 0,
  callHistory: []
};


const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const hotlineCardsEl = document.getElementById('hotlineCards');
const callHistoryEl = document.getElementById('callHistory');
const clearHistoryBtn = document.getElementById('clearHistory');


function init() {
  loadState();
  renderHotlineCards();
  renderCallHistory();
  updateUI();

  clearHistoryBtn.addEventListener('click', clearHistory);
}














function renderHotlineCards() {
  hotlineCardsEl.innerHTML = '';

  hotlineServices.forEach(s => {
    const card = `
      <div class="bg-white rounded-lg shadow-md p-6 fade-in">
        <div class="flex justify-between items-start mb-4">
          <img src="${s.icon}" alt="${s.name}" class="w-10 h-10">
              <button class="like-btn text-red-500" data-id="${s.id}">
            <i class="far fa-heart"></i>
          </button>
        </div>
        <h3 class="text-xl font-bold mb-2">${s.name}</h3>
        <p class="text-gray-600 mb-1">${s.nameEn}</p>
        <p class="text-2xl font-bold text-blue-600 mb-4">${s.number}</p>
       <button class="text-blue-800 text-xs gap-2 px-2 py-0.5  rounded">${s.category}
        <div class="flex justify-between items-center">
        </button>
      
          <div class="flex space-x-2">
            <button class="copy-btn   py-2 px-1 w-full rounded-lg bg-green-50 hover-btn bg-green-50 text-black px-4 py-2 rounded hover:bg-green-100 hover:scale-105 transition transform "  data-number="${s.number}">
              <i class="fas fa-copy mr-2"></i> Copy
            </button>
            <button class="call-btn bg-green-500  py-2 px-2 w-full rounded-lg" 
              data-id="${s.id}" data-number="${s.number}" data-name="${s.name}">
              <i class="fas fa-phone-alt mr-2"></i> Call
            </button>
          </div>
        </div>
      </div>
    `;
    hotlineCardsEl.innerHTML += card;
  });

  addCardEvents();
}

function addCardEvents() {
  document.querySelectorAll('.like-btn').forEach(btn =>
    btn.addEventListener('click', handleLike)
  );
  document.querySelectorAll('.copy-btn').forEach(btn =>
    btn.addEventListener('click', handleCopy)
  );
  document.querySelectorAll('.call-btn').forEach(btn =>
    btn.addEventListener('click', handleCall)
  );
}

function handleLike(e) {
  const icon = e.currentTarget.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    state.heartCount++;
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    if (state.heartCount > 0) state.heartCount--;
  }
  updateUI();
  saveState();
}

function handleCopy(e) {
  const number = e.currentTarget.dataset.number;
  navigator.clipboard.writeText(number).then(() => {
    alert(`Number ${number} copied!`);
    state.copyCount++;
    updateUI();
    saveState();
  });
}

function handleCall(e) {
  const number = e.currentTarget.dataset.number;
  const name = e.currentTarget.dataset.name;

  if (state.coinCount < 20) {
    alert("Not enough coins!");
    return;
  }

  state.coinCount -= 20;
  alert(`Calling ${name} at ${number}...`);

  const time = new Date().toLocaleTimeString();
  state.callHistory.push({ name, number, time });

  updateUI();
  renderCallHistory();
  saveState();
}

function renderCallHistory() {
  if (state.callHistory.length === 0) {
    callHistoryEl.innerHTML = '<p class="text-gray-500 text-center py-4">No call history yet</p>';
    return;
  }

  callHistoryEl.innerHTML = state.callHistory.map(h => `
    <div class="bg-gray-100 p-4 rounded mb-2">
      <div class="flex justify-between">
        <div>
          <h4 class="font-semibold">${h.name}</h4>
          <p class="text-gray-600">${h.number}</p>
        </div>
        <span class="text-sm text-gray-500">${h.time}</span>
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  state.callHistory = [];
  renderCallHistory();
  saveState();
}


function updateUI() {
  heartCountEl.textContent = state.heartCount;
  coinCountEl.textContent = state.coinCount;
  copyCountEl.textContent = state.copyCount;
}

function saveState() {
  localStorage.setItem('hotlineApp', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('hotlineApp');
  if (saved) state = JSON.parse(saved);
 
  

 else state = { heartCount : 0, coinCount : 100, copyCount :0, callHistory : []}
 updateUI();
}






document.addEventListener('DOMContentLoaded', init);
