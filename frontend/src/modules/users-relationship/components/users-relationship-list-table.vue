<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column :label="fields.consultant.label" :prop="fields.consultant.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.consultant.label"
            :permission="fields.consultant.readPermission"
            :url="fields.consultant.viewUrl"
            :value="presenter(scope.row, 'consultant')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.client.label" :prop="fields.client.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.client.label"
            :permission="fields.client.readPermission"
            :url="fields.client.viewUrl"
            :value="presenter(scope.row, 'client')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/users-relationship/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/users-relationship/${scope.row.id}/edit`"
              v-if="hasPermissionToEdit"
            >
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { UsersRelationshipModel } from '@/modules/users-relationship/users-relationship-model';
import { mapGetters, mapActions } from 'vuex';
import { UsersRelationshipPermissions } from '@/modules/users-relationship/users-relationship-permissions';
import { i18n } from '@/i18n';

const { fields } = UsersRelationshipModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-users-relationship-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'usersRelationship/list/rows',
      count: 'usersRelationship/list/count',
      loading: 'usersRelationship/list/loading',
      pagination: 'usersRelationship/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'usersRelationship/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new UsersRelationshipPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new UsersRelationshipPermissions(
        this.currentTenant,
        this.currentUser,
      ).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'usersRelationship/list/doChangeSort',
      doChangePaginationCurrentPage:
        'usersRelationship/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'usersRelationship/list/doChangePaginationPageSize',
      doMountTable: 'usersRelationship/list/doMountTable',
      doDestroy: 'usersRelationship/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return UsersRelationshipModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
});
</script>

<style></style>
