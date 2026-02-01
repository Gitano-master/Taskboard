import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase/config'
import { ref } from 'vue'

const user = ref(null)

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
})

// Registrar usuario
const doRegister = async (email, password) => {
  try {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password)
    return {
      ok: true,
      user: credenciales.user,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, error }
  }
}

// Login usuario
const doLogin = async (email, password) => {
  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password)
    return {
      ok: true,
      user: credenciales.user,
    }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

// Logout
const logOut = async () => {
  try {
    await signOut(auth)
    return { ok: true }
  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}

// Enviar email de verificación
export const enviarEmailVerificacion = async (usuarioActual = null) => {
  try {
    const usuario = usuarioActual || auth.currentUser
    if (usuario.emailVerified) {
      console.log('Email ya verificado')
      return { ok: true, mensaje: 'Email ya verificado' }
    }
    await sendEmailVerification(usuario, { url: window.location.origin + '/perfil' })
    return { ok: false, mensaje: 'Email de verificación enviado, revisa tu bandeja de entrada' }
  } catch (error) {
    console.log('Error al enviar email de verificación', error)
    return { ok: false, mensaje: 'Error al enviar email de verificación' }
  }
}

// Comprobar si el usuario está autenticado y verificado
export const estaAuntenticado = () => {
  return user.value !== null && user.value.emailVerified
}

// Obtener usuario actual
export const ObtenerUsuario = () => {
  return user.value
}

export { doLogin, doRegister, logOut, user }
