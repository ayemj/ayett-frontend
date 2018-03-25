import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-view-adjustments',
  templateUrl: './view-adjustments.component.html',
  styleUrls: ['./view-adjustments.component.css']
})
export class ViewAdjustmentsComponent implements OnInit {

  constructor(public serviceObj: ServiceService) { }

  ngOnInit() {
    
    let adjustedAdjustmentMap = [];
    let failedAdjustmentMap = [];
    if (this.serviceObj.previousAdjustment) {

      if (this.serviceObj.previousAdjustment.adjustmentList) {
        const  adjustmentList = this.serviceObj.previousAdjustment.adjustmentList;
        adjustedAdjustmentMap = adjustmentList
        let adjustedKeyList = Object.keys(adjustedAdjustmentMap);
        for (let j= 0 ; j < adjustedKeyList.length ; j++) {
  
        let adjustedTeacher = adjustedAdjustmentMap[adjustedKeyList[j]];
        for (let h = 0 ; h < adjustedTeacher.length ; h++) {
  
          this.serviceObj.successfullAdjustments.push(adjustedTeacher[h]);
  
        }
  
        }
  
        }
        if (this.serviceObj.previousAdjustment.failedAdjustmentList) {
          const  failedAdjustmentList = this.serviceObj.previousAdjustment.failedAdjustmentList;
          failedAdjustmentMap = failedAdjustmentList;
          let failedKeyList = Object.keys(failedAdjustmentMap);
          for (let j= 0 ; j < failedKeyList.length ; j++) {
    
          let failedTeacher = failedAdjustmentMap[failedKeyList[j]];
          for (let h = 0 ; h < failedTeacher.length ; h++) {
    
            this.serviceObj.failedAdjustments.push(failedTeacher[h]);
    
          }
    
          }
    
          }

      }

    }

  }


