import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SearchPipe } from '../searchPipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { TeacherList, Reason, AdjustmentRecieve, AdjustmentSend } from '../app-interface';
  
@Component({
  selector: 'app-adjustment',
  
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {

  public confirmationSummary: boolean;
  public addAdjustments :boolean;
  public exceptionTab : boolean;
  public selectedTeachers : TeacherList[] = [];
  public restOfTeacherList: TeacherList[] = [];
  public selectedExemptedTeachers: TeacherList[]= [];
  public searchTextAdj = '';
  public searchTextExc = ''
  public teacherList : TeacherList[];
  public reasonList: Reason[] ;
  public successfullAdjustments: AdjustmentRecieve[] = [];
  public failedAdjustments: AdjustmentRecieve[] = [];
  public addAdjustment = 'active';
  public addException = '';
  public summary = '';
  

  constructor(public router: Router, public http : HttpClient, public serviceObj :ServiceService) {
    this.serviceObj.getTeachersList().subscribe((data: TeacherList[]) => {
      this.teacherList = [];
      this.teacherList = data;
      this.removeSavedTeachers(); 
    });
    this.serviceObj.getReasonList().subscribe((data: Reason[]) => {

      this.reasonList = [];
      this.reasonList = data;

    })
    
   }

  ngOnInit() {


    this.addAdjustments = false;
    this.confirmationSummary = true;
    this.exceptionTab = true;
    
  }


  removeSavedTeachers() {

    if (this.serviceObj.onEdit) {

      const teacherListTemp = [];

    if (this.teacherList.length > 0)  {

     if (this.serviceObj.absentList.length > 0) {

      for( var i=this.teacherList.length - 1; i>=0; i--){
        for( var j=0; j<this.serviceObj.absentList.length; j++){
            if(this.teacherList[i] && (this.teacherList[i]._id === this.serviceObj.absentList[j]._id)){
              this.teacherList.splice(i, 1);
           }
         }
     }


     } 

     if (this.serviceObj.exceptionList.length >  0) {


      for( var i=this.teacherList.length - 1; i>=0; i--){
        for( var j=0; j<this.serviceObj.exceptionList.length; j++){
            if(this.teacherList[i] && (this.teacherList[i]._id === this.serviceObj.exceptionList[j]._id)){
              this.teacherList.splice(i, 1);
           }
         }
     }

     } 



    }

    }

  }

  goTOAddAdjustments() {

    this.addAdjustments = false;
    this.confirmationSummary = true;
    this.exceptionTab = true;
    this.addAdjustment = 'active';
    this.addException = '';
    this.summary = '';

  }

  goTOSelectExceptions() {

    this.addAdjustments = true;
    this.confirmationSummary = true;
    this.exceptionTab = false;
    this.addAdjustment = '';
    this.addException = 'active';
    this.summary = '';
    this.getRestOfTeacherList();
    
  }

  goToSummary() {

    
    this.addAdjustments = true;
    this.confirmationSummary = false;
    this.exceptionTab = true;
    this.addAdjustment = '';
    this.addException = '';
    this.summary = 'active';


  }

  getRestOfTeacherList() {
    this.restOfTeacherList = [];
    for (let i = 0 ; i < this.teacherList.length ; i++) {

      if (!(this.selectedTeachers.indexOf(this.teacherList[i]) > -1)) {
        this.restOfTeacherList.push(this.teacherList[i]);
      } 

    }

  }

  confirmationSummaryPage() {
    console.log(this.selectedTeachers);
    this.confirmationSummary = false;
    this.addAdjustments = true;

  }

  setPartValue(teacher,val) {

    teacher.part = val;

  }
  chooseAgain() {

    this.confirmationSummary = true;
    this.addAdjustments = false;

  }

  initiateAdjustments() {
    let adjustedAdjustmentMap = '';
    let failedAdjustmentMap = '';
    console.log(this.selectedTeachers);
    console.log(this.selectedExemptedTeachers);
    let selectedAbsentTeachers: AdjustmentSend[] = [];
    let exemptedTeachersList: AdjustmentSend[] = [];
    
    for (let k = 0 ; k < this.selectedTeachers.length ; k++ ) {
      const teacher = this.selectedTeachers[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.type = teacher.part;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      selectedAbsentTeachers.push(tempTeacher);
    }

    for (let k = 0 ; k < this.selectedExemptedTeachers.length ; k++ ) {
      const teacher = this.selectedExemptedTeachers[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      exemptedTeachersList.push(tempTeacher);
    }

    const  obj = {
        absentList:[],
        exceptionList:[]
      }
    obj.absentList = selectedAbsentTeachers;
    obj.exceptionList = exemptedTeachersList;
    this.serviceObj.initiateAdjustments(obj).subscribe(adjustmentsResult => {
      adjustedAdjustmentMap = adjustmentsResult['adjustmentList'];
      failedAdjustmentMap = adjustmentsResult['failedAdjustmentList'];
      this.serviceObj.successfullAdjustments = [];
      this.serviceObj.failedAdjustments = [];
      let adjustedKeyList = Object.keys(adjustedAdjustmentMap);
      for (let j= 0 ; j < adjustedKeyList.length ; j++) {

      let adjustedTeacher = adjustedAdjustmentMap[adjustedKeyList[j]];
      for (let h = 0 ; h < adjustedTeacher.length ; h++) {

        this.serviceObj.successfullAdjustments.push(adjustedTeacher[h]);

      }

      }
      let failedKeyList = Object.keys(failedAdjustmentMap);
      for (let j= 0 ; j < failedKeyList.length ; j++) {

      let failedTeacher = failedAdjustmentMap[failedKeyList[j]];
      for (let h = 0 ; h < failedTeacher.length ; h++) {

        this.serviceObj.failedAdjustments.push(failedTeacher[h]);

      }

      }
      this.serviceObj.haveAdjustments = true;      
      this.router.navigate(['adjustments','viewAdjustments']) 
    });
    

  }
  
  save(teacher,event) {
    
    if (!(this.selectedTeachers)) {
      this.selectedTeachers = [];
    } 
    if (event.target.checked) {
      if (!(this.selectedTeachers.indexOf(teacher) > -1)) {
        this.selectedTeachers.push(teacher)
      }
    } else {
      if (this.selectedTeachers.indexOf(teacher) > -1) {
        this.selectedTeachers.splice(this.selectedTeachers.indexOf(teacher),1)
      }
    }

  }

  saveExempted(teacher,event) {

    if (!(this.selectedExemptedTeachers)) {
      this.selectedExemptedTeachers = [];
    } 
    if (event.target.checked) {
      if (!(this.selectedExemptedTeachers.indexOf(teacher) > -1)) {
        this.selectedExemptedTeachers.push(teacher)
      }
    } else {
      if (this.selectedExemptedTeachers.indexOf(teacher) > -1) {
        this.selectedExemptedTeachers.splice(this.selectedExemptedTeachers.indexOf(teacher),1)
      }
    }

  }

  

  moreDetails(teacher) {
    
    if (teacher.reasonObj.type === 'parts') {
      teacher.reason = teacher.reasonObj.reason;
      teacher.type = teacher.reasonObj.type;
      teacher.isParts = true;
      teacher.isTime = false;

    } else if (teacher.reasonObj.type === 'time'){
      teacher.reason = teacher.reasonObj.reason;
      teacher.type = teacher.reasonObj.type;
      teacher.isTime = true;
      teacher.isParts = false;

    }

  }

  saveForEdit() {



    this.serviceObj.addAbsentList = this.selectedTeachers;
    this.serviceObj.addExceptionList = this.selectedExemptedTeachers;

  }
}
