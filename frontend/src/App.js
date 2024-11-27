import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import EmpleadoForm from './EmpleadoForm';
import ContratadorForm from './ContratadorForm';
import DepartamentoForm from './DepartamentoForm';
import PuestoForm from './PuestoForm'; // Asegúrate de importar correctamente el componente de Puesto

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '80px', padding: '20px' }}> {/* Espacio para el header */}
        <Routes>
          <Route path="/empleados" element={<EmpleadoForm />} />
          <Route path="/contratadores" element={<ContratadorForm />} />
          <Route path="/departamentos" element={<DepartamentoForm />} />
          <Route path="/puestos" element={<PuestoForm />} /> {/* Nueva ruta para Puesto */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
