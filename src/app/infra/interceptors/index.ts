import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@src/app/infra/interceptors/token-interceptor/token.interceptor';

export const INTERCEPTORS_PROVIDER = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
