import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design reference dimensions (iPhone 14 / typical modern phone).
// All sizes in the app are scaled relative to this baseline so the UI
// stays proportional on smaller and larger screens.
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/** Scales a size proportionally to the screen width. */
export const scale = (size: number): number => (SCREEN_WIDTH / BASE_WIDTH) * size;

/** Scales a size proportionally to the screen height. */
export const verticalScale = (size: number): number => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Scales a size with a moderation factor — best for font sizes so text
 * doesn't grow/shrink as aggressively as layout dimensions.
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;
