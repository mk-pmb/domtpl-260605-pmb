'use strict';
/* -*- tab-width: 2 -*- */

(function namespace() {
  function ass0(x) { return Object.assign(Object.create(null), x); }
  function ores(x) { return String(x || ''); }
  function tagNameLc(e) { return ores(e && e.tagName).toLowerCase(); }

  const tplProp = 'template';

  (function renderNextTemplate() {
    const insTag = document.querySelector('ins[' + tplProp + ']');
    if (!insTag) { return; }
    const tplName = insTag.getAttribute(tplProp);
    insTag.removeAttribute(tplProp); // ensure we won't process this tag again
    setTimeout(renderNextTemplate, 10);
    if (!tplName) { return; }

    const tplSrc = document.getElementById(tplName);
    if (tagNameLc(tplSrc) !== 'template') {
      return console.warn('No such template:', { tplName, insTag });
    }
    const insData = ass0({ ...tplSrc.dataset, ...insTag.dataset });

    let insHtml = tplSrc.innerHTML.replace(/«\$(\w+)»/g, function slot(m, k) {
      const v = insData[k];
      return (v === undefined ? m : v);
    });

    insHtml = insHtml.split(' data-*="*"');
    insHtml = insHtml.join((function insertAllData() {
      if (insHtml.length < 2) { return ''; }
      const tmp = document.createElement('u');
      Object.assign(tmp.dataset, insData);
      return tmp.outerHTML.slice(2, -5);
    }()));

    insTag.outerHTML = insHtml;
  }());



}());
