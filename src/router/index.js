
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import EpisodePage from '../components/EpisodePage.vue';
import CharacterPage from '../components/CharacterPage.vue';
import LocationPage from '../components/LocationPage.vue';
import EpisodeDetail from '../components/EpisodeDetail.vue';
import CharacterDetail from '../components/CharactersDetail.vue';
import LocationDetail from '../components/LocationDetail.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/episodes', component: EpisodePage },
  { path: '/characters', component: CharacterPage },
  { path: '/locations', component: LocationPage },
  { path: '/episode/:id', name: 'EpisodeDetails', component: EpisodeDetail },
  { path: '/character/:id', name: 'CharacterDetails', component: CharacterDetail },
  { path: '/location/:id', name: 'LocationDetails', component: LocationDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;