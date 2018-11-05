import { Component, OnInit } from '@angular/core';
import clone from 'clone';
declare var TrelloPowerUp, gantt;

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.scss']
})
export class DependenciesComponent implements OnInit {
  trello: any;
  lists: any[] = [];
  dependencies: any[] = [];
  currentCardId;
  get filterList() {
    return clone(this.lists).map(x => {
      x.cards = x.cards.filter(
        y =>
          this.dependencies.map(z => z.id).indexOf(y.id) === -1 &&
          y.id !== this.currentCardId
      );
      return x;
    });
  }

  constructor() {
    this.trello = TrelloPowerUp.iframe();
  }

  ngOnInit() {
    this.trello.render(() => {
      this.trello.sizeTo('#depTaskEditor').done();
    });

    this.trello.lists('all').then(lists => {
      this.lists = lists;
    });
    this.currentCardId = this.trello.getContext().card;
  }
}
