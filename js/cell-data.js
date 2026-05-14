/**
 * cell-data.js — Premium Render Görselleri İle Birebir Eşleşen Renk Paleti
 */

const COLORS = {
  // Çekirdek (Premium Render Seti)
  NUCLEUS_SHELL: 0x6c5ce7,     // Çekirdek Zarı: Parlak Mor/Mavi
  NUCLEOPLASM: 0x48dbfb,       // Çekirdek Plazması: Açık Turkuaz (Şeffaf olacak)
  NUCLEOLUS: 0xd63031,         // Çekirdekçik: Canlı Kırmızı/Pembe
  CHROMATIN: 0xff4d4d,         // Kromatin: Parlak Kırmızı İplikçikler
  
  // Bitki Hücresi (Görsel 1)
  PLANT_WALL: 0x6ab04c,      // Dış Çeper: Canlı Yeşil
  PLANT_MEM: 0xbadc58,       // İç Zar: Fıstık Yeşili
  PLANT_VACUOLE: 0x2980b9,   // Merkezi Koful: Berrak Mavi (Cam etkisi)
  PLANT_CHLORO_OUT: 0x43a047, // Kloroplast Dış Zar: Şeffaf Yeşil
  PLANT_CHLORO_IN: 0x1b5e20,  // Kloroplast İç / Tilakoit: Canlı Koyu Yeşil
  PLANT_CHLORO_DNA: 0xd63031, // Kloroplast DNA/Ribozom: Kırmızı
  
  // Hayvan Hücresi (Görsel 2)
  ANIMAL_MEM: 0xf4d03f,      // Hücre Zarı: Hafif Sarımsı / Lipit Rengi
  ANIMAL_CYTO: 0x48dbfb,     // Sitoplazma: Şeffaf Turkuaz
  ANIMAL_CENTRO: 0xf39c12,   // Sentrozom: Sarımsı Turuncu
  ANIMAL_LYSO: 0xe67e22,     // Lizozom: Turuncu
  ANIMAL_VACUOLE: 0x3498db,  // Kofullar: Şeffaf Mavi
  
  // Ortak (ER, Golgi, Mitokondri)
  ER_GOLGI: 0xd4a5b6,        // ER ve Golgi: Soluk Pembe / Gül Kurusu
  MITO_OUTER: 0x9b59b6,      // Mitokondri Dış Zar: Şeffaf Mor/Mavi
  MITO_INNER: 0x8e44ad,      // Mitokondri İç Zar (Krista): Canlı Mor
  MITO_DNA: 0xd63031,        // Mitokondri DNA/Ribozom: Kırmızı
  
  // Bakteri Hücresi (Görsel 3)
  BACT_CAPSULE: 0x303f9f,    // Kapsül, Kamçı ve Pilus: Koyu İndigo
  BACT_CYTO: 0xc2185b,       // Sitoplazma/İç Zar: Canlı Macenta / Koyu Pembe
  BACT_DNA: 0xffffff,        // DNA (Nükleoid): Bembeyaz
  BACT_PLASMID: 0x9e9e9e,    // Plazmitler: Gri
  BACT_RIBOSOME: 0xd32f2f,   // Ribozom: Kırmızı Noktalar
  
  // Eksik kalan ortak renk (Çökme sebebi)
  RIBOSOME: 0x263238         // Antrasit (Bitki Ribozomu)
};

