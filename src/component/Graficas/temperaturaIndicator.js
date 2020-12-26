import React, {useState, useEffect} from "react";
import Thermometer from "react-thermometer-component";
import axios from "axios";

const backend = "http://3.140.194.52:5050";

export default function Temperatureid() {
  const [temperature, setTemperature] = useState([]);
  const [time, setTime] = useState(0);

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

        setTemperature(String(datos.temperatura));
      } catch (e) {
        console.log(e);
      }
    };
    obtenerdatos();
  },[time]);

  setTimeout(function() {
    setTime(time + 1);
  }, 120000);

  return (
    <Thermometer
      theme="light"
      value={temperature}
      max="60"
      steps="1"
      format="°C"
      size="small"
      height="135"
      width="60"
    />
  );
}
