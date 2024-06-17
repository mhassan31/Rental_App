import { AbstractControl, ValidatorFn } from "@angular/forms";

export function OwnershipValidator() : ValidatorFn
{
    return (control: AbstractControl) : {[key : string] : boolean } | null => {

        if(control.value.trim() == "Second_Owner"){
            return {'Ownership' : true}
        }
        return null;

    };
}