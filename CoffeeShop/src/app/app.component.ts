import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
//import { NgServiceWorker} from '@angular/service-worker;'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private snackBar: MatSnackBar //  private ngsw: NgServiceWorker
  ) {}


  subscribeToPush(){
   // Notification.requestPermission( permission => {
     // if(permission === "granted") {
        //this.ngsw.regiaterForPush({applicationServerKey: "replace-with-your-public-key"})
          //.subscribe( (registration: NgPushRegistration) => {
           // console.log(registration);
            //TODO send that object to our server
       // })
      //}
    //});
  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      //u might be online
      (document.querySelector("body") as any).style = "";
    } else {
      //100% sure u are offline
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }

  ngOnInit() {
    //checking SW update status
    // this.ngsw.subscribe(update => {
    //   if (update.type == "pending") {
    //     const sb = this.snackBar.open(
    //       "there is an update available",
    //       "Install Now",
    //       { duration: 4000 }
    //     );
    //     sb.onAction().subscribe(() => {
    //       this.ngsw.activateUpdate(update.version).subscribe(event => {
    //         console.log("the app was updated!");
    //         location.reload();
    //       });
    //     });
    //   }
    // });

    //checking network status
    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);

    //checking installation status
    if ((navigator as any).standalone == false) {
      //ios device in browser
      this.snackBar.open("you can add this PWA to Home Screen", "", {
        duration: 3000
      });
    }
    if ((navigator as any).standalone == undefined) {
      // it's not ios
      if (window.matchMedia("(display-mode: browser").matches) {
        //in the browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open(
            "do you want to install app?",
            "Install",
            { duration: 5000 }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome == "dismissed") {
                //TODO: track no installation
              } else {
                //TODO: it was installed
              }
            });
          });

          return false;
        });
      }
    }
  }
}
