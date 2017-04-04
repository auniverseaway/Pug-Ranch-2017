/* global document, $ */
import { initMultifield, saveMultifield } from './components/multifield';

$(document).on('dialog-ready', () => {
    initMultifield();
});

$(document).on('click', '.cq-dialog-submit', (event) => {
    saveMultifield(event);
});
