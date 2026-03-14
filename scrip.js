// ============================================================
//  RESONANCE MUSIC PLAYER — script.js
//  Doubly Linked List logic (mirrors original C backend)
// ============================================================

// ── SongNode Class (mirrors C struct Song) ───────────────────
class SongNode {
  constructor(name, singer, duration) {
    this.name     = name;
    this.singer   = singer   || 'Unknown Artist';
    this.duration = duration || '3:30';
    this.prev     = null;
    this.next     = null;
  }
}

// ── Global pointers (mirrors C globals) ─────────────────────
let head      = null;
let tail      = null;
let current   = null;
let isPlaying = false;
let songCount = 0;

// ============================================================
//  LINKED LIST FUNCTIONS (mirrors C backend exactly)
// ============================================================

// addSong() — appends a new node at the tail
function addSong(name, singer, duration) {
  const newSong = new SongNode(name, singer, duration);
  if (head === null) {
    head = tail = newSong;
  } else {
    tail.next    = newSong;
    newSong.prev = tail;
    tail         = newSong;
  }
  songCount++;
  renderPlaylist();
  updateTrackCount();
}

// playNext() — move current pointer forward
function playNext() {
  if (current === null) {
    current = head;
  } else if (current.next !== null) {
    current = current.next;
  } else {
    showLog('Already at last song', true);
    return;
  }
  isPlaying = true;
  updateNowPlaying();
  renderPlaylist();
}

// playPrevious() — move current pointer backward
function playPrevious() {
  if (current === null) {
    current = head;
  } else if (current.prev !== null) {
    current = current.prev;
  } else {
    showLog('Already at first song', true);
    return;
  }
  isPlaying = true;
  updateNowPlaying();
  renderPlaylist();
}

// playByNode() — jump directly to a clicked node
function playByNode(node) {
  current   = node;
  isPlaying = true;
  updateNowPlaying();
  renderPlaylist();
}

// togglePlay() — pause / resume
function togglePlay() {
  if (current === null) {
    playNext();
    return;
  }
  isPlaying = !isPlaying;
  updateNowPlaying();
}

// ============================================================
//  UI FUNCTIONS
// ============================================================

// Update the Now Playing card
function updateNowPlaying() {
  const card     = document.getElementById('nowPlaying');
  const titleEl  = document.getElementById('songTitle');
  const singerEl = document.getElementById('singerName');
  const statusEl = document.getElementById('statusText');
  const playIcon = document.getElementById('playIcon');

  if (current) {
    titleEl.textContent  = current.name;
    singerEl.textContent = current.singer;
    statusEl.textContent = isPlaying ? 'PLAYING' : 'PAUSED';
    card.classList.toggle('playing', isPlaying);

    playIcon.innerHTML = isPlaying
      ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'   // pause icon
      : '<path d="M8 5v14l11-7z"/>';                      // play icon

    showLog(
      isPlaying
        ? `▶ Playing: ${current.name} — ${current.singer}`
        : `⏸ Paused: ${current.name}`,
      false
    );
  }
}

// Render the full playlist from the linked list
function renderPlaylist() {
  const list = document.getElementById('songsList');
  list.innerHTML = '';
  let node = head;
  let i    = 1;

  while (node !== null) {
    const item = document.createElement('div');
    item.className = 'song-item' + (node === current ? ' active' : '');

    // Show animated equalizer bars for active+playing, else track number
    item.innerHTML = (node === current && isPlaying)
      ? `<div class="bars">
           <div class="bar"></div>
           <div class="bar"></div>
           <div class="bar"></div>
           <div class="bar"></div>
         </div>`
      : `<div class="song-num">${String(i).padStart(2, '0')}</div>`;

    item.innerHTML += `
      <div class="song-info-col">
        <div class="song-name">${node.name}</div>
        <div class="song-singer">${node.singer}</div>
      </div>
      <div class="song-duration">${node.duration}</div>
    `;

    // Click to jump to this song
    const captured = node;
    item.addEventListener('click', () => playByNode(captured));

    list.appendChild(item);
    node = node.next;
    i++;
  }
}

// Update the track counter badge
function updateTrackCount() {
  document.getElementById('trackCount').textContent =
    `${songCount} TRACK${songCount !== 1 ? 'S' : ''}`;
}

// Show a status log message
function showLog(msg, isWarn) {
  document.getElementById('logArea').innerHTML =
    `<div class="log-message${isWarn ? ' warn' : ''}">${msg}</div>`;
}

// Handle Add Song form
function addSongFromInput() {
  const nameInput   = document.getElementById('newSongInput');
  const singerInput = document.getElementById('newSingerInput');
  const name        = nameInput.value.trim();
  const singer      = singerInput.value.trim() || 'Unknown Artist';

  if (!name) return;

  addSong(name, singer, '3:30');
  showLog(`Added: ${name} — ${singer}`, false);
  nameInput.value   = '';
  singerInput.value = '';
  nameInput.focus();
}

// ============================================================
//  BOOT — Load Hindi Songs
// ============================================================
addSong('Tum Hi Ho',        'Arijit Singh',                '4:22');
addSong('Kesariya',         'Arijit Singh',                '4:34');
addSong('Raataan Lambiyan', 'Jubin Nautiyal',              '3:46');
addSong('Tera Ban Jaunga',  'Akhil Sachdeva',              '3:52');
addSong('Hawayein',         'Arijit Singh',                '5:02');
addSong('Dil Diyan Gallan', 'Atif Aslam',                  '4:18');
addSong('Judaai',           'Rekha Bhardwaj',              '5:11');
addSong('Channa Mereya',    'Arijit Singh',                '4:49');
addSong('Ik Vaari Aa',      'Arijit Singh',                '4:05');
addSong('Gerua',            'Arijit Singh & Antara Mitra', '4:31');

showLog('Playlist loaded. Hit play or select a track.', false);
