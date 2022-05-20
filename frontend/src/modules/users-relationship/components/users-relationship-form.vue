<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item
        :label="fields.consultant.label"
        :prop="fields.consultant.name"
        :required="fields.consultant.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.consultant.fetchFn"
            :mapperFn="fields.consultant.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.consultant.name]"
            :placeholder="fields.consultant.placeholder"
            mode="single"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.consultant.hint"
            class="app-form-hint"
          >
            {{ fields.consultant.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.client.label"
        :prop="fields.client.name"
        :required="fields.client.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-user-autocomplete-input
            :fetchFn="fields.client.fetchFn"
            :mapperFn="fields.client.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.client.name]"
            :placeholder="fields.client.placeholder"
            mode="single"
          ></app-user-autocomplete-input>

          <div
            v-if="fields.client.hint"
            class="app-form-hint"
          >
            {{ fields.client.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doReset"
            icon="el-icon-fa-undo"
          >
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doCancel"
            icon="el-icon-fa-close"
          >
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { UsersRelationshipModel } from '@/modules/users-relationship/users-relationship-model';

const { fields } = UsersRelationshipModel;
const formSchema = new FormSchema([
  fields.consultant,
  fields.client,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-users-relationship-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      return this.$emit('submit', {
        id: this.record && this.record.id,
        values: formSchema.cast(this.model),
      });
    },
  },
});
</script>

<style></style>
