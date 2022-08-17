import express from 'express';
import MasterRouter from './routes/MasterRouter';
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
export class Server {
  public app = express();
  public router = MasterRouter;
}
