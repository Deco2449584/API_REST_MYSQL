import {pool} from '../DB.js'
export const ping = async  (req,res) => {
    const [result] = await pool.query('SELECT 2 + 2 AS result')
    res.json(result[0])
 }