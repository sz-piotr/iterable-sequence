const dts = require('dts-bundle')

class DtsBundlePlugin {
  constructor(config) {
    this.config = config
  }
  apply(compiler) {
    compiler.plugin('done', () => dts.bundle(this.config))
  }
}

module.exports = DtsBundlePlugin
