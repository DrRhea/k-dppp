'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, AlertCircle, CheckCircle, XCircle, FileDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import jsPDF from 'jspdf';

// Updated scoring functions for 0-4 scale (max 80 points)
function interpretScore(score: number): string {
  if (score >= 0 && score <= 26) return 'Rendah';
  if (score >= 27 && score <= 53) return 'Sedang';
  if (score >= 54 && score <= 80) return 'Tinggi';
  return 'Tidak Valid';
}

function getRecommendation(category: string): string {
  switch (category.toLowerCase()) {
    case 'rendah':
      return 'Tingkat distres psikologis Anda berada dalam kategori rendah. Ini menunjukkan bahwa Anda memiliki kemampuan coping yang baik dalam menghadapi stres kerja. Tetap pertahankan keseimbangan hidup-kerja dan lanjutkan strategi pengelolaan stres yang sudah Anda lakukan.';
    case 'sedang':
      return 'Tingkat distres psikologis Anda berada dalam kategori sedang. Disarankan untuk lebih memperhatikan kesehatan mental Anda. Pertimbangkan untuk melakukan aktivitas relaksasi, olahraga teratur, dan mencari dukungan dari rekan kerja atau keluarga. Jika diperlukan, konsultasikan dengan konselor atau psikolog.';
    case 'tinggi':
      return 'Tingkat distres psikologis Anda berada dalam kategori tinggi. Sangat disarankan untuk segera mencari bantuan profesional dari psikolog atau psikiater. Lakukan evaluasi beban kerja, pertimbangkan cuti jika memungkinkan, dan pastikan Anda mendapatkan dukungan yang memadai dari supervisor dan rekan kerja.';
    default:
      return 'Hasil tidak dapat diinterpretasikan. Silakan ulangi pengisian kuesioner.';
  }
}

// Simple Header component inline
function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/kuesioner" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-8 w-auto" />
          <span className="text-lg font-bold text-primary">Hasil Assessment</span>
        </Link>
      </div>
    </header>
  );
}

interface BiodataData {
  nama: string;
  umur: string;
  tanggalLahir: string;
}

export default function HasilPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [biodataData, setBiodataData] = useState<BiodataData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem('k-dppp-score');
      const savedBiodata = localStorage.getItem('k-dppp-biodata');
      
      if (!savedScore) {
        router.push('/kuesioner');
        return;
      }
      
      const parsedScore = parseInt(savedScore, 10);
      setScore(parsedScore);
      
      const interpretedCategory = interpretScore(parsedScore);
      setCategory(interpretedCategory);
      
      const recommendationText = getRecommendation(interpretedCategory);
      setRecommendation(recommendationText);

      // Load biodata
      if (savedBiodata) {
        try {
          const parsedBiodata = JSON.parse(savedBiodata);
          setBiodataData(parsedBiodata);
        } catch (error) {
          console.error('Error parsing biodata:', error);
        }
      }
      
      setLoading(false);
    }
  }, [router]);

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Apakah Anda yakin ingin mengulang kuesioner? Semua data akan dihapus.')) {
      localStorage.removeItem('k-dppp-score');
      localStorage.removeItem('k-dppp-answers');
      localStorage.removeItem('k-dppp-biodata');
      router.push('/kuesioner');
    }
  };

  const handleExportPDF = () => {
    if (!score || !biodataData) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HASIL KUESIONER DISTRES PSIKOLOGIS', 20, 20);
    doc.text('PERAWAT PALIATIF (K-DPPP)', 20, 30);
    
    // Tanggal
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Tanggal Pengisian: ${currentDate}`, 20, 45);
    
    // Data Responden
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATA RESPONDEN', 20, 60);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nama: ${biodataData.nama}`, 20, 70);
    doc.text(`Umur: ${biodataData.umur} tahun`, 20, 80);
    doc.text(`Tanggal Lahir: ${new Date(biodataData.tanggalLahir).toLocaleDateString('id-ID')}`, 20, 90);
    
    // Hasil Penilaian
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('HASIL PENILAIAN', 20, 110);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Skor Total: ${score}/80`, 20, 120);
    doc.text(`Kategori: Distres ${category}`, 20, 130);
    
    // Interpretasi
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INTERPRETASI', 20, 150);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Split recommendation text into multiple lines
    const splitText = doc.splitTextToSize(recommendation, 170);
    doc.text(splitText, 20, 160);
    
    // Calculate Y position for next section
    const textHeight = splitText.length * 5;
    let yPos = 160 + textHeight + 20;
    
    // Catatan
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CATATAN', 20, yPos);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const catatanText = 'Hasil ini hanya sebagai indikator awal dan tidak dapat menggantikan diagnosis profesional. Jika Anda merasa mengalami distres yang signifikan, disarankan untuk berkonsultasi dengan profesional kesehatan mental.';
    const splitCatatan = doc.splitTextToSize(catatanText, 170);
    doc.text(splitCatatan, 20, yPos + 10);
    
    // Footer
    yPos = yPos + splitCatatan.length * 5 + 30;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`K-DPPP © ${new Date().getFullYear()}`, 20, yPos);
    doc.text('Dikembangkan oleh: Ns. Sulatri, M.Kep., Sp. Jiwa', 20, yPos + 10);
    doc.text('Poltekkes Kemenkes Tanjungkarang', 20, yPos + 20);
    
    // Save PDF
    const fileName = `Hasil_K-DPPP_${biodataData.nama.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'rendah': return 'text-green-600 border-green-600 bg-green-50';
      case 'sedang': return 'text-yellow-600 border-yellow-600 bg-yellow-50';
      case 'tinggi': return 'text-red-600 border-red-600 bg-red-50';
      default: return 'text-gray-600 border-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'rendah': return <CheckCircle className="h-5 w-5" />;
      case 'sedang': return <AlertCircle className="h-5 w-5" />;
      case 'tinggi': return <XCircle className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SimpleHeader />
        <main className="container px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Memuat hasil...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (score === null) return null;

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="container px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Biodata Card */}
          {biodataData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Responden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div><strong>Nama:</strong> {biodataData.nama}</div>
                  <div><strong>Umur:</strong> {biodataData.umur} tahun</div>
                  <div><strong>Tanggal Lahir:</strong> {new Date(biodataData.tanggalLahir).toLocaleDateString('id-ID')}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Score Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Hasil Assessment K-DPPP</CardTitle>
              <CardDescription>
                Berikut adalah hasil pengukuran distres psikologis Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div>
                <div className="text-6xl font-bold text-primary mb-2">{score}</div>
                <div className="text-lg text-muted-foreground">dari 80 poin</div>
              </div>
              
              <div className="flex justify-center">
                <Badge variant="outline" className={`px-4 py-2 text-lg font-semibold ${getCategoryColor(category)}`}>
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    Distres {category}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Interpretation Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Interpretasi Hasil</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-base leading-relaxed">
                  {recommendation}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Langkah Selanjutnya</CardTitle>
              <CardDescription>
                Pilih tindakan yang ingin Anda lakukan dengan hasil ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Ulangi Test
                </Button>
                <Button onClick={handleExportPDF} variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Unduh PDF
                </Button>
                <Button asChild>
                  <Link href="/">
                    Kembali ke Beranda
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Penting untuk diketahui:</p>
                  <p>
                    Hasil ini hanya sebagai indikator awal dan tidak dapat menggantikan diagnosis profesional. 
                    Jika Anda merasa mengalami distres yang signifikan, disarankan untuk berkonsultasi 
                    dengan profesional kesehatan mental.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}