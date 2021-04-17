import { lazy, Suspense } from "react";
import { EuiPageTemplate, EuiErrorBoundary, EuiText, EuiLoadingChart, EuiLoadingContent, EuiFlexItem, EuiFlexGroup } from "@elastic/eui";
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
  spacer: {
    paddingBottom: theme.spacing(1),
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
  const classes = useStyles(theme);

  return (
    <EuiErrorBoundary>
      <EuiPageTemplate template="centeredBody">
        <EuiFlexGroup direction="column" justifyContent="spaceAround" gutterSize="m" responsive={false}>
          <EuiFlexItem>
            <EuiText textAlign="center">
              <h2>DSN Converter</h2>
            </EuiText>
          </EuiFlexItem>
          {/* SPACER */}
          <Suspense fallback={<LoadingChart />}>
            <EuiFlexItem className={classes.spacer}>
              <SearchBar />{" "}
            </EuiFlexItem>
          </Suspense>
          {/* SPACER */}
          <Suspense fallback={<EuiLoadingContent lines={1} />}>
            <EuiFlexItem className={classes.spacer}>
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
