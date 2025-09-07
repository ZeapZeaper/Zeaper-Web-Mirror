'use client';

import type { FC } from 'react';
import React from 'react';

import ButtonCircle2 from '../Button/ButtonCircle2';

interface VariantProps {
  sizes?: string;
}

const Variant: FC<VariantProps> = ({ sizes = 'w-4 h-4' }) => {
  return (
    <div className="flex items-center gap-3">
      <ButtonCircle2
        className="bg-blue-500 ring ring-transparent focus:ring-blue-300"
        size={sizes}
      />
      <ButtonCircle2
        className="bg-yellow-500 ring ring-transparent focus:ring-yellow-300"
        size={sizes}
      />
      <ButtonCircle2
        className="bg-green-500 ring ring-transparent focus:ring-green-300"
        size={sizes}
      />
    </div>
  );
};

export default Variant;
