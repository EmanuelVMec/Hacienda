import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

const SalarioForm = () => {
  const [salario, setSalario] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    monto: '',
    puesto_id: ''
  });

  const [salarios, setSalarios] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/salarios/')
      .then((response) => response.json())
      .then((data) => setSalarios(data))
      .catch((error) => console.error('Error fetching salarios:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalario({ ...salario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update salario
      fetch(`http://localhost:8000/api/salarios/${selectedId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salario),
      })
        .then((response) => response.json())
        .then((data) => {
          setSalarios(
            salarios.map((s) => (s.id === selectedId ? { ...s, ...data } : s))
          );
          setSnackbarMessage('Salario actualizado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => console.error('Error updating salario:', error));
    } else {
      // Create new salario
      fetch('http://localhost:8000/api/salarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salario),
      })
        .then((response) => response.json())
        .then((data) => {
          setSalarios([...salarios, data]);
          setSnackbarMessage('Salario creado correctamente');
          setOpenSnackbar(true);
          resetForm();
        })
        .catch((error) => console.error('Error creating salario:', error));
    }
  };

  const handleEdit = (id) => {
    const salarioToEdit = salarios.find((s) => s.id === id);
    setSalario(salarioToEdit);
    setEditMode(true);
    setSelectedId(id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/salarios/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setSalarios(salarios.filter((s) => s.id !== id));
        setSnackbarMessage('Salario eliminado correctamente');
        setOpenSnackbar(true);
      })
      .catch((error) => console.error('Error deleting salario:', error));
  };

  const resetForm = () => {
    setSalario({
      fecha_inicio: '',
      fecha_fin: '',
      monto: '',
      puesto_id: ''
    });
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <Box>
      <Typography variant="h4">{editMode ? 'Editar Salario' : 'Nuevo Salario'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Fecha Inicio"
          name="fecha_inicio"
          value={salario.fecha_inicio}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Fecha Fin"
          name="fecha_fin"
          value={salario.fecha_fin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Monto"
          name="monto"
          value={salario.monto}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Puesto ID"
          name="puesto_id"
          value={salario.puesto_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editMode ? 'Actualizar' : 'Crear'}
        </Button>
      </form>

      <Typography variant="h6" mt={3}>Lista de Salarios</Typography>
      <ul>
        {salarios.map((s) => (
          <li key={s.id}>
            {s.fecha_inicio} - {s.monto} - {s.puesto}
            <Button onClick={() => handleEdit(s.id)} color="primary" size="small">
              Editar
            </Button>
            <Button onClick={() => handleDelete(s.id)} color="secondary" size="small">
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

export default SalarioForm;
