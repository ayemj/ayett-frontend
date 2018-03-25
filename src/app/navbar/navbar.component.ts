import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  form: FormGroup;
  loading: boolean = false;
  constructor(public serviceObj: ServiceService, public authService: AuthenticationService,public router: Router, public fb: FormBuilder, public http: HttpClient) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      classTT: null,
      teacherTT: [null, Validators.required]
    });
  }


  logout() {

    this.authService.logout();

  }

  onClassTTFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('classTT').setValue(file);
    }
  }

  onTeacherTTFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('teacherTT').setValue(file);
      console.log(file);
      
    }
  }

  public prepareSave(): any {
    let input = new FormData();
    input.append('studentTimeTable', this.form.get('classTT').value);
    input.append('teacherTimeTable', this.form.get('teacherTT').value);
    return input;
  }

  onSubmit() {
    
    const formModel = this.prepareSave();
    this.loading = true;
    // this.http.post('apiUrl', formModel)

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('mean-token')})
    };
    console.log(formModel);
    formModel.forEach(element => {
      console.log(element);
      
    });
    
    this.http.post('http://localhost:8080/UploadFiles/uploadTimeTable', formModel, httpOptions)
      .subscribe(
        res => {
          alert('done!');
          this.loading = false;
        },
        err => {
          console.log(err);
          
          console.log("Error occured");
          this.loading = false;
        }
      );

  }




}
