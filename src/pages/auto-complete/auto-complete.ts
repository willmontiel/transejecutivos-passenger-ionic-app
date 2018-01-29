import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'auto-complete.html',
})
export class AutoCompletePage {
  autocompleteItems;
  autocomplete;
  private google: any;
  service = new google.maps.places.AutocompleteService();

  constructor(public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {} }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions && predictions.length) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }
}
