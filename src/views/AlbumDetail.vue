<template>
  <q-page class="q-pa-lg detail-page" style="background-color: #679abb">
    <q-spinner v-if="isLoading" size="lg" color="secondary" />
    <q-card v-else-if="photo" class="photo-card">
      <q-img :src="photo.url" class="photo-img q-mb-md" :alt="photo.title" />
      <div class="photo-title">{{ photo.title }}</div>
      <q-btn @click="goBack" color="secondary" class="q-mt-md back-btn"
        >Back to Gallery</q-btn
      >
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const photo = ref(null);
const isLoading = ref(false);

const fetchPhoto = async (id) => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    photo.value = await response.json();
  } catch (error) {
    console.error("Error fetching photo:", error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/album");
};

onMounted(() => {
  fetchPhoto(route.params.photoId);
});
</script>

<style scoped>
.detail-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.photo-card {
  padding: 20px;
  background-color: #ffcbcb;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
}

.photo-img {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo-title {
  font-family: "Georgia", serif;
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-top: 10px;
}

.back-btn {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
}
</style>
