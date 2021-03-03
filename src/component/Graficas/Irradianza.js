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
          let cont = 0;
          let token1 = localStorage.getItem("token");

        let response = await axios.get(
          `${backend}/metereologias/data/obtenerfechas`,
          {
            headers: {"x-access-token": token1}
          }
        );

        let datos = response.data.data.metereologias || [];

        let irradianza1 = [];
        let fecha = [];

        datos.forEach(dato => {
          cont = cont + 1;
        });


        datos.forEach(dato => {
          if (x > cont-21) {
            irradianza1.push(Number(dato.irradianza_solar));

            let fechaISO = new Date(dato.fecha);
            let hora = fechaISO.getHours();
            let minutos = fechaISO.getMinutes();
            if (Number(minutos) < 10) {
              minutos = "0" + minutos;
            }
            if (Number(hora) < 10) {
              hora = "0" + hora;
            }

            let fecha_formateada = hora + ":" + minutos;
            fecha.push(String(fecha_formateada));

          }
                    x = x + 1;
        });
        setIrradianza(irradianza1);
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
      colors: ["#F0F912"],
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
