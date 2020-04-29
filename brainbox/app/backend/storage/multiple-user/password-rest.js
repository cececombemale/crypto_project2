const NodeCache = require( "node-cache" )
const uuid = require('uuid/v4')
const db = require('./db')
const bcrypt = require("bcrypt");

const passwordResetRequestCache = new NodeCache( { stdTTL: 60*30, checkperiod: 120 } )


exports.token_post = (req, res)=>{
  let user = req.body
  let id = uuid()
  passwordResetRequestCache.set(id, user)
  res.send(id)
}


exports.token_get = (req, res)=>{
  let token = req.params.token
  if (token === undefined || passwordResetRequestCache.get(token) === undefined){
    res.status(404).send(token)
  }
  else{
    res.status(200).send(token)
  }
}

exports.set = (req, res)=>{
  let request = req.body
  let token = request.token
  let password = request.password


  if(token === undefined){
    res.status(404).send("not found")
    return
  }

  let user = passwordResetRequestCache.take(token)
  if ( user === undefined ){
    res.status(404).send("Password Request link timeout")
  }
  else{
    bcrypt.hash(password, 10, function(err, hash) {
      user.password = hash
      db.users.update(user.id, user, (error, user)=>{
        if(error){ res.status(412); return}
        res.send("done")
      })
    })
  }
}
