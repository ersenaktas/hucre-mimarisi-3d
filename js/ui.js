import { COMPARISON_DATA } from './cell-data.js';

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
        <div class="cell-icon"><i class="fas fa-bullseye" style="color: var(--accent-purple); font-size: 1.4rem;"></i></div>
        <div class="cell-info">
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

    organelles.forEach(org => {
      const item = document.createElement('div');
      item.className = `organelle-item ${this.app.selectedOrganelleId === org.id ? 'active' : ''}`;
      const color = '#' + org.color.toString(16).padStart(6, '0');
      
      item.innerHTML = `
        <div class="organelle-dot" style="background: ${color}"></div>
        <div class="organelle-info">
          <span>${org.name}</span>
        </div>
      `;
      
      item.onclick = () => {
        // Eski aktifi temizle, yeniyi işaretle
        document.querySelectorAll('.organelle-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        this.app.selectOrganelle(org.id);
      };
      this.organelleList.appendChild(item);
    });
  }

  setActiveOrganelle(orgId) {
    document.querySelectorAll('.organelle-item').forEach(el => el.classList.remove('active'));
    if (!orgId) return;
    
    // İsme veya ID'ye göre bulup işaretle (Daha sağlam yöntem)
    const items = this.organelleList.querySelectorAll('.organelle-item');
    items.forEach(item => {
        if (item.textContent.trim().includes(orgId)) { // Basit eşleştirme
            item.classList.add('active');
        }
    });
  }

  updateCellHeader(cell) {
    if (this.cellNameDisplay) this.cellNameDisplay.textContent = cell.name;
    if (this.cellSubtitleDisplay) this.cellSubtitleDisplay.textContent = cell.subtitle;
    
    // Nerede bulunur kısmını güncelle
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
      <div class="detail-header" style="padding-left: 0;">
        <div class="detail-info">
          <strong style="color: ${color}; font-size: 1.1rem; display: block; margin-bottom: 5px;">${org.name}</strong>
          <p>Hücrenin ${this.getOrganelleTagline(org.id)}</p>
        </div>
      </div>
      <div class="detail-meta">
        <span class="detail-meta-label">Boyut</span>
        <span class="detail-meta-value">${this.getOrganelleSize(org.id)}</span>
        <span class="detail-meta-label">Konum</span>
        <span class="detail-meta-value">${this.getOrganelleLocation(org.id)}</span>
      </div>
    `;

    this.notesContent.innerHTML = `
      <p>${org.description || 'Bu organel hücrenin hayati fonksiyonlarını sürdürmesi için kritik öneme sahiptir.'}</p>
      <div class="fun-fact">
        <strong>Biliyor muydunuz?</strong> ${this.getFunFact(org.id)}
      </div>
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

  getFunFact(id) {
    if (id.includes('cekirdek')) return 'Çekirdek, hücrenin tüm DNA bilgisini saklayan bir kütüphane gibidir!';
    if (id.includes('mito')) return 'Mitokondrilerin kendilerine ait özel bir DNA\'ları vardır!';
    if (id.includes('klor')) return 'Kloroplastlar güneş enerjisini doğrudan besine dönüştürebilir!';
    return 'Bu organel hücrenin yaşam döngüsü için vazgeçilmezdir.';
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
