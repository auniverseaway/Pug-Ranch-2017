/* global document, $, _ */
const DATA_MULTIFIELD_NAME = 'data-multifield-name';
const CORAL_FORM_FIELD_WRAPPER_CLASS = '.coral-Form-fieldwrapper';
const CORAL_FORM_FIELD_SET_CLASS = '.coral-Form-fieldset';

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
    const multifieldDataArray = Object.keys(multifieldData);
    multifieldDataArray.forEach((key) => {
        if (key === 'jcr:primaryType') {
            return;
        }

        // Click our button to add a new multi-field entry.
        $multifield.find('.js-coral-Multifield-add').click();

        // Find the fieldset to populate our inputs.
        const $fieldSet = $multifield.find(CORAL_FORM_FIELD_SET_CLASS).last();

        // Get our individual multifield entry
        const multiFieldEntry = multifieldData[key];
        const multiFieldEntryArray = Object.keys(multiFieldEntry);

        // Iterate through each input of our entry
        multiFieldEntryArray.forEach((name) => {
            if (name === 'jcr:primaryType') {
                return;
            }

            // Get our input value
            const inputValue = multiFieldEntry[name];

            // Get our input DOM object
            const $field = $fieldSet.find(`[name='./${name}']`);

            if ($field.legth !== 0) {
                $field.val(inputValue);
            }
        });
    });
}

function postProcess(mNames, $multifields, data) {
    _.each(mNames, ($multifield, mName) => {
        buildMultiField(data[mName], $multifield, mName);
    });
}

function fillValue($form, fieldSetName, $field, counter) {
    let name = $field.attr('name');

    if (!name) {
        return;
    }

    // Strip './'
    if (name.indexOf('./') === 0) {
        name = name.substring(2);
    }

    // Remove the field, so that individual values are not POSTed
    $field.remove();

    $('<input />').attr('type', 'hidden')
        .attr('name', `${fieldSetName}/${counter}/${name}`)
        .attr('value', $field.val())
        .appendTo($form);
}

export function initMultifield() {
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

export function saveMultifield(event) {
    const $multifields = $(`[${DATA_MULTIFIELD_NAME}]`);

    if (_.isEmpty($multifields)) {
        return;
    }

    const $form = $(event.target).closest('form.foundation-form');

    $multifields.each((i, multifield) => {
        const $fieldSets = $(multifield).find(CORAL_FORM_FIELD_SET_CLASS);

        $fieldSets.each((counter, fieldSet) => {
            const $fields = $(fieldSet).children().children([CORAL_FORM_FIELD_WRAPPER_CLASS, '.coral-ColorInput']);

            $fields.each((j, field) => {
                fillValue($form, $(fieldSet).data('name'), $(field).find('[name]'), (counter + 1));
            });
        });
    });
}
