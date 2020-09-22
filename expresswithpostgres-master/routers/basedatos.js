const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'sxwhdhfjcfevfs',
  host: 'ec2-184-73-249-9.compute-1.amazonaws.com',
  database: 'defc6kfjk5hqlp',
  password: '7684e8c857cd7d18fde2f27989ea302aaff250cc5796d466644a04bf48ad84dc',
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/eliminar', async (req, res) =>{
  const {numid} = req.body;
 await pool.query(
   `DELETE FROM pacientes WHERE numid = '${numid}'`
 );
 res.send('BORRADO');
});

router.post('/actualizar', async(req, res) => {
  const {nombre, apellido, numid} = req.body;
  await pool.query(
    `
    UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}' WHERE numid = '${numid}'`
  );
  res.send('ACTUALIZADO');
});



