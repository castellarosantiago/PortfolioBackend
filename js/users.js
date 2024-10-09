const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, name, email });
  });
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User updated' });
  });
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
