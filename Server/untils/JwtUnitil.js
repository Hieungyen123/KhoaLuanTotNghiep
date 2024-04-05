//CLI: npm install jsonwebtoken --save
const jwt = require('jsonwebtoken');
const MyConstants = require('./MyConstants.js');
const { errorMonitor } = require('nodemailer/lib/xoauth2/index.js');
const { resolve } = require('path');
const { rejects } = require('assert');
const JwtUtil = {
  genToken(id) {
    const token = jwt.sign(
      { id },
      MyConstants.JWT_SECRET,
      { expiresIn: MyConstants.JWT_EXPIRES }
    );
    return token;
  },
  genRefreshToken(id) {
    const token = jwt.sign(
      { id: id },
      MyConstants.JWT_SECRET,
      { expiresIn: MyConstants.JWT_EXPIRES2 }
    );
    return token;
  },
  async checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    // console.log('token', token)
    if (token) {

      jwt.verify(token, MyConstants.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  },
  authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, MyConstants.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  },
  checkRefreshToken(refreshtoken) {
    // const RefreshToken = refreshtoken.body;
    // console.log('re', refreshtoken)
    return new Promise((resolve, rejects) => {
      if (refreshtoken) {
        jwt.verify(refreshtoken, MyConstants.JWT_SECRET, (err, decoded) => {
          if (err) {
            return rejects(err)
          } else {
            // console.log('decoded', decoded)
            return resolve(decoded);

          }
        });
      } else {
        return 'lỗi';
      }
    })


  }
};
module.exports = JwtUtil;