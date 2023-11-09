import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create-student",
  requestValidator(UserValidation.createStudentSchema),
  UserController.createStudent,
);
router.get("/profile", auth(USER_ROLE_ENUM.STUDENT), UserController.getProfile);

export const UserRouter = router;
