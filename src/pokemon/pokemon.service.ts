import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreatePokemonDto) {
    //desestruturando
    return this.prisma.pokemon.create({
      data,
      //incluindo relacionamento
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.pokemon.findMany({
      //incluindo relacionamento
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pokemon.findUnique({
      where: { id },
      //incluindo relacionamento
      include: {
        images: true,
      },
    });
  }

  update(id: number, data: UpdatePokemonDto) {
    return this.prisma.pokemon.update({
      where: { id },
      data,
      //incluindo relacionamento
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }
}
