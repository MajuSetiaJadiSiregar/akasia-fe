import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import DashboardLayout from './users/UserLayout';
import { theme } from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default MyApp;
