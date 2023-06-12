/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: 'Portal JS',
  media: 'media',
  hideGenerator: true,
  excludePrivate: true,
  sidebarLinks: {
    Github: 'https://github.com/meetportal/portal-js',
    Website: 'https://meetportal.com',
    // 'Developer Console': 'https://marketplace.meetportal.com/developer',
    'Getting Started': 'https://meetportal.com/developers/getting-started',
  },
  disableSources: true,
  // theme: 'just-the-docs',
  plugin: './typedoc-plugins/defaults.cjs',
  customCss: './theme/style.css',
}
