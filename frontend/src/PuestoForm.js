import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const PuestoForm = () => {
  const [puesto, setPuesto] = useState({
    nombre: '',
    departamento_id: '',
    empleado_id: ''
  });

  const [puestos, setPuestos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/puestos/')
      .then((response) => response.json())
      .then((data) => setPuestos(data))
      .catch((error) => console.error('Error fetching puestos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPuesto({ ...puesto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update puesto
      fetch(`http://localhost:8000/api/puestos/${selectedId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puesto),
      })
        .then((response) => response.json())
        .then((data) => {
          setPuestos(
            puestos.map((p) => (p.id === selectedId ? { ...p, ...data } : p))
          );
          setSnackbarMessage('Puesto actualizado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => console.error('Error updating puesto:', error));
    } else {
      // Create new puesto
      fetch('http://localhost:8000/api/puestos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puesto),
      })
        .then((response) => response.json())
        .then((data) => {
          setPuestos([...puestos, data]);
          setSnackbarMessage('Puesto creado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => console.error('Error creating puesto:', error));
    }
  };

  const handleEdit = (id) => {
    const puestoToEdit = puestos.find((p) => p.id === id);
    setPuesto(puestoToEdit);
    setEditMode(true);
    setSelectedId(id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/puestos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setPuestos(puestos.filter((p) => p.id !== id));
        setSnackbarMessage('Puesto eliminado correctamente');
        setOpenSnackbar(true);
      })
      .catch((error) => console.error('Error deleting puesto:', error));
  };

  const resetForm = () => {
    setPuesto({
      nombre: '',
      departamento_id: '',
      empleado_id: ''
    });
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <Box>
      <Typography variant="h4">{editMode ? 'Editar Puesto' : 'Nuevo Puesto'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={puesto.nombre}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Departamento ID"
          name="departamento_id"
          value={puesto.departamento_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Empleado ID"
          name="empleado_id"
          value={puesto.empleado_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editMode ? 'Actualizar' : 'Crear'}
        </Button>
      </form>

      <Typography variant="h6" mt={3}>Lista de Puestos</Typography>
      <ul>
        {puestos.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.departamento} - {p.empleado}
            <Button onClick={() => handleEdit(p.id)} color="primary" size="small">
              Editar
            </Button>
            <Button onClick={() => handleDelete(p.id)} color="secondary" size="small">
              Eliminar
            </Button>
          </li>
        ))}
      </ul>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PuestoForm;
