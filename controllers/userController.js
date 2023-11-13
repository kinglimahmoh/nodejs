const User = require("../models/user");
const jwt = require('jsonwebtoken');
 
function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  
  const secret = 'marandmorapp-secret-key';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

// const jwt = require('jsonwebtoken');
// const { secretKey, tokenExpiration } = require('../config'); // Import the secret key and token expiration time

class UserController {
  // constructor to injeect the user model
  constructor(User) {
    this.User = User;
  }

  // index function to return "hello world"
  //register function
  async register(req, res) {
    try {
      const {
        role,
        department,
        email,
        phone,
        first_name,
        last_name,
        password,
      } = req.body;

      // check if email/user exist
      var user = await User.findOne({ where: { email } });
      if (user) {
        res.status(401).json({
          status: false,
          message: "User already exist",
          statusCode: 401,
        });
      }

      var user = await User.create({
        first_name: first_name,
        last_name: last_name,
        role: role,
        department: department,
        email: email,
        password: password,
        phone: phone,
      });

      // const token = generateToken(user);
      //res.cookie("token", token, {httponly: true });
      res.status(201).json({
        status: true,
        message: "Registration successful",
        statusCode: 201,
        data: user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // login function
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      // check if email/user exist
      if (!user) {
        res.status(401).json({
          status: false,
          message: "User does not exist",
          statusCode: 401,
        });
      }

      //check if password match
      if (user.password !== password) {
        res.status(401).json({
          status: false,
          message: "Incorrect Password",
          statusCode: 401,
        });
      }

      //add restriction based on user role
      if (user.role !== "MD") {
        res.status(401).json({
          status: false,
          message: "Non Management staff, cannot access this dashboard",
          statusCode: 401,
        });
      }

      //  const token = jwt.sign(
      //     {
      //       userId: user.id, // You can include user information like ID, role, department in the payload
      //       role: user.role,
      //       department: user.department,
      //     },
      //     secretKey,
      //     { expiresIn: tokenExpiration }
      //   );

      //generate acces token for user
      const token = generateAccessToken(user);
      // res.cookie ("token", tpken, { httpOnly: true});
      res.status(200).json({
        status: true,
        message: "Login successful",
        statusCode: 200,
        token: token,
        data: user,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UserController;
