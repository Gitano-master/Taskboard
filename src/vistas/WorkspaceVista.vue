<template>
<button @click="cerrar_sesion">Cerrar Sesion</button>
<router-link to="/">
    <button>Volver</button>
</router-link>
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


<style scoped lang="sass">
/* ===== Reset y box-sizing ===== */
* 
  margin: 0
  padding: 0
  box-sizing: border-box

/* ===== Quitar estilos por defecto de router-link (<a>) ===== */
a
  text-decoration: none
  color: inherit

body
  overflow-x: hidden
  font-family: 'Arial', sans-serif
  background: #f5f5f5

/* ===== Botones ===== */
button
  padding: 10px 20px
  background: #007bff
  color: #fff
  font-size: 16px
  border: none
  border-radius: 5px
  cursor: pointer
  transition: background 0.3s
  margin: 15px auto
  display: block

  &:hover
    background: #0056b3

/* ===== Contenedor de tareas ===== */
div[v-for]
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr))
  gap: 20px
  width: 100%
  max-width: 1200px
  margin: 20px auto
  justify-items: center
  padding: 20px

/* ===== Cada tarjeta de tarea ===== */
#datos
  background: #fff
  padding: 20px
  border-radius: 12px
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1)
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
  min-height: 180px
  text-align: center
  overflow: hidden
  transition: transform 0.3s, box-shadow 0.3s

  p
    margin: 5px 0
    color: #333
    font-size: 14px
    line-height: 1.2

  &:hover
    transform: translateY(-5px)
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15)

/* ===== Media Queries Responsivas ===== */
@media (max-width: 1200px)
  div[v-for]
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr))

@media (max-width: 992px)
  div[v-for]
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr))

@media (max-width: 768px)
  div[v-for]
    grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr))

@media (max-width: 480px)
  div[v-for]
    grid-template-columns: 1fr


</style>