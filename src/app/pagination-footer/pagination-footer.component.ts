import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.scss']
})
export class PaginationFooterComponent implements OnInit {

  @Input() pager: any = {};
  @Output() setPage = new EventEmitter<number>();
  selectedPagination: number = 1;
  constructor() { }

  ngOnInit() {
  }

  changePage(pageIndex: number) {
    this.setPage.emit(pageIndex);
  }

  selectPagination(pageIndex:number){
    this.selectedPagination = pageIndex;
  }

}
