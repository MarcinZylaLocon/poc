import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Locon = Loadable(lazy(() => import('./Locon')));

const loconRoutes = [
  { path: '/locon/default', element: <Locon />, auth: authRoles.admin },
];

export default loconRoutes;
