import { createWebHistory, createRouter } from 'vue-router';
import store from './store';

const CoachList = () => import('./pages/coach/CoachList.vue');
const CoachDetails = () => import('./pages/coach/CoachDetails.vue');
const Home = () => import('./pages/Home.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const PageNotFound = () => import('./pages/PageNotFound.vue');
const MemberNew = () => import('./pages/member/MemberNew.vue');
const CoachNew = () => import('./pages/coach/CoachNew.vue');
const ActivityNew = () => import('./pages/activity/ActivityNew.vue');
const ActivityList = () => import('./pages/activity/ActivityList.vue');
const ActivityDetails = () => import('./pages/activity/ActivityDetails.vue');
const AppointmentList = () => import('./pages/appointment/AppointmentList.vue');
const AppointmentDetails = () =>
  import('./pages/appointment/AppointmentDetails.vue');
const MemberList = () => import('./pages/member/MemberList.vue');
const MemberDetails = () => import('./pages/member/MemberDetails.vue');
const RequestList = () => import('./pages/request/RequestList.vue');
const RequestDetails = () => import('./pages/request/RequestDetails.vue');
const RequestNew = () => import('./pages/request/RequestNew.vue');

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/activities', component: ActivityList, name: 'activities' },
  { path: '/activities/new', component: ActivityNew, name: 'new-activities' },
  {
    path: '/activities/:id',
    component: ActivityDetails,
    name: 'show-activities',
  },

  { path: '/appointments', component: AppointmentList, name: 'appointments' },
  {
    path: '/appointments/:id',
    component: AppointmentDetails,
    name: 'show-appointments',
  },

  { path: '/coaches', component: CoachList, name: 'coach' },
  { path: '/coaches/new', component: CoachNew, name: 'new-coach' },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    name: 'show-coach',
    children: [
      {
        path: 'requests',
        component: RequestList,
        name: 'requests',
        meta: { requiresAuth: true },
      },
      {
        path: 'requests/new',
        component: RequestNew,
        name: 'new-requests',
      },
      {
        path: 'requests/:req_id',
        component: RequestDetails,
        name: 'show-requests',
      },
    ],
  },

  {
    path: '/register/',
    component: MemberNew,
    name: 'register',
    meta: { requiresAuth: true },
  },
  { path: '/members', component: MemberList, name: 'members' },
  { path: '/members/new', component: MemberNew, name: 'new-member' },
  { path: '/members/:id', component: MemberDetails, name: 'show-member' },
  {
    path: '/auth',
    component: UserAuth,
    name: 'auth',
    meta: { requiresUnAuth: true },
  },
  { path: '/:pathMatch(.*)', component: PageNotFound, name: 'page-not-found' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters['auth/isLoggedIn']) {
    next('/coaches');
  } else next();
});

export default router;
