import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { publicRoutes } from "./routes";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/product" />} />
          {publicRoutes.map((route, id) => {
            const Layout = route.layout;
            const Page = route.component;
            return (
              <Route
                key={id}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
