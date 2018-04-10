import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  apiError: string;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onSubmitSignup(signupForm) {
    this.userService.create(this.user).subscribe(
      (user) => {
        signupForm.reset();
        this.router.navigate['/login'];
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
