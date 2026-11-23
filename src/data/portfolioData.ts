export type PublicationCategory =
  | 'Semua'
  | 'Deep Learning & Computer Vision'
  | 'Machine Learning & NLP'
  | 'Sistem Pendukung Keputusan'
  | 'Generative AI & Pendidikan'
  | 'Sistem Informasi & Web';

export interface PublicationItem {
  id: string;
  citationKey: string;
  title: string;
  authors: string[];
  isFirstAuthor: boolean;
  year: number;
  venue: string;
  venueShort: string;
  category: Exclude<PublicationCategory, 'Semua'>;
  summary: string;
  methodology: string;
  impact: string;
  methods: string[];
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  bentoSpan?: 'wide' | 'standard';
  projectTagline?: string;
}

export interface ResearchPillar {
  index: string;
  title: string;
  description: string;
  keywords: string;
  relatedCategory: Exclude<PublicationCategory, 'Semua'>;
}

export interface AcademicProfileLink {
  id: string;
  label: string;
  handle: string;
  description: string;
  url: string;
}

export interface WebAppCapability {
  index: string;
  title: string;
  description: string;
}

export interface WebAppStudioPortfolio {
  brand: string;
  role: string;
  url: string;
  newsUrl: string;
  email: string;
  trustStatement: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  capabilities: WebAppCapability[];
  notableSectors: string;
}

export const PROFILE = {
  name: 'Muhtyas Yugi',
  shortRole: 'Peneliti AI & Pengembang Web-App',
  institution: 'Universitas Komputama',
  legacyAffiliation: 'STMIK Komputama Majenang',
  studyProgram: 'Teknologi Informasi (S1)',
  location: 'Majenang, Cilacap, Jawa Tengah',
  email: 'muhtyas.yugioh@gmail.com',
  sintaId: '6990431',
  sintaScore: 6,
  scholarHIndex: 1,
  heroKicker: 'Teknologi Informasi · Universitas Komputama · BroCodeid',
  heroHeadline: 'Riset Kecerdasan Buatan dan Rekayasa Sistem Informasi.',
  heroLead:
    'Akademisi, peneliti ilmu komputer, dan pengembang web-app di BroCodeid yang berfokus pada model hibrida deep learning, pembelajaran mesin terapan, rekayasa prompt berbasis computational thinking, serta pengembangan aplikasi web produksi.',
  heroImage: '/src/assets/images/profile_muhtyas_hd.jpg',
  heroImageAlt:
    'Potret profil Muhtyas Yugi mengenakan jas hitam dan dasi oranye dengan latar belakang studio modern minimalis',
  bioParagraphs: [
    'Muhtyas Yugi merupakan peneliti dan akademisi pada Program Studi Teknologi Informasi (S1) di Universitas Komputama (terkait erat dengan sejarah pengembangan STMIK Komputama Majenang, Cilacap) sekaligus pengembang web-app profesional di BroCodeid (brocodeid.com).',
    'Fokus kajiannya menjembatani riset fundamental kecerdasan buatan — mulai dari pengenalan pola tulisan tangan menggunakan CycleGAN dan CNN-BiLSTM hingga analisis sentimen serta pemodelan prediktif kebijakan pendidikan — dengan rekayasa perangkat lunak produksi seperti website perusahaan, toko online, admin panel, sistem pendukung keputusan berbasis Naive Bayes, aplikasi kasir EMYE POS, dan sistem reservasi wisata berbasis web.',
    'Dalam berbagai publikasi ilmiah nasional dan internasional terindeks SINTA dan Google Scholar, ia aktif berkolaborasi lintas institusi bersama peneliti dari Universitas Komputama dan Universitas Amikom Purwokerto.',
  ],
  collaborators: [
    { name: 'Ahmad Latif', focus: 'Machine Learning, Sistem Pendukung Keputusan & Pendidikan' },
    { name: 'Fandy Setyo Utomo', focus: 'Deep Learning, Computer Vision & Analisis Sentimen' },
    { name: 'A. S. Barkah', focus: 'Pengenalan Pola & Augmentasi Citra Hibrida' },
    { name: 'T. Hariguna', focus: 'Analisis Data & Evaluasi Algoritma Pembelajaran Mesin' },
    { name: 'B. Riswanto & I. K. Najibulloh', focus: 'Computational Thinking & Teknologi Pendidikan' },
    { name: 'N. Alfiah', focus: 'Sistem Pendukung Keputusan Akademik' },
  ],
} as const;

