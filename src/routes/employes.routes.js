import { Router } from "express";
import {
  getEmployes,
  createEmploye,
  actualizandoEmploye,
  eliminandoEmploye,
  getEmploye,
  eliminandoEmploy,
} from "../controllers/employes.controlers.js";
const router = Router();

router.get("/employes", getEmployes);
router.get("/employes/:id", getEmploye);
router.post("/employes", createEmploye);
router.patch("/employes/:id", actualizandoEmploye);
router.delete("/employes", eliminandoEmploye);
router.delete("/employes/:id", eliminandoEmploy);

export default router;
