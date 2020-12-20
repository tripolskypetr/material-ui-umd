namespace mobxApp {

  const {
    AuthService,
  } = services;

  export namespace hooks {

    export const withAuthService = withService(AuthService, 'authService');

  } // namespace hooks

} // namespace mobxApp
