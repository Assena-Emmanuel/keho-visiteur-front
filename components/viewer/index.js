import { defaults } from 'lodash-es';
import Viewer from 'viewerjs';
import api from './api';
import directive from './directive';
import component from './component.vue';

export { 
  Viewer, 
  api, 
  directive, 
  component 
};

export default {
  install(app, { name = 'viewer', debug = false, defaultOptions } = {}) {
    if (defaultOptions) {
      Viewer.setDefaults(defaultOptions);
    }

    app.config.globalProperties[`$${name}Api`] = api;
    app.component(name, defaults(component, { name }));
    app.directive(name, directive({ name, debug }));
  },
  setDefaults(defaultOptions) {
    Viewer.setDefaults(defaultOptions);
  }
};
