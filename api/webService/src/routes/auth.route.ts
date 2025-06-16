import express,{Router} from "express";
import { LoginByEmail } from "../controllers/login.controller";
import { registerUser } from "../controllers/register.controller";
import { updateUser } from "../controllers/update.controller";
import { LogOut } from "../controllers/logout.controller";
import { forgotPassword } from "../controllers/forgotPassword.controller";
import { deleteUser } from "../controllers/delete.controller";
import { adminMiddleware, authMiddleware } from "../middlewares/cookie.middleware";

const router:Router = express.Router();

router.post('/login',authMiddleware, LoginByEmail);
router.post('/register', registerUser);
router.put('/update-me',authMiddleware, updateUser);
router.get('/logout',authMiddleware, LogOut);
router.put('/forgot-password', forgotPassword);

router.delete('/delete-me',adminMiddleware, deleteUser);

export default router;
