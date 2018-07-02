import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PagerService } from '../_services/pager.service'
@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

      public errorMsg;
      // array of all items to be paged
      private allItems: any[];
      // pager object
      pager: any = {};
      // paged items(rows)
      pagedItems: any[];
      //columns
      columns = [];

      constructor(private pagerService: PagerService) { }

      ngOnInit() {
        this.pagerService.getDeviceData()
                  .subscribe(data => {
                                      console.log(data);
                                  // set items to json response
                                      this.allItems = data;
                                  //     // initialize to page 1
                                      this.setPage(1);
                                      this.pagerService.extractColumn(data[0]);
                                      this.columns = this.pagerService.getColumns();
                              },
                             error => {
                               this.errorMsg = error;
                               console.log(error)
                           });
      }

      setPage(page: number) {
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems.length, page);
          // get current page of items
          this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }
}
