import ReactSpeedometer from "react-d3-speedometer";
import React, {useState, useEffect} from "react";
import axios from "axios";

const backend = "http://3.140.194.52:5050";

export default function Temperatureid() {
  const [vel, setVel] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        let token = localStorage.getItem("token");
        let response = await axios.get(`${backend}/metereologias/data/ultimodato`,
          {
            headers: {"x-access-token": token}
          }
        );

        let datos = response.data.data.metereologias || [];
        setVel(datos.velocidad_viento);
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
    <ReactSpeedometer
      width={170}
      height={135}
      maxValue={80}
      value={vel}
      needleColor="red"
      startColor="green"
      segments={8}
      endColor="red"
    />
  );
}
