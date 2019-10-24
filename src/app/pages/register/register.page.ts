import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {AuthenticateService} from "../../services/authenticate.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validation_messages = {
    nombre: [
      { type: "required", message: " El nombre es requerido" }
    ],
    apellido: [
      { type: "required", message: " El apellido es requerido" }
    ],
    email: [
      { type: "required", message: " El email es requerido" },
      { type: "pattern", message: "El email debe ser de la forma usuario@dominio.com" }
    ],
    password: [
      { type: "required", message: " El password es requerido" },
      { type: "minlength", message: "Minimo 5 letras para el password" }
    ]
  };
  errorMessage: string = "";
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticateService,
      private navCtrl: NavController,
      private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}")
          ])
      ),
      password: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(5)])
      )
    });
  }

  ngOnInit() {
  }

}
