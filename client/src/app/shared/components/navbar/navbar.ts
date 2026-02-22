import { Component } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { UserMenu } from '../user-menu/user-menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchBar, UserMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {}
