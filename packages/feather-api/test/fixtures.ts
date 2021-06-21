import { nanoid } from 'nanoid';
import { Connection } from 'typeorm';
import { ClientEntity } from '../src/modules/clients/entity/client.entity';
import { InsuranceEntity } from '../src/modules/insurances/entity/insurance.entity';
import { MembershipEntity } from '../src/modules/memberships/entity/membership.entity';
import { executeTruncate } from './db-test.helpers';

const tables = ['client', 'insurance', 'membership', 'recommendation'];
export const truncate = async (connection: Connection): Promise<void> => executeTruncate(connection, tables);

export const refresh = async (connection: Connection): Promise<void> => {
  await truncate(connection);

  const clientRepo = connection.getRepository(ClientEntity);
  const insuranceRepo = connection.getRepository(InsuranceEntity);
  const membershipRepo = connection.getRepository(MembershipEntity);

  const client = await clientRepo.save({
      id: 'sgflGT_56hf76klotrmg76ja',
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: null,
      active: true,
      createdBy: 'TEST',
      updatedBy: 'TEST',
      deletedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
  });

  const membership = await membershipRepo.save({
      id: 'sgflGT_56hf76klotrmg76jb',
      email: 'test.user@mail.com',
      userName: 'testUser',
      phoneNumber: '+527772365489',
      magicToken: null,
      clientId: client.id,
      lastLogin: null,
      active: true,
      createdBy: 'TEST',
      updatedBy: 'TEST',
      deletedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
  })

  const insurances = await insuranceRepo.save([
      {
        id: "sgflGT_56hf76klotrmg76jc",
        name: "Job Insurance",
        type: "JOB",
        public: false,
        cost: 20,
        frequency: "Month",
        description: "Job Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: "sgflGT_56hf76klotrmg76jd",
        name: "Personal Liability Insurance",
        type: "LIAB",
        public: false,
        cost: 30,
        frequency: "Month",
        description: "Liability Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76je",
        name: "Life Insurance",
        type: "LIFE",
        public: false,
        cost: 150,
        frequency: "Month",
        description: "Life Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76jf",
        name: "Household Insurance",
        type: "HOUS",
        public: false,
        cost: 10,
        frequency: "Month",
        description: "Household Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76jg",
        name: "Dental Insurance",
        type: "DENT",
        public: false,
        cost: 5,
        frequency: "Month",
        description: "Dental Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76jh",
        name: "Legal Insurance",
        type: "LEGA",
        public: false,
        cost: 15,
        frequency: "Month",
        description: "Legal Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76ji",
        name: "Car Insurance",
        type: "CAR",
        public: false,
        cost: 75,
        frequency: "Month",
        description: "Car Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76jj",
        name: "Public Health Insurance",
        type: "HLTH",
        public: true,
        cost: 100,
        frequency: "Month",
        description: "Public Health Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: "sgflGT_56hf76klotrmg76jk",
        name: "Private Health Insurance",
        type: "HLTH",
        public: false,
        cost: 200,
        frequency: "Month",
        description: "Private Health Insurance",
        createdBy: 'TEST',
        updatedBy: 'TEST',
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
  ]);
};