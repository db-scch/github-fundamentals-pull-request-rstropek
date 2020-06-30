$(() => {
    const valueInput = $('#valueInput');
    const fromScaleUnit = $('#fromScaleUnit');
    const toScaleUnit = $('#toScaleUnit');
    const convertButton = $('#convert');
    const resultText = $('#result');

    // ============================================================================================
    // Add conversions here
    const conversion = [
        // You can reference functions
        { from: 'brutto', to: 'netto', convertFunc: fromBruttoToNetto },

        // You can specify inline conversions
        { from: 'brutto', to: 'netto', convertFunc: value => value * 0.0000001 },
    ];
    
    function fromBruttoToNetto(value) {
        return value * 0.0000001;
    }
    // ============================================================================================

    conversion.forEach(c => fromScaleUnit.append($('<option>', { text: c.from })));
    fromScaleUnit.val(conversion[0].from);
    refreshToSelect();
    fromScaleUnit.change(refreshToSelect);

    convertButton.click(() => {
        if (valueInput.val() && fromScaleUnit.val() && toScaleUnit.val()) {
            const result = conversion
                .find(c => c.from === fromScaleUnit.val() && c.to == toScaleUnit.val())
                .convertFunc(valueInput.val());
            resultText.text(`The result is ${result}`);
        }
    });

    function refreshToSelect() {
        toScaleUnit.find('option').remove();
        conversion.filter(c => c.from === fromScaleUnit.val())
            .forEach(c => toScaleUnit.append($('<option>', { text: c.to })));
    }
});
