import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdjustmentRecieve } from './app-interface';
 
@Injectable()
export class ServiceService {



  public successfullAdjustments: AdjustmentRecieve[] = [];
  public failedAdjustments: AdjustmentRecieve[] = [];
  
  public afterLogin:boolean;
  constructor(private http: HttpClient) { 

    this.afterLogin = false;
    
  }

  getTeachersList() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.get('https://infinite-escarpment-72745.herokuapp.com/fetchData/getTeacherList', httpOptions);

  }



  getReasonList() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.get('https://infinite-escarpment-72745.herokuapp.com/fetchData/getReasons', httpOptions);


  }

  initiateAdjustments(obj) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.post('https://infinite-escarpment-72745.herokuapp.com/adjustments/getAdjustments', obj , httpOptions);


  }
}
