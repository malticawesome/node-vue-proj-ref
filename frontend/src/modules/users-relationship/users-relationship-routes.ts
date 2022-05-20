import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const UsersRelationshipListPage = () =>
  import(
    '@/modules/users-relationship/components/users-relationship-list-page.vue'
  );
const UsersRelationshipFormPage = () =>
  import(
    '@/modules/users-relationship/components/users-relationship-form-page.vue'
  );
const UsersRelationshipViewPage = () =>
  import(
    '@/modules/users-relationship/components/users-relationship-view-page.vue'
  );
const UsersRelationshipImporterPage = () =>
  import(
    '@/modules/users-relationship/components/users-relationship-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'usersRelationship',
        path: '/users-relationship',
        component: UsersRelationshipListPage,
        meta: {
          auth: true,
          permission: Permissions.values.usersRelationshipRead,
        },
      },
      {
        name: 'usersRelationshipNew',
        path: '/users-relationship/new',
        component: UsersRelationshipFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.usersRelationshipCreate,
        },
      },
      {
        name: 'usersRelationshipImporter',
        path: '/users-relationship/import',
        component: UsersRelationshipImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.usersRelationshipImport,
        },
      },
      {
        name: 'usersRelationshipEdit',
        path: '/users-relationship/:id/edit',
        component: UsersRelationshipFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.usersRelationshipEdit,
        },
        props: true,
      },
      {
        name: 'usersRelationshipView',
        path: '/users-relationship/:id',
        component: UsersRelationshipViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.usersRelationshipRead,
        },
        props: true,
      },
    ],
  },
];
