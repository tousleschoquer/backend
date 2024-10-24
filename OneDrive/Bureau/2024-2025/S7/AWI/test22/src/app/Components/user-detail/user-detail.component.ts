import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { User } from '../../Models/user';
import { MessageService } from '../../Services/message.service'; // Import MessageService

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnChanges {
  @Input() user: User | null = null;

  constructor(private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.messageService.log(`Selected user: ${this.user.firstname} ${this.user.name}`);
    }
  }
}
