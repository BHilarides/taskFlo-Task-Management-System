import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { HttpClientTestingModule} from '@angular/common/http/testing'

=======
import { HttpClientTestingModule } from "@angular/common/http/testing";
>>>>>>> f702b7c2dc3a92f548a43f960c07daa43394538f
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

   beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });

      service = TestBed.inject(TaskService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
