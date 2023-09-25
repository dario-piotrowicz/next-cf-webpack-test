const path = require('path');

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
    /** @type {import('next').NextConfig} */
    const devConfig = {
        ...defaultConfig,
        webpack: (
            config,
            { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
          ) => {
              if(isServer && nextRuntime === 'edge') {
                config.plugins.unshift(
                    {
                      apply: (compiler) => {
                        compiler.hooks.compilation.tap(
                          "CfRequestPlugin",
                          (_compilation, { normalModuleFactory }) => {
                            normalModuleFactory.hooks.resolve
                              .tap("CfRequestPlugin", resourceData => {
                                if(resourceData.request === 'cloudflare:request-context') {
                                  resourceData.request = path.resolve(__dirname, 'cf-request-proxy.js');
                                }
                              });
                          }
                        );
                      },
                    }
                )
            }
            return config;
          },
    }

    return devConfig;
  }

  return {
    ...defaultConfig,
  }
}
