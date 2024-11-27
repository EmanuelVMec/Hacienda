import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Alert, Container, Grid, Typography, Paper } from '@mui/material';

const EmpleadoForm = () => {
  const [empleado, setEmpleado] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    correo: '',
    telefono: '',
  });
  const [empleados, setEmpleados] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCedula, setSelectedCedula] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Obtener todos los empleados al cargar el componente
  useEffect(() => {
    fetch('http://localhost:8000/empleados/')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error fetching empleados:', error));
  }, []);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({
      ...empleado,
      [name]: value,
    });
  };

  // Mostrar Snackbar con mensaje
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Enviar los datos para crear un empleado
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      // Actualizar empleado existente
      fetch(`http://localhost:8000/empleados/${selectedCedula}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmpleados(empleados.map((e) => (e.cedula === selectedCedula ? data : e)));
          setEmpleado({
            cedula: '',
            nombre: '',
            apellido: '',
            fecha_nacimiento: '',
            correo: '',
            telefono: '',
          });
          setEditMode(false);
          setSelectedCedula(null);
          handleSnackbarOpen('Empleado actualizado exitosamente', 'success');
        })
        .catch((error) => {
          console.error('Error updating empleado:', error);
          handleSnackbarOpen('Error al actualizar empleado', 'error');
        });
    } else {
      // Crear nuevo empleado
      fetch('http://localhost:8000/empleados/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmpleados([...empleados, data]);
          setEmpleado({
            cedula: '',
            nombre: '',
            apellido: '',
            fecha_nacimiento: '',
            correo: '',
            telefono: '',
          });
          handleSnackbarOpen('Empleado creado exitosamente', 'success');
        })
        .catch((error) => {
          console.error('Error creating empleado:', error);
          handleSnackbarOpen('Error al crear empleado, puede que ya exista un empleado con esa cédula', 'error');
        });
    }
  };

  // Manejar la edición de un empleado
  const handleEdit = (cedula) => {
    const empleadoToEdit = empleados.find((e) => e.cedula === cedula);
    setEmpleado(empleadoToEdit);
    setEditMode(true);
    setSelectedCedula(cedula);
  };

  // Manejar la eliminación de un empleado
  const handleDelete = (cedula) => {
    fetch(`http://localhost:8000/empleados/${cedula}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setEmpleados(empleados.filter((e) => e.cedula !== cedula));
        handleSnackbarOpen('Empleado eliminado exitosamente', 'success');
      })
      .catch((error) => {
        console.error('Error deleting empleado:', error);
        handleSnackbarOpen('Error al eliminar empleado', 'error');
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          {editMode ? 'Editar Empleado' : 'Nuevo Empleado'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Cédula"
                name="cedula"
                value={empleado.cedula}
                onChange={handleChange}
                fullWidth
                required
                disabled={editMode}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="nombre"
                value={empleado.nombre}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                name="apellido"
                value={empleado.apellido}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={empleado.fecha_nacimiento}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                name="correo"
                value={empleado.correo}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                name="telefono"
                value={empleado.telefono}
                onChange={handleChange}
                fullWidth
                required
                type="tel"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {editMode ? 'Actualizar' : 'Crear'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Lista de Empleados
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <ul>
          {empleados.map((e) => (
            <li key={e.cedula}>
              {e.nombre} {e.apellido} - {e.cedula}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(e.cedula)}
                sx={{ marginLeft: 2 }}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(e.cedula)}
                sx={{ marginLeft: 2 }}
              >
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmpleadoForm;
