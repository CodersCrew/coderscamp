import React, { ReactElement } from 'react';
import { Grid } from '@chakra-ui/react';

interface IconsTableProps {
    children: ReactElement[];
};

export const IconsTable = ({ children }: IconsTableProps): ReactElement => (
    <Grid templateColumns="repeat(5, 1fr)" gap={32} my={32}>{children}</Grid>
);
