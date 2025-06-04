import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backUrl?: string;
}

export default function Header({ title, showBack = false, backUrl = '/' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href={backUrl}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Link>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Logo Kemenkes Poltekkes Tanjungkarang" 
              width={40} 
              height={40} 
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-primary">
              {title || 'K-DPPP'}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}