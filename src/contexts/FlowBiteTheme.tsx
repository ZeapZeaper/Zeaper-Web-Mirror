import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import { ReactNode } from 'react';

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-primary hover:bg-gold text-white',
    },
  },
  badge: {
    root: {
      color: {
        primary: 'bg-primary hover:bg-gold text-lightGold',
      },
    },
  },
};

const FlowBiteTheme = ({ children }: { children: ReactNode }) => {
  return <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>;
};

export default FlowBiteTheme;
