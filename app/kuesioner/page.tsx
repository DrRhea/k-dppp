'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuestionItem } from '@/components/question-item';
import { BiodataForm } from '@/components/biodata-form';
import { questions } from '@/lib/questions';
import Link from 'next/link';
import Image from 'next/image';

// Simple Header component inline
function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-8 w-auto" />
          <span className="text-lg font-bold text-primary">Kuesioner</span>
        </Link>
      </div>
    </header>
  );
}

interface BiodataFormData {
  nama: string;
  umur: string;
  tanggalLahir: string;
}

export default function KuesionerPage() {
  const router = useRouter();
  const [showBiodata, setShowBiodata] = useState(true);
  const [biodataData, setBiodataData] = useState<BiodataFormData | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [progress, setProgress] = useState(0);

  // Check if there are saved data in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBiodata = localStorage.getItem('k-dppp-biodata');
      const savedAnswers = localStorage.getItem('k-dppp-answers');
      
      if (savedBiodata) {
        try {
          const parsedBiodata = JSON.parse(savedBiodata);
          setBiodataData(parsedBiodata);
          setShowBiodata(false);
        } catch (error) {
          console.error('Error parsing saved biodata:', error);
        }
      }
      
      if (savedAnswers) {
        try {
          const parsedAnswers = JSON.parse(savedAnswers);
          if (Array.isArray(parsedAnswers) && parsedAnswers.length === questions.length) {
            setAnswers(parsedAnswers);
            
            // Calculate progress
            const answered = parsedAnswers.filter((a: number) => a !== -1).length;
            setProgress(Math.round((answered / questions.length) * 100));
          }
        } catch (error) {
          console.error('Error parsing saved answers:', error);
        }
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('k-dppp-answers', JSON.stringify(answers));
    }
    
    // Calculate progress
    const answered = answers.filter((a) => a !== -1).length;
    setProgress(Math.round((answered / questions.length) * 100));
  }, [answers]);

  const handleBiodataSubmit = (data: BiodataFormData) => {
    setBiodataData(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('k-dppp-biodata', JSON.stringify(data));
    }
    setShowBiodata(false);
  };

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    // Check if all questions in the current section are answered
    const sectionQuestions = getSectionQuestions(currentSection);
    const allAnswered = sectionQuestions.every(
      (q) => answers[q.id - 1] !== -1
    );

    if (!allAnswered) {
      alert('Mohon lengkapi semua pertanyaan sebelum melanjutkan');
      return;
    }

    if (currentSection < 3) {
      setCurrentSection(currentSection + 1);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } else {
      // Calculate total score
      const totalScore = answers.reduce((sum, value) => sum + (value === -1 ? 0 : value), 0);
      
      // Save score to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('k-dppp-score', totalScore.toString());
        router.push('/hasil');
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.confirm('Apakah Anda yakin ingin mengulang kuesioner? Semua data akan dihapus.')) {
      setAnswers(Array(questions.length).fill(-1));
      setCurrentSection(0);
      setBiodataData(null);
      setShowBiodata(true);
      localStorage.removeItem('k-dppp-answers');
      localStorage.removeItem('k-dppp-score');
      localStorage.removeItem('k-dppp-biodata');
      window.scrollTo(0, 0);
    }
  };

  const handleEditBiodata = () => {
    setShowBiodata(true);
  };

  const getSectionQuestions = (section: number) => {
    const sections = [
      questions.slice(0, 5),    // Dimensi Emosi
      questions.slice(5, 10),   // Dimensi Sosial dan Relasional
      questions.slice(10, 15),  // Dimensi Spiritual dan Makna Hidup
      questions.slice(15, 20),  // Dimensi Gejala Fisik yang Mempengaruhi Psikologis
    ];
    
    return sections[section];
  };

  const sectionTitles = [
    'Dimensi Emosi',
    'Dimensi Sosial dan Relasional',
    'Dimensi Spiritual dan Makna Hidup',
    'Dimensi Gejala Fisik yang Mempengaruhi Psikologis',
  ];

  // Show biodata form if not completed
  if (showBiodata) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SimpleHeader />
        
        <main className="flex-1 container py-6">
          <BiodataForm 
            onSubmit={handleBiodataSubmit}
            initialData={biodataData || undefined}
          />
        </main>
      </div>
    );
  }

  const currentQuestions = getSectionQuestions(currentSection);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SimpleHeader />
      
      <main className="flex-1 container py-6">
        <div className="mx-auto max-w-3xl">
          {/* Biodata Summary */}
          {biodataData && (
            <Card className="mb-6 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Data Responden:</h3>
                  <p className="text-sm"><strong>Nama:</strong> {biodataData.nama}</p>
                  <p className="text-sm"><strong>Umur:</strong> {biodataData.umur} tahun</p>
                  <p className="text-sm"><strong>Tanggal Lahir:</strong> {new Date(biodataData.tanggalLahir).toLocaleDateString('id-ID')}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleEditBiodata}>
                  Edit Data
                </Button>
              </div>
            </Card>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Bagian {currentSection + 1} dari 4
              </span>
              <span className="text-sm font-medium">{progress}% selesai</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-6">
            <h1 className="text-xl font-bold mb-2">{sectionTitles[currentSection]}</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Bacalah setiap pernyataan berikut dengan saksama. Pilih angka yang paling sesuai dengan kondisi Anda selama 7 hari terakhir. Gunakan skala 0 sampai 4 untuk menilai setiap pernyataan.
            </p>

            <div className="space-y-6">
              {currentQuestions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  value={answers[question.id - 1]}
                  onChange={(value) => handleAnswer(question.id - 1, value)}
                />
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <div>
                {currentSection > 0 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    Sebelumnya
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={handleNext}>
                  {currentSection < 3 ? 'Selanjutnya' : 'Lihat Hasil'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}