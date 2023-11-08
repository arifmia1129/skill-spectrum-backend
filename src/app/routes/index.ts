import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { StudentRouter } from "../modules/student/student.router";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: UserRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/student", route: StudentRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
