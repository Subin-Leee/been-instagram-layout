:root {
  --bg: #000; --fg: #fff;
  --sec-bg: #262626; --sec-fg: #bbb;
  --accent: #0095f6;
  --del-bg: #e53a40;
  --del-fg: #fff;
}
body.light-mode {
  --bg: #fff; --fg: #000;
  --sec-bg: #f5f5f5; --sec-fg: #666;
  --accent: #0095f6;
  --del-bg: #ffe3e3;
  --del-fg: #d00;
}
html, body {
  margin:0; padding:0;
  background:var(--bg); color:var(--fg);
  height:100vh; width:100vw;
  overflow:hidden;
}
body {
  font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
  width:100vw; height:100vh;
  overflow:hidden;
}
.container {
  max-width:414px; height:100vh;
  margin:0 auto; display:flex; flex-direction:column;
  background:var(--bg); position:relative;
}
.main-scroll-area {
  flex:1 1 auto;
  overflow-y:auto;
  height:100vh;
  box-sizing:border-box;
  padding-bottom:70px; /* 메뉴바 가림 방지 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.main-scroll-area::-webkit-scrollbar { display: none; }
.header { padding:16px; }
.profile-nav { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.username { font-size:18px; font-weight:600; }
.notif-dot { display:inline-block; width:8px; height:8px; background:#ed4956; border-radius:50%; margin-left:4px; vertical-align:middle; }
.nav-icons .icon-btn { background:none; border:none; color:var(--fg); font-size:20px; margin-left:12px; filter:grayscale(1); cursor:pointer; }
.profile-main { display:flex; align-items:center; margin-bottom:12px; }
.profile-pic { width:100px; height:100px; border-radius:50%; background:var(--sec-bg); position:relative; overflow:hidden; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center;}
.profile-pic .placeholder { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; font-size:12px; color:var(--sec-fg); line-height:1.2;}
.stats { display:flex; flex:1; justify-content:space-around;}
.stat .num { font-size:18px; font-weight:600; color:var(--fg); text-align:center;}
.stat .label { font-size:12px; color:var(--sec-fg); text-align:center;}
.profile-bio .name { font-size:16px; font-weight:600; }
.profile-bio .desc { font-size:14px; margin-top:4px; }
.profile-bio .translate { font-size:12px; color:var(--accent); margin-top:4px;}
.dashboard { background:var(--sec-bg); border-radius:8px; padding:10px 12px; margin:12px 0; }
.dashboard-title { font-size:14px; font-weight:600; }
.dashboard-sub { font-size:12px; color:var(--sec-fg); margin-top:2px; }
.action-buttons { display:flex; gap:8px; margin-bottom:12px; }
.action-btn { flex:1; padding:8px 0; font-size:14px; background:var(--sec-bg); border:none; border-radius:6px; color:var(--fg); cursor:pointer; }
.feed-nav { display:flex; justify-content:space-around; border-top:1px solid var(--sec-bg); padding-top:12px;}
.feed-btn { background:none; border:none; color:var(--fg); font-size:20px; filter:grayscale(1); cursor:pointer; }

/* 피드박스: 항상 1:1비율, 한 줄부터 아래로 계속 쌓임 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  background: var(--bg);
}
.grid-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--sec-bg);
  overflow: hidden;
  cursor: move;
  user-select: none;
  transition: opacity 0.2s;
}
.grid-item img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
}
.grid-item .placeholder {
  position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  text-align: center; font-size: 12px;
  color: var(--sec-fg); line-height: 1.2;
  width: 100%;
}
.drop-zone.dragover { outline:2px dashed var(--accent); }

.bottom-nav {
  height:60px; background:var(--bg);
  display:flex; justify-content:space-around; align-items:center; border-top:1px solid var(--sec-bg);
  width:100%;
  position:sticky; bottom:0; left:0; right:0;
  z-index:100;
  max-width:414px;
  margin:0 auto;
}
.nav-btn { background:none; border:none; font-size:24px; color:var(--fg); filter:grayscale(1); cursor:pointer; }
.delete-btn { color: var(--del-bg); font-weight: bold; }
.spacer { height: 60px; }

/* 삭제 드롭존 */
.delete-dropzone {
  position: fixed;
  left: 50%; bottom: 90px;
  transform: translateX(-50%);
  width: 220px; height: 44px;
  background: var(--del-bg);
  color: var(--del-fg);
  border-radius: 22px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; font-weight: bold; letter-spacing: 2px;
  opacity: 0; pointer-events: none; z-index: 999;
  transition: opacity 0.3s, background 0.2s;
}
.delete-dropzone.active {
  opacity: 1;
}
