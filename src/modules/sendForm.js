const sendForm = ({ formId, someElem = [] }) => {
    const form = document.getElementById(formId)
    const tel = document.getElementById('number')
    const text = document.getElementById('text')
    const statusBlock = document.createElement('div')
    const loadText = 'Загрузка...'
    const errorText = 'Ошибка...'
    const successText = 'Спасибо! Наш менеджер с вами свяжется!'

    const validate = (list) => {
        let success = true


        return success
    }

    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    const submitForm = () => {
        const formElements = form.querySelectorAll('input')
        const formData = new FormData(form)
        const formBody = {}

        statusBlock.textContent = loadText
        form.append(statusBlock)

        formData.forEach((val, key) => {
            formBody[key] = val
        })

        someElem.forEach(elem => {
            if (document.body.className == 'balkony') {
                const element = document.getElementById(elem.id)

                if (elem.type === 'block') {
                    formBody[elem.id] = element.textContent
                } else if (elem.type === 'input') {
                    formBody[elem.id] = element.value
                }
            }
            
        })

        console.log('submit')
        
        if (validate(formElements)) {
            sendData(formBody)
                .then(data => {
                    statusBlock.textContent = successText

                    formElements.forEach(input => {
                        input.value = ''
                    })
                })
                .catch(error => {
                    statusBlock.textContent = errorText
                })
        } else {
            alert('Данные не валидны!!!')
        }
    }
    
    try {
        if (!form) {
            throw new Error('Верните форму на место, пожалуйста))')
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            
            if(!text.value) {
                alert('Ваше имя не заполнено');
                return;
              }
              
              if(!number.value) {
                alert('Ваш телефон не заполнен');
                return;
              }

            submitForm()
        }, true)

        tel.addEventListener('focus', _ => {
            if(!/^\+\d*$/.test(tel.value))
              tel.value = '+';
          });
          
          tel.addEventListener('keypress', e => {
            if(!/\d/.test(e.key))
              e.preventDefault();
          });

          text.addEventListener('input',() => {
            text.value = text.value.replace(/[a-z0-9]/gi,'');
        });

    } catch(error) {
        console.log(error.message)
    }


}

export default sendForm