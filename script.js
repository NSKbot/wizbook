function $(sel, el = document) { return el.querySelector(sel); }
function $$(sel, el = document) { return Array.from(el.querySelectorAll(sel)); }

const featuresEl = $('#features');
const featureTpl = $('#featureTemplate');
const varTpl = $('#variableTemplate');

$('#addFeature').addEventListener('click', () => {
  addFeature();
  evaluateAll();
});

function addFeature(data = {}) {
  const node = featureTpl.content.firstElementChild.cloneNode(true);
  $('.feature-name', node).value = data.name || '';
  node.addEventListener('input', evaluateAll);
  $('.add-var', node).addEventListener('click', () => {
    addVariable(node);
    evaluateAll();
  });

  node.addEventListener('dragstart', e => {
    node.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  node.addEventListener('dragend', () => node.classList.remove('dragging'));

  featuresEl.appendChild(node);
  return node;
}

function addVariable(featureEl, data = {}) {
  const v = varTpl.content.firstElementChild.cloneNode(true);
  $('.var-name', v).value = data.name || '';
  $('.var-expr', v).value = data.expr || '';
  v.addEventListener('input', evaluateAll);
  $('.variables', featureEl).appendChild(v);
  return v;
}

featuresEl.addEventListener('dragover', e => {
  e.preventDefault();
  const dragging = $('.dragging');
  if (!dragging) return;
  const after = Array.from(featuresEl.children).find(f => {
    const rect = f.getBoundingClientRect();
    return e.clientY < rect.top + rect.height / 2;
  });
  if (after) featuresEl.insertBefore(dragging, after);
  else featuresEl.appendChild(dragging);
});

function evaluateAll() {
  const features = {};
  const order = [];
  $$('.feature').forEach(f => {
    const name = $('.feature-name', f).value.trim() || 'feature' + order.length;
    order.push({name, el: f});
    features[name] = {};
  });
  order.forEach(item => {
    const {name, el} = item;
    $$('.variable', el).forEach(v => {
      const varName = $('.var-name', v).value.trim();
      const expr = $('.var-expr', v).value.trim();
      let val = parseFloat(expr);
      if (isNaN(val)) {
        val = evaluateExpression(expr, features);
      }
      if (!isFinite(val)) val = 0;
      features[name][varName] = val;
      $('.var-value', v).textContent = val;
    });
  });
}

function evaluateExpression(expr, feats) {
  try {
    const replaced = expr.replace(/([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)/g, (_, f, v) => {
      return (feats[f] && v in feats[f]) ? feats[f][v] : 0;
    });
    return Function('Math', 'return Number(' + replaced + ')')(Math);
  } catch(e) {
    return 0;
  }
}

// initial feature for convenience
addFeature({name: 'Ability'});
addVariable($('.feature'), {name: 'str', expr: '10'});
evaluateAll();
console.log('Wizbook loaded');
