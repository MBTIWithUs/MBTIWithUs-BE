import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsConfig } from 'src/config/entities/aws.config.entity';
import { Repository } from 'typeorm';

import * as AWS from "aws-sdk";
import { Storage } from './entities/storage.entity';

const awsConfig = new AwsConfig();

AWS.config.update({
  region: awsConfig.region,
  credentials: awsConfig.credentials,
});

const s3 = new AWS.S3();

const s3Url = "https://s3.ap-northeast-2.amazonaws.com/";

@Injectable()
export class StorageService {

  constructor(
    @InjectRepository(Storage) private storageRepository: Repository<Storage>
  ) {}

  async create(file: Express.Multer.File): Promise<Storage> {
    try {
      let objectName = `${Date.now() + file.originalname}`
      let uploaded = await s3.putObject({
        Key: objectName,
        Body: file.buffer,
        Bucket: awsConfig.bucketName,
      }).promise();
      let storage: Storage = new Storage();
      storage.url = s3Url + awsConfig.bucketName + "/" + objectName;
      let updated: Storage = await this.storageRepository.save(storage);
      return updated;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<Storage> {
    return await this.storageRepository.findOneBy({
      id: id
    });
  }

  async remove(id: number): Promise<void> {
    await this.storageRepository.delete({
      id: id
    });
  }
}
