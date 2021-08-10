const path = require('path');

const findProps = (identifier) => identifier.name === 'props';

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

const removeProp = (jsx) => (propName) => {
  jsx.openingElement.attributes = jsx.openingElement.attributes.filter(
    (attribute) => attribute.type !== 'JSXAttribute' || attribute.name.name !== propName,
  );
};

/* eslint-enable no-param-reassign */

const templateFunction = ({ template, types }, opts, { componentName, props, jsx }) => {
  const plugins = ['jsx', 'typescript'];
  const typeScriptTpl = template.smart({ plugins });
  const name = componentName.name.replace('Svg', '');

  setElementName(jsx)('chakra.svg');
  addComponentProp(jsx, types, props)('props', "HTMLChakraProps<'svg'>");
  addRef(jsx, types)('svgRef', 'ref');
  removeProp(jsx)('width');
  removeProp(jsx)('height');
  removeProp(jsx)('xmlns');
  removeProp(jsx)('fill');

  const newLine = '\n\n';

  return typeScriptTpl.ast`
    import React, { forwardRef } from 'react';
    import { chakra, HTMLChakraProps } from "@chakra-ui/react"
    ${newLine}
    export const ${name} = forwardRef((${props}) => (${jsx}));
    ${newLine}
    ${name}.displayName = '${name}';
  `;
};

const indexTemplateFunction = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));

    return `export { ${basename} } from './${basename}';`;
  });

  return `${exportEntries.join('\n')}\n`;
};

module.exports = {
  icon: true,
  typescript: true,
  ref: true,
  template: templateFunction,
  indexTemplate: indexTemplateFunction,
};
