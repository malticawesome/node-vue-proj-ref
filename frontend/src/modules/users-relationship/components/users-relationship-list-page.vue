<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.usersRelationship.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.usersRelationship.list.title"
        ></app-i18n>
      </h1>

      <app-users-relationship-list-toolbar></app-users-relationship-list-toolbar>
      <app-users-relationship-list-filter></app-users-relationship-list-filter>
      <app-users-relationship-list-table></app-users-relationship-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import UsersRelationshipListFilter from '@/modules/users-relationship/components/users-relationship-list-filter.vue';
import UsersRelationshipListTable from '@/modules/users-relationship/components/users-relationship-list-table.vue';
import UsersRelationshipListToolbar from '@/modules/users-relationship/components/users-relationship-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-users-relationship-list-page',

  components: {
    'app-users-relationship-list-filter': UsersRelationshipListFilter,
    'app-users-relationship-list-table': UsersRelationshipListTable,
    'app-users-relationship-list-toolbar': UsersRelationshipListToolbar,
  },
});
</script>

<style></style>
