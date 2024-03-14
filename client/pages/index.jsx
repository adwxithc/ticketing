
import axios from 'axios';
import buildClient from '../api/build-client';

function index({currentUser}) {
  
  return (
    <div>
      <h1>landing Page</h1>
        <h4>{currentUser?'you are signed in':'you are not signedin'}</h4>
    </div>
  )
}

index.getInitialProps = async context => {
  
  const client = buildClient(context)
  const {data} = await client.get('/api/users/currentuser')
  return data


}

export default index
