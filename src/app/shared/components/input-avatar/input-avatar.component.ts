import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { TYPES } from '@src/app/utils/consts';
import { Messages } from '@src/app/utils/messages';

@Component({
  selector: 'app-input-avatar',
  templateUrl: './input-avatar.component.html',
  styleUrls: ['./input-avatar.component.scss']
})
export class InputAvatarComponent implements OnChanges {

  @Input('imagePath')
  public imagePath: string | ArrayBuffer = '../../../../assets/img/user-solid.svg';

  @Output()
  public changeImage: EventEmitter<any> = new EventEmitter<any>();

  private originalImage: string | ArrayBuffer;

  constructor(
    private readonly messagesService: MessagesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('imagePath') && changes.imagePath.currentValue) {
      this.originalImage = this.imagePath;
    }
  }

  public change(files: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (!TYPES.IMAGES.includes(files[0].type)) {
        this.messagesService.notify(Messages.WRONG_IMAGE_TYPE);
        this.imagePath = this.originalImage ? this.originalImage : '../../../../assets/img/user-solid.svg';
        return;
      }
      this.imagePath = reader.result;
      this.changeImage.emit(this.imagePath);
    };
  }

}
