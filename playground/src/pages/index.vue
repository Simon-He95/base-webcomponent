<script setup lang="ts">
// import { registerUserCard } from '../../../src/UserCard'
import { register } from '../webcomponent'
// registerUserCard('user-card')
register('user-card')
</script>

<template>
  <user-card
    image="https://semantic-ui.com/images/avatar2/large/kristy.png"
    name="User Name"
    email="yourmail@some-email.com"
  />
</template>
