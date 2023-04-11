import Appointment from './views/appointment'
import Index from './views/index'
import NotFound from './views/NotFound';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index/>
    },
    {
        path: '/appointment',
        element: <Appointment/>
    },
    {
        path: '*',
        element: <NotFound/>
    },
])

export default router;