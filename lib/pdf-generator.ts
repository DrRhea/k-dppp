'use client';

import { jsPDF } from 'jspdf';
import { formatDate } from '@/lib/utils';

export async function generatePdf(score: number, category: string, recommendation: string) {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set font
  doc.setFont('helvetica');
  
  // Add title
  doc.setFontSize(16);
  doc.setTextColor(46, 125, 99); // Primary green color
  doc.text('K-DPPP', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Kuesioner Distres Psikologis Perawat Paliatif', 105, 27, { align: 'center' });
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Tanggal: ${formatDate(new Date())}`, 105, 35, { align: 'center' });
  
  // Add horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 40, 190, 40);
  
  // Add results section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Hasil Penilaian', 20, 50);
  
  // Add score
  doc.setFontSize(11);
  doc.text(`Skor Total: ${score}/80`, 20, 60);
  
  // Add category with color
  let categoryColor;
  if (category === 'Distres sangat ringan') {
    categoryColor = [39, 174, 96]; // Green
  } else if (category === 'Distres ringan') {
    categoryColor = [241, 196, 15]; // Yellow
  } else if (category === 'Distres sedang') {
    categoryColor = [230, 126, 34]; // Orange
  } else {
    categoryColor = [231, 76, 60]; // Red
  }
  
  doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.text(`Kategori: ${category}`, 20, 70);
  
  // Add recommendation
  doc.setTextColor(0, 0, 0);
  doc.text('Rekomendasi:', 20, 85);
  
  // Split recommendation text to fit the page width
  const splitRecommendation = doc.splitTextToSize(recommendation, 170);
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(splitRecommendation, 20, 95);
  
  // Add footer with disclaimer
  const disclaimer = 'Hasil ini hanya bersifat skrining awal. Untuk penanganan lebih lanjut, silakan konsultasikan dengan profesional kesehatan mental.';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(splitDisclaimer, 105, 250, { align: 'center' });
  
  // Add institution information
  doc.setFontSize(8);
  doc.text('© Poltekkes Kemenkes Tanjungkarang', 105, 270, { align: 'center' });
  doc.text('Ns. Sulatri, M.Kep., Sp. Jiwa', 105, 275, { align: 'center' });
  
  // Save the PDF
  doc.save('Hasil_K-DPPP.pdf');
}