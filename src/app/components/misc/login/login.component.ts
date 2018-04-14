import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  apiError: string;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(loginForm){
    this.sessionService.authenticate(this.user).subscribe(
      (user) => {
        loginForm.reset();
        this.modalService._hideModal(1);
      },
      (error) => {
        this.apiError = error.message;
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    console.log(template)
    this.modalRef = this.modalService.show(template);
  }

}
