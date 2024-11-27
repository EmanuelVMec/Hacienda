import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

const ContratadorForm = () => {
  const [contratador, setContratador] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    empleado_id: '', // ID del empleado asociado
  });

  const [contratadores, setContratadores] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCedula, setSelectedCedula] = useState(null);

  // Obtener todos los contratadores al cargar el componente
  useEffect(() => {
    fetch('http://localhost:8000/contratadores/')
      .then(response => response.json())
      .then(data => setContratadores(data))
      .catch(error => console.error('Error fetching contratadores:', error));
  }, []);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContratador({
      ...contratador,
      [name]: value,
    });
  };

  // Enviar los datos para crear o actualizar un contratador
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editMode ? 'PUT' : 'POST';
    const url = editMode
      ? `http://localhost:8000/contratadores/${selectedCedula}/`
      : 'http://localhost:8000/contratadores/';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contratador),
    })
      .then((response) => response.json())
      .then((data) => {
        if (editMode) {
          setContratadores(
            contratadores.map((c) => (c.cedula === selectedCedula ? data : c))
          );
        } else {
          setContratadores([...contratadores, data]);
        }
        setContratador({
          cedula: '',
          nombre: '',
          apellido: '',
          correo: '',
          telefono: '',
          empleado_id: '',
        });
        setEditMode(false);
        setSelectedCedula(null);
      })
      .catch((error) => console.error('Error saving contratador:', error));
  };

  // Manejar la edición de un contratador
  const handleEdit = (cedula) => {
    const contratadorToEdit = contratadores.find((c) => c.cedula === cedula);
    setContratador(contratadorToEdit);
    setEditMode(true);
    setSelectedCedula(cedula);
  };

  // Manejar la eliminación de un contratador
  const handleDelete = (cedula) => {
    fetch(`http://localhost:8000/contratadores/${cedula}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setContratadores(contratadores.filter((c) => c.cedula !== cedula));
      })
      .catch((error) => console.error('Error deleting contratador:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {editMode ? 'Editar Contratador' : 'Nuevo Contratador'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cédula"
              variant="outlined"
              fullWidth
              name="cedula"
              value={contratador.cedula}
              onChange={handleChange}
              required
              disabled={editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="nombre"
              value={contratador.nombre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              name="apellido"
              value={contratador.apellido}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              variant="outlined"
              fullWidth
              name="correo"
              value={contratador.correo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="telefono"
              value={contratador.telefono}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Empleado ID"
              variant="outlined"
              fullWidth
              name="empleado_id"
              value={contratador.empleado_id}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary">
            {editMode ? 'Actualizar' : 'Crear'}
          </Button>
        </Box>
      </form>

      <Typography variant="h5" gutterBottom>
        Lista de Contratadores
      </Typography>
      <Grid container spacing={2}>
        {contratadores.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.cedula}>
            <Box border={1} padding={2} borderRadius={2}>
              <Typography variant="body1">
                {c.nombre} {c.apellido}
              </Typography>
              <Typography variant="body2">Cédula: {c.cedula}</Typography>
              <Typography variant="body2">Correo: {c.correo}</Typography>
              <Typography variant="body2">Teléfono: {c.telefono}</Typography>
              <Typography variant="body2">Empleado ID: {c.empleado}</Typography>
              <Box mt={2}>
                <Button
                  onClick={() => handleEdit(c.cedula)}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(c.cedula)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: '8px' }}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContratadorForm;
