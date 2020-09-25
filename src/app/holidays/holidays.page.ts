import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {CountryModel} from "../models/country-model";
import {YearModel} from "../models/year-model";
import {HolidayModel} from "../models/holiday-model";

@Component({
    selector: 'app-holidays',
    templateUrl: 'holidays.page.html',
    styleUrls: ['holidays.page.scss'],
})
export class HolidaysPage implements OnInit {
    public countries: CountryModel[];
    public selectedCountry: string;
    public years: YearModel[];
    public selectedYear: string;
    public isLoading = false;

    public loadedHolidays: HolidayModel[] = [];

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.loadCountries();
        this.initYears();
    }

    private loadCountries() {
        this.dataService.loadAllCountries().subscribe(loadedCountries => {
            this.countries = loadedCountries;
        });
    }

    private initYears() {
        this.years = [{id: 2019, name: "2019"}];
    }

    private onComboboxSelect() {
        if (this.selectedCountry && this.selectedYear) {
            let country = this.getCountryFromList(this.selectedCountry);
            this.isLoading = true;
            this.dataService.loadHolidaysByCountry(country.code, this.selectedYear, country.languages[0])
                .subscribe(loadedHolidays => {
                    this.loadedHolidays = loadedHolidays;
                    this.isLoading = false;
                });
        }
    }

    private getCountryFromList(countryName: string): CountryModel {
        return this.countries.find(item => item.name === countryName)
    }
}
