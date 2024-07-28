const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');
const withPWA = require('next-pwa');

const withNextIntl = createNextIntlPlugin();
const withPWAConfig = withPWA({dest: 'public'});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  withNx,
  withNextIntl,
  withPWAConfig
];

module.exports = composePlugins(...plugins)(nextConfig);

