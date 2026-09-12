import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
// import authRoutes from "@presentation/auth";
// import databaseRoutes from '@presentation/dt';
import * as swaggerDocument from "./swagger.json";
import path from "path";
// import swaggerJsdoc from "swagger-jsdoc";
import http from "http";

import swaggerUi from "swagger-ui-express";
import { startApp } from "./sources/startup-source.v1";
import { RegisterRoutes } from './routes/routes'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

//     // Swagger
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get("/swagger", (_, res) => {
// 	const swaggerPath = path.join(__dirname, "swagger.json");
// 	res.type("application/json");
// 	res.sendFile(swaggerPath);
// });


// app.get("/", (__, res) => {
//   res.sendFile(path.join(__dirname, "http/index.html"));
// });

// app.listen(process.env.SERVER_PORT, () => {
//   console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
// });


// Promise.all([initPostgres(), MySQLDataSource.initialize()])
Promise.all([startApp()])
	.then(()=>{

		const server = http.createServer(app);
		RegisterRoutes(app)

		app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

		const PORT = process.env.PORT || 3000;

		 server.listen(PORT, () => {
      // ws.log(`🚀 HTTP+WS rodando em http://localhost:${PORT}`);
      // ws.log(`🔌 WS endpoint: ws://localhost:${PORT}/ws`);
      // startJobTransactionSchedulerV1(ws.log);
    });

	});