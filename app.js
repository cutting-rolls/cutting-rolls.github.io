// Cutting Words App
// by Joey Guziejka
// 10/13/2022
const SPEECH_OK = 'speechSynthesis' in window;
const THREE_DICE = 3;
let insult = '';

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
    const output = document.getElementById('output');
    output.value = '';
    insult = '';
    for (let i = 0; i < THREE_DICE; i++) {
        const rollVal = roll(parts[i].length);
        document.getElementById('d' + (i + 1)).innerText = rollVal;
        output.value += `${i+1}. Rolled ${rollVal} (on a D${parts[i].length}).\r\n`;
        insult += parts[i][rollVal-1];
    }
    output.value += insult;
    if (SPEECH_OK) {
        speak();
    } else {
        output.value += "No Speech, wah wah."
    }
}

function roll(sides) {
    let rollResult = Math.floor(Math.random() * sides) + 1;
    return rollResult;
}

function speak() {
    const btnRoll = document.getElementById('btn-roll');
    const btnRepeat = document.getElementById('btn-repeat');
    try {
        btnRoll.setAttribute('disabled', 'disabled');
        btnRepeat.setAttribute('disabled', 'disabled');
        const idxVoice = document.getElementById('v-options').value;
        let msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[idxVoice];
        msg.pitch = parseFloat(document.getElementById('v-pitch').value);
        msg.text = insult;
        msg.onend = (e) => {
            setTimeout(() => {
                btnRepeat.removeAttribute('disabled');
                btnRoll.removeAttribute('disabled');
            }, 5);
            console.log('completed in: ' + e.elapsedTime);
        }
        window.speechSynthesis.speak(msg);
    } catch (error) {
        console.error(error);
        btnRepeat.removeAttribute('disabled');
        btnRoll.removeAttribute('disabled');
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
    'Hey... Dumb ass, ',
    'I relish in the fact that I can inform you that ',
    'In case you were never told this as a child, let me fill you in... ',
    'You do not possess the minimum required intelligence score to comprehend this... however, ',
    'I took an embarrassingly small survey of every single person whom has ever seen you unclothed, asking them if they knew why ',
    'Your immeasurable grace and beauty is hindered only by the unfortunate fact that ',
    'Listen here idiot, your village has been without you for a fortnight, and they want you to know that ',
    'Oh my poor dear, bless your heart... ',
    'I will try to phrase this simply enough for you to understand... ',
    'I believe it truly is really all your fault that '
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
    'dumb.',
    'a big... steaming... turd.',
    'no longer welcome here due to you getting your particular brand of stupid all over the place.',
    'currently looking for ways to be physically, legally and emotionally disassociated with you.',
    'upset that they chose not drown you in that muddy puddle when they had the opportunity.',
    'of shoddy workmanship and poor quality... likely forged by a drunk apprentice out of spite.',
    'gross... Like really, very gross.',
    'a common Bavarian whore... hooker... prostitute... slut for money!',
    'disappointed in the type of person you pretend to be, in all your actions and trials, you are truly an embarrassment to all life.',
    'a waste of my time and not worth the effort of a cantrip.'
];
const parts = [partA, partB, partC];
