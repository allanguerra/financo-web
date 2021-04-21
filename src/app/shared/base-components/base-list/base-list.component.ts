import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseModelService } from '@src/app/shared/base-services/base-model-service/base-model.service';
import { BaseModel } from '@src/app/shared/models/base.model';

@Component({ template: '' })
export abstract class BaseListComponent<T extends BaseModel> implements OnInit {
  public isLoading: boolean = false;
  public title: string;

  public resources: Array<T> = [];

  protected readonly route: ActivatedRoute;

  constructor(
    protected readonly injector: Injector,
    protected readonly service: BaseModelService<T>
  ) {
    this.route = injector.get(ActivatedRoute);
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
}
