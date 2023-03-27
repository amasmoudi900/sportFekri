import { WeatherService } from './../../services/weather.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  weatherResult: any;
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ["", [Validators.required]]
    })
  }

  search() {
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (dataFromAPI) => {
        this.weatherResult = dataFromAPI.apiResult;
      }
    );
  }

}
