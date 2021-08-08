import * as mithrilProxy from 'mithril';

var m = mithrilProxy.default || mithrilProxy;

var Fragment = {
  view: function (vnode) {
    return m.fragment({}, vnode.children);
  },
};

export default Fragment;
