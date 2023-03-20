// Import the SynthesisError class from the SynthesisError module

import { BrowserCompatibilityError, EmptyTextInputError, SynthesisError, UnsupportedLanguageError } from './src/SynthesisError.js';

// Define the speechSynthesis object from the browser's window object
const speechSynthesis = window.speechSynthesis;

if (!('speechSynthesis' in window)) {
	throw new BrowserCompatibilityError();
}

// Create an array of supported languages
const languages = [
	{ name: 'English', value: 'en-US' },
	{ name: 'Русский', value: 'ru-RU' },
	{ name: 'Español', value: 'es-ES' },
	{ name: 'Deutsch', value: 'de-DE' },
	{ name: '普通话（中国大陆）', value: 'zh-CN' },
];

// Get DOM elements by their IDs and assign them to variables
const [
    langsSelector, 
    voicesSelector, 
    volume, 
    rate, 
    pitch, 
    text, 
    status, 
    control,
    play
] = [
    'lang', 
    'voice', 
    'volume', 
    'rate', 
    'pitch', 
    'text', 
    'status', 
    'reading-control',
    'play-control'
].map((id) => document.getElementById(id));

// Function to populate the lang selector with available languages
const getAllLangs = () => {
	const LangsList = languages.map((lang) => {
		return `<option value="${lang.value}">${lang.name}</option>`;
	});
	langsSelector.innerHTML = LangsList;
};

// Create and configure the "Read" button
const start = document.createElement('button');
    start.setAttribute('id', 'btn-start');
    start.className = 'btn btn-success btn-lg text-white px-5';
    start.innerHTML = 'Read';
    play.append(start);

// Create and configure the "Pause" button
const pause = document.createElement('button');
    pause.setAttribute('id', 'pause');
    pause.className = 'btn btn-warning btn-lg text-white';
    pause.innerHTML = 'Pause';
    control.append(pause);

// Create and configure the "Resume" button
const resume = document.createElement('button');
    resume.setAttribute('id', 'resume');
    resume.className = 'btn btn-warning btn-lg text-white';
    resume.innerHTML = 'Resume';

// Create and configure the "Stop" button
const stop = document.createElement('button');
    stop.setAttribute('id', 'btn-stop');
    stop.className = 'btn btn-danger btn-lg';
    stop.innerHTML = 'Stop';
    control.append(stop);

// Initialize the voices array
let voices = [];

// Function to populate the voices selector with available voices
const getAllVoices = () => {
    try {
        voices = speechSynthesis.getVoices();

        if (!Array.isArray(voices) || !voices.length) {
            throw new SynthesisError("Voices are not received!");
        }

        // Check if the selected language is supported by the available voices
        const isLanguageSupported = voices.some(voice => voice.lang === langsSelector.value);
        if (!isLanguageSupported) {
            throw new UnsupportedLanguageError();
        }
        
    } catch (err) {
        if (err instanceof SynthesisError) {
            status.innerHTML = showAlert(err.name, err.message);
        } else {
            throw err;
        }
    }

    const VoicesList = voices.map((voice, i) => {
        if (voice.lang === langsSelector.value) {
            return `<option value="${i}">${voice.name}</option>`;
        }
    }).join('');

    voicesSelector.innerHTML = VoicesList;
}


// Function to read the input text with selected voice and settings
const readText = () => {
	try {
		if (speechSynthesis.speaking) {
			throw new SynthesisError('Synthesis is already reading!');
		}

		if (text.value.trim() === '') {
			throw new EmptyTextInputError();
		}

		const utterance = new SpeechSynthesisUtterance(text.value);
		utterance.voice = voices[voicesSelector.value];
		utterance.volume = volume.value;
		utterance.pitch = pitch.value;
		utterance.rate = rate.value;

		speechSynthesis.speak(utterance);

		// Remove the 'disabled' attribute from the text area when synthesis is done
		utterance.onend = () => {
			text.removeAttribute('disabled');
		};
	} catch (err) {
		if (err instanceof SynthesisError) {
			status.innerHTML = showAlert(err.name, err.message);
		} else {
			throw err;
		}
	}
};

// Function to show a custom alert with the given name and message
const showAlert = (name, message) => {
	return (alert = `
        <div class="alert alert-warning alert-dismissible" role="alert">
            <strong>${name}</strong>: ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);
};

// Event listeners to update volume, rate, and pitch value labels on change
volume.addEventListener('change', () => {
	document.querySelector('.volume-value').textContent = volume.value;
});
rate.addEventListener('change', () => {
	document.querySelector('.rate-value').textContent = rate.value;
});
pitch.addEventListener('change', () => {
	document.querySelector('.pitch-value').textContent = pitch.value;
});

// Event listeners for the control buttons
start.addEventListener('click', () => {
	readText();
	text.setAttribute('disabled', true);
});
stop.addEventListener('click', () => {
	speechSynthesis.cancel();
	text.removeAttribute('disabled');
	if (pause) resume.replaceWith(pause);
});
pause.addEventListener('click', () => {
	if (speechSynthesis.speaking) {
		speechSynthesis.pause();
		pause.replaceWith(resume);
	}
});
resume.addEventListener('click', () => {
	speechSynthesis.resume();
	resume.replaceWith(pause);
});

// Initialize the list of languages and voices when the page is loaded
window.onload = getAllLangs();
langsSelector.addEventListener('change', getAllVoices);
// Show Voices
speechSynthesis.addEventListener('voiceschanged', getAllVoices);
