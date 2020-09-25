import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";
import {CountryModel} from "../models/country-model";
import {HolidayModel} from "../models/holiday-model";

@Injectable()
export class DataService {
    private holidaysServiceUrl = "https://holidayapi.com/v1";
    private loadCountriesUrlPath = "/countries?pretty&key=access_token";
    private loadHolidaysByCountryUrlPath =
        "/holidays?pretty&key=access_token&country=country_code&year=year_number&language=language_code";

    constructor(private http: HttpClient,
                private cookieService: CookieService) {
    }

    public loadAllCountries(): Observable<CountryModel[]> {
        let accessToken = this.cookieService.get("access_token");
        let url = this.holidaysServiceUrl +
            this.loadCountriesUrlPath.replace("access_token", accessToken);

        return this.http.get(url).pipe(map((response: any) => {
                if (response) {
                    return response.countries;
                } else {
                    return [];
                }
            }));
    }

    public loadHolidaysByCountry(countryCode: string, year: string, languageCode: string): Observable<HolidayModel[]> {
        let accessToken = this.cookieService.get("access_token");
        let url = this.holidaysServiceUrl +
            this.loadHolidaysByCountryUrlPath.replace("access_token", accessToken)
                .replace("country_code", countryCode)
                .replace("year_number", year)
                .replace("language_code", languageCode);

        return this.http.get(url).pipe(map((response: any) => {
            if (response) {
                return response.holidays;
            } else {
                return [];
            }
        }));
    }
}
