import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Kafka, Consumer, Producer } from 'kafkajs';
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';
import { kafkaConfig } from './kafka.config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);

  private readonly kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
  });

  private readonly registry = new SchemaRegistry({
    host: kafkaConfig.schemaRegistryUrl,
  });
  private producer: Producer;
  private consumer: Consumer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: kafkaConfig.groupId });

    await this.producer.connect();
    await this.consumer.connect();

    this.logger.log('Kafka producer and consumer connected');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  /** Register Avro schema and return its ID */
  async registerSchema(subject: string, schema: object) {
    const { id } = await this.registry.register(
      {
        type: SchemaType.AVRO,
        schema: JSON.stringify(schema),
      },
      { subject },
    );

    return id;
  }

  /** Produce message with Avro encoding */
  async produceAvro(topic: string, schemaId: number, payload: any) {
    const encodedPayload = await this.registry.encode(schemaId, payload);
    await this.producer.send({
      topic,
      messages: [{ value: encodedPayload }],
    });

    this.logger.log(`Produced message to ${topic}`);
  }

  /** Consume messages and decode Avro */
  async consumeAvro(topic: string, callback: (data: any) => Promise<void>) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const value: Buffer<ArrayBufferLike> | null = message.value;
        if (!value) return;
        const decoded = await this.registry.decode(value);
        await callback(decoded);
      },
    });

    this.logger.log(`Consumer subscribed to topic: ${topic}`);
  }
}