export const HERO_METRICS = [
  { value: '8', label: 'Publikasi Ilmiah', detail: 'Rentang 2022–2026' },
  { value: '6990431', label: 'SINTA Author ID', detail: 'Kemdiktisaintek RI' },
  { value: '6', label: 'Skor SINTA', detail: 'Google Scholar H-Index 1' },
  { value: '5', label: 'Domain Riset', detail: 'CV, ML, SPK, GenAI & Web' },
] as const;

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    index: '01.',
    title: 'Deep Learning & Computer Vision',
    description:
      'Merancang arsitektur hibrida CNN–BiLSTM yang diperkuat augmentasi data berbasis CycleGAN untuk meningkatkan presisi pengenalan digit tulisan tangan pada dataset kompleks.',
    keywords: 'CycleGAN · CNN-BiLSTM · MNIST · Augmentasi Citra',
    relatedCategory: 'Deep Learning & Computer Vision',
  },
  {
    index: '02.',
    title: 'Machine Learning & Analisis Sentimen',
    description:
      'Komparasi algoritma klasifikasi (SVM, Random Forest, Neural Network) pada ulasan aplikasi digital serta pemodelan prediktif capaian pendidikan berbasis data regional.',
    keywords: 'SVM · Random Forest · Neural Network · Predictive Modeling',
    relatedCategory: 'Machine Learning & NLP',
  },
  {
    index: '03.',
    title: 'SPK & Generative AI Pendidikan',
    description:
      'Pengembangan sistem pendukung keputusan pemilihan program studi dengan Naive Bayes dan likelihood pakar, serta studi kuasi-eksperimental CT-based prompt engineering untuk media multimodal.',
    keywords: 'Naive Bayes · Likelihood Pakar · Prompt Engineering',
    relatedCategory: 'Generative AI & Pendidikan',
  },
  {
    index: '04.',
    title: 'Rekayasa Sistem Informasi & Web',
    description:
      'Implementasi aplikasi operasional berbasis web untuk digitalisasi UMKM dan destinasi wisata lokal, termasuk sistem Point of Sales (EMYE POS) dan reservasi tiket daring.',
    keywords: 'Sistem Informasi · EMYE POS · Reservasi Wisata Web',
    relatedCategory: 'Sistem Informasi & Web',
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-cyclegan-jitk-2025',
    citationKey: 'yugi2025cyclegan',
    title:
      'Improving Handwritten Digit Recognition Using CycleGAN-Augmented Data with CNN–BiLSTM Hybrid Model',
    authors: ['M. Yugi', 'F. S. Utomo', 'A. S. Barkah'],
    isFirstAuthor: true,
    year: 2025,
    venue: 'JITK (Jurnal Ilmu Pengetahuan dan Teknologi Komputer)',
    venueShort: 'JITK',
    category: 'Deep Learning & Computer Vision',
    summary:
      'Penelitian ini menggabungkan augmentasi data sintetis berbasis CycleGAN dengan model hibrida Convolutional Neural Network (CNN) dan Bidirectional Long Short-Term Memory (BiLSTM) untuk meningkatkan ketahanan dan akurasi klasifikasi digit tulisan tangan.',
    methodology:
      'Generasi sampel variasi gaya tulisan menggunakan CycleGAN tanpa pasangan data berlabel ketat, dilanjutkan ekstraksi fitur spasial oleh lapisan konvolusi dan pemodelan sekuensial dua arah oleh BiLSTM.',
    impact:
      'Memperlihatkan peningkatan generalisasi model pengenalan pola tulisan tangan pada variasi goresan yang sebelumnya sulit dikenali oleh arsitektur klasifikasi tunggal.',
    methods: ['CycleGAN', 'CNN-BiLSTM', 'Data Augmentation', 'Computer Vision'],
    featured: true,
    bentoSpan: 'wide',
    projectTagline: 'Arsitektur Hibrida Visi Komputer',
    image: '/src/assets/images/project_cyclegan_vision_1795377756094.jpg',
    imageAlt:
      'Ilustrasi teknis arsitektur CycleGAN dan lapisan konvolusi CNN untuk pengenalan digit tulisan tangan',
  },
  {
    id: 'pub-mnist-jipi-2026',
    citationKey: 'yugi2026mnist',
    title:
      'Enhancing Handwritten Digit Recognition Accuracy on the MNIST Dataset Using a Hybrid CNN-BiLSTM Model with Data Augmentation',
    authors: ['M. Yugi', 'A. Latif', 'F. S. Utomo', 'A. S. Barkah'],
    isFirstAuthor: true,
    year: 2026,
    venue: 'JIPI (Jurnal Ilmiah Penelitian dan Pembelajaran Informatika)',
    venueShort: 'JIPI',
    category: 'Deep Learning & Computer Vision',
    summary:
      'Evaluasi sistematis terhadap kinerja model hibrida CNN-BiLSTM yang dilengkapi skema augmentasi data terstruktur pada benchmark dataset MNIST guna menekan kesalahan klasifikasi antar-digit yang mirip secara morfologi.',
    methodology:
      'Eksperimen komparatif antara CNN standar dan arsitektur hibrida CNN-BiLSTM dengan transformasi geometri terkendali pada tahap prapemrosesan citra.',
    impact:
      'Memberikan rujukan empiris mengenai efektivitas kombinasi ekstraksi fitur spasial dan sekuensial dalam klasifikasi karakter digital.',
    methods: ['CNN-BiLSTM', 'MNIST', 'Deep Learning', 'Data Augmentation'],
  },
  {
    id: 'pub-prompt-jtp-2026',
    citationKey: 'najibulloh2026prompt',
    title:
      'Enhancing Computational Thinking of Islamic Education Students through CT-Based Prompt Engineering: A Quasi-Experimental Study on AI Multimodal Media Design',
    authors: ['I. K. Najibulloh', 'A. Latif', 'M. Yugi', 'B. Riswanto'],
    isFirstAuthor: false,
    year: 2026,
    venue: 'Jurnal Teknologi Pendidikan',
    venueShort: 'JTP',
    category: 'Generative AI & Pendidikan',
    summary:
      'Studi kuasi-eksperimental yang menguji efektivitas strategi rekayasa prompt berbasis Computational Thinking (dekomposisi, pengenalan pola, abstraksi, dan desain algoritmik) dalam perancangan media pembelajaran AI multimodal.',
    methodology:
      'Rancangan pre-test dan post-test pada kelompok eksperimen dan kontrol dengan instrumen evaluasi keterampilan berpikir komputasional serta kualitas artefak media multimodal.',
    impact:
      'Membuktikan bahwa integrasi kerangka berpikir komputasional dalam penyusunan prompt generatif secara terukur memperkuat literasi AI mahasiswa pendidikan.',
    methods: ['Prompt Engineering', 'Computational Thinking', 'Multimodal AI', 'Quasi-Experimental'],
    featured: true,
    bentoSpan: 'standard',
    projectTagline: 'Riset Pedagogi Generative AI',
    image: '/src/assets/images/project_prompt_education_1795377755994.jpg',
    imageAlt:
      'Diagram alur berpikir komputasional di atas kertas arsip dan tablet digital untuk perancangan media AI multimodal',
  },
  {
    id: 'pub-naivebayes-sudo-2026',
    citationKey: 'latif2026naivebayes',
    title:
      'Sistem Pendukung Keputusan Pemilihan Program Studi Berbasis Naive Bayes dengan Likelihood Pakar dan Kuesioner Minat',
    authors: ['A. Latif', 'M. Yugi', 'N. Alfiah', 'B. Riswanto'],
    isFirstAuthor: false,
    year: 2026,
    venue: 'sudo Jurnal Teknik Informatika',
    venueShort: 'sudo JTI',
    category: 'Sistem Pendukung Keputusan',
    summary:
      'Perancangan dan implementasi sistem pendukung keputusan untuk membantu calon mahasiswa Universitas Komputama Cilacap memilih program studi yang selaras dengan profil minat, bakat, dan rekomendasi pakar akademik.',
    methodology:
      'Pemodelan probabilitas posterior Naive Bayes yang dikalibrasi dengan tabel likelihood pakar serta pemetaan jawaban kuesioner minat terstruktur.',
    impact:
      'Menyediakan rekomendasi program studi yang objektif, transparan, dan mudah diterapkan pada layanan penerimaan mahasiswa baru.',
    methods: ['Naive Bayes', 'Decision Support System', 'Expert Likelihood', 'Web App'],
  },
  {
    id: 'pub-sentiment-jipi-2026',
    citationKey: 'latif2026sentiment',
    title:
      'Comparison of the Performance of SVM, Random Forest, and Neural Network Algorithms in Sentiment Analysis of OpenAI Application Reviews on the Google Play Store',
    authors: ['A. Latif', 'M. Yugi', 'F. S. Utomo', 'T. Hariguna'],
    isFirstAuthor: false,
    year: 2026,
    venue: 'JIPI (Jurnal Ilmiah Penelitian dan Pembelajaran Informatika)',
    venueShort: 'JIPI',
    category: 'Machine Learning & NLP',
    summary:
      'Analisis komparatif tiga pendekatan klasifikasi populer — Support Vector Machine (SVM), Random Forest, dan Neural Network — dalam memetakan polaritas sentimen ulasan publik terhadap aplikasi OpenAI di Google Play Store.',
    methodology:
      'Pembersihan korpus ulasan, pembobotan fitur teks, validasi silang, dan pengukuran metrik akurasi, presisi, recall, serta F1-score pada masing-masing model.',
    impact:
      'Menunjukkan trade-off akurasi dan efisiensi komputasi antar algoritma pembelajaran mesin pada dataset ulasan aplikasi AI berskala besar.',
    methods: ['SVM', 'Random Forest', 'Neural Network', 'Sentiment Analysis'],
  },
  {
    id: 'pub-education-ail-2026',
    citationKey: 'latif2026predictive',
    title:
      'Predictive Modeling of Educational Outcomes Using Machine Learning for Data-Driven Regional Education Policy',
    authors: ['A. Latif', 'M. Yugi'],
    isFirstAuthor: false,
    year: 2026,
    venue: 'Artificial Intelligence in Learning',
    venueShort: 'AI in Learning',
    category: 'Machine Learning & NLP',
    summary:
      'Pembangunan model prediktif berbasis machine learning terhadap indikator capaian pendidikan guna menghasilkan rekomendasi kebijakan pendidikan tingkat daerah yang terukur dan berbasis bukti data.',
    methodology:
      'Pemrosesan indikator sosio-edukatif daerah, seleksi fitur determinan utama, serta validasi model prediktif untuk pemetaan risiko kesenjangan mutu belajar.',
    impact:
      'Mendukung perumusan intervensi kebijakan pendidikan daerah secara presisi melalui analitik prediktif.',
    methods: ['Predictive Modeling', 'Educational Data Mining', 'Machine Learning', 'Policy Analytics'],
  },
  {
    id: 'pub-debalong-infokabin-2026',
    citationKey: 'yugi2026debalong',
    title:
      "Perancangan Sistem Informasi Pemesanan Tiket Wisata Berbasis Website pada Destinasi De'Balong Assaeida",
    authors: ['M. Yugi', 'Tim Peneliti Universitas Komputama'],
    isFirstAuthor: true,
    year: 2026,
    venue: 'INFOKABIN (Informatika Komputasi Aplikasi dan Bisnis)',
    venueShort: 'INFOKABIN',
    category: 'Sistem Informasi & Web',
    summary:
      "Rancang bangun platform pemesanan tiket wisata berbasis web bagi pengelola destinasi De'Balong Assaeida untuk menyederhanakan reservasi pengunjung, pencatatan kunjungan harian, dan verifikasi tiket digital.",
    methodology:
      'Analisis kebutuhan operasional destinasi wisata, pemodelan alur reservasi dan basis data relasional, serta pengujian fungsional antarmuka web.',
    impact:
      'Mengurangi antrean loket manual sekaligus menyediakan rekap data kunjungan secara rapi untuk pengelola wisata lokal.',
    methods: ['Web Information System', 'E-Ticketing', 'Database Design', 'Software Engineering'],
  },
  {
    id: 'pub-emyepos-jtb-2022',
    citationKey: 'yugi2022emyepos',
    title: 'Sistem Point Of Sales "EMYE POS" pada Toko Putra Wringin Cilacap',
    authors: ['M. Yugi', 'Tim Pengembang STMIK Komputama'],
    isFirstAuthor: true,
    year: 2022,
    venue: 'Jurnal Teknologi dan Bisnis',
    venueShort: 'JTB',
    category: 'Sistem Informasi & Web',
    summary:
      'Pengembangan aplikasi Point of Sales "EMYE POS" yang dirancang khusus untuk mempercepat transaksi kasir, pengendalian stok barang, dan penyusunan laporan penjualan harian pada Toko Putra Wringin Cilacap.',
    methodology:
      'Observasi proses bisnis ritel secara langsung, perancangan modul transaksi dan inventori terintegrasi, serta uji kelayakan penggunaan bersama pengelola toko.',
    impact:
      'Meminimalkan selisih pencatatan stok dan mempercepat rekapitulasi omzet harian di operasional ritel lokal Cilacap.',
    methods: ['Point of Sales', 'Inventory Control', 'Retail Information System', 'UI/UX'],
    featured: true,
    bentoSpan: 'standard',
    projectTagline: 'Aplikasi Ritel & Sistem Web Terapan',
    image: '/src/assets/images/project_web_pos_systems_1795377756706.jpg',
    imageAlt:
      'Meja kerja modern menampilkan antarmuka sistem Point of Sales dan perangkat kasir ritel',
  },
];

