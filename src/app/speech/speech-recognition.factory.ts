import {Injectable} from '@angular/core';
import {SpeechRecognitionService} from "./speech-recognition.service";

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionFactory {

  constructor() {
  }

  create(knownWords: string[]) {
    return new SpeechRecognitionService(this.createRecognition(knownWords));
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
    return recognition;
  }
}
