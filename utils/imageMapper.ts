import { ImageSourcePropType } from 'react-native';

export const images: { [key: string]: ImageSourcePropType } = {
  '1735502381444.jpg': require('@/assets/images/1735502381444.jpg'),
  'unnamed.jpg': require('@/assets/images/unnamed.jpg'),
  'react-logo.png': require('@/assets/images/react-logo.png'),
  'android-icon-background.png': require('@/assets/images/android-icon-background.png'),
  'android-icon-foreground.png': require('@/assets/images/android-icon-foreground.png'),
  'android-icon-monochrome.png': require('@/assets/images/android-icon-monochrome.png'),
};

export function getImage(imageName: string): ImageSourcePropType {
  return images[imageName] || images['react-logo.png']; // Image par défaut
}