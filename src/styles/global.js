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
`;
