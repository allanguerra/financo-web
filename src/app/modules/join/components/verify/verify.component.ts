import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyEmailService } from '@src/app/modules/join/services/verify-email-service/verify-email.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {

  public title: string = 'Aguarde';
  public text: string = 'estamos verificando o seu e-mail...';
  public buttonText: string = 'Voltar';

  public verified: boolean = false;

  private userId: string;
  private navigation: string = '/join/signup';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly verifyEmailService: VerifyEmailService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.verify();
  }

  public continue(): void {
    this.router.navigate([this.navigation]);
  }

  // PRIVATE METHODS

  private getUserId(): void {
    this.userId = this.route.snapshot.params.userId;
  }

  private verify(): void {
    if (!this.userId) {
      this.title = 'Tivemos um problema.';
      this.text = 'Nos desculpe, tivemos um problema ao verificar o seu e-mail, por-favor tente novamente mais tarde.';

      return;
    }

    this.verifyEmailService.verifyEmail(this.userId).subscribe({
      next: () => {
        this.title = 'Parabéns seu e-mail foi verificado!';
        this.text = 'Agora você já pode acessar todos os recursos do Finan.CO e começar a controlar de vez as suas finanças.';
        this.buttonText = 'Continuar no Finan.CO';
        this.navigation = '/home';
        this.verified = true;
      },
      error: () => {
        // TODO: Incluir opção de reenviar e-mail.
        this.title = 'Tivemos um problema.';
        this.text = 'Nos desculpe, tivemos um problema ao verificar o seu e-mail, por-favor tente novamente mais tarde.';
        this.buttonText = 'Voltar';
        this.navigation = '/join/signup';
        this.verified = true;
      }
    });
  }

}
