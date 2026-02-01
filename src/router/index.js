import HomeVista from '@/vistas/HomeVista.vue'
import LogingVista from '@/vistas/LogingVista.vue'
import RegisterVista from '@/vistas/RegisterVista.vue'
import WorkspaceVista from '@/vistas/WorkspaceVista.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { estaAuntenticado } from '@/services/autentication'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeVista, meta: { requiresAuth: true } },
    { path: "/workspace", component: WorkspaceVista, meta: { requiresAuth: true } },
    { path: "/login", component: LogingVista },
    { path: "/register", component: RegisterVista }
  ],
})

router.beforeEach((to, from, next) => {
  const toast = useToast()
  if (to.meta.requiresAuth) {
    if (estaAuntenticado()) {
      next()
    } else {
      toast.info("Debes iniciar sesión y verificar tu correo para acceder")
      next("/login")
    }
  } else {
    next()
  }
})

export default router

