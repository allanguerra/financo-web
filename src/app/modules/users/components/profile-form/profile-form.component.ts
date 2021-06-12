import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '@src/app/modules/users/services/profile-service/profile.service';
import { Message } from '@src/app/shared/models/message.model';
import { Profile } from '@src/app/shared/models/profile.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { UserService } from '@src/app/shared/services/user-service/user.service';
import { Messages } from '@src/app/utils/messages';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  public isLoading: boolean = false;
  public isSubmiting: boolean = false;

  public modelForm: FormGroup;

  public userAvatar: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getProfile();
  }

  public submit(): void {
    const profile = Object.assign(new Profile(), this.modelForm.value);

    this.profileService.updateUserProfile(profile).subscribe({
      next: () => {
        this.messagesService.notify(Messages.PROFILE_UPDATED);
      }
    });
  }

  public uploadAvatar(avatar: string | ArrayBuffer): void {
    this.profileService.uploadUserAvatar({ data: avatar }).subscribe({
      next: () => {
        this.getProfile();
        this.messagesService.notify(Messages.AVATAR_UPLOADED);
      }
    });
  }

  // PRIVATE METHODS

  private getProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile: Profile) => {
        this.userAvatar = profile.thumbnail;
        this.modelForm.patchValue(profile);
      }
    });
  }

  private buildForm(): void {
    this.modelForm = this.fb.group({
      name: [''],
      surname: [''],
      phone: [''],
      thumbnail: ['']
    });
  }

}
