import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { StudentRouter } from "../modules/student/student.router";
import { CourseRouter } from "../modules/course/course.route";
import { EnrollmentRouter } from "../modules/enrollment/enrollment.route";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: UserRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/student", route: StudentRouter },
  { path: "/course", route: CourseRouter },
  { path: "/enrollment", route: EnrollmentRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
