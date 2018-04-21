import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/models/user.model';
import { UserService} from './../../shared/services/user.service';
import { SessionService } from './../../shared/services/session.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = this.sessionService.user;
  currentUser: User;

  edit: boolean;
  profile : boolean;

  constructor(
    private sessionService: SessionService,
    private routes: ActivatedRoute,
    private usersService: UserService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.edit=false;
    this.profile=true;
    this.routes
      .params
      .subscribe( params => {
        this.usersService.get(this.user.id).subscribe( user => this.user = user );
      });

  }

  onSubmitUpdate(updateForm){
    this.usersService.edit(this.user).subscribe(
      updateForm => this.showSuccess());
    this.edit=false;
  }

  showSuccess() {
    this.toastr.success('Perfil actualizado.');
  }

  showError(){
    this.toastr.error('Error al actualizar su perfil.')
  }

}
