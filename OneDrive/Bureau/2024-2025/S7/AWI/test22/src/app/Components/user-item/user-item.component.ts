import { Component, Input } from '@angular/core';
import { User } from '../../Models/user';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {

  @Input() user!: User;
}
