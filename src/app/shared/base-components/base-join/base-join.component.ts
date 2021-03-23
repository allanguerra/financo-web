import { HostListener, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SIZES } from '@src/app/utils/consts';

export abstract class BaseJoinComponent implements OnInit {

  public modelForm: FormGroup;
  public submiting: boolean = false;

  protected screenWidth: number;

  protected readonly fb: FormBuilder;
  protected readonly router: Router;

  constructor(
    protected readonly injector: Injector
  ) {
    this.fb = injector.get(FormBuilder);
    this.router = injector.get(Router);
  }

  ngOnInit(): void {
    this.buildModelForm();
    this.screenWidth = window.innerWidth;
  }

  public isDarkMode(): boolean {
    return this.screenWidth < SIZES.MEDIUM_SCRREN_UP;
  }

  // LISTENER METHODS

  @HostListener('window:resize')
  public onResize(): void {
    console.log('batata');
    this.screenWidth = window.innerWidth;
  }

  // PROTECTED ABSTRACT METHODS

  protected abstract buildModelForm(): void;
}