export const PUBLICATION_CATEGORIES: PublicationCategory[] = [
  'Semua',
  'Deep Learning & Computer Vision',
  'Machine Learning & NLP',
  'Sistem Pendukung Keputusan',
  'Generative AI & Pendidikan',
  'Sistem Informasi & Web',
];

export const BROCODEID_PORTFOLIO: WebAppStudioPortfolio = {
  brand: 'BroCodeid',
  role: 'Pengembang Web-App',
  url: 'https://brocodeid.com/',
  newsUrl: 'https://news.brocodeid.com/',
  email: 'info@brocode.id',
  trustStatement: 'Dipercaya 50+ perusahaan di Indonesia',
  headline: 'Pengembangan Aplikasi Web & Transformasi Digital di BroCodeid.',
  description:
    'Berperan sebagai pengembang web-app di BroCodeid (brocodeid.com) dalam merancang dan membangun website perusahaan, toko online, landing page berperforma tinggi, portal berita, hingga panel administrasi kustom yang responsif di desktop maupun seluler serta ramah SEO.',
  image: '/src/assets/images/project_brocodeid_webapp_1795379062813.jpg',
  imageAlt:
    'Tampilan antarmuka aplikasi web responsif dan dashboard admin BroCodeid pada layar desktop dan ponsel',
  capabilities: [
    {
      index: '01.',
      title: 'Website Perusahaan',
      description:
        'Arsitektur web korporasi yang cepat, rapi, dan SEO-friendly untuk membangun kredibilitas digital lintas sektor industri.',
    },
    {
      index: '02.',
      title: 'Toko Online & E-Commerce',
      description:
        'Pengembangan katalog produk, alur pemesanan, serta manajemen inventori untuk akselerasi penjualan daring.',
    },
    {
      index: '03.',
      title: 'Landing Page Konversi',
      description:
        'Halaman kampanye modern yang dirancang khusus untuk kecepatan muat optimal dan peningkatan prospek bisnis.',
    },
    {
      index: '04.',
      title: 'Admin Panel & Maintenance',
      description:
        'Sistem manajemen konten mandiri, portal berita (news.brocodeid.com), serta pemeliharaan performa dan keamanan berkala.',
    },
  ],
  notableSectors:
    'Logistik & Kargo · Manufaktur & Baja · Otomotif · Properti · UMKM & Korporasi Indonesia',
};

