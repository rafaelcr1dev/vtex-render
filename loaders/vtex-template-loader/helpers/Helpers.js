var fs = require('fs');

class Helpers {

    constructor(source, options) {

        this.source = source;
        this.options = options;

    }

    rewrite(str) {

        if (!str) return;

        return str.toLowerCase().trim()
            .replace(/[áàãâä]/g, "a")
            .replace(/[éèẽêë]/g, "e")
            .replace(/[íìĩîï]/g, "i")
            .replace(/[óòõôö]/g, "o")
            .replace(/[úùũûü]/g, "u")
            .replace(/ç/g, "c")
            .replace(/(\ |_)+/, " ")
            .replace(/(^-+|-+$)/, "")
            .replace(/[^a-z0-9]+/g, '-');

    }

    isExistsFile(filePath) {

        if (!filePath) return;

        try {

            return fs.statSync(filePath).isFile();

        } catch (err) {

            return false;

        }

    };

    

    contentToWriteFile(filesPath){

        return this.getNameFile(filesPath) + " created file!!!";

    }

    writeFile(filesPath, content) {

        if (!filesPath) return;

        fs.writeFile(filesPath, content || this.contentToWriteFile(filesPath), function (erro) {

            if (erro) {
                throw erro;
            }

            console.log("O arquivo foi salvo");

        });

    }

    getNameFile(filesPath){

        if (!filesPath) return;

        let paths = filesPath.split("\\").reverse();

        return paths[0];

    }

    defineFile(filesPath) {

        var file;

        if (filesPath.length == 2) {

            if (this.isExistsFile(filesPath[0])) {

                file = filesPath[0];

            } else {

                file = filesPath[1];

            }

        } else {

            file = filesPath[0];

        }

        return file;

    }

    readFileSync (file){

        return fs.readFileSync(file, 'utf-8');

    }

    readFile(filesPath) {

        if (!filesPath || !filesPath.length) return "";

        let file = this.defineFile(filesPath);

        if (this.isExistsFile(file)) {

            try {

                return this.readFileSync(file);

            } catch (err) {

                console.log("There was an error opening the file:", err);
                return "";

            }

        } else {

            this.writeFile(filesPath[0]);

            return this.contentToWriteFile(filesPath[0]);

        }

    }

    clearTagShelfSets(source){

        if(!source) return;

        return source.replace(/\#set(.*)/g, "");

    }

    clearTagImageShelf(source){

        if(!source) return;

        return source.replace(/\([0-9]{0,}\)/g, "");

    }

    higenialize(source){

        if(!source) return;

        return source.replace(/\~arquivos/g, "../arquivos");;

    }

}

module.exports = Helpers;