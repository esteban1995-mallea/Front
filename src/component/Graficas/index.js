import React from "react";
import {Grid, Box} from "@material-ui/core";

import Humidity from "./Humidity";
import VelocityWind from "./velocidad_v";
import Irradianza from "./Irradianza";
import Temperature from "./temperature";

import TemperatureIND from "./temperaturaIndicator";
import HumedadIND from "./humedadIndicator";
import IrradianzaIND from "./irradianzaIndicator";
import VelocidadIND from "./velocidadIndicator";
import DireccionViento from "./direccion";

import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useState, useEffect} from "react";
import axios from "axios";
import {classifyDir} from "react-windrose-chart";

const backend = "http://3.140.194.52:5050";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "60%",
    height: "70%",
    margin: "20%"
  },
  root123: {
    width: 200,
    height: 280,
    margin: "20%"
  },
  root3: {
    width: 1410,
    height: 350
  },
  root2: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    justify: "center"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

let angulo;

export default function Index() {
  const classes = useStyles();
  const [humidity, setHumidity] = useState([]);
  const [irradianza, setIrradianza] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [viento, setViento] = useState([]);
  const [direccion_viento, setDirection] = useState([]);

  const [time, setTime] = useState(0);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        let token = localStorage.getItem("token");
        let response = await axios.get(
          `${backend}/metereologias/data/ultimodato`,
          {
            headers: {"x-access-token": token}
          }
        );

        let datos = response.data.data.metereologias || [];
        angulo = datos.direccion_viento;

        let viento=datos.velocidad_viento/2.237

        var con3decimales = viento.toFixed(3);




        let tmep=datos.temperatura+273.15

        var temperature_ = tmep.toFixed(2);


        setTemperature(temperature_);

        setViento(con3decimales);
        setHumidity(datos.humedad);

        const directionCharacter = classifyDir(angulo);
        setDirection(directionCharacter);
        setIrradianza(datos.irradianza_solar);
      } catch (e) {
        console.log(e);
      }
    };
    obtenerdatos();
  }, [time]);

  setTimeout(function() {
    setTime(time + 1);
  }, 120000);

  return (
    <Grid container spacing={1} justify="center" style={{padding: 5}}>
      <Grid item md={2} xs={12}>
        <Box p={1}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <TemperatureIND />
              <Typography variant="h6" component="h6">
                {temperature} <br />
                °K
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h6" component="h6">
                Temp.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={2} xs={12}>
        <Box p={1}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <HumedadIND />
              <Typography variant="h6" component="h6">
                {humidity} <br />%
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h6" component="h6">
                Humedad
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={2} xs={12}>
        <Box p={1}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <IrradianzaIND />
              <Typography variant="h6" component="h6">
                {irradianza}<br /> w/m²
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h6" component="h6">
                Irradianza
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={2} xs={12}>
        <Box p={1}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <DireccionViento />
              <Typography variant="h6" component="h6">
                {direccion_viento} <br />°{angulo}
              </Typography>
              <br />

              <Divider />
              <br />
              <Typography variant="h6" component="h6">
                D.Viento
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={2} xs={12}>
        <Box p={1}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <VelocidadIND />
              <Typography variant="h6" component="h3">
                {viento} <br /> m/s
              </Typography>
              <br />

              <Divider />
              <br />
              <Typography variant="h6" component="h3">
                V.Viento
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box p={1}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Graficas detalladas.</Typography>
            </AccordionSummary>
            <Grid item md={12} xs={12}>
              <Box p={1}>
                <Humidity />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box p={1}>
                <Temperature />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box p={1}>
                <Irradianza />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box p={1}>
                <VelocityWind />
              </Box>
            </Grid>
          </Accordion>
        </Box>
      </Grid>
    </Grid>
  );
}
