import { pool } from "../DB.js";

///////////////////////////////////////////////////////FUNCION OBTENER EMPLEADOS///////////////////////////
export const getEmployes = async (req, res) => {
  try {
    // throw new error ('erorr')
    const [rows] = await pool.query("SELECT * FROM employe");
    res.json(rows);
  } catch (error) {
    return res.status(700).json({ message: " NO SE PUDO OBTENER EMPLEADOS" });
  }
};

///////////////////////////////////FUNCION OBTENER ID EMPLEADO////////////////////////

export const getEmploye = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employe WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);
    if (rows.length <= 0)
      return res.status(404).json({ message: " employe not found" });
    res.send({ rows });
  } catch (error) {
    return res
      .status(700)
      .json({ message: " NO SE PUDO OBTENER EL ID DEL EMPLEADO" });
  }
};

/////////////////////////////////////FUNCION CREAR EMPLEADO//////////////////////

export const createEmploye = async (req, res) => {
  try {
    /*  console.log(req.body)
    res.send('post succes')} */
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO employe(name,salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(700).json({
      message: " no se pudo crear empleado",
    });
  }
};

/////////////ELIMINAR EMPLEADOS///////////////////////////

export const eliminandoEmploye = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employe");
    console.log(result);
    res.send(result);
  } catch (error) {
    return res.status(700).json({ message: " NO SE PUDO ELIMNAR LOS EMPLEADOS" });
  }
};


///////////////ELIMINAR ID DE EMPLEADO ////////////

export const eliminandoEmploy = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employe WHERE id = ?", [
      req.params.id,
    ]);
    console.log(result);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: " employe not found",
      });
    res.send("EMPLEADO ELIMINADO");
  } catch (error) {
    return res.status(700).json({ message: " NO SE PUDO ELIMINAR EL EMPLEADO"});
  }
};


////////////ACTUALIZAR ID  EMPLEADO ///////////////



export const actualizandoEmploye = async (req, res) => {
  try {
    //const id = req.params.id
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE employe SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?",
      [name, salary, id]
    );
    console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: " employe not found" });

    const [rows] = await pool.query("SELECT * FROM employe WHERE id = ?", [id]);
    res.json(rows);
  } catch (error) {
    return res.status(700).json({ message: " NO SE PUDO ACTUALIZAR EMPLEADO "});
  }
};
