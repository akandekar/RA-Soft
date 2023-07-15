import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  token:any = environment.token;
  constructor() { }

  // Encryption function
  encryptString(plainText:any) {
    let encrypted = '';
    for (let i = 0; i < plainText.length; i++) {
      const charCode = plainText.charCodeAt(i) ^ this.token.charCodeAt(i % this.token.length);
      encrypted += String.fromCharCode(charCode);
    }
    return encrypted;
  }

  // Decryption function
  decryptString(encryptedText) {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i++) {
      const charCode = encryptedText.charCodeAt(i) ^ this.token.charCodeAt(i % this.token.length);
      decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
  }
}
