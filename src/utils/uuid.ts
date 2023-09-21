import { v4, validate } from 'uuid';

class UUID {
  generate() {
    return v4();
  }

  check(str: string) {
    return validate(str);
  }
}

export const uuid = new UUID();
