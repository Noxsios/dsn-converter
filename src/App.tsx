import { lazy, Suspense } from "react";
import { EuiPageTemplate, EuiErrorBoundary, EuiText, EuiSpacer, EuiLoadingChart, EuiLoadingContent } from "@elastic/eui";
import { createUseStyles } from "react-jss";
import { theme } from "./components/theme";
const SearchBar = lazy(() => import("./components/SearchBar"));
const Footer = lazy(() => import("./components/Footer"));
const Directory = lazy(() => import("./components/SearchDirectory"));

const useStyles = createUseStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    "& span": {
      height: theme.spacing(4),
      overflow: "visible",
      "& span": {
        width: theme.spacing(1),
      },
    },
  },
});

const LoadingChart = () => {
  const classes = useStyles(theme);
  return (
    <div className={classes.loading}>
      <EuiLoadingChart size="xl" />
    </div>
  );
};

function App() {
  return (
    <EuiErrorBoundary>
      <EuiPageTemplate template="centeredBody">
        <EuiText textAlign="center">
          <h2>DSN Converter</h2>
        </EuiText>
        <EuiSpacer size="m" />
        <Suspense fallback={<LoadingChart />}>
          <SearchBar />
          <EuiSpacer size="l" />
        </Suspense>
        <Suspense fallback={<EuiLoadingContent lines={1} />}>
          <Directory />
          <EuiSpacer size="l" />
        </Suspense>
        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </EuiPageTemplate>
    </EuiErrorBoundary>
  );
}

export default App;
