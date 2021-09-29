/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EuiErrorBoundary, EuiFlexGroup, EuiFlexItem, EuiLoadingChart, EuiLoadingContent, EuiPageTemplate, EuiText } from '@elastic/eui';
import { Suspense, lazy } from 'react';

const SearchBar = lazy(() => import('./components/SearchBar'));
const Footer = lazy(() => import('./components/Footer'));
const Directory = lazy(() => import('./components/SearchDirectory'));

const LoadingChart = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        margin-bottom: 3rem;
        span {
          height: 4rem;
          overflow: visible;
          span {
            width: 1rem;
          }
        }
      `}
    >
      <EuiLoadingChart size='xl' />
    </div>
  );
};

const morePadding = css`
  padding-bottom: 1rem;
`;

function App() {
  return (
    <EuiErrorBoundary>
      <EuiPageTemplate template='centeredBody'>
        <EuiFlexGroup direction='column' justifyContent='spaceAround' gutterSize='m' responsive={false}>
          <EuiFlexItem>
            <EuiText textAlign='center'>
              <h2> DSN Converter </h2>
            </EuiText>
          </EuiFlexItem>
          {/* SPACER */}
          <Suspense fallback={<LoadingChart />}>
            <EuiFlexItem>
              <SearchBar />
            </EuiFlexItem>
          </Suspense>
          {/* SPACER */}
          <Suspense fallback={<EuiLoadingContent lines={1} />}>
            <EuiFlexItem css={morePadding}>
              <Directory />
            </EuiFlexItem>
          </Suspense>
          {/* SPACER */}
          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>
        </EuiFlexGroup>
      </EuiPageTemplate>
    </EuiErrorBoundary>
  );
}

export default App;
