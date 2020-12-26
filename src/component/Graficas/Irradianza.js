import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import ReactApexCharts from "react-apexcharts";
import axios from "axios";
const backend = "http://3.140.194.52:5050";

export default function Irradianza() {
  const [irradianza, setIrradianza] = useState([]);
  const [hours, setHours] = useState([]);
  const [time, setTime] = useState(0);


  useEffect(() => {
    const obtenerdatos = async () => {
      try {
          let x = 0;
          let token1 = localStorage.getItem("token");

        let response = await axios.get(
          `${backend}/metereologias/data/obtenerfechas`,
          {
            headers: {"x-access-token": token1}
          }
        );

        let datos = response.data.data.metereologias || [];

        let irradianza = [];
        let fecha = [];
        datos.forEach(dato => {
          if (x <= 20) {
            irradianza.push(Number(dato.irradianza));

            let fechaISO = new Date(dato.fecha);
            let hora = fechaISO.getHours();
            let minutos = fechaISO.getMinutes();
            if (Number(minutos) < 10) {
              minutos = "0" + minutos;
            }

            let fecha_formateada = hora + ":" + minutos;
            fecha.push(String(fecha_formateada));
            x = x + 1;
          }
        });
        setIrradianza(irradianza);
        setHours(fecha);
      } catch (e) {
        console.log(e);
      }
    };

    obtenerdatos();
  }, [time]);

  setTimeout(function() {
    console.log("actualizando");
    setTime(time + 1);
  }, 120000);

  const stateApex1 = {
    series: [{name: "Irradianza", data: irradianza}],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {enabled: false}
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Irradianza",
        align: "left"
      },
      subtitle: {
        text: "Movimientos recientes de irradianza (40 min aprox)",
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
