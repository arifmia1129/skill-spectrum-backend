import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { StudentController } from "./studet.controller";
import { StudentValidation } from "./student.validation";

const router = Router();

router.get("/", StudentController.getStudent);
router
  .route("/:id")
  .get(StudentController.getStudentById)
  .patch(
    requestValidator(StudentValidation.updateSchema),
    StudentController.updateStudentById,
  )
  .delete(StudentController.deleteStudentById);

export const StudentRouter = router;
