import { injectGlobal } from 'styled-components';
import { normalize, fontFace } from 'polished';

// inject global css
injectGlobal`
  ${normalize()}
  ${fontFace({
    'fontFamily': 'Menlo Regular',
    'fontFilePath': '/fonts/menlo-regular'
  })}
  ${fontFace({
    'fontFamily': 'Iropke Batang',
    'fontFilePath': '/fonts/IropkeBatangM'
  })}
`;
