<template>
  <div>
        <h1>Bienvenido al Login</h1>
        <form @submit.prevent="login">
            <input type="email"  id="email" v-model="email" placeholder="email">
            <input type="password" id="password" v-model="password" placeholder="contraseña">
            
            <button>Enviar Datos</button>
        </form>
        <router-link to="/register">¿Estas registrado?</router-link>
    </div>
</template>

<script setup>
import { ref} from 'vue';
import { doLogin, enviarEmailVerificacion } from '@/services/autentication';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter()
const  toast = useToast()
const email = ref('')
const password = ref('')


const login = async()=>{
    
    const response = await doLogin(email.value, password.value)
    const usuario = response?.user?.user
    const respuestamail = enviarEmailVerificacion(usuario)
    if(respuestamail){
        if(response.ok){
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
        router.push('/')
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
    }else{
        toast.error("Debes verificar el", {
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
    border-color: #007bff

button
  padding: 12px
  background: #007bff
  color: #fff
  font-size: 16px
  border: none
  border-radius: 5px
  cursor: pointer
  transition: background 0.3s

  &:hover
    background: #0056b3

router-link
  margin-top: 15px
  color: #007bff
  text-decoration: none
  transition: color 0.3s

  &:hover
    color: #0056b3

@media (max-width: 480px)
  form
    padding: 20px

</style>


