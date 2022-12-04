import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private wordEmitter = new EventEmitter<string>()
  private recognition?: SpeechRecognition;

  constructor() {

  }

  recognizeWordFrom(knownWords: string[]) {
    if (!this.recognition) {
      this.recognition = this.createRecognition(knownWords);
    }
    this.recognition.start();
    return this.wordEmitter;
  }

  private createRecognition(knownWords: string[]) {
    const speechRecognitionList = new window.webkitSpeechGrammarList();
    const grammar = '#JSGF V1.0; grammar colors; public <item> = ' + knownWords.join(' | ') + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    const recognition = new webkitSpeechRecognition();
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    const self = this;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('Confidence: ' + event.results[0][0].confidence);
      self.wordEmitter.emit(this.toCapitalString(event.results[0][0].transcript));
    }
    recognition.onspeechend = () => recognition.stop();
    recognition.onnomatch = (event: SpeechRecognitionEvent) => self.wordEmitter.error(new Error('Match not found for '+ event.results[0][0].transcript));
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => self.wordEmitter.error(event.message);
    return recognition;
  }

  private toCapitalString = (text: string) => text && text.length >= 1 ? text[0].toUpperCase() + text.slice(1) : "";
}
