import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { Logo } from './components/logo'

const config: DocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'https://github.com/ajthinking/data-story',
  },
  docsRepositoryBase: 'https://github.com/ajthinking/data-story/blob/main/packages/docs',
  footer: {
    // text: 'Built with Nextra',
  },
}

export default config
