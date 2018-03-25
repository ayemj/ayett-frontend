import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { PreviousAdjustmentResponse, AdjustmentSend, EditTeachers, SendEditedAdjustments } from '../../app-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-adjustments',
  templateUrl: './edit-adjustments.component.html',
  styleUrls: ['./edit-adjustments.component.css']
})
export class EditAdjustmentsComponent implements OnInit {

  public absentExceptionData: PreviousAdjustmentResponse = new PreviousAdjustmentResponse();
  public absentList: EditTeachers[] = [];
  public exceptionList: EditTeachers[] = [];
  public listToEdit = [];
  public loadAdjustmentFlag = false;
  public editGrid = '';
  public editAbsentList = [];
  public editExceptionList = [];


  constructor(public serviceObj: ServiceService, public router: Router) { }

  ngOnInit() {
    this.serviceObj.haveAdjustments = true;
    this.serviceObj.onEdit = true;
    this.serviceObj.getPreviousAdjustments().subscribe((previousAdjustmentData: PreviousAdjustmentResponse) => {

      this.absentExceptionData = previousAdjustmentData;
      this.absentList = this.absentExceptionData.absentList;
      this.exceptionList = this.absentExceptionData.exceptionList;
      this.serviceObj.absentList = this.absentExceptionData.absentList;
      this.serviceObj.exceptionList = this.absentExceptionData.exceptionList;
    });

  }

  loadAdjustment() {

    this.loadAdjustmentFlag = true;

  }

  discardAdjustments() {

    this.serviceObj.discardAdjustments().subscribe(response => {

      alert(response['status']);
      this.serviceObj.haveAdjustments = false;
      this.router.navigate(['home']);

    })

  }

  deleteAllData() {

    this.serviceObj.addAbsentList = [];
    this.serviceObj.addExceptionList= [];

  }

  editCall(x: string) {
this.editGrid  = x;
    if (x === 'absent') {

      this.listToEdit = this.serviceObj.absentList;

    } else {

      this.listToEdit = this.serviceObj.exceptionList;

    }

  }

  saveEdits(flag) {
    
    if (flag === 'absent') {
      this.editAbsentList = [];
      for (let i = 0 ; i < this.listToEdit.length ; i++)  {

        if (this.listToEdit[i].status === 'Complete' || this.listToEdit[i].status === 'Partial' ) {
          this.editAbsentList.push(this.listToEdit[i]);
        }

      }

    } else {
      this.editExceptionList = [];
      for (let i = 0 ; i < this.listToEdit.length ; i++)  {

        if (this.listToEdit[i].status === 'Complete' || this.listToEdit[i].status === 'Partial' ) {
          this.editExceptionList.push(this.listToEdit[i]);
        }

      }

    }

  }

  cancelAll(flag) {



  }

  generateAgain() {
    let objForEditAdjustments = new SendEditedAdjustments();
    let addAbsentList : AdjustmentSend[] = [];
    let addExceptionList : AdjustmentSend[] = [];
    let adjustedAdjustmentMap = '';
    let failedAdjustmentMap = '';
    for (let k = 0 ; k < this.serviceObj.addAbsentList.length ; k++ ) {
      const teacher = this.serviceObj.addAbsentList[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.type = teacher.part;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      addAbsentList.push(tempTeacher);
    }

    for (let k = 0 ; k < this.serviceObj.addExceptionList.length ; k++ ) {
      const teacher = this.serviceObj.addExceptionList[k]
      const tempTeacher = new AdjustmentSend();
      tempTeacher._id = teacher._id;
      tempTeacher.reason = teacher.reason;
      tempTeacher.startTime = teacher.inTime;
      tempTeacher.endTime = teacher.outTime;
      addExceptionList.push(tempTeacher);
    }

    objForEditAdjustments.addAbsentList = addAbsentList;
    objForEditAdjustments.addExceptionList = addExceptionList;
    objForEditAdjustments.editAbsentList = this.editAbsentList;
    objForEditAdjustments.editExceptionList = this.editExceptionList;

    this.serviceObj.editAdjustments(objForEditAdjustments).subscribe(adjustmentsResult => {
      adjustedAdjustmentMap = adjustmentsResult['adjustmentList'];
      failedAdjustmentMap = adjustmentsResult['failedAdjustmentList'];
      let adjustedKeyList = Object.keys(adjustedAdjustmentMap);
      this.serviceObj.successfullAdjustments = [];
      this.serviceObj.failedAdjustments = [];
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
}
