document.addEventListener('DOMContentLoaded', () => {

  // --- MENU LATERAL (Sidebar) ---
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toggleBtn = document.getElementById('toggleMenu');
  const closeBtn = document.getElementById('closeMenu');

  function toggleMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  }

  if(toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
  if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
  if(overlay) overlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  });

  // --- CHECKBOX UNIC (Comportament tipus radio) ---
  document.querySelectorAll('.q-option input[type="checkbox"]').forEach(check => {
    check.addEventListener('change', function() {
      if(this.checked) {
        const name = this.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach(c => {
          if(c !== this) c.checked = false;
        });
      }
    });
  });

  // --- DRAG & DROP ---
  const tray = document.getElementById('tray');
  const zones = document.querySelectorAll('.drop-zone');

  // Inicialitzar safata
  if(tray) { 
    new Sortable(tray, { group: 'shared', animation: 150, sort: false }); 
  }

  // Inicialitzar zones de drop
  if(zones) {
    zones.forEach(zone => {
      new Sortable(zone, {
        group: 'shared', animation: 150, maxItems: 1,
        onAdd: function (evt) {
          // Si ja hi ha una lletra, torna l'antiga a la safata
          if (zone.children.length > 1) {
            const old = zone.children[0] === evt.item ? zone.children[1] : zone.children[0];
            tray.appendChild(old);
          }
          zone.style.borderColor = 'var(--border)';
        }
      });
    });
  }
});

// --- FUNCIÓ: CORRECCIÓ SELECT QUIZ ---
function checkSelectQuiz() {
  let hits = 0;
  const s1 = document.getElementById('sel1');
  const s2 = document.getElementById('sel2');
  const s3 = document.getElementById('sel3');
  const res = document.getElementById('select-result');

  if (!s1 || !s2 || !s3) return;

  if(s1.value === 'aes') { hits++; s1.style.borderColor='#00e5a8'; } else s1.style.borderColor='#f87171';
  if(s2.value === 'descon') { hits++; s2.style.borderColor='#00e5a8'; } else s2.style.borderColor='#f87171';
  if(s3.value === '24') { hits++; s3.style.borderColor='#00e5a8'; } else s3.style.borderColor='#f87171';
  
  res.textContent = `Encerts: ${hits}/3`;
  res.className = hits===3 ? 'status-msg ok' : 'status-msg ko';
}

// --- FUNCIÓ: CÀLCUL DE NOTA GLOBAL ---
function calculateFinalScore() {
  const nameInput = document.getElementById('studentName');
  const output = document.getElementById('final-output');
  
  if (!nameInput) return;
  const name = nameInput.value.trim();

  if (!name) { 
    alert("Si us plau, introdueix el teu nom."); 
    return; 
  }

  // 1. Quiz 1.11 (2 punts)
  let sQ = 0;
  if(document.querySelector('input[name="q1"][value="f"]')?.checked) sQ++;
  if(document.querySelector('input[name="q2"][value="a"]')?.checked) sQ++;

  // 2. Extra Selects (3 punts)
  let sEx = 0;
  const sel1 = document.getElementById('sel1');
  const sel2 = document.getElementById('sel2');
  const sel3 = document.getElementById('sel3');
  
  if(sel1 && sel1.value === 'aes') sEx++;
  if(sel2 && sel2.value === 'descon') sEx++;
  if(sel3 && sel3.value === '24') sEx++;

  // 3. DnD 1.18 (7 punts)
  const ans = {'zone-1':'A','zone-2':'G','zone-3':'D','zone-4':'B','zone-5':'C','zone-6':'F','zone-7':'E'};
  let sDnD = 0;
  
  for(const [id, letKey] of Object.entries(ans)) {
    const z = document.getElementById(id);
    if (z) {
      const item = z.querySelector('.letter-box');
      if(item && item.getAttribute('data-id') === letKey) { 
        sDnD++; 
        z.style.borderColor='#00e5a8'; 
      } else {
        z.style.borderColor='#f87171';
      }
    }
  }

  // Càlculs
  const total = sQ + sEx + sDnD; 
  const max = 12; 
  const pct = Math.round((total/max)*100);
  const color = pct >= 50 ? 'var(--accent)' : '#f87171';

  // Generar HTML
  let html = `
    <div style="margin-top:20px; padding:20px; border:1px solid ${color}; border-radius:12px; background:rgba(0,0,0,0.3);">
      <h3 style="margin:0; color:${color}; font-size:1.4rem;">${name}: ${pct}% (${total}/${max})</h3>
      <div style="font-size:0.9rem; color:var(--muted); margin-top:5px;">
        Quiz: <b>${sQ}/2</b> | Extra: <b>${sEx}/3</b> | Pràctica: <b>${sDnD}/7</b>
      </div>
  `;

  // --- LÒGICA DEL 80% ---
  if (pct >= 80) {
    html += `
      <div style="margin-top:15px; border-top:1px solid var(--border); padding-top:15px;">
        <p style="color:#fff; margin-bottom:10px;">🎉 Felicitats! Has desbloquejat el manual.</p>
        <a href="manual_wpa.html" class="btn-manual" target="_blank">📖 Obrir Manual TP-Link</a>
      </div>
    `;
    localStorage.setItem('practice_pass', 'true');
    localStorage.setItem('practice_name', name);
  } else {
    html += `
      <div style="margin-top:15px; border-top:1px solid var(--border); padding-top:10px;">
        <p style="color:#f87171;">🔒 Necessites un <strong>80%</strong> per veure el manual.</p>
      </div>
    `;
  }

  html += `</div>`;
  output.innerHTML = html;
}