export const ACADEMIC_LINKS: AcademicProfileLink[] = [
  {
    id: 'brocodeid',
    label: 'BroCodeid — Pengembang Web-App',
    handle: 'brocodeid.com · 50+ Klien Perusahaan',
    description:
      'Portofolio pengembangan aplikasi web profesional meliputi website perusahaan, toko online, landing page, admin panel, dan portal berita.',
    url: 'https://brocodeid.com/',
  },
  {
    id: 'sinta',
    label: 'SINTA Kemdiktisaintek',
    handle: 'Author ID 6990431 · Skor SINTA 6',
    description:
      'Profil resmi Science and Technology Index Indonesia di bawah Program Studi Teknologi Informasi (S1), Universitas Komputama.',
    url: 'https://sinta.kemdikbud.go.id/authors/profile/6990431',
  },
  {
    id: 'scholar',
    label: 'Google Scholar',
    handle: 'Muhtyas Yugi · H-Index 1',
    description:
      'Indeksasi artikel ilmiah internasional dan nasional di bidang deep learning, analisis sentimen, dan sistem informasi.',
    url: 'https://scholar.google.com/scholar?q=%22Muhtyas+Yugi%22',
  },
  {
    id: 'researchgate',
    label: 'ResearchGate',
    handle: 'Kolaborasi Riset & Pracetak',
    description:
      'Arsip kolaborasi publikasi ilmiah terkait sistem pendukung keputusan Naive Bayes, prompt engineering, dan sistem web.',
    url: 'https://www.researchgate.net/search/publication?q=Muhtyas+Yugi',
  },
];

export const MARQUEE_TOPICS = [
  'Pengembang Web-App · BroCodeid',
  'Deep Learning & Computer Vision',
  'CycleGAN & CNN-BiLSTM',
  'Machine Learning & Analisis Sentimen',
  'Sistem Pendukung Keputusan Naive Bayes',
  'CT-Based Prompt Engineering',
  'Rekayasa Sistem Informasi & Web',
  'Universitas Komputama Cilacap',
];
