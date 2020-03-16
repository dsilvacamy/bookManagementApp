import {FormGroup} from '@angular/forms';

export class GenericValidator {
    // Provide the set of valid validation messages
  // Stucture:
  // controlName1: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // },
  // controlName2: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // }
  constructor(private validationMessages: {[key:string] : {[key:string]:string}}){

  }
// Processes each control within a FormGroup
  // And returns a set of validation messages to display
  // Structure
  // controlName1: 'Validation Message.',
  // controlName2: 'Validation Message.'

  processMessages(container:FormGroup): {[key:string]:string}{
      const messages = {};

      for(const controlKey in container.controls){
          if(container.controls.hasOwnProperty(controlKey)){
              const c = container.controls[controlKey];
              //if it is a formgroup then process its child controls
              if(c instanceof FormGroup){
                  const childMessages = this.processMessages(c);
                  Object.assign(messages,childMessages);
              }
              else{
                  //only validate if there are validation messages for controls
                  if(this.validationMessages[controlKey]){
                      messages[controlKey]= '';
                      if((c.dirty || c.touched)&& c.errors){
                          Object.keys(c.errors).map(messagekey =>{
                              if(this.validationMessages[controlKey][messagekey]){
                                  messages[controlKey]  += this.validationMessages[controlKey][messagekey] + ' ';                
                              }
                          } );
                      }
                  }
              }
          }
      }
      return messages;
  }
  getErrorCount(container:FormGroup) : number {
      let errorCount = 0;
      for(const controlKey in container.controls){
          if(container.controls.hasOwnProperty(controlKey)){
              if(container.controls[controlKey].errors){
                  errorCount += Object.keys(container.controls[controlKey].errors).length;
                  console.log(errorCount);
              }
          }
      }
      return errorCount;
  }
}
