import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private _brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime()
    }
  ]

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime()
    }

    this._brands.push(brand);

    return brand;
  }

  findAll() {
    return this._brands;
  }

  findOne(id: string) {
    const brand = this._brands.find(brand => brand.id === id);
    if(!brand) throw new NotFoundException(`The brand with id ${id} was not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDB: Brand = this.findOne( id );

    this._brands = this._brands.map( brand => {
      if( brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto }

        return brandDB;
      }

      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    this._brands = this._brands.filter( brand => brand.id !== id);
  }
}
