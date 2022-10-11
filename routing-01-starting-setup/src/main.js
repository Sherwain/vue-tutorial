import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './components/users/UsersList.vue';
import PageNotFound from './components/error/PageNotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams', name: 'teams' },
    {
      path: '/teams',
      component: TeamsList,
      children: [
        {
          path: ':id',
          component: TeamMembers,
          props: true,
          name: 'team-members',
        },
      ],
    },
    { path: '/users', component: UsersList },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
  ],
  scrollBehavior(_1, _2, savePosition) {
    return savePosition ? savePosition : { top: 0, left: 0 };
  },
});

router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  console.log(to, from);
  next();
});

createApp(App).use(router).mount('#app');
