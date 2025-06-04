'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BiodataFormData {
  nama: string;
  umur: string;
  tanggalLahir: string;
}

interface BiodataFormProps {
  onSubmit: (data: BiodataFormData) => void;
  initialData?: BiodataFormData;
}

export function BiodataForm({ onSubmit, initialData }: BiodataFormProps) {
  const [formData, setFormData] = useState<BiodataFormData>({
    nama: initialData?.nama || '',
    umur: initialData?.umur || '',
    tanggalLahir: initialData?.tanggalLahir || '',
  });

  const handleInputChange = (field: keyof BiodataFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.nama || !formData.umur || !formData.tanggalLahir) {
      alert('Mohon lengkapi semua data yang wajib diisi');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Data Responden</CardTitle>
        <CardDescription className="text-center">
          Mohon lengkapi data diri Anda sebelum mengisi kuesioner
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Lengkap</Label>
            <Input
              id="nama"
              type="text"
              value={formData.nama}
              onChange={(e) => handleInputChange('nama', e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          {/* Umur */}
          <div className="space-y-2">
            <Label htmlFor="umur">Umur</Label>
            <Input
              id="umur"
              type="number"
              value={formData.umur}
              onChange={(e) => handleInputChange('umur', e.target.value)}
              placeholder="Umur (tahun)"
              min="18"
              max="70"
              required
            />
          </div>

          {/* Tanggal Lahir */}
          <div className="space-y-2">
            <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
            <Input
              id="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg">
              Lanjutkan ke Kuesioner
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Export the interface for use in other files
export type { BiodataFormData };