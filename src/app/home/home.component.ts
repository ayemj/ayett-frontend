import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ServiceService } from '../service.service';
import { AdjustmentRecieve, PreviousAdjustmentResponse } from '../app-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router, public serviceObj: ServiceService) { }

  ngOnInit() {
    this.serviceObj.haveAdjustments = false;
    this.serviceObj.previousAdjustment = new PreviousAdjustmentResponse();
    this.serviceObj.getPreviousAdjustments().subscribe((previousAdjustment: PreviousAdjustmentResponse)  => {

      this.serviceObj.previousAdjustment = previousAdjustment;
      if (this.serviceObj.previousAdjustment){


      if (this.serviceObj.previousAdjustment.adjustmentList) {
     
        this.serviceObj.haveAdjustments = true;
        
      }

      }
    });

  }
  
  uploadTTFiles(){
    this.router.navigate(['/uploadFiles']);
  }

}
