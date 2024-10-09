const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
require('./db');  // Cargar la conexión a la base de datos

app.use(express.json());
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
