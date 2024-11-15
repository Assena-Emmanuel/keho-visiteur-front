import Viewer from 'viewerjs';
import { debounce } from 'lodash-es';
import { nextTick, watch } from 'vue';

const directive = ({ name = 'viewer', debug = false } = {}) => {
  async function createViewer(el, options, rebuild = false, observer = false) {
    await nextTick();
    // If observer is enabled but no change detected, do not reinitialize or update
    if (observer && !imageDiff(el))
      return;
    if (rebuild || !el[`$${name}`]) {
      destroyViewer(el);
      el[`$${name}`] = new Viewer(el, options);
      log('Viewer created');
    } else {
      el[`$${name}`].update();
      log('Viewer updated');
    }
  }

  function imageDiff(el) {
    const imageContent = el.innerHTML.match(/<img([\w\W]+?)[\\/]?>/g);
    const viewerImageText = imageContent ? imageContent.join('') : undefined;
    if (el.__viewerImageDiffCache === viewerImageText) {
      log('Element change detected, but image(s) has not changed');
      return false;
    } else {
      log('Image change detected');
      el.__viewerImageDiffCache = viewerImageText;
      return true;
    }
  }

  function createObserver(el, options, debouncedCreateViewer, rebuild) {
    destroyObserver(el);
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (!MutationObserver) {
      log('Observer not supported');
      return;
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        log(`Viewer mutation:${mutation.type}`);
        debouncedCreateViewer(el, options, rebuild, true);
      });
    });
    const config = { attributes: true, childList: true, characterData: true, subtree: true };
    observer.observe(el, config);
    el.__viewerMutationObserver = observer;
    log('Observer created');
  }

  function createWatcher(el, binding, vnode, debouncedCreateViewer) {
    el.__viewerUnwatch = watch(() => binding.value, (newVal, oldVal) => {
      log('Change detected by watcher: ', binding.value);
      debouncedCreateViewer(el, newVal, true, false);
    }, { deep: true });
    log('Watcher created, expression: ', binding.value);
  }

  function destroyViewer(el) {
    if (!el[`$${name}`]) {
      return;
    }
    el[`$${name}`].destroy();
    delete el[`$${name}`];
    log('Viewer destroyed');
  }

  function destroyObserver(el) {
    if (!el.__viewerMutationObserver) {
      return;
    }
    el.__viewerMutationObserver.disconnect();
    delete el.__viewerMutationObserver;
    log('Observer destroyed');
  }

  function destroyWatcher(el) {
    if (!el.__viewerUnwatch) {
      return;
    }
    el.__viewerUnwatch();
    delete el.__viewerUnwatch;
    log('Watcher destroyed');
  }

  function log(...args) {
    debug && console.log(...args);
  }

  const directive = {
    mounted(el, binding, vnode) {
      log('Viewer bind');
      const debouncedCreateViewer = debounce(createViewer, 50);
      debouncedCreateViewer(el, binding.value);
      // Create watcher for option expression changes
      createWatcher(el, binding, vnode, debouncedCreateViewer);
      // If DOM changes should be observed
      if (!binding.modifiers.static) {
        // Add DOM mutation observer
        createObserver(el, binding.value, debouncedCreateViewer, binding.modifiers.rebuild);
      }
    },
    unmounted(el) {
      log('Viewer unbind');
      // Destroy DOM mutation observer
      destroyObserver(el);
      // Destroy directive expression watcher
      destroyWatcher(el);
      // Destroy viewer
      destroyViewer(el);
    },
  };

  return directive;
};

export default directive;
