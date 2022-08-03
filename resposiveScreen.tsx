
import { } from 'react-native';
import { responsiveScreenHeight as hp, responsiveScreenWidth as wp , responsiveScreenFontSize as fp} from 'react-native-responsive-dimensions';

const FIGMA_WIDTH = 390;
const FIGMA_HEIGHT = 844;

export function ScreenWidth(width: number) {
    const percentWidth = width / FIGMA_WIDTH * 100
    return (wp(percentWidth))
}

export function ScreenHEIGHT(height: number) {
    const percentHeight = height/ FIGMA_HEIGHT * 100
    return (hp(percentHeight))
}

export function ScreenFONT(font: number) {
    const percentFont = font * 0.135;
    return (fp(percentFont))
}