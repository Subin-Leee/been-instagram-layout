// 피드 초기 3칸(1줄)
const grid = document.getElementById('grid');
for (let i = 0; i < 3; i++) {
  grid.appendChild(createGridItem());
}

// 한 칸 추가
document.getElementById('add-cell').addEventListener('click', () => {
  grid.appendChild(createGridItem());
});

// 프로필: 클릭(추가), 더블클릭(삭제)
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

// 파일 입력 엘리먼트(공용)
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

// 삭제 드롭존(메뉴바 - 버튼)
const deleteDropzone = document.getElementById('delete-dropzone');
const deleteBtn = document.getElementById('delete-cell');

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

// 피드/프로필 드래그&삭제, 클릭추가/더블클릭삭제
function enableInt(el) {
  // 드래그&드롭 이미지, -버튼 드래그 삭제
  el.addEventListener('dragstart', () => {
    el.classList.add('dragging');
    deleteDropzone.classList.add('active');
    setTimeout(() => el.style.opacity = "0.5", 0);
  });
  el.addEventListener('dragend', (e) => {
    el.classList.remove('dragging');
    deleteDropzone.classList.remove('active');
    el.style.opacity = "";
  });
  el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('dragover'); });
  el.addEventListener('dragleave', () => el.classList.remove('dragover'));
  el.addEventListener('drop', e => {
    e.preventDefault(); el.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) renderImage(el, URL.createObjectURL(f));
  });
  // 클릭(추가)
  el.addEventListener('click', () => {
    if (el.querySelector('img')) return;
    currentTarget = el;
    fileInput.click();
  });
  // 더블클릭(삭제)
  el.addEventListener('dblclick', () => {
    if (el.querySelector('img')) resetZone(el);
  });
}

// -버튼(삭제 영역) 드래그로 삭제
deleteDropzone.addEventListener('dragover', e => {
  e.preventDefault();
  deleteDropzone.style.background = "var(--del-bg)";
});
deleteDropzone.addEventListener('dragleave', e => {
  deleteDropzone.style.background = "var(--del-bg)";
});
deleteDropzone.addEventListener('drop', e => {
  e.preventDefault();
  // 삭제할 엘 찾기
  const dragging = document.querySelector('.grid-item.dragging');
  if (dragging) dragging.remove();
  deleteDropzone.classList.remove('active');
  deleteDropzone.style.background = "var(--del-bg)";
});
// -버튼(클릭시 삭제모드 안내)
deleteBtn.addEventListener('click', () => {
  deleteDropzone.classList.add('active');
  setTimeout(() => deleteDropzone.classList.remove('active'), 1500);
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

// 라이트/다크모드
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.getElementById('theme-toggle').textContent =
    document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});
