import { style } from 'glamor'
import { colors } from './colors'
import { rhythm } from '../utils/typography'
import media from './media';
import { TypographyStyle } from 'react-typography';

const animations = {
  animationCurveFastOutSlowIn: `cubic-bezier(0.4, 0, 0.2, 1)`,
  animationCurveLinearOutSlowIn: `cubic-bezier(0, 0, 0.2, 1)`,
  animationCurveFastOutLinearIn: `cubic-bezier(0.4, 0, 1, 1)`,
  animationCurveDefault: `cubic-bezier(0.4, 0, 0.2, 1)`,
  animationSpeedDefault: `250ms`,
  animationSpeedFast: `200ms`,
  animationSpeedSlow: `300ms`,
}

const size = {
  postWidth: '740px',
  topNavHeight: '3rem',
  footerHeight: '3.5rem',
  mainWidthDesktop: '1020px',
}

export default {
  animations: animations,
  media: media,
  size: size,
  colors: colors,
  verticalPadding: style({
    padding: rhythm(3 / 4),
  }),
  container: style({
    maxWidth: `37rem`,
    margin: `0 auto`,
  }),
}
