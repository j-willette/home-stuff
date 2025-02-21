import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileService} from './file.service';
import {Cd} from '../models/cd.model';
import {CdService} from './cd.service';

@Injectable({
    providedIn: 'root'
})
export class CdFormService {

    readonly COVER_PATH = 'cdscovers';

    cd: Cd;
    cdForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private cdService: CdService,
        private router: Router,
        public fileService: FileService,
    ) {}

    init(cd: Cd) {
        this.cd = cd;

        this.cdForm = this.formBuilder.group({
            name: [this.cd.name, Validators.required],
        });
    }

    detectFiles(event) {
        this.fileService.onUploadFile(event.target.files[0], this.COVER_PATH);
    }

    save(action) {
        this.cd.name = this.cdForm.get('name').value;

        if (this.fileService.url && this.fileService.url !== '') {
            if (this.cd.id) {
                this.fileService.removeFile(this.cd.cover_internal_ref);
            }

            this.cd.cover = this.fileService.url;
            this.cd.cover_internal_ref = this.fileService.fileInternalRef;
        }

        if (this.cd.id) {
            this.cdService.update(this.cd);
        } else {
            this.cdService.create(this.cd);

            if (action === 'save') {
                this.router.navigate(['/cds']);
            } else {
                this.cdForm.controls['name'].setValue('');
                this.cd.id = null;
            }
        }

        this.fileService.clear();
    }
}
