import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdjustmentRecieve, PreviousAdjustmentResponse, AdjustmentSend, TeacherList, EditTeachers } from './app-interface';
 
@Injectable()
export class ServiceService {



  public successfullAdjustments: AdjustmentRecieve[] = [];
  public failedAdjustments: AdjustmentRecieve[] = [];
  public haveAdjustments = false;
  public previousAdjustment: PreviousAdjustmentResponse;
  public onEdit = false;
  public addAbsentList: TeacherList[] = [];
  public addExceptionList: TeacherList[] = [];
  public afterLogin:boolean;
  public absentList: EditTeachers[] = [];
  public exceptionList: EditTeachers[] = [];
  constructor(public http: HttpClient) { 

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

  getPreviousAdjustments() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.get('https://infinite-escarpment-72745.herokuapp.com/edit-adjustments/fetchPreviousAdjustment',httpOptions);
    
  }

  editAdjustments(obj) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.post('https://infinite-escarpment-72745.herokuapp.com/edit-adjustments/changeAdjustments', obj, httpOptions);


  }

  discardAdjustments() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token') })
    };

    return this.http.get('https://infinite-escarpment-72745.herokuapp.com/adjustments/discardAdjustments', httpOptions);
    

  }

  
}
