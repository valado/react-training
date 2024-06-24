import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CustomThemeProvider } from './app/theme/CustomThemeProvider';
import { ErrorBoundary } from './app/components/error/error-boundary';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { initI18n } from './app/i18n';

initI18n();
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
          </Suspense>
        </CustomThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
