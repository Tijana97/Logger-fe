import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import axios from "axios";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import LoggerImage from "../../utils/images/Logger.png";

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  const emailSchema = string().email().required();
  document.body.style.backgroundColor = "#009696";

  useEffect(() => {
    const validateEmail = async () => {
      try {
        await emailSchema.validate(email);
        setEmailError(null);
      } catch (error: any) {
        setEmailError(error.message);
      }
    };

    validateEmail();
  }, [email, emailSchema]);

  useEffect(() => {
    const validatePassword = () => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#%])[A-Za-z0-9!#%]{8,32}$/;
      console.log(regex.test(password));
      if (regex.test(password)) {
        setPasswordError(null);
        console.log("I AM HERE");
      } else {
        setPasswordError(
          "Password must contain one uppercase, one lower case, one number and one special case character and be at least 8 digits long."
        );
      }
    };
    validatePassword();
  }, [password]);

  const handleLogin = async () => {
    setInitialLoad(false);
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post("http://localhost:8080/users/login", {
          email,
          password,
        });

        // Handle the response as needed
        console.log("Login successful!", response.data);
        setLoginError(null);
        const token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        navigate("/home");
      } catch (error: any) {
        console.error("Login failed:", error);
        setLoginError("Login failed. Username or password are incorrect.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#009696",
      }}
    >
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${LoggerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setInitialLoad(false);
                    }}
                    error={!!emailError && !initialLoad}
                    helperText={!initialLoad ? emailError : " "}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setInitialLoad(false);
                    }}
                    error={!!passwordError && !initialLoad}
                    helperText={!initialLoad ? passwordError : " "}
                  />

                  {loginError && (
                    <Grid item xs={12}>
                      <p style={{ color: "red" }}>{loginError}</p>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={handleLogin}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Log In
                      </Button>

                      <div>
                        <Link href="/register">
                          Don't hav an account? Sign up.
                        </Link>
                      </div>
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
