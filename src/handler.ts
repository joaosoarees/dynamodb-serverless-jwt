import { response } from './utils/reponse';

export async function hello() {
  return response(200, { message: 'Hello World'});
}