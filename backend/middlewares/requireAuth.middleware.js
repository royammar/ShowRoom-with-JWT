const logger = require('../services/logger.service')
const jwt = require('jsonwebtoken');

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!');
    return;
  }
  next();
}

async function requireAdmin(req, res, next) {
  const user = req.session.user;
  if (!user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}


async function verifyToken(req,res,next){

  try{
    token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,'secret')
    req.userData=decoded
    next()
    
  }
  catch{
    return res.status(401).json({message:'Auth Failed'})
  }

}









module.exports = {
  requireAuth,
  requireAdmin,
  verifyToken
}


