// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Post from "../views/Post.vue";
import Todo from "../views/Todo.vue";
import Album from "../views/Album.vue";
import AlbumDetail from "../views/AlbumDetail.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Todo",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "/Todo",
          component: Todo,
        },
        {
          path: "/Post",
          component: Post,
        },
        {
          path: "/Album",
          component: Album,
        },
        {
          path: "photo/:photoId",
          component: AlbumDetail,
        },
      ],
    },
  ],
});

export default router;
