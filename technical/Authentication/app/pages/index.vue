<script setup lang="ts">
   const email = ref('')
   const password = ref('')
   const error = ref('')
   const loading = ref(false)

   async function login() {
      error.value = ''
      loading.value = true
      try {
         await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value },
         })
         await navigateTo('/')
      } catch (e: any) {
         error.value = e.data?.message || 'Une erreur est survenue'
      } finally {
         loading.value = false
      }
   }
</script>

<template>
   <div class="page">
      <div class="card">
         <h1>Connexion</h1>
         <p class="sub">Accédez à votre espace</p>

         <p v-if="error" class="error">{{ error }}</p>

         <div class="field">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="vous@exemple.com" />
         </div>
         <div class="field">
            <label>Mot de passe</label>
            <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="login" />
         </div>

         <button :disabled="loading" @click="login">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
         </button>
      </div>
   </div>
</template>

<style scoped>
   .page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
   }
   .card {
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 2rem;
      width: 100%;
      max-width: 380px;
   }
   h1 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 6px;
   }
   .sub {
      font-size: 14px;
      color: #666;
      margin-bottom: 1.5rem;
   }
   .error {
      font-size: 13px;
      color: #c0392b;
      background: #fdf0ef;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 1rem;
   }
   label {
      font-size: 13px;
      color: #555;
      display: block;
      margin-bottom: 6px;
   }
   .field {
      margin-bottom: 1rem;
   }
   input {
      width: 100%;
      padding: 8px 12px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 8px;
      outline: none;
   }
   input:focus {
      border-color: #999;
   }
   button {
      width: 100%;
      padding: 10px;
      background: #111;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 0.5rem;
   }
   button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
   }
</style>
