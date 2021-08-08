const config = require("../config/config");
const Helpers = require("../helpers/Helpers.js");

class ControlController {

    constructor() {

        this.helper = new Helpers();

    }

    getTargetFile(namefile, type) {

        if (!namefile || !type) return;

        switch (type) {
            case "sub-template":
                return [config.directories.controllers_sub_template_vtex + namefile + ".html"];

            case "placeholder":
                return [config.directories.controllers_placeholder_vtex + namefile + ".html"];

            case "custom":
                return [config.directories.controllers_custom_vtex + namefile + ".html"];

            case "shelf":
                return [config.directories.controllers_default_vtex + namefile + ".html"];

            case "default":
                return [config.directories.controllers_overwrite_vtex + this.helper.rewrite(namefile) + ".html", config.directories.controllers_default_vtex + this.helper.rewrite(namefile) + ".html"];
        }

    }

    getNameController(controller, regex) {

        if (!controller || !regex) return;

        const names = String(controller).match(regex);

        if (!names || !names.length) return;

        if (String(regex) != "/:([a-zA-Z0-9-_]){1,}/")
            return names[1];

        return names[0].replace(":", "");

    }

    getNameShelfController(controller) {

        if (!controller) return;

        return this.helper.rewrite(controller.replace("$", "").replace(".", "").replace("{", "").replace("}x", ""));

    }

    createObjectItemController(controller, namefile, type) {

        if (!controller || !namefile || !type) return;

        return {
            controller: controller,
            name: namefile,
            type: type,
            file: this.getTargetFile(namefile, type)
        };

    }

    isTemplateController(controller) {

        if (!controller) return;

        return controller.indexOf("vtex:template") > -1;

    }

    isPlaceholderController(controller) {

        if (!controller) return;

        return controller.indexOf("vtex:contentPlaceHolder") > -1;

    }

    isCustomController(controller) {

        if (!controller) return;

        return controller.indexOf("custom") > -1;

    }

    isShelfController(controller) {

        if (!controller) return;

        return controller.indexOf("$") > -1;

    }

    indentifyItemController(controller) {

        if (!controller) return;

        if (this.isTemplateController(controller)) {

            const name_controller = this.getNameController(controller, config.REGEX.controller_name_id);

            return this.createObjectItemController(controller, name_controller, "sub-template");

        } else if (this.isPlaceholderController(controller)) {

            const name_controller = this.getNameController(controller, config.REGEX.controller_name_id);

            return this.createObjectItemController(controller, name_controller, "placeholder");

        } else if (this.isCustomController(controller)) {

            const name_controller = this.getNameController(controller, config.REGEX.controller_name_custom);

            return this.createObjectItemController(controller, name_controller, "custom");

        } else if (this.isShelfController(controller)) {

            const name_controller = this.getNameShelfController(controller);

            return this.createObjectItemController(controller, name_controller, "default");

        } else {

            const name_controller = this.getNameController(controller, config.REGEX.controller_name_default);

            return this.createObjectItemController(controller, name_controller, "default");

        }


    }

    indentificationOfControllers(controllers) {

        if (!controllers || !controllers.length) return [];

        var new_controllers = [];

        controllers.forEach((item) => {

            new_controllers.push(this.indentifyItemController(item));

        });

        return new_controllers;

    }

