import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equivalentValidator = (firstControlName: string, secondControlName: string): ValidatorFn => {
    
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);
      
      if (secondControl?.value && secondControl.value !== firstControl?.value) {
        const secondControlErrors = secondControl.errors || {};
          secondControlErrors['notEqual'] = true;
          secondControl.setErrors(secondControlErrors);
      } else if (secondControl?.value && secondControl.value  === firstControl?.value) {
          const secondControlErrorsTwo = secondControl.errors || {};
          delete secondControlErrorsTwo['notEqual'];
          secondControl.setErrors(
            Object.keys(secondControlErrorsTwo).length ?
              secondControlErrorsTwo :
              null
            );
      }
    
      return null;
    };
    
  };