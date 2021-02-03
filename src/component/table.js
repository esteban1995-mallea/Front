import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Apis from "../services/api";
import {useHistory} from "react-router";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: "90%"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Tabla() {
  let history = useHistory();

  const [rows, setRows] = useState([]);

  async function Delete(id) {
    let response = await Apis.deleteuser(id);
    window.location.reload(true);

    return response;
  }

  function edit(row) {
    localStorage.setItem("userEdit", JSON.stringify(row));
    history.push("/controluser/edit");
  }

  useEffect(() => {
    const obtenerdatos = async () => {
      try {
        let response = await Apis.getalluser();
        setRows(response);
      } catch (e) {
        console.log(e);
      }
    };
    obtenerdatos();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item md={2}></Grid>

        <Grid item md={8} xs={12} justify="center">
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Admin</TableCell>
                  <TableCell align="center">Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow>
                    <TableCell align="left">
                      {row.nombre + " " + row.apellido}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.admin}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => Delete(row.id)}
                        startIcon={<DeleteIcon />}
                      ></Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => edit(row)}
                        startIcon={<CreateIcon />}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
