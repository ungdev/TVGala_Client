import Vue from 'vue';

export function replaceWords (message, censors) {
    let censoredMessage = message;
    censors.forEach((c, i) => {
        const regEx = new RegExp(c.word, "ig");
        censoredMessage = censoredMessage.replace(regEx, 'fraise');
    });

    return censoredMessage;
}

Vue.filter('censor', (message, censors) => replaceWords(message, censors));
