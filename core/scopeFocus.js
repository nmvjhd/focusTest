/**
 * Created by matengfei on 2018/5/17.
 */

function createScope(option) {

    return {
        id: option.id,
        scope: option.scope,
    }
}

function scopeFocus(options) {
    // 横向
    const ORITATION = 'vert';   // land | vert
    let ids = {}; // { 1: scope1, 2: scope2, 3: scope3, 4: scope4 }
    const scopeIn = () => console.log('scopeIn');
    const scopeOut = () => console.log('scopeOut');
    let curId = null;

    init(options);
    function init(options) {

        const elems = options.elem.querySelectorAll('[scope-id]');
        ids = Array.from(elems).reduce((prev, cur) => {
            const scopeId = cur.getAttribute('scope-id');
            prev[scopeId] = createScope({
                id: scopeId,
                scope: listFocus({ elem: cur }),
            });
            return prev;
        }, {});

        focus(curId);
    }

    // focus算法
    function newId(curId, direct, oritation) {
        if(oritation === 'vert') {
            if(direct === 'left' || direct === 'right') {
                return null;
            } else if(direct === 'up'){
                if(ids[curId - 1]) {
                    return curId - 1;
                } else {
                    return null;
                }
            } else if(direct === 'down') {
                if(ids[curId + 1]) {
                    return curId + 1;
                } else {
                    return null;
                }
            }
        }
    }

    function focus(id) {
        const oldId = curId;
        if(oldId && oldId !== id) {
            ids[oldId].scope.scopeOut();
        }
        if(id) {
          ids[id].scope.scopeIn();
        }
        curId = id;
    }

    function update(direct) {
        const nId = newId(curId, direct, ORITATION);
        if (nId) {
            focus(nId);
        }
        else {
            scopeOut();
        }
        curId = nId;
        return curId;
    }

    function updateFocus(direct) {
      const itemNewId = ids[curId].scope[direct]();
      if(itemNewId) {
          return null;
      } else {
          return update(direct);
      }
    }

    return {
      up: () => updateFocus('up'),
      down: () => updateFocus('down'),
      left: () => updateFocus('left'),
      right: () => updateFocus('right'),
    };
}
