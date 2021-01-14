import React from "react";
import {Redirect} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "../component/drawer";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Tabla from "./../component/table";
import {useState} from "react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
    minWidth: "80%"
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
    backgroundColor: "#3f51b5",
    padding: theme.spacing(6)
  }
}));

export default function Album() {
  let user = localStorage.getItem("userinfo");

  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();
  let token = localStorage.getItem("token");

  async function logout() {
    localStorage.clear();
    setRedirect(true);
  }

  if (redirect === true) {
    return <Redirect push to="/" />;
  }

  if (token) {
    if (user === 'true') {
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
              <Tabla />
            </div>
          </main>

          {/* Footer */}
          <footer className={classes.footer}>
            <Typography
              variant="h6"
              align="center"
              style={{color: "#fff"}}
              gutterBottom
            >
              Estacion metereologica
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              style={{color: "#fff"}}
              component="p"
            >
              Sistema basado en la placa de desarollo NodeMCU
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>
      );
    }
  } else {
  }
  return <div>No hay permisos de usuario</div>;
}
