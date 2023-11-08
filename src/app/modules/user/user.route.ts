import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create-student",
  requestValidator(UserValidation.createStudentSchema),
  UserController.createStudent,
);

export const UserRouter = router;
