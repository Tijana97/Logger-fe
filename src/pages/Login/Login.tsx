import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { string } from "yup";

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const emailSchema = string().email().required();
  const passwordSchema = string().required();

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
  }, [email]);

  useEffect(() => {
    /*
    const validatePassword = async () => {
      try {
        await passwordSchema.validate(password);
        setPasswordError(null);
      } catch (error: any) {
        setPasswordError(error.message);
      }
    };*/

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

    //validatePassword();
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
      } catch (error: any) {
        console.error("Login failed:", error);
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
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
