import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css'],
})
export class PushNotificationComponent implements OnInit {
  @Input() data: any;
  @Output() notificationData = new EventEmitter();

  pushNotificationForm = this.formBuilder.group({
    title: 'Test title',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing. Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  push() {
    this.notificationData.emit({
      business_no: this.data,
      title: this.pushNotificationForm.value.title,
      body: this.pushNotificationForm.value.body,
    });
  }
}
