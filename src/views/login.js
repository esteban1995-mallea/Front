import React, {useState, useEffect} from "react";
import Apis from "./../services/api";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
let ok = false;
export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();
  const [formErrors, setFormErrors] = useState({});

  const [user, setUser] = useState({email: "", password: ""});

  function onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]: value});
  }

  async function Enviar(e) {
    e.preventDefault();

    setFormErrors(validate(user));

    let response = await Apis.login(user);
    console.log("response:"+response)

    if (response === "ok") {
          ok = true;
    }


    if (Object.keys(formErrors).length === 0 && ok === true) {
    history.push("/home");
    }

  }


  const validate = values => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Campo en blanco";
    } else if (!regex.test(values.email)) {
      errors.email = "Formato de email invalido";
    }
    if (!values.password) {
      errors.password = "campo en blanco ";
    } else if (values.password.length < 4) {
      errors.password = "Password debe tener mas de 4 caracteres";
    }
    return errors;
  };



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} Validate>
            <TextField
              value={user.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              valid
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              className={formErrors.email && "input-error"}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
            <TextField
              className={formErrors.password && "input-error"}
              value={user.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={Enviar}
            >
              Entrar
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Registrarse"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
