<template>
  <nav class="bg-gray-900 p-4">
    <div class="bg-gray-900 container mx-auto flex justify-between items-center">
      <span class="text-green-600 font-get-schwifty">Rick&Morty</span>
    </div>
    <div class="flex space-x-4 text-green-600 justify-end">
      <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
      <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
      <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
      <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
    </div>
  </nav>
  <div class="container mx-auto bg-gray-900 p-8">
    <h1 class="text-4xl font-bold text-center text-green-600 my-8">Episodes</h1>
    <ul>
      <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
      <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
      <div v-else class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(ep, index) in displayedEpisodes" :key="ep.id" class="bg-gray-600 shadow-md rounded-lg p-4">
            <h2 class="text-xl font-bold text-green-600 mb-2">{{ ep.name }}</h2>
            <p class="text-white mb-2"><strong>Episode Code:</strong> {{ ep.episode }}</p>
            <p class="text-white mb-2"><strong>Air Date:</strong> {{ ep.air_date }}</p>
            <p class="text-white mb-2"><strong>Created:</strong> {{ ep.created }}</p>
            <div class="flex justify-between">
              <div v-for="(character, i) in ep.characters.slice(0, 2)" :key="i" class="bg-gray-800 shadow-md rounded-full p-2 m-2 flex items-center justify-center" style="width: 48%;">
                <img :src="character.image" :alt="character.name" class="w-8 h-8 rounded-full mr-2">
                <div class="text-white text-center">
                  <p class="font-semibold">{{ character.name }}</p>
                  <p>{{ character.status }}</p>
                  <p>{{ character.species }}</p>
                  <p>{{ character.gender }}</p>
                </div>
              </div>
            </div>
            <div v-if="expandedIndex === index" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div v-for="(character, i) in ep.characters.slice(2)" :key="i" class="bg-gray-800 shadow-md rounded-full p-2 flex items-center justify-center">
                <img :src="character.image" :alt="character.name" class="w-8 h-8 rounded-full mr-2">
                <div class="text-white text-center">
                  <p class="font-semibold">{{ character.name }}</p>
                  <p>{{ character.status }}</p>
                  <p>{{ character.species }}</p>
                  <p>{{ character.gender }}</p>
                </div>
              </div>
            </div>
            <button @click="showMore(index)" class="mt-4 ml-auto mr-auto flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full hover:bg-blue-600">
              <span v-if="expandedIndex !== index">+</span>
              <span v-else>-</span>
            </button>
          </div>
        </div>
\        <div class="flex justify-center mt-8">
          <button @click="toggleEpisodes" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            {{ showAll ? 'Back' : 'See More' }}
          </button>
        </div>
      </div>
    </ul>
     <div class="flex justify-center gap-8">
      <footer class="bg-gray-900 text-white text-center py-4 flex justify-center gap-8">
  <a href="https://github.com/rahel-yekoye" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a>
  <a href="https://www.figma.com/design/sBGAggNS58QUrS8c98vaas/Untitled?node-id=1-2&t=eVT2x4tHH8avk2Gg-4" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
</footer>

</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const expandedIndex = ref(null)
const episodesToDisplay = ref(12) 
const showAll = ref(false)

const Episode_QUERY = gql`
  query Episode {
    episodes {
      results {
        id
        name
        episode
        air_date
        created
        characters {
          name
          status
          species
          gender
          image
        }
      }
    }
  }
`

const { result, loading, error } = useQuery(Episode_QUERY)

const displayedEpisodes = computed(() => {
  return showAll.value 
    ? result.value?.episodes.results || []
    : result.value?.episodes.results.slice(0, episodesToDisplay.value) || []
})

function toggleEpisodes() {
  if (showAll.value) {
    episodesToDisplay.value = 12
  }
  showAll.value = !showAll.value
}

function showMore(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