export const CELLS = [
  {
    id: 'bitkihucre',
    name: 'Bitki Hücresi',
    subtitle: 'Ökaryotik Hücre',
    modelFile: 'optimized_bitki.glb',
    organelles: [
      { id: 'bit-ceperi', name: 'Hücre Çeperi', color: COLORS.PLANT_WALL, description: 'Hücrenin en dışındaki koruyucu, sert tabakadır.', funFact: 'Selüloz yapısı sayesinde bitkiyi dış etkenlere karşı korur.', patterns: ['bitki_hucre_ceperi', 'ceperi', 'wall'] },
      { id: 'bit-zar', name: 'Hücre Zarı', color: COLORS.PLANT_MEM, description: 'Hücrenin seçici geçirgen sınırıdır.', funFact: 'Madde giriş çıkışını kontrol eden canlı bir yapıdır.', patterns: ['bitki_hucre_zari', 'hucre_zari', 'membrane'] },
      { id: 'bit-zarf', name: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Hücrenin yönetim merkezidir.', funFact: 'Üzerindeki porlar sayesinde madde alışverişi sağlar.', patterns: ['cekirdek_zari', 'nucleus_mem'] },
      { id: 'bit-cekirdekcik', name: 'Çekirdekçik', color: COLORS.NUCLEOLUS, description: 'Ribozom sentezinin yapıldığı yerdir.', funFact: 'Çekirdeğin içinde bulunan yoğun bölgedir.', patterns: ['cekirdek1 cekirdekcik', 'bitki_cekirdekcik'] },
      { id: 'bit-kromatin', name: 'Kromatin / DNA', color: COLORS.CHROMATIN, description: 'Genetik bilgiyi taşıyan ipliksi yapılardır.', funFact: 'Hücre bölünmesi sırasında kısalıp kalınlaşarak kromozomları oluşturur.', patterns: ['cekirdek1 kromatin', 'bitki_kromatin'] },
      { id: 'bit-nukleoplazma', name: 'Çekirdek Plazması', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdek içindeki sıvı kısımdır.', funFact: 'Sitoplazmadan daha yoğun bir yapıdadır.', patterns: ['cekirdek_sitop', 'nukleoplazma'] },
      { id: 'bit-kloroplast-dis', name: 'Kloroplast Dış Zar', color: COLORS.PLANT_CHLORO_OUT, opacity: 0.3, description: 'Fotosentez organelinin dış koruyucu zarıdır.', funFact: 'Güneş ışığını içeri alacak kadar incedir.', patterns: ['KloDis_zar', 'chloro_dis'] },
      { id: 'bit-kloroplast-ic', name: 'Kloroplast İç Zar ve Tilakoit', color: COLORS.PLANT_CHLORO_IN, description: 'Işığa bağımlı tepkimelerin gerçekleştiği tilakoit zarlarıdır.', funFact: 'Üst üste dizilerek "Grana" adı verilen yapıları oluştururlar.', patterns: ['tilakoid', 'ic_zar'] },
      { id: 'bit-kloroplast-dna', name: 'Kloroplast DNA / Ribozom', color: COLORS.PLANT_CHLORO_DNA, description: 'Kloroplastın kendi üretimini yönetmesini sağlayan genetik yapıdır.', funFact: 'Kloroplastlar da mitokondriler gibi hücre içinde çoğalabilirler.', patterns: ['Klo_DNA', 'DNA_RNA2', 'all_cell_render_ribozom'] },
      { id: 'bit-koful', name: 'Merkezi Koful', color: COLORS.PLANT_VACUOLE, opacity: 0.3, description: 'Bitki hücresinde su ve atık depolayan büyük yapıdır.', funFact: 'Turgor basıncı oluşturarak bitkinin dik durmasını sağlar.', patterns: ['koful_2', 'koful', 'vacuole'] },
      { id: 'bit-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Hücre içi madde iletim kanallarıdır.', funFact: 'Çekirdekten aldığı maddeleri ilgili yerlere taşır.', patterns: ['bitkier', 'retikulum'] },
      { id: 'bit-mito-dis', name: 'Mitokondri Dış Zar', color: COLORS.MITO_OUTER, opacity: 0.3, description: 'Mitokondriyi çevreleyen koruyucu dış zardır.', funFact: 'Peynir dilimi gibi gözenekli bir yapısı vardır.', patterns: ['mitokondri_1 dis_zar2', 'dis_zar2'] },
      { id: 'bit-mito-ic', name: 'Mitokondri İç Zar (Krista)', color: COLORS.MITO_INNER, opacity: 0.4, description: 'Enerji üretiminin (ATP) yapıldığı kıvrımlı iç zardır.', funFact: 'Kıvrımlı olması yüzey alanını artırarak daha fazla enerji üretilmesini sağlar.', patterns: ['mitokondri_1 ic_zar1', 'ic_zar1'] },
      { id: 'bit-mito-dna', name: 'Mitokondri DNA ve Ribozom', color: COLORS.MITO_DNA, description: 'Mitokondrinin kendine ait genetik materyali ve protein sentez birimleridir.', funFact: 'Mitokondriler hücre içinde bağımsız olarak çoğalabilirler.', patterns: ['DNA_RNA1', 'mito_iplik', 'mito_ribo1'] },
      { id: 'bit-ribozom', name: 'Ribozom', color: COLORS.RIBOSOME, description: 'Protein üretim tesisidir.', funFact: 'Hücredeki en küçük ve zarsız organeldir.', patterns: ['ribozom'] }
    ]
  },
  {
    id: 'hayvanhucre',
    name: 'Hayvan Hücresi',
    subtitle: 'Ökaryotik Hücre',
    modelFile: 'optimized_hayvan.glb',
    organelles: [
      { id: 'hay-zar', name: 'Hücre Zarı', color: COLORS.ANIMAL_MEM, opacity: 0.2, description: 'Hücreyi dış ortamdan ayıran seçici geçirgen zardır.', funFact: 'Çift katlı fosfolipit tabakasından oluşur.', patterns: ['hay__zar', 'cell_membrane'] },
      { id: 'hay-sitoplazma', name: 'Sitoplazma', color: COLORS.ANIMAL_CYTO, opacity: 0.1, description: 'Organellerin içinde bulunduğu jel benzeri sıvıdır.', funFact: 'Hücre hacminin büyük bir kısmını kaplar.', patterns: ['hay_sitop', 'cytoplasm'] },
      { id: 'hay-zarf', name: 'Çekirdek Zarı', color: COLORS.NUCLEUS_SHELL, opacity: 0.8, description: 'Çekirdeği çevreleyen koruyucu zardır.', funFact: 'Çekirdek içindeki genetik materyali korur.', patterns: ['hay_cekirdek_zari', 'cekirdek_zari'] },
      { id: 'hay-cekirdekcik', name: 'Çekirdekçik', color: COLORS.NUCLEOLUS, description: 'RNA sentezi ve ribozom montajı burada yapılır.', funFact: 'Mikroskop altında çekirdeğin en koyu görünen kısmıdır.', patterns: ['hay_cekirdekcik', 'cekirdek1 cekirdekcik'] },
      { id: 'hay-kromatin', name: 'Kromatin', color: COLORS.CHROMATIN, description: 'Hücrenin genetik bilgi deposudur.', funFact: 'Açılmış DNA iplikçikleridir.', patterns: ['hay_kromatin', 'cekirdek1 kromatin'] },
      { id: 'hay-nukleoplazma', name: 'Çekirdek Plazması', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdek içindeki sıvı ortamdır.', funFact: 'Sitoplazmaya benzer ancak protein içeriği farklıdır.', patterns: ['hay_cekirdek_sitop', 'cekirdek_sitop'] },
      { id: 'hay-mito-dis', name: 'Mitokondri Dış Zar', color: COLORS.MITO_OUTER, opacity: 0.25, description: 'Mitokondrinin şeffaf dış kılıfıdır.', funFact: 'Madde geçişini düzenler.', patterns: ['Hay_dis_zar2', 'dis_zar2'] },
      { id: 'hay-mito-ic', name: 'Mitokondri İç Zar', color: COLORS.MITO_INNER, opacity: 0.35, description: 'Krista adı verilen kıvrımlı iç yapıdır.', funFact: 'ATP sentezinin ana merkezidir.', patterns: ['Hay_ic_zar1', 'ic_zar1'] },
      { id: 'hay-mito-dna', name: 'Mitokondri DNA/RNA', color: COLORS.MITO_DNA, description: 'Mitokondriyal genetik materyal.', funFact: 'Anneden kalıtılan genetik bilgiyi taşır.', patterns: ['Hay_DNA_RNA1', 'Hay__iplik', 'Hay__Mribo'] },
      { id: 'hay-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Madde iletimi ve protein işleme kanallarıdır.', funFact: 'Hücre içi bir otoyol ağına benzer.', patterns: ['hay_cekridek_er', 'cekridek_er'] },
      { id: 'hay-sentrozom', name: 'Sentrozom', color: COLORS.ANIMAL_CENTRO, description: 'Hücre bölünmesinde görev alan yapıdır.', funFact: 'Sadece hayvan hücrelerinde bulunan bir bölünme yardımcısıdır.', patterns: ['all_cell_render_sentrozom', 'sentrozom'] },
      { id: 'hay-koful', name: 'Koful', color: COLORS.ANIMAL_VACUOLE, opacity: 0.25, description: 'Küçük depolama keseleridir.', funFact: 'Hayvan hücrelerinde küçük ve çok sayıdadır.', patterns: ['hay_kofullar', 'hay_koful', 'koful', 'vacuole'] },
      { id: 'hay-sitoiskelet', name: 'Hücre İskeleti', color: COLORS.ANIMAL_VACUOLE, description: 'Hücreye şekil veren mikrotübül ağlarıdır.', funFact: 'Hücre içindeki yollar olarak da kullanılırlar.', patterns: ['hay_sitoiskelet', 'sitoiskelet'] }
    ]
  },
  {
    id: 'bakterihucre',
    name: 'Bakteri Hücresi',
    subtitle: 'Prokaryotik Hücre',
    modelFile: 'optimized_bakteri.glb',
    organelles: [
      { id: 'bak-kapsul', name: 'Kapsül / Hücre Duvarı', color: COLORS.BACT_CAPSULE, description: 'Bakteriyi koruyan ve şekil veren dış yapı.', funFact: 'Hastalık yapıcı bakterilerde kalındır.', patterns: ['bakteri_dis'] },
      { id: 'bak-sitoplazma', name: 'Sitoplazma', color: COLORS.ANIMAL_CYTO, opacity: 0.1, description: 'Tüm yaşamsal olayların gerçekleştiği berrak iç sıvı.', funFact: 'Bakterilerin zarlı organeli olmadığı için tepkimeler doğrudan burada gerçekleşir.', patterns: ['bakteri_sitolazma', 'sitolazma', 'sitoplazma'] },
      { id: 'bak-dna', name: 'Halkasal DNA', color: COLORS.BACT_DNA, description: 'Bakterinin bembeyaz genetik yumağı.', funFact: 'Çekirdeksiz olduğu için serbest yüzer.', patterns: ['bakteri_halkasal', 'bak_kromozom', 'halkasal', 'kromozom'] },
      { id: 'bak-ribozom', name: 'Ribozom', color: COLORS.BACT_RIBOSOME, description: 'Kırmızı nokta şeklindeki protein fabrikaları.', funFact: 'Bakterideki tek organeldir.', patterns: ['ibozom_gruplari', 'ibozom', 'ribozom'] }
    ]
  }
];

export const COMPARISON_DATA = {
  prokaryot_okaryot: {
    title: 'Prokaryot ve Ökaryot Hücre Karşılaştırması',
    features: [
      { feature: 'Çekirdek', prokaryot: 'Yok (Nükleoid)', okaryot: 'Var', icon: '🧫' },
      { feature: 'DNA Yapısı', prokaryot: 'Halkasal', okaryot: 'Doğrusal', icon: '🧬' },
      { feature: 'Zarlı Organel', prokaryot: 'Yok', okaryot: 'Var', icon: '🔬' },
      { feature: 'Ribozom', prokaryot: '70S', okaryot: '80S', icon: '⚙️' },
      { feature: 'Hücre Boyutu', prokaryot: '1-10 µm', okaryot: '10-100 µm', icon: '📏' }
    ]
  },
  bitki_hayvan: {
    title: 'Bitki ve Hayvan Hücresi Karşılaştırması',
    features: [
      { feature: 'Hücre Çeperi', bitki: 'Var (Selüloz)', hayvan: 'Yok', icon: '🧱' },
      { feature: 'Plastitler', bitki: 'Var (Kloroplast vb.)', hayvan: 'Yok', icon: '🍃' },
      { feature: 'Koful Yapısı', bitki: 'Büyük ve az sayıda', hayvan: 'Küçük ve çok sayıda', icon: '💧' },
      { feature: 'Sentrozom', bitki: 'Yok (Genellikle)', hayvan: 'Var', icon: '✳️' },
      { feature: 'Şekil', bitki: 'Köşeli', hayvan: 'Yuvarlak/Düzensiz', icon: '📐' }
    ]
  }
};

export function matchOrganelle(meshName, cellData) {
  if (!meshName || !cellData.organelles) return null;
  const nameLower = meshName.toLowerCase();
  
  const filterKey = (cellData.id.includes('hayvan') ? 'hayvan' : 
                    cellData.id.includes('bitki') ? 'bitki' : 
                    cellData.id.includes('bakteri') ? 'bakteri' : '').toLowerCase();

  const otherKeys = ['hayvan', 'bitki', 'bakteri'].filter(k => k !== filterKey);
  const belongsToOther = otherKeys.some(k => nameLower.includes(k));
  
  if (belongsToOther && !nameLower.includes(filterKey)) return null;

  const sorted = [...cellData.organelles].sort((a, b) => {
    const maxA = Math.max(...a.patterns.map(p => p.length));
    const maxB = Math.max(...b.patterns.map(p => p.length));
    return maxB - maxA;
  });

  for (const org of sorted) {
    if (org.patterns.some(p => nameLower.includes(p.toLowerCase()))) {
      return org;
    }
  }
  return null;
}
