const NodeCache = require( "node-cache" )
const uuid = require('uuid/v4')

const requestTokenCache = new NodeCache( { stdTTL: 60, checkperiod: 10 } )


exports.token_set = (user)=>{
  let id = uuid()
  requestTokenCache.set(id, user)
  return id
}


exports.token_get = (id)=>{
  return requestTokenCache.get(id)
}
