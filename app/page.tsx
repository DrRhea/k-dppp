import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, Trophy, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PWAInstall } from '@/components/pwa-install';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Logo Kemenkes Poltekkes Tanjungkarang" 
              width={40} 
              height={40} 
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-primary">K-DPPP</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Logo Kemenkes Poltekkes Tanjungkarang" 
                  width={120} 
                  height={120} 
                  className="h-20 w-auto md:h-24"
                />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-primary">Skrining Kondisi Fisik, Psikologis, Sosial, dan Spiritual Pasien Paliatif</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Instrumen tervalidasi untuk mengukur tingkat distres psikologis pada pasien paliatif
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="text-base font-semibold">
                  <Link href="/kuesioner">
                    Mulai Kuesioner
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                  <Link href="/tentang">
                    Tentang K-DPPP
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-muted/50 py-16 md:py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Fitur Utama
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Solusi komprehensif untuk assessment kesehatan mental pasien paliatif
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="relative overflow-hidden w-full">
                <CardHeader className="pb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileQuestion className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Kuesioner Tervalidasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    20 pertanyaan yang telah tervalidasi untuk mengukur distres psikologis pada pasien paliatif
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden w-full">
                <CardHeader className="pb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Interpretasi Hasil</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Mendapatkan skor, interpretasi dan rekomendasi intervensi sesuai hasil pengukuran
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden w-full">
                <CardHeader className="pb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Dapat Digunakan Offline</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Dapat diinstal sebagai aplikasi di perangkat dan digunakan tanpa koneksi internet
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Logo Kemenkes Poltekkes Tanjungkarang" 
                width={32} 
                height={32} 
                className="h-6 w-auto"
              />
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} K-DPPP. All rights reserved.
              </p>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Dikembangkan oleh: Ns. Sulatri, M.Kep., Sp. Jiwa
              <br />
              Poltekkes Kemenkes Tanjungkarang
            </p>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
}