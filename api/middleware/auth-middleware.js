const User = require('../users/users-model')
const { findBy } = require('../users/users-model')


const checkPayload = (req,res,next)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json("username and password required")
    }else{
        next()
    }
  }

  async function checkUsernameExists(req, res, next) {
    try{
      const users = await User.findBy({ username: req.body.username })
      if (!users.length) {
        next()
      }
      else next({ message: "Username taken", status: 422 })
    } catch (error){
      next(error)
    }
  }

  const checkUsernameAlive = async (req, res, next) => {
      try{
        const [user] = await findBy({username: req.body.username})
        if(!user){
          next({
            status: 401,
            message: 'Invalid credentials'
          })
        }else{
          req.user = user
          next()
        }
      }catch(err){
        next(err)
      }
  }

  module.exports = {
      checkPayload,
      checkUsernameExists,
      checkUsernameAlive,
  
  }