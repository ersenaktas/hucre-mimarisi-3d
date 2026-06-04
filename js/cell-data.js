/**
 * cell-data.js — v5
 * Premium Render Görselleri İle Birebir Eşleşen Renk Paleti
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
  RIBOSOME: 0x263238,        // Antrasit (Bitki Ribozomu)
  
  // Mantar, Sperm ve Alyuvar Özel Renkler
  FUNGI_WALL: 0x8d6e63,      // Kitin Duvarı: Kahverengi ton
  SPERM_TAIL: 0xbdc3c7,      // Kamçı: Açık gri
  RED_BLOOD: 0xc0392b        // Alyuvar: Koyu Kırmızı
};

export const CELLS = [
  {
    id: 'bitkihucre',
    name: 'Bitki Hücresi',
    subtitle: 'Ökaryotik Hücre',
    modelFile: 'optimized_bitki_v1.glb',
    organelles: [
      { id: 'bit-ceperi', name: 'Hücre Çeperi', color: COLORS.PLANT_WALL, description: 'Hücrenin en dışındaki koruyucu, sert tabakadır.', funFact: 'Selüloz yapısı sayesinde bitkiyi dış etkenlere karşı korur.', patterns: ['bitki_hucre_ceperi', 'ceperi', 'wall'] },
      { id: 'bit-zar', name: 'Hücre Zarı', color: COLORS.PLANT_MEM, description: 'Hücrenin seçici geçirgen sınırıdır.', funFact: 'Madde giriş çıkışını kontrol eden canlı bir yapıdır.', patterns: ['bitki_hucre_zari', 'hucre_zari', 'membrane'] },
      { id: 'bit-zarf', name: 'Çekirdek Zarı', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Hücrenin yönetim merkezidir.', funFact: 'Üzerindeki porlar sayesinde madde alışverişi sağlar.', patterns: ['cekirdek_zari', 'nucleus_mem'] },
      { id: 'bit-cekirdekcik', name: 'Çekirdekçik', group: 'Çekirdek', color: COLORS.NUCLEOLUS, description: 'Ribozom sentezinin yapıldığı yerdir.', funFact: 'Çekirdeğin içinde bulunan yoğun bölgedir.', patterns: ['cekirdek1 cekirdekcik', 'bitki_cekirdekcik'] },
      { id: 'bit-kromatin', name: 'Kromatin / DNA', group: 'Çekirdek', color: COLORS.CHROMATIN, description: 'Genetik bilgiyi taşıyan ipliksi yapılardır.', funFact: 'Hücre bölünmesi sırasında kısalıp kalınlaşarak kromozomları oluşturur.', patterns: ['cekirdek1 kromatin', 'bitki_kromatin'] },
      { id: 'bit-nukleoplazma', name: 'Çekirdek Plazması', group: 'Çekirdek', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdek içindeki sıvı kısımdır.', funFact: 'Sitoplazmadan daha yoğun bir yapıdadır.', patterns: ['cekirdek_sitop', 'nukleoplazma'] },
      { id: 'bit-kloroplast-dis', name: 'Kloroplast Dış Zar', group: 'Kloroplast', color: COLORS.PLANT_CHLORO_OUT, opacity: 0.3, description: 'Fotosentez organelinin dış koruyucu zarıdır.', funFact: 'Güneş ışığını içeri alacak kadar incedir.', patterns: ['klodis_zar', 'chloro_dis', 'kloroplast'] },
      { id: 'bit-kloroplast-ic', name: 'Kloroplast İç Zar ve Tilakoit', group: 'Kloroplast', color: COLORS.PLANT_CHLORO_IN, description: 'Işığa bağımlı tepkimelerin gerçekleştiği tilakoit zarlarıdır.', funFact: 'Üst üste dizilerek "Grana" adı verilen yapıları oluştururlar.', patterns: ['tilakoid', 'ic_zar'] },
      { id: 'bit-kloroplast-dna', name: 'Kloroplast DNA / Ribozom', group: 'Kloroplast', color: COLORS.PLANT_CHLORO_DNA, description: 'Kloroplastın kendi üretimini yönetmesini sağlayan genetik yapıdır.', funFact: 'Kloroplastlar da mitokondriler gibi hücre içinde çoğalabilirler.', patterns: ['klo_dna', 'dna_rna2', 'ribozom'] },
      { id: 'bit-koful', name: 'Merkezi Koful', color: COLORS.PLANT_VACUOLE, opacity: 0.3, description: 'Bitki hücresinde su ve atık depolayan büyük yapıdır.', funFact: 'Turgor basıncı oluşturarak bitkinin dik durmasını sağlar.', patterns: ['koful_2', 'koful', 'vacuole'] },
      { id: 'bit-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Hücre içi madde iletim kanallarıdır.', funFact: 'Çekirdekten aldığı maddeleri ilgili yerlere taşır.', patterns: ['bitkier', 'retikulum'] },
      { id: 'bit-mito-dis', name: 'Mitokondri Dış Zar', group: 'Mitokondri', color: COLORS.MITO_OUTER, opacity: 0.3, description: 'Mitokondriyi çevreleyen koruyucu dış zardır.', funFact: 'Peynir dilimi gibi gözenekli bir yapısı vardır.', patterns: ['dis_zar2', 'mitokondri'] },
      { id: 'bit-mito-ic', name: 'Mitokondri İç Zar (Krista)', group: 'Mitokondri', color: COLORS.MITO_INNER, opacity: 0.4, description: 'Enerji üretiminin (ATP) yapıldığı kıvrımlı iç zardır.', funFact: 'Kıvrımlı olması yüzey alanını artırarak daha fazla enerji üretilmesini sağlar.', patterns: ['ic_zar1'] },
      { id: 'bit-mito-dna', name: 'Mitokondri DNA ve Ribozom', group: 'Mitokondri', color: COLORS.MITO_DNA, description: 'Mitokondrinin kendine ait genetik materyali ve protein sentez birimleridir.', funFact: 'Mitokondriler hücre içinde bağımsız olarak çoğalabilirler.', patterns: ['dna_rna1', 'mito_iplik', 'mito_ribo1'] },
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
      { id: 'hay-zarf', name: 'Çekirdek Zarı', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, opacity: 0.8, description: 'Çekirdeği çevreleyen koruyucu zardır.', funFact: 'Çekirdek içindeki genetik materyali korur.', patterns: ['hay_cekirdek_zari', 'cekirdek_zari'] },
      { id: 'hay-cekirdekcik', name: 'Çekirdekçik', group: 'Çekirdek', color: COLORS.NUCLEOLUS, description: 'RNA sentezi ve ribozom montajı burada yapılır.', funFact: 'Mikroskop altında çekirdeğin en koyu görünen kısmıdır.', patterns: ['hay_cekirdekcik', 'cekirdek1 cekirdekcik'] },
      { id: 'hay-kromatin', name: 'Kromatin', group: 'Çekirdek', color: COLORS.CHROMATIN, description: 'Hücrenin genetik bilgi deposudur.', funFact: 'Açılmış DNA iplikçikleridir.', patterns: ['hay_kromatin', 'cekirdek1 kromatin'] },
      { id: 'hay-nukleoplazma', name: 'Çekirdek Plazması', group: 'Çekirdek', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdek içindeki sıvı ortamdır.', funFact: 'Sitoplazmaya benzer ancak protein içeriği farklıdır.', patterns: ['hay_cekirdek_sitop', 'cekirdek_sitop'] },
      { id: 'hay-mito-dis', name: 'Mitokondri Dış Zar', group: 'Mitokondri', color: COLORS.MITO_OUTER, opacity: 0.25, description: 'Mitokondrinin şeffaf dış kılıfıdır.', funFact: 'Madde geçişini düzenler.', patterns: ['Hay_dis_zar2', 'dis_zar2'] },
      { id: 'hay-mito-ic', name: 'Mitokondri İç Zar', group: 'Mitokondri', color: COLORS.MITO_INNER, opacity: 0.35, description: 'Krista adı verilen kıvrımlı iç yapıdır.', funFact: 'ATP sentezinin ana merkezidir.', patterns: ['Hay_ic_zar1', 'ic_zar1'] },
      { id: 'hay-mito-dna', name: 'Mitokondri DNA/RNA', group: 'Mitokondri', color: COLORS.MITO_DNA, description: 'Mitokondriyal genetik materyal.', funFact: 'Anneden kalıtılan genetik bilgiyi taşır.', patterns: ['Hay_DNA_RNA1', 'Hay__iplik', 'Hay__Mribo'] },
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
  },
  {
    id: 'mantarhucre',
    name: 'Mantar Hücresi',
    subtitle: 'Ökaryotik Hücre',
    modelFile: 'optimized_fungi.glb',
    organelles: [
      { id: 'man-duvar', name: 'Hücre Duvarı (Kitin)', color: COLORS.FUNGI_WALL, description: 'Mantarları bitkilerden ayıran kitin yapılı dış duvardır.', funFact: 'Böceklerin dış iskeleti de aynı madde olan kitinden oluşur.', patterns: ['fungi_1', 'duvar', 'wall'] },
      { id: 'man-zar', name: 'Hücre Zarı', color: COLORS.ANIMAL_MEM, description: 'Madde geçişini kontrol eder.', funFact: 'Bitki zarlarına benzer yapıdadır.', patterns: ['fungi_2', 'zar', 'membrane'] },
      { id: 'man-cekirdek', name: 'Çekirdek', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Hücrenin genetik yönetim merkezidir.', funFact: 'Mantar hücreleri çoğunlukla birden fazla çekirdeğe sahip olabilir.', patterns: ['fungi_3', 'cekirdek', 'nucleus'] },
      { id: 'man-mito', name: 'Mitokondri', group: 'Mitokondri', color: COLORS.MITO_OUTER, description: 'Oksijenli solunumla enerji üretir.', funFact: 'Mantarların enerjisi de buradan sağlanır.', patterns: ['fungi_4', 'mitokondri'] },
      { id: 'man-koful', name: 'Koful', color: COLORS.PLANT_VACUOLE, opacity: 0.3, description: 'Madde depolama keseleridir.', funFact: 'Zamanla büyüyüp birleşebilirler.', patterns: ['fungi_5', 'koful', 'vacuole'] },
      { id: 'man-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Madde taşıma ve paketleme ağıdır.', funFact: 'Hücre içi iletişimi sağlar.', patterns: ['fungi_6', 'retikulum', 'er'] },
      { id: 'man-ribozom', name: 'Ribozom', color: COLORS.RIBOSOME, description: 'Proteinlerin sentez noktası.', funFact: 'En küçük hücre yapı birimidir.', patterns: ['fungi'] }
    ]
  },
  {
    id: 'spermhucre',
    name: 'Sperm Hücresi',
    subtitle: 'Özelleşmiş Üreme Hücresi',
    modelFile: 'optimized_sperm.glb',
    organelles: [
      { id: 'sp-akrozom', name: 'Akrozom', color: COLORS.ANIMAL_CENTRO, description: 'Spermin baş kısmında bulunan sindirim enzimleridir.', funFact: 'Yumurta zarını delmek için özel enzimler taşır.', patterns: ['sperm_1', 'akrozom', 'acrosome'] },
      { id: 'sp-cekirdek', name: 'Çekirdek', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Babanın genetik mirasını taşır.', funFact: 'Normal hücrenin yarısı kadar (23 adet) kromozom içerir.', patterns: ['sperm_2', 'cekirdek', 'nucleus'] },
      { id: 'sp-boyun', name: 'Mitokondri Kılıfı (Boyun)', group: 'Mitokondri', color: COLORS.MITO_INNER, description: 'Kamçının hareketi için gereken enerjiyi üretir.', funFact: 'Spiral şeklinde dizilmiş çok sayıda mitokondriden oluşur.', patterns: ['sperm_3', 'boyun', 'mito', 'midpiece'] },
      { id: 'sp-kamci', name: 'Kamçı (Kuyruk)', color: COLORS.SPERM_TAIL, description: 'Spermin hedefine doğru yüzmesini sağlar.', funFact: 'Çok hızlı hareket edebilen mikrotübül yapılardır.', patterns: ['sperm_4', 'kamci', 'kuyruk', 'flagellum'] },
      { id: 'sp-zar', name: 'Hücre Zarı', color: COLORS.ANIMAL_MEM, opacity: 0.2, description: 'Tüm sperm hücresini kaplar.', funFact: 'Oldukça esnektir.', patterns: ['sperm'] }
    ]
  },
  {
    id: 'alyuvarhucre',
    name: 'Alyuvar (Eritrosit)',
    subtitle: 'Oksijen Taşıyıcı Hücre',
    modelFile: 'optimized_alyuvar.glb',
    organelles: [
      { id: 'al-hucre', name: 'Alyuvar (Eritrosit)', color: COLORS.RED_BLOOD, description: 'Kana kırmızı rengini veren ve vücutta oksijen taşıyan hücredir.', funFact: 'Olgunlaştıklarında çekirdeklerini ve diğer organellerini kaybederek daha fazla oksijen taşıma kapasitesine sahip olurlar.', patterns: ['alyuvar001', 'alyuvar'] }
    ]
  },
  {
    id: 'amiphucre',
    name: 'Amip',
    subtitle: 'Tek Hücreli Canlı',
    modelFile: 'optimized_amip.glb',
    organelles: [
      { id: 'am-zar', name: 'Hücre Zarı (Yalancı Ayaklar)', color: COLORS.ANIMAL_CYTO, opacity: 0.3, description: 'Amibin şekil değiştirmesini ve hareket etmesini sağlayan esnek zardır.', funFact: 'Yalancı ayaklar (pseudopod) sayesinde hem hareket eder hem de besin yakalar.', patterns: ['amip1', 'amip'] },
      { id: 'am-cekirdek-zari', name: 'Çekirdek Zarı', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Hücrenin genetik bilgisini korur.', funFact: 'Amip bölünerek çoğalırken önce çekirdeği ikiye ayrılır.', patterns: ['Amip_cekirdek_zari', 'Amip_cekirdek'] },
      { id: 'am-cekirdekcik', name: 'Çekirdekçik', group: 'Çekirdek', color: COLORS.NUCLEOLUS, description: 'Ribozom sentezi burada gerçekleşir.', funFact: 'Çekirdeğin içinde yoğun bir yapıdır.', patterns: ['Amip_cekirdekcik'] },
      { id: 'am-kromatin', name: 'Kromatin', group: 'Çekirdek', color: COLORS.CHROMATIN, description: 'DNA iplikçiklerinden oluşur.', funFact: 'Genetik bilgiyi taşır.', patterns: ['amip_Kromatin'] },
      { id: 'am-nukleoplazma', name: 'Çekirdek Plazması', group: 'Çekirdek', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdeğin iç sıvısı.', funFact: 'Çekirdek içi reaksiyonların gerçekleştiği alandır.', patterns: ['Amip_Nukleoplazma', 'Amip_nukleus'] },
      { id: 'am-kontra-koful', name: 'Kontraktil Koful', color: COLORS.ANIMAL_VACUOLE, opacity: 0.5, description: 'Hücre içindeki fazla suyu dışarı atar.', funFact: 'Tatlı suda yaşayan tek hücreliler için hayati öneme sahiptir, patlamayı önler.', patterns: ['kontraklit_koful'] },
      { id: 'am-besin-kofulu', name: 'Besin Kofulu', color: COLORS.ANIMAL_LYSO, opacity: 0.6, description: 'Yalancı ayaklarla alınan besinlerin sindirildiği yerdir.', funFact: 'Lizozomlarla birleşerek sindirimi gerçekleştirir.', patterns: ['Besin_kofulu', 'Besin_parcasi'] },
      { id: 'am-mito-dis', name: 'Mitokondri Dış Zar', group: 'Mitokondri', color: COLORS.MITO_OUTER, opacity: 0.3, description: 'Mitokondriyi koruyan zardır.', funFact: 'Enerji santralinin dış duvarıdır.', patterns: ['Mitokondri_dis_zar', 'amip_mitokondri'] },
      { id: 'am-mito-ic', name: 'Mitokondri İç Zar', group: 'Mitokondri', color: COLORS.MITO_INNER, opacity: 0.5, description: 'Kıvrımlı iç zar (krista).', funFact: 'ATP (enerji) burada üretilir.', patterns: ['Mitokondri_ic_zar'] },
      { id: 'am-mito-dna', name: 'Mitokondri DNA', group: 'Mitokondri', color: COLORS.MITO_DNA, description: 'Mitokondrinin kendi genetik şifresi.', funFact: 'Hücre çekirdeğinden bağımsız olarak çoğalmasını sağlar.', patterns: ['Mitokondri_DNA', 'Mitokondri_Protein'] },
      { id: 'am-golgi', name: 'Golgi Aygıtı', color: COLORS.ER_GOLGI, description: 'Salgı maddelerinin paketlendiği organeldir.', funFact: 'Sindirilen besinlerin atıklarını paketler.', patterns: ['Amip_golgi', 'Golgi'] },
      { id: 'am-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Madde taşıma kanallarıdır.', funFact: 'Sitoplazma içinde madde iletimini sağlar.', patterns: ['Amip_ER', 'Amip_GER', 'Amip_RER'] },
      { id: 'am-ribozom', name: 'Ribozom', color: COLORS.RIBOSOME, description: 'Protein sentezleyen küçük yapılardır.', funFact: 'Hücredeki en küçük organeldir.', patterns: ['Amip_ribozom', 'Amip_Ribosomes', 'Ribozom_'] }
    ]
  },
  {
    id: 'oglenahucre',
    name: 'Öglena',
    subtitle: 'Kamçılı Tek Hücreli',
    modelFile: 'optimized_oglena.glb',
    organelles: [
      { id: 'og-pellikula', name: 'Pellikula (Hücre Zarı)', color: COLORS.ANIMAL_MEM, description: 'Öglenaya esneklik ve şekil veren protein yapılı kılıftır.', funFact: 'Hücre duvarı olmadığı için esnek hareket etmesini sağlar.', patterns: ['pellikula'] },
      { id: 'og-sitoplazma', name: 'Sitoplazma', color: COLORS.ANIMAL_CYTO, opacity: 0.1, description: 'Organellerin bulunduğu yarı akışkan sıvıdır.', funFact: 'Yaşamsal olayların büyük bir kısmı burada gerçekleşir.', patterns: ['sitoplazma'] },
      { id: 'og-kamci', name: 'Kamçı', color: COLORS.SPERM_TAIL, description: 'Öglenanın suda aktif olarak hareket etmesini sağlayan uzantıdır.', funFact: 'Işığa doğru yüzmesini sağlar.', patterns: ['kamci'] },
      { id: 'og-stigma', name: 'Göz Lekesi (Stigma)', color: COLORS.RED_BLOOD, description: 'Işığa duyarlı kırmızı renkli pigment içerir.', funFact: 'Fotosentez yapabilmek için ışığın yönünü bulmasına yardımcı olur.', patterns: ['stigma'] },
      { id: 'og-kloroplast', name: 'Kloroplast', group: 'Kloroplast', color: COLORS.PLANT_CHLORO_OUT, description: 'Fotosentez yaparak besin üretmesini sağlar.', funFact: 'Öglena hem ototrof (kendi besinini üreten) hem de heterotrof (dışarıdan beslenen) bir canlıdır.', patterns: ['kloroplast'] },
      { id: 'og-cekirdek-zari', name: 'Çekirdek Zarı', group: 'Çekirdek', color: COLORS.NUCLEUS_SHELL, description: 'Hücrenin yönetim merkezini korur.', funFact: 'Öglena ökaryot olduğu için gerçek bir çekirdeğe sahiptir.', patterns: ['cekirdek_zarı', 'cekirdek'] },
      { id: 'og-cekirdekcik', name: 'Çekirdekçik', group: 'Çekirdek', color: COLORS.NUCLEOLUS, description: 'Ribozomların sentezlendiği yerdir.', funFact: 'Çekirdek içindeki yoğun yapıdır.', patterns: ['cekirdekcik'] },
      { id: 'og-kromatin', name: 'Kromatin', group: 'Çekirdek', color: COLORS.CHROMATIN, description: 'Genetik şifreyi taşıyan iplikçiklerdir.', funFact: 'DNA ve proteinlerden oluşur.', patterns: ['kromatin'] },
      { id: 'og-nukleoplazma', name: 'Çekirdek Plazması', group: 'Çekirdek', color: COLORS.NUCLEOPLASM, opacity: 0.4, description: 'Çekirdeğin iç sıvısıdır.', funFact: 'Çekirdek içi faaliyetlerin gerçekleştiği alandır.', patterns: ['nukleoplazma'] },
      { id: 'og-kontra-koful', name: 'Kontraktil Koful', color: COLORS.ANIMAL_VACUOLE, opacity: 0.5, description: 'Hücreye giren fazla suyu dışarı pompalar.', funFact: 'Tatlı suda yaşadığı için patlamasını önleyen en önemli organeldir.', patterns: ['kontraktil_koful'] },
      { id: 'og-rezervuar', name: 'Rezervuar', color: COLORS.ANIMAL_VACUOLE, opacity: 0.3, description: 'Kamçının çıktığı kese şeklindeki yapıdır.', funFact: 'Besin alımında ve kontraktil kofulun boşaltımında rol alır.', patterns: ['rezervuar'] },
      { id: 'og-mito', name: 'Mitokondri', group: 'Mitokondri', color: COLORS.MITO_OUTER, opacity: 0.3, description: 'Hücrenin enerji (ATP) santralidir.', funFact: 'Kamçının hareketi için gereken enerjiyi üretir.', patterns: ['mitokondri'] },
      { id: 'og-golgi', name: 'Golgi Aygıtı', color: COLORS.ER_GOLGI, description: 'Salgı maddelerinin paketlendiği yerdir.', funFact: 'Hücre zarının yenilenmesinde rol alır.', patterns: ['golgi'] },
      { id: 'og-er', name: 'Endoplazmik Retikulum', color: COLORS.ER_GOLGI, description: 'Hücre içi madde taşıma kanallarıdır.', funFact: 'Çekirdek ve zar arası madde iletimini sağlar.', patterns: ['retikulum', 'amip_ger', 'amip_rer'] },
      { id: 'og-ribozom', name: 'Ribozom', color: COLORS.RIBOSOME, description: 'Protein sentezleyen yapılardır.', funFact: 'Hem sitoplazmada serbest hem de ER üzerinde bulunur.', patterns: ['ribozom', 'ribosomes'] }
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
  }
};

export const GROUP_DETAILS = {
  'Çekirdek': {
    id: 'group-cekirdek',
    name: 'Çekirdek (Nucleus)',
    description: 'Hücrenin genetik bilgisini (DNA) taşıyan ve tüm yaşamsal faaliyetleri bir komuta merkezi gibi yöneten yapıdır.',
    funFact: 'Hücrenin beyni olarak kabul edilir ve protein sentezi için gerekli emirleri buradan gönderir.',
    color: 0x6c5ce7
  },
  'Mitokondri': {
    id: 'group-mitokondri',
    name: 'Mitokondri',
    description: 'Hücrenin enerji santralidir. Oksijen kullanarak besinlerden ATP (enerji) üretir.',
    funFact: 'Kendi DNA\'larına sahip oldukları için hücre içinde bağımsız olarak bölünüp çoğalabilirler!',
    color: 0x9b59b6
  },
  'Kloroplast': {
    id: 'group-kloroplast',
    name: 'Kloroplast',
    description: 'Sadece bitki hücrelerinde bulunur. Güneş enerjisini kullanarak fotosentez yoluyla besin ve oksijen üretir.',
    funFact: 'Bitkilere yeşil rengini veren klorofil pigmentini içinde barındırır.',
    color: 0x43a047
  }
};

export function matchOrganelle(meshName, cellData) {
  if (!meshName || !cellData.organelles) return null;
  const nameLower = meshName.toLowerCase();
  
  const filterKey = (cellData.id.includes('hayvan') ? 'hayvan' : 
                    cellData.id.includes('bitki') ? 'bitki' : 
                    cellData.id.includes('bakteri') ? 'bakteri' : 
                    cellData.id.includes('mantar') ? 'mantar' :
                    cellData.id.includes('sperm') ? 'sperm' :
                    cellData.id.includes('alyuvar') ? 'alyuvar' :
                    cellData.id.includes('amip') ? 'amip' : 
                    cellData.id.includes('oglena') ? 'oglena' : '').toLowerCase();

  const otherKeys = ['hayvan', 'bitki', 'bakteri', 'mantar', 'sperm', 'alyuvar', 'amip', 'oglena'].filter(k => k !== filterKey);
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
