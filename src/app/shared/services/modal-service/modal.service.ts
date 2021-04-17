import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef, Injectable, Injector,
  RendererFactory2, ViewRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private openedModals: Array<ComponentRef<unknown>> = [];

  constructor(
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly rendererFacotory: RendererFactory2,
    private readonly app: ApplicationRef,
    private readonly injector: Injector
  ) { }

  public openModal(modal: any): any {
    const renderer = this.rendererFacotory.createRenderer(null, null);
    const componentRef = this.componentFactory.resolveComponentFactory(modal).create(this.injector);
    const container: ViewRef = componentRef.hostView;
    const element: HTMLElement = (container as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.openedModals.push(componentRef);
    this.app.attachView(container);
    renderer.appendChild(document.body, element);

    return componentRef.instance;
  }

  public closeModal(): void {
    this.openedModals.forEach(modal => {
      const element = modal.location.nativeElement;
      element.parentNode.removeChild(element);
      this.openedModals.splice(this.openedModals.indexOf(modal), 1);

      modal.destroy();
    });
  }
}
