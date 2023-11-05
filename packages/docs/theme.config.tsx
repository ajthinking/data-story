import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span className="font-bold tracking-wide font-mono text-blue-400">
    {'<DataStory />'}
  </span>,
  project: {
    link: 'https://github.com/ajthinking/data-story',
  },
  docsRepositoryBase: 'https://github.com/ajthinking/data-story/blob/main/packages/docs',
  footer: {
    text: 'Built with Nextra',
  },
}

export default config
