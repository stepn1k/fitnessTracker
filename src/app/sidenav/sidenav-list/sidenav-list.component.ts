import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  template: `
      <ul *ngFor="let link of links">
          <app-sidenav-item [matIcon]="link.matIcon" [urlPath]="link.urlPath">
              {{link.label}}
          </app-sidenav-item>
      </ul>`,
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() links;

  constructor() {
  }

  ngOnInit(): void {
  }

}
