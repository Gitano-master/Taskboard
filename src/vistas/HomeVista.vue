<template>
  <button @click="cerrar_sesion">Cerrar Sesion</button>
  <div id="filtro">
    <select v-model="filtro">
      <option value="" selected disabled hidden>Selecciona una opción</option>
      <option value="todas">Todas</option>
      <option value="completadas">Completadas</option>
      <option value="nocompletadas">No completadas</option>
    </select>
  </div>
  <div id="contenedor">
    <div id="contenido" v-for="(i, index) in filtrar" :key="index">
        <div id="datos">
            <p>Id:{{ i.id }}</p>
            <p>Tarea:{{ i.todo }}</p>
            <p>Realizada:{{ i.completed }}</p>
            <p>Usuario:{{ i.userId }}</p>
        </div>
        <button id="boton" @click="anadir_tarea({
            id : i.id,
            tarea : i.todo,
            realizada : i.completed,
            usuario : i.userId
        })">Agregar tarea</button>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/stores/peticion';
import { onMounted } from 'vue';
import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router'
import { anadirFavoritos } from '@/services/tareas';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import { computed } from 'vue';

const toast = useToast()


const router = useRouter()
const cerrar_sesion = async() =>{
        const resultado = await logOut()
        if(resultado.ok){
            router.push('/login')
        }

    }
const tareas = api()
onMounted(async()=>{
    await tareas.getData()
})

const anadir_tarea = async (Tareas) => {
  try {
    
    const response = await anadirFavoritos(Tareas)
    if (response.ok) {
      toast.success("Añadido a Workspace", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        })
    } else {
      console.log(response)
    }
    return
  } catch (error) {
    toast.error("Error al añadir a workspace", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false})
  }
}

const filtro = ref("")

const filtrar = computed(()=>{
  if(filtro.value === "todas"){

    return tareas.lista_tareas

  }
  if(filtro.value ==="completadas"){

    return tareas.lista_tareas.filter(i=> i.completed === true)

  }
  if(filtro.value ==="nocompletadas"){

    return tareas.lista_tareas.filter(i=> i.completed === false)

  }
  return tareas.lista_tareas
})

</script>

<style>

</style>