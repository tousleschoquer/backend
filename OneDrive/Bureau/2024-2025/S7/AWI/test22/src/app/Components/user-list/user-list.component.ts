import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../Services/message.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserDetailComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User | null>(); // Émettre null si déselection

  selectedUser: User | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.log(`Number of users: ${this.users.length}`);
  }

  selectUser(user: User): void {
    if (this.selectedUser === user) {
      this.selectedUser = null; // Désélectionner l'utilisateur
      this.userSelected.emit(null); // Émettre null pour signifier la désélection
    } else {
      this.selectedUser = user; // Sélectionner l'utilisateur
      this.userSelected.emit(user); // Émettre l'utilisateur sélectionné
    }
  }
}
