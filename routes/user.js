import express from "express";
import {  getMyProfile, login, register,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();


router.post('/login',login);

router.post('/new', register); 

router.get('/me',isAuthenticated ,getMyProfile);

router.get('/logout', logout);

export default router;