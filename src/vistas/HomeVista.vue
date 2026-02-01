<template>
  <button @click="cerrar_sesion">Cerrar Sesion</button>
  <router-link to="/workspace">
    <button>Tareas</button>
  </router-link>

  
  <div id="filtro">
    <select v-model="filtro">
      <option value="" selected disabled hidden>Selecciona una opción</option>
      <option value="todas">Todas</option>
      <option value="completadas">Completadas</option>
      <option value="nocompletadas">No completadas</option>
    </select>
  </div>
  
<div class="spinner" v-if="cargando">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>

  <div id="contenedor">
    <div id="contenido" v-for="(i, index) in filtrar" :key="index">
        <div id="datos">
            <p>Id:{{ i.id }}</p>
            <p>Tarea:{{ i.todo }}</p>
            <p>Realizada:{{ i.completed }}</p>
            <p>Usuario:{{ i.userId }}</p>
        </div>
        <button id="boton" v-if="i.completed == false" @click="anadir_tarea({
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
import { watch } from 'vue';

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
    filtrar.value = tareas.lista_tareas
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
const filtrar = ref([])

const cargando = ref(false)

watch(filtro, (nuevoValor) => {
  cargando.value = true 
  setTimeout(() => {
    if (nuevoValor === 'todas') {
      filtrar.value = tareas.lista_tareas
    } else if (nuevoValor === 'completadas') {
      filtrar.value = tareas.lista_tareas.filter(tarea => tarea.completed === true)
    } else if (nuevoValor === 'nocompletadas') {
      filtrar.value = tareas.lista_tareas.filter(tarea => tarea.completed === false)
    } 
    cargando.value = false 
  }, 2000) 
})


</script>

<style scoped lang="sass">
/* ===== Reset y box-sizing ===== */
* 
  margin: 0
  padding: 0
  box-sizing: border-box

body
  overflow-x: hidden
  font-family: 'Arial', sans-serif
  background: #f5f5f5

/* ===== Botón general ===== */
button
  padding: 10px 20px
  background: #007bff
  color: #fff
  font-size: 16px
  border: none
  border-radius: 5px
  cursor: pointer
  transition: background 0.3s
  margin-bottom: 15px
  margin-right: 10px


  &:hover
    background: #0056b3

/* ===== Filtro select ===== */
#filtro
  margin-bottom: 20px
  width: 100%
  max-width: 300px

  select
    width: 100%
    padding: 10px
    border-radius: 5px
    border: 1px solid #ccc
    font-size: 16px
    &:focus
      outline: none
      border-color: #007bff

/* ===== Contenedor principal (grid) ===== */
#contenedor
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr))
  gap: 20px
  width: 100%
  max-width: 1200px
  margin: 0 auto
  justify-items: center
  padding: 20px

/* ===== Cada tarjeta de tarea ===== */
#contenido
  background: #fff
  padding: 20px
  border-radius: 12px
  box-shadow: 0 6px 15px rgba(0,0,0,0.1)  /* sombra más marcada */
  display: flex
  flex-direction: column
  justify-content: space-between
  width: 100%
  height: 240px
  text-align: center
  overflow: hidden
  transition: transform 0.3s, box-shadow 0.3s /* animación hover */

  &:hover
    transform: translateY(-5px)               /* levanta la tarjeta al pasar el mouse */
    box-shadow: 0 12px 25px rgba(0,0,0,0.15) /* sombra más intensa al hover */

/* ===== Datos internos de la tarjeta ===== */
#datos
  margin-bottom: 10px
  flex: 1
  overflow: hidden
  text-overflow: ellipsis
  word-wrap: break-word
  display: flex
  flex-direction: column
  justify-content: center

  p
    margin: 3px 0
    color: #333
    font-size: 14px
    line-height: 1.2

#boton
  padding: 10px
  background: #28a745
  color: #fff
  border: none
  border-radius: 5px
  cursor: pointer
  transition: background 0.3s
  flex-shrink: 0
  margin-top: 10px

  &:hover
    background: #218838

/* ===== Spinner ===== */
.spinner
  width: 40px
  height: 40px
  position: relative
  margin: 50px auto

.double-bounce1, .double-bounce2
  width: 100%
  height: 100%
  border-radius: 50%
  background-color: #007bff
  opacity: 0.6
  position: absolute
  top: 0
  left: 0
  animation: bounce 2.0s infinite ease-in-out

.double-bounce2
  animation-delay: -1.0s

@keyframes bounce
  0%, 100%
    transform: scale(0)
  50%
    transform: scale(1)

/* ===== Media Queries Responsivas ===== */
@media (max-width: 1200px)
  #contenedor
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr))

@media (max-width: 992px)
  #contenedor
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr))

@media (max-width: 768px)
  #contenedor
    grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr))

@media (max-width: 480px)
  #contenedor
    grid-template-columns: 1fr



</style>
