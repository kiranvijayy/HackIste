import express from 'express';
const Router = express.Router();


Router.post('/sign-in',SignIn);
Router.post('/sign-up',SignUp);

export default Router;