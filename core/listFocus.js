/**
 * Created by matengfei on 2018/5/17.
 */

function listFocus(options) {
    // 横向
    const ORITATION = 'vert';   // land | vert
    let ids = {}; // { 1: elem1, 2: elem2, 3: elem3, 4: elem4 }
    let curId = null;

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
            ids[oldId].classList.remove('focus');
        }
        if(id) {
          ids[id].classList.add('focus');
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

    function scopeIn() {
      focus(1);
    }

    function scopeOut() {
      focus(null);
    }

    return {
        up: () => update('up'),
        down: () => update('down'),
        left: () => update('left'),
        right: () => update('right'),
        scopeIn,
        scopeOut,
    }
}
