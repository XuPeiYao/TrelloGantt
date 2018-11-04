import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var TrelloPowerUp;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isInit = false;
  constructor() {
    this.isInit =
      location.pathname === document.querySelector('base').getAttribute('href');
  }

  ngOnInit(): void {
    if (this.isInit) {
      //#region
      TrelloPowerUp.initialize({
        'board-buttons': (trello, options) => {
          return [
            {
              text: '甘特圖',
              condition: 'always',
              callback: (t: any) => {
                t.board('id').then(board => {
                  console.log(board);
                  // t.lists('all').then(console.log);
                  t.modal({
                    title: '甘特圖',
                    url: 'board/' + board.id,
                    fullscreen: true
                  });
                });
              }
            }
          ];
        }
      });
      //#endregion
    }
  }
}
