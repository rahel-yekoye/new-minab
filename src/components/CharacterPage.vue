<template>
  <div class="bg-gray-900 min-h-screen">
    <nav class="bg-gray-900 p-4">
      <div class="text-green-600 font-get-schwifty text-2xl font-bold flex items-center">
        <span>Rick&Morty</span>
      </div>
      <div class="bg-gray-900">
        <div class="flex bg-gray-900 space-x-4 text-green-600 justify-end">
          <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
          <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
          <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
          <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
        </div>
      </div>
    </nav>

    <div class="container mx-auto mt-8 bg-gray-900">
      <h1 class="text-4xl font-bold text-center text-green-600 mb-8"> Characters</h1>
    </div>

    <div class="container mx-auto p-4">
      <p v-if="error" class="text-red-500 text-lg">Something went wrong...</p>
      <p v-if="loading" class="text-blue-500 text-lg">Loading...</p>
      <div v-else class="space-y-6">
        <div v-for="character in displayedCharacters" :key="character.id" class="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col md:flex-row mb-6">
          <div class="p-6 md:w-1/3 flex flex-row items-center">
            <img :src="character.image" alt="Character Image" class="w-32 h-32 object-cover rounded-full mr-6">
            <div>
              <h3 class="font-semibold text-xl text-white">{{ character.name }}</h3>
              <p class="text-white">{{ character.status }}</p>
              <p class="text-white">{{ character.species }}</p>
              <p class="text-white">{{ character.gender }}</p>
            </div>
          </div>
          <div class="p-6 md:w-2/3">
            <div class="mb-6">
              <h4 class="text-lg font-medium mb-2 text-white">Last known Location:</h4>
              <div class="flex space-x-4 overflow-x-auto">
                <div v-if="character.location" class="min-w-max bg-gray-700 p-4 rounded-lg text-sm text-white">
                  <span class="font-semibold">{{ character.location.name }}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-medium mb-2 text-white">Episodes participated in:</h4>
              <div class="flex space-x-4 overflow-x-auto">
                <div v-for="ep in character.episode" :key="ep.id" class="min-w-max bg-gray-700 p-4 rounded-lg text-sm text-white">
                  <span class="font-semibold">{{ ep.name }}</span>
                  <br>
                  <span class="font-semibold">{{ ep.episode }}</span>
                  <br>
                  <span class="font-semibold">({{ ep.air_date }})</span>
                  <br>
                  <span class="font-semibold">({{ ep.created }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button @click="handleButtonClick" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{{ buttonText }}</button>
      </div>
    </div>
     <footer class="bg-gray-900 text-white text-center py-4 flex justify-center gap-8">
  <a href="https://github.com/rahel-yekoye" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a>
  <a href="https://www.figma.com/design/qKo6UXOddfYzNyusTdcbV6/characterspage?node-id=0-1&t=i8Ctck2E9OF6PA4j-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
</footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
        status
        gender
        species
        location {
          name
        }
        episode {
          name
          episode
          air_date
          created
        }
      }
    }
  }
`
const { result, loading, error } = useQuery(CHARACTERS_QUERY)

const charactersToDisplay = ref(6)

const displayedCharacters = computed(() => {
  return result.value?.characters.results.slice(0, charactersToDisplay.value) || []
})

const loadMoreCharacters = () => {
  charactersToDisplay.value += 6
}

const handleButtonClick = () => {
  if (charactersToDisplay.value >= result.value.characters.results.length) {
    charactersToDisplay.value = 6
  } else {
    loadMoreCharacters()
  }
}

const buttonText = computed(() => {
  return charactersToDisplay.value >= result.value.characters.results.length ? 'Back' : 'See More'
})
</script>

<style scoped>
.character-box {
  border: 2px solid lightblue;
}
</style>
