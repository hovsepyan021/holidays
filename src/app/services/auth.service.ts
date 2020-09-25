import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthService {
    private authServiceUrl = "https://holidayapi.com/login";
    private accessToken = "c269b69c-6c1b-43df-94b0-bf8c3ce314d6";

    constructor(private http: HttpClient,
                private cookieService: CookieService) {
    }

    public login(username: string, password: string): Observable<boolean> {
        let httpParams = new HttpParams()
            .set("email", username)
            .set("password", password);

        return this.http.post(this.authServiceUrl,
                httpParams,
            {responseType: 'text'}
            ).pipe(map((response: any) => {
                if (response) {
                    this.cookieService.set("access_token", this.accessToken);
                    return true;
                } else {
                    return false;
                }
            }));
    }

    public logout(): void {
        this.cookieService.delete("access_token");
    }
}
