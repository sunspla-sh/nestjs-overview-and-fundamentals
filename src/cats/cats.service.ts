import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

/*
  Providers like this CatsService normally have a lifetime ("scope") syncronized with our application lifecycle.
  When the application is bootstrapped, every dependency must be resolved, and therefore every provider has
  to be instantiated. Similarly, when our application shuts down, each provider will be destroyed. However, there
  are ways to make our provider lifetime request-scoped as well. This could be useful for instance per-request
  caching in graphql applications, request tracking, and multi-tenancy.
*/

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
