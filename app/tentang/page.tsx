import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

// Simple Header component inline
function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-8 w-auto" />
          <span className="text-lg font-bold text-primary">Tentang K-DPPP</span>
        </Link>
      </div>
    </header>
  );
}

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="container px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Logo Kemenkes Poltekkes Tanjungkarang" 
                  width={120} 
                  height={120} 
                  className="h-24 w-auto"
                />
              </div>
              <CardTitle className="text-3xl font-bold">K-DPPP</CardTitle>
              <CardDescription className="text-lg">
                Kuesioner Distres Psikologis Perawat Paliatif
              </CardDescription>
            </CardHeader>
          </Card>

          {/* About Instrument */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tentang Instrumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                K-DPPP adalah instrumen yang dikembangkan khusus untuk mengukur tingkat distres psikologis 
                pada perawat yang bekerja di unit perawatan paliatif. Instrumen ini terdiri dari 20 item pertanyaan 
                yang telah melalui proses validasi dan reliabilitas.
              </p>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Spesifikasi:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 20 item pertanyaan</li>
                    <li>• Skala Likert 4 poin</li>
                    <li>• Waktu pengisian: 5-10 menit</li>
                    <li>• Skor range: 20-80</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Kategori Hasil:</h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                        Rendah (20-40)
                      </Badge>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600 bg-yellow-50">
                        Sedang (41-60)
                      </Badge>
                      <Badge variant="outline" className="text-red-600 border-red-600 bg-red-50">
                        Tinggi (61-80)
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Pengembang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Ns. Sulatri, M.Kep., Sp. Jiwa</h3>
                <p className="text-muted-foreground">Dosen Keperawatan Jiwa</p>
                <p className="text-muted-foreground">Poltekkes Kemenkes Tanjungkarang</p>
              </div>
              <Separator />
              <div className="text-center text-sm text-muted-foreground">
                <p>Instrumen ini dikembangkan sebagai bagian dari penelitian untuk meningkatkan 
                kesejahteraan mental perawat paliatif di Indonesia.</p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cara Penggunaan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Klik tombol "Mulai Kuesioner" pada halaman utama</li>
                  <li>Baca setiap pertanyaan dengan teliti</li>
                  <li>Pilih jawaban yang paling sesuai dengan kondisi Anda</li>
                  <li>Pastikan semua pertanyaan telah dijawab</li>
                  <li>Lihat hasil dan interpretasi pada halaman hasil</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}