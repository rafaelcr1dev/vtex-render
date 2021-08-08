/*
------------------------------------------------
Webpack Vtex Render
------------------------------------------------
Framework for building and commerce VTEX locally.
Created By Rafael Cruz
Contact: projetosavanajs@gmail.com
Version: 0.0.2 beta
Release: 04/09/2018
Framework Webpack
Brazil, São Paulo - Barueri City

The MIT License (MIT)
Copyright (c) 2018 Plugin Webpack Vtex Render
......................................................................................................
Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const VtexTemplate = require("./VtexTemplate.js");
const Helpers = require("./helpers/Helpers.js");
const PLUGIN_NAME = 'vtex-template-loader';
var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

var helper = new Helpers();

var Vtex = function(source){

    if(!source) {
        
        console.log("Not execute the Vtex Render!");
        return source;

    }

    //var filename = helper.getNameFile(this.resourcePath);
    const vtex = new VtexTemplate();
    var source_render;

    source_render = vtex.render(String(source));  
    return helper.higenialize(source_render);

}

var gulpVtex = function() {
    return through.obj(function (file, enc, callback) {
        var isBuffer = false,
            inputString = null,
            result = null,
            outBuffer=null;

        //Empty file and directory not supported
        if (file === null || file.isDirectory()) {
            this.push(file);
            return callback();
        }

        isBuffer = file.isBuffer();

        if(isBuffer){
            
            inputString = file.contents.toString();
            result = Vtex(inputString).toString();
            outBuffer = new Buffer(result);

            file.contents = outBuffer;
            callback(null, file);

        }else{

            this.emit('error',
                new PluginError(PLUGIN_NAME,
                'Only Buffer format is supported'));
            callback();

        }
    });
};

//Export the Method
module.exports = gulpVtex;