/* global document, $, _ */
const DATA_MULTIFIELD_NAME = 'data-multifield-name';

function getMultiFieldNames($multifields) {
    const mNames = {};

    $multifields.each((i, multifield) => {
        let mName = $(multifield).children('[name$="@Delete"]').attr('name');

        mName = mName.substring(0, mName.indexOf('@'));

        mName = mName.substring(2);

        mNames[mName] = $(multifield);
    });
    return mNames;
}

function buildMultiField(data, $multifield, mName) {
    if (_.isEmpty(mName) || _.isEmpty(data)) {
        return;
    }

    _.each(data, (value, key) => {
        if (key === 'jcr:primaryType') {
            return;
        }

        $multifield.find('.js-coral-Multifield-add').click();

        _.each(value, (fValue, fKey) => {
            if (fKey === 'jcr:primaryType') {
                return;
            }

            const $field = $multifield.find(`[name='./${fKey}']`).last();

            if (_.isEmpty($field)) {
                return;
            }

            $field.val(fValue);
        });
    });
}

function postProcess(mNames, $multifields, data) {
    _.each(mNames, ($multifield, mName) => {
        buildMultiField(data[mName], $multifield, mName);
    });
}

export default function initMultifield() {
    const $multifields = $(`[${DATA_MULTIFIELD_NAME}]`);

    if (_.isEmpty($multifields)) {
        return;
    }

    const mNames = getMultiFieldNames($multifields);
    const $form = $('.cq-dialog');
    const actionUrl = `${$form.attr('action')}.infinity.json`;

    $.ajax(actionUrl).done((data) => {
        postProcess(mNames, $multifields, data);
    });
}
