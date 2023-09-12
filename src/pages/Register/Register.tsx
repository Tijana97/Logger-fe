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

const Register: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  document.body.style.backgroundColor = "#009696";

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [surnameError, setSurnameError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const emailSchema = string().email().required();

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
  }, [emailSchema, email]);

  useEffect(() => {
    const validatePassword = () => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#%])[A-Za-z0-9!#%]{8,32}$/;
      if (regex.test(password)) {
        setPasswordError(null);
      } else {
        setPasswordError(
          "Password must contain one uppercase, one lower case, one number and one special case character and be at least 8 digits long."
        );
      }
    };
    validatePassword();
  }, [password]);

  useEffect(() => {
    const comparePasswords = () => {
      if (password === repeatPassword) {
        setRepeatPasswordError(null);
      } else {
        setRepeatPasswordError("Passwords don't match.");
      }
    };
    comparePasswords();
  }, [password, repeatPassword]);

  useEffect(() => {
    const validateName = () => {
      if (name !== "") {
        setNameError(null);
      } else {
        setNameError("Name fileld can't be empty.");
      }
    };
    validateName();
  }, [name]);

  useEffect(() => {
    const validateSurame = () => {
      if (surname !== "") {
        setSurnameError(null);
      } else {
        setSurnameError("Surname fileld can't be empty.");
      }
    };
    validateSurame();
  }, [surname]);

  const handleRegister = async () => {
    setInitialLoad(false);
    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      !surnameError &&
      !repeatPasswordError
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/register",
          {
            name,
            surname,
            email,
            password,
          }
        );

        // Handle the response as needed
        console.log("Registration successful!", response.data);
        setRegisterError(null);

        const login = await axios.post("http://localhost:8080/users/login", {
          email,
          password,
        });

        const token = login.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", login.data.token);
        console.log(login.data.token);
        navigate("/home");
      } catch (error: any) {
        console.error("Registration failed:", error);
        setRegisterError(
          "Email you selected already exists in the database. Log in or use a different email for registration."
        );
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
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setInitialLoad(false);
                    }}
                    error={!!nameError && !initialLoad}
                    helperText={
                      !initialLoad ? (
                        <div style={{ height: "30px" }}>{nameError}</div>
                      ) : (
                        " "
                      )
                    }
                  />
                  <TextField
                    label="Surname"
                    variant="outlined"
                    fullWidth
                    value={surname}
                    onChange={(e) => {
                      setSurname(e.target.value);
                      setInitialLoad(false);
                    }}
                    error={!!surnameError && !initialLoad}
                    helperText={
                      !initialLoad ? (
                        <div style={{ height: "30px" }}>{surnameError}</div>
                      ) : (
                        " "
                      )
                    }
                  />
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
                    helperText={
                      !initialLoad ? (
                        <div style={{ height: "30px" }}>{emailError}</div>
                      ) : (
                        " "
                      )
                    }
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
                    helperText={
                      !initialLoad ? (
                        !!passwordError ? (
                          <div style={{ height: "70px" }}>{passwordError}</div>
                        ) : (
                          " "
                        )
                      ) : (
                        " "
                      )
                    }
                  />
                  <TextField
                    label="RepeatPassword"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                      setInitialLoad(false);
                    }}
                    error={!!repeatPasswordError && !initialLoad}
                    helperText={
                      !initialLoad ? (
                        <div style={{ height: "0px" }}>
                          {repeatPasswordError}
                        </div>
                      ) : (
                        " "
                      )
                    }
                  />
                  {registerError && (
                    <Grid item xs={12}>
                      <p style={{ color: "red" }}>{registerError}</p>
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
                        onClick={handleRegister}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>

                      <div>
                        <Link href="/login">Alrady a user? Log in.</Link>
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

export default Register;
