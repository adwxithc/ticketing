import { useState } from "react"
import Router from 'next/router'
import useRequest from "../../hooks/use-request"


function signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, doRequest] =useRequest({
    url:'/api/users/signup',
    method: 'post',
     body:{email, password},
     onSuccess:() => Router.push('/')
    })

  const handleSubmit = async e => {
    e.preventDefault()
    await doRequest()
   
    
  }
  return (
    <div>
      <h1>signup--</h1>

    <form onSubmit={handleSubmit}>
    <div className="p-3">
      <input value={email} placeholder="email." type="text" onChange={e=>setEmail(e.target.value)} />
    </div>

    <div className="p-3">
      <input value={password} placeholder="password." type="text" onChange={e=>setPassword(e.target.value)} />
    </div>

    {errors}

    <button type="submit">submit</button>
    </form>

    </div>
  )
}

export default signup
