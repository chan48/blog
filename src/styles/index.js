import { style } from 'glamor'
import { colors } from './colors'
import { rhythm } from '../utils/typography'
import media from './media';
import { TypographyStyle } from 'react-typography';
import animations from './animations';
import sizes from './sizes';

export default {
  animations: animations,
  media: media,
  sizes: sizes,
  colors: colors,
  verticalPadding: style({
    padding: rhythm(3 / 4),
  }),
  container: style({
    maxWidth: `37rem`,
    margin: `0 auto`,
  }),
}
