import React, { FunctionComponent, ReactElement } from 'react';
import { VStack, Text } from '@chakra-ui/react';

interface IconCellProps {
    icon: FunctionComponent;
};

export const IconCell = ({ icon: Icon }: IconCellProps): ReactElement => (
    <VStack spacing={8}>
        <Icon />
        <Text>{Icon.displayName}</Text>
    </VStack>
);
