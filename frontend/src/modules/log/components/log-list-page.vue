<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.log.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.log.list.title"
        ></app-i18n>
      </h1>

      <app-log-list-toolbar></app-log-list-toolbar>
      <app-log-list-filter></app-log-list-filter>
      <app-log-list-table></app-log-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import LogListFilter from '@/modules/log/components/log-list-filter.vue';
import LogListTable from '@/modules/log/components/log-list-table.vue';
import LogListToolbar from '@/modules/log/components/log-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-log-list-page',

  components: {
    'app-log-list-filter': LogListFilter,
    'app-log-list-table': LogListTable,
    'app-log-list-toolbar': LogListToolbar,
  },
});
</script>

<style></style>
