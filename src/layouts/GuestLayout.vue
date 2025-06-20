<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="p-4 rounded bg-white shadow-sm w-100" style="max-width: 400px">
      <slot />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},

  setup() {
    return {}
  },
})
</script>
