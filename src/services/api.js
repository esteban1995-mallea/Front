import axios from "axios";
const backend = "http://3.140.194.52:5050";


function getallUltimodia() {
  var humedad = [];
  let token = localStorage.getItem("token");
  var fecha = [];
  var x = 0;

  let data = axios.get(`${backend}/metereologias/data/obtenerfechas`, {
      headers: {"x-access-token": token}
    })
    .then(function(response) {
      var datos = response.data.data.metereologias;

      if (datos.length > 0) {
        if (datos) {
          for (let i in datos) {
            //        sethumedad(prevhumedad => [...prevhumedad, datos[i].humedad])
            if (x <= 20) {
              humedad.push(Number(datos[i].humedad));
              var fechaISO = new Date(datos[i].fecha);
              var hora = fechaISO.getHours();
              var minutos = fechaISO.getMinutes();
              var fecha_formateada = hora + ":" + minutos;

              console.log();
              fecha.push(String(fecha_formateada));

              console.log(fecha);
              x = x + 1;
            }
          }
        }
      }

      return humedad;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function crearUsuario(nombre, apellido, email, password) {
  let user = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password
  };

  axios

    .post(`${backend}/users/register`, user)
    .then(function(response) {})
    .catch(function(error) {
      console.log(error);
    });
}

async function login(user) {
  try {
    let response = await axios.post(`${backend}/users/authenticate`,
      user
    );
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("userinfo", response.data.data.user.admin);
  } catch (e) {
    return
    console.log(e);
  }
}

async function getalluser() {
  try {

    let response = await axios.post(`${backend}/users/getalluser`);
    return response.data.data.users;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function rango() {
  try {
    let response = await axios.post(`${backend}/metereologias/data/rangofechas`
    );
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function deleteuser(id) {
  let id_ = {id: id};
  try {

    let response = await axios.post( `${backend}/users/delete`, id_);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}



async function update(user) {
  try {

    let response = await axios.post(`${backend}/users/update`,
      user
    );
    return response

  } catch (e) {
    console.log(e);
  }
}

export default {
  crearUsuario,
  getallUltimodia,
  login,
  getalluser,
  deleteuser,
  rango,
  update
};
