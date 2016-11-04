const postcss = require('postcss');
const fs = require('fs');

const pathCss = `${__dirname}/src/css/app.css`;

const css = fs.readFileSync(pathCss, 'utf8');

postcss([
  require('lost'),
  require('stylelint'),
  require('autoprefixer'),
  require('postcss-reporter')({
    clearMessages: true
  }),
]).process(css, {
  from: pathCss
}).catch((err) => {
  console.log(err.stack);
});

