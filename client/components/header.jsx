
import Link from 'next/link'

function Header({ currentUser }) {

    const links = [
        !currentUser && {label:'SignUp ', href:'/auth/signup'},
        !currentUser && {label:'SignIn ', href:'/auth/signin'},
        currentUser && {label:'SignOut ', href:'/auth/signout'}
    ]
    .filter(linkConfig => linkConfig)
    .map(({label, href})=>(
        <Link href={href}>
        <li key={href} className='nav-item'>{label}</li>
        </Link>
        
    ))

  return (
    <nav className='navbar navbar-light bg-light'>
        <Link href='/' className='navbar-brand'> GetTix</Link>

        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                {links}
            </ul>
             
        </div>
      
    </nav>
  )
}

export default Header
