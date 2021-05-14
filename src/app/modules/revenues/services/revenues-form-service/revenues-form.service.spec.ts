import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RevenuesFormService } from '@src/app/modules/revenues/services/revenues-form-service/revenues-form.service';


describe('RevenuesFormService', () => {
  let service: RevenuesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RevenuesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
