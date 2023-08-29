import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { string } from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | null>(null);

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
  }, [email, emailSchema]);

  useEffect(() => {
    const validateOnceMore = () => {
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
    validateOnceMore();
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      {loginError && (
        <Grid item xs={12}>
          <p style={{ color: "red" }}>{loginError}</p>
        </Grid>
      )}

      <Grid item xs={12}>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Link to="/register">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
