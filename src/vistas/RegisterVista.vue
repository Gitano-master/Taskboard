<template>
    <div>
        <h1>Bienvenido al Register</h1>
        <form @submit.prevent="registrar">
            <input type="email"  id="email" v-model="email" placeholder="email">
            <input type="password" id="password" v-model="password" placeholder="contraseña">
            <input type="password" id="Comprobarpassword" v-model="Comprobarpassword" placeholder="contraseña">
            <button>Registrar</button>
        </form>
        <router-link to="/login">¿Estas logeado?</router-link>
    </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { doRegister, enviarEmailVerificacion } from '@/services/autentication';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter()
const  toast = useToast()
const email = ref('')
const password = ref('')
const Comprobarpassword = ref('')
const valido = computed(()=>{
   return Comprobarpassword.value ===password.value
})
const registrar = async()=>{
    if(!valido.value){
        toast.error("No coinciden las constraseña", {
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
            return
        }
    const response = await doRegister(email.value, password.value)
    
    if(response.ok){
        await enviarEmailVerificacion(response.user.user)
        toast.success("La informacion correcta", {
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
        router.push('/login')
    }else{
        toast.error("No coinciden las constraseña", {
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


</script>

<style scoped lang="sass">
div
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px
  background: #f5f5f5
  font-family: 'Arial', sans-serif

h1
  margin-bottom: 20px
  color: #333

form
  display: flex
  flex-direction: column
  width: 100%
  max-width: 400px
  background: #fff
  padding: 30px
  border-radius: 10px
  box-shadow: 0 4px 10px rgba(0,0,0,0.1)

input
  padding: 12px
  margin-bottom: 15px
  border: 1px solid #ccc
  border-radius: 5px
  font-size: 16px
  transition: border-color 0.3s

  &:focus
    outline: none
    border-color: #28a745

button
  padding: 12px
  background: #28a745
  color: #fff
  font-size: 16px
  border: none
  border-radius: 5px
  cursor: pointer
  transition: background 0.3s

  &:hover
    background: #218838

router-link
  margin-top: 15px
  color: #28a745
  text-decoration: none
  transition: color 0.3s

  &:hover
    color: #1e7e34

@media (max-width: 480px)
  form
    padding: 20px

</style>

