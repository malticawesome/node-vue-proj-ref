import routes from '@/modules/log/log-routes';
import store from '@/modules/log/log-store';
import LogAutocompleteInput from '@/modules/log/components/log-autocomplete-input.vue';

export default {
  components: {
    'app-log-autocomplete-input': LogAutocompleteInput,
  },
  routes,
  store,
};
