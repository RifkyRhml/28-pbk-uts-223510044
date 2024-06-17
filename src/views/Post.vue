<template>
  <div class="profile">
    <h1>Posts</h1>
    <div class="user-select">
      <label for="users">Choose a User:</label>
      <select id="users" v-model="selectedUserId" @change="loadUserPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div class="user-posts">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-for="post in userPosts" :key="post.id" class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      userPosts: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    loadUserPosts() {
      if (!this.selectedUserId) return;
      this.loading = true;
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.userPosts = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user posts:", error);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.profile {
  background-color: #679abb;
  color: #f0f0f0;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
}

.profile h1 {
  font-family: "Arial Black", Gadget, sans-serif;
  color: #ffb1b1;
  text-align: center;
  margin-bottom: 20px;
}

.user-select {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.user-select label {
  font-family: "Arial", sans-serif;
  color: #ffb1b1;
  margin-right: 10px;
}

.user-select select {
  font-family: "Arial", sans-serif;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ffcbcb;
  background-color: #ffb1b1;
  color: #1e1e1e;
}

.user-posts {
  margin-top: 20px;
}

.user-posts .loading {
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  color: #ffb1b1;
}

.user-posts .post {
  background-color: #ffcbcb;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-posts h2 {
  color: #679abb;
  font-family: "Verdana", Geneva, sans-serif;
  margin-bottom: 10px;
}

.user-posts p {
  color: #1e1e1e;
  font-family: "Verdana", Geneva, sans-serif;
}
</style>
