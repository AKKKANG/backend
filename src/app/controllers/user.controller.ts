import { NextFunction, Request, Response } from 'express';
import logger from '../../util/logger';
import { User } from '../schemas';

/* Get */
export async function get(req: Request, res: Response, next: NextFunction) {
  logger.info(`get user ${req.params.id}`);
  try {
    const user = await User.get(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/* Create */
export async function create(req: Request, res: Response, next: NextFunction) {
  logger.info(`create user ${req.body.name}`);
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
}

/* List */
export async function list(req: Request, res: Response, next: NextFunction) {
  logger.info(`list users`);
  try {
    const users = await User.list();
    res.json(users);
  } catch (error) {
    next(error);
  }
}
