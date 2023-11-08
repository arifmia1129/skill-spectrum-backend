import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  requestValidator(AuthValidation.loginAuthScheme),
  AuthController.loginAuth,
);

router.post(
  "/refresh-token",
  requestValidator(AuthValidation.refreshTokenAuthScheme),
  AuthController.refreshTokenAuth,
);

router.post(
  "/change-password",
  requestValidator(AuthValidation.changePasswordAuthScheme),
  auth(
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
    USER_ROLE_ENUM.INSTRUCTOR,
    USER_ROLE_ENUM.STUDENT,
  ),
  AuthController.changePasswordAuth,
);

export const AuthRouter = router;
