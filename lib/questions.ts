export interface Question {
  id: number;
  text: string;
  dimension: 'emosi' | 'sosial' | 'spiritual' | 'fisik';
}

export const questions: Question[] = [
  // Dimensi Emosi (1-5)
  {
    id: 1,
    text: 'Saya merasa sedih ketika melihat pasien yang menderita.',
    dimension: 'emosi',
  },
  {
    id: 2,
    text: 'Saya merasa cemas ketika menghadapi pasien dalam kondisi terminal.',
    dimension: 'emosi',
  },
  {
    id: 3,
    text: 'Saya merasa takut ketika harus memberitahu keluarga tentang kondisi pasien yang memburuk.',
    dimension: 'emosi',
  },
  {
    id: 4,
    text: 'Saya merasa marah ketika melihat sistem yang tidak mendukung pasien paliatif.',
    dimension: 'emosi',
  },
  {
    id: 5,
    text: 'Saya merasa putus asa ketika tidak dapat mengurangi penderitaan pasien.',
    dimension: 'emosi',
  },

  // Dimensi Sosial dan Relasional (6-10)
  {
    id: 6,
    text: 'Saya merasa terisolasi dari rekan kerja karena beban kerja di unit paliatif.',
    dimension: 'sosial',
  },
  {
    id: 7,
    text: 'Saya mengalami kesulitan berkomunikasi dengan keluarga pasien tentang prognosis.',
    dimension: 'sosial',
  },
  {
    id: 8,
    text: 'Saya merasa tidak mendapat dukungan yang cukup dari atasan.',
    dimension: 'sosial',
  },
  {
    id: 9,
    text: 'Saya mengalami konflik dengan tim medis lain terkait perawatan pasien.',
    dimension: 'sosial',
  },
  {
    id: 10,
    text: 'Saya merasa hubungan dengan keluarga di rumah terganggu karena pekerjaan.',
    dimension: 'sosial',
  },

  // Dimensi Spiritual dan Makna Hidup (11-15)
  {
    id: 11,
    text: 'Saya mempertanyakan makna hidup ketika menghadapi kematian pasien.',
    dimension: 'spiritual',
  },
  {
    id: 12,
    text: 'Saya merasa kehilangan tujuan dalam memberikan perawatan paliatif.',
    dimension: 'spiritual',
  },
  {
    id: 13,
    text: 'Saya merasa spiritual/keyakinan saya tergoyahkan ketika melihat penderitaan pasien.',
    dimension: 'spiritual',
  },
  {
    id: 14,
    text: 'Saya merasa tidak mampu memberikan dukungan spiritual yang dibutuhkan pasien.',
    dimension: 'spiritual',
  },
  {
    id: 15,
    text: 'Saya merasa pekerjaan ini bertentangan dengan nilai-nilai hidup saya.',
    dimension: 'spiritual',
  },

  // Dimensi Gejala Fisik yang Mempengaruhi Psikologis (16-20)
  {
    id: 16,
    text: 'Saya mengalami gangguan tidur karena memikirkan kondisi pasien.',
    dimension: 'fisik',
  },
  {
    id: 17,
    text: 'Saya mengalami sakit kepala setelah shift di unit paliatif.',
    dimension: 'fisik',
  },
  {
    id: 18,
    text: 'Saya merasa kelelahan yang berlebihan setelah merawat pasien paliatif.',
    dimension: 'fisik',
  },
  {
    id: 19,
    text: 'Saya mengalami gangguan nafsu makan karena stress di tempat kerja.',
    dimension: 'fisik',
  },
  {
    id: 20,
    text: 'Saya mengalami gejala fisik lain (seperti jantung berdebar, berkeringat) ketika menghadapi situasi sulit.',
    dimension: 'fisik',
  },
];