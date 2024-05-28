<template>
  <div>
    <nav class="bg-gray-900 p-4">
      <div class="bg-gray-900 container mx-auto flex justify-between items-center">
        <span class="text-green-600 font-get-schwifty">Rick&Morty</span>
      </div>
      <!-- Navigation Links -->
      <div class="flex space-x-4 text-green-600 justify-end">
        <router-link :to="{ path: '/' }"><a class="hover:underline">Home</a></router-link>
        <router-link :to="{ path: '/Episodes/' }"><a class="hover:underline">Episodes</a></router-link>
        <router-link :to="{ path: '/characters/' }"><a class="hover:underline">Characters</a></router-link>
        <router-link :to="{ path: '/Locations/' }"><a class="hover:underline">Locations</a></router-link>
      </div>
    </nav>
    <div class="container mx-auto bg-gray-900 p-8">
      <h1 class="text-4xl font-bold text-center text-green-600 my-8">Locations</h1>
      <div v-if="loading" class="text-center text-green-600">Loading...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error.message }}</div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(loc, index) in displayedLocations" :key="index" class="bg-gray-700 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 w-full mb-6">
            <div class="p-6">
              <h2 class="text-2xl font-semibold text-green-600 mb-2">{{ loc.name }}</h2>
              <p class="text-white"><b>Type:</b> {{ loc.type }}</p>
              <p class="text-white"><b>Dimension:</b> {{ loc.dimension }}</p>
              <p class="text-white"><b>Created:</b> {{ loc.created }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg bg-gray-600">
              <div v-for="(resident, i) in (expandedResidents[index] ? loc.residents : loc.residents.slice(0, 2))" :key="i" class="bg-gray-800 shadow-md rounded-full p-2 m-2 flex items-center justify-center" style="width: 64%;"> <!-- Adjust width as needed -->
                <div class="flex items-center">
                  <img :src="resident.image" :alt="resident.name" class="w-8 h-8 rounded-full mr-2">
                  <div class="text-sm text-white">
                    <p class="mb-1"><b>Name:</b> {{ resident.name }}</p>
                    <p class="mb-1"><b>Status:</b> {{ resident.status }}</p>
                    <p class="mb-1"><b>Species:</b> {{ resident.species }}</p>
                    <p class="mb-1"><b>Gender:</b> {{ resident.gender }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="loc.residents.length > 2" class="flex justify-center md:col-span-2">
              <button @click="toggleExpanded(index)" class="text-green-600 hover:underline px-4 py-2 rounded-lg mt-4">{{ expandedResidents[index] ? 'Less' : 'More' }}</button>
            </div>
          </div>
        </div>
        <button v-if="moreLocationsVisible" @click="toggleMoreLocations" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">See More</button>
      </div>
    </div>
     <!--my  GitHub link -->
     <footer class="bg-gray-900 text-white text-center py-4 flex justify-center gap-8">
  <a href="https://github.com/rahel-yekoye" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">GitHub</a>
  <a href="https://www.figma.com/design/nxAbKiuxdTdD5vzhFRDst7/locationpage?node-id=0-1&t=vGJPm2nWYVvm4r9Z-0" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-green-600 font-semibold hover:underline mt-4">figma-link</a>
</footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const LOCATION_QUERY = gql`
  query Location {
    locations {
      results {
        name
        type
        dimension
        created
        residents {
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

const { result, loading, error } = useQuery(LOCATION_QUERY);
const expandedResidents = ref([]);
const displayedLocations = ref([]);
const moreLocationsVisible = ref(false);

const toggleExpanded = (index) => {
  expandedResidents.value[index] = !expandedResidents.value[index];
}

const toggleMoreLocations = () => {
  displayedLocations.value = result.value?.locations.results;
  moreLocationsVisible.value = false;
}

onMounted(() => {
  watch(result, (newVal) => {
    if (newVal?.locations.results && newVal.locations.results.length > 0) {
      displayedLocations.value = newVal.locations.results.slice(0, 6);
      moreLocationsVisible.value = newVal.locations.results.length > 6;
    }
  }, { immediate: true });
});


</script>


<style scoped>
/* Custom styles can go here if needed */
.character-container {
  border-radius: 48%; /* Adjust the border-radius value as needed */
}

.character {
  width: 50%;
}
</style>

