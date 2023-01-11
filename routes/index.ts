import express from "express";
import autoRoute from './auto.route'

export const mainRouter = express.Router();

mainRouter.use('/auto', autoRoute)