const path = require('path');

const findProps = (identifier) => identifier.name === 'props';

const removeSizeInfo = (str) => str.replace(/\d{2}Px/, '');

/* eslint-disable no-param-reassign */
const setElementName = (jsx) => (elementName) => {
  jsx.openingElement.name.name = elementName;
  jsx.closingElement.name.name = elementName;
};

const addComponentProp = (jsx, types, props) => (paramName, paramType) => {
  jsx.openingElement.attributes.push(types.jSXSpreadAttribute(types.identifier(paramName)));
  props.find(findProps).typeAnnotation = types.typeAnnotation(types.genericTypeAnnotation(types.identifier(paramType)));
};

const addRef = (jsx, types) => (inputPropName, outputPropName) => {
  jsx.openingElement.attributes.push(
    types.jSXAttribute(
      types.jSXIdentifier(outputPropName),
      types.jSXExpressionContainer(types.identifier(inputPropName)),
    ),
  );
};
/* eslint-enable no-param-reassign */

const templateFunction = ({ template, types }, opts, { componentName, props, jsx }) => {
  const plugins = ['jsx', 'typescript'];
  const typeScriptTpl = template.smart({ plugins });
  const name = `${componentName.name.replace('Svg', '')}Icon`;

  setElementName(jsx)('Icon');
  addComponentProp(jsx, types, props)('props', "Omit<IconProps, 'css'>");
  addRef(jsx, types)('svgRef', 'ref');

  const newLine = '\n\n';

  return typeScriptTpl.ast`
    import React, { forwardRef } from 'react';
    import { Icon, IconProps } from '@chakra-ui/react';
    ${newLine}
    export const ${name} = forwardRef((${props}) => (${jsx}));
    ${newLine}
    ${name}.displayName = '${name}';
  `;
};

const indexTemplateFunction = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const name = removeSizeInfo(basename);

    return `export { ${name}Icon } from './${basename}';`;
  });

  return `${exportEntries.join('\n')}\n`;
};

module.exports = {
  icon: true,
  typescript: true,
  ref: true,
  replaceAttrValues: {
    '#000': 'currentColor',
  },
  template: templateFunction,
  indexTemplate: indexTemplateFunction,
};
