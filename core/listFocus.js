/**
 * Created by matengfei on 2018/5/17.
 */

function listFocus(options) {
  // 横向
  const ORITATION = 'vert';   // land | vert
  let ids = {}; // { 1: elem1, 2: elem2, 3: elem3, 4: elem4 }
  let curId = null;
  let outId = null;

  init(options);

  function init(options) {

    const elems = options.elem.querySelectorAll('[focus-id]');
    ids = Array.from(elems).reduce((prev, cur) => {
      prev[cur.getAttribute('focus-id')] = cur;
      return prev;
    }, {});

    focus(curId);
  }

  // focus算法
  function newId(curId, direct, oritation) {
    if (oritation === 'vert') {
      if (direct === 'left' || direct === 'right') {
        return null;
      } else if (direct === 'up') {
        if (ids[curId - 1]) {
          return curId - 1;
        } else {
          return null;
        }
      } else if (direct === 'down') {
        if (ids[curId + 1]) {
          return curId + 1;
        } else {
          return null;
        }
      }
    }
  }

  function focus(id) {
    const oldId = curId;
    if (oldId && oldId !== id) {
      ids[oldId].classList.remove('focus');
      curId = null;
    }
    if (id) {
      ids[id].classList.add('focus');
      curId = id;
    }
  }

  function move(direct) {
    const nId = newId(curId, direct, ORITATION);
    if (nId) {
      focus(nId);
      return true;
    }
    return false;
  }

  function scopeIn() {
    console.log('scope in');
    const id = outId ? outId : 1;
    focus(id);
  }

  function scopeOut() {
    console.log('scope out');
    outId = curId;
    focus(null);
  }

  return {
    move,
    scopeIn,
    scopeOut,
  }
}
