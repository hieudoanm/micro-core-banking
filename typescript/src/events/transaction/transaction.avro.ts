export const TransactionEventSchema = {
  type: 'record',
  name: 'TransactionEvent',
  namespace: 'io.github.hieudoanm.micro.core.banking',
  fields: [
    { name: 'transactionId', type: 'string' },
    { name: 'accountId', type: 'string' },
    { name: 'relatedAccountId', type: ['null', 'string'], default: null },
    { name: 'transactionType', type: 'string' },
    { name: 'amount', type: 'double' },
    { name: 'currency', type: 'string' },
    { name: 'timestamp', type: 'long' },
  ],
};
