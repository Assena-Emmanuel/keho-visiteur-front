import { h, render } from 'vue';
import Viewer from 'viewerjs';
import { assign } from 'lodash-es';

const api = ({ images = [], options } = {}) => {
  options = assign(options, {
    inline: false, // Only modal mode can be used
  });

  // Create a placeholder element for viewerjs images (not actually displayed)
  const token = document.createElement('div');
  const ViewerToken = h(
    'div',
    {
      style: {
        display: 'none',
      },
      class: ['__viewer-token'],
    },
    images.map((attr) => {
      return h(
        'img',
        typeof attr === 'string' ? { src: attr } : attr
      );
    })
  );

  render(ViewerToken, token);
  const tokenElement = token.firstElementChild;
  document.body.appendChild(tokenElement);

  // Initialize viewer
  const $viewerJs = new Viewer(tokenElement, options);
  const $destroy = $viewerJs.destroy.bind($viewerJs);
  
  $viewerJs.destroy = function () {
    $destroy();
    render(null, token);
    return $viewerJs;
  };
  
  $viewerJs.show();

  // Destroy token when the viewer modal is closed
  tokenElement.addEventListener('hidden', function () {
    if (this.viewer === $viewerJs) {
      $viewerJs.destroy();
    }
  });

  return $viewerJs;
};

export default api;
