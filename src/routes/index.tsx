import { createBrowserRouter } from 'react-router-dom'
import Root from '../views/layouts/Root'
import Page1 from '../views/pages/Page1'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'page1',
                element: <Page1 />,
            },
        ],
    },
])

export default router
