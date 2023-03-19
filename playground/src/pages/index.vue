<script setup lang="ts">
import { register } from '../webcomponent'
register('user-card')
</script>

<template>
  <user-card
    image="https://semantic-ui.com/images/avatar2/large/kristy.png"
    name="你好"
    email="yourmail@some-email.com"
  >
    你好呀
  </user-card>
</template>
