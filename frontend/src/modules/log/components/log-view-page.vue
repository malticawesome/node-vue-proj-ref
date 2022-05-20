<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/log' }">
        <app-i18n code="entities.log.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.log.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.log.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-log-view-toolbar
        v-if="record"
      ></app-log-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.liquidInjection.label" :value="presenter(record, 'liquidInjection')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import LogViewToolbar from '@/modules/log/components/log-view-toolbar.vue';
import { LogModel } from '@/modules/log/log-model';

const { fields } = LogModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-log-view-page',

  props: ['id'],

  components: {
    'app-log-view-toolbar': LogViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'log/view/record',
      loading: 'log/view/loading',
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
      doFind: 'log/view/doFind',
    }),

    presenter(record, fieldName) {
      return LogModel.presenter(record, fieldName);
    },
  },
});
</script>
