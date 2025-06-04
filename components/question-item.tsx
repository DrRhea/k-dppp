'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Question } from '@/lib/questions';

interface QuestionItemProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
}

export function QuestionItem({ question, value, onChange }: QuestionItemProps) {
  return (
    <Card className="p-4">
      <div className="mb-3">
        <h3 className="text-base font-medium">{question.id}. {question.text}</h3>
      </div>
      
      <RadioGroup
        value={value === -1 ? undefined : value.toString()}
        onValueChange={(val) => onChange(parseInt(val, 10))}
        className="space-y-2"
      >
        <div className="grid grid-cols-5 gap-1 sm:gap-3">
          {[0, 1, 2, 3, 4].map((rating) => (
            <div key={rating} className="flex flex-col items-center">
              <RadioGroupItem
                value={rating.toString()}
                id={`q${question.id}-${rating}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`q${question.id}-${rating}`}
                className="flex h-12 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 bg-popover p-1 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-sm font-semibold">{rating}</span>
                <span className="text-[9px] sm:text-xs font-normal leading-tight">
                  {getRatingLabel(rating)}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
}

function getRatingLabel(rating: number): string {
  switch (rating) {
    case 0: return 'Tidak sama sekali';
    case 1: return 'Sedikit';
    case 2: return 'Cukup';
    case 3: return 'Banyak';
    case 4: return 'Sangat banyak';
    default: return '';
  }
}