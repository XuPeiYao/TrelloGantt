import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import 'dhtmlx-gantt';
import { Router, ActivatedRoute } from '@angular/router';
declare var TrelloPowerUp, gantt;

@Component({
  selector: 'app-board-gantt',
  templateUrl: './board-gantt.component.html',
  styleUrls: ['./board-gantt.component.scss']
})
export class BoardGanttComponent implements OnInit {
  /**
   * 甘特圖容器
   */
  @ViewChild('gantt_here')
  ganttContainer: ElementRef;

  boardId: string;

  trello: any;

  cards: any[] = [];
  constructor(private route: ActivatedRoute) {
    this.boardId = route.snapshot.params.id;
    this.trello = TrelloPowerUp.iframe();
  }

  ngOnInit() {
    this.trello.lists('all').then(lists => {
      lists = lists.filter(x => x.cards.length > 0);
      console.log(lists);

      const groupLists = [];
      for (const list of lists) {
        // groupLists.push({ id: list.id, text: list.name, progress: 0 });
        let totalCheckItems = 0;
        let totalCheckItemsChecked = 0;
        let totalMembers = [];
        let allDueComplete = true;
        for (const card of list.cards) {
          this.cards.push(card);

          let itemCheckItems = 0;
          let itemCheckItemsChecked = 0;
          let itemMembers = [];
          if (card.badges.checkItems === 0) {
            totalCheckItems += 1;
            totalCheckItemsChecked += card.badges.dueComplete ? 1 : 0;

            itemCheckItems += 1;
            itemCheckItemsChecked += card.badges.dueComplete ? 1 : 0;
          } else {
            totalCheckItems += card.badges.checkItems;
            totalCheckItemsChecked += card.badges.checkItemsChecked;

            itemCheckItems += card.badges.checkItems;
            itemCheckItemsChecked += card.badges.checkItemsChecked;
          }
          itemMembers = card.members.map(x => x.fullName);
          totalMembers = totalMembers.concat(itemMembers);
          if (!card.due) {
            gantt.message({
              type: 'warning',
              text: `卡片"${card.name}"並未設定結束時間`
            });
          }
          groupLists.push({
            id: card.id,
            text: card.name,
            start_date: this.getStartTimeFromId(card.id),
            end_date: card.due ? new Date(card.due) : new Date(),
            parent: list.id,
            progress: itemCheckItemsChecked / itemCheckItems,
            status:
              itemCheckItemsChecked === itemCheckItems &&
              card.badges.dueComplete
                ? '完成'
                : '執行中',
            members: itemMembers
          });
          allDueComplete = allDueComplete && card.badges.dueComplete;
        }
        groupLists.push({
          id: list.id,
          text: list.name,
          progress: totalCheckItemsChecked / totalCheckItems,
          status:
            totalCheckItemsChecked === totalCheckItems && allDueComplete
              ? '完成'
              : '執行中',
          members: totalMembers.filter((value, index, ary) => {
            return index === ary.indexOf(value);
          })
        });
      }

      // #region Gantt Init
      gantt.config.subscales = [{ unit: 'day', step: 1, date: '%Y/%m/%d' }];
      // gantt.config.min_column_width = 200;

      // default columns definition
      gantt.config.columns = [
        {
          name: 'text',
          label: '工作名稱',
          width: '*',
          min_width: 200,
          max_width: 300,
          tree: true
        },
        { name: 'status', label: '狀態', width: '*' },
        { name: 'members', label: '成員', width: '*' }
      ];
      // { name: 'start_date', label: 'Start time', align: 'center' },
      // { name: 'duration', label: 'Duration', align: 'center' },
      // { name: 'add', label: '', width: 44 }
      gantt.config.readonly = true;
      gantt.init(this.ganttContainer.nativeElement);
      gantt.parse({
        data: groupLists,
        links: []
      });

      gantt.attachEvent('onTaskClick', (id, e) => {
        if (e.srcElement.classList[0] === 'gantt_task_content') {
          const targetCard = this.cards.filter(x => x.id === id)[0];
          if (targetCard) {
            window.open(targetCard.url);
          }
        }
        return true;
      });
      /*gantt.parse({
        data: [
          { id: 1, text: '待處理' },
          {
            id: 2,
            text: 'Task #1',
            start_date: '02-04-2013',
            duration: 8,
            progress: 0.6,
            parent: 1
          },
          {
            id: 3,
            text: 'Task #2',
            start_date: '11-04-2013',
            duration: 8,
            progress: 0.6,
            parent: 1
          }
        ],
        links: [
          // { id: 1, source: 1, target: 2, type: 1 },
          { id: 2, source: 2, target: 3, type: 0 }
        ]
      });*/
    });
  }

  getStartTimeFromId(id: string): Date {
    return new Date(1000 * parseInt(id.substring(0, 8), 16));
  }
}
