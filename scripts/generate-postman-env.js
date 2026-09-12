const fs = require('fs');
const jwt = require('jsonwebtoken');

const cpfCnpj = process.env.CPF_CNPJ_EMPRESA || '03057532900';

const payload = { nr_cpfclient: cpfCnpj };
const secret = process.env.JWT_SECRET || '100S3nh4';

// const token = jwt.sign(payload, secret, { expiresIn: '1000d' });
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJucl9jcGZjbGllbnQiOiIwMzA1NzUzMjkwMCIsImlhdCI6MTc1Nzc4Mzk1NiwiZXhwIjoxNzg5MzE5OTU2fQ.MKFxxGwxz2E1jakJ2-sMLY9PhsNW8cTeedO7Ndw-aHQ';

const env = {
  id: '1f74ccf0-0000-4f4b-bf63-98bba3aa4a4a',
  name: 'Cashback API Dev',
  values: [
    {
      key: 'baseUrl',
      value: process.env.API_URL || 'https://api-dev.cb.m4rc310.com.br/v1',
      type: 'default',
      enabled: true
    },
    {
      key: 'tokenAcesso',
      value: token,
      type: 'secret',
      enabled: true
    }
  ],
  _postman_variable_scope: 'environment',
  _postman_exported_at: new Date().toISOString(),
  _postman_exported_using: 'Custom Script'
};

fs.writeFileSync('postman-environment.json', JSON.stringify(env, null, 2));
console.log('Arquivo postman-environment.json gerado!');