import { Component, OnInit } from '@angular/core';
declare var TrelloPowerUp, gantt;

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.scss']
})
export class DependenciesComponent implements OnInit {
  trello: any;
  constructor() {
    this.trello = TrelloPowerUp.iframe();
  }

  ngOnInit() {
    this.trello.render(() => {
      this.trello.sizeTo('#depTaskEditor').done();
    });
  }


}
