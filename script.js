// 피드 영역 가져오기
const grid = document.getElementById('grid');

// 피드 초기 3칸(1줄)
for (let i = 0; i < 3; i++) {
  grid.appendChild(createGridItem());
}

// +버튼: 피드 추가
document.getElementById('add-cell').addEventListener('click', () => {
  grid.appendChild(createGridItem());
});

// -버튼: 삭제 안내 활성화
const deleteDropzone = document.getElementById('delete-dropzone');
const deleteBtn = document.getElementById('delete-cell');
deleteBtn.addEventListener('click', () => {
  deleteDropzone.classList.add('active');
  setTimeout(() => deleteDropzone.classList.remove('active'), 1500);
});

// 달/해 버튼: 라이트/다크 토글
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.getElementById('theme-toggle').textContent =
    document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// 프로필: 클릭(추가), 더블클릭/롱프레스(삭제)
const profilePic = document.getElementById('profile-pic');
profilePic.addEventListener('click', () => {
  if (!profilePic.querySelector('img')) {
    currentTarget = profilePic;
    fileInput.click();
  }
});
profilePic.addEventListener('dblclick', () => {
  if (profilePic.querySelector('img')) resetZone(profilePic);
});
let profilePressTimer;
profilePic.addEventListener('mousedown', () => {
  profilePressTimer = setTimeout(() => {
    if (profilePic.parentNode) resetZone(profilePic);
  }, 800);
});
profilePic.addEventListener('mouseup', () => clearTimeout(profilePressTimer));
profilePic.addEventListener('mouseleave', () => clearTimeout(profilePressTimer));

// 파일 입력(프로필, 피드 공용)
let currentTarget = null;
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  renderImage(currentTarget, URL.createObjectURL(file));
  fileInput.value = '';
});

// 피드 아이템 생성 함수
function createGridItem() {
  const item = document.createElement('div');
  item.className = 'grid-item drop-zone';
  item.draggable = true;
  const ph = document.createElement('div');
  ph.className = 'placeholder';
  ph.innerHTML = '사진<br>드래그<br>또는 클릭';
  item.appendChild(ph);
  enableInt(item);
  return item;
}

// 피드(프로필과 구조 동일) - 인터랙션 부여
function enableInt(el) {
  // 드래그 삭제 (드래그해서 -로 가져가면 삭제)
  el.addEventListener('dragstart', (e) => {
    setTimeout(() => el.classList.add('dragging'), 0);
    deleteDropzone.classList.add('active');
    el.style.opacity = "0.5";
  });
  el.addEventListener('dragend', (e) => {
    el.classList.remove('dragging');
    deleteDropzone.classList.remove('active');
    el.style.opacity = "";
  });
  // 드래그 드롭 영역 강조
  el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('dragover'); });
  el.addEventListener('dragleave', () => el.classList.remove('dragover'));
  el.addEventListener('drop', e => {
    e.preventDefault(); el.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) renderImage(el, URL.createObjectURL(f));
  });
  // 클릭(이미지 추가)
  el.addEventListener('click', () => {
    if (el.querySelector('img')) return;
    currentTarget = el;
    fileInput.click();
  });
  // 더블클릭(삭제)
  el.addEventListener('dblclick', () => {
    if (el.querySelector('img')) resetZone(el);
  });
  // 롱프레스(800ms) 삭제
  let pressTimer;
  el.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 800);
  });
  el.addEventListener('mouseup', () => clearTimeout(pressTimer));
  el.addEventListener('mouseleave', () => clearTimeout(pressTimer));
}

// 삭제 드롭존(dropzone)으로 드래그하면 삭제
deleteDropzone.addEventListener('dragover', e => {
  e.preventDefault();
  deleteDropzone.style.background = "var(--del-bg)";
});
deleteDropzone.addEventListener('dragleave', () => {
  deleteDropzone.style.background = "var(--del-bg)";
});
deleteDropzone.addEventListener('drop', e => {
  e.preventDefault();
  const dragging = document.querySelector('.grid-item.dragging');
  if (dragging) dragging.remove();
  deleteDropzone.classList.remove('active');
  deleteDropzone.style.background = "var(--del-bg)";
});

// 이미지 렌더/리셋
function renderImage(ct, src) {
  ct.innerHTML = '';
  const img = document.createElement('img'); img.src = src; ct.appendChild(img);
}
function resetZone(ct) {
  ct.innerHTML = '';
  const ph = document.createElement('div'); ph.className = 'placeholder';
  ph.innerHTML = '사진<br>드래그<br>또는 클릭'; ct.appendChild(ph);
}
