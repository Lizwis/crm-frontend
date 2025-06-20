<template>
  <div class="container-fluid py-4">
    <!-- Page Header -->
    <div class="mb-4">
      <h2 class="fw-bold">Client Roster Manager</h2>
      <p class="text-muted">Manage your client relationships efficiently</p>
    </div>

    <!-- Summary Cards -->
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex align-items-center">
            <i class="bi bi-people fs-3 text-primary me-3"></i>
            <div>
              <div class="fw-bold">Total Clients</div>
              <div class="fs-4">{{ stats.totalClients }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex align-items-center">
            <i class="bi bi-circle-fill text-success fs-3 me-3"></i>
            <div>
              <div class="fw-bold">Active Clients</div>
              <div class="fs-4 text-success">{{ stats.activeClients }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex align-items-center">
            <i class="bi bi-circle-fill text-secondary fs-3 me-3"></i>
            <div>
              <div class="fw-bold">Inactive Clients</div>
              <div class="fs-4 text-secondary">{{ stats.deletedClients }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Directory Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold mb-0">Client Directory</h5>
      <CreateClient @refresh-clients="getClients" />
    </div>

    <!-- Search -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search clients by name, email, or company..."
        v-model="search"
      />
    </div>

    <!-- Table -->
    <div class="table-responsive shadow-sm rounded bg-white">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id">
            <td>{{ client.first_name }}</td>
            <td>{{ client.last_name }}</td>
            <td>
              <div><i class="bi bi-envelope me-1"></i> {{ client.email }}</div>
              <div><i class="bi bi-telephone me-1"></i> {{ client.phone_number }}</div>
            </td>
            <td>
              <span
                class="badge"
                :class="
                  client.deleted_at === null
                    ? 'bg-success-subtle text-success'
                    : 'bg-secondary-subtle text-secondary'
                "
              >
                {{ client.deleted_at === null ? 'Active' : 'Deleted' }}
              </span>
            </td>
            <td>{{ client.created_at_formatted }}</td>
            <td>
              <UpdateClient :client="client" @refresh-clients="getClients" />
              <button class="btn btn-sm text-danger" @click="deleteClient(client.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Client from '@/api/client'

import CreateClient from '@/components/createClient.vue'
import UpdateClient from '@/components/editClient.vue'
import { ElMessageBox, ElNotification } from 'element-plus'
export default {
  layout: 'auth',
  components: {
    CreateClient,
    UpdateClient,
    ElMessageBox,
    ElNotification,
  },
  setup() {
    const search = ref('')
    const clients = ref([])

    const stats = ref({
      totalClients: 0,
      activeClients: 0,
      deletedClients: 0,
    })

    const getClients = async () => {
      getClients.value = null
      const response = await Client.list()
      clients.value = response.data.data

      stats.value = {
        totalClients: clients.value.length,
        activeClients: clients.value.filter((client) => client.deleted_at === null).length,
        deletedClients: clients.value.filter((client) => client.deleted_at !== null).length,
      }
    }

    onMounted(async () => {
      await getClients()
    })

    const deleteClient = async (id) => {
      try {
        await ElMessageBox.confirm(
          'Are you sure you want to delete this client?',
          'Confirm Deletion',
          {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
          },
        )

        await Client.delete(id)
        await getClients()

        ElNotification.success({
          title: 'Deleted',
          message: 'Client deleted successfully',
          offset: 100,
        })
      } catch (err) {}
    }

    const filteredClients = computed(() =>
      clients.value.filter((c) =>
        `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(search.value.toLowerCase()),
      ),
    )

    return {
      search,
      clients,
      filteredClients,
      stats,
      getClients,
      deleteClient,
    }
  },
}
</script>
