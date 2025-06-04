'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, RotateCcw, Share2 } from 'lucide-react';
import { interpretScore, getRecommendation } from '@/lib/scoring';
import { generatePdf } from '@/lib/pdf-generator';
import Header from '@/components/header';
import { useToast } from '@/hooks/use-toast';

export default function HasilPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  
  useEffect(() => {
    const savedScore = localStorage.getItem('k-dppp-score');
    
    if (!savedScore) {
      // Redirect to kuesioner if no score is found
      router.push('/kuesioner');
      return;
    }
    
    const parsedScore = parseInt(savedScore, 10);
    setScore(parsedScore);
    
    const interpretedCategory = interpretScore(parsedScore);
    setCategory(interpretedCategory);
    
    const recommendationText = getRecommendation(interpretedCategory);
    setRecommendation(recommendationText);
  }, [router]);

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengulang kuesioner? Semua jawaban akan dihapus.')) {
      localStorage.removeItem('k-dppp-answers');
      localStorage.removeItem('k-dppp-score');
      router.push('/kuesioner');
    }
  };

  const handleExportPdf = async () => {
    if (score === null) return;
    
    try {
      await generatePdf(score, category, recommendation);
      toast({
        title: 'PDF berhasil dibuat',
        description: 'Hasil kuesioner telah diunduh sebagai file PDF',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Gagal membuat PDF',
        description: 'Terjadi kesalahan saat membuat file PDF',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    if (!score) return;
    
    const shareText = `Hasil Kuesioner Distres Psikologis Pasien Paliatif (K-DPPP)\n\nSkor: ${score}/80\nKategori: ${category}\n\nRekomendasi: ${recommendation}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hasil K-DPPP',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: 'Teks hasil disalin',
          description: 'Hasil kuesioner telah disalin ke clipboard',
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  if (score === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Memuat hasil...</p>
      </div>
    );
  }

  // Calculate score percentage for the gauge
  const scorePercentage = (score / 80) * 100;
  
  // Determine color based on score category
  const getColorClass = () => {
    if (score < 20) return 'text-green-500';
    if (score < 40) return 'text-yellow-500';
    if (score < 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title="Hasil Kuesioner" showBack backUrl="/" />
      
      <main className="flex-1 container py-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Hasil Penilaian</CardTitle>
              <CardDescription>
                Kuesioner Distres Psikologis Pasien Paliatif (K-DPPP)
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative h-36 w-36 flex items-center justify-center">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="currentColor" 
                      className="text-muted stroke-2"
                    />
                    
                    {/* Score Circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="currentColor" 
                      className={`${getColorClass()} stroke-2`}
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * scorePercentage) / 100}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getColorClass()}`}>{score}</span>
                    <span className="text-sm text-muted-foreground">dari 80</span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mt-4 ${getColorClass()}`}>
                  {category}
                </h3>
              </div>
              
              <Separator />
              
              {/* Recommendation */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Rekomendasi:</h3>
                <p className="text-muted-foreground">{recommendation}</p>
              </div>
              
              <Separator />
              
              {/* Information */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Informasi Tambahan:</h3>
                <p className="text-sm text-muted-foreground">
                  Hasil ini hanya bersifat skrining awal. Untuk penanganan lebih lanjut, 
                  silakan konsultasikan dengan profesional kesehatan mental.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Mulai Ulang
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button onClick={handleExportPdf}>
                <FileText className="h-4 w-4 mr-2" />
                Unduh PDF
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}