    sanitarizeShelf(content){

        return content.replace(/#(.*)/g, "");

    }

    renderShelf(content_shelf) {

        if (!content_shelf) return;

        content_shelf = this.sanitarizeShelf(content_shelf);

        let controllers = this.getShelfControllers(content_shelf);

        controllers = this.getContentsOfFile(controllers);

        if (controllers) {

            content_shelf = this.renderControllers(content_shelf, controllers);

        }

        return content_shelf;

    }

    getShelfFile(layout) {

        if (!layout) return;

        const file = [config.directories.controllers_shelf_vtex + layout + ".html"];
        const content_shelf = this.helper.readFile(file);

        return this.renderShelf(this.helper.clearTagShelfSets(this.helper.clearTagImageShelf(content_shelf)));

    }

    createObjectProductList(controller) {

        if (!controller) return;

        const layouts = String(controller.controller).match(config.REGEX.controller_name_layout);
        const counts = String(controller.controller).match(config.REGEX.controller_name_item_count);

        if (!layouts.length || !counts.length) return;

        controller.layout = layouts[0].replace('layout="', "");
        controller.count = parseInt(counts[0].replace('itemCount="', ""));

        return controller;

    }

    generateList(controller) {

        if (!controller) return;

        controller = this.createObjectProductList(controller);

        var option = "<p class='searchResultsTime'><span class='resultado-busca-numero'><span class='label'>Produtos encontrados:</span><span class='value'>1</span></span><span class='resultado-busca-termo'> <span class='label'>Resultado da Pesquisa por:</span> <strong class='value'></strong></span><span class='resultado-busca-tempo'><span class='label'>em</span><span class='value'>27 ms</span></span></p><div class='sub'><div class='resultado-busca-filtro'><fieldset class='orderBy'><label>Ordenar por:</label><select id='O'><option value=''>Selecione</option><option value='OrderByPriceASC'>Menor Preço</option><option value='OrderByPriceDESC'>Maior Preço</option><option value='OrderByTopSaleDESC'>Mais vendidos</option><option value='OrderByReviewRateDESC'>Melhores avaliações</option><option value='OrderByNameASC'>A - Z</option><option value='OrderByNameDESC'>Z - A</option><option value='OrderByReleaseDateDESC'>Data de lançamento</option></select></fieldset><fieldset class='filterBy'>Itens por página:<select id='PS'><option selected='selected' value='48'>48</option><option value='96'>96</option><option value='144'>144</option><option value='192'>192</option></select></fieldset><p class='compare'>Produtos selecionados para comparar: <strong><span class='compare-selection-count' id='NumeroSuperior'>0</span></strong><a title='Comparar' class='btn-comparar' href='#'>Comparar</a></p></div></div>";
        var resultItemsWrapper = "<div class='resultItemsWrapper'>";
        var pages_top = "<div class='pager top'><ul class='pages'><li class='first pgEmpty'>primeiro</li><li class='previous pgEmpty'>anterior</li><li class='page-number pgCurrent'>1</li><li class='page-number'>2</li><li class='page-number'>3</li><li class='page-number'>4</li><li class='page-number'>5</li><li class='next'>próximo</li><li class='last'>último</li></ul></div>";
        var first = "<div id='ResultItems_" + new Date().getTime() + "' class='prateleira'><div class='prateleira n10colunas'><h2>Mais procurados</h2><ul>";
        var middle = '';
        var last = "</ul></div></div>";
        var pages_bottom = "<div class='pager bottom'><ul class='pages'><li class='first pgEmpty'>primeiro</li><li class='previous pgEmpty'>anterior</li><li class='page-number pgCurrent'>1</li><li class='page-number'>2</li><li class='page-number'>3</li><li class='page-number'>4</li><li class='page-number'>5</li><li class='next'>próximo</li><li class='last'>último</li></ul></div>";
        var endResultItemsWrapper = "</div>";

        if (controller.name == "productlist") {

            option = '';
            resultItemsWrapper = '';
            pages_top = '';
            pages_bottom = '';
            endResultItemsWrapper = '';

        }

        const shelfRender = "<li>" + this.getShelfFile(controller.layout) + "</li><li style='display:none' class='helperComplement'></li>";
        var count = 0;

        while (count <= controller.count) {
            middle += shelfRender;
            count++;
        }

        return option + resultItemsWrapper + pages_top + first + middle + last + pages_bottom + endResultItemsWrapper + option;

    }

    productList(controller) {

        return this.generateList(controller);

    }

    renderControllerInsideControllers(content) {

        if (!content) return;

        let controllers = this.getControllers(content);

        controllers = this.getContentsOfFile(controllers);

        if (controllers) {

            content = this.renderControllers(content, controllers);

        }

        return content;

    }

    renderFilesOfControllers(controller) {

        if (controller) {

            if (controller.type == "sub-template" ||
                controller.type == "placeholder" ||
                controller.type == "custom" ||
                controller.type == "shelf") {

                controller.content = this.renderControllerInsideControllers(this.helper.readFile(controller.file));

            } else {

                if (controller.name == "productlist" || controller.name == "searchResult")
                    controller.content = this.productList(controller);
                else
                    controller.content = (this.helper.readFile(controller.file));

            }

            return controller;

        }

        return;

    }

    getContentsOfFile(controllers) {

        if (!controllers || !controllers.length) return;

        return controllers.map((controller) => {

            return this.renderFilesOfControllers(controller);

        });

    }

    getControllers(source) {

        if (!source) return;

        let controllers = String(source).match(config.REGEX.controllers);

        if (!controllers || !controllers.length) return [];

        controllers = this.indentificationOfControllers(controllers);

        return controllers;

    }

    getShelfControllers(source) {

        if (!source) return;

        let controllers = String(source).match(config.REGEX.controller_shelf);

        if (!controllers || !controllers.length) return;

        controllers = this.indentificationOfControllers(controllers);

        return controllers;

    }

    renderControllers(source, controllers) {

        if (!source || !controllers || !controllers.length) return;

        const eachRenderHandle = (item) => {

            if (item && item.controller) {

                let re;

                if (item.controller === '$product.GetImageTag') {
                  item.controller += '(\\([0-9a-zA-Z,"\\s]{0,}\\))';
                  re = new RegExp('\\' + item.controller, "g");
                } else {
                  re = new RegExp('\\' + item.controller, "g");
                }

                source = source.replace(re, item.content);

            }

        };

        controllers.forEach(eachRenderHandle);

        return source;

    }

    insertTimeInHtml(content){

        if (!content) return;

        var pattern = new RegExp('<!--gettime:(.*)-->', 'g');
        var time = '<!--gettime:' + new Date().getTime() + '-->';

        if (pattern.test(content)){

            return content.replace(/\<!--gettime:(.*)-->/g, time);

        } else {

            return time + '\n' + content;

        }

    }

    updateFilesRoot(files_to_update){

        if (!files_to_update || !files_to_update.length) return;

        var content = "";

        for (var i in files_to_update){

            content = this.helper.readFileSync(config.directories.controllers_template_vtex + files_to_update[i]);

            if (content){

                content = this.insertTimeInHtml(content);

                this.helper.writeFile(config.directories.controllers_template_vtex + files_to_update[i], content);

            }

        }

        return true;

    }

    render(source) {

        let controllers = this.getControllers(source);

        if (!source || !controllers.length) return source;

        controllers = this.getContentsOfFile(controllers);

        return this.renderControllers(source, controllers);

    }

}

module.exports = ControlController;
