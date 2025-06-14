import express,{Router} from "express";
import { LoginByEmail } from "../controllers/login.controller";
import { registerUser } from "../controllers/register.controller";
import { updateUser } from "../controllers/update.controller";
import { LogOut } from "../controllers/logout.controller";
import { forgotPassword } from "../controllers/forgotPassword.controller";
import { deleteUser } from "../controllers/delete.controller";

const router:Router = express.Router();

router.post('/login', LoginByEmail);
router.post('/register', registerUser);
router.put('/update-me', updateUser);
router.get('/logout', LogOut);
router.put('/forgot-password', forgotPassword);
router.delete('/delete-me', deleteUser);

export default router;