const ControlController = require("./controllers/ControlController.js");

class VtexTemplate {

    constructor() {

        this.control = new ControlController();

    }

    render(source) {

        return this.control.render(source);

    }
    
}

module.exports = VtexTemplate;