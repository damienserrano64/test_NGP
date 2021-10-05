import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

export const mainVue = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');

// Drag and drop

var x, y, target = null;

document.addEventListener('mousedown', function(mouse) {
  var clickedDragger = false;
  for(var i = 0; mouse.path[i] !== document.body; i++) {
    if (mouse.path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (clickedDragger && mouse.path[i].classList.contains('draggable')) {
      target = mouse.path[i];
      target.classList.add('dragging');
      x = mouse.clientX - target.style.left.slice(0, -2);
      y = mouse.clientY - target.style.top.slice(0, -2);
      return;
    }
  }
});

document.addEventListener('mouseup', function() {
  if (target !== null) target.classList.remove('dragging');
  target = null;
});

document.addEventListener('mousemove', function(e) {
  if (target === null) return;
  target.style.left = e.clientX - x + 'px';
  target.style.top = e.clientY - y + 'px';
  var pRect = target.parentElement.getBoundingClientRect();
  var tgtRect = target.getBoundingClientRect();
  if (tgtRect.left < pRect.left) target.style.left = 0;
  if (tgtRect.top < pRect.top) target.style.top = 0;
  if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px';
  if (tgtRect.bottom > pRect.bottom) target.style.top = pRect.height - tgtRect.height + 'px';
});


