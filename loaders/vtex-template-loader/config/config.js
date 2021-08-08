const path = require('path');
const resolvePath = (pathToResolve = '') => path.resolve(__dirname, pathToResolve);

module.exports = {
    REGEX: {
        controllers: new RegExp("<vtex[^>]{0,}/>", "g"),
        controller_vtex: new RegExp(":[^>\s]{0,}"),
        controller_name_id: new RegExp('id="(.*)"'),
        controller_name_layout: new RegExp('layout="([a-zA-Z0-9-_]){1,}'),
        controller_name_item_count: new RegExp('itemCount="([a-zA-Z0-9-_]){1,}'),
        controller_name_custom: new RegExp(':([a-zA-Z0-9-_]){1,}'),
        controller_name_default: new RegExp(':([a-zA-Z0-9-_]){1,}'),
        controller_shelf: new RegExp('\\$[a-zA-Z0-9.,_-{}]{0,}', "g")
    },
    directories: {
        controllers_default_vtex: resolvePath("../vtex/controllers") + "/",
        controllers_template_vtex: resolvePath("../../../src/1-templates") + "/",
        controllers_sub_template_vtex: resolvePath("../../../src/1-templates/sub-templates") + "/",
        controllers_shelf_vtex: resolvePath("../../../src/2-prateleira") + "/",
        controllers_placeholder_vtex: resolvePath("../../../src/3-placeholders") + "/",
        controllers_custom_vtex: resolvePath("../../../src/4-controles-customizados") + "/",
        controllers_overwrite_vtex: resolvePath("../../../src/controllers") + "/",
    }
};
