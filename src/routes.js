import React from 'react';

const Users = React.lazy(() => import('./views/users/Users'));

//instream-ads
const Tables = React.lazy(() => import('./views/base/tables/TablesLiveEventList'))
const ContentProviderList = React.lazy(() => import('./views/LiveManagementEvent/LiveEventList/LiveEventList'));
const CreateContentProvider = React.lazy(() => import('./views/LiveManagementEvent/CreateContentProvider/CreateContentProvider'));
const EditContentProvider = React.lazy(() => import('./views/LiveManagementEvent/CreateContentProvider/EditContentProvider/EditContentProvider'));
const ContentList = React.lazy(() => import('./views/LiveManagementEvent/ContentList/ContentList'));
const Login = React.lazy(() => import('./views/users/login/Login'));
const ChangePassWord = React.lazy(() => import('./views/users/changePassWord/ChangePassWord'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/users', exact: true,  name: 'Users', component: Users },

  //instream-ads
  { path: '/live/content-live-list', name: 'Content Provider List', component: ContentProviderList, exact: true },
  { path: '/instream-ads/content-provider-list/create-content-provider', name: 'Create Content Provider', component: CreateContentProvider, exact: true },
  { path: '/instream-ads/content-provider-list/edit-content-provider', name: 'Edit Content Provider', component: EditContentProvider, exact: true },
  { path: '/instream-ads/content-list', name: 'Content List', component: ContentList, exact: true },
  { path: '/login', name: 'Login', component: Login, exact: true },
  { path: '/change-password', name: 'ChangePassWord', component: ChangePassWord, exact: true },

];

export default routes;
