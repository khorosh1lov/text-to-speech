# Speech Synthesis Web App

This is a simple web application that uses the Web Speech API's SpeechSynthesis feature to convert text to speech. The application is built with HTML, CSS, and JavaScript, utilizing Bootstrap 4 for styling and layout.

## Features

- Text-to-speech synthesis using the Web Speech API's SpeechSynthesis
- Selection of available languages and voices
- Customizable volume, pitch, and rate settings
- Error handling through the extension of the SpeechSynthesis class
- Responsive design using Bootstrap 4

## Usage

1. Enter the text you want to convert to speech in the text area.
2. Select the desired language and voice from the dropdown menus.
3. Adjust the volume, pitch, and rate settings using the sliders.
4. Click the "Read" button to start the text-to-speech synthesis.
5. You can pause, resume, or stop the synthesis using the respective buttons.

## Error Handling

The application includes custom error handling through the extension of the SpeechSynthesis class. The following errors are handled:

- `SynthesisError`: A general error related to the speech synthesis process.
- `BrowserCompatibilityError`: The browser does not support the Web Speech API.
- `UnsupportedLanguageError`: The selected language is not supported by the available voices.
- `EmptyTextInputError`: The text input field is empty.

## Dependencies

- [Bootstrap 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/): A popular CSS framework for responsive design and styling.

## Contributing

Feel free to submit pull requests or open issues to improve the functionality and user experience of this web application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Author

Alexander Khoroshilov

- GitHub: [khorosh1lov](https://github.com/khorosh1lov)
- Email: khoroshilov.alex@gmail.com
