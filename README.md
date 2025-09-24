# Micro Core Banking

A 12 week Java Bootcamp for TypeScript Developers.

## Table of Contents

- [Micro Core Banking](#micro-core-banking)
  - [Table of Contents](#table-of-contents)
  - [TechStack](#techstack)
  - [Tutorial](#tutorial)
    - [Chapter 1: Java](#chapter-1-java)
      - [Week 1: Core Java Foundations](#week-1-core-java-foundations)
        - [OOP (Classes, Interfaces, Inheritance, Polymorphism)](#oop-classes-interfaces-inheritance-polymorphism)
        - [SOLID principles, design patterns (Factory, Singleton, Strategy)](#solid-principles-design-patterns-factory-singleton-strategy)
      - [Week 2: Development Tools](#week-2-development-tools)
        - [CheckStyle](#checkstyle)
        - [PMD](#pmd)
        - [Spotless](#spotless)
    - [Chapter 2: Spring Boot](#chapter-2-spring-boot)
      - [Week 3: Spring Boot Fundamentals](#week-3-spring-boot-fundamentals)
      - [Week 4: Spring Boot \& Persistence Layer](#week-4-spring-boot--persistence-layer)
    - [Chapter 3: Database (PostgreSQL \& Flyway)](#chapter-3-database-postgresql--flyway)
      - [Week 5: PostgreSQL Fundamentals](#week-5-postgresql-fundamentals)
      - [Week 6: Flyway for Database Migrations](#week-6-flyway-for-database-migrations)
    - [Chapter 4: Kafka](#chapter-4-kafka)
      - [Week 7: Messaging \& Kafka Fundamentals](#week-7-messaging--kafka-fundamentals)
      - [Week 8: Integrating Kafka with Spring Boot](#week-8-integrating-kafka-with-spring-boot)
    - [Chapter 5: Testing](#chapter-5-testing)
      - [Week 9: JUnit and Mockito](#week-9-junit-and-mockito)
      - [Week 10](#week-10)
    - [Chapter 6: Bonus](#chapter-6-bonus)
      - [Week 11](#week-11)
      - [Week 12](#week-12)

## TechStack

| No. | Language            | [Java][java]                                    | [TypeScript][typescript] |
| --- | ------------------- | ----------------------------------------------- | ------------------------ |
| 01  | Packages Management | [Gradle][gradle]                                | [pnpm][pnpm]             |
| 02  | Linter              | [PMD][pmd]                                      | [ESLint][eslint]         |
| 03  | Formatter           | [CheckStyle][checkstyle] + [Spotless][spotless] | [Prettier][prettier]     |
| 04  | Unit Test           | [JUnit][junit]                                  | [Jest][jest]             |
| 05  | Framework           | [Spring Boot][spring-boot]                      | [Nest.js][nest.js]       |
| 06  | Database            | [PostgreSQL][postgresql]                        | `same`                   |
| 07  | Migrations          | [Flyway][flyway]                                | [Prisma][prisma]         |
| 08  | ORM                 | [Spring ORM][spring-orm]                        | [Prisma][prisma]         |
| 09  | Messages Broker     | [Kafka][kafka]                                  | `same`                   |
| 10  | Containerisation    | [OpenJDK][docker-openjdk]                       | [Node.js][docker-node]   |

## Tutorial

### Chapter 1: Java

#### Week 1: Core Java Foundations

##### OOP (Classes, Interfaces, Inheritance, Polymorphism)

1. Packages, Exceptions, Collections (List, Set, Map)
2. Logging with SLF4J/Logback

##### SOLID principles, design patterns (Factory, Singleton, Strategy)

#### Week 2: Development Tools

##### CheckStyle

##### PMD

##### Spotless

### Chapter 2: Spring Boot

#### Week 3: Spring Boot Fundamentals

1. Spring Boot structure (controllers, services, repositories)
2. Dependency Injection, Beans, Profiles
3. REST API basics (GET, POST, PUT, DELETE)

#### Week 4: Spring Boot & Persistence Layer

1. JPA & Hibernate basics
2. Entities, relationships (OneToMany, ManyToMany)
3. CRUD repositories

### Chapter 3: Database (PostgreSQL & Flyway)

#### Week 5: PostgreSQL Fundamentals

1. SQL basics (DDL, DML, joins, indexing)
2. Connecting Spring Boot to PostgreSQL
3. Writing custom queries with Spring Data JPA

#### Week 6: Flyway for Database Migrations

1. Introduction to Flyway migrations
2. Versioned vs repeatable migrations
3. Naming conventions & migration strategy

### Chapter 4: Kafka

#### Week 7: Messaging & Kafka Fundamentals

1. Event-driven architecture concepts
2. Kafka basics: Topics, Partitions, Brokers, Producers, Consumers
3. Spring Kafka basics
4. Schema Registry

#### Week 8: Integrating Kafka with Spring Boot

1. `@KafkaListener` consumers and producer templates
2. Error handling & retries
3. JSON serialization/deserialization

### Chapter 5: Testing

#### Week 9: JUnit and Mockito

1. JUnit & Mockito advanced features
2. Integration testing with Spring Boot (`@SpringBootTest`)

#### Week 10

### Chapter 6: Bonus

#### Week 11

#### Week 12

[checkstyle]: https://checkstyle.sourceforge.io/
[docker-node]: https://hub.docker.com/_/node
[docker-openjdk]: https://hub.docker.com/_/openjdk
[eslint]: https://eslint.org/
[flyway]: https://www.red-gate.com/products/flyway/community/
[gradle]: https://gradle.org/
[java]: https://www.java.com/en/
[jest]: https://jestjs.io/
[junit]: https://junit.org/
[kafka]: https://kafka.apache.org/
[nest.js]: https://nestjs.com/
[pmd]: https://pmd.github.io/
[pnpm]: https://pnpm.io/
[postgresql]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[prisma]: https://www.prisma.io/
[spotless]: https://github.com/diffplug/spotless
[spring-boot]: https://spring.io/projects/spring-boot
[spring-orm]: https://docs.spring.io/spring-framework/reference/data-access/orm.html
[typescript]: https://www.typescriptlang.org/
