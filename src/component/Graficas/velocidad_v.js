import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import ReactApexCharts from "react-apexcharts";
import axios from "axios";
const backend = "http://3.140.194.52:5050";

export default function Velocidad_V() {
  const [vel, setVel] = useState([]);
  const [hours, setHours] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        let x = 0;
        let cont = 0;
        let token = localStorage.getItem("token");
        let response = await axios.get(
          `${backend}/metereologias/data/obtenerfechas`,
          {
            headers: {"x-access-token": token}
          }
        );

        let datos = response.data.data.metereologias || [];

        let vel = [];
        let fecha = [];
        datos.forEach(dato => {
          cont = cont + 1;
        });
        datos.forEach(dato => {
          if (x > cont - 21) {
            vel.push(Number(dato.velocidad_viento));

            let fechaISO = new Date(dato.fecha);
            let hora = fechaISO.getHours();
            let minutos = fechaISO.getMinutes();
            if (Number(minutos) < 10) {
              minutos = "0" + minutos;
            }

            let fecha_formateada = hora + ":" + minutos;
            fecha.push(String(fecha_formateada));
          }
          x = x + 1;
        });
        setVel(vel);
        setHours(fecha);
      } catch (e) {
        console.log(e);
      }
    };

    obtenerdatos();
  }, [time]);

  setTimeout(function() {
    setTime(time + 1);
  }, 120000);

  const stateApex1 = {
    series: [{name: "Velocidad del viento", data: vel}],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {enabled: false}
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#19d577"],
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Velocidad del viento",
        align: "left"
      },
      subtitle: {
        text: "Movimientos recientes de velocidad del viento (40 min aprox)",
        align: "left"
      },
      xaxis: {
        categories: hours
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReactApexCharts
          options={stateApex1.options}
          series={stateApex1.series}
          type="area"
          height={200}
        />
      </Grid>
    </Grid>
  );
}
