/**
 * scene.js — Three.js 3D Sahne Yönetimi
 * Hatalar giderildi, eşleşme mantığı güçlendirildi.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { matchOrganelle } from './cell-data.js';

export class SceneManager {
  constructor(canvas, onProgress, onLoaded, onOrganelleClick) {
    this.canvas = canvas;
    this.onProgress = onProgress;
    this.onLoaded = onLoaded;
    this.onOrganelleClick = onOrganelleClick;

    this.modelCache = {};
    this.currentCellData = null;
    this.currentModel = null;
    this.organelleGroups = {};
    this.originalMaterials = new Map();
    this.isolateActive = false;
    this.hideOthersActive = false;
    this.selectedOrganelleId = null;

    this._initScene();
    this._initLights();
    this._initControls();
    this._initRaycaster();
    this._initEnvironment();
    this._animate();

    window.addEventListener('resize', () => this._onResize());
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf2efe7); // Studio Cream

    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50000);
    this.camera.position.set(0, 0, 800);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height, false);
    
    // PREMIUM RENDER AYARLARI (Blender Eevee/Cycles Kalitesi)
    this.renderer.useLegacyLights = false; 
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0; // Patlamayı engellemek için 1.0'a çekildi
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Gölgeleri Aktifleştir
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  _initLights() {
    // Yereldeki gibi temiz ve mat bir görüntü için sadece doğrudan ışıklar kullanıyoruz.
    
    // 1. Genel Aydınlık (Yumuşak dolgu)
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);
    
    // 2. Gökyüzü Işığı (Derinlik ve renk dengesi için)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    this.scene.add(hemiLight);
    
    // 3. Ana Işık (Sadece hafif gölge ve form belirginliği için)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(5, 10, 7.5);
    keyLight.castShadow = true;
    keyLight.shadow.bias = -0.0001;
    this.scene.add(keyLight);
  }

  _initEnvironment() {
    // Local ve GitHub farkını çözmek için dosya yolunu garantili hale getiriyoruz.
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('./environment.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
    }, undefined, (err) => {
      console.warn("HDR dosyası yüklenemedi, standart ışıklar devrede.", err);
    });
  }

  _initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  }

  _initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.canvas.addEventListener('pointerup', (e) => this._handleClick(e));
  }

  _handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      if (mesh.userData.organelleId && this.onOrganelleClick) {
        this.onOrganelleClick(mesh.userData.organelleId);
      }
    }
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  loadCell(cellData) {
    return new Promise((resolve, reject) => {
      this.currentCellData = cellData;
      this._clearScene();
      
      if (this.modelCache[cellData.id]) {
        this.currentModel = this.modelCache[cellData.id].model;
        this.organelleGroups = this.modelCache[cellData.id].organelleGroups;
        this.scene.add(this.currentModel);
        this._fitCameraToModel();
        if (this.onLoaded) this.onLoaded();
        resolve();
        return;
      }

      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(dracoLoader);

      loader.load(cellData.modelFile, (gltf) => {
        this._processModel(gltf.scene, cellData);
        this.modelCache[cellData.id] = {
          model: gltf.scene,
          organelleGroups: { ...this.organelleGroups }
        };
        if (this.onLoaded) this.onLoaded();
        resolve();
      }, undefined, (error) => {
        console.error("Model yüklenirken hata oluştu:", error);
        reject(error);
      });
    });
  }

  _createPremiumMaterial(org) {
    const isTransparent = org.opacity && org.opacity < 1.0;
    const name = org.id.toLowerCase();
    
    // Temel Fiziksel Materyal Ayarları
    let params = {
      color: org.color,
      transparent: isTransparent,
      opacity: org.opacity || 1.0,
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.1,
      clearcoatRoughness: 0.3,
      side: THREE.DoubleSide,
      envMapIntensity: 0.3 // Çevresel yansıma gücünü ÇOK KISTIK ki renkler solmasın
    };

    // 1. CAM VE JELATİN TİPİ (Kofullar, Sitoplazma ve Şeffaf Zarlar)
    if (name.includes('koful') || name.includes('sitoplazma') || name.includes('sitolazma') || name.includes('ic_zar') || name.includes('dis_zar') || name.includes('klodis')) {
      params.roughness = 0.05;
      params.metalness = 0.0;
      params.transmission = 0.9; 
      params.thickness = 2.0;    
      params.ior = 1.33;         
      params.clearcoat = 1.0;
      params.clearcoatRoughness = 0.05;
      params.transparent = true;
      params.envMapIntensity = 1.0; // Sadece camlar tam yansıma alsın
    }
    // 2. ÇEKİRDEK VE PARLAK YÜZEYLER
    else if (name.includes('cekirdek') || name.includes('nukleo')) {
      params.roughness = 0.2;
      params.metalness = 0.1;
      params.clearcoat = 0.8;
      params.clearcoatRoughness = 0.1;
      params.envMapIntensity = 0.8;

      // Çekirdek Plazması (Nükleoplazma) için ekstra şeffaflık ve cam etkisi
      if (name.includes('sitop') || name.includes('plazma')) {
        params.roughness = 0.05;
        params.transmission = 0.95;
        params.thickness = 1.0;
        params.ior = 1.1;
        params.transparent = true;
      }
      
      // Çekirdekçik için daha doygun ve pürüzsüz görünüm
      if (name.includes('cik')) {
        params.roughness = 0.1;
        params.clearcoat = 1.0;
      }
    }
    // 3. ETLİ/PARLAK ORGANELER (ER, Golgi, Mitokondri)
    else if (name.includes('er') || name.includes('golgi') || name.includes('mito') || name.includes('kloroplast')) {
      params.roughness = 0.3;
      params.metalness = 0.0;
      params.clearcoat = 0.3; 
      params.envMapIntensity = 0.4;
    }
    // 4. KATI VE MAT YAPILAR (DNA, Ribozom, Kromatin, Kapsül)
    else if (name.includes('dna') || name.includes('ribozom') || name.includes('kromatin') || name.includes('kapsul')) {
      params.roughness = 0.9;
      params.metalness = 0.0;
      params.clearcoat = 0.0;
      // Kromatin için hafif ışıma ekleyerek ipliksi yapıyı belirginleştir
      if (name.includes('kromatin')) {
        params.emissive = new THREE.Color(org.color);
        params.emissiveIntensity = 0.2;
      }
    }
    // 5. ZARLAR VE DIŞ ÇEPERLER (Tok renkler)
    else if (name.includes('zar') || name.includes('ceper') || name.includes('duvar')) {
      params.roughness = 0.5;
      params.clearcoat = 0.2;
      params.clearcoatRoughness = 0.4;
      params.envMapIntensity = 0.3;
    }

    return new THREE.MeshPhysicalMaterial(params);
  }

  _getFullName(obj) {
    let name = '';
    let p = obj;
    while (p && p.name) {
      name = p.name + ' ' + name;
      p = p.parent;
    }
    return name.trim();
  }

  _processModel(model, cellData) {
    this.organelleGroups = {};
    this.originalMaterials.clear();
    
    const filterKey = cellData.id.includes('hayvan') ? 'hayvan' : 
                      cellData.id.includes('bitki') ? 'bitki' : 
                      cellData.id.includes('bakteri') ? 'bakteri' : '';

    model.traverse((child) => {
      if (child.isMesh) {
        const meshName = (child.name || '').toLowerCase();
        
        // Gereksiz kutuları gizle
        if (meshName.startsWith('box_')) {
          child.visible = false;
          return;
        }

        // Modeller ayrıldığı için tüm parçalar mevcut hücreye aittir.

        // Tam hiyerarşi adını alarak eşleştir (Örn: "hayvan_hucre Hay_cekridek_er Mesh001")
        const fullName = this._getFullName(child);
        const org = matchOrganelle(fullName, cellData);
        
        if (org) {
          child.userData.organelleId = org.id;
          if (!this.organelleGroups[org.id]) this.organelleGroups[org.id] = [];
          this.organelleGroups[org.id].push(child);

          // Kullanıcının GLB dosyasında hazırladığı orijinal materyali koru
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            // Materyallere hiçbir müdahale etmiyoruz, orijinal ayarları koruyoruz.
            this.originalMaterials.set(child, child.material.clone());
          }
        } else {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            this.originalMaterials.set(child, child.material.clone());
          }
        }
      }
    });

    this.currentModel = model;
    this.scene.add(model);
    this._fitCameraToModel();
  }

  _fitCameraToModel() {
    if (!this.currentModel) return;
    
    const box = new THREE.Box3();
    let found = false;

    // Sadece "Görünür" (Visible) olan meshleri hesaba kat
    this.currentModel.traverse(node => {
      if (node.isMesh && node.visible) {
        node.updateWorldMatrix(true, true);
        const b = new THREE.Box3().setFromObject(node);
        if (!b.isEmpty()) {
            box.union(b);
            found = true;
        }
      }
    });

    if (!found) box.setFromObject(this.currentModel);
    
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Kamerayı mesafeye göre ayarla
    this.camera.position.set(center.x, center.y, center.z + maxDim * 1.5);
    this.controls.target.copy(center);
    this.controls.update();
  }

  _clearScene() {
    if (this.currentModel) this.scene.remove(this.currentModel);
  }

  selectOrganelle(organelleId) {
    this.deselectOrganelle();
    this.selectedOrganelleId = organelleId;
    const meshes = this.organelleGroups[organelleId];
    if (meshes) {
      meshes.forEach(m => {
        if (m.material.emissive) {
          // Vurgulama için hafif bir parlama ekle
          m.material.emissive.setHex(0x333333);
          m.material.emissiveIntensity = 0.5;
        }
      });
    }
  }

  deselectOrganelle() {
    Object.values(this.organelleGroups).flat().forEach(m => {
      const origMat = this.originalMaterials.get(m);
      if (m.material.emissive && origMat && origMat.emissive) {
        m.material.emissive.copy(origMat.emissive);
        m.material.emissiveIntensity = origMat.emissiveIntensity !== undefined ? origMat.emissiveIntensity : 0;
      } else if (m.material.emissive) {
        m.material.emissive.setHex(0x000000);
        m.material.emissiveIntensity = 0;
      }
    });
  }

  toggleIsolate() {
    if (!this.selectedOrganelleId) return false;
    this.isolateActive = !this.isolateActive;
    Object.keys(this.organelleGroups).forEach(id => {
      const show = !this.isolateActive || id === this.selectedOrganelleId;
      this.organelleGroups[id].forEach(m => m.visible = show);
    });
    return this.isolateActive;
  }

  toggleHideOthers() {
    if (!this.selectedOrganelleId) return false;
    this.hideOthersActive = !this.hideOthersActive;
    Object.keys(this.organelleGroups).forEach(id => {
      const isSelected = id === this.selectedOrganelleId;
      this.organelleGroups[id].forEach(m => {
        const origMat = this.originalMaterials.get(m);
        if (this.hideOthersActive && !isSelected) {
            m.material.transparent = true;
            m.material.opacity = 0.1;
        } else {
            m.material.transparent = origMat ? origMat.transparent : false;
            m.material.opacity = origMat ? origMat.opacity : 1.0;
        }
      });
    });
    return this.hideOthersActive;
  }

  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  resetCamera() {
    this.controls.autoRotate = false;
    this._fitCameraToModel();
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement('a');
    link.download = 'hucre.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }

  _onResize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }
}
