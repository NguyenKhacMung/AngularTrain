import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  text:string
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
  trustedUrl = this.sanitizer.bypassSecurityTrustHtml(this.htmlSnippet);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.trustedUrl);
  }
}
