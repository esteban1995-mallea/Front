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
    width: "50%",
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
        setTemperature(datos.temperatura);
        setViento(datos.velocidad_viento);
        // Return : 'W'

        setHumidity(datos.humedad);

        const directionCharacter = classifyDir(angulo);
        setDirection(directionCharacter);
        setIrradianza(0);
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
    <Grid container spacing={1} justify="center">
      <Grid item md={4} xs={12}>
        <Box p={2}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <TemperatureIND />
              <Typography variant="h6" component="h3">
                {temperature} %
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h5" component="h3">
                Temperatura
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box p={2}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <HumedadIND />
              <Typography variant="h6" component="h3">
                {humidity} %
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h5" component="h3">
                Humedad
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box p={2}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <IrradianzaIND />
              <Typography variant="h6" component="h3">
                {irradianza} W/m²
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h5" component="h3">
                Irradianza
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box p={2}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <DireccionViento />
              <Typography variant="h6" component="h3">
                {direccion_viento} - °{angulo}
              </Typography>
              <br />

              <Divider />
              <br />
              <Typography variant="h5" component="h3">
                Dirrec. Viento
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item md={4} xs={12}>
        <Box p={2}>
          <Card className={classes.root}>
            <CardContent>
              <br />
              <VelocidadIND />
              <Typography variant="h6" component="h3">
                {viento} KMS
              </Typography>
              <br />

              <Divider />
              <br />
              <Typography variant="h5" component="h3">
                Vel. Viento
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box p={2}>
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
              <Box p={2}>
                <Humidity />
              </Box>
            </Grid>{" "}
            <Grid item item md={12} xs={12}>
              <Box p={2}>
                <Temperature />
              </Box>
            </Grid>{" "}
            <Grid item item md={12} xs={12}>
              <Box p={2}>
                <Irradianza />
              </Box>
            </Grid>{" "}
            <Grid item item md={12} xs={12}>
              <Box p={2}>
                <VelocityWind />
              </Box>
            </Grid>{" "}
          </Accordion>
        </Box>
      </Grid>

    </Grid>
  );
}
