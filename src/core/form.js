export class Form {
  constructor(form, controls) {
    this.form = form
    this.controls = controls
  }

  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value
  }

  clear() {
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = ''
    })
  }

  isValid() {
    let isFormValid = true

    Object.keys(this.controls).forEach(control => {
      const validators = this.controls[control]

      let isValid = true
      validators.forEach(validator => {
        isValid = validator(this.form[control].value) && isValid
      })

      !isValid ? setError(this.form[control]) : clearError(this.form[control])

      isFormValid = isFormValid & isValid
    })

    return isFormValid
  }
}

function setError($control) {
  clearError($control)
  const errorEmpty = '<p class="validation-error">Введите корректное значение</p>'
  const errorMinLength = '<p class="validation-error">Текст поста не может быть короче 15 символов</p>'
  $control.classList.add('invalid')

  $control.hasAttribute('type')
    ? $control.insertAdjacentHTML('afterend', errorEmpty)
    : $control.insertAdjacentHTML('afterend', errorMinLength)
}

function clearError($control) {
  $control.classList.remove('invalid')

  if ($control.nextSibling) {
    $control.closest('.form-control').removeChild($control.nextSibling)
  }
}