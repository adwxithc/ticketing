import {useEffect} from 'react'
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

function signout() {

    const [errors, doRequest] =useRequest({
        url:'/api/users/signout',
        method: 'post',
         body:{},
         onSuccess:() => Router.push('/')
        })
    

    useEffect(()=>{
         doRequest()
    },[])


  return (
    <div>
        <h3>signing you out..</h3>
      
    </div>
  )
}

export default signout
