import { Component } from "@angular/core";
import * as moment from "moment-timezone";

@Component({
  selector: "app-countdown",
  template: ` <ngx-countdown [config]="countdownConfig"></ngx-countdown> `,
})
export class CountdownComponent {
  countdownConfig = {};

  ngOnInit() {
    const today = new Date();
    const wednesdayMidnight = moment
      .tz("America/New_York")
      .set({
        hour: 0,
        minute: 0,
        second: 0,
      })
      .day(4);

    if (today.getDay() < 4) {
      const remainingTime = wednesdayMidnight.diff(
        moment.tz("America/New_York"),
        "hours"
      );
      this.countdownConfig = {
        end: moment.tz("America/New_York").add(remainingTime, "hours"),
      };
    } else {
      // Reset the countdown for the new week
      const nextWednesdayMidnight = moment
        .tz("America/New_York")
        .set({
          hour: 0,
          minute: 0,
          second: 0,
        })
        .day(4);
      this.countdownConfig = {
        end: nextWednesdayMidnight,
      };
    }
  }
}
