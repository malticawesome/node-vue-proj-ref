<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users-relationship' }">
        <app-i18n code="entities.usersRelationship.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.usersRelationship.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.usersRelationship.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.usersRelationship.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.usersRelationship.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-users-relationship-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!initLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import UsersRelationshipForm from '@/modules/users-relationship/components/users-relationship-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-users-relationship-form-page',

  props: ['id'],

  components: {
    'app-users-relationship-form': UsersRelationshipForm,
  },

  computed: {
    ...mapGetters({
      record: 'usersRelationship/form/record',
      initLoading: 'usersRelationship/form/initLoading',
      saveLoading: 'usersRelationship/form/saveLoading',
    }),

    isEditing() {
      return Boolean(this.id);
    },
  },

  async created() {
    await this.doInit(this.id);
  },

  methods: {
    ...mapActions({
      doInit: 'usersRelationship/form/doInit',
      doUpdate: 'usersRelationship/form/doUpdate',
      doCreate: 'usersRelationship/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/users-relationship');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
});
</script>

<style></style>
