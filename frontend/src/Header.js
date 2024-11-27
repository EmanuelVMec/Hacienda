import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';  // Usamos react-router-dom para navegación entre componentes

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GESTION DE RECURSOS HUMANOS "HACIENDA"
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/empleados">Empleados</Button>
          <Button color="inherit" component={Link} to="/contratadores">Contratadores</Button>
          <Button color="inherit" component={Link} to="/departamentos">Departamentos</Button>
          <Button color="inherit" component={Link} to="/puestos">Puestos</Button>
          <Button color="inherit" component={Link} to="/salarios">Salarios</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
