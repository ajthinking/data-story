import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>DataStory</span>,
  project: {
    link: 'https://github.com/ajthinking/data-story',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/ajthinking/data-story/blob/main/packages/docs',
  footer: {
    text: 'Built with Nextra',
  },
}

export default config
