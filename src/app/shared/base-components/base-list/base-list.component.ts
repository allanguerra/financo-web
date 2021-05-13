import { Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';
import { BaseModel } from '@src/app/shared/models/base.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { ModalService } from '@src/app/shared/services/modal-service/modal.service';
import { Messages } from '@src/app/utils/messages';

export abstract class BaseListComponent<T extends BaseModel> implements OnInit {
  public isLoading: boolean = false;
  public title: string;

  public resources: Array<T> = [];

  protected readonly route: ActivatedRoute;
  protected readonly modalService: ModalService;
  protected readonly messagesService: MessagesService;

  constructor(
    protected readonly injector: Injector,
    protected readonly service: BaseListService<T>
  ) {
    this.route = injector.get(ActivatedRoute);
    this.modalService = injector.get(ModalService);
    this.messagesService = injector.get(MessagesService);
  }

  ngOnInit(): void {
    this.setTitle();
    this.getModels();
  }

  // PROTECTED METHODS

  protected setTitle(): void {
    const page = this.route.snapshot.parent.url[0].path;
    if (page === 'categories') {
      this.title = 'Suas Categorias';
    } else {
      this.title = 'Lista';
    }
  }

  protected getModels(): void {
    this.service.getAll().subscribe({
      next: (resources: Array<T>) => this.resources = resources
    });
  }

  protected destroyResource(id: string): void {
    this.service.destroy(id).subscribe({
      next: () => {
        this.messagesService.notify(Messages.RESOURCE_REMOVED);
        this.getModels();
      }
    });
  }

  // ABSTRACT METHODS

  public abstract remove(resource: T): void;
}
