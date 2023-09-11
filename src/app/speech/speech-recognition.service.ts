import {EventEmitter} from '@angular/core';
import {delay, finalize, of, tap} from "rxjs";

export class SpeechRecognitionService {

  constructor(private recognition: SpeechRecognition) {
  }

  recognizeWords(): EventEmitter<string> {
    const wordEmitter = this.registerCallbacks(this.recognition);
    this.recognition.start();
    return wordEmitter;
  }

  stop() {
    this.recognition && this.recognition.stop();
  }

  private registerCallbacks(recognition: SpeechRecognition) {
    const wordEmitter = new EventEmitter<string>()
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('Confidence: ' + event.results[0][0].confidence);
      wordEmitter.emit(this.toCapitalString(event.results[0][0].transcript));
      wordEmitter.complete();
    }
    recognition.onspeechend = () => {
      recognition.stop();
      of(recognition)
        .pipe(delay(200))
        .pipe(finalize(() => wordEmitter.complete()))
        .subscribe();
    };
    recognition.onnomatch = (event: SpeechRecognitionEvent) => wordEmitter.error(new Error('Match not found for ' + event.results[0][0].transcript));
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => wordEmitter.error(event);
    return wordEmitter;
  }

  private toCapitalString = (text: string) => text && text.length >= 1 ? text[0].toUpperCase() + text.slice(1) : "";
}
