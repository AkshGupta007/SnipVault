import {Router} from 'express';
import {register,login,refresh} from "../controllers/Auth.controller.js";
import { forgotPassword,resetPassword,verifyEmail } from '../controllers/Password.controller.js';

const router=Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh',refresh);


// routes/auth.routes.ts

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/verify/:token", verifyEmail);

export default router;