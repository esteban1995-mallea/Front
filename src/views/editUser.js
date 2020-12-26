import React from "react";
import {useState} from "react";
import Drawer from "../component/drawer";
import {Redirect} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Apis from "../services/api";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },

  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function Album() {
  const currencies = [
    {
      value: "true",
      label: "Administrador"
    },
    {
      value: "false",
      label: "Usuario"
    }
  ];

  let history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  let userinfo = localStorage.getItem("userEdit");
  let usuario_edit = JSON.parse(userinfo);
  let token = localStorage.getItem("token");


  const [user, setUser] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    admin: ""
  });

  function onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]: value});
  }

  function logout() {
    localStorage.clear();
    setRedirect(true);
  }

  console.log(user);
  async function Enviar(e) {
    e.preventDefault();

    let usuario = {
      id: usuario_edit.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password,
      admin: user.admin
    };

    await Apis.update(usuario);
    user.id = usuario_edit.id;
    console.log(user);
    history.push("/controluser");
  }

  if (redirect === true) {
    return <Redirect push to="/" />;
  }

  if (token) {
    return (
      <React.Fragment>
        <CssBaseline />

        <AppBar position="static">
          <Toolbar>
            <Drawer />
            <Typography variant="h6" edge="start" className={classes.title}>
              Metereologia
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="nombre"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="nombre"
                      autoFocus
                      onChange={onChange}
                      value={user.nombre}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="apellido"
                      label="Apellido"
                      name="apellido"
                      onChange={onChange}
                      value={user.apellido}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Ingrese nuevo email"
                      name="email"
                      autoComplete="email"
                      onChange={onChange}
                      value={user.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={user.password}
                      onChange={onChange}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Ingrese nueva password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="standard-select-currency"
                      select
                      variant="outlined"
                      required
                      fullWidth
                      name="admin"
                      label="Rol de usuario"
                      value={user.admin}
                      onChange={onChange}
                      helperText="ingrese nuevo rol de usuario."
                    >
                      {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={Enviar}
                      color="primary"
                      className={classes.submit}
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        </main>
      </React.Fragment>
    );
  } else {
    return <div>No hay permisos, inicie sesion</div>;
  }
}
