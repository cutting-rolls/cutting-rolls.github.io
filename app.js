// Cutting Words App
// by Joey Guziejka
// 10/13/2022
const SPEECH_OK = 'speechSynthesis' in window;
const THREE_DICE = 3;
let result = '';

function init() {
    const btnRoll = document.getElementById('btn-roll');
    const btnRepeat = document.getElementById('btn-repeat');
    const rangePitch = document.getElementById('v-pitch');

    btnRepeat.setAttribute('disabled', 'disabled');

    btnRoll.addEventListener('click', () => {
        handleRollClick();
    });

    btnRepeat.addEventListener('click', () => {
        speak();
    });

    rangePitch.addEventListener('change', (el) => {
        const lblPitch = document.getElementById('v-pitch-lvl');
        switch (el.target.value) {
            case '0':
                lblPitch.innerText = 'Low';
                break;
            case '1':
                lblPitch.innerText = 'Medium';
                break;
            case '2':
                lblPitch.innerText = 'High';
                break;
            default:
                console.log('unknown case');
                break;
        }
    })
}

function handleRollClick() {
    const btnRepeat = document.getElementById('btn-repeat');
    const output = document.getElementById('output');
    output.value = '';
    result = '';
    for (let i = 0; i < THREE_DICE; i++) {
        const rollVal = roll(parts[i].length);
        document.getElementById('d' + (i + 1)).innerText = rollVal;
        output.value += `${i+1}. Rolled ${rollVal} (on a D${parts[i].length}).\r\n`;
        result += parts[i][rollVal-1];
    }
    output.value += result;
    if (SPEECH_OK) {
        btnRepeat.removeAttribute('disabled');
        speak();
    } else {
        output.value += "No Speech, wah wah."
    }
}

function roll(sides) {
    let result = Math.floor(Math.random() * sides) + 1;
    return result;
}

function speak() {
    try {
        // const btnRoll = document.getElementById('btn-roll');
        // const btnRepeat = document.getElementById('btn-repeat');
        // btnRoll.innerHTML = 'Cancel';
        // btnRepeat.innerHTML = 'Cancel';
        const idxVoice = document.getElementById('v-options').value;
        let msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[idxVoice];
        msg.pitch = parseFloat(document.getElementById('v-pitch').value);
        msg.text = result;
        msg.onend = (e) => {
            console.log('completed seconds: ' + e.elapsedTime);
            // setTimeout(() => {
            //     btnRoll.innerHTML = 'Roll';
            //     btnRoll.onclick = () => {
            //         handleRollClick();
            //     }
            //     btnRepeat.innerHTML = 'Repeat';
            //     btnRepeat.onclick = () => {
            //         speak();
            //     }
            // }, 250);
        }
        // btnRoll.onclick = () => {
        //     window.speechSynthesis.cancel();
        // }
        // btnRepeat.onclick = () => {
        //     window.speechSynthesis.cancel();
        // }
        window.speechSynthesis.speak(msg);
    } catch (error) {
        console.error(error);
    }
}

function loadVoices() {
    const options = document.getElementById('v-options');
    options.innerHTML = '';
    window.speechSynthesis.getVoices().forEach((v, idx) => {
        var op = document.createElement('option');
        op.value = idx;
        op.text = v.name;
        options.appendChild(op);
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    if (SPEECH_OK) {
        window.speechSynthesis.onvoiceschanged = function() { loadVoices(); }
    }
    init();
});
// data
const partA = [
    'I regret to inform you that ',
    'In case you did not know, ',
    'You do not possess a high enough intelligence score to comprehend this; however, ',
    'I asked every person whom has ever seen you unclothed if they knew why ',
    'Hey... Dumb ass, ',
    'Your immense grace and beauty is limited only by the fact that ',
    'Look here you blithering idiot, your village has been looking for you, and they want you to know that ',
    'Oh my poor dear, bless your heart, but ',
    'I am not able to phrase this monosyllabically enough for you to glean the meaning; regardless, ',
    'It is really not your fault that '
];
const partB = [
    'you are ',
    'your mother is ',
    'your father is ',
    'your face is ',
    'your family members are ',
    'your hands are ',
    'your feet are ',
    'your body is ',
    'your gods are ',
    'your weapons are '
];
const partC = [
    'no longer welcome here due to you getting your particular brand of stupid all over the place.',
    'currently looking for ways to be legally disassociated with yourself.',
    'upset that they chose not drown you when they had the opportunity.',
    'broken, forged by buffoons, of shoddy workmanship and poor quality.',
    'gross. Really, really, gross.',
    'a common Bavarian whore. Hooker, prostitute, slut for money!',
    'a big turd.',
    'disappointed in the type of person you are, your actions are truly an embarrassment.',
    'dumb.',
    'a waste of time and not worth a cantrip.'
];
const parts = [partA, partB, partC];
