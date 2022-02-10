import React from 'react'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import { StyleSheetManager } from 'styled-components';
import RtlPlugin from 'stylis-plugin-rtl';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [RtlPlugin],
});
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RtlProvider(props) {
  return (
    <CacheProvider value={cacheRtl}>
      <StyleSheetManager stylisPlugins={[RtlPlugin]}>
        <StylesProvider jss={jss}>
          {props.children}
        </StylesProvider>
      </StyleSheetManager>
    </CacheProvider>
  )
}
export default RtlProvider

