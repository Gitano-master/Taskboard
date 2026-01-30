<template>
<button @click="cerrar_sesion">Cerrar Sesion</button>
<div v-for="(i, index) in lista_tareas" :key="index">
    <div id="datos">
        <p>Id:{{ i.id }}</p>
        <p>Tarea:{{ i.tarea}}</p>
        <p>Realizada:{{ i.realizada }}</p>
        <p>Usuario:{{ i.usuario }}</p>
    </div>
</div>
<button @click="devolver">Tareas</button>
</template>

<script setup>
import { logOut } from '@/services/autentication';
import { useRouter } from 'vue-router'
import { obtenerFavoritos } from '@/services/tareas';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()
const lista_tareas = ref([])
const devolver = async()=>{
  try{

    const resultados = await obtenerFavoritos()
    console.log(resultados)
    if(resultados.ok){
      lista_tareas.value = resultados.favs
    }else{
      toast.error("Error al añadir a favoritos", {
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
  }catch(error){
    console.log(error)
  }
}


const router = useRouter()
const cerrar_sesion = async() =>{
        const resultado = await logOut()
        if(resultado.ok){
            router.push('/login')
        }

    }
</script>

<style>

</style>