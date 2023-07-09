const { externalApiUrl } = require( '../constants' );
const handlers = require('./index');

describe('USERS', () => {
   describe('GET', () => {
      it('return all users in json', async () => {
         const axios = {
            get: jest.fn().mockResolvedValue({ data: 1 }),
         };

         const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
         };

        await handlers({ axios }).get({}, res);

        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
      });
   });

   describe('POST', () => {
      it('create a resource', async () => {
         const axios = {
            post: jest.fn().mockResolvedValue({ data: 1 }),
         };

         const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
         };

         const req = {
            body: 'request body',
         };

         await handlers({ axios }).post(req, res);

         expect(res.status.mock.calls).toEqual([[201]]);
         expect(res.send.mock.calls).toEqual([[1]]);
         expect(axios.post.mock.calls).toEqual([[
            `${externalApiUrl}/users`, 'request body'
         ]]);
      });
   });

   describe('PUT', () => {
      it('update a resource', async () => {
         const axios = {
            put: jest.fn().mockResolvedValue({ data: 1 }),
         };

         const res = {
            sendStatus: jest.fn(),
         };

         const req = {
            body: 'request body',
            params: {
               id: 33,
            }
         };

         await handlers({ axios }).put(req, res);

         expect(res.sendStatus.mock.calls).toEqual([[204]]);
         expect(axios.put.mock.calls).toEqual([[
            `${externalApiUrl}/users/33`, 'request body'
         ]]);
      });
   });

   describe('DELETE', () => {
      it('delete a resource', async () => {
         const axios = {
            delete: jest.fn().mockResolvedValue({ data: 1 }),
         };

         const res = {
            sendStatus: jest.fn(),
         };

         const req = {
            params: {
               id: 12,
            }
         };

         await handlers({ axios }).delete(req, res);

         expect(res.sendStatus.mock.calls).toEqual([[204]]);
         expect(axios.delete.mock.calls).toEqual([[
            `${externalApiUrl}/users/12`
         ]]);
      });
   });
});
