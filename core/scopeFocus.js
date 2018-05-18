/**
 * Created by matengfei on 2018/5/17.
 */

function createScope(option) {

  return {
    id: option.id,
    list: option.list,
  }
}

function scopeFocus(options) {
  // 横向
  const ORITATION = 'vert';   // land | vert
  let ids = {}; // { 1: scope1, 2: scope2, 3: scope3, 4: scope4 }
  const scopeIn = () => console.log('scopeFocus scopeIn');
  const scopeOut = () => console.log('scopeFocus scopeOut');
  let curId = null;

  init(options);

  function init(options) {

    const elems = options.elem.querySelectorAll('[scope-id]');
    ids = Array.from(elems).reduce((prev, cur) => {
      const scopeId = cur.getAttribute('scope-id');
      prev[scopeId] = createScope({
        id: scopeId,
        list: listFocus({elem: cur}),
      });
      return prev;
    }, {});

    curId = options.initScope;
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
      ids[oldId].list.scopeOut();
      curId = null;
    }
    if (id) {
      ids[id].list.scopeIn();
      curId = id;
    }
  }

  function scopeMove(direct) {
    const nId = newId(curId, direct, ORITATION);
    if (nId) {
      focus(nId);
      return true;
    }
    else {
      scopeOut();
      return false;
    }
  }

  function move(direct) {
    const isSuccess = ids[curId].list.move(direct);
    if (isSuccess) {
      return null;
    } else {
      return scopeMove(direct);
    }
  }

  return {
    move,
    scopeIn,
    scopeOut,
  };
}
