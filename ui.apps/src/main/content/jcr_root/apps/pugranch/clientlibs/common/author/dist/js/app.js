/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dialog = __webpack_require__(5);

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dialog2.default)();

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multifield = __webpack_require__(6);

var initDialog = function initDialog() {
    $(document).on('dialog-ready', function () {
        (0, _multifield.initMultifield)();
    });

    $(document).on('click', '.cq-dialog-submit', function (event) {
        (0, _multifield.saveMultifield)(event);
    });
}; /* global document, $ */
exports.default = initDialog;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMultifield = initMultifield;
exports.saveMultifield = saveMultifield;
/* global document, $, _ */
var DATA_MULTIFIELD_NAME = 'data-multifield-name';
var CORAL_FORM_FIELD_WRAPPER_CLASS = '.coral-Form-fieldwrapper';
var CORAL_FORM_FIELD_SET_CLASS = '.coral-Form-fieldset';

function getMultiFieldNames($multifields) {
    var mNames = {};

    $multifields.each(function (i, multifield) {
        var mName = $(multifield).children('[name$="@Delete"]').attr('name');

        mName = mName.substring(0, mName.indexOf('@'));

        mName = mName.substring(2);

        mNames[mName] = $(multifield);
    });
    return mNames;
}

/**
 * Build the multifield entries and inputs.
 * @param  {Object} multifieldData The Multifield Data
 * @param  {Object} $multifield    The Multifield DOM object
 * @param  {String} multifieldName The Multifield Name
 * @return {Void}
 */
function buildMultiField(multifieldData, $multifield, multifieldName) {
    // Don't do anything if our name or data are empty
    if (multifieldName === '' || typeof multifieldData === 'undefined') {
        return;
    }

    // Iterate through our multifield.
    var multifieldDataArray = Object.keys(multifieldData);
    multifieldDataArray.forEach(function (key) {
        if (key === 'jcr:primaryType') {
            return;
        }

        // Click our button to add a new multi-field entry.
        $multifield.find('.js-coral-Multifield-add').click();

        // Find the fieldset to populate our inputs.
        var $fieldSet = $multifield.find(CORAL_FORM_FIELD_SET_CLASS).last();

        // Get our individual multifield entry
        var multiFieldEntry = multifieldData[key];
        var multiFieldEntryArray = Object.keys(multiFieldEntry);

        // Iterate through each input of our entry
        multiFieldEntryArray.forEach(function (name) {
            if (name === 'jcr:primaryType') {
                return;
            }

            // Get our input value
            var inputValue = multiFieldEntry[name];

            // Get our input DOM object
            var $field = $fieldSet.find('[name=\'./' + name + '\']');

            if ($field.legth !== 0) {
                $field.val(inputValue);
            }
        });
    });
}

function postProcess(mNames, $multifields, data) {
    _.each(mNames, function ($multifield, mName) {
        buildMultiField(data[mName], $multifield, mName);
    });
}

function fillValue($form, fieldSetName, $field, counter) {
    var name = $field.attr('name');

    if (!name) {
        return;
    }

    // Strip './'
    if (name.indexOf('./') === 0) {
        name = name.substring(2);
    }

    // Remove the field, so that individual values are not POSTed
    $field.remove();

    $('<input />').attr('type', 'hidden').attr('name', fieldSetName + '/' + counter + '/' + name).attr('value', $field.val()).appendTo($form);
}

function initMultifield() {
    var $multifields = $('[' + DATA_MULTIFIELD_NAME + ']');

    if (_.isEmpty($multifields)) {
        return;
    }

    var mNames = getMultiFieldNames($multifields);
    var $form = $('.cq-dialog');
    var actionUrl = $form.attr('action') + '.infinity.json';

    $.ajax(actionUrl).done(function (data) {
        postProcess(mNames, $multifields, data);
    });
}

function saveMultifield(event) {
    var $multifields = $('[' + DATA_MULTIFIELD_NAME + ']');

    if (_.isEmpty($multifields)) {
        return;
    }

    var $form = $(event.target).closest('form.foundation-form');

    $multifields.each(function (i, multifield) {
        var $fieldSets = $(multifield).find(CORAL_FORM_FIELD_SET_CLASS);

        $fieldSets.each(function (counter, fieldSet) {
            var $fields = $(fieldSet).children().children([CORAL_FORM_FIELD_WRAPPER_CLASS, '.coral-ColorInput']);

            $fields.each(function (j, field) {
                fillValue($form, $(fieldSet).data('name'), $(field).find('[name]'), counter + 1);
            });
        });
    });
}

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);