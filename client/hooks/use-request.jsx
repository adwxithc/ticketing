import { useState } from 'react'
import axios from 'axios'

function useRequest({url, method, body, onSuccess}) {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
        setErrors(null)
        try {
            const response = await axios[method](url,body)

            
            if(onSuccess){
                onSuccess(response.data)
            }

            return response.data
      

          } catch (err) {
            
            setErrors(
                <div className='alert alert-danger'>
                    <h4>oops..!</h4>
                    <ul>
                       { err.response.data.errors.map(error =>(
                            <li key={error.message}>{error.message}</li>
                        ))}
                    </ul>

                </div>
            )
          }
    }

  return [errors, doRequest]
}

export default useRequest
