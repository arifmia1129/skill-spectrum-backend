import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controllert";

const router = Router();

router.post(
  "/create",
  requestValidator(CourseValidation.create),
  CourseController.create,
);
router.get("/", CourseController.getAll);
router
  .route("/:id")
  .get(CourseController.getById)
  .patch(requestValidator(CourseValidation.update), CourseController.update)
  .delete(CourseController.delete);

export const CourseRouter = router;
