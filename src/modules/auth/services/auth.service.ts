import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

export type AuthResponse = {
  token: string;
  typeToken: 'Bearer';
};

export class AuthService {
  protected readonly endpoint = 'auth';

  /**
   * @param email
   * @param password
   */
  async doLogin(email: string, password: string): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(`${this.endpoint}/login`, {
        email,
        password,
      });

      const { token, typeToken } = response.data;

      const loginData = {
        token,
        typeToken,
      };

      LocalStorage.set('loginData', loginData);

      setTimeout(() => {
        window.location.href = '/#/adm';
      }, 800);
    } catch (error) {
      throw error;
    }
  }
}
