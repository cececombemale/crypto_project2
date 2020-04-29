import axios from "axios"

class Users{
  constructor(){
    this.users = null
  }

  findById(id){
    return this.list().then( (users)=>{
      let candidates = users.filter((user) => user.id === id)
      if(candidates.length>0) {
        return candidates[0]
      }
      throw "element not found"
    })
  }

  list(){
    if(this.users!==null){
      return Promise.resolve(this.users)
    }

    return axios.get("../backend/admin/user").then((response)=>{
      this.users = response.data
      this.users = this.users.sort( (a,b) => a.username.localeCompare(b.username))
      return this.users
    })
  }

  save(user){
    if(user.id) {
      return axios.put("../backend/admin/user/" + user.id, user).then((response) => {
        let internalUser = this.users.filter((u) => u.id === user.id)[0]
        Object.assign(internalUser, response.data)
        return internalUser
      })
    }
    else{
      return axios.post("../backend/admin/user/", user).then((response) => {
        this.users.push(response.data)
        this.users = this.users.sort( (a,b) => a.username.localeCompare(b.username))
        return response.data
      })
    }
  }

  delete(user){
    return axios.delete("../backend/admin/user/" + user.id).then((response) => {
      this.users = this.users.filter((u) => u.id !== user.id)
      return response.data
    })
  }

}


let users = new Users()
export default users
