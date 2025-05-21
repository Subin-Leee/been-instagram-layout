:root {
  --bg: #000; --fg: #fff;
  --sec-bg: #262626; --sec-fg: #bbb;
  --accent: #0095f6;
  --danger: #ff4956;
}
body.light-mode {
  --bg: #fff; --fg: #000;
  --sec-bg: #f5f5f5; --sec-fg: #666;
  --accent: #0095f6;
  --danger: #ff4956;
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
  width:100vw;
}
.main-scroll-area {
  flex: 1 1 auto;
  overflow-y: auto;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 70px;
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
  position:fixed; left:0; right:0; bottom:0;
  z-index:100;
  max-width:414px;
  margin:0 auto;
}
.nav-btn { background:none; border:none; font-size:24px; color:var(--fg); filter:grayscale(1); cursor:pointer; }
.danger { color: var(--danger); }
.spacer { height: 60px; }
#delete-cell {
  background:none;
  color:var(--danger);
  border:none;
  font-size:24px;
  filter:grayscale(1);
  cursor:pointer;
  outline: none;
}
#delete-cell.active {
  background:var(--danger);
  color:#fff;
  border-radius:50%;
}
