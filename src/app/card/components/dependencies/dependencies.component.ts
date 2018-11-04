import { Component, OnInit } from '@angular/core';
declare var TrelloPowerUp, gantt;

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.scss']
})
export class DependenciesComponent implements OnInit {
  trello : any;
  constructor() { }

  ngOnInit() {
    this.trello = TrelloPowerUp.iframe();
    this.trello.render(()=>{
      this.trello.sizeTo('#depTaskEditor').done();
    });
  }


}
