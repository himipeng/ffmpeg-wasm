import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './index.scss'

const Root: FC = () => {
    return (
        <div className='layout-root'>
            <div className='layout-root-nav'>
                <Link to='/'>Home</Link>
                <Link to='page1'>Page1</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Root
