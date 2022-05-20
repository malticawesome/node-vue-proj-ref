import logListStore from '@/modules/log/log-list-store';
import logViewStore from '@/modules/log/log-view-store';
import logImporterStore from '@/modules/log/log-importer-store';
import logFormStore from '@/modules/log/log-form-store';
import logDestroyStore from '@/modules/log/log-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: logDestroyStore,
    form: logFormStore,
    list: logListStore,
    view: logViewStore,
    importer: logImporterStore,
  },
};
