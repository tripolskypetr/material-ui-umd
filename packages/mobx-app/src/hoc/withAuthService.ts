namespace mobxApp {

  const {
    AuthService,
  } = services;

  export namespace hoc {

    export const withAuthService = withService(AuthService, 'authService', '/login');

  } // namespace hooks

} // namespace mobxApp
