import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
    console.log(message); // Optionally, you can log to the console
  }

  clear(): void {
    this.messages = [];
  }

  constructor() { }
}
