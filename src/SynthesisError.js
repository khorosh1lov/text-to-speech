// Base custom error class for speech synthesis
export class SynthesisError extends Error {
	constructor(message) {
		super(message);
		this.name = 'SynthesisError';
	}
}

// Custom error class for empty text input
export class EmptyTextInputError extends SynthesisError {
	constructor() {
		super('The input text field is empty. Please enter some text to be read aloud.');
		this.name = 'EmptyTextInputError';
	}
}

// Custom error class for unsupported language errors
export class UnsupportedLanguageError extends SynthesisError {
	constructor() {
		super('The selected language is not supported by the speech synthesis.');
		this.name = 'UnsupportedLanguageError';
	}
}

// Custom error class for browser compatibility issues
export class BrowserCompatibilityError extends SynthesisError {
	constructor() {
		super('Your browser does not support the Web Speech API. Please try using a compatible browser.');
		this.name = 'BrowserCompatibilityError';
	}
}
