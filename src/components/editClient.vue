<template>
  <button class="btn btn-sm text-primary me-2" @click="openDialog">
    <i class="bi bi-pencil"></i>
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
      <el-input v-model="form.last_name" style="width: 100%" placeholder="Last name" size="large" />
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
        <el-button type="primary" @click="update">Update</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import { ElInput, ElButton, ElAlert, ElDialog, ElNotification } from 'element-plus'
import Client from '@/api/client'

export default {
  name: 'UpdateClient',
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  emits: ['refresh-clients'],
  components: {
    ElInput,
    ElButton,
    ElAlert,
    ElDialog,
    ElNotification,
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)

    const form = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    })

    const errors = ref({})

    const openDialog = () => {
      form.value = {
        first_name: props.client.first_name,
        last_name: props.client.last_name,
        email: props.client.email,
        phone_number: props.client.phone_number,
      }
      dialogVisible.value = true
      errors.value = {}
    }

    const update = async () => {
      try {
        await Client.update(props.client.id, form.value)
        ElNotification.success({
          title: 'Success',
          message: 'Client Updated Successfully',
          offset: 100,
        })
        dialogVisible.value = false
        emit('refresh-clients')
      } catch (err) {
        errors.value = err.response.data.errors
      }
    }

    return {
      form,
      errors,
      dialogVisible,
      openDialog,
      update,
    }
  },
}
</script>
