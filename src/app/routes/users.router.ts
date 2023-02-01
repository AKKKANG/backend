import express, { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router: Router = express.Router();

router
  .route('/')
  /* List All Users */
  .get(UserController.list)
  /* Create User */
  .post(UserController.create);

export const usersRouter: Router = router;
