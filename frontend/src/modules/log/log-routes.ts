import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const LogListPage = () =>
  import(
    '@/modules/log/components/log-list-page.vue'
  );
const LogFormPage = () =>
  import(
    '@/modules/log/components/log-form-page.vue'
  );
const LogViewPage = () =>
  import(
    '@/modules/log/components/log-view-page.vue'
  );
const LogImporterPage = () =>
  import(
    '@/modules/log/components/log-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'log',
        path: '/log',
        component: LogListPage,
        meta: {
          auth: true,
          permission: Permissions.values.logRead,
        },
      },
      {
        name: 'logNew',
        path: '/log/new',
        component: LogFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.logCreate,
        },
      },
      {
        name: 'logImporter',
        path: '/log/import',
        component: LogImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.logImport,
        },
      },
      {
        name: 'logEdit',
        path: '/log/:id/edit',
        component: LogFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.logEdit,
        },
        props: true,
      },
      {
        name: 'logView',
        path: '/log/:id',
        component: LogViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.logRead,
        },
        props: true,
      },
    ],
  },
];
