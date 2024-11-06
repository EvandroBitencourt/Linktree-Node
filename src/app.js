import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import path from 'path';
import routes from "./routes";
import 'dotenv/config';

class App {
  constructor() {
    this.server = express();

    // Conexão com o banco de dados
    mongoose
      .connect(
        "mongodb+srv://Evandro:NGEFVMYh58eZ7lyN@luckbet.e5ggh.mongodb.net/luckbet?retryWrites=true&w=majority&appName=luckbet"
      )
      .then(() => console.log("Conexão com MongoDB realizada com sucesso"))
      .catch((err) => console.error("Erro ao conectar com MongoDB:", err));

    this.middlewares();
    this.routes();
  }

  middlewares() {
		this.server.use(cors())
    // rotas das imagens
    this.server.use(
      '/files', 
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
