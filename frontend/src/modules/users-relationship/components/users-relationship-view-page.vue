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
          code="entities.usersRelationship.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.usersRelationship.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-users-relationship-view-toolbar
        v-if="record"
      ></app-users-relationship-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-relation-to-one
          :label="fields.consultant.label"
          :permission="fields.consultant.readPermission"
          :url="fields.consultant.viewUrl"
          :value="presenter(record, 'consultant')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-one
          :label="fields.client.label"
          :permission="fields.client.readPermission"
          :url="fields.client.viewUrl"
          :value="presenter(record, 'client')"
        ></app-view-item-relation-to-one>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import UsersRelationshipViewToolbar from '@/modules/users-relationship/components/users-relationship-view-toolbar.vue';
import { UsersRelationshipModel } from '@/modules/users-relationship/users-relationship-model';

const { fields } = UsersRelationshipModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-users-relationship-view-page',

  props: ['id'],

  components: {
    'app-users-relationship-view-toolbar': UsersRelationshipViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'usersRelationship/view/record',
      loading: 'usersRelationship/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'usersRelationship/view/doFind',
    }),

    presenter(record, fieldName) {
      return UsersRelationshipModel.presenter(record, fieldName);
    },
  },
});
</script>
