export interface Question {
  id: number;
  text: string;
  dimension: 'emosi' | 'sosial' | 'spiritual' | 'fisik';
}

export const questions: Question[] = [
  // A. Dimensi Emosi (1-5)
  {
    id: 1,
    text: 'Saya merasa cemas atau khawatir secara terus-menerus',
    dimension: 'emosi',
  },
  {
    id: 2,
    text: 'Saya merasa sedih atau murung tanpa sebab yang jelas',
    dimension: 'emosi',
  },
  {
    id: 3,
    text: 'Saya mudah marah atau tersinggung',
    dimension: 'emosi',
  },
  {
    id: 4,
    text: 'Saya merasa takut menghadapi kondisi saya',
    dimension: 'emosi',
  },
  {
    id: 5,
    text: 'Saya menangis tanpa alasan yang jelas',
    dimension: 'emosi',
  },

  // B. Dimensi Sosial dan Relasional (6-10)
  {
    id: 6,
    text: 'Saya merasa sendirian atau kesepian',
    dimension: 'sosial',
  },
  {
    id: 7,
    text: 'Saya merasa kurang mendapat dukungan dari keluarga atau orang dekat',
    dimension: 'sosial',
  },
  {
    id: 8,
    text: 'Saya merasa tidak bisa berbicara jujur tentang perasaan saya kepada orang lain',
    dimension: 'sosial',
  },
  {
    id: 9,
    text: 'Saya merasa menjadi beban bagi orang lain',
    dimension: 'sosial',
  },
  {
    id: 10,
    text: 'Saya merasa tidak dimengerti oleh tenaga kesehatan',
    dimension: 'sosial',
  },

  // C. Dimensi Spiritual dan Makna Hidup (11-15)
  {
    id: 11,
    text: 'Saya merasa hidup saya tidak berarti lagi',
    dimension: 'spiritual',
  },
  {
    id: 12,
    text: 'Saya merasa kehilangan harapan akan masa depan',
    dimension: 'spiritual',
  },
  {
    id: 13,
    text: 'Saya mempertanyakan keyakinan saya atau iman saya',
    dimension: 'spiritual',
  },
  {
    id: 14,
    text: 'Saya merasa bersalah atas hal-hal yang telah terjadi',
    dimension: 'spiritual',
  },
  {
    id: 15,
    text: 'Saya tidak tahu harus bagaimana menghadapi kematian',
    dimension: 'spiritual',
  },

  // D. Dimensi Gejala Fisik yang Mempengaruhi Psikologis (16-20)
  {
    id: 16,
    text: 'Saya tidak bisa tidur dengan nyenyak',
    dimension: 'fisik',
  },
  {
    id: 17,
    text: 'Saya kehilangan nafsu makan karena pikiran saya',
    dimension: 'fisik',
  },
  {
    id: 18,
    text: 'Saya sering merasa kelelahan secara mental',
    dimension: 'fisik',
  },
  {
    id: 19,
    text: 'Saya tidak mampu menikmati hal-hal yang biasanya saya sukai',
    dimension: 'fisik',
  },
  {
    id: 20,
    text: 'Saya merasa tidak punya kendali atas tubuh saya',
    dimension: 'fisik',
  },
];