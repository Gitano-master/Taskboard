import HomeVista from '@/vistas/HomeVista.vue'
import LogingVista from '@/vistas/LogingVista.vue'
import RegisterVista from '@/vistas/RegisterVista.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { estaAuntenticado } from '@/services/autentication'
import { enviarEmailVerificacion } from '@/services/autentication'
import WorkspaceVista from '@/vistas/WorkspaceVista.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component:HomeVista, meta: {requiresAuth:true}},
    {path:"/workspace", component:WorkspaceVista, meta: {requiresAuth:true}},
    {path:"/login", component: LogingVista},
    {path:"/register", component:RegisterVista}
  ],
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth){
    if((estaAuntenticado())){
      if(enviarEmailVerificacion){
        next()
      }
      
    }else{
      next('/login')
    }
      
  }else{
    next()
  }
})
export default router
