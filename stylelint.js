const postcss = require('postcss');
const fs = require('fs');
const glob = require('glob');
const Promise = require('promise');

const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');

const pathStyle = './src/css';

glob('**/*.css', { cwd: pathStyle }, (err, files) => {
  if (err) {
    throw new Error(err);
  }

  const compiler = postcss([
    stylelint,
    postcssReporter({
      clearMessages: true,
    }),
  ]);

  const allPromises = [];

  files.forEach((file) => {
    const pathFile = `${pathStyle}/${file}`;

    const css = fs.readFileSync(pathFile, 'utf8');

    const promise = compiler.process(css, {
      from: pathFile,
      to: pathFile,
    });

    allPromises.push(promise);
  });

  Promise.all(allPromises);
});

