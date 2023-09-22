import React from 'react';
import { cryptoV1 } from '../utils/crypto.v1';

export default function HomePage() {
  const test = cryptoV1.encrypt({ str: 'this data to crypt', key: '1111' });
  const test2 = cryptoV1.encrypt({ str: 'this data to crypt', key: '1111', key2: 'test' });
  const test3 = cryptoV1.encrypt({ str: 'this data to crypt', key: '1111', key2: 'test', key3: 'hahaha' });

  console.log(test);
  console.log(test2);
  console.log(test3);

  if (test) console.log(cryptoV1.decrypt({ str: test, key: '1111' }));
  if (test2) console.log(cryptoV1.decrypt({ str: test2, key: '1111', key2: 'teasdsdst' }));
  if (test3) console.log(cryptoV1.decrypt({ str: test3, key: '1111', key2: 'tesddft', key3: 'hahaha' }));

  return <>Home</>;
}
