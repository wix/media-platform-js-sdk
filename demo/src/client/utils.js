(function(global) {
  function startLoading(btnEl) {
    btnEl.setAttribute('disabled', true);
    btnEl.parentElement.classList.add('loading');
  }

  function stopLoading(btnEl) {
    btnEl.removeAttribute('disabled');
    btnEl.parentElement.classList.remove('loading');
  }

  global.startLoading = startLoading;
  global.stopLoading = stopLoading;
})(window);