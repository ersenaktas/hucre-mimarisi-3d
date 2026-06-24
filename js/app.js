import { CELLS, COMPARISON_DATA, GROUP_DETAILS } from './cell-data.js?v=12';
import { SceneManager } from './scene.js?v=10';
import UIManager from './ui.js?v=10';

class App {
  constructor() {
    this.currentCell = CELLS[0];
    this.selectedOrganelleId = null;

    // UI Manager
    this.ui = new UIManager(this);

    // Scene Manager
    const canvas = document.getElementById('three-canvas');
    this.scene = new SceneManager(
      canvas,
      (pct) => this.ui.showLoading(true, pct), // İlerleme yüzdesi
      () => this._onModelLoaded(),
      (orgId) => this._onOrganelleClicked(orgId)
    );

    // İlk yükleme
    this.init();
  }

  async init() {
    this.ui.renderCellList(CELLS);
    this._setupToolbarEvents(); // Butonları bağla
    await this.switchCell(this.currentCell.id);
  }

  _setupToolbarEvents() {
    // Döndür
    document.getElementById('btn-rotate')?.addEventListener('click', () => {
      const active = this.scene.toggleAutoRotate();
      this.ui.setToolbarActive('btn-rotate', active);
    });

    // İzole Et
    document.getElementById('btn-isolate')?.addEventListener('click', () => {
      if (!this.selectedOrganelleId) return;
      const active = this.scene.toggleIsolate();
      this.ui.setToolbarActive('btn-isolate', active);
    });

    // Gizle
    document.getElementById('btn-hide-others')?.addEventListener('click', () => {
      if (!this.selectedOrganelleId) return;
      const active = this.scene.toggleHideOthers();
      this.ui.setToolbarActive('btn-hide-others', active);
    });

    // Sıfırla
    document.getElementById('btn-reset')?.addEventListener('click', () => {
      this.scene.resetCamera();
      this.ui.setToolbarActive('btn-rotate', false);
      this.ui.setToolbarActive('btn-isolate', false);
      this.ui.setToolbarActive('btn-hide-others', false);
    });

    // Kaydet (Screenshot)
    document.getElementById('btn-screenshot')?.addEventListener('click', () => {
      this.scene.takeScreenshot();
    });
  }

  async switchCell(cellId) {
    const cellData = CELLS.find(c => c.id === cellId);
    if (!cellData) return;

    this.currentCell = cellData;
    this.selectedOrganelleId = null;
    
    // UI Güncelle
    this.ui.renderCellList(CELLS);
    this.ui.updateCellHeader(cellData);
    this.ui.renderOrganelleList(cellData.organelles);
    this.ui.showOrganelleDetails(null);

    // Loading Ekranını Aç
    this.ui.showLoading(true, 0);

    // Sahne Yükle
    try {
      await this.scene.loadCell(cellData);
    } catch (err) {
      console.error('Model yükleme hatası:', err);
    } finally {
      // Yükleme bitince ekranı kapat
      this.ui.showLoading(false);
    }
  }

  _onModelLoaded() {
    // Model başarıyla yüklendi
  }

  _onOrganelleClicked(organelleId) {
    const orgData = this.currentCell.organelles.find(o => o.id === organelleId);
    const effectiveId = (orgData && orgData.group) ? `group-${orgData.group}` : organelleId;

    if (this.selectedOrganelleId === effectiveId) {
        this.deselectOrganelle();
    } else {
        this.selectOrganelle(effectiveId);
    }
  }

  selectOrganelle(orgId) {
    this.selectedOrganelleId = orgId;
    this.scene.selectOrganelle(orgId);
    
    if (typeof orgId === 'string' && orgId.startsWith('group-')) {
      const groupName = orgId.replace('group-', '');
      this.ui.showOrganelleDetails(GROUP_DETAILS[groupName]);
    } else {
      const orgData = this.currentCell.organelles.find(o => o.id === orgId);
      this.ui.showOrganelleDetails(orgData);
    }
    
    this.ui.setActiveOrganelle(orgId);
  }

  deselectOrganelle() {
    this.selectedOrganelleId = null;
    this.scene.deselectOrganelle();
    this.ui.showOrganelleDetails(null);
  }
}

// Uygulamayı Başlat
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
