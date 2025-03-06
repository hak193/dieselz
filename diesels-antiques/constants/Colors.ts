export const Colors = {
  light: {
    primary: '#8B4513', // Saddle Brown - representing wood/antiques
    secondary: '#DAA520', // Goldenrod - for accents
    background: '#FAF9F6', // Off-white - antique paper look
    text: '#2C1810', // Dark brown - for readability
    border: '#D2691E', // Chocolate - for subtle borders
    card: '#FFFFFF', // White - for cards
    accent: '#B8860B', // Dark golden - for special elements
    error: '#8B0000', // Dark red - for errors
    success: '#2E8B57', // Sea green - for success states
    muted: '#A0522D', // Brown - for muted elements
  },
  dark: {
    primary: '#B8860B', // Darker gold for dark mode
    secondary: '#8B4513', // Saddle brown for accents in dark mode
    background: '#2C1810', // Very dark brown - main background
    text: '#FAF9F6', // Off-white - for text
    border: '#DAA520', // Gold - for borders
    card: '#3D2B1F', // Darker brown - for cards
    accent: '#D2691E', // Chocolate - for special elements
    error: '#FF6B6B', // Lighter red - for errors
    success: '#66CDAA', // Medium aquamarine - for success states
    muted: '#8B7355', // Khaki - for muted elements
  },
};

// Theme-independent colors
export const SharedColors = {
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;
