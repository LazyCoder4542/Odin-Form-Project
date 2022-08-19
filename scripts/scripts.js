class formValidator {
    constructor(form, fields) {
        this.form = form
        this.fields = fields
    }
    initialise() {
        this.validateOnSubmit();
        this.validateOnEntry();
    }
    validateOnSubmit() {
        let self = this
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`)
                self.validateFields(input)
            });

        })
    }
    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)
            input.addEventListener('input', () => {
                self.validateFields(input)
            })
        })
    }

    validateFields(field) {
        if (field.value.trim() == "") {
            this.setStatus(field, `${(field.previousElementSibling.innerText).toLowerCase()} is required`, 'error')
        }
        else {
            if (field.id == 'email') {
                var re = /\S+@\S+./
                if (re.test(field.value)) {
                    this.setStatus(field, null, 'success')
                }
                else { this.setStatus(field, '*enter a valid email', 'error') }
            }
            else if (field.id == 'password') {
                var re = /(([A-Z]+)([0-9]+)([a-z]+))|(([0-9]+)([A-Z]+)([a-z]+))|(([0-9]+)([a-z]+)([A-Z]+))|(([A-Z]+)([a-z]+)([0-9]+))|(([a-z]+)([A-Z]+)([0-9]+))|(([a-z]+)([0-9]+)([A-Z]+))/
                if (re.test(field.value)) {
                    this.setStatus(field, null, 'success')
                }
                else {
                    console.log('no')
                    this.setStatus(field, '*must contain at least one lowercase, uppercase and digit', 'error')
                }
                if (field.value.length >= 6 && field.value != '123456') {
                    this.setStatus(field, null, 'success')
                }
                else {
                    this.setStatus(field, '*minimum of 6 and cannot be 123456', 'error')
                }
                try {
                    if (this.form.querySelector('#password_confirmation').value != field.value) {
                        this.setStatus(this.form.querySelector('#password_confirmation'), '*password do not match', 'error')
                    }
                    else { this.setStatus(this.form.querySelector('#password_confirmation'), null, 'success') }
                } catch { }
            }
            else if (field.id == 'confirm-password') {
                if (field.value != this.form.querySelector('#password').value) {
                    this.setStatus(field, '*password do not match', 'error')

                }
                else { this.setStatus(this.form.querySelector('#password_confirmation'), null, 'success') }
            }
            else {


                this.setStatus(field, null, 'success')

            }
        }

    }

    setStatus(field, message, status) {
        field.parentElement.querySelector('#error').innerText = message
        if (status == 'error') {
            field.parentElement.classList.add('error')
        }
        else {
            field.parentElement.classList.remove('error')
        }
    }

}

const form = document.querySelector('#form');
const fields = ['first-name', 'last-name', 'email', 'password', 'confirm-password']

const validator = new formValidator(form, fields)

validator.initialise()
var reg = /@|([0-9])/g  //\S+@\S+./
console.log([...'2Sj@]1234,saad'.match(reg)]);