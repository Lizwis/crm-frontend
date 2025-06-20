<template>
  <div>
    <button class="btn btn-dark btn-sm" @click="dialogVisible = true">
      <i class="bi bi-plus-lg me-1"></i> Add New Client
    </button>

    <el-dialog v-model="dialogVisible" width="500">
      <div class="col-12 pt-2">
        <label class="">First name</label>
        <el-input
          v-model="form.first_name"
          style="width: 100%"
          placeholder="First name"
          size="large"
        />
        <div v-if="errors.first_name" class="text-danger">{{ errors.first_name[0] }}</div>
      </div>
      <div class="col-12 pt-3">
        <label class="">Last name</label>
        <el-input
          v-model="form.last_name"
          style="width: 100%"
          placeholder="Last name"
          size="large"
        />
        <div v-if="errors.last_name" class="text-danger">{{ errors.last_name[0] }}</div>
      </div>
      <div class="col-12 pt-3">
        <label class="">Email</label>
        <el-input v-model="form.email" style="width: 100%" placeholder="Email" size="large" />
        <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
      </div>

      <div class="col-12 pt-3">
        <label class="">Phone number</label>
        <el-input
          v-model="form.phone_number"
          style="width: 100%"
          placeholder="Phone number"
          size="large"
        />
        <div v-if="errors.phone_number" class="text-danger">{{ errors.phone_number[0] }}</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="save"> Save </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ElInput, ElButton, ElAlert, ElDialog, ElNotification } from 'element-plus'

import Client from '@/api/client'

export default {
  emits: ['refresh-post'],
  components: {
    ElInput,
    ElButton,
    ElAlert,
    ElDialog,
    ElNotification,
  },
  setup(props, { emit }) {
    const form = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    })

    const errors = ref({})

    const dialogVisible = ref(false)

    const save = async () => {
      try {
        await Client.create(form.value)
        ElNotification.success({
          title: 'Success',
          message: 'Client Created Successfully',
          offset: 100,
        })
        form.value = {}
        dialogVisible.value = false
        emit('refresh-clients')
      } catch (err) {
        errors.value = err.response.data.errors
      }
    }

    return {
      form,
      dialogVisible,
      errors,
      save,
    }
  },
}
</script>
