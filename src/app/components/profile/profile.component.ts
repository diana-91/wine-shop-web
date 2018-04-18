import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/models/user.model';
import { UserService} from './../../shared/services/user.service';
import { SessionService } from './../../shared/services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = this.sessionService.user;
  currentUser: User;

  edit: boolean;

  constructor(
    private sessionService: SessionService,
    private routes: ActivatedRoute,
    private usersService: UserService) { }

  ngOnInit() {
    this.edit=false;
    this.routes
      .params
      .subscribe( params => {
        this.usersService.get(this.user.id).subscribe( user => this.user = user );
      });

  }

  onSubmitUpdate(updateForm){
    this.usersService.edit(this.user).subscribe(
      updateForm => alert('Su perfil ha sido actualizado'));
    this.edit=false;
  }



}
