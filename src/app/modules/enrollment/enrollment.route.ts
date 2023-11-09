import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { EnrollmentController } from "./enrollment.controllert";
import { EnrollmentValidation } from "./enrollment.validation";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const router = Router();

router.post(
  "/create",
  requestValidator(EnrollmentValidation.create),
  EnrollmentController.create,
);
router.get("/", auth(USER_ROLE_ENUM.STUDENT), EnrollmentController.getAll);
router
  .route("/:id")
  .get(EnrollmentController.getById)
  .patch(
    requestValidator(EnrollmentValidation.update),
    EnrollmentController.update,
  )
  .delete(EnrollmentController.delete);

export const EnrollmentRouter = router;
