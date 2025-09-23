import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { kafkaConfig } from './kafka.config';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private readonly kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    this.logger.log('Connecting Kafka Producer...');
    await this.producer.connect();
    this.logger.log('Kafka Producer connected');
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting Kafka Producer...');
    await this.producer.disconnect();
    this.logger.log('Kafka Producer disconnected');
  }

  async sendMessage(topic: string, key: string, value: any) {
    this.logger.log(`Sending message to topic "${topic}" with key "${key}"`);
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }
}
