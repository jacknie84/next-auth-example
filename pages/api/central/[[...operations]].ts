import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../../sequelize-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  console.log('sequelize.models', Object.keys(sequelize.models));
  console.log(sequelize.isDefined('account'))
  const Account = sequelize.model('account');
  const accounts = await Account.findAll();
  const idToken = accounts[0].getDataValue('id_token');
  const apiUrl = `https://dev-ctrl-central.pnpt.net${url.pathname}${url.search}`;
  console.log('apiUrl', apiUrl)
  const response = await fetch(apiUrl, { 
    headers: { authorization: `Bearer ${idToken}` }, 
    method: req.method, 
    ...(Boolean(req.body) ? { body: req.body } : {})
  });
  if (!response.ok) {
    res.status(response.status);
  }
  res.json(await response.json());
}