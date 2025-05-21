// 초기 9칸
const grid = document.getElementById('grid');
for (let i = 0; i < 9; i++) {
  grid.appendChild(createGridItem());
}

// 한 칸 추가 (두번째 줄 첫번째 칸 위치에 삽입)
document.getElementById('add-cell').addEventListener('click', () => {
  const newCell = createGridItem();
  // 두 번째 줄 첫 번째 칸은 index 3
  const ref = grid.children[3];
  if (ref) grid.insertBefore(newCell, ref);
  else grid.appendChild(newCell);
});

// 파일 입력 엘리먼트 생성
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

// 아이템 생성 함수
function createGridItem() {
  const item = document.createElement('div');
  item.className = 'grid-item drop-zone';
  item.draggable = true;

  const ph = document.createElement('div');
  ph.className = 'placeholder';
  ph.innerHTML = '사진<br>드래그<br>또는 클릭';
  item.appendChild(ph);

  enableInt(el=item);
  return item;
}

// 인터랙션 활성화
function enableInt(el) {
  el.addEventListener('dragover', e => {
    e.preventDefault(); el.classList.add('dragover');
  });
  el.addEventListener('dragleave', () => el.classList.remove('dragover'));
  el.addEventListener('drop', e => {
    e.preventDefault(); el.classList.remove('dragover');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) {
      renderImage(el, URL.createObjectURL(f));
    }
  });
  el.addEventListener('click', () => {
    if (el.querySelector('img')) resetZone(el);
    else { currentTarget = el; fileInput.click(); }
  });
  let pressTimer;
  el.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => el.remove(), 800);
  });
  el.addEventListener('mouseup', () => clearTimeout(pressTimer));
  el.addEventListener('mouseleave', () => clearTimeout(pressTimer));
  el.addEventListener('dragstart', () => { el.classList.add('dragging'); currentTarget = el; });
  el.addEventListener('dragend', () => { el.classList.remove('dragging'); currentTarget = null; });
  el.addEventListener('dragover', e => { if (currentTarget && currentTarget!==el) e.preventDefault(); });
  el.addEventListener('drop', e => {
    e.preventDefault();
    if (currentTarget && currentTarget!==el) {
      const kids = Array.from(grid.children);
      const from = kids.indexOf(currentTarget);
      const to = kids.indexOf(el);
      if (from < to) grid.insertBefore(currentTarget, el.nextSibling);
      else grid.insertBefore(currentTarget, el);
    }
  });
}

function renderImage(ct, src) {
  ct.innerHTML = '';
  const img = document.createElement('img'); img.src = src; ct.appendChild(img);
}

function resetZone(ct) {
  ct.innerHTML = '';
  const ph = document.createElement('div'); ph.className = 'placeholder';
  ph.innerHTML = '사진<br>드래그<br>또는 클릭'; ct.appendChild(ph);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.getElementById('theme-toggle').textContent =
    document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});
