/* global document, $ */
import { initMultifield, saveMultifield } from './multifield';

const initDialog = () => {
    $(document).on('dialog-ready', () => {
        initMultifield();
    });

    $(document).on('click', '.cq-dialog-submit', (event) => {
        saveMultifield(event);
    });
};

export default initDialog;
