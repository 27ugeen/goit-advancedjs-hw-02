import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = event.target.querySelector('input[name="delay"]');
  const stateInput = event.target.querySelector('input[name="state"]:checked');

  if (!stateInput) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state.',
    });
    return;
  }

  const delay = Number(delayInput.value);
  const state = stateInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        progressBar: false,
        icon: '',
        close: false,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        progressBar: false,
        icon: '',
        close: false,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
      });
    });

  delayInput.value = '';
  stateInput.checked = false;
});
