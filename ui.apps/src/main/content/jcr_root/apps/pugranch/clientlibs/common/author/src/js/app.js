/* global document, $ */
import initMultifield from './components/multifield';

$(document).on('dialog-ready', () => {
    initMultifield();
});
