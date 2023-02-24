
const config = {
    'firstName': {
        minlength: 3,
        required: true
    },
    'lastName': {
        minlength:3,
        required: true
    },
    'email': {
        required: true,
        email: true
    },
    'password': {
        minlength: 8
    }
};

class Validator {
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrors();
        this.inputListener();
    }

    generateErrors() {
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;
        let submitBtn = document.querySelector("#submitBtn");
        for(let input in inputSelector){
            let element = document.querySelector(`input[id="${input}"]`);

            element.addEventListener("input", this.validate.bind(this));
        }
    }

    validate(e){
        let elFields = this.elementsConfig;

        let field = e.target;
        let fieldName = field.getAttribute("id");
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required){
            if(fieldValue === ""){
                this.errors[fieldName].push("-Field empty, enter something!");
            }
        }

        if(elFields[fieldName].minlength){
            if(fieldValue.length < elFields[fieldName].minlength){
                this.errors[fieldName].push("-Please enter longer input")
            }
        }

        if(elFields[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push("-Plese enter valid Email Adress!");
            }
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors) {
        for(const elem of document.querySelectorAll('ul')){
            elem.remove();
        }


        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[id="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            let displayError = document.querySelector(`img[id="${key}"]`);
            let displayOutline = document.querySelector(`input[id="${key}"]`)
            parentElement.appendChild(errorsElement);

            errors[key].forEach( error =>{
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);
            });

            displayError.style.display = errors[key].length === 0 ? "none" : "block";
            displayOutline.style.border = errors[key].length === 0 ? "1px solid rgba(204, 204, 204, 0.8)" : "2px solid var(--red)";
            displayOutline.style.color = errors[key].length === 0 ? "hsl(0, 0%, 0%)"  : "var(--red)";
        }
        
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}



let validator = new Validator(config)