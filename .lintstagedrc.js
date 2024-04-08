module.exports = {
  // This will lint and format TypeScript and JavaScript files
  '**/*.(json,ts,md)': [`prettier --write `, `eslint --fix`],
}
