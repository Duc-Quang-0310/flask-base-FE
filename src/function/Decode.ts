class RSADecryption {
  private power(a: number, d: number, n: number) {
    let answer = 1;
    while (d !== 0) {
      if (d % 2 === 1) {
        answer = ((answer % n) * (a % n)) % n;
      }
      a = ((a % n) * (a % n)) % n;
      d >>= 1;
    }
    return answer;
  }

  private chr(numberToChar: number) {
    return String.fromCodePoint(numberToChar);
  }

  private ord(char: string) {
    return char.charCodeAt(0);
  }

  public decrypt(incomeMessage: string, D: number, N: number) {
    let decryptedMessage: string = "";

    for (const letter of incomeMessage) {
      const temp = this.ord(letter);
      const charNumber = this.power(temp, D, N);
      decryptedMessage += this.chr(charNumber);
    }

    return decryptedMessage;
  }
}

export default new RSADecryption();
