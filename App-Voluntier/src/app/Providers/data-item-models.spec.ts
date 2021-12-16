import { TestBed } from '@angular/core/testing';

import { DataItemModelsService } from './data-item-model.service';

describe('SidebarMenuProfileItemsService', () => {
  let service: DataItemModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataItemModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
