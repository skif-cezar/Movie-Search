window.onload = function() {
    const FORM__TEXT = document.querySelector('.form__text');
    const keyboard = '<div id="keyboard"></div>';
    const languageP = '<p class="language">Eng</p>';
    let isEng = localStorage.getItem('isEng');
    const FORM__VK = document.querySelector('.form__virtual-keyboard');
    const CANCEL_BTN = document.querySelector('.form__cancel');
    let output = '';

    FORM__VK.insertAdjacentHTML('afterbegin', keyboard);
    FORM__VK.insertAdjacentHTML('afterbegin', languageP);

    const keyboardKeys = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
                         9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
                         20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
                         16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
                         17, 91, 18, 32, 18, 17, 37, 40, 39];

    const engKeys = ['`', '1', '2', '3', '4', '5' , '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
                    'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
                    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    const engKeysUpperCase = ['`', '1', '2', '3', '4', '5' , '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Del',
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    const engKeysShift = ['~', '!', '@', '#', '$', '%' , '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    const rusKeys = ['ё', '1', '2', '3', '4', '5' , '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    const rusKeysUpperCase = ['Ё', '1', '2', '3', '4', '5' , '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del',
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter',
        'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    const rusKeysShift = ['Ё', '!', '"', '№', ';', '%' , ':', '?', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter',
        'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'];

    let initKeyboard = () => {
        let langKeys;
        isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
        let lan = document.querySelector('.language');
        isEng == 1 ? lan.innerText = 'English' : lan.innerText = 'Русский';
        let i = 0;
        let out = '';
        keyboardKeys.forEach((el) => {
            out += `<div class="key-def" data=` + el + `>${langKeys[i]}</div>`;
            i++;
        });
        document.getElementById('keyboard').innerHTML = out;
    }
    initKeyboard();

    CANCEL_BTN.addEventListener('click', () => {
        output = '';
    });

    const specialKeys = [8, 9, 20, 13, 16, 17, 18, 32, 22, 46];
    const specialKeysWidth = [115, 50, 115, 115, 115, 115, 75, 75, 75, 75, 207, 50];
    let i = 0;
    specialKeys.forEach((el) => {
        const button = document.querySelectorAll('div[data="' + `${el}` + '"]');
        button.forEach((e) => {
            e.classList.add('special-key');
            e.style.width = specialKeysWidth[i] + 'px';
            i++;
        });
    });

    let leftShift;
    let capsLock;

    document.getElementById('keyboard').childNodes.forEach((e) => [
        e.addEventListener('mousedown', (event) => {
            let button = document.querySelectorAll('div[data="' + `${event.target.getAttribute('data')}` + '"]');
            let input = document.querySelector("input");
            let cursorPos = input.selectionStart;
            const leftPart = input.value.slice(0, cursorPos);
            const rightPart = input.value.slice(cursorPos);
            if(button.length == 1) {
                button = button[0];
                button.classList.remove('keypress');
                if(button.innerText == 'Backspace') {
                    output = output.substr(0, output.length-1);
                } else if(button.innerText == 'Enter') {
                    // submitForm();
                    return false;
                } else if(button.innerText == '') {
                    output += ' ';
                } else if(button.innerText == 'Tab') {
                    cursorPos += 1;
                    output = `${leftPart}\t${rightPart}`;
                } else if(button.innerText == 'Caps Lock') {
                    output += '';
                } else if(button.innerText == '←') {
                    cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
                    console.log(cursorPos);
                } else if(button.innerText == '→') {
                    cursorPos += 1;
                    console.log(cursorPos);
                } else if(button.innerText == 'Del') {
                    output = `${leftPart}${rightPart.slice(1)}`;
                    console.log(cursorPos);
                } else {
                    output = FORM__TEXT.value + button.innerText;
                }
                FORM__TEXT.value = output;
                FORM__TEXT.focus();
            } else {
                button = event.target;
                button.classList.remove('keypress');
            }

            let keyCode = event.target.getAttribute('data');
            if(keyCode == 20) {
                capsLock = !capsLock;
                let langKeys;
                isEng == 1 ? langKeys = engKeysUpperCase : langKeys = rusKeysUpperCase;
                let i =0;
                let keys = document.querySelectorAll('#keyboard div');
                if (capsLock) {
                    button.classList.add('keypress');
                    keys.forEach((el) => {
                        el.innerText = langKeys[i];
                        i++;
                    })
                } else {
                    isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
                    button.classList.remove('keypress');
                    keys.forEach((el) => {
                        el.innerText = langKeys[i];
                        i++;
                    });
                }
            }
        })
    ]);

    document.querySelector('.language').addEventListener('click', () => {
        isEng == 1 ? isEng = 0 : isEng = 1;
        let lan = document.querySelector('.language');
        isEng == 1 ? lan.innerText = 'English' : lan.innerText = 'Русский';
        let i = 0;
        let keys = document.querySelectorAll('#keyboard div');
        let langKeys;
        isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
        keys.forEach((el) => {
            el.innerText = langKeys[i];
            i++;
        });
        localStorage.setItem('isEng', isEng);
    })

    document.addEventListener('keyup', function(event) {
        if(event.code == 'ShiftLeft') {
            leftShift = false;
        } else if(event.code == 'AltLeft') {
            if(leftShift) {
                isEng == 1 ? isEng = 0 : isEng = 1;
                let lan = document.querySelector('.language');
                isEng == 1 ? lan.innerText = 'English' : lan.innerText = 'Русский';
                let i = 0;
                let keys = document.querySelectorAll('#keyboard div');
                let langKeys;
                isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
                keys.forEach((el) => {
                    el.innerText = langKeys[i];
                i++;
            });
            localStorage.setItem('isEng', isEng);
        }
    }

        let button = document.querySelectorAll('div[data="' + `${event.keyCode}` + '"]');
        if(button.length == 1) {
            button = button[0];
            button.classList.remove('keypress');
        } else {
            if(event.code == 'ShiftLeft') {
                button[0].classList.remove('keypress');
            } else if(event.code == 'ShiftRight') {
                button[1].classList.remove('keypress');
            } else if(event.code == 'ControlLeft') {
                button[0].classList.remove('keypress');
            } else if(event.code == 'ControlRight') {
                button[1].classList.remove('keypress');
            } else if(event.code == 'MetaLeft') {
                button[0].classList.remove('keypress');
            } else if(event.code == 'MetaRigth') {
                button[1].classList.remove('keypress');
            } else if(event.code == 'AltLeft') {
                button[0].classList.remove('keypress');
            } else if(event.code == 'AltRight') {
                button[1].classList.remove('keypress');
            }
        }
        if(event.keyCode == 20) {
            let langKeys;
            isEng == 1 ? langKeys = engKeysUpperCase : langKeys = rusKeysUpperCase;
            capsLock = event.getModifierState && event.getModifierState('CapsLock');
            let i = 0;
            let keys = document.querySelectorAll('#keyboard div');
            if(capsLock) {
                button.classList.add('keypress');
                keys.forEach((el) => {
                    el.innerText = langKeys[i];
                    i++;
                })
            } else {
                isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
                button.classList.remove('keypress');
                keys.forEach((el) => {
                    el.innerText = langKeys[i];
                    i++;
                })
            }
        } else if(event.keyCode = 16) {
            let langKeys;
            isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
            let i = 0;
            let keys = document.querySelectorAll('#keyboard div');
            keys.forEach((el) => {
                el.innerText = langKeys[i];
                i++;
            });
        }
    });
};

