import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  constructor(public serviceObj: ServiceService) { }

  ngOnInit() {
  }

}
