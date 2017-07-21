import { injectGlobal } from 'styled-components';
import { fontFace } from 'polished';

// inject global css
injectGlobal`
  ${fontFace({
    'fontFamily': 'Menlo Regular',
    'fontFilePath': '/fonts/menlo-regular'
  })}
  ${fontFace({
    'fontFamily': 'Iropke Batang',
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
`;
