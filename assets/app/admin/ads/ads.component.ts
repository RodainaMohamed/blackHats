import { AdsService } from './ads.service';
import { AdSlot } from './ads.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-admin-ads',
  templateUrl: './ads.component.html'
})


export class AdsComponent implements OnInit {
  name: string;
  price: number;
  length: number;
  width: number;
  private slots: AdSlot[] = [];
  private loading: boolean = false;

  constructor(private adsService: AdsService) { }
  ngOnInit() {
    this.adsService.getSlots().subscribe(slots => {
      this.slots = slots;
      setTimeout(this.onLast, 0);
    },
      err => {
        bootbox.alert(err.msg, () => {
          location.reload();
        });
        $('.modal-backdrop').css('z-index', '-1');
      });
  }

  isLoading() {
    return this.loading;
  }

  onLast() {
    $('#datatable').dataTable();
  }

  deleteSlot(slotId: string) {
    bootbox.confirm({
      title: "Delete Slot?",
      message: "Are you sure you want to delete this slot? This cannot be undone.",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Delete'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.adsService.deleteSlot(slotId).subscribe(msg => {
            bootbox.alert(msg, () => {
              location.reload();
            });
            $('.modal-backdrop').css('z-index', '-1');

          },
            err => {
              bootbox.alert(err.msg, () => {
                location.reload();
              });
              $('.modal-backdrop').css('z-index', '-1');

            });
        }
      }
    });
    $('.modal-backdrop').css('z-index', '-1');
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }

  addSlot() {
    bootbox.confirm({
      title: "Add Slot?",
      message: "Are you sure you want to add this slot?",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancel'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Add'
        }
      },
      callback: (result) => {
        if (result) {
          this.loading = true;
          this.adsService.addSlot(this.name, this.price, this.length, this.width).subscribe(msg => {
            bootbox.alert(msg, () => {
              location.reload();
            });
            $('.modal-backdrop').css('z-index', '-1');
          },
            err => {
              bootbox.alert(err.msg, () => {
                location.reload();
              });
              $('.modal-backdrop').css('z-index', '-1');
            });
        }
      }
    });
    $('.modal-backdrop').css('z-index', '-1');
  }
};
