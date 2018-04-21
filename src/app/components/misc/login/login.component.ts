import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';


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
    private modalService: BsModalService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onSubmitLogin(loginForm){
    this.sessionService.authenticate(this.user).subscribe(
      (user) => {
          loginForm.reset();
          localStorage.setItem('cart','[]');
          this.modalService._hideModal(1);
      },
      (error) => {
        this.apiError = error.message;
        this.showError();
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showSuccess() {
    this.toastr.success('Ahora podrás comprar nuestros excelentes vinos.', '¡Bienvenido!');
  }

  showError() {
    this.toastr.error('No has podido acceder. Revisa tu usuario y password.', 'Ooops!!');
  }

}
