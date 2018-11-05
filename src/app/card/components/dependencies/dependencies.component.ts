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

  addItem;
  removeItem;
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

  getCardById(id) {
    for (const list of this.lists) {
      for (const card of list.cards) {
        if (card.id === id) {
          return card;
        }
      }
    }
    return null;
  }

  add() {
    this.dependencies.push(this.getCardById(this.addItem));
    this.addItem = null;

    this.trello
      .set('card', 'shared', 'dependencies', this.dependencies.map(x => x.id))
      .then(() => {});
  }
  remove() {
    this.dependencies = this.dependencies.filter(x => x.id !== this.removeItem);
    this.removeItem = null;

    this.trello
      .set('card', 'shared', 'dependencies', this.dependencies.map(x => x.id))
      .then(() => {});
  }

  ngOnInit() {
    this.trello.render(() => {
      this.trello.sizeTo(280).done();
    });

    this.currentCardId = this.trello.getContext().card;

    this.trello.lists('all').then(lists => {
      this.lists = lists;

      this.trello
        .get(this.currentCardId, 'shared', 'dependencies', [])
        .then(cardIds => {
          for (const cardId of cardIds) {
            const card = this.getCardById(cardId);
            if (card) {
              this.dependencies.push(card);
            }
          }
        });
    });
  }
}
