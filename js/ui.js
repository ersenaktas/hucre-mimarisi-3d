import { COMPARISON_DATA, GROUP_DETAILS } from './cell-data.js?v=5';

class UIManager {
  constructor(app) {
    this.app = app;
    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.cellList = document.getElementById('cell-list');
    this.organelleList = document.getElementById('organelle-list');
    this.detailsContent = document.getElementById('details-content');
    this.notesContent = document.getElementById('notes-content');
    this.cellNameDisplay = document.getElementById('current-cell-name');
    this.cellSubtitleDisplay = document.getElementById('current-cell-subtitle');
    
    // Alt Paneller
    this.occCaption = document.querySelector('.occ-caption');
    this.occImg = document.querySelector('.occ-img');
    
    // Modal
    this.compareModal = document.getElementById('compare-modal');
    this.btnCompare = document.getElementById('btn-compare');
    this.btnCloseCompare = document.getElementById('btn-close-compare');
    this.compareModalBody = document.getElementById('compare-modal-body');
  }

  initEventListeners() {
    // Toolbar Butonları
    document.getElementById('btn-rotate')?.addEventListener('click', () => this.app.scene.toggleRotation());
    document.getElementById('btn-reset')?.addEventListener('click', () => this.app.scene.resetCamera());
    document.getElementById('btn-isolate')?.addEventListener('click', () => this.app.scene.isolateSelected());
    document.getElementById('btn-hide-others')?.addEventListener('click', () => this.app.scene.toggleUnselectedVisibility());
    document.getElementById('btn-screenshot')?.addEventListener('click', () => this.app.scene.takeScreenshot());
    
    // Accordion for Panels
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const container = toggle.nextElementSibling;
            const icon = toggle.querySelector('.icon-toggle');
            if (container.style.display === 'none') {
                container.style.display = 'flex';
                if(icon) icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            } else {
                container.style.display = 'none';
                if(icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            }
        });
    });

    // Modal
    if (this.btnCompare) {
        this.btnCompare.addEventListener('click', () => this.showComparisonModal());
    }
    if (this.btnCloseCompare) {
        this.btnCloseCompare.addEventListener('click', () => {
            if (this.compareModal) this.compareModal.classList.add('hidden');
        });
    }
  }

  showComparisonModal() {
    console.log("Karşılaştırma modalı tetiklendi!");
    if (!this.compareModal || !this.compareModalBody) {
        console.error("Modal elementleri bulunamadı!");
        return;
    }
    
    const data = COMPARISON_DATA;
    let html = '';
    for (const key in data) {
            const comp = data[key];
            const keys = Object.keys(comp.features[0]).filter(k => k !== 'feature' && k !== 'icon');
            
            html += `<h3 style="margin-top: 1rem; color: var(--text-dark);">${comp.title}</h3>
                     <table class="compare-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
                     <thead>
                        <tr style="background: var(--bg-light); text-align: left;">
                            <th style="padding: 10px; border-bottom: 2px solid #ddd;">Özellik</th>
                            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-transform: capitalize;">${keys[0]}</th>
                            <th style="padding: 10px; border-bottom: 2px solid #ddd; text-transform: capitalize;">${keys[1]}</th>
                        </tr>
                     </thead>
                     <tbody>`;
                     
            comp.features.forEach(f => {
                html += `<tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 10px;"><strong>${f.feature}</strong></td>
                            <td style="padding: 10px;">${f[keys[0]]}</td>
                            <td style="padding: 10px;">${f[keys[1]]}</td>
                         </tr>`;
            });
            html += `</tbody></table>`;
        }
        this.compareModalBody.innerHTML = html;
        this.compareModal.classList.remove('hidden');
  }

  renderCellList(cells) {
    if (!this.cellList) return;
    this.cellList.innerHTML = '';

    cells.forEach(cell => {
      const item = document.createElement('div');
      item.className = `cell-item ${this.app.currentCell?.id === cell.id ? 'active' : ''}`;
      item.innerHTML = `
        <div class="cell-info" style="padding-left: 5px;">
          <strong>${cell.name}</strong>
          <span>${cell.subtitle}</span>
        </div>
      `;
      item.onclick = () => this.app.switchCell(cell.id);
      this.cellList.appendChild(item);
    });
  }

  renderOrganelleList(organelles) {
    if (!this.organelleList) return;
    this.organelleList.innerHTML = '';

    const groups = {};

    organelles.forEach(org => {
      if (org.group) {
        if (!groups[org.group]) {
          groups[org.group] = this.createGroupContainer(org.group);
          this.organelleList.appendChild(groups[org.group].wrapper);
        }
        groups[org.group].content.appendChild(this.createOrganelleItem(org, true));
      } else {
        this.organelleList.appendChild(this.createOrganelleItem(org, false));
      }
    });
  }

  createGroupContainer(groupName) {
    const wrapper = document.createElement('div');
    wrapper.className = 'organelle-group-wrapper';
    wrapper.dataset.groupName = groupName;

    const header = document.createElement('div');
    header.className = 'organelle-group-header';
    header.innerHTML = `
      <span>${groupName}</span>
      <i class="fas fa-chevron-right group-icon"></i>
    `;

    const content = document.createElement('div');
    content.className = 'organelle-group-content';
    content.style.display = 'none';

    header.onclick = () => {
      const isOpen = content.style.display !== 'none';
      content.style.display = isOpen ? 'none' : 'block';
      header.classList.toggle('open', !isOpen);
      header.querySelector('.group-icon').classList.toggle('fa-chevron-down', !isOpen);
      header.querySelector('.group-icon').classList.toggle('fa-chevron-right', isOpen);
      
      // Grup bilgisi gelsin
      if (GROUP_DETAILS[groupName]) {
        this.app.selectOrganelle(`group-${groupName}`);
      }
    };

    wrapper.appendChild(header);
    wrapper.appendChild(content);

    return { wrapper, content, header };
  }

  createOrganelleItem(org, isNested) {
    const item = document.createElement('div');
    item.className = `organelle-item ${isNested ? 'nested' : ''}`;
    item.dataset.id = org.id;
    
    const color = '#' + org.color.toString(16).padStart(6, '0');
    item.innerHTML = `
      <div class="organelle-dot" style="background: ${color}"></div>
      <div class="organelle-info">
        <span>${org.name}</span>
      </div>
    `;

    item.onclick = (e) => {
      e.stopPropagation();
      const effectiveId = org.group ? `group-${org.group}` : org.id;
      this.app.selectOrganelle(effectiveId);
    };

    return item;
  }

  setActiveOrganelle(orgId) {
    document.querySelectorAll('.organelle-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.organelle-group-header').forEach(h => h.classList.remove('active'));
    
    if (!orgId) return;

    if (typeof orgId === 'string' && orgId.startsWith('group-')) {
      const groupName = orgId.replace('group-', '');
      const header = this.organelleList.querySelector(`.organelle-group-wrapper[data-group-name="${groupName}"] .organelle-group-header`);
      if (header) {
        header.classList.add('active');
        // Manual expansion to avoid loops
        const content = header.nextElementSibling;
        if (content && content.style.display === 'none') {
            content.style.display = 'block';
            header.classList.add('open');
            const icon = header.querySelector('.group-icon');
            if(icon) {
                icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            }
        }
        header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      const activeItem = this.organelleList.querySelector(`.organelle-item[data-id="${orgId}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
        
        const groupContent = activeItem.closest('.organelle-group-content');
        if (groupContent && groupContent.style.display === 'none') {
          const header = groupContent.previousElementSibling;
          header.click();
        }
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  updateCellHeader(cell) {
    if (this.cellNameDisplay) this.cellNameDisplay.textContent = cell.name;
    if (this.cellSubtitleDisplay) this.cellSubtitleDisplay.textContent = cell.subtitle;
    
    if (this.occCaption) {
        if (cell.id.includes('bitki')) {
            this.occCaption.textContent = "Tüm yeşil bitkilerin yaprak ve gövdelerinde bulunur.";
            this.occImg.src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300";
        } else if (cell.id.includes('hayvan')) {
            this.occCaption.textContent = "Tüm hayvanların ve insanların doku ve organlarında bulunur.";
            this.occImg.src = "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=300";
        } else {
            this.occCaption.textContent = "Doğada, suda ve toprakta yaygın olarak bulunur.";
            this.occImg.src = "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=300";
        }
    }
  }

  showOrganelleDetails(org) {
    if (!org) {
      this.detailsContent.innerHTML = '<div class="empty-state">Bir organel seçmek için 3D model üzerinde tıklayın.</div>';
      this.notesContent.innerHTML = '<p class="placeholder-text">Organel seçildiğinde biyolojik bilgiler burada görünecektir.</p>';
      return;
    }

    const color = '#' + org.color.toString(16).padStart(6, '0');
    
    this.detailsContent.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong style="color: ${color}; font-size: 1.15rem; display: block; margin-bottom: 6px;">${org.name}</strong>
        <p style="font-size:0.85rem; color:#777; margin-bottom:12px;">Hücrenin ${this.getOrganelleTagline(org.id)}</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem;">
        <div style="display:flex; gap:8px; align-items:flex-start;">
          <span style="font-weight:700; color:#888; min-width:52px; padding-top:1px;">Boyut</span>
          <span style="color:#444; line-height:1.5;">${this.getOrganelleSize(org.id)}</span>
        </div>
        <div style="display:flex; gap:8px; align-items:flex-start;">
          <span style="font-weight:700; color:#888; min-width:52px; padding-top:1px;">Konum</span>
          <span style="color:#444; line-height:1.5;">${this.getOrganelleLocation(org.id)}</span>
        </div>
      </div>
    `;

    const cellInfo = this.app.currentCell?.cellInfo;
    this.notesContent.innerHTML = `
      <p style="margin-bottom:14px; line-height:1.7;">${org.description || 'Bu organel hücrenin hayati fonksiyonlarını sürdürmesi için kritik öneme sahiptir.'}</p>
      ${cellInfo ? `
      <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f5f0ff 100%); border-radius:10px; padding:16px; font-size:0.88rem; line-height:1.7; margin-top:12px; border: 1px solid rgba(108,92,231,0.15);">
        <strong style="color:#6c5ce7; display:block; margin-bottom:10px; font-size:0.95rem;">🔬 ${this.app.currentCell.name} Hakkında</strong>
        <p style="margin-bottom:10px; color:#444;">${cellInfo.genel}</p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span style="font-size:1rem; min-width:20px;">🌍</span>
            <div><strong style="color:#555; font-size:0.82rem;">Yaşam Alanı</strong><br><span style="color:#666;">${cellInfo.habitat}</span></div>
          </div>
          <div style="display:flex; gap:8px; align-items:flex-start;">
            <span style="font-size:1rem; min-width:20px;">⚡</span>
            <div><strong style="color:#555; font-size:0.82rem;">Temel Özellik</strong><br><span style="color:#666;">${cellInfo.ozellik}</span></div>
          </div>
          <div style="background:rgba(108,92,231,0.08); border-radius:8px; padding:10px 12px; margin-top:4px;">
            <span style="font-size:1rem;">✨</span> <strong style="color:#6c5ce7; font-size:0.82rem;">İlginç Gerçek</strong><br>
            <span style="color:#555;">${cellInfo.ilgincGercek}</span>
          </div>
        </div>
      </div>
      ` : ''}
    `;
  }

  getOrganelleEmoji(id) {
    if (id.includes('cekirdek')) return '<i class="fas fa-brain"></i>';
    if (id.includes('mito')) return '<i class="fas fa-bolt"></i>';
    if (id.includes('er') || id.includes('retikulum')) return '<i class="fas fa-network-wired"></i>';
    if (id.includes('golgi')) return '<i class="fas fa-box"></i>';
    if (id.includes('klor')) return '<i class="fas fa-leaf"></i>';
    if (id.includes('zar')) return '<i class="fas fa-shield-alt"></i>';
    if (id.includes('koful')) return '<i class="fas fa-database"></i>';
    if (id.includes('ribozom')) return '<i class="fas fa-industry"></i>';
    return '<i class="fas fa-cube"></i>';
  }

  getOrganelleTagline(id) {
    if (id.includes('cekirdek')) return 'yönetim merkezi';
    if (id.includes('mito')) return 'enerji santrali';
    if (id.includes('er')) return 'iletim sistemi';
    if (id.includes('golgi')) return 'paketleme birimi';
    if (id.includes('klor')) return 'mutfağı (fotosentez)';
    if (id.includes('zar')) return 'koruyucu kalkanı';
    if (id.includes('koful')) return 'depolama merkezi';
    if (id.includes('lizozom')) return 'sindirim birimi';
    if (id.includes('sentrozom')) return 'bölünme yardımcısı';
    return 'temel yapısı';
  }

  getOrganelleSize(id) {
    if (id.includes('cekirdek')) return '5-10 μm';
    if (id.includes('mito')) return '0.5-1 μm';
    return 'Mikroskobik';
  }

  getOrganelleLocation(id) {
    if (id.includes('cekirdek')) return 'Genellikle merkezde';
    return 'Sitoplazma içinde';
  }



  showLoading(isVisible, progress = 0) {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');
    if (overlay) {
      if (isVisible) {
        overlay.classList.remove('hidden');
        if (text && progress > 0) text.textContent = `Modeller yükleniyor (%${progress})`;
        else if (text) text.textContent = `Modeller yükleniyor...`;
      } else {
        overlay.classList.add('hidden');
      }
    }
  }

  setToolbarActive(btnId, isActive) {
    const btn = document.getElementById(btnId);
    if (btn) {
      if (isActive) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  }
}

export default UIManager;
