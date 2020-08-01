import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-item',
  template: `
      <li>
          <a routerLink="{{urlPath}}">
              <mat-icon>{{matIcon}}</mat-icon>
              <ng-content></ng-content>
          </a>
      </li>`,
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {
  @Input() matIcon;
  @Input() urlPath;

  constructor() {
  }

  ngOnInit(): void {
  }

}
