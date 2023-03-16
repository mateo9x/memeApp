import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerLoadingSubject = new BehaviorSubject<boolean>(false);
  spinnerLoading = this.spinnerLoadingSubject.asObservable();

  setSpinnerLoading(flag: boolean) {
    this.spinnerLoadingSubject.next(flag);
  }

}
