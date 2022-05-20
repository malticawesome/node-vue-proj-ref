import routes from '@/modules/users-relationship/users-relationship-routes';
import store from '@/modules/users-relationship/users-relationship-store';
import UsersRelationshipAutocompleteInput from '@/modules/users-relationship/components/users-relationship-autocomplete-input.vue';

export default {
  components: {
    'app-users-relationship-autocomplete-input': UsersRelationshipAutocompleteInput,
  },
  routes,
  store,
};
