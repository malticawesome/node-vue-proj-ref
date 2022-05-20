import usersRelationshipListStore from '@/modules/users-relationship/users-relationship-list-store';
import usersRelationshipViewStore from '@/modules/users-relationship/users-relationship-view-store';
import usersRelationshipImporterStore from '@/modules/users-relationship/users-relationship-importer-store';
import usersRelationshipFormStore from '@/modules/users-relationship/users-relationship-form-store';
import usersRelationshipDestroyStore from '@/modules/users-relationship/users-relationship-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: usersRelationshipDestroyStore,
    form: usersRelationshipFormStore,
    list: usersRelationshipListStore,
    view: usersRelationshipViewStore,
    importer: usersRelationshipImporterStore,
  },
};
