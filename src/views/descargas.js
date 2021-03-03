import React, {useState, useEffect} from "react";
import Drawer from "../component/drawer";
import ExportJsonExcel from "js-export-excel";
import {Redirect} from "react-router-dom";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid, Box} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "50%",
    height: "70%",
    margin: "20%"
  },
  root2: {
    marginRight: theme.spacing(10),
    width: "80%",
    height: "80%"
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
    padding: theme.spacing(8, 0, 6),
    alignContent: "center"
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

const backend = "http://3.140.194.52:5050";

export default function Album() {
  const token = localStorage.getItem("token");
  const [date, changeDate] = useState(new Date());
  const [date2, changeDate2] = useState(new Date());
  const [mindate, changeMindate] = useState(new Date());
  const [maxdate, changeMaxdate] = useState(new Date());
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const rangoDatos = async () => {
      const token1 = localStorage.getItem("token");

      let data = axios
        .get(`${backend}/metereologias/data/rangofechas`, {
          headers: {"x-access-token": token1}
        })
        .then(function(response) {
          data = response.data.data.metereologias;
          console.log(data)
          changeMindate(response.data.data.metereologias[0]);
          changeMaxdate(response.data.data.metereologias[1]);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
    rangoDatos();
  }, []);

  function logout() {
    localStorage.clear();
    setRedirect(true);
  }

  function descargar_datos() {
    let token = localStorage.getItem("token");
    let data;

    console.log("max"+date);
    console.log("min"+date2);
    data = axios
      .post(
        `${backend}/metereologias/data/fechasfiltradas`,
        {min: date, max: date2},
        {
          headers: {"x-access-token": token}
        }
      )
      .then(function(response) {
        data = response.data.data.metereologias;

        let option = {};
        let dataTable = [];

        if (data.length > 0) {
          if (data) {
            for (let i in data) {
              let obj = {
                id: data[i].id,
                humedad: data[i].humedad,
                temperatura: data[i].temperatura,
                velocidad_viento: data[i].velocidad_viento,
                direccion_viento: data[i].direccion_viento,
                irradianza_solar: data[i].irradianza_solar,
                fecha: data[i].fecha,
                numero_estacion: data[i].numero_estacion
              };

              dataTable.push(obj);
            }
          }
        }
        option.fileName = "Datos Metereologicos - Nodemcu";
        option.datas = [
          {
            sheetData: dataTable,
            sheetName: "sheet",
            sheetFilter: [
              "id",
              "humedad",
              "temperatura",
              "velocidad_viento",
              "direccion_viento",
              "irradianza_solar",
              "fecha",
              "numero_estacion"
            ],
            sheetHeader: [
              "id",
              "humedad",
              "temperatura",
              "velocidad_viento",
              "direccion_viento",
              "irradianza_solar",
              "fecha",
              "numero_estacion"
            ]
          }
        ];
        let toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();

        return;
      })
      .catch(function(error) {
        console.log(error);
      });
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
            <Grid container>
              <Grid item md={1} xs={12}></Grid>

              <Grid item md={5} xs={12}>
                <Box p={1}>
                  <Card className={classes.root2}>
                    <CardContent>
                      <Typography variant="h6" component="h6">
                        Fecha inicial
                      </Typography>
                      <br />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          variant="static"
                          format="dd/MM/yyyy"
                          minDate={mindate}
                          maxDate={maxdate}
                          initialFocusedDate ={mindate}
                          orientation="landscape"
                          value={date}
                          onChange={changeDate}
                        />
                      </MuiPickersUtilsProvider>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item md={1} xs={12}></Grid>

              <Grid item md={5} xs={12}>
                <Box p={1} spacing={16}>
                  <Card className={classes.root2}>
                    <CardContent>
                    <Typography variant="h6" component="h6">
                      Fecha final
                    </Typography>
                    <br />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          format="dd/MM/yyyy"
                          orientation="landscape"
                          minDate={mindate}
                          maxDate={maxdate}
                          variant="static"
                          autoOk
                          value={date2}
                          onChange={changeDate2}
                        />
                      </MuiPickersUtilsProvider>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>

            <Box p={3}></Box>

            <Container maxWidth="sm">
              <div>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Box p={5}>
                      <Button
                        variant="contained"
                        size="large"
                        style={{backgroundColor: "#3f51b5", color: "#fff"}}
                        onClick={descargar_datos}
                        className={classes.margin}
                      >
                        Descargar informacion
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Container>
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
  } else {
  }
  return <div>No hay permisos, inicie sesion</div>;
}
