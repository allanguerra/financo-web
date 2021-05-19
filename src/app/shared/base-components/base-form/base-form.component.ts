import { Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormService } from '@src/app/shared/base-services/base-form-service/base-form.service';
import { BaseModel } from '@src/app/shared/models/base.model';
import { Message } from '@src/app/shared/models/message.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { Messages } from '@src/app/utils/messages';
import { switchMap } from 'rxjs/operators';

export abstract class BaseFormComponent<T extends BaseModel> {

  public modelForm: FormGroup;
  public title: string = '';
  public isSubmiting: boolean = false;
  public isLoading: boolean = false;

  protected currentAction: string = 'new';
  protected pageModule: string = '';
  protected model: T;

  protected readonly router: Router;
  protected readonly route: ActivatedRoute;
  protected readonly fb: FormBuilder;
  protected readonly messagesService: MessagesService;

  constructor(
    protected readonly injector: Injector,
    protected readonly service: BaseFormService<T>,
    protected readonly dataToModelFn: (data: any) => T
  ) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.fb = injector.get(FormBuilder);
    this.messagesService = injector.get(MessagesService);

    this.initComponent();
  }

  public submit(): void {
    this.isSubmiting = true;
    if (this.currentAction === 'new') {
      this.storeResource();
    } else {
      this.updateResource();
    }
  }

  // PROTECTED METHODS

  protected setAction(): void {
    this.currentAction = this.route.snapshot.url[0].path;
  }

  protected setTitle(): void {
    this.pageModule = this.route.snapshot.parent.url[0].path;
    if (this.pageModule === 'categories' && this.currentAction === 'new') {
      this.title = 'Nova Categoria';
    } else if (this.pageModule === 'categories' && this.currentAction === 'edit') {
      this.title = 'Editar Categoria';
    } else if (this.pageModule === 'expenses' && this.currentAction === 'new') {
      this.title = 'Lançar Despesa';
    } else if (this.pageModule === 'expenses' && this.currentAction === 'edit') {
      this.title = 'Editar Despesa';
    } else if (this.pageModule === 'revenues' && this.currentAction === 'new') {
      this.title = 'Lançar Receita';
    } else if (this.pageModule === 'revenues' && this.currentAction === 'edit') {
      this.title = 'Editar Receita';
    } else if (this.pageModule === 'boards' && this.currentAction === 'new') {
      this.title = 'Novo Board';
    } else if (this.pageModule === 'boards' && this.currentAction === 'edit') {
      this.title = 'Editar Board';
    }
  }

  protected loadModel(): void {
    if (this.currentAction === 'edit') {
      this.isLoading = true;
      this.route.paramMap.pipe(
        switchMap(params => this.service.getById(params.get('id')))
      ).subscribe({
        next: (resource: T) => {
          this.model = resource;
          this.modelForm.patchValue(resource);
          this.isLoading = false;
        }
      });
    }
  }

  protected storeResource(): void {
    if (this.modelForm.valid) {
      const model: T = this.dataToModelFn(this.modelForm.value);
      this.service.store(model).subscribe({
        next: () => {
          this.modelForm.reset();
          this.successActions(Messages.RESOURCE_STORED);
          this.isSubmiting = false;
        }
      });
    }
  }

  protected updateResource(): void {
    if (this.modelForm.valid) {
      const model: T = this.dataToModelFn(this.modelForm.value);

      this.service.update(this.model._id, model).subscribe({
        next: () => {
          this.modelForm.reset();
          this.successActions(Messages.RESOURCE_UPDATED);
          this.isSubmiting = false;
        }
      });
    }
  }

  protected successActions(message: Message): void {
    this.messagesService.notify(message);
    this.router.navigate(['home', this.pageModule]);
  }

  // PRIVATE METHODS

  private initComponent(): void {
    this.setAction();
    this.setTitle();
    this.buildModelForm();
    this.loadModel();
  }

  // ABSTRACT METHODS

  protected abstract buildModelForm(): void;
}
