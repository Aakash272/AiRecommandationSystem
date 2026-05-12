import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { logout, setCredentials } from "./store/authSlice";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import { Routes, Route } from "react-router-dom";
import ActivityDetail from "./components/ActivityDetail";
import theme from "./theme";

const ActivitiesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      <Box sx={{ mt: 4 }}>
        <ActivityList />
      </Box>
    </Container>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}>
              AIRecommendation
            </Typography>
            {!token ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  logIn();
                }}
              >
                LOGIN
              </Button>
            ) : (
              <Button variant="outlined" color="primary" onClick={logOut}>
                LogOut
              </Button>
            )}
          </Toolbar>
        </AppBar>
        
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", pb: 4 }}>
           {!token ? (
             <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  Welcome to AIRecommendation
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Get personalized AI-powered insights and recommendations. Please login to continue.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => logIn()}
                  sx={{ mt: 2 }}
                >
                  Get Started
                </Button>
             </Container>
           ) : (
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route
                  path="/"
                  element={
                    token ? (
                      <Navigate to="/activities" replace />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
              </Routes>
           )}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
