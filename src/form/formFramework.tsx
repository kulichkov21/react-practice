export function createControl(config: any, validation: any) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value: any, validation: any = null): boolean {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }



    return isValid
}

export function validateForm(formControls: any) {
    let isValidForm = true;

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isValidForm = formControls[control].valid && isValidForm;
        }
    }

    return isValidForm
}