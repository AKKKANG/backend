import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import logger from '../util/logger';
import { applicationRouter } from './routes';

export class Application {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set('host', process.env.HOST || 'localhost');
    this._server.set('port', process.env.PORT || 3000);
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(applicationRouter);
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
      logger.info('Connected to mongod server');
    });

    mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@akkkang.lzomyt4.mongodb.net/?retryWrites=true&w=majority`
    );
  }

  public startServer(): void {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');
    this._server.listen(port, host, () => {
      logger.info(`Server started at http://${host}:${port}`);
    });
  }
}
