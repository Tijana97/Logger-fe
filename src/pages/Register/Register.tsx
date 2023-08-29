import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { string } from "yup";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          "Email ypu selected already exists in the database. Log in or use a different email for registration."
        );
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
          helperText={!initialLoad ? nameError : " "}
        />
      </Grid>
      <Grid item xs={12}>
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
          helperText={!initialLoad ? surnameError : " "}
        />
      </Grid>
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
          helperText={!initialLoad ? repeatPasswordError : " "}
        />
      </Grid>
      {registerError && (
        <Grid item xs={12}>
          <p style={{ color: "red" }}>{registerError}</p>
        </Grid>
      )}
      <Grid item xs={12}>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
