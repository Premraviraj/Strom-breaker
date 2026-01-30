export type ThemeType = 'minimalist' | 'extrovert';

export interface Theme {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  styles: {
    cardClass: string;
    buttonClass: string;
    headerClass: string;
    backgroundClass: string;
    shadowClass: string;
  };
}

export const themes: Record<ThemeType, Theme> = {
  minimalist: {
    id: 'minimalist',
    name: 'MINIMALIST ME',
    description: 'Clean, simple, and focused',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e5e5e5',
    },
    styles: {
      cardClass: 'bg-white border border-gray-200 shadow-sm',
      buttonClass: 'bg-black text-white hover:bg-gray-800 border-none',
      headerClass: 'text-black font-light',
      backgroundClass: 'bg-white',
      shadowClass: 'shadow-sm',
    },
  },
  extrovert: {
    id: 'extrovert',
    name: 'EXTROVERT ME',
    description: 'Neo brutalism with bold colors',
    colors: {
      primary: '#ff0080',
      secondary: '#00ff80',
      accent: '#ffff00',
      background: '#000000',
      surface: '#ffffff',
      text: '#000000',
      textSecondary: '#333333',
      border: '#000000',
    },
    styles: {
      cardClass: 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000]',
      buttonClass: 'bg-yellow-400 text-black hover:bg-pink-500 hover:text-white border-4 border-black shadow-[4px_4px_0px_0px_#000000] font-bold',
      headerClass: 'text-black font-black uppercase',
      backgroundClass: 'bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400',
      shadowClass: 'shadow-[8px_8px_0px_0px_#000000]',
    },
  },
};