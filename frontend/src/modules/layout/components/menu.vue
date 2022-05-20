<template>
  <el-aside :width="asideWidth">
    <h1 class="logo">
      <router-link to="/">
        <img
          v-if="logoUrl"
          :src="logoUrl"
          width="164px"
          alt=""
          :style="{ verticalAlign: 'middle' }"
        />
        <app-i18n
          v-if="!logoUrl"
          code="app.title"
        ></app-i18n>
      </router-link>
    </h1>

    <el-menu
      background-color="#001529"
      text-color="rgba(255,255,255,0.65)"
      :class="{
        'el-menu-side-nav': true,
        collapsed: collapsed,
      }"
      :collapse="collapsed"
      :collapse-transition="false"
      :router="true"
      @select="collapseMenuIfMobile()"
    >
      <el-menu-item
        :class="classFor('/', true)"
        :route="{ path: '/' }"
        index="/"
      >
        <i class="el-icon-fa-tachometer"></i>
        <span slot="title">
          <app-i18n code="dashboard.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/plan')"
        :route="{ path: '/plan' }"
        index="/plan"
        v-if="hasPermissionToPlan || planLocked"
        :disabled="planLocked"
      >
        <i class="el-icon-fa-credit-card"></i>
        <span slot="title">
          <app-i18n code="plan.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/user')"
        :route="{ path: '/user' }"
        index="/user"
        v-if="hasPermissionToUser || userLocked"
        :disabled="userLocked"
      >
        <i class="el-icon-fa-user-plus"></i>
        <span slot="title">
          <!-- <app-i18n code="user.menu"></app-i18n> -->
          <span :v-if="isConsultant()">Client</span>
          <span :v-if="isClient()">Consultant</span>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/audit-logs')"
        :route="{ path: '/audit-logs' }"
        index="/audit-logs"
        v-if="hasPermissionToAuditLog || auditLogLocked"
        :disabled="auditLogLocked"
      >
        <i class="el-icon-fa-history"></i>
        <span slot="title">
          <app-i18n code="auditLog.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/settings')"
        :route="{ path: '/settings' }"
        index="/settings"
        v-if="hasPermissionToSettings || settingsLocked"
        :disabled="settingsLocked"
      >
        <i class="el-icon-fa-cog"></i>
        <span slot="title">
          <app-i18n code="settings.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/log')"
        :route="{ path: '/log' }"
        index="/log"
        v-if="hasPermissionToLog || logLocked"
        :disabled="logLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.log.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/users-relationship')"
        :route="{ path: '/users-relationship' }"
        index="/users-relationship"
        v-if="hasPermissionToUsersRelationship || usersRelationshipLocked"
        :disabled="usersRelationshipLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.usersRelationship.menu"></app-i18n>
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { SettingsPermissions } from '@/modules/settings/settings-permissions';
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { UserPermissions } from '@/modules/user/user-permissions';
import { PlanPermissions } from '@/modules/plan/plan-permissions';
import { LogPermissions } from '@/modules/log/log-permissions';
import { UsersRelationshipPermissions } from '@/modules/users-relationship/users-relationship-permissions';
import config from '@/config';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-menu',

  computed: {
    ...mapGetters({
      collapsed: 'layout/menuCollapsed',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      logoUrl: 'auth/logoUrl',
      userRoles: 'auth/roles'
    }),

    hasPermissionToPlan() {
      return (
        config.isPlanEnabled &&
        new PlanPermissions(
          this.currentTenant,
          this.currentUser,
        ).read
      );
    },

    hasPermissionToSettings() {
      return new SettingsPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToAuditLog() {
      return new AuditLogPermissions(
        this.currentTenant,
        this.currentUser,
      ).read;
    },
    hasPermissionToUser() {

      return new UserPermissions(
        this.currentTenant,
        this.currentUser,
      ).read;
    },

    hasPermissionToLog() {
      return new LogPermissions(this.currentTenant, this.currentUser).read;
    },
    hasPermissionToUsersRelationship() {
      return new UsersRelationshipPermissions(this.currentTenant, this.currentUser).read;
    },

    planLocked() {
      return (
        config.isPlanEnabled &&
        new PlanPermissions(
          this.currentTenant,
          this.currentUser,
        ).lockedForCurrentPlan
      );
    },

    settingsLocked() {
      return new SettingsPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    auditLogLocked() {
      return new AuditLogPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    userLocked() {
      return new UserPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    logLocked() {
      return new LogPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },
    usersRelationshipLocked() {
      return new UsersRelationshipPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },

    asideWidth() {
      if (this.isMobile && !this.collapsed) {
        return '100%';
      }

      if (!this.collapsed) {
        return '200px';
      }

      return '0px';
    },
  },

  methods: {
    ...mapActions({
      collapseMenu: 'layout/collapseMenu',
    }),
    isConsultant():boolean{
      debugger
      return this.userRoles[0] === "consultant"
    },
    isClient():boolean{
      debugger
      return this.userRoles[0] === "client"
    },
    collapseMenuIfMobile() {
      if (this.isMobile) {
        this.collapseMenu();
      }
    },

    classFor(path, exact = false) {
      if (exact) {
        return {
          active: this.$route.path === path,
        };
      }

      const routePath = this.$route.path;
      const active =
        routePath === path ||
        routePath.startsWith(path + '/');

      return {
        active,
      };
    },
  },
});
</script>

<style scoped>
.el-menu.collapsed span {
  visibility: hidden;
}
</style>
