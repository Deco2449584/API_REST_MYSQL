import { Router } from "express"
import {getEmployes,createEmploye,actualizandoEmploye,eliminandoEmploye,getEmploye,eliminandoEmploy} from '../controllers/employes.controlers.js'
const router = Router()
   
router.get('/employees', getEmployes)
router.get('/employees/:id', getEmploye)
router.post('/employees',createEmploye)
router.patch('/employees/:id', actualizandoEmploye)
router.delete('/employees', eliminandoEmploye)
router.delete('/employees/:id', eliminandoEmploy)


export default router