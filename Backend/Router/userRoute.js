import express from 'express'
import { register,otpVerify ,login,forgotPassword,resetPassword,logout} from '../Controller/userController.js'
const UserRouter=express.Router()
UserRouter.post('/register',register)
UserRouter.post('/otpVerify',otpVerify)
UserRouter.post('/login',login)
UserRouter.post('/forgotPassword',forgotPassword)
UserRouter.post('/resetPassword',resetPassword)
UserRouter.post('/logout',logout)

export default UserRouter;