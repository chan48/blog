import { injectGlobal } from 'styled-components';
import { fontFace } from 'polished';
import { rhythm } from '../utils/typography';

// inject global css
injectGlobal`
  ${fontFace({
    'fontFamily': 'Menlo Regular',
    'fontFilePath': '/fonts/menlo-regular'
  })}
  ${fontFace({
    'fontFamily': 'Iropke Batang',
    'fileFormats': ['eot', 'woff'],
    'fontFilePath': '/fonts/IropkeBatangM'
  })}
  ${fontFace({
    'fontFamily': 'Noto Sans KR',
    'fontWeight': 100,
    'fontFilePath': 'http://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin'
  })}
  ${fontFace({
    'fontFamily': 'Noto Sans KR',
    'fontWeight': 400,
    'fontFilePath': 'http://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular'
  })}
  ${fontFace({
    'fontFamily': 'Noto Sans KR',
    'fontWeight': 700,
    'fontFilePath': 'http://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold'
  })}

  .iframe-video-wrapper {
    position: relative;
    display: block;
    padding-bottom: 56.25%;
    margin: 3.2rem 0;
  }

  .iframe-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
