import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

VeeValidate.Validator.extend("polite", {
    getMessage: field => `You need to be polite in the ${field} field`,
    validate: value => value.toLowerCase().indexOf("please") !== -1
});
