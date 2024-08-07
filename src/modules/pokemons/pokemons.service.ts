import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonsService {
  findOne(name: string) {
    return `This action returns a #${name} pokemon`;
  }
}
