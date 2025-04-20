import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const whitelist = [
  '/api/login',
   '/api/register',
    '/api/logout'
  ];

export const verifyToken = (req, res, next) => {
  try{
  if (whitelist.includes(req.path)) 
    return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) 
    return res.status(403).send('Token required');

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("user",decoded)
    req.user = decoded;
    
    next();
}catch(err){
  if (err) return res.status(401).send('Token expired');
  
}
}
  // console.log("check",check)

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
};
