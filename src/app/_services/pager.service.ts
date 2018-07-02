import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError,map } from 'rxjs/operators';
import 'rxjs/add/observable/throw'

import { DeviceData } from '../interfaces/device.interface';
import { AppConfig } from '../config/app.config';

@Injectable()
export class PagerService {

  private _url: string = AppConfig.endpoints.devices;
  private columns = [];

  constructor(private http:HttpClient) { }

  //fetch data from server
   getDeviceData(): Observable<DeviceData[]>{
      return this.http.get<DeviceData[]>(this._url)
                      .pipe(map(this.extractData), catchError(this.errorHandler))
   }

   //extract data to be displayed from json object
   private extractData(res) {
      let obj =  res.documents.map(currentValue => {
        let objData = {};
        const keys = Object.keys(currentValue.fields);
        keys.forEach(function(element) {
          objData[element] = Object.values(currentValue.fields[element])[0];
        });
        return objData;
      });
      return obj;
    }

    //get columns heading from json object
    extractColumn(res){
      let columns = [];
      columns = Object.keys(res);
      this.setColumns(columns);
    }

    //set columns
    setColumns(columns){
      this.columns = columns;
    };

    //get columns
     getColumns(){
        return this.columns;
     }

     //handel errror
    errorHandler(error: HttpErrorResponse){
        return Observable.throw("Server Error");
    }

    //get data for particular page
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            currentPage: currentPage,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
