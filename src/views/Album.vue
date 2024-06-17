<template>
  <q-page class="q-pa-lg" style="background-color: #679abb">
    <q-spinner v-if="isLoading" size="lg" color="secondary" />
    <div v-else class="photo-masonry">
      <q-img
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.thumbnailUrl"
        :alt="photo.title"
        class="photo-item"
        @click="selectPhoto(photo.id)"
        :style="photo.style"
      ></q-img>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const photos = ref([]);
const isLoading = ref(false);

const getRandomSize = () => {
  const size = Math.random() * 200 + 100; // Random size between 100px and 300px
  return `${size}px`;
};

const fetchPhotos = async (albumId = 1) => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    ); // Directly fetch filtered data
    const data = await response.json();
    photos.value = data.map((photo) => ({
      id: photo.id,
      thumbnailUrl: photo.thumbnailUrl,
      url: photo.url,
      title: photo.title,
      style: {
        width: getRandomSize(),
        height: getRandomSize(),
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#FFB1B1",
      },
    }));
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    isLoading.value = false;
  }
};

const selectPhoto = (photoId) => {
  router.push({ path: `/photo/${photoId}` });
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style scoped>
.photo-masonry {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.photo-item {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
