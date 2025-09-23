import { Global, Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.consumer';
import { KafkaProducerService } from './kafka.producer';

@Global() // Optional: makes Kafka available app-wide without re-import
@Module({
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
