/**
 * Interprets the score and returns the corresponding category
 * @param score Total score from the questionnaire
 * @returns Category of psychological distress
 */
export function interpretScore(score: number): string {
  if (score >= 0 && score <= 19) {
    return 'Distres sangat ringan';
  } else if (score >= 20 && score <= 39) {
    return 'Distres ringan';
  } else if (score >= 40 && score <= 59) {
    return 'Distres sedang';
  } else if (score >= 60 && score <= 80) {
    return 'Distres berat';
  } else {
    return 'Skor tidak valid';
  }
}

/**
 * Returns a recommendation based on the distress category
 * @param category Category of psychological distress
 * @returns Recommendation text
 */
export function getRecommendation(category: string): string {
  switch (category) {
    case 'Distres sangat ringan':
      return 'Berikan dukungan emosional dasar, edukasi ringan, dan pemantauan berkala. Pertahankan keseimbangan antara pekerjaan dan istirahat. Lakukan kegiatan yang menyenangkan dan menenangkan secara rutin.';
      
    case 'Distres ringan':
      return 'Anjurkan konseling ringan oleh perawat atau tenaga kesehatan terlatih. Pertimbangkan untuk berbicara dengan rekan kerja atau supervisor tentang beban kerja. Praktikkan teknik relaksasi dan manajemen stres secara lebih teratur.';
      
    case 'Distres sedang':
      return 'Lakukan rujukan ke psikolog/pelayanan psikososial rumah sakit. Evaluasi beban kerja dan pertimbangkan untuk menyesuaikan jadwal atau tanggung jawab sementara. Bergabunglah dengan kelompok dukungan untuk pasien paliatif.';
      
    case 'Distres berat':
      return 'Intervensi segera oleh tim multidisiplin (psikolog, psikiater, rohaniawan, dan paliatif care team). Pertimbangkan cuti kerja jika memungkinkan. Dapatkan dukungan profesional secara intensif dan rutin.';
      
    default:
      return 'Silakan konsultasikan hasil ini dengan profesional kesehatan untuk mendapatkan rekomendasi yang sesuai.';
  }
}