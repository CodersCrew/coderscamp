const path = require('path');
const fs = require('fs');

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, 'package.json'))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(`Could not find package.json in the parent directories starting from ${filepath}.`);
    }
    currDir = dir;
  }
}

/**
 * Adjusts Storybook's webpack config to make it compatible with Emotion 11.
 * @param {Object} config - webpack config provided by Storybook
 * @returns passed config with adjustments that allows Storybook to work with emotion.
 * @see {@link https://stackoverflow.com/questions/65894711/module-not-found-error-cant-resolve-emotion-styled-base-when-running-story}
 */
const addEmotionConfig = (config) => {
  config.resolve.alias['@emotion/core'] = getPackageDir('@emotion/react');
  config.resolve.alias['@emotion/styled'] = getPackageDir('@emotion/styled');
  config.resolve.alias['emotion-theming'] = getPackageDir('@emotion/react');

  return config;
};

module.exports = { addEmotionConfig };
