import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { kafkaConfig } from './kafka.config';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private readonly kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
  });
  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: kafkaConfig.groupId,
  });

  async onModuleInit() {
    this.logger.log('Connecting Kafka Consumer...');
    await this.consumer.connect();
    this.logger.log('Kafka Consumer connected');

    // Subscribe to topics
    await this.consumer.subscribe({
      topic: 'transactions',
      fromBeginning: false,
    });
    await this.consumer.subscribe({
      topic: 'audit-logs',
      fromBeginning: false,
    });

    await this.run();
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting Kafka Consumer...');
    await this.consumer.disconnect();
    this.logger.log('Kafka Consumer disconnected');
  }

  private async run() {
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, message } = payload;
        const value: string | undefined = message.value?.toString();
        this.logger.log(`Received message on ${topic}: ${value}`);

        // Handle different topics
        switch (topic) {
          case 'transactions':
            await this.handleTransactionMessage(JSON.parse(value ?? '{}'));
            break;
          case 'audit-logs':
            await this.handleAuditLogMessage(JSON.parse(value ?? '{}'));
            break;
          default:
            this.logger.warn(`No handler for topic ${topic}`);
        }
      },
    });
  }

  private async handleTransactionMessage(data: any) {
    this.logger.log(`Processing transaction: ${JSON.stringify(data)}`);
    // Add transaction-specific handling logic here
    return Promise.resolve();
  }

  private async handleAuditLogMessage(data: any) {
    this.logger.log(`Processing audit log: ${JSON.stringify(data)}`);
    // Add audit log-specific handling logic here
    return Promise.resolve();
  }
}
