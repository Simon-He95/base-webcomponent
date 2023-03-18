<script setup lang="ts">
import { registerComponent } from '../../../src'

registerComponent('user-card')
</script>

<template>
  <user-card
    image="https://semantic-ui.com/images/avatar2/large/kristy.png"
    name="User Name"
    email="yourmail@some-email.com"
  />
</template>
