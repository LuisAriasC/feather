import { AggregateResponse, getQueryServiceToken, QueryService } from '@nestjs-query/core';
import { CursorConnectionType } from '@nestjs-query/query-graphql';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppModule } from '../src/app.module';
import { InsuranceDTO } from '../src/modules/insurances/dto/insurance.dto';
import { refresh } from './fixtures';

describe('TodoItemResolver (typeorm - e2e)', () => {
  let app: INestApplication;
  let magicToken: string = '';
  let accessToken: string = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
    await refresh(app.get(Connection));
  });

  afterAll(() => refresh(app.get(Connection)));

  describe('signup', () => {
    it('should allow signup', () => {
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `mutation{
            signup(
              data: {
                firstName: "Tester",
                lastName: "Testerus",
                email: "testerus@mail.com",
                userName: "testerus",
                phoneNumber: "+527224456378"
              }
            ){
              magicToken
            }
          }`})
        .expect(200)
        .then(({ body }) => {
          expect(body.data.signup.magicToken).toEqual(expect.any(String))
        })
    });
  })

  describe('login', () => {
    it('should allow login', () => {
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `query{
            login(
              data: {
                userName: "test.user@mail.com"
              }
            ){
              magicToken
            }
          }`})
        .expect(200)
        .then(({ body }) => {
          magicToken = String(body.data.signup.magicToken).trim();
          expect(body.data.signup.magicToken).toEqual(expect.any(String))
        })
    });
  });

  describe('authorize', () => {
    it('should authorize user with magic token', () => {
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `query{
            authorize(
              token: "${magicToken}"
            ) {
              accessToken
            }
          }`})
        .expect(200)
        .then(({ body }) => {
          accessToken = String(body.data.authorize.accessToken).trim();
          expect(body.data.authorize.accessToken).toEqual(expect.any(String))
        })
    });
  });

  describe('getRecommendations', () => {
    it('should get insurance recommendations', () => {
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          variables: {},
          query: `mutation{
            getRecommendations(
              input: {
                "firstName": "testerus",
                "address": {
                  "street": "Monigman Strasse",
                  "externalNumber": "4",
                  "zipCode": "01000",
                  "state": "Berlin",
                  "country": "Germany"
                },
                "occupation": "Employed",
                "children": false,
                "email": "test.user@mail.com"
              }
            ) {
              insurances{
                name
                type
                public
                cost
                frequency
                description
              }
            }
          }`})
        .expect(200)
        .then(({ body }) => {
          const insurances: InsuranceDTO[] = body.data.getRecommendations.insurances;
          expect(insurances).toHaveLength(8);
          expect(insurances.map((i) => i)).toEqual([
            {
              name: "Personal Liability Insurance",
              type: "LIAB",
              public: false,
              cost: 30,
              frequency: "Month",
              description: "Liability Insurance"
            }, {
              name: "Dental Insurance",
              type: "DENT",
              public: false,
              cost: 5,
              frequency: "Month",
              description: "Dental Insurance"
            },
            {
              name: "Car Insurance",
              type: "CAR",
              public: false,
              cost: 75,
              frequency: "Month",
              description: "Car Insurance"
            }, {
              name: "Household Insurance",
              type: "HOUS",
              public: false,
              cost: 10,
              frequency: "Month",
              description: "Household Insurance"
            }, {
              name: "Job Insurance",
              type: "JOB",
              public: false,
              cost: 20,
              frequency: "Month",
              description: "Job Insurance"
            }, {
              name: "Legal Insurance",
              type: "LEGA",
              public: false,
              cost: 15,
              frequency: "Month",
              description: "Legal Insurance"
            }, {
              name: "Public Health Insurance",
              type: "HLTH",
              public: true,
              cost: 100,
              frequency: "Month",
              description: "Public Health Insurance"
            }, {
              name: "Private Health Insurance",
              type: "HLTH",
              public: false,
              cost: 200,
              frequency: "Month",
              description: "Private Health Insurance"
            }
          ]);
          accessToken = String(body.data.authorize.accessToken).trim();
          expect(body.data.authorize.accessToken).toEqual(expect.any(String))
        })
    });
  });

  afterAll(async () => {
    await app.close();
  });
});