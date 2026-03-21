import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CS & Dev Notes',
  tagline: 'Deep dives into engineering, systems, databases, and architecture from first principles.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://DeshDeepakKant.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Backend-Notes/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DeshDeepakKant', // Usually your GitHub org/user name.
  projectName: 'Backend-Notes', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      { name: 'keywords', content: 'computer science, engineering, architecture, systems, backend, frontend, devops, databases, distributed systems' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CS & Dev Notes',
      logo: {
        alt: 'CS Notes Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Select Version',
          position: 'right',
          items: [
            { label: '--- Backend ---', to: '#' },
            { label: 'Version 3 (Raw)', to: '/docs/Backend Engineering/Version 3/Roadmap_for_backend_from_first_principles' },
            { label: 'Version 2 (Modern)', to: '/docs/Backend Engineering/Version 2/Roadmap' },
            { label: 'Version 1 (Core)', to: '/docs/Backend Engineering/Version 1/Roadmap_for_backend_from_first_principles' },
            
            { label: '--- DevOps ---', to: '#' },
            { label: 'Version 2', to: '/docs/DevOps/Version 2/intro' },
            { label: 'Version 1', to: '/docs/DevOps/Version 1/intro' },

            { label: '--- System Design ---', to: '#' },
            { label: 'Version 2', to: '/docs/System Design/Version 2/intro' },
            { label: 'Version 1', to: '/docs/System Design/Version 1/intro' },

            { label: '--- Operating System ---', to: '#' },
            { label: 'Version 2', to: '/docs/Operating System/Version 2/intro' },
            { label: 'Version 1', to: '/docs/Operating System/Version 1/intro' },

            { label: '--- DBMS ---', to: '#' },
            { label: 'Version 2', to: '/docs/DBMS/Version 2/intro' },
            { label: 'Version 1', to: '/docs/DBMS/Version 1/intro' },

            { label: '--- Computer Network ---', to: '#' },
            { label: 'Version 2', to: '/docs/Computer Network/Version 2/intro' },
            { label: 'Version 1', to: '/docs/Computer Network/Version 1/intro' },
          ],
        },
        {
          href: 'https://github.com/DeshDeepakKant/Backend-Notes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            {
              label: 'Roadmap',
              to: '/docs/Backend Engineering/Version 2/Roadmap',
            },
            {
              label: 'System Design',
              to: '/docs/System Design/Version 1/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DeshDeepakKant/Backend-Notes',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CS & Dev Notes. Focused on First Principles.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
