import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * 1. Do not emit value change event when loading the form from predefined values : loadDraft method
 * 2. add a delay by pipe and debouncetime to emit event
 * 3. 
 */
@Component({
  selector: 'app-form-events',
  templateUrl: './form-events.component.html',
  styleUrls: ['./form-events.component.scss']
})
export class FormEventsComponent {

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('')
  });

  searchControl = new FormControl('');

  constructor() {

    // Auto-save draft every time user types
    this.postForm.statusChanges.subscribe(status => console.log(status))
    this.postForm.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(
        (prev, curr)=>prev.title === curr.title && prev.content === curr.content
      )
    )
    .subscribe((formValue) => {
      console.log('form value changed', formValue);
      this.autosaveDraft(formValue);
      console.log(formValue);
    });

     this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log('search box changes', value);
      });


  }

  autosaveDraft(draft: any) {
    console.log('auto save');

    localStorage.setItem(
      'draft',
      JSON.stringify(draft)
    );
  }

  loadExistingDraft(savedDraft: { title: string; content: string }) {
    // Restore draft without triggering auto-save
    this.postForm.setValue(savedDraft, {emitEvent:false});
  }

  setPost() {
    this.postForm.setValue({ title: 'Angular', content: '' });
  }

  setTitle() {
    this.postForm.get('title')?.setValue('Angular');
  }
  

  setAngular() {
    this.searchControl.setValue('Angular');
  }

}
