import e, { Router } from "express";

const authrouter = Router();
authrouter.post('/SIGN-UP', (req, res) => res.send({ message: 'Sign Up' }));
authrouter.post('/SIGN-IN', (req, res) => res.send({ message: 'Sign In' }));
authrouter.post('/SIGN-OUT', (req, res) => res.send({ message: 'Sign Out' }));
export default authrouter;