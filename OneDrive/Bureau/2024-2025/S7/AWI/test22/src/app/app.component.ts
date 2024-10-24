import { Component } from '@angular/core';
import { User } from './Models/user';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { MessageComponent } from './Components/message/message.component';
import { MessageService } from './Services/message.service'; // Import MessageService
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UserListComponent, UserDetailComponent, MessageComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedUser: User | null = null;
  userCounter = 1; // Counter for generating new users

  // Initial users
  users: User[] = [
    new User("Default", "User", "Exemple", "default.user@example.com", "0606060606", 100)
  ];

  // Variables to hold new user information from the form
  newUserFirstName: string = '';
  newUserLastName: string = '';
  newUserRole: string = 'Student';
  newUserEmail: string = ''; // This can be empty, handled in the addNewUser function
  newUserTel: string = ''; // This can be empty, handled in the addNewUser function

  constructor(private messageService: MessageService) {} // Inject MessageService

  onUserSelected(user: User | null): void { // Accepter null
    this.selectedUser = user; // Si null, cela désélectionnera l'utilisateur
  }

  addNewUser(): void {
    // Check if required fields are filled
    if (!this.newUserFirstName || !this.newUserLastName || !this.newUserRole) {
      this.messageService.log('Error: Name, Lastname, and Role are required to add a new user.');
      return; // Stop execution if validation fails
    }

    // Check if telephone contains only numeric characters
    if (this.newUserTel && !/^\d+$/.test(this.newUserTel)) {
      this.messageService.log('Error: Telephone number must contain only numeric characters.');
      return; // Stop execution if telephone is invalid
    }

    // Check if email and telephone are empty, and set defaults if necessary
    const email = this.newUserEmail ? this.newUserEmail : null; // If no email, set to null
    const tel = this.newUserTel ? this.newUserTel : '0000000000'; // If no telephone, set to default

    // Create a new user object with the input values
    const newUser = new User(
      this.newUserLastName,
      this.newUserFirstName,
      this.newUserRole,
      email,
      tel,
      100 + this.userCounter
    );

    this.users.push(newUser); // Add new user to the list
    this.userCounter++; // Increment counter for the next user

    // Log a message when the user is added
    this.messageService.log(`New user added: ${newUser.firstname} ${newUser.name}`);
    this.messageService.log(`Number of users: ${this.userCounter}`);

    
    this.newUserFirstName = '';
    this.newUserLastName = '';
    this.newUserRole = 'Student';
    this.newUserEmail = '';
    this.newUserTel = '';
  }
}
