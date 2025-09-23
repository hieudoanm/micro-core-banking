import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { TransactionEventSchema } from './transaction.avro';

@Injectable()
export class TransactionProducerService implements OnModuleInit {
  private schemaId: number;

  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    // Register the schema at startup
    this.schemaId = await this.kafkaService.registerSchema(
      'TransactionEvent',
      TransactionEventSchema,
    );
  }

  async publishTransaction(event: any) {
    await this.kafkaService.produceAvro('transactions', this.schemaId, event);
  }
}
