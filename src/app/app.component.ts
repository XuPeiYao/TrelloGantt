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
                t.modal({
                  title: '甘特圖',
                  url: 'board',
                  fullscreen: true
                });
              }
            }
          ];
        },
        'card-buttons': (trello, options) => {
          return [
            {
              icon: 'https://social-plugins.line.me/img/web/lineit_select_line_icon_03.png',
              text: '用 LINE 傳送',
              callback: (t: any) => {
                const url = '';
                window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, null, 'width=503,height=500,resizable=yes,scrollbars=no,chrome=yes,centerscreen=yes');
              }
            },
            {
              icon: 'https://xupeiyao.github.io/TrelloGantt/assets/merge.png',
              text: '相依性',
              callback: (t: any) => {
                t.popup({
                  title: '相依性',
                  url: 'card'
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
