import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isOpen = false;

  links = [
    {
      label: 'Main Page',
      matIcon: 'bookmark_border',
      urlPath: ''
    },
    {
      label: 'Sign Up',
      matIcon: 'assignment_ind',
      urlPath: '/auth'
    },
    {
      label: 'Login',
      matIcon: 'login',
      urlPath: '/auth'
    },
    {
      label: 'Training',
      matIcon: 'fitness_center',
      urlPath: '/training'
    },
    {
      label: 'Logout',
      matIcon: 'undo',
      urlPath: '/auth'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
