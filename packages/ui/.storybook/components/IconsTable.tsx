import React, { ReactElement } from 'react';
import { Grid } from '@chakra-ui/react';

interface IconsTableProps {
    children: ReactElement[];
};

export const IconsTable = ({ children }: IconsTableProps): ReactElement => (
    <Grid templateColumns="repeat(6, 1fr)" gap={8} my={8}>{children}</Grid>
);
