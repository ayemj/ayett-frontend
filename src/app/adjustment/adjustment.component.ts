import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { SearchPipe } from '../searchPipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { TeacherList, Reason, AdjustmentRecieve, AdjustmentSend } from '../app-interface';
import { FormGroup, Form, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'app-adjustment',

  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {
  public confirmationSummary: boolean;
  public addAdjustments: boolean;
  public exceptionTab: boolean;
  public selectedTeachers: TeacherList[] = [];
  public restOfTeacherList: TeacherList[] = [];
  public selectedExemptedTeachers: TeacherList[] = [];
  public searchTextAdj = '';
  public searchTextExc = ''
  public teacherList: TeacherList[];
  public reasonList: Reason[];
  public successfullAdjustments: AdjustmentRecieve[] = [];
  public failedAdjustments: AdjustmentRecieve[] = [];
  public addAdjustment = 'active';
  public addException = '';
  public summary = '';
  public checkBoxValue: boolean[];
  public exceptionCheckBoxValue: boolean[];
  public formArray: FormGroup[];
  public exceptionFormArray: FormGroup[];
  constructor(public router: Router, public http: HttpClient, public serviceObj: ServiceService, private formBuilder: FormBuilder, @Inject(DOCUMENT) document) {
    console.log("hello");
    this.serviceObj.getTeachersList().subscribe((data: TeacherList[]) => {
      this.teacherList = [];
      this.checkBoxValue = new Array(data.length);
      this.exceptionCheckBoxValue = new Array(data.length);
      this.formArray = new Array(data.length);
      this.exceptionFormArray = new Array(data.length);
      this.checkBoxValue.fill(false);
      this.exceptionCheckBoxValue.fill(false);
      // this.formArray.fill(new FormGroup(
      //   {
      //     // tslint:disable-next-line

      //         selectBox: new FormControl(''),
      //         inTimeInput: new FormControl(''),
      //         outTimeInput: new FormControl(''),
      //         radioButton: new FormControl(''),

      //   }
      // ));
      this.formArray.length = data.length;
      this.exceptionFormArray.length = data.length;
      this.formArray.fill(new FormGroup(
        {
          // tslint:disable-next-line
          checkBox: new FormControl(''),
          selectBox: new FormControl(''),
          inTimeInput: new FormControl(''),
          outTimeInput: new FormControl(''),
          radioButton: new FormControl(''),

        }
      ));
      for (let myForm in this.formArray) {
        this.formArray[myForm] = new FormGroup({
          checkBox: new FormControl(''),
          selectBox: new FormControl(''),
          inTimeInput: new FormControl(''),
          outTimeInput: new FormControl(''),
          radioButton: new FormControl(''),
        });
      }

      this.exceptionFormArray.fill(new FormGroup(
        {
          // tslint:disable-next-line
          exceptionCheckBox: new FormControl(''),
          exceptionReason: new FormControl(''),
          exceptionInTime: new FormControl(''),
          exceptionOutTime: new FormControl(''),

        }
      ));
      for (let myForm in this.exceptionFormArray) {
        this.exceptionFormArray[myForm] = new FormGroup({
          exceptionCheckBox: new FormControl(''),
          exceptionReason: new FormControl(''),
          exceptionInTime: new FormControl(''),
          exceptionOutTime: new FormControl(''),
        });
      }

      this.teacherList = data;
      //console.log("Data" + this.checkBoxValue);
      this.removeSavedTeachers();
    });
    this.serviceObj.getReasonList().subscribe((data: Reason[]) => {

      this.reasonList = [];
      this.reasonList = data;

    })

  }

  ngOnInit() {

    console.log();
    this.addAdjustments = false;
    this.confirmationSummary = true;
    this.exceptionTab = true;


  }


  removeSavedTeachers() {

    if (this.serviceObj.onEdit) {

      const teacherListTemp = [];

      if (this.teacherList.length > 0) {

        if (this.serviceObj.absentList.length > 0) {

          for (var i = this.teacherList.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.serviceObj.absentList.length; j++) {
              if (this.teacherList[i] && (this.teacherList[i]._id === this.serviceObj.absentList[j]._id)) {
                this.teacherList.splice(i, 1);
              }
            }
          }


        }

        if (this.serviceObj.exceptionList.length > 0) {


          for (var i = this.teacherList.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.serviceObj.exceptionList.length; j++) {
              if (this.teacherList[i] && (this.teacherList[i]._id === this.serviceObj.exceptionList[j]._id)) {
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
    // if (this.formArray[0].valid){
    //   console.log("Valid");
    //   this.addAdjustments = true;
    // this.confirmationSummary = true;
    // this.exceptionTab = false;
    // this.addAdjustment = '';
    // this.addException = 'active';
    // this.summary = '';
    // this.getRestOfTeacherList();
    // console.log("Teacher List" + this.selectedTeachers);
    // }
    // else {
    //   console.log("InValid");
    // }
    var flag: boolean = true;
    if (this.formArray.length > 0) {
      for (let myForm in this.formArray) {
        console.log(myForm);
        if (!this.mjIsValid(this.formArray[myForm],myForm)) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      console.log("Valid");
      this.addAdjustments = true;
      this.confirmationSummary = true;
      this.exceptionTab = false;
      this.addAdjustment = '';
      this.addException = 'active';
      this.summary = '';
      this.getRestOfTeacherList();
    }
    else {
      console.log("InValid");
    }
  }

  mjIsValid(myForm,i) {
    
    //console.log(myForm.controls.checkBox.value);
    if (myForm.controls.checkBox.value) {
      if (myForm.controls.selectBox.value) {
        if (myForm.controls.selectBox.value.type === 'parts') {
          // if (!myForm.controls.radioButton.pristine) {
          //   return true;
          // }
          // else {
          //   return false;
          // }
          var rad1=document.getElementsByName(i)[0]  as HTMLInputElement;
          var rad2=document.getElementsByName(i)[1]  as HTMLInputElement;
          var rad3=document.getElementsByName(i)[2]  as HTMLInputElement;
          console.log(rad1.checked + ": " + rad2.checked + ":" + rad3.checked);
          if(rad1.checked || rad2.checked || rad3.checked){
            return true;
          }
          else {
            alert("Please select all fields for " + this.teacherList[i].teacherName);
            return false;
          }

        } else if (myForm.controls.selectBox.value.type === 'time') {
          if (myForm.controls.inTimeInput.value && myForm.controls.outTimeInput.value && myForm.controls.inTimeInput.value < myForm.controls.outTimeInput.value) {
            return true;
          }
          else {
            alert("In Time should be less than Out Time for " + this.teacherList[i].teacherName);
            return false;
          }
        }
      } else {
        return false;
      }
    }
    else {
      return true;
    }
  }

  goToSummary() {
    var flag: boolean = true;
    if (this.exceptionFormArray.length > 0) {
      for (let myForm in this.exceptionFormArray) {
        if (!this.mjExceptionIsValid(this.exceptionFormArray[myForm],myForm)) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
    this.addAdjustments = true;
    this.confirmationSummary = false;
    this.exceptionTab = true;
    this.addAdjustment = '';
    this.addException = '';
    this.summary = 'active';
    }
    else{
      console.log("Invalid");
    }


  }

  mjExceptionIsValid(myForm,i){
    if (myForm.controls.exceptionCheckBox.value) {
      if (myForm.controls.exceptionReason.value && myForm.controls.exceptionInTime.value && myForm.controls.exceptionOutTime.value && myForm.controls.exceptionInTime.value < myForm.controls.exceptionOutTime.value) {
        return true;
      } else {
        alert("In Time should be less than Out Time for " + this.teacherList[i].teacherName);
        return false;
      }
    }
    else {
      return true;
    }
  }

  getRestOfTeacherList() {
    this.restOfTeacherList = [];
    for (let i = 0; i < this.teacherList.length; i++) {

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

  setPartValue(teacher, val) {

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

    for (let k = 0; k < this.selectedTeachers.length; k++) {
      const teacher = this.selectedTeachers[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.type = teacher.part;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      selectedAbsentTeachers.push(tempTeacher);
    }

    for (let k = 0; k < this.selectedExemptedTeachers.length; k++) {
      const teacher = this.selectedExemptedTeachers[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      exemptedTeachersList.push(tempTeacher);
    }

    const obj = {
      absentList: [],
      exceptionList: []
    }
    obj.absentList = selectedAbsentTeachers;
    obj.exceptionList = exemptedTeachersList;
    this.serviceObj.initiateAdjustments(obj).subscribe(adjustmentsResult => {
      adjustedAdjustmentMap = adjustmentsResult['adjustmentList'];
      failedAdjustmentMap = adjustmentsResult['failedAdjustmentList'];
      this.serviceObj.successfullAdjustments = [];
      this.serviceObj.failedAdjustments = [];
      let adjustedKeyList = Object.keys(adjustedAdjustmentMap);
      for (let j = 0; j < adjustedKeyList.length; j++) {

        let adjustedTeacher = adjustedAdjustmentMap[adjustedKeyList[j]];
        for (let h = 0; h < adjustedTeacher.length; h++) {

          this.serviceObj.successfullAdjustments.push(adjustedTeacher[h]);

        }

      }
      let failedKeyList = Object.keys(failedAdjustmentMap);
      for (let j = 0; j < failedKeyList.length; j++) {

        let failedTeacher = failedAdjustmentMap[failedKeyList[j]];
        for (let h = 0; h < failedTeacher.length; h++) {

          this.serviceObj.failedAdjustments.push(failedTeacher[h]);

        }

      }
      this.serviceObj.haveAdjustments = true;
      this.router.navigate(['adjustments', 'viewAdjustments'])
    });


  }

  save(teacher, event) {

    if (!(this.selectedTeachers)) {
      this.selectedTeachers = [];
    }
    if (event.target.checked) {
      if (!(this.selectedTeachers.indexOf(teacher) > -1)) {
        this.selectedTeachers.push(teacher)
      }
    } else {
      if (this.selectedTeachers.indexOf(teacher) > -1) {
        this.selectedTeachers.splice(this.selectedTeachers.indexOf(teacher), 1)
      }
    }

  }

  saveExempted(teacher, event) {

    if (!(this.selectedExemptedTeachers)) {
      this.selectedExemptedTeachers = [];
    }
    if (event.target.checked) {
      if (!(this.selectedExemptedTeachers.indexOf(teacher) > -1)) {
        this.selectedExemptedTeachers.push(teacher)
      }
    } else {
      if (this.selectedExemptedTeachers.indexOf(teacher) > -1) {
        this.selectedExemptedTeachers.splice(this.selectedExemptedTeachers.indexOf(teacher), 1)
      }
    }

  }



  moreDetails(teacher) {

    if (teacher.reasonObj.type === 'parts') {
      teacher.reason = teacher.reasonObj.reason;
      teacher.type = teacher.reasonObj.type;
      teacher.isParts = true;
      teacher.isTime = false;

    } else if (teacher.reasonObj.type === 'time') {
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
