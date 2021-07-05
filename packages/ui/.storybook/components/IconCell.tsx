import React, { FunctionComponent, ReactElement } from 'react';
import { VStack, Text, IconProps } from '@chakra-ui/react';

interface IconCellProps {
    icon: FunctionComponent<IconProps>;
};

const getIconName = (fullIconName: string) => fullIconName.replaceAll(/(Outlined|Solid|Icon)/g, '');

export const IconCell = ({ icon: Icon }: IconCellProps): ReactElement => (
    <VStack spacing={2}>
        <Icon boxSize={6} />
        <Text fontSize="sm">{getIconName(Icon.displayName)}</Text>
    </VStack>
);
