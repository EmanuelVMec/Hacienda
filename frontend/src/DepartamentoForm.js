import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const DepartamentoForm = () => {
  const [departamento, setDepartamento] = useState({
    nombre: '',
    contratador: '',
    empleado: ''
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/departamentos/')
      .then((response) => response.json())
      .then((data) => setDepartamentos(data))
      .catch((error) => console.error('Error fetching departamentos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartamento({ ...departamento, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si todos los campos están completos
    if (!departamento.nombre || !departamento.contratador_id || !departamento.empleado_id) {
      setSnackbarMessage('Por favor, complete todos los campos');
      setOpenSnackbar(true);
      return;
    }

    if (editMode) {
      // Actualizar departamento
      fetch(`http://localhost:8000/departamentos/${selectedId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departamento),
      })
        .then((response) => response.json())
        .then((data) => {
          setDepartamentos(
            departamentos.map((d) => (d.id === selectedId ? { ...d, ...data } : d))
          );
          setSnackbarMessage('Departamento actualizado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => {
          console.error('Error updating departamento:', error);
          setSnackbarMessage('Hubo un error al actualizar el departamento');
          setOpenSnackbar(true);
        });
    } else {
      // Crear nuevo departamento
      fetch('http://localhost:8000/departamentos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departamento),
      })
        .then((response) => response.json())
        .then((data) => {
          setDepartamentos([...departamentos, data]);
          setSnackbarMessage('Departamento creado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => {
          console.error('Error creating departamento:', error);
          setSnackbarMessage('Hubo un error al crear el departamento');
          setOpenSnackbar(true);
        });
    }
  };

  const handleEdit = (id) => {
    const departamentoToEdit = departamentos.find((d) => d.id === id);
    setDepartamento(departamentoToEdit);
    setEditMode(true);
    setSelectedId(id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/departamentos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setDepartamentos(departamentos.filter((d) => d.id !== id));
        setSnackbarMessage('Departamento eliminado correctamente');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error deleting departamento:', error);
        setSnackbarMessage('Hubo un error al eliminar el departamento');
        setOpenSnackbar(true);
      });
  };

  const resetForm = () => {
    setDepartamento({
      nombre: '',
      contratador_id: '',
      empleado_id: ''
    });
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <Box>
      <Typography variant="h4">{editMode ? 'Editar Departamento' : 'Nuevo Departamento'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={departamento.nombre}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Contratador"
          name="contratador"
          value={departamento.contratador_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Empleado"
          name="empleado"
          value={departamento.empleado_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editMode ? 'Actualizar' : 'Crear'}
        </Button>
      </form>

      <Typography variant="h6" mt={3}>Lista de Departamentos</Typography>
      <ul>
        {departamentos.map((d) => (
          <li key={d.id}>
            {d.nombre} - {d.descripcion}
            <Button onClick={() => handleEdit(d.id)} color="primary" size="small">
              Editar
            </Button>
            <Button onClick={() => handleDelete(d.id)} color="secondary" size="small">
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

export default DepartamentoForm;
