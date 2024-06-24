import { Box } from '@mui/material';
import { FC } from 'react';
import { IssuesTable } from '../../components/issues-table';

export const IssueTracker: FC = () => {
  return (
    <Box sx={{ width: 'calc(100% - 2rem)', height: '100%', mx: '1rem' }}>
      <h1>Issue Tracker</h1>

      <IssuesTable />
    </Box>
  );
};
