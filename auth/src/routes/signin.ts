
import express, { Request, Response } from 'express';
import { body} from 'express-validator';
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get('/api/users/signin',
[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
async (req: Request, res: Response)=>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    
    if(!existingUser){
        throw new BadRequestError("Invalid email or password")
    }
    const passwordMatched = await existingUser.matchPassword(password)

    if(!passwordMatched){
        throw new BadRequestError("Invalid email or password")
    }

     //Generate JWT
     const userJwt = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email
        },
        process.env.JWT_KEY!
      );
  
      //Store it on session object
      req.session = {
        jwt: userJwt
      };
  
      res.status(200).send(existingUser);

})

export{router as signinRouter}