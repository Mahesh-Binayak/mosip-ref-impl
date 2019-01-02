import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  languages: string[] = [
    'English',
    'French',
    'Arabic'
  ];

  inputPlaceholder = 'Email ID or Phone Number';
  btnText = 'Send OTP';
  disableBtn = false;
  timer: any;
  self: any = this;
  inputText = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit(): void {

    if (this.btnText === 'Send OTP' || this.btnText === 'Resend') {

      this.inputPlaceholder = 'Enter OTP';
      this.btnText = 'Resend';
      this.inputText = '';

      const timerFn = () => {
        let secValue = Number(document.getElementById('secondsSpan').innerText);
        const minValue = Number(document.getElementById('minutesSpan').innerText);

        if (secValue === 0) {
          secValue = 60;
          if (minValue === 0) {

            // redirecting to initial phase on completion of timer
            this.btnText = 'Send OTP';
            document.getElementById('timer').style.visibility = 'hidden';
            this.inputPlaceholder = 'Email ID or Phone Number';

            clearInterval(this.timer);
            return;
          }

          document.getElementById('minutesSpan').innerText = '0' + (minValue - 1);
        }

        if (secValue === 10 || secValue < 10) {
          document.getElementById('secondsSpan').innerText = '0' + (--secValue);
        }  else {
          document.getElementById('secondsSpan').innerText = --secValue + '';
        }
      };

      // update of timer value on click of resend
      if (document.getElementById('timer').style.visibility === 'visible') {
        document.getElementById('secondsSpan').innerText = '00';
        document.getElementById('minutesSpan').innerText = '02';
      } else {
        // initial set up for timer
        document.getElementById('timer').style.visibility = 'visible';
        this.timer = setInterval(timerFn, 1000);
      }

      // dynamic update of button text for Resend and Verify
      document.getElementById('inputField').oninput = () => {
        if (this.btnText !== 'Send OTP') {
          if (this.inputText.length > 0) {
            this.btnText = 'Verify';
          } else {
            this.btnText = 'Resend';
          }
        }

      };

    } else if (this.btnText === 'Verify') {
      // does nothing as of now
      this.router.navigate(['dashboard', this.inputText]);
    }


  }









}
