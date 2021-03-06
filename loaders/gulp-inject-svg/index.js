var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var url = require('url');
var es = require('event-stream');
var iconv = require('iconv-lite');
var gutil = require('gulp-util');

module.exports = function(settings) {

    var go = function(file, callback) {

        var markup = iconv.decode(file.contents, 'utf-8');

        if(markup.indexOf('�') > -1){
            markup = iconv.decode(file.contents, 'gbk');
            markup = iconv.encode(markup, 'utf-8');
        }

        markup = markup.replace(/\><\//g, "> </");

        var dom = cheerio.load(markup,
          {
            withDomLvl1: false,
            normalizeWhitespace: false,
            decodeEntities: false,
            xmlMode: true,
            lowerCaseAttributeNames: false
          }
        );
        injectSvg(dom);
        file.contents = iconv.encode(dom.html().replace(/\> <\//g, "></"), 'utf-8');
        return callback(null, file);
    };

    return es.map(go);

    function injectSvg(dom) {

        // Regexp for checking if the file ending has .svg
        var testSvg = /^.*.(svg)$/i;

        dom('img').each(function(idx, el) {
            el = dom(el)
            var src = el.attr('src');

            if (el.attr('data-skip-inject-svg')) {
              el.removeAttr('data-skip-inject-svg');
              return;
            }

            settings && settings.base ? src = settings.base + src : null;

            if (testSvg.test(src) && isLocal(src)) {

                var dir = path.dirname(src);

                var svg;

                try {
                  var inlineTag = fs.readFileSync('./' + src).toString();

                  svg = cheerio.load(inlineTag, {
                    decodeEntities: false,
                    xmlMode: true
                  });

                  svg = svg.root().children();

                  var validSvgAttribute = [ 'accent-height', 'accumulate', 'additive', 'alignment-baseline', 'allowReorder', 'alphabetic', 'amplitude', 'arabic-form', 'ascent', 'attributeName', 'attributeType', 'azimuth', 'baseFrequency', 'baseline-shift', 'baseProfile', 'bbox', 'begin', 'bias', 'by', 'calcMode', 'cap-height', 'class', 'clip', 'clipPathUnits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'contentScriptType', 'contentStyleType', 'cursor', 'cx', 'cy', 'd', 'descent', 'diffuseConstant', 'direction', 'display', 'divisor', 'dominant-baseline', 'dur', 'dx', 'dy', 'edgeMode', 'elevation', 'enable-background', 'end', 'exponent', 'externalResourcesRequired', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterRes', 'filterUnits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'format', 'from', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'glyphRef', 'gradientTransform', 'gradientUnits', 'hanging', 'height', 'horiz-adv-x', 'horiz-origin-x', 'id', 'ideographic', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelMatrix', 'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lang', 'lengthAdjust', 'letter-spacing', 'lighting-color', 'limitingConeAngle', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerHeight', 'markerUnits', 'markerWidth', 'mask', 'maskContentUnits', 'maskUnits', 'mathematical', 'max', 'media', 'method', 'min', 'mode', 'name', 'numOctaves', 'offset', 'onabort', 'onactivate', 'onbegin', 'onclick', 'onend', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onrepeat', 'onresize', 'onscroll', 'onunload', 'onzoom', 'opacity', 'operator', 'order', 'orient', 'orientation', 'origin', 'overflow', 'overline-position', 'overline-thickness', 'panose-1', 'paint-order', 'path', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits', 'pointer-events', 'points', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'r', 'radius', 'refX', 'refY', 'rendering-intent', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'result', 'rotate', 'rx', 'ry', 'scale', 'seed', 'shape-rendering', 'slope', 'spacing', 'specularConstant', 'specularExponent', 'spreadMethod', 'startOffset', 'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'string', 'stroke', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'style', 'surfaceScale', 'systemLanguage', 'tableValues', 'target', 'targetX', 'targetY', 'text-anchor', 'text-decoration', 'text-rendering', 'textLength', 'to', 'transform', 'type', 'u1', 'u2', 'underline-position', 'underline-thickness', 'unicode', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'values', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'viewBox', 'viewTarget', 'visibility', 'width', 'widths', 'word-spacing', 'writing-mode', 'x', 'x-height', 'x1', 'x2', 'xChannelSelector', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y', 'y1', 'y2', 'yChannelSelector', 'z', 'zoomAndPan' ];

                  var svgAttributes = el[0].attribs;

                  for (attribute in svgAttributes) {
                    if (validSvgAttribute.indexOf(attribute) !== -1) {
                      if (el.attr(attribute) !== undefined) {
                        svg.attr(attribute, svgAttributes[attribute]);
                      }
                    }
                  }

                } catch (e) {

                  throw new gutil.PluginError({
                    plugin: 'gulp-inject-svg',
                    message: 'Could not find file SVG file (' + src + ').'
                  });

                }

                el.replaceWith(svg)
            }
        })
    }

    function isLocal(href) {
        return href && !url.parse(href).hostname;
    }
}
