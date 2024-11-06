import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';
import ProfileController from './controllers/ProfileController';
import ConfigController from './controllers/ConfigController'; 
import DashboardController from './controllers/DashboardController';
import authMiddleware from './middlewares/authMiddleware';

const routes = new Router();
const upload = multer(uploadConfig);

// User
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//autenticação
routes.use(authMiddleware); 

// Profile 
routes.post('/profiles', upload.single('image'), ProfileController.store); 
routes.get('/profiles', ProfileController.index); 
routes.get('/profiles/:profile_id', ProfileController.show);
routes.delete('/profiles/:profile_id', ProfileController.destroy); 

// Config - Configurações da Página
routes.post('/config', upload.fields([
  { name: 'logomarca', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), ConfigController.store); 

routes.get('/config', ConfigController.index); 
routes.put('/config/:config_id', upload.fields([
  { name: 'logomarca', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), ConfigController.update); 
routes.delete('/config/:config_id', ConfigController.destroy); 

// Dashboard
routes.get('/dashboard', DashboardController.show);

export default routes;
