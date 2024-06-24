import { AppBar, Box, Button, Stack } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useComponentsTranslation } from 'src/app/i18n';

export const AppContainer = () => {
  const { t } = useComponentsTranslation('AppContainer');
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <AppBar position="static">
        <Stack direction="row">
          <NavLink to="/home">
            {({ isActive }) => (
              <Button
                variant={isActive ? 'contained' : 'text'}
                color="secondary"
                sx={{ borderRadius: 0 }}
              >
                {t('home')}
              </Button>
            )}
          </NavLink>
          <NavLink to="/notes">
            {({ isActive }) => (
              <Button
                variant={isActive ? 'contained' : 'text'}
                color="secondary"
                sx={{ borderRadius: 0 }}
              >
                {t('notes')}
              </Button>
            )}
          </NavLink>
          <NavLink to="/issues">
            {({ isActive }) => (
              <Button
                variant={isActive ? 'contained' : 'text'}
                color="secondary"
                sx={{ borderRadius: 0 }}
              >
                {t('issues')}
              </Button>
            )}
          </NavLink>
        </Stack>
      </AppBar>
      <Outlet />
    </Box>
  );
};
