import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']  // Corrected to styleUrls
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}

  addMessage(message: string): void {
    this.messageService.log(message);
  }

  clearMessages(): void {
    this.messageService.clear();
  }
}
