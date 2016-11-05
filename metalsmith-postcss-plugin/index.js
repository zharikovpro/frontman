const path = require('path');
const postcss = require('postcss');
const minimatch = require('minimatch');
const Promise = require('promise');

const normalizeMapOptions = (map) => {
  if (!map) {
    return undefined;
  }

  return {
    inline: (map === true) ? true : map.inline,
    prev: false, // Not implemented yet,
    sourcesContent: undefined, //Not implemented yet
    annotation: undefined, // Not implemented yet
  };
};

module.exports = (opts) => {
  const options = Object.assign({}, {
    pattern: ['**/*.css', '!**/_*/*', '!**/_*'],
    plugins: {},
    map: { inline: true },
    removeExcludes: false,
    path: './',
  }, opts);

  let plugin = undefined;
  const plugins = [];

  if (typeof(options.plugins) !== 'object') {
    throw new Error('[metalsmith-with-postcss] You must provide some PostCSS plugins.');
  }

  // Require each plugin, pass it it`s options
  // and add it to the plugins array.
  Object.keys(options.plugins).forEach((pluginName) => {
    const value = options.plugins[pluginName];

    if (!value) {
      return;
    }

    const pluginOptions = Object.assign({}, value);

    plugin = require(pluginName);
    plugins.push(plugin(pluginOptions));
  });

  const map = normalizeMapOptions(options.map);

  const processor = postcss(plugins);

  return (files, metalsmith, done) => {
    const styleFiles = Object.keys(files).filter(
      minimatch.filter(options.pattern[0], { matchBase: true  })
    );

    if (!styleFiles.length) {
      done();
      return;
    }

    const allPromises = [];

    styleFiles.forEach((file) => {

      const contents = files[file].contents.toString();
      const absolutePath = path.resolve(metalsmith.source(), options.path, file)
      
      const promise = processor.process(contents, {
        from: absolutePath,
        to: absolutePath,
        map: map,
      }).then((result) => {
        files[file].contents = new Buffer(result.css);

        if (result.map) {
          files[`${file}.map`] = {
            contents: new Buffer(JSON.stringify(result.map)),
            mode: files[file].mode,
            stats: files[file].stats,
          };
        }
      });

      allPromises.push(promise);
    });

    Promise.all(allPromises).then((result) => {
      done();
    }).catch((err) => {
      done(
        new Error("Error during postcss processing: " + JSON.stringify(error))
      );
    });
  };
